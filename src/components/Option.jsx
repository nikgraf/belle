"use strict";

import React, {Component} from 'react';
import {extend, omit} from 'underscore';
import style from '../style/option';

/**
 * Option component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Option extends Component {

  constructor (properties) {
    super(properties);
    this.state = {
      childProperties: sanitizeChildProperties(properties)
    };
  }

  /**
   * Update the childProperties based on the updated properties passed to the
   * Option.
   */
  componentWillReceiveProps (properties) {
    this.setState({ childProperties: sanitizeChildProperties(properties) });
  }

  render () {
    const defaultStyle = extend({}, style.style, this.props.style);
    const hoverStyle = extend({}, style.hoverStyle, this.props.hoverStyle);
    const selectStyle = extend({}, style.selectStyle, this.props.selectStyle);
    const disabledSelectSyle = extend({}, style.disabledSelectSyle, this.props.disabledSelectSyle);

    let styleToDisplay;
    if (this.props._isDisplayedAsSelected) {
      if (this.props._isDisabled) {
        styleToDisplay = disabledSelectSyle;
      } else {
        styleToDisplay = selectStyle;
      }
    } else if (this.props._isHovered) {
      styleToDisplay = hoverStyle;
    } else {
      styleToDisplay = defaultStyle;
    }

    return (
      <div data-belle-value={ this.props.value }
           style={ styleToDisplay }
           {...this.state.childProperties}>
        { this.props.children }
      </div>
    );
  }
}

Option.propTypes = {
  style: React.PropTypes.object,
  hoverStyle: React.PropTypes.object,
  selectStyle: React.PropTypes.object,
  _isHovered: React.PropTypes.bool,
  _isDisplayedAsSelected: React.PropTypes.bool,
  value: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired
};

Option.displayName = 'Belle Option';

Option.defaultProps = {
  _isHovered: false,
  _isDisplayedAsSelected: false,
  _isDisabled: false
};

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProperties(properties) {
  return omit(properties, [
    'style',
    'hoverStyle',
    'selectStyle',
    'disabledSelectSyle',
    'value',
    '_isHovered',
    '_isDisplayedAsSelected',
    '_isDisabled'
  ]);
}
