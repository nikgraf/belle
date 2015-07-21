import React, {Component, PropTypes} from 'react';

/**
 * Modal component
 */
export default class Modal extends Component {

  constructor(properties) {
    super(properties);
  }

  static displayName = 'Belle Modal';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
