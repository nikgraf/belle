"use strict";

import React, {Component} from 'react';
import {extend, omit} from 'underscore';
import style from '../style/placeholder';

/**
 * Placeholder component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Placeholder extends Component {

  constructor (properties) {
    super(properties);
    this.state = {
      childProperties: omit(properties, 'style')
    };
  }

  render () {
    const computedStyle = extend({}, style.style, this.props.style);

    return (
      <div style={ computedStyle } {...this.state.childProperties}>
        { this.props.children }
      </div>
    );
  }
}

Placeholder.propTypes = {
  style: React.PropTypes.object
};

Placeholder.displayName = 'Belle Placeholder';
