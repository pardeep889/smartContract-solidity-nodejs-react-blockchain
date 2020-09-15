const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const compiledFactory  = require("./build/CampaignFactory.json");

const MNEMONIC =
  "trust across range rubber amused number roast expand exact proud wear credit";
const NETWORK_ADDRESS =
  "https://rinkeby.infura.io/v3/e7b32d0b1dcc4ada82f487eadc238e6a";

const provider = new HDWalletProvider(
  MNEMONIC,
  NETWORK_ADDRESS
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();


const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode }) // add bytecode
    .send({ from: accounts[0] });

    console.log('contract deployed to: ',  result.options.address);
}
deploy();

