"use strict";

import React, {Component} from 'react';
import {omit, extend} from 'underscore';

/**
 * Card component with a light shadow.
 *
 * This component will apply any attribute to the div that has been provided as
 * property & is valid for a div.
 */
export default class Card extends Component {

  constructor(properties) {
    this.divProperties = omit(properties, 'style');
    super(properties);
  }

  /**
   * Update the divProperties based on the updated properties passed to the card.
   */
  componentWillReceiveProps(properties) {
    this.divProperties = omit(properties, 'style');
  }

  render() {
    let style = extend({}, defaultStyle, this.props.style);

    return <div {...this.divProperties} style={ style }>
      { this.props.children }
    </div>;
  }
}

Card.displayName = 'Belle Card';

const defaultStyle = {
  marginBottom: 20,
  padding: 40,
  borderRadius: 2,
  background: '#fff',
  border: '1px solid #fff',
  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
  boxSizing: 'border-box'
};
