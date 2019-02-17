import React from "react";
import { Menu } from "semantic-ui-react";

export default () => {
  return (
    <Menu style={{ marginTop: 10 }}>
      <Menu.Item>Blockfundr</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Crowdfunds</Menu.Item>
        <Menu.Item>+</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
