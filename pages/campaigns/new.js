import React from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web";
import { Router} from "../../routes";


class CampaignNew extends React.Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  submitForm = async (e) => {
    e.preventDefault();
    this.setState({loading: true , errorMessage: ''});
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });
        Router.pushRoute('/');
    } catch (error) {
        this.setState({ errorMessage: error.message })
    }
    this.setState({loading: false});
  };

  render() {
    return (
      <Layout>
        <h3>Create new Campaign</h3>
        <Form onSubmit={this.submitForm} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              onChange={(e) =>
                this.setState({ minimumContribution: e.target.value })
              }
              value={this.state.minimumContribution}
              label="wei"
              labelPosition="right"
            />
          </Form.Field>
          <Message error header='Oops!' content={this.state.errorMessage}/>
          <Button loading={this.state.loading} primary> Create </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
