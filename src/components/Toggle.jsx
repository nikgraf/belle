"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {injectStyles, removeStyle} from '../utils/inject-style';
import {extend, omit, isUndefined, first, last} from "underscore";
import style from '../style/toggle';
import isComponentTypeOf from '../utils/is-component-of-type.js';
import {requestAnimationFrame, cancelAnimationFrame} from '../utils/animation-frame-management';

// Enable React Touch Events
React.initializeTouchEvents(true);

/**
 * Toggle component
 */
export default class Toggle extends Component {

  constructor (properties) {
    super(properties);
    let checked = properties.defaultChecked ? properties.defaultChecked : false;
    checked = properties.checked ? properties.checked : checked;

    this.childProperties = sanitizeChildProperties(properties);

    this.state = {
      value : checked,
      isDraggingWithMouse: false,
      isDraggingWithTouch: false,
      wrapperProperties: sanitizePropertiesForWrapper(properties.wrapperProps),
    };

    this._touchStartedAtSlider = false;
    this._touchEndedNotInSlider = false;

    this._preventTouchSwitch = false;

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._preventMouseSwitch = false;
  }

  componentWillReceiveProps (properties) {
    this.setState({
      wrapperProperties: sanitizePropertiesForWrapper(properties.wrapperProps)
    });
  }

  _onClick (event) {
    this._triggerChange(!this.state.value);
  }

  _triggerChange (value) {
    this.setState({
      value: value,
      isDraggingWithMouse: false,
      isDraggingWithTouch: false
    });

    if (this.props.onChange) {
      this.props.onChange({ target: { value: value }});
    }
  }

  _onMouseDown (event) {
    // check for left mouse button pressed
    if (event.button !== 0) return;

    const defaultSliderOffset = style.check.width - style.handle.width / 2;

    this._mouseDragStart = event.pageX - (this.state.value ? defaultSliderOffset : 0);
    this._preventMouseSwitch = false;

    this.setState({
      isDraggingWithMouse: true,
      sliderOffset: (this.state.value ? defaultSliderOffset : 0)
    });
  }

  _onMouseMove (event) {
    if (!this.state.isDraggingWithMouse) return;

    // the requestAnimationFrame function must be executed in the context of window
    // see http://stackoverflow.com/a/9678166/837709
    const animationFrame = requestAnimationFrame.call(
      window,
      this._updateComponentOnMouseMove.bind(this, event.pageX)
    );

    if(this.previousMouseMoveFrame) {
      // the cancelAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      cancelAnimationFrame.call(window, this.previousMouseMoveFrame);
    }
    this.previousMouseMoveFrame = animationFrame;
  }

  _updateComponentOnMouseMove (pageX) {
    let difference = pageX - this._mouseDragStart;

    if (this.state.value &&
        this._mouseDragEnd &&
        difference > this._mouseDragEnd) {
      this._preventMouseSwitch = true;
    } else if (!this.state.value &&
               this._mouseDragEnd &&
               difference < this._mouseDragEnd) {
      this._preventMouseSwitch = true;
    }

    // TODO calculate the limits from real elements
    this._mouseDragEnd = difference;

    if (difference < 0 || difference > 60 - 28) return;

    this.setState({
      sliderOffset: difference
    });
  }

  _onMouseUp (event) {
    // TODO calculate the limits from real elements

    if (this._mouseDragEnd) {
      if (!this._preventMouseSwitch) {
        this._triggerChange(!this.state.value);
      } else if (this._preventMouseSwitch) {
        const value = this._mouseDragEnd > (style.handle.width / 2);
        this._triggerChange(value);
      }
    } else {
      this._triggerChange(!this.state.value);
    }

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._preventMouseSwitch = false;
  }

  _onMouseLeave (event) {
    if (this._mouseDragStart && !this._preventMouseSwitch) {
      this._triggerChange(!this.state.value);
    } else if (this._mouseDragStart && this._preventMouseSwitch) {
      const value = this._mouseDragEnd > (style.handle.width / 2);
      this._triggerChange(value);
    }

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._preventMouseSwitch = false;
  }

  _onTouchStartAtSlider (event) {
    if (event.touches.length === 1) {
      this._touchStartedAtSlider = true;
    }
  }

  _onTouchMoveAtSlider (event) {
    if (event.touches.length === 1 && this._touchStartedAtSlider) {

      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      const animationFrame = requestAnimationFrame.call(
        window,
        this._updateComponentOnTouchMoveAtSlider.bind(this, event.touches[0])
      );

      if(this.previousTouchMoveAtSliderFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        cancelAnimationFrame.call(window, this.previousTouchMoveAtSliderFrame);
      }
      this.previousTouchMoveAtSliderFrame = animationFrame;
    }
  }

  _updateComponentOnTouchMoveAtSlider (touch) {
    const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
    const toggleTrackCheck = React.findDOMNode(this.refs.toggleTrackCheck);
    const trackCrossNode = React.findDOMNode(this.refs.toggleTrackCross);

    this._touchEndedNotInSlider = touchedElement !== toggleTrackCheck &&
                                  touchedElement !== trackCrossNode;
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

  _onTouchStartHandle (event) {
    // check for one touch as multiple could be browser gestures and only one
    // is relevant for us
    if (event.touches.length === 1) {
      this._preventTouchSwitch = false;

      const defaultSliderOffset = style.check.width - style.handle.width / 2;

      this.setState({
        isDraggingWithTouch: true,
        sliderOffset: (this.state.value ? defaultSliderOffset : 0)
      });

      this._touchDragStart = event.touches[0].pageX - (this.state.value ? defaultSliderOffset : 0);
    }
  }

  _onTouchMoveHandle (event) {
    if (event.touches.length === 1 && this.state.isDraggingWithTouch) {
      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      const animationFrame = requestAnimationFrame.call(
        window,
        this._updateComponentOnTouchMoveAtHandle.bind(this, event.touches[0])
      );

      if(this.previousTouchMoveAtHandleFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        cancelAnimationFrame.call(window, this.previousTouchMoveAtHandleFrame);
      }
      this.previousTouchMoveAtHandleFrame = animationFrame;
    }
  }

  _updateComponentOnTouchMoveAtHandle (touch) {
    const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
    const handleNode = React.findDOMNode(this.refs.handle);

    let difference = touch.pageX - this._touchDragStart;

    // touch left the handle
    if (touchedElement !== handleNode) {
      if (this._preventTouchSwitch) {
        const value = difference > (style.handle.width / 2);
        this._triggerChange(value);
      } else {
        this._triggerChange(!this.state.value);
      }
    // is still dragging
    } else if (this.state.isDraggingWithTouch) {

      if (this.state.value &&
          this._touchDragEnd &&
          difference > this._touchDragEnd) {
        this._preventTouchSwitch = true;
      } else if (!this.state.value &&
                 this._touchDragEnd &&
                 difference < this._touchDragEnd) {
        this._preventTouchSwitch = true;
      }

      // TODO calculate the limits from real elements
      if (difference < 0 || difference > 60 - 28) return;

      this._touchDragEnd = difference;
      this.setState({
        sliderOffset: difference
      });
    }
  }

  _onTouchEndHandle (event) {
    // prevent the onClick to happen
    event.preventDefault();

    if (this.state.isDraggingWithTouch) {
      // no click & move was involved
      if (this._touchDragEnd) {
        if (this._preventTouchSwitch) {
          const value = this._touchDragEnd > (style.handle.width / 2);
          this._triggerChange(value);
        } else {
          this._triggerChange(!this.state.value);
        }
      // click like
      } else {
        this._triggerChange(!this.state.value);
      }
    }

    this._touchDragStart = undefined;
    this._touchDragEnd = undefined;
    this._preventTouchSwitch = false;
  }

  _onTouchCancelHandle (event) {
    this.setState({
      isDraggingWithTouch: false
    });
    this._touchDragStart = undefined;
    this._touchDragEnd = undefined;
    this._preventTouchSwitch = false;
  }

  render () {


    const computedToggleStyle = extend( {}, style.toggle );
    let computedSliderStyle;
    let handleStyle;

    const defaultSliderOffset = style.check.width - style.handle.width / 2;

    if (this.state.isDraggingWithMouse || this.state.isDraggingWithTouch) {
      computedSliderStyle = extend({}, style.slider, {
        left: this.state.sliderOffset - defaultSliderOffset,
        transition: "none"
      });
      handleStyle = extend({}, style.handle, {
        left: this.state.sliderOffset,
        transition: "none"
      });
    } else {
      computedSliderStyle = extend({}, style.slider, {
        left: this.state.value ? 0 : -defaultSliderOffset
      });
      handleStyle = extend({}, style.handle, {
        left: this.state.value ? defaultSliderOffset : 0
      });
    }

    const computedTrueChoice = first(this.props.children) ? first(this.props.children) : "✓";
    const computedFalseChoice = last(this.props.children) ? last(this.props.children) : "✘";

    const computedTrueChoiceStyle = extend({}, style.check);
    const computedFalseChoiceStyle = extend({}, style.cross);

    const hasCustomTabIndex = this.props.wrapperProps && this.props.wrapperProps.tabIndex;
    let tabIndex = hasCustomTabIndex ? this.props.wrapperProps.tabIndex : '0';
    if(this.props.disabled) {
      tabIndex = -1;
    }

    return (
      <div style={ computedToggleStyle }
           tabIndex={ tabIndex }
           {...this.state.wrapperProperties} >
        <div style={ style.sliderWrapper}
             ref="sliderWrapper">
          <div ref="belleToggleSlider"
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
        <div ref="handle"
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
 * Returns an object with properties that are relevant for the wrapping div of
 * the Toggle.
 */
function sanitizePropertiesForWrapper(wrapperProperties) {
  return omit(wrapperProperties, [
    'style',
    'tabIndex'
  ]);
}

function sanitizeChildProperties (properties) {
  let childProperties = omit(properties, [
    'style',
    'onChange',
    'checked',
    'defaultChecked'
  ]);

  return childProperties;
}

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
