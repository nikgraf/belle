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

  constructor (properties) {
    super(properties);
    this.state = {
      childProperties: sanitizeChildProperties(properties)
    };
  }

  /**
   * Update the _childProperties based on the updated properties passed to the
   * card.
   */
  componentWillReceiveProps (properties) {
    this.setState({ childProperties: sanitizeChildProperties(properties) });
  }

  render () {
    let divStyle = extend({}, style.style, this.props.style);

    return <div {...this.state.childProperties} style={ divStyle }>
      { this.props.children }
    </div>;
  }
}

Card.displayName = 'Belle Card';

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProperties(properties) {
  return omit(properties, ['style']);
}
