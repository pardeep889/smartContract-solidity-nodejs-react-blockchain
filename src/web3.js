import Web3 from "web3";

const provider = new Web3(window.web3.currentProvider);
let web3 = new Web3(provider);

export default web3;
