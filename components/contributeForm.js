import React from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web";
import {Router} from "../routes";

class ContributeForm extends React.Component {
  state = {
    value: "",
    loading: false,
    errorMessage: ''
  };

  async onFormSubmit(e) {
    e.preventDefault();
    const campaign = Campaign(this.props.address);
    this.setState({loading: true, errorMessage: ''});
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (error) {
        this.setState({
            errorMessage: error.message
        })
    }
    this.setState({
        loading: false,
        value: ''
    })
  }

  render() {
    return (
      <>
        <Form onSubmit={this.onFormSubmit.bind(this)}  error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Amount to contribute</label>
            <Input
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
              label="ether"
              labelPosition="right"
            />
          </Form.Field>
          <Message error header='Oops!' content={this.state.errorMessage}/>
          <Button loading={this.state.loading} primary> Contribute !</Button>
        </Form>
      </>
    );
  }
}

export default ContributeForm;
