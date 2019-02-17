import React, { Component } from "react";
import creator from "../ethereum/creator";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CreatorIndex extends Component {
  static async getInitialProps() {
    const crowdfunds = await creator.methods.getDeployedCrowdfunds().call();
    return { crowdfunds };
  }

  renderCrowdfunds = () => {
    const items = this.props.crowdfunds.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/crowdfunds/${address}`}>
            <a>View Crowdfunds</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  };

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Crowdfunds</h3>
          <Link route="crowdfunds/new">
            <a>
              <Button
                // floated="right"
                content="Create Crowdfund"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderCrowdfunds()}
        </div>
      </Layout>
    );
  }
}

export default CreatorIndex;
