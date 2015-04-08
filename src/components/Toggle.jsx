"use strict";

import React, {Component} from 'react';
import {injectStyles, removeStyle} from '../utils/inject-style';

/**
 * Toggle component
 */
export default class Toggle extends Component {

  constructor(properties) {
    super(properties);
  }

  render() {
    return <div>Hello Togglez</div>;
  }
}

Toggle.displayName = 'Belle Toggle';
