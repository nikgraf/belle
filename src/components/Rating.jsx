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

    let rating;

    if (this.props.valueLink) {
      rating = this.props.valueLink.value;
    } else if (this.props.value) {
      rating = this.props.value;
    } else if (this.props.defaultValue) {
      rating = this.props.defaultValue;
    }

    this.state = {
      rating: rating,
      tempRating: undefined,
      generalProperties: sanitizeProperties(properties),
      focused: false
    };
  }

  componentWillReceiveProps(properties) {
    let rating;

    if (properties.valueLink) {
      rating = properties.valueLink.value;
    } else if (properties.value) {
      rating = properties.value;
    }

    this.setState({
      rating: rating,
      generalProperties: sanitizeProperties(properties)
    });
    this._updateComponentValue(rating);
  }

  componentDidMount() {
    this._updateComponentValue(this.state.rating);
  }

  /**
   * apply pseudo classes to rating and rating wrapper divs
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this.ratingStyleId = `rating-style-id${id}`;
    this.ratingWrapperStyleId = `rating-wrapper-style-id${id}`;
    updatePseudoClassStyle(this.ratingStyleId, this.ratingWrapperStyleId, this.props);
  }

  /**
   * removes pseudo classes from the DOM once component is removed
   */
  componentWillUnmount() {
    removeStyle(this.ratingStyleId);
    removeStyle(this.ratingWrapperStyleId);
  }

  /**
   * api method for use to be able to reset rating to undefined
   */
  resetRating() {
    this.setState({
      rating: undefined,
      tempRating: undefined
    });
  }

  /**
   * Sets new value to component node
   */
  _updateComponentValue(ratingValue) {
    const wrapperNode = React.findDOMNode(this);
    wrapperNode.value = ratingValue;
  }

  /**
   * in case of mouse hover highlights the component and set the tempRating depending on mouse position
   */
  _onMouseMove(event) {
    if(!this.props.disabled) {
      this._changeComponent(event.pageX);
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
      this._resetComponent();
    }
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  }


  /**
   * Sets active state to true.
   */
  _onMouseDown(event) {
    this.active = true;

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  }

  /**
   * Sets active state to false.
   */
  _onMouseUp(event) {
    this.active = false;

    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  }

  /**
   * Sets active state to true.
   */
  _onTouchStart(event) {
    this.active = true;
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  /**
   * On a touch device, in case of touch move highlights the component and set the tempRating depending on mouse position
   */
  _onTouchMove(event) {
    if(!this.props.disabled) {
      if (event.targetTouches.length === 1) {
        const touch = event.targetTouches[0];
        this._changeComponent(touch.pageX);
      }
    }
    if (this.props.onTouchMove) {
      this.props.onTouchMove(event);
    }
  }

  /**
   * update the component when touch ends
   */
  _onTouchEnd(event) {
    this.active = false;
    if(!this.props.disabled) {
      this._updateComponent();
    }

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  /**
   * reset the component in case of touch cancel
   */
  _onTouchCancel(event) {
    this.active = false;
    if(!this.props.disabled) {
      this._resetComponent();
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
        focused: false,
        tempRating: undefined,
        hoverStyle: undefined
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
    if(!this.active) {
      this.setState({focused: true});
    }
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * update component when clicked
   */
  _onClick(event) {
    if(!this.props.disabled) {
      this._updateComponent();
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  /**
   * Manages the keyboard events.
   *
   * In case the Rating Component is in focus Space, ArrowUp will result in increasing the rating and arrow down will result in decreasing the rating.
   * Enter/ space will result in updating the value of the component and calling onChange event.
   *
   * Pressing Escape will reset the rating to last value.
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
        this._updateComponent();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        this._resetComponent();
      }
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  /**
   * calculate tempRating and apply highlighting to the component when it is clicked, touch ends, enter or space key are hit
   */
  _changeComponent(pageX) {
    const wrapperNode = React.findDOMNode(this.refs.wrapper);
    const wrapperWidth = wrapperNode.getBoundingClientRect().width;
    const mouseMoved = pageX - wrapperNode.getBoundingClientRect().left;
    const newRating = Math.round(mouseMoved * 5 / wrapperWidth + 0.4);
    this._showTempRating(newRating);
  }

  /**
   * update component component is clicked, touch ends, enter or space key are hit.
   */
  _updateComponent() {
    var ratingValue = this.state.tempRating > 0 ? this.state.tempRating : undefined;
    if(this.props.valueLink) {
      this.props.valueLink.requestChange(ratingValue);
    }
    else if(!this.props.value && this.props.defaultValue) {
      this.setState({
        rating: ratingValue
      });
    }
    this.setState({
      hoverStyle: undefined
    });
    this._updateComponentValue(ratingValue);
    if (this.props.onChange) {
      const wrapperNode = React.findDOMNode(this);
      this.props.onChange({target: wrapperNode});
    }
  }

  /**
   * Function that will be called to reset the component rating.
   * This method looks like duplicate of resetRating above but that is an api method, this method is internal to the component
   */
  _resetComponent() {
    this.setState({
      tempRating: undefined,
      hoverStyle: undefined
    });
  }

  /**
   * decrease rating by 1 when arrow down key is pressed
   */
  _onArrowDownKeyDown() {
    let newRating = this.state.tempRating ? this.state.tempRating:this.state.rating;
    newRating = newRating > 2 ? (newRating-1) : undefined;
    this._showTempRating(newRating);
  }

  /**
   * increase rating by 1 when arrow up key is pressed
   */
  _onArrowUpKeyDown() {
    let newRating = this.state.tempRating ? this.state.tempRating : this.state.rating;
    newRating = newRating < 5 ? (newRating + 1) : 5;
    this._showTempRating(newRating);
  }

  /**
   * apply highlighting to rating component
   */
  _showTempRating(tempRating) {
    this.setState({
      hoverStyle: style.hoverStyle,
      tempRating: tempRating
    });
  }

  /**
   * Calculate width of highlighted stars, the function uses
   * this.state.tempRating if it exists else it uses this.state.rating.
   */
  _getWidth() {
    var currentRating = (this.state.tempRating !== undefined)?this.state.tempRating : (this.state.rating !== undefined)? this.state.rating: 0;
    return (currentRating * 20) + '%';
  }

  /**
   * Function to render component.
   */
  render () {
    const width = this._getWidth();
    const ratingCalculatedStyle = extend({}, style.style, { width: width }, this.state.hoverStyle);
    const ratingWrapperStateStyle = this.props.disabled ? extend({}, style.disabledStyle, this.props.disabledStyle) : style.enabledStyle;
    let ratingWrapperCalculatedStyle = extend({}, style.wrapperStyle, ratingWrapperStateStyle, this.props.style);
    const tabIndex = this.props.tabIndex ? this.props.tabIndex : (this.props.disabled ? -1 : 0);

    if (this.state.focused && this.props.preventFocusStyleForTouchAndClick) {
      ratingWrapperCalculatedStyle = extend({}, ratingWrapperCalculatedStyle, style.focusStyle, this.props.focusStyle);
    }

    return <div ref="wrapper"
                style={ ratingWrapperCalculatedStyle }
                className={ unionClassNames(this.props.className, this.ratingWrapperStyleId) }
                onMouseMove={ this._onMouseMove.bind(this) }
                onMouseLeave={ this._onMouseLeave.bind(this) }
                onMouseUp={ this._onMouseUp.bind(this) }
                onMouseDown={ this._onMouseDown.bind(this) }
                onClick={ this._onClick.bind(this) }
                onKeyDown={ this._onKeyDown.bind(this) }
                onTouchStart={ this._onTouchStart.bind(this) }
                onTouchMove={ this._onTouchMove.bind(this) }
                onTouchEnd={ this._onTouchEnd.bind(this) }
                onTouchCancel={ this._onTouchCancel.bind(this) }
                onBlur={ this._onBlur.bind( this) }
                onFocus={ this._onFocus.bind(this) }
                tabIndex={ tabIndex }
                aria-label = { this.props['aria-label'] }
                aria-valuemax = { 5 }
                aria-valuemin = { 1 }
                aria-valuenow = { this.state.rating }
                aria-disabled = { this.props.disabled }
                {...this.state.generalProperties}>
                <div style={ ratingCalculatedStyle }
                  className={ this.ratingStyleId }>
                </div>
              </div>;
  }
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
  onChange: React.PropTypes.func,
  tabIndex: React.PropTypes.number,
  ratingCharacter: React.PropTypes.string,
  preventFocusStyleForTouchAndClick: React.PropTypes.bool,
  'aria-label': React.PropTypes.string,
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  hoverStyle: React.PropTypes.object,
  focusStyle: React.PropTypes.object,
  disabledStyle: React.PropTypes.object,
  disabledHoverStyle: React.PropTypes.object,
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
  ratingCharacter: '★',
  'aria-label': 'rating',
  preventFocusStyleForTouchAndClick: config.preventFocusStyleForTouchAndClick
};

Rating.displayName = 'Belle Rating';

/**
 * Function to create pseudo classes for styles.
 */
function updatePseudoClassStyle(ratingStyleId, ratingWrapperStyleId, properties) {
  const ratingStyleBefore = {
    content: "'" + properties.ratingCharacter + properties.ratingCharacter + properties.ratingCharacter +
              properties.ratingCharacter + properties.ratingCharacter + "'"
  };
  let ratingFocusStyle;
  if (properties.preventFocusStyleForTouchAndClick) {
    ratingFocusStyle = { outline: 0 };
  } else {
    ratingFocusStyle = extend({}, style.focusStyle, properties.focusStyle);
  }
  const styles = [
    {
      id: ratingStyleId,
      style: ratingStyleBefore,
      pseudoClass: ':before'
    },
    {
      id: ratingWrapperStyleId,
      style: ratingStyleBefore,
      pseudoClass: ':before'
    },
    {
      id: ratingWrapperStyleId,
      style: ratingFocusStyle,
      pseudoClass: 'focus'
    }
  ];
  if(properties.hoverStyle) {
    styles.push({
      id: ratingWrapperStyleId,
      style: properties.hoverStyle,
      pseudoClass: 'hover'
    });
  }
  if(properties.disabledHoverStyle) {
    styles.push({
      id: ratingWrapperStyleId,
      style: properties.disabledHoverStyle,
      pseudoClass: 'hover',
      disabled: true
    });
  }
  injectStyles(styles);
}

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeProperties(properties) {
  return omit(properties, [
    'defaultValue',
    'value',
    'valueLink',
    'disabled',
    'onChange',
    'ratingCharacter',
    'style',
    'className',
    'hoverStyle',
    'focusStyle',
    'disabledStyle',
    'disabledHoverStyle',
    'tabIndex',
    'onMouseUp',
    'onMouseDown',
    'onMouseMove',
    'onMouseLeave',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel',
    'onBlur',
    'onClick',
    'onKeyDown',
    'onFocus',
    'preventFocusStyleForTouchAndClick'
]);
}
