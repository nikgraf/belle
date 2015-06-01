"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {extend, omit} from 'underscore';
import style from '../style/rating.js'
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
    this.state = {
      rating: Math.round(properties.defaultValue),
      tempRating: undefined,
      generalProperties: sanitizeProperties(properties),
      active: false,
      focused: false
    };
  }

  componentWillReceiveProps(properties) {
    this.setState({
      rating: Math.round(properties.defaultValue),
      tempRating: undefined,
      generalProperties: sanitizeProperties(properties)
    });
    this._updateComponentValue();
  }

  _updateComponentValue() {
    const wrapperNode = React.findDOMNode(this);
    wrapperNode.value = this.state.rating;
  }

  /**
   * Function to apply pseudo classes to rating and rating wrapper divs.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this.ratingStyleId = `rating-style-id${id}`;
    this.ratingWrapperStyleId = `rating-wrapper-style-id${id}`;
    updatePseudoClassStyle(this.ratingStyleId, this.ratingWrapperStyleId, this.props);
  }

  componentDidMount() {
    this._updateComponentValue();
  }
  /**
   * Function to remove pseudo classes from the DOM once component is removed.
   */
  componentWillUnmount() {
    removeStyle(this.ratingStyleId);
    removeStyle(this.ratingWrapperStyleId);
  }

  /**
   * When user mouse hovers the component this callback will highlight the component and set the tempRating
   * in the component state depending on mouse position.
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
   * When mouse leaves the component this callback will reset the component to its previous state.
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
    this.setState({ active: true });
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  }

  /**
   * Sets active state to true.
   */
  _onTouchStart(event) {
    this.setState({ active: true });
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  /**
   * On a touch device, when user touches the component this function will highlight the component and set the tempRating
   * in the component state depending on touch position.
   */
  _onTouchMove(event) {
    if(!this.props.disabled) {
      if (e.targetTouches.length == 1) {
        const touch = e.targetTouches[0];
        this._changeComponent(touch.pageX);
      }
    }
    if (this.props.onTouchMove) {
      this.props.onTouchMove(event);
    }
  }

  /**
   * When touch ends this callback will update component value.
   */
  _onTouchEnd(event) {
    if(!this.props.disabled) {
      this._updateComponent();
    }
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  /**
   * When touch is cancelled this callback will reset the component tp previous value.
   */
  _onTouchCancel(event) {
    if(!this.props.disabled) {
      this._resetComponent();
    }
    if (this.props.onTouchCancel) {
      this.props.onTouchCancel(event);
    }
  }

  /**
   * On blur callback will reset the component to previous value.
   */
  _onBlur(event) {
    this.setState({
      focused: false,
      active: false
    });
    if(!this.props.disabled) {
      this._resetComponent();
    }
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  /**
   * On focus callback will enable focus styling on component when focused using tab.
   */
  _onFocus() {
    this.setState({focused: true});
    this.forceUpdate();
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * When user clicks the component this callback will update component value to that selected by user.
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
   * Pressing Escape will reset the rating to original value.
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
   * The function will update rating when component is clicked, touch ends, enter or space key are hit.
   */
  _changeComponent(pageX) {
    this._highlight();
    const wrapperNode = React.findDOMNode(this.refs.wrapper);
    const wrapperWidth = wrapperNode.getBoundingClientRect().width;
    const mouseMoved = pageX - wrapperNode.getBoundingClientRect().left;
    const newRating = Math.round(mouseMoved * 5 / wrapperWidth + .4);
    this.setState({
      tempRating: newRating
    });
  }

  /**
   * The function will update rating when component is clicked, touch ends, enter or space key are hit.
   */
  _updateComponent() {
    this.setState({
      rating: this.state.tempRating,
      hoverStyle: undefined
    });
    this._updateComponentValue();
    if (this.props.onChange) {
      const wrapperNode = React.findDOMNode(this);
      this.props.onChange({target: wrapperNode});
    }
  }

  /**
   * Function that will be called to reset the component rating.
   */
  _resetComponent() {
    this.setState({
      tempRating: undefined,
      hoverStyle: undefined
    });
  }

  /**
   * Function will be called when ArrowUp key is hit on a focused component. I will decrease the rating by 1.
   */
  _onArrowDownKeyDown() {
    this._highlight();
    let newRating = this.state.tempRating ? this.state.tempRating:this.state.rating;
    newRating = newRating > 0 ? (newRating-1) : 0;
    this.setState({
      tempRating: newRating
    });
  }

  /**
   * Function will be called when ArrowDown key is hit on a focused component. I will increase the rating by 1.
   */
  _onArrowUpKeyDown() {
    this._highlight();
    let newRating = this.state.tempRating ? this.state.tempRating : this.state.rating;
    newRating = newRating < 5 ? (newRating+1) : 5;
    this.setState({
      tempRating: newRating
    });
  }

  /**
   * Function will apply highlighting to rating component.
   */
  _highlight() {
    if(!this.state.hoverStyle) {
      this.setState({
        hoverStyle: style.hoverStyle
      });
    }
  }

  /**
   * Calculate width of highlighted stars, the function uses this.state.tempRating if it exists else it uses this.state.rating.
   */
  _getWidth() {
    var currentRating = (this.state.tempRating !== undefined)?this.state.tempRating : this.state.rating;
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

    if (this.state.focused && !this.state.active && this.props.preventFocusStyleForTouchAndClick) {
      ratingWrapperCalculatedStyle = extend({}, ratingWrapperCalculatedStyle, style.focusStyle, this.props.focusStyle);
    }

    return <div ref="wrapper"
                style={ ratingWrapperCalculatedStyle }
                className={ unionClassNames(this.props.className, this.ratingWrapperStyleId) }
                onMouseMove={ this._onMouseMove.bind(this) }
                onMouseLeave={ this._onMouseLeave.bind(this) }
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
                aria-valuemax = {5}
                aria-valuemin = {0}
                aria-valuenow = {this.state.rating}
                aria-disabled = {this.props.disabled}
                {...this.state.generalProperties}>
                <div style={ratingCalculatedStyle}
                  className={ this.ratingStyleId }>
                </div>
              </div>;
  }
}

/**
 * Props of Rating component
 */
Rating.propTypes = {
  defaultValue: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  tabIndex: React.PropTypes.number,
  ratingCharacter: React.PropTypes.string,
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
  defaultValue: 0,
  disabled: false,
  tabIndex: 0,
  ratingCharacter: '★',
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
    'onFocus'
  ]);
}
