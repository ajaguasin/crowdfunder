import React, { Component } from "react";
import creator from "../ethereum/creator";

import { Card } from "semantic-ui-react";

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
      <div>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        {this.renderCrowdfunds()}
      </div>
    );
  }
}

export default CreatorIndex;
