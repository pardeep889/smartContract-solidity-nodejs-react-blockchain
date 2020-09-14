import React from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      manager: "",
      players: [],
      balance: 0,
      value: "0.2",
      message: "",
    };
  }
  async componentDidMount() {
    if (window.web3) {
      // window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      window.ethereum.autoRefreshOnNetworkChange = false;
      // return true;
    }
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(
      "0x00C74e595f698A8919EabC911B59DF37E030A0a4"
    );
    const etherbalance = web3.utils.fromWei(balance, "ether");
    this.setState({ manager, players, balance : etherbalance});
  }

  async onSubmitForm(event) {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "waiting for transaction to be completed!" });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "You have been entered in the lottery" });
  }
  async pickWinner(){
    const accounts = await web3.eth.getAccounts();

    this.setState({message: "wait we are picking the winner"});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({message: "Winner is announceed and money sent to him!"});

  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by: {this.state.manager}</p>
        <p>Current players: {this.state.players.length}</p>
        <p>Winning Price: {this.state.balance} ether</p>
        <hr />

        <form onSubmit={this.onSubmitForm.bind(this)}>
          <h4>Enter to lottery</h4>
          <div>
            <label>Amount:</label>
            <input
              onChange={(e) => this.setState({ value: e.target.value })}
              value={this.state.value}
            />
            <br />
            <button type="submit">Enter Now!</button>
          </div>

          <hr/>

          <button onClick={this.pickWinner.bind(this)}>Pick a Winner</button>
          <strong>{this.state.message}</strong>
        </form>
      </div>
    );
  }
}

export default App;
