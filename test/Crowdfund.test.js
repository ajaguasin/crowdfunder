const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledCreator = require("../ethereum/build/CrowdfundCreator.json");
const compiledCrowdfund = require("../ethereum/build/Crowdfund.json");

let accounts;
let creator;
let crowdfundAddress;
let crowdfund;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  creator = await new web3.eth.Contract(JSON.parse(compiledCreator.interface))
    .deploy({ data: compiledCreator.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await creator.methods.createCrowdfund("100").send({
    from: accounts[0],
    gas: "1000000"
  });

  // Take first element in the array and assign it to crowdfundAddress
  [crowdfundAddress] = await creator.methods.getDeployedCrowdfunds().call();

  crowdfund = await new web3.eth.Contract(
    JSON.parse(compiledCrowdfund.interface),
    crowdfundAddress
  );
});

describe("Crowdfunds", () => {
  it("deploys a creator and a crowdfund", () => {
    assert.ok(creator.options.address);
    assert.ok(crowdfund.options.address);
  });

  it("marks caller as the campaign manager", async () => {
    const manager = await crowdfund.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await crowdfund.methods.contribute().send({
      value: "200",
      from: accounts[1]
    });
    const isContributor = await crowdfund.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      await crowdfund.methods.contribute().send({
        value: "5",
        from: accounts[1]
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("allows a manager to make a payment request", async () => {
    await crowdfund.methods
      .createRequest("Buy batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000"
      });

    const request = await crowdfund.methods.requests(0).call();

    assert.equal("Buy batteries", request.description);
  });

  it("processes requests", async () => {
    await crowdfund.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether")
    });

    await crowdfund.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await crowdfund.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    });

    await crowdfund.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});
