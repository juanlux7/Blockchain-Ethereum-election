import React, { Component } from "react";
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item
        >
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item >
        <Link to="/help">Help</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
