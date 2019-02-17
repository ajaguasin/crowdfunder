import web3 from "./web3";
import CrowdfundCreator from "./build/CrowdfundCreator";

const instance = new web3.eth.Contract(
  JSON.parse(CrowdfundCreator.interface),
  "0xb5B83a7Bb76508BeA7919fB6F68a2D80f97abe7F"
);

export default instance;
