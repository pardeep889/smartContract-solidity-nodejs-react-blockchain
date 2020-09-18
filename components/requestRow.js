import React, { Component } from "react";
import { Table, Button, Message } from "semantic-ui-react";
import web3 from "../ethereum/web";
import Campaign from "../ethereum/campaign";

const { Row, Cell } = Table;

class RequestRow extends Component {
  state = {
    loading: false,
    errMessage: "",
    loadingF: false,
  };

  approveHandler = async () => {
    const campaign = Campaign(this.props.address);
    this.setState({ loading: true, errMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });
    } catch (error) {
      this.setState({
        errMessage: error.message,
      });
    }

    this.setState({ loading: false });
  };

  finalize = async () => {
    const campaign = Campaign(this.props.address);
    this.setState({ loadingF: true, errMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0],
      });
    } catch (error) {
      this.setState({
        errMessage: error.message,
      });
    }

    this.setState({ loadingF: false });
  };

  render() {
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    return (
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              loading={this.state.loading}
              color="green"
              basic
              onClick={this.approveHandler}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              loading={this.state.loadingF}
              color="red"
              basic
              onClick={this.finalize}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
