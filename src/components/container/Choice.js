import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Choice component
 */
export class Choice extends Component {

  static displayName = 'Choice';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    value: PropTypes.bool.isRequired,
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}
