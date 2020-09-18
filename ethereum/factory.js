import web3 from './web';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), 
    '0x5f293006C080788B9d19fc0cCDFcc9c29D3ac5aA'
);

export default instance;
