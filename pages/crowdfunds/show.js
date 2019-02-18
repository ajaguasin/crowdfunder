import React, { Component } from "react";
import Layout from "../../components/Layout";
import Crowdfund from "../../ethereum/crowdfund";
import { Card } from "semantic-ui-react";
import web3 from "../../ethereum/web3";

class CrowdfundShow extends Component {
  static async getInitialProps(props) {
    const crowdfund = await Crowdfund(props.query.address);

    const summary = await crowdfund.methods.getSummary().call();
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "The manager created this crowdfund and create requests to withdraw money",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver"
      },
      {
        header: requestsCount,
        meta: "Number of requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers"
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description:
          "Number of people who have already donated to this crowdfund"
      },
      {
        header: balance,
        meta: "Crowdfund Balance (ether)",
        description:
          "The balance is how much money this crowdfund has left to spend"
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Crowdfund Show</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default CrowdfundShow;
