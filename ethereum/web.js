import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // meta mask is running, we are in browser
  web3 = new Web3(window.web3.currentProvider);
} else {
  // meta mask not running, we are in server
 const NETWORK_ADDRESS =
    "https://rinkeby.infura.io/v3/e7b32d0b1dcc4ada82f487eadc238e6a";
  const provider = new Web3.providers.HttpProvider(NETWORK_ADDRESS);
  web3 = new Web3(provider);
}

export default web3;
