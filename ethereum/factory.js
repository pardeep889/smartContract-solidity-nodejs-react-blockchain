import web3 from './web';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), 
    '0xa0B690D33F1a2a2760B7fE57b1658145810e467D'
);

export default instance;
