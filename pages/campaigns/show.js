import React from "react";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web";
import ContributeForm from "../../components/contributeForm";
import { Link } from "../../routes";

class CampaignShow extends React.Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      reqeustsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      address: props.query.address,
    };
  }
  renderCards() {
    const {
      minimumContribution,
      balance,
      reqeustsCount,
      approversCount,
      manager,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "The manager created this campaign and can create request to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to contribute in the Campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: reqeustsCount,
        meta: "Number of requests",
        description:
          "Requests Tries to withdraw money from the contract. Reqeust must be approved by the approvers",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "Number of people who already donated to this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Balance of Contract (ether)",
        description: "The Balance is how much money left for spend.",
        style: { overflowWrap: "break-word" },
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3> Campaign Details </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
export default CampaignShow;
