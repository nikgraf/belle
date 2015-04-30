"use strict";

import React, {Component} from 'react';

/**
 * Option component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Option extends Component {

  constructor (properties) {
    super(properties);
  }

  render () {
    return (
      <div data-belle-value={ this.props.value }>
        { this.props.children }
      </div>
    );
  }
}

Option.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Date)
  ]).isRequired
};

Option.displayName = 'Belle Option';
