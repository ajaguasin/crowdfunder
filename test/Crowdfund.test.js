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

  creator = await new web3.eth.Contract(JSON.parse(compiledCrowdfund.interface))
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
