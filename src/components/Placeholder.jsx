"use strict";

import React, {Component} from 'react';
import {extend} from 'underscore';
import style from '../style/placeholder';

/**
 * Placeholder component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Placeholder extends Component {

  constructor (properties) {
    super(properties);
  }

  render () {
    const computedStyle = extend({}, style.placeholderStyle, this.props.style);

    return (
      <div style={ computedStyle }>
        { this.props.children }
      </div>
    );
  }
}

Placeholder.propTypes = {
  style: React.PropTypes.object
};

Placeholder.displayName = 'Belle Placeholder';
