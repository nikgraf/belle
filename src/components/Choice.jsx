"use strict";

import React, {Component} from 'react';

/**
 * Choice component
 */
export default class Choice extends Component {

  constructor(properties) {
    super(properties);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

Choice.displayName = 'Belle Choice';
Choice.propTypes = { value: React.PropTypes.bool.isRequired };
