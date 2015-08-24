import React, {Component} from 'react';
/**
 * Popover
 * TODO comment
 */
export default class Popover extends Component {

  constructor(properties) {
    super(properties);
  }

  static displayName = 'Belle Popover';

  static propTypes = {
  };

  render() {
    return (
      <div style={{ border: '1px solid #ccc'}}>
        { this.props.children }
      </div>
    );
  }
}
