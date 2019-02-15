import web3 from "./web3";
import CrowdfundCreator from "./build/CrowdfundCreator";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x22f43CF79A2327c3041353DA3b40382D529eBB31"
);

export default instance;
