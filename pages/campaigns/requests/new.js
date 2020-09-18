import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Form, Button, Message, Input } from "semantic-ui-react";
import web3 from "../../../ethereum/web";
import Campaign from "../../../ethereum/campaign";
import { Router, Link } from "../../../routes";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  async submitForm(e) {
    e.preventDefault();
    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }
    this.setState({ loading: false });
  }
  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Go back</a>
        </Link>
        <h3>Create New Request</h3>
        <Form
          onSubmit={this.submitForm.bind(this)}
          error={!!this.state.errorMessage}
        >
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value(ether)</label>
            <Input
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient Address</label>
            <Input
              value={this.state.recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            {" "}
            Create Request!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
