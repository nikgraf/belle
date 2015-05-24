"use strict";

import React, {Component} from 'react';
import {extend, omit} from 'underscore';
import style from '../style/rating.js'
import {injectStyles, removeStyle} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';

/**
 * Rating component: shows 5 stars for rating. Allows to display, update, disable rating.
 */
export default class Rating extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      rating: Math.ceil(properties.value),
      hoverRating: undefined,
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
   * Funtion to remove pseudo classes from dom once component is removed.
   */
  componentWillUnmount() {
    removeStyle(this.ratingStyleId);
    removeStyle(this.ratingWrapperStyleId);
  }

  /**
   * Calculate width of highlighted stars, the function uses this.state.hoverRating
   * if it exists else it uses this.state.rating.
   */
  _getWidth() {
    var value = this.state.hoverRating?this.state.hoverRating:this.state.rating;
    return (value * 20) + '%';
  }

  /**
   * When mouse hover overs the component this function will set the hoverRating
   * in the component state depending on mouse position.
   */
  _onMouseMove(e) {
    if(!this.props.disabled) {
      this.setState({
        mouseMoveStyle: style.mouseMoveStyle
      });
      const wrapperNode = React.findDOMNode(this.refs.wrapper);
      const wrapperWidth = wrapperNode.getBoundingClientRect().width;
      const mouseMoved = e.pageX - wrapperNode.getBoundingClientRect().left;
      const newRating = Math.ceil(mouseMoved * 5 / wrapperWidth);
      this.setState({
        hoverRating: newRating
      });
    }
  }

  /**
   * Function will reset hover rating as mouse leaves.
   */
  _onMouseLeave() {
    if(!this.props.disabled) {
      this.setState({
        hoverRating: undefined,
        mouseMoveStyle: undefined
      });
    }
  }

  /**
   * The function will update rating when component is clicked.
   */
  _onClick() {
    if(!this.props.disabled) {
      this.setState({
        rating: this.state.hoverRating,
        mouseMoveStyle: undefined
      });
      if (this.props.onChange) {
        const wrapperNode = React.findDOMNode(this);
        wrapperNode.value = this.state.hoverRating;
        this.props.onChange({target: wrapperNode});
      }
    }
  }

  /**
   * Function to render component.
   */
  render () {
    const width = this._getWidth();
    const ratingCalculatedStyle = extend({}, style.ratingStyle, {width: width}, this.state.mouseMoveStyle);
    const ratingWrapperStateStyle = this.props.disabled?extend({}, style.disabledStyle, this.props.disabledStyle):style.enabledStyle;
    const ratingWrapperCalculatedStyle = extend({}, style.ratingWrapperStyle, ratingWrapperStateStyle, this.props.style);

    return <div ref="wrapper"
                style={ ratingWrapperCalculatedStyle }
                className={ unionClassNames(this.props.className, this.ratingWrapperStyleId) }
                onMouseMove={ this._onMouseMove.bind(this) }
                onMouseLeave={ this._onMouseLeave.bind(this) }
                onClick={ this._onClick.bind(this) }
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
  value: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
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
  value: 0,
  disabled: false,
  tabIndex: 0,
  ratingCharacter: '\\2605'
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
    }
  ];
  if(properties.focusStyle) {
    styles.push({
      id: ratingWrapperStyleId,
      style: properties.focusStyle,
      pseudoClass: 'focus'
    });
  }
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
    'value',
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


// Should we disable taxIndex and focus for disabled component ?
