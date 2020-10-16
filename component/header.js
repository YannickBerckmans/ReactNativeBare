import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Appbar.Header><Appbar.Content title="GlobalView" /></Appbar.Header>
    );
  }
}
