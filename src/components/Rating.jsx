"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {extend, omit} from 'underscore';
import style from '../style/rating.js';
import {injectStyles, removeStyle} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import config from '../config/rating';

// Enable React Touch Events
React.initializeTouchEvents(true);

/**
 * Rating component: shows 5 stars for rating.
 * Allows to display, update, highlight, disable rating and do various other customizations.
 */
export default class Rating extends Component {

  constructor(properties) {
    super(properties);

    let value;

    if (this.props.valueLink) {
      value = this.props.valueLink.value;
    } else if (this.props.value) {
      value = this.props.value;
    } else if (this.props.defaultValue) {
      value = this.props.defaultValue;
    }

    this.state = {
      value: value,
      focusedValue: undefined,
      generalProperties: sanitizeWrapperProperties(properties),
      characterProperties: sanitizeCharacterProperties(properties.characterProperties),
      isFocus: false,
      isActive: false
    };
  }

  componentWillReceiveProps(properties) {
    let value;

    if (properties.valueLink) {
      value = properties.valueLink.value;
    } else if (properties.value) {
      value = properties.value;
    } else {
      value = this.state.value;
    }

    this.setState({
      value: value,
      wrapperProperties: sanitizeWrapperProperties(properties),
      characterProperties: sanitizeCharacterProperties(properties.characterProperties)
    });
  }

  /**
   * apply pseudo classes and styling to rating wrapper div
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this.ratingWrapperStyleId = `rating-wrapper-style-id${id}`;
    updatePseudoClassStyle(this.ratingWrapperStyleId, this.props);
  }

  /**
   * removes pseudo classes from the DOM once component is removed
   */
  componentWillUnmount() {
    removeStyle(this.ratingWrapperStyleId);
  }

  /**
   * api method for use to be able to reset the value to undefined
   */
  resetValue() {
    this.setState({
      value: undefined,
      focusedValue: undefined
    });
  }

  /**
   * as mouse enters the component the callback will update rating to value of target span
   */
  _onMouseEnter(event) {
    if(!this.props.disabled) {
      const value = Number(event.target.getAttribute('data-belle-value'));
      this.setState({
        focusedValue: value,
        isHover: true
      });
    } else {
      this.setState({
        isHover: true
      });
    }
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  }

  /**
   * as mouse over the component and enters a new star the callback will update rating to value of target span
   */
  _onMouseMove(event) {
    if(!this.props.disabled) {
      const value = Number(event.target.getAttribute('data-belle-value'));
      if(this.state.focusedValue !== value) {
        this.setState({
          focusedValue: value
        });
      }
    }
    if (this.props.onMouseMove) {
      this.props.onMouseMove(event);
    }
  }

  /**
   * reset component as mouse leaves
   */
  _onMouseLeave(event) {
    if(!this.props.disabled) {
      this.setState({
        focusedValue: undefined,
        isHover: false
      });
    } else {
      this.setState({
        isHover: false
      });
    }

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  }


  /**
   * Sets isActive state to true.
   */
  _onMouseDown(event) {
    if(!this.props.disabled) {
      this.setState({isActive: true});
    }

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  }

  /**
   * Sets isActive state to false.
   */
  _onMouseUp(event) {
    if(!this.props.disabled) {
      this.setState({isActive: false});
    }

    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  }

  /**
   * update component when clicked
   */
  _onClick(event) {
    if(!this.props.disabled) {
      const value = Number(event.target.getAttribute('data-belle-value'));
      this._updateComponent(value);
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  /**
   * Change focusValue and sets isActive state to true.
   */
  _onTouchStart(event) {
    if(!this.props.disabled) {
      const value = Number(event.target.getAttribute('data-belle-value'));
      this.setState({
        focusedValue: value,
        isActive: true
      });
    }
    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  }

  /**
   * set the focusedValue depending on mouse position
   */
  _onTouchMove(event) {
    if(!this.props.disabled) {
      const value = Number(event.target.getAttribute('data-belle-value'));
      this.setState({
        focusedValue: value
      });
    }
    if (this.props.onTouchMove) {
      this.props.onTouchMove(event);
    }
  }

  /**
   * update the component when touch ends
   */
  _onTouchEnd(event) {

    if(!this.props.disabled) {
      this.setState({isActive: false});
      const value = this.state.focusedValue;
      this._updateComponent(value);
    }

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  /**
   * reset the component in case of touch cancel
   */
  _onTouchCancel(event) {
    if(!this.props.disabled) {
      this.setState({
        isActive: false,
        focusedValue: undefined
      });
    }
    if (this.props.onTouchCancel) {
      this.props.onTouchCancel(event);
    }
  }

  /**
   * reset the component on blur
   */
  _onBlur(event) {
    if(!this.props.disabled) {
      this.setState({
        focusedValue: undefined,
        isFocus: false
      });
    }
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  /**
   * enable focus styling of component when tab is used to focus component
   */
  _onFocus() {
    if(!this.state.isActive && !this.props.disabled) {
      this.setState({isFocus: true});
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * update component when component is clicked, touch ends, enter or space key are hit
   * different update logic will apply depending on whether component has property defaultValue, value or valueLink specified
   */
  _updateComponent(value) {
    if (this.props.valueLink) {
      this.props.valueLink.requestChange(value);
      this.setState({
        focusedValue: undefined
      });
    } else if (this.props.value) {
      this.setState({
        focusedValue: undefined
      });
    } else {
      this.setState({
        focusedValue: undefined,
        value: value
      });
    }

    if (this.props.onChange) {
      this.props.onChange({target: { value: value }});
    }
  }

  /**
   * Manages the keyboard events.
   *
   * In case the Rating Component is in focus Space, ArrowUp will result in increasing the value and arrow down will result in decreasing the value.
   * Enter/ space will result in updating the value of the component.
   *
   * Pressing Escape will reset the value to last value.
   *
   */
  _onKeyDown(event) {
    if(!this.props.disabled) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
        event.preventDefault();
        this._onArrowDownKeyDown();
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
        event.preventDefault();
        this._onArrowUpKeyDown();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this._onEnterSpaceKeyDown();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        this._onEscapeKeyDown();
      }
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  /**
   * decrease the value by 1 when arrow down key is pressed
   */
  _onArrowDownKeyDown() {
    let newValue = this.state.focusedValue !== undefined ? this.state.focusedValue : this.state.value;
    newValue = newValue > 0 ? (newValue - 1) : 0;
    this.setState({
      focusedValue: newValue
    });
  }

  /**
   * increase value by 1 when arrow up key is pressed
   */
  _onArrowUpKeyDown() {
    let newValue = this.state.focusedValue !== undefined ? this.state.focusedValue : this.state.value;
    newValue = !newValue ? 1 : (newValue < 5) ? (newValue + 1) : 5;
    this.setState({
      focusedValue: newValue
    });
  }

  /**
   * set component value to current focus value
   */
  _onEnterSpaceKeyDown() {
    let newValue;
    if(this.state.focusedValue !== undefined) {
      if(this.state.focusedValue === 0) {
        newValue = undefined;
      }
      else {
        newValue = this.state.focusedValue;
      }
      this._updateComponent(newValue);
    }
  }

  /**
   * reset component when escape key is pressed
   * esc key should just reset the component displayed rating without removing hover or focus styles
   */
  _onEscapeKeyDown() {
    this.setState({
      focusedValue: undefined
    });
  }

  /**
   * Returns current value of rating to be displayed on the component
   */
  _getCurrentValue() {
    let value;
    if (this.state.focusedValue !== undefined) {
      value = this.state.focusedValue;
    } else {
      value = (this.state.value) ? this.state.value : 0;
    }
    return value;
  }

  /**
   * if this.props.characterProperties exists this function will returns specified property
   */
  _getCharacterProperty(propertyName) {
    if(this.props.characterProperties) {
      return this.props.characterProperties[propertyName];
    }
  }

  /**
   * Function to render component.
   */
  render () {

    const currentValue = this._getCurrentValue();
    const tabIndex = this.props.tabIndex ? this.props.tabIndex : (this.props.disabled ? -1 : 0);

    let characterStyle = extend({}, style.characterStyle, this._getCharacterProperty('characterStyle'));
    let defaultCharacterStyle = {};
    if (this.props.disabled) {
      characterStyle = extend({}, characterStyle, style.disabledCharacterStyle, this._getCharacterProperty('disabledCharacterStyle'));
      defaultCharacterStyle = extend({}, style.disabledDefaultCharacterStyle);
      if (this.state.isHover) {
        characterStyle = extend({}, characterStyle, style.disabledHoverCharacterStyle, this._getCharacterProperty('disabledHoverCharacterStyle'));
      }
    } else {
      if (this.state.isActive) {
        characterStyle = extend({}, characterStyle, style.activeCharacterStyle, this._getCharacterProperty('activeCharacterStyle'));
      } else if (this.state.isHover) {
        characterStyle = extend({}, characterStyle, style.hoverCharacterStyle, this._getCharacterProperty('hoverCharacterStyle'));
      }
    }

    let wrapperStyle = extend({}, style.style, this.props.style);
    if (this.state.isFocus && this.props.preventFocusStyleForTouchAndClick) {
      wrapperStyle = extend({}, wrapperStyle, style.focusStyle, this.props.focusStyle);
    }

    return (
      <div ref="wrapper"
           style={ wrapperStyle }
           className={ unionClassNames(this.props.className, this.ratingWrapperStyleId) }
           onKeyDown={ this._onKeyDown.bind(this) }
           onClick = { this._onClick.bind(this) }
           onMouseEnter={ this._onMouseEnter.bind(this) }
           onMouseMove={ this._onMouseMove.bind(this) }
           onMouseLeave={ this._onMouseLeave.bind(this) }
           onMouseUp={ this._onMouseUp.bind(this) }
           onMouseDown={ this._onMouseDown.bind(this) }
           onTouchStart={ this._onTouchStart.bind(this) }
           onTouchMove={ this._onTouchMove.bind(this) }
           onTouchEnd={ this._onTouchEnd.bind(this) }
           onTouchCancel={ this._onTouchCancel.bind(this) }
           onBlur={ this._onBlur.bind(this) }
           onFocus={ this._onFocus.bind(this) }
           tabIndex={ tabIndex }
           aria-label = { this.props['aria-label'] }
           aria-valuemax = { 5 }
           aria-valuemin = { 1 }
           aria-valuenow = { this.state.value }
           aria-disabled = { this.props.disabled }
           {...this.state.wrapperProperties}>

           {
             React.Children.map([1, 2, 3, 4, 5], (value) => {
               const ratingStyle = (currentValue >= value) ? characterStyle : defaultCharacterStyle;
               return (
                 <span data-belle-value= { value }
                       style={ ratingStyle }
                       {...this.state.characterProperties}>
                   { this.props.character }
                 </span>
               );
             })
           }

      </div>
    );
  }
}

Rating.displayName = 'Belle Rating';

/**
 * Function to create pseudo classes for styles.
 */
function updatePseudoClassStyle(ratingWrapperStyleId, properties) {
  let ratingFocusStyle;
  if (properties.preventFocusStyleForTouchAndClick) {
    ratingFocusStyle = { outline: 0 };
  } else {
    ratingFocusStyle = extend({}, style.focusStyle, properties.focusStyle);
  }
  const styles = [
    {
      id: ratingWrapperStyleId,
      style: ratingFocusStyle,
      pseudoClass: 'focus'
    }
  ];
  injectStyles(styles);
}

/**
 * Props of Rating component
 */
Rating.propTypes = {
  defaultValue: React.PropTypes.oneOf([1, 2, 3, 4, 5]),
  value: React.PropTypes.oneOf([1, 2, 3, 4, 5]),
  valueLink: React.PropTypes.shape({
    value: React.PropTypes.oneOf([1, 2, 3, 4, 5]),
    requestChange: React.PropTypes.func.isRequired
  }),
  disabled: React.PropTypes.bool,
  tabIndex: React.PropTypes.number,
  character: React.PropTypes.string,
  characterProperties: React.PropTypes.object,
  preventFocusStyleForTouchAndClick: React.PropTypes.bool,
  'aria-label': React.PropTypes.string,
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  focusStyle: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onMouseUp: React.PropTypes.func,
  onMouseEnter: React.PropTypes.func,
  onMouseMove: React.PropTypes.func,
  onMouseLeave: React.PropTypes.func,
  onTouchStart: React.PropTypes.func,
  onTouchMove: React.PropTypes.func,
  onTouchEnd: React.PropTypes.func,
  onTouchCancel: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onKeyDown: React.PropTypes.func
};

/**
 * Setting default prop values.
 */
Rating.defaultProps = {
  disabled: false,
  tabIndex: 0,
  character: '★',
  'aria-label': 'rating',
  preventFocusStyleForTouchAndClick: config.preventFocusStyleForTouchAndClick
};

/**
 * sanitize properties for the wrapping div.
 */
function sanitizeWrapperProperties(properties) {
  return omit(properties, [
    'style',
    'className',
    'onKeyDown',
    'onClick',
    'onMouseEnter',
    'onMouseMove',
    'onMouseLeave',
    'onMouseUp',
    'onMouseDown',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel',
    'onBlur',
    'onFocus',
    'tabIndex',
    'aria-label',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-disabled',
    'characterProperties'
  ]);
}

/**
 * sanitize properties for the character span.
 */
function sanitizeCharacterProperties(properties) {
  return omit(properties, [
    'data-belle-value',
    'style'
  ]);
}
