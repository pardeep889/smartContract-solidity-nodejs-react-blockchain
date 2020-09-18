import React from "react";
import factory from "../ethereum/factory";
import { Button, Card } from "semantic-ui-react";
import Layout from "../components/layout";
import { Link } from "../routes";

class Index extends React.Component {
  static async getInitialProps(ctx) {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <>
          <h3>All Campaigns</h3>
          <Link route="/campaigns/new">
            <a className="item">
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </>
      </Layout>
    );
  }
}

export default Index;
