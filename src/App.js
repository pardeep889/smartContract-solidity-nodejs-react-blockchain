import React from "react";
import "./App.css";
import lottery from "./lottery";

class App extends React.Component {

  state = {
    manager: ''
  }


  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    // this.setState({manager})
    // const valx =
    // manager["_ethAccounts"]["_requestManager"]["provider"]["selectedAddress"]; 
    console.log(manager)
  }

  render() {
    return (
      <div className="App">
        <div>Manager {this.state.manager}</div>
      </div>
    );
  }
}

export default App;
