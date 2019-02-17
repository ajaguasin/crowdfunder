import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import creator from "../../ethereum/creator";
import web3 from "../../ethereum/web3";

class CrowdfundNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await creator.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
    } catch (e) {
      this.setState({ errorMessage: err.message });
    }
  };
  render() {
    return (
      <Layout>
        <h3>Create a Crowdfund</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
              label="wei"
              labelPosition="right"
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CrowdfundNew;
