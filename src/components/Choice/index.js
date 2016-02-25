import React, { Component, PropTypes } from 'react';

/**
 * Choice component
 */
export default class Choice extends Component {

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
