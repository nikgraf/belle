import React, {Component} from 'react';

/**
 * Choice component
 */
export default class Choice extends Component {

  constructor(properties) {
    super(properties);
  }

  static displayName = 'Choice';

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    value: React.PropTypes.bool.isRequired,
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}
