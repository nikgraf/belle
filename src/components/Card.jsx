"use strict";

import React, {Component} from 'react';
import {omit, extend} from 'underscore';
import style from '../style/card';

/**
 * Card component with a light shadow.
 *
 * This component will apply any attribute to the div that has been provided as
 * property & is valid for a div.
 */
export default class Card extends Component {

  constructor(properties) {
    super(properties);
    this._childProperties = omit(properties, 'style');
  }

  /**
   * Update the _childProperties based on the updated properties passed to the
   * card.
   */
  componentWillReceiveProps(properties) {
    this._childProperties = omit(properties, 'style');
  }

  render() {
    let divStyle = extend({}, style.defaultStyle, this.props.style);

    return <div {...this._childProperties} style={ divStyle }>
      { this.props.children }
    </div>;
  }
}

Card.displayName = 'Belle Card';
