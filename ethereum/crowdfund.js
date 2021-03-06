import web3 from "./web3";
import Crowdfund from "./build/Crowdfund";

export default address => {
  return new web3.eth.Contract(JSON.parse(Crowdfund.interface), address);
};
