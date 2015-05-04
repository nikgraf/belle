"use strict";

import React, {Component} from 'react';
import {extend} from 'underscore';
import style from '../style/option';

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
    const defaultStyle = extend({}, style.optionStyle, this.props.style);
    const hoverStyle = extend({}, style.optionHoverStyle, this.props.hoverStyle);
    const selectStyle = extend({}, style.optionSelectStyle, this.props.selectStyle);

    let styleToDisplay;
    if (this.props.isDisplayedAsSelected) {
      styleToDisplay = selectStyle;
    } else if (this.props.isHovered) {
      styleToDisplay = hoverStyle;
    } else {
      styleToDisplay = defaultStyle;
    }

    return (
      <div data-belle-value={ this.props.value }
           style={ styleToDisplay }>
        { this.props.children }
      </div>
    );
  }
}

Option.propTypes = {
  style: React.PropTypes.object,
  hoverStyle: React.PropTypes.object,
  isHovered: React.PropTypes.bool,
  _isDisplayedAsSelected: React.PropTypes.bool,
  value: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Date)
  ]).isRequired
};

Option.displayName = 'Belle Option';
