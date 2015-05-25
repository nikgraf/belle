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
      childProperties: sanitizeChildProperties(properties)
    };
  }

  /**
   * Update the childProperties based on the updated properties passed to the
   * Placeholder.
   */
  componentWillReceiveProps (properties) {
    this.setState({ childProperties: sanitizeChildProperties(properties) });
  }

  render () {
    let computedStyle;
    if (this.props._isDisabled) {
      computedStyle = extend({}, style.disabledStyle, this.props.disabledStyle);
    } else {
      computedStyle = extend({}, style.style, this.props.style);
    }

    return (
      <div style={ computedStyle } {...this.state.childProperties}>
        { this.props.children }
      </div>
    );
  }
}

Placeholder.propTypes = {
  style: React.PropTypes.object,
  disabledStyle: React.PropTypes.object,
  _isDisabled: React.PropTypes.bool
};

Placeholder.displayName = 'Belle Placeholder';

Placeholder.defaultProps = {
  _isDisabled: false
};

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProperties(properties) {
  return omit(properties, ['style', 'disabledStyle', '_isDisabled']);
}
