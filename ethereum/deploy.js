const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const compiledFactory  = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
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

