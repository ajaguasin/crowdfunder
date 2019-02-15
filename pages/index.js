import React, { Component } from "react";
import creator from "../ethereum/creator";

class CreatorIndex extends Component {
  async componentDidMount() {
    const crowdfunds = await creator.methods.getDeployedCrowdfunds().call();
    console.log(crowdfunds);
  }

  render() {
    return <div>Home Page</div>;
  }
}

export default CreatorIndex;
