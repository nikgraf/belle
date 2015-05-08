"use strict";

import React, {Component} from 'react';
import {extend, omit} from 'underscore';
import style from '../style/separator';

/**
 * Separator component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Separator extends Component {

  constructor (properties) {
    super(properties);
    this.state = {
      childProperties: omit(properties, 'style')
    };
  }

  render () {
    const computedStyle = extend({}, style.separatorStyle, this.props.style);

    return (
      <div style={ computedStyle } {...this.state.childProperties}>
        { this.props.children }
      </div>
    );
  }
}

Separator.propTypes = {
  style: React.PropTypes.object
};

Separator.displayName = 'Belle Separator';
