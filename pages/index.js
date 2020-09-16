import React from "react";
import factory from "../ethereum/factory";

class Index extends React.Component {
  static async getInitialProps(ctx) {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  render() {
  return <div>address = {this.props.campaigns}</div>;
  }
}

export default Index;
