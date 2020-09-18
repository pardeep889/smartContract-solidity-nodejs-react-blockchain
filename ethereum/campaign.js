import web3 from "./web";
import Campaign from "./build/Compaign.json";

const CompaignFunction = (address) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};
export default CompaignFunction;
