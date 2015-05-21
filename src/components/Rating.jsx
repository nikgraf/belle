"use strict";

import React, {Component} from 'react';
import {extend, omit} from 'underscore';
import style from '../style/rating.js'
import {injectStyles, removeStyle} from '../utils/inject-style';

/**
 * Rating component: shows 5 stars for rating. Allows to display, update, disable rating.
 */
export default class Rating extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      rating: Math.ceil(this.props.value),
      hoverRating: undefined
    };
  }

  /**
   * Function to apply pseudo classes to rating and rating holder divs.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this.ratingStyleId = `rating-style-id${id}`;
    this.ratingHolderStyleId = `rating-holder-style-id${id}`;
    updatePseudoClassStyle(this.ratingStyleId, this.ratingHolderStyleId, this.props.ratingCharacter);
  }

  /**
   * Funtion to remove pseudo classes from dom once component is removed.
   */
  componentWillUnmount() {
    removeStyle(this.ratingStyleId);
    removeStyle(this.ratingHolderStyleId);
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
        ratingStyleHover: style.ratingStyleHover
      });
      const wrapperNode = React.findDOMNode(this.refs.holder);
      const holderWidth = wrapperNode.getBoundingClientRect().width;
      const mouseMoved = e.pageX - wrapperNode.getBoundingClientRect().left;
      const newRating = Math.ceil(mouseMoved * 5 / holderWidth);
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
        ratingStyleHover: undefined
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
        ratingStyleHover: undefined
      });
      if (this.props.onChange) {
        const wrapperNode = React.findDOMNode(this);
        wrapperNode.value = this.state.hoverRating;
        this.props.onChange({target: wrapperNode});
      }
    }
  }

  //We may not allow custom styling to component since that can interfere with the rating calculations.
  /**
   * Function to render component.
   */
  render () {
    const width = this._getWidth();
    const ratingCalculatedStyle = extend({}, style.ratingStyle, {width: width}, this.state.ratingStyleHover);
    const ratingHolderStateStyle = this.props.disabled?style.ratingStyleDisabled:style.ratingStyleEnabled;
    const ratingHolderCalculatedStyle = extend({}, style.ratingHolderStyle, ratingHolderStateStyle);

    return <div ref="holder"
                style={ratingHolderCalculatedStyle}
                className={ this.ratingHolderStyleId }
                onMouseMove={ this._onMouseMove.bind(this) }
                onMouseLeave={ this._onMouseLeave.bind(this) }
                onClick={ this._onClick.bind(this) }
                tabIndex={ this.props.tabIndex}>
                <div style={ratingCalculatedStyle}
                  className={ this.ratingStyleId }></div>
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
  ratingCharacter: React.PropTypes.string
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
function updatePseudoClassStyle(ratingStyleId, ratingHolderStyleId, ratingCharacter) {
  const ratingStyleBefore = {
    content: "'" + ratingCharacter + ratingCharacter + ratingCharacter +
              ratingCharacter + ratingCharacter + "'"
  };
  const styles = [
    {
      id: ratingStyleId,
      style: ratingStyleBefore,
      pseudoClass: ':before'
    },
    {
      id: ratingHolderStyleId,
      style: ratingStyleBefore,
      pseudoClass: ':before'
    }
  ];
  injectStyles(styles);
}
