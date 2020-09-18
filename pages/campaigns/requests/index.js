import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/requestRow";

const { Header, Row, HeaderCell, Body } = Table;

class Index extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map(async (element, index) => {
          return await campaign.methods.reqeusts(index).call();
        })
    );
    return {
      address,
      requests,
      requestCount: parseInt(requestCount),
      approversCount: parseInt(approversCount),
    };
  }
  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          request={request}
          key={index}
          id={index}
          address={this.props.address}
          approversCount = {this.props.approversCount}
        />
      );
    });
  }

  render() {
    return (
      <Layout>
        <h3>All Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button style={{marginBottom: 10}} primary floated="right">Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell> ID </HeaderCell>
              <HeaderCell> Description </HeaderCell>
              <HeaderCell> Amount </HeaderCell>
              <HeaderCell> Recipient </HeaderCell>
              <HeaderCell> Request Count </HeaderCell>
              <HeaderCell> Approve </HeaderCell>
              <HeaderCell> Finalize </HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <div>Found {this.props.requests.length} requests.</div>
      </Layout>
    );
  }
}

export default Index;
