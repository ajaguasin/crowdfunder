import React, { Component } from "react";
import creator from "../ethereum/creator";

import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

class CreatorIndex extends Component {
  static async getInitialProps() {
    const crowdfunds = await creator.methods.getDeployedCrowdfunds().call();
    return { crowdfunds };
  }

  renderCrowdfunds = () => {
    const items = this.props.crowdfunds.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  };

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Button
            // floated="right"
            content="Create Crowdfund"
            icon="add circle"
            primary
          />
          {this.renderCrowdfunds()}
        </div>
      </Layout>
    );
  }
}

export default CreatorIndex;
