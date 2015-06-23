"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {injectStyles, removeStyle} from '../utils/inject-style';
import {extend, omit, isUndefined, first, last} from "underscore";
import style from '../style/toggle';
import isComponentTypeOf from '../utils/is-component-of-type.js';

function sanitizeChildProperties(properties) {
  let childProperties = omit(properties, [
    'style',
    'onChange',
    'checked',
    'defaultChecked'
  ]);

  return childProperties;
}


/**
 * Toggle component
 */
export default class Toggle extends Component {

  constructor(properties) {
    super(properties);
    let checked = properties.defaultChecked ? properties.defaultChecked : false;
    checked = properties.checked ? properties.checked : checked;

    this.childProperties = sanitizeChildProperties(properties);

    this.state = {
      value : checked
    };

    this._touchStartedAtSlider = false;
    this._touchEndedNotInSlider = false;

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._mouseDragMoved = undefined;
    this._preventSwitch = false;
  }

  _onClick(event) {
    console.log('on click');
    this._triggerChange(!this.state.value);
  }

  _triggerChange(value) {
    this.setState({
      value: value,
      isDraggingWithMouse: false
    });

    if (this.props.onChange) {
      this.props.onChange({ target: { value: value }});
    }
  }

  _onMouseDown(event) {
    // check for left mouse button pressed
    if (event.button !== 0) return;

    this._mouseDragStart = event.pageX - (this.state.value ? style.sliderOffset : 0);
    this._preventSwitch = false;

    this.setState({
      isDraggingWithMouse: true,
      sliderOffset: (this.state.value ? style.sliderOffset : 0)
    });
  }

  _onMouseMove(event) {
    if (!this.state.isDraggingWithMouse) return;

    let difference = event.pageX - this._mouseDragStart;

    if (this.state.value && difference > this._mouseDragMoved) {
      this._preventSwitch = true;
    } else if (!this.state.value && difference < this._mouseDragMoved) {
      this._preventSwitch = true;
    }

    this._mouseDragMoved = difference;
    // TODO calculate the limits from real elements

    if (difference < 0 || difference > 60 - 28) return;

    this._mouseDragEnd = difference;
    this.setState({
      sliderOffset: difference
    });
  }

  _onMouseUp(event) {
    // TODO calculate the limits from real elements

    if (this._mouseDragEnd) {
      if (!this._preventSwitch) {
        this._triggerChange(!this.state.value);
      } else if (this._preventSwitch) {
        const value = this._mouseDragEnd > (style.handle.width / 2);
        this._triggerChange(value);
      }
    } else {
      this._triggerChange(!this.state.value);
    }

    this._mouseDragStart = undefined;
    this._mouseDragMoved = undefined;
    this._mouseDragEnd = undefined;
    this._preventSwitch = false;
  }

  _onMouseLeave(event) {
    if (this._mouseDragStart && !this._preventSwitch) {
      this._triggerChange(!this.state.value);
    } else if (this._mouseDragStart && this._preventSwitch) {
      const value = this._mouseDragEnd > (style.handle.width / 2);
      this._triggerChange(value);
    }

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._mouseDragMoved = undefined;
    this._preventSwitch = false;
  }

  _onTouchStartAtSlider (event) {
    if (event.touches.length === 1) {
      this._touchStartedAtSlider = true;
    }
  }

  _onTouchMoveAtSlider (event) {
    // TODO move to requestAnimationFrame
    if (event.touches.length === 1 && this._touchStartedAtSlider) {
      const touch = event.touches[0];
      const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
      const toggleTrackCheck = React.findDOMNode(this.refs.toggleTrackCheck);
      const trackCrossNode = React.findDOMNode(this.refs.toggleTrackCross);

      this._touchEndedNotInSlider = !(touchedElement === toggleTrackCheck || touchedElement === trackCrossNode);
    }
  }

  _onTouchEndAtSlider (event) {
    if (this._touchStartedAtSlider && !this._touchEndedNotInSlider) {
      // prevent the onClick to happen
      event.preventDefault();
      this._triggerChange(!this.state.value);
    }
    this._touchStartedAtSlider = false;
    this._touchEndedNotInSlider = false;
  }

  _onTouchCancelAtSlider (event) {
    this._touchStartedAtSlider = false;
    this._touchEndedNotInSlider = false;
  }

  _onTouchStartHandle(event) {
    debugger
  }

  _onTouchMoveHandle(event) {

  }

  _onTouchEndHandle(event) {

  }

  _onTouchCancelHandle(event) {

  }

  render() {
    const computedToggleStyle = extend( {}, style.toggle );
    let computedSliderStyle;
    let handleStyle;

    if(this.state.isDraggingWithMouse){
      computedSliderStyle = extend( {}, style.slider, { left: this.state.sliderOffset - 32, transition: "none" } );
      handleStyle = extend( {}, style.handle, { left: this.state.sliderOffset, transition: "none" } );
    }else{
      computedSliderStyle = extend( {}, style.slider, { left: this.state.value ? 0 : -style.sliderOffset } );
      handleStyle = extend( {}, style.handle, { left: this.state.value ? style.sliderOffset + 1 : -1 } );
    }

    const computedTrueChoice = first(this.props.children) ? first(this.props.children) : "✔";
    const computedFalseChoice = last(this.props.children) ? last(this.props.children) : "✘";

    const computedTrueChoiceStyle = extend( {}, style.check );
    const computedFalseChoiceStyle = extend( {}, style.cross );

    return (
      <div style={ computedToggleStyle }>
        <div style={ style.sliderWrapper}
             ref="sliderWrapper">
          <div className="react-toggle-slider"
               ref="belleToggleSlider"
               style={ computedSliderStyle }>
            <div ref="toggleTrackCheck"
                 style={ computedTrueChoiceStyle }
                 onClick={ this._onClick.bind(this) }
                 onTouchStart={ this._onTouchStartAtSlider.bind(this) }
                 onTouchMove={ this._onTouchMoveAtSlider.bind(this) }
                 onTouchEnd={ this._onTouchEndAtSlider.bind(this) }
                 onTouchCancel={ this._onTouchCancelAtSlider.bind(this) }>
              { computedTrueChoice }
            </div>
            <div ref="toggleTrackCross"
                 style={ computedFalseChoiceStyle }
                 onClick={ this._onClick.bind(this) }
                 onTouchStart={ this._onTouchStartAtSlider.bind(this) }
                 onTouchMove={ this._onTouchMoveAtSlider.bind(this) }
                 onTouchEnd={ this._onTouchEndAtSlider.bind(this) }
                 onTouchCancel={ this._onTouchCancelAtSlider.bind(this) }>
              { computedFalseChoice }
            </div>
          </div>
        </div>
        <div className="react-toggle-handle"
             ref="belleToggleHandle"
             style={ handleStyle }
             onMouseDown={ this._onMouseDown.bind(this) }
             onMouseMove={ this._onMouseMove.bind(this) }
             onMouseUp={ this._onMouseUp.bind(this) }
             onMouseLeave={ this._onMouseLeave.bind(this) }
             onTouchStart={ this._onTouchStartHandle.bind(this) }
             onTouchMove={ this._onTouchMoveHandle.bind(this) }
             onTouchEnd={ this._onTouchEndHandle.bind(this) }
             onTouchCancel={ this._onTouchCancelHandle.bind(this) } />
      </div>
    );
  }
}

Toggle.displayName = 'Belle Toggle';

Toggle.propTypes = {
  children: validateChoices,
  value: React.PropTypes.bool,
  defaultValue: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  valueLink: React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    requestChange: React.PropTypes.func.isRequired
  })
};

Toggle.defaultProps = {
  disabled: false
};

/**
 * Verifies that the children is an array containing only two choices with a
 * different value.
 */
function validateChoices (props, propName, componentName) {
  const error = React.PropTypes.arrayOf(choicePropType)(props, propName, componentName);
  if (error) return error;

  if (props.children && props.children.length !== 2) {
    return new Error(`Invalid children supplied to \`${componentName}\`, expected exactly two Choice components.`);
  }
  if (props.children &&
      first(props.children).props.value === last(props.children).props.value) {
    return new Error(`Invalid children supplied to \`${componentName}\`, expected different value properties for the provided Choice components.`);
  }
}

/**
 * Verifies that the provided property is a Choice from Belle.
 */
function choicePropType(props, propName, componentName) {
  if (!(props[propName] && isComponentTypeOf('Choice', props[propName]))) {
    return new Error(`Invalid children supplied to \`${componentName}\`, expected a Choice component from Belle.`);
  }
}
