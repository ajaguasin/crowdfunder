const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// find build folder and delete folder and its contents
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// find .sol file, compile, and store the contracts
const crowdfundPath = path.resolve(__dirname, "contracts", "Crowdfund.sol");
const source = fs.readFileSync(crowdfundPath, "utf-8");
const output = solc.compile(source, 1).contracts;

// create build folder
fs.ensureDirSync(buildPath);
for (let contract in output) {
  // write .json files
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
