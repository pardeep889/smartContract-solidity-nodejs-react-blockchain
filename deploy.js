const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const final = require("./config");

const provider = new HDWalletProvider(
  final.MNEMONIC,
  final.NETWORK_ADDRESS
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({
    data: bytecode,
  }).send({gas: '1000000', from: accounts[0]});
  console.log("interface :=> ", result)
  console.log("Address :=> ",result.options.address);
};
deploy();
