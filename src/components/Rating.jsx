"use strict";

import React, {Component} from 'react';
import {extend, omit} from 'underscore';
import style from '../style/rating.js'
import {injectStyles, removeStyle} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';

// Enable React Touch Events
React.initializeTouchEvents(true);

/**
 * Rating component: shows 5 stars for rating.
 * Allows to display, update, highlight, disable rating and do various other customizations.
 */
export default class Rating extends Component {

  constructor(properties) {
    super(properties);
    this._initState(properties);
  }

  componentWillReceiveProps(properties) {
    this._initState(properties);
  }

  _initState(properties) {
    this.state = {
      rating: Math.ceil(properties.defaultValue),
      tempRating: undefined,
      generalProperties: sanitizeProperties(properties)
    };
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

  /**
   * Function to remove pseudo classes from dom once component is removed.
   */
  componentWillUnmount() {
    removeStyle(this.ratingStyleId);
    removeStyle(this.ratingWrapperStyleId);
  }

  /**
   * When user mouse hovers the component this function will highlight the component and set the tempRating
   * in the component state depending on mouse position.
   */
  _mouseMove(e) {
    if(!this.props.disabled) {
      this._changeComponent(e.pageX);
    }
  }

  /**
   * On a touch device, when user touches the component this function will highlight the component and set the tempRating
   * in the component state depending on touch position.
   */
  _touchMove(e) {
    if(!this.props.disabled) {
      if (e.targetTouches.length == 1) {
        const touch = e.targetTouches[0];
        this._changeComponent(touch.pageX);
      }
    }
  }

  _changeComponent(pageX) {
    this._highlight();
    const wrapperNode = React.findDOMNode(this.refs.wrapper);
    const wrapperWidth = wrapperNode.getBoundingClientRect().width;
    const mouseMoved = pageX - wrapperNode.getBoundingClientRect().left;
    const newRating = Math.ceil(mouseMoved * 5 / wrapperWidth);
    this.setState({
      tempRating: newRating
    });
  }

  /**
   * Function that will be called to reset the component after mouse leave, touch cancel, blur or when escape key is pressed.
   */
  _resetComponent() {
    if(!this.props.disabled) {
      this.setState({
        tempRating: undefined,
        hoverStyle: undefined
      });
    }
  }

  /**
   * The function will update rating when component is clicked, touch ends, enter or space key are hit.
   */
  _updateComponent() {
    if(!this.props.disabled) {
      this.setState({
        rating: this.state.tempRating,
        hoverStyle: undefined
      });
      if (this.props.onChange) {
        const wrapperNode = React.findDOMNode(this);
        wrapperNode.value = this.state.tempRating;
        this.props.onChange({target: wrapperNode});
      }
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
  }

  /**
   * Function will be called when ArrowUp key is hit on a focused component. I will decrease the rating by 1.
   */
  _onArrowDownKeyDown() {
    this._highlight();
    let newRating = this.state.tempRating?this.state.tempRating:this.state.rating;
    newRating = newRating>0?(newRating-1):0;
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
    var currentRating = (this.state.tempRating !== undefined)?this.state.tempRating:this.state.rating;
    return (currentRating * 20) + '%';
  }

  /**
   * Function to render component.
   */
  render () {
    const width = this._getWidth();
    const ratingCalculatedStyle = extend({}, style.ratingStyle, { width: width }, this.state.hoverStyle);
    const ratingWrapperStateStyle = this.props.disabled ? extend({}, style.disabledStyle, this.props.disabledStyle) : style.enabledStyle;
    const ratingWrapperCalculatedStyle = extend({}, style.ratingWrapperStyle, ratingWrapperStateStyle, this.props.style);

    return <div ref="wrapper"
                style={ ratingWrapperCalculatedStyle }
                className={ unionClassNames(this.props.className, this.ratingWrapperStyleId) }
                onMouseMove={ this._mouseMove.bind(this) }
                onMouseLeave={ this._resetComponent.bind(this) }
                onClick={ this._updateComponent.bind(this) }
                onKeyDown={ this._onKeyDown.bind(this) }
                onTouchMove={ this._touchMove.bind(this) }
                onTouchEnd={ this._updateComponent.bind(this) }
                onTouchCancel={ this._resetComponent.bind(this) }
                onBlur={ this._resetComponent.bind( this) }
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
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  hoverStyle: React.PropTypes.object,
  focusStyle: React.PropTypes.object,
  disabledStyle: React.PropTypes.object,
  disabledHoverStyle: React.PropTypes.object
};

/**
 * Setting default prop values.
 */
Rating.defaultProps = {
  defaultValue: 0,
  disabled: false,
  tabIndex: 0,
  ratingCharacter: '★'
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
  const ratingFocusStyle = extend({}, style.focusStyle, properties.focusStyle);
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
    'disabledHoverStyle'
  ]);
}
