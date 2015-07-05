"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {injectStyles, removeStyle} from '../utils/inject-style';
import {extend, first, has, isUndefined, omit, last} from "underscore";
import style from '../style/toggle';
import config from '../config/toggle';
import isComponentTypeOf from '../utils/is-component-of-type.js';
import {requestAnimationFrame, cancelAnimationFrame} from '../utils/animation-frame-management';
import unionClassNames from '../utils/union-class-names';

// Enable React Touch Events
React.initializeTouchEvents(true);

/**
 * Toggle component
 */
export default class Toggle extends Component {

  constructor (properties) {
    super(properties);

    let checked;
    if (has(properties, 'checkedLink')) {
      checked = properties.checkedLink.value;
    } else if (has(properties, 'checked')) {
      checked = properties.checked;
    } else if (has(properties, 'defaultChecked')) {
      checked = properties.defaultChecked;
    } else {
      checked = false;
    }

    this.state = {
      firstChoiceProperties: sanitizeChoiceProperties(properties.firstChoiceProps),
      childProperties: sanitizeChildProperties(properties),
      secondChoiceProperties: sanitizeChoiceProperties(properties.secondChoiceProps),
      handleProperties: sanitizeHandleProperties(properties.handleProps),
      isActive: false,
      isDraggingWithMouse: false,
      isDraggingWithTouch: false,
      sliderProperties: sanitizeSliderProperties(properties.sliderProps),
      sliderWrapperProperties: sanitizeSliderWrapperProperties(properties.sliderWrapperProps),
      value: checked,
      wasFocusedWithClickOrTouch: false
    };

    this._touchStartedAtSlider = false;
    this._touchEndedNotInSlider = false;

    this._preventTouchSwitch = false;

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._preventMouseSwitch = false;

    // The isFocused attribute is used to apply the one-time focus animation.
    // As it is reset after every render it can't be set inside state as this
    // would trigger an endless loop.
    this.isFocused = false;
  }

  componentWillReceiveProps (properties) {
    let newState = {
      firstChoiceProperties: sanitizeChoiceProperties(properties.firstChoiceProps),
      childProperties: sanitizeChildProperties(properties),
      secondChoiceProperties: sanitizeChoiceProperties(properties.secondChoiceProps),
      handleProperties: sanitizeHandleProperties(properties.handleProps),
      sliderProperties: sanitizeSliderProperties(properties.sliderProps),
      sliderWrapperProperties: sanitizeSliderWrapperProperties(properties.sliderWrapperProps)
    };

    if (has(properties, 'checkedLink')) {
      newState.value = properties.checkedLink.value;
    } else if (has(properties, 'checked')) {
      newState.value = properties.checked;
    }

    this.setState(newState);
    updatePseudoClassStyle(this.styleId, properties);
  }

  /**
   * Generates the style-id & inject the focus style.
   *
   * The style-id is based on React's unique DOM node id.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this.styleId = `style-id${id}`;
    updatePseudoClassStyle(this.styleId, this.props);
  }

  /**
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this.styleId);
  }

  /**
   * Deactivate the focused attribute in order to make sure the focus animation
   * only runs once when the component is focused on & not after re-rendering
   * e.g when the user clicks on the toggle.
   */
  componentDidUpdate() {
    this.isFocused = false;
  }

  /**
   * Activate the focused attribute used to determine when to show the
   * one-time focus animation and trigger a render.
   */
  _onFocus(event) {
    if (!this.props.disabled) {
      this.isFocused = true;
      this.forceUpdate();
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * Deactivate the focused attribute used to determine when to show the
   * one-time focus animation and trigger a render.
   */
  _onBlur(event) {
    this.isFocused = false;
    this.setState({ wasFocusedWithClickOrTouch: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  _onMouseDownOnWrapper (event) {
    if(!this.props.disabled) {
      this.setState({ wasFocusedWithClickOrTouch: true, isActive: true });
    }
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  }

  _onMouseUpOnWrapper (event) {
    if(!this.props.disabled) {
      this.setState({ isActive: false });
    }
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  }

  _onTouchStartOnWrapper (event) {
    if(!this.props.disabled) {
      this.setState({ wasFocusedWithClickOrTouch: true });
    }
    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  }

  _onClickAtSlider (event) {
    if(!this.props.disabled) {
      this._triggerChange(!this.state.value);
    }
    if (this.props.sliderProps && this.props.sliderProps.onClick) {
      this.props.sliderProps.onClick(event);
    }
  }

  _triggerChange (value) {
    if(has(this.props, 'checkedLink')) {
      this.props.checkedLink.requestChange(value);
      this.setState({
        isDraggingWithMouse: false,
        isDraggingWithTouch: false,
        isActive: false
      });
    }
    else if(has(this.props, 'checked')) {
      this.setState({
        isDraggingWithMouse: false,
        isDraggingWithTouch: false,
        isActive: false
      });
    }
    else {
      this.setState({
        value: value,
        isDraggingWithMouse: false,
        isDraggingWithTouch: false,
        isActive: false
      });
    }

    const wrapperNode = React.findDOMNode(this);
    wrapperNode.value = value;

    if (this.props.onChange) {
      // TODO investigate how to properly simulate a change event that includes
      // all the usual properties documented here:
      // https://facebook.github.io/react/docs/events.html
      this.props.onChange({target: wrapperNode});
    }
  }

  _onMouseDownOnHandle (event) {
    // check for left mouse button pressed
    if(event.button === 0 && !this.props.disabled) {
      const defaultSliderOffset = this._sliderOffset();
      this._mouseDragStart = event.pageX - (this.state.value ? defaultSliderOffset : 0);
      this._preventMouseSwitch = false;

      this.setState({
        isDraggingWithMouse: true,
        sliderOffset: (this.state.value ? defaultSliderOffset : 0)
      });
    }

    if (this.props.handleProps && this.props.handleProps.onMouseDown) {
      this.props.handleProps.onMouseDown(event);
    }
  }

  _onMouseMoveOnHandle (event) {
    if(this.state.isDraggingWithMouse && !this.props.disabled) {
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

    if (this.props.handleProps && this.props.handleProps.onMouseMove) {
      this.props.handleProps.onMouseMove(event);
    }
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

    this._mouseDragEnd = difference;

    if (difference < 0 || difference > this._toggleWidth() - this._handleWidth()) return;

    this.setState({
      sliderOffset: difference
    });
  }

  _onMouseUpOnHandle (event) {
    if (!this.props.disabled) {

      if (this._mouseDragEnd) {
        if (!this._preventMouseSwitch) {
          this._triggerChange(!this.state.value);
        } else if (this._preventMouseSwitch) {
          const value = this._mouseDragEnd > (this._handleWidth() / 2);
          this._triggerChange(value);
        }
      } else {
        this._triggerChange(!this.state.value);
      }
    }

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._preventMouseSwitch = false;

    if (this.props.handleProps && this.props.handleProps.onMouseUp) {
      this.props.handleProps.onMouseUp(event);
    }
  }

  _onMouseLeaveOnHandle (event) {
    if (!this.props.disabled) {
      if (this._mouseDragStart && !this._preventMouseSwitch) {
        this._triggerChange(!this.state.value);
      } else if (this._mouseDragStart && this._preventMouseSwitch) {
        const value = this._mouseDragEnd > (this._handleWidth() / 2);
        this._triggerChange(value);
      } else {
        this.setState({ isActive: false });
      }
    }

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._preventMouseSwitch = false;

    if (this.props.handleProps && this.props.handleProps.onMouseLeave) {
      this.props.handleProps.onMouseLeave(event);
    }
  }

  _onTouchStartAtSlider (event) {
    event.preventDefault();

    if (event.touches.length === 1 && !this.props.disabled) {
      this._touchStartedAtSlider = true;
      this.setState({
        isActive: true
      });
    }

    if (this.props.sliderProps && this.props.sliderProps.onTouchStart) {
      this.props.sliderProps.onTouchStart(event);
    }
  }

  _onTouchMoveAtSlider (event) {
    if (event.touches.length === 1 && this._touchStartedAtSlider && !this.props.disabled) {

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

    if (this.props.sliderProps && this.props.sliderProps.onTouchMove) {
      this.props.sliderProps.onTouchMove(event);
    }
  }

  _updateComponentOnTouchMoveAtSlider (touch) {
    const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
    const firstChoiceNode = React.findDOMNode(this.refs.firstChoice);
    const secondChoiceNode = React.findDOMNode(this.refs.secondChoice);

    this._touchEndedNotInSlider = touchedElement !== firstChoiceNode &&
                                  touchedElement !== secondChoiceNode;
    if (this.state.isActive && this._touchEndedNotInSlider) {
      this.setState({ isActive: false });
    } else if (!this.state.isActive && !this._touchEndedNotInSlider) {
      this.setState({ isActive: true });
    }
  }

  _onTouchEndAtSlider (event) {
    // prevent the onClick to happen
    event.preventDefault();

    if (this._touchStartedAtSlider && !this._touchEndedNotInSlider && !this.props.disabled) {
      this.setState({
        isActive: false
      });
      this._triggerChange(!this.state.value);
    } else {
      this.setState({ isActive: false });
    }
    this._touchStartedAtSlider = false;
    this._touchEndedNotInSlider = false;

    if (this.props.sliderProps && this.props.sliderProps.onTouchEnd) {
      this.props.sliderProps.onTouchEnd(event);
    }
  }

  _onTouchCancelAtSlider (event) {
    this.setState({ isActive: false });
    this._touchStartedAtSlider = false;
    this._touchEndedNotInSlider = false;

    if (this.props.sliderProps && this.props.sliderProps.onTouchCancel) {
      this.props.sliderProps.onTouchCancel(event);
    }
  }

  _onTouchStartHandle (event) {
    event.preventDefault();

    // check for one touch as multiple could be browser gestures and only one
    // is relevant for us
    if (event.touches.length === 1 && !this.props.disabled) {
      this._preventTouchSwitch = false;

      const defaultSliderOffset = this._sliderOffset();
      this.setState({
        isDraggingWithTouch: true,
        sliderOffset: (this.state.value ? defaultSliderOffset : 0)
      });

      this._touchDragStart = event.touches[0].pageX - (this.state.value ? defaultSliderOffset : 0);
    }

    if (this.props.handleProps && this.props.handleProps.onTouchStart) {
      this.props.handleProps.onTouchStart(event);
    }
  }

  _onTouchMoveHandle (event) {
    if (event.touches.length === 1 && this.state.isDraggingWithTouch && !this.props.disabled) {
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

    if (this.props.handleProps && this.props.handleProps.onTouchMove) {
      this.props.handleProps.onTouchMove(event);
    }
  }

  _updateComponentOnTouchMoveAtHandle (touch) {
    const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
    const handleNode = React.findDOMNode(this.refs.handle);

    let difference = touch.pageX - this._touchDragStart;

    // touch left the handle
    if (touchedElement !== handleNode) {
      if (this._preventTouchSwitch) {
        const value = difference > (this._handleWidth() / 2);
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

      if (difference < 0 || difference > this._toggleWidth() - this._handleWidth()) return;

      this._touchDragEnd = difference;
      this.setState({
        sliderOffset: difference
      });
    }
  }

  _onTouchEndHandle (event) {
    // prevent the onClick to happen
    event.preventDefault();

    if (this.state.isDraggingWithTouch && !this.props.disabled) {
      // no click & move was involved
      if (this._touchDragEnd) {
        if (this._preventTouchSwitch) {
          const value = this._touchDragEnd > (this._handleWidth() / 2);
          this._triggerChange(value);
        } else {
          this._triggerChange(!this.state.value);
        }
      // click like
      } else {
        this._triggerChange(!this.state.value);
      }
    } else {
      this.setState({
        isActive: false,
        isDraggingWithTouch: false
      });
    }

    this._touchDragStart = undefined;
    this._touchDragEnd = undefined;
    this._preventTouchSwitch = false;

    if (this.props.handleProps && this.props.handleProps.onTouchEnd) {
      this.props.handleProps.onTouchEnd(event);
    }
  }

  _onTouchCancelHandle (event) {
    this.setState({
      isDraggingWithTouch: false
    });
    this._touchDragStart = undefined;
    this._touchDragEnd = undefined;
    this._preventTouchSwitch = false;

    if (this.props.handleProps && this.props.handleProps.onTouchCancel) {
      this.props.handleProps.onTouchCancel(event);
    }
  }

  _onKeyDown(event) {
    if (!this.props.disabled) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this._onArrowLeftKeyDown();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this._onArrowRightKeyDown();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this._onEnterOrSpaceKeyDown();
      }
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  /**
   * Flip value in case it is false.
   */
  _onArrowLeftKeyDown() {
    if (this.state.value === true) {
      this._triggerChange(false);
    }
  }

  /**
   * Flip value in case it is true.
   */
  _onArrowRightKeyDown() {
    if (this.state.value === false) {
      this._triggerChange(true);
    }
  }

   /**
    * Flip value and trigger change.
    */
  _onEnterOrSpaceKeyDown() {
    this._triggerChange(!this.state.value);
  }

  _onMouseEnterAtSliderWrapper() {
    this.setState({
      isHovered: true
    });
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  }

  _onMouseLeaveAtSliderWrapper() {
    this.setState({
      isHovered: false,
      isActive: false
    });
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  }

  _toggleWidth() {
    return has(this.props.style, 'width') ? this.props.style.width : style.style.width;
  }

  _handleWidth() {
    return has(this.props.handleStyle, 'width') ? this.props.handleStyle.width : style.handleStyle.width;
  }

  _sliderOffset() {
    const firstChoiceWidth = has(this.props.firstChoiceStyle, 'width') ? this.props.firstChoiceStyle.width : style.firstChoiceStyle.width;

    return firstChoiceWidth - this._handleWidth() / 2;
  }

  render () {
    let wrapperStyle = extend({}, style.style, this.props.style);

    if (this.isFocused && !this.state.wasFocusedWithClickOrTouch) {
      wrapperStyle = extend({}, wrapperStyle, style.focusStyle, this.props.focusStyle);
    }

    let computedSliderStyle;
    let handleStyle;

    const sliderWrapperStyle = extend({}, style.sliderWrapperStyle, this.props.sliderWrapperStyle);
    const defaultSliderOffset = this._sliderOffset();

    if (this.state.isDraggingWithMouse || this.state.isDraggingWithTouch) {
      computedSliderStyle = extend({}, style.sliderStyle, this.props.sliderStyle, {
        left: this.state.sliderOffset - defaultSliderOffset,
        transition: "none"
      });
      //right now even when handle is clicked, it momentarily shows this grabbing styles
      //may be this.state.isDraggingWithMouse should be set to true only after mouse movement starts
      handleStyle = extend({}, style.handleStyle, this.props.handleStyle, style.activeHandleStyle, this.props.activeHandleStyle, {
        left: this.state.sliderOffset,
        transition: "none"
      });
    } else {
      handleStyle = extend({}, style.handleStyle, this.props.handleStyle);
      computedSliderStyle = extend({}, style.sliderStyle, {
        left: this.state.value ? 0 : -defaultSliderOffset
      });

      if(this.state.isActive) {
        handleStyle = extend({}, handleStyle, style.activeHandleStyle, this.props.activeHandleStyle, {
          left: this.state.value ? defaultSliderOffset : 0
        });
      } else if(this.state.isHovered) {
        handleStyle = extend({}, handleStyle, style.hoverHandleStyle, this.props.hoverHandleStyle, {
          left: this.state.value ? defaultSliderOffset : 0
        });
      } else {
        handleStyle = extend({}, handleStyle, {
          left: this.state.value ? defaultSliderOffset : 0
        });
      }
    }

    const computedTrueChoice = first(this.props.children) ? first(this.props.children) : "✓";
    const computedFalseChoice = last(this.props.children) ? last(this.props.children) : "✘";

    const computedTrueChoiceStyle = extend({}, style.firstChoiceStyle, this.props.firstChoiceStyle);
    const computedFalseChoiceStyle = extend({}, style.secondChoiceStyle, this.props.secondChoiceStyle);

    const hasCustomTabIndex = this.props.wrapperProps && this.props.wrapperProps.tabIndex;
    let tabIndex = hasCustomTabIndex ? this.props.wrapperProps.tabIndex : '0';
    if(this.props.disabled) {
      tabIndex = -1;
      wrapperStyle = extend({}, wrapperStyle, style.disabledStyle, this.props.disabledStyle);
      handleStyle = extend({}, handleStyle, style.disabledHandleStyle, this.props.disabledHandleStyle);
    }

    const role = has(this.state.childProperties, 'role') ? this.state.childProperties.role : 'checkbox';

    return (
      <div style={ wrapperStyle }
           tabIndex={ tabIndex }
           className={ unionClassNames(this.props.className, this.styleId) }
           onKeyDown={ this._onKeyDown.bind(this) }
           onMouseDown={ this._onMouseDownOnWrapper.bind(this) }
           onMouseUp={ this._onMouseUpOnWrapper.bind(this) }
           onTouchStart={ this._onTouchStartOnWrapper.bind(this) }
           onFocus={ this._onFocus.bind(this) }
           onBlur={ this._onBlur.bind(this) }
           onMouseEnter = { this._onMouseEnterAtSliderWrapper.bind(this) }
           onMouseLeave = { this._onMouseLeaveAtSliderWrapper.bind(this) }
           role={ role }
           aria-checked={ this.state.value }
           {...this.state.childProperties} >
        <div style={ sliderWrapperStyle }
             {...this.state.sliderWrapperProperties}>
          <div style={ computedSliderStyle }
               onClick={ this._onClickAtSlider.bind(this) }
               onTouchStart={ this._onTouchStartAtSlider.bind(this) }
               onTouchMove={ this._onTouchMoveAtSlider.bind(this) }
               onTouchEnd={ this._onTouchEndAtSlider.bind(this) }
               onTouchCancel={ this._onTouchCancelAtSlider.bind(this) }
               {...this.state.sliderProperties}>
            <div ref="firstChoice"
                 style={ computedTrueChoiceStyle }
                 {...this.state.firstChoiceProperties}>
              { computedTrueChoice }
            </div>
            <div ref="secondChoice"
                 style={ computedFalseChoiceStyle }
                 {...this.state.secondChoiceProperties}>
              { computedFalseChoice }
            </div>
          </div>
        </div>
        <div ref="handle"
             style={ handleStyle }
             onMouseDown={ this._onMouseDownOnHandle.bind(this) }
             onMouseMove={ this._onMouseMoveOnHandle.bind(this) }
             onMouseUp={ this._onMouseUpOnHandle.bind(this) }
             onMouseLeave={ this._onMouseLeaveOnHandle.bind(this) }
             onTouchStart={ this._onTouchStartHandle.bind(this) }
             onTouchMove={ this._onTouchMoveHandle.bind(this) }
             onTouchEnd={ this._onTouchEndHandle.bind(this) }
             onTouchCancel={ this._onTouchCancelHandle.bind(this) }
             {...this.state.handleProperties} />
      </div>
    );
  }
}

Toggle.displayName = 'Belle Toggle';

Toggle.propTypes = {
  activeHandleStyle: React.PropTypes.object,
  children: validateChoices,
  className: React.PropTypes.string,
  firstChoiceProps: React.PropTypes.object,
  firstChoiceStyle: React.PropTypes.object,
  secondChoiceProps: React.PropTypes.object,
  secondChoiceStyle: React.PropTypes.object,
  checked: React.PropTypes.bool,
  checkedLink: React.PropTypes.shape({
    value: React.PropTypes.bool.isRequired,
    requestChange: React.PropTypes.func.isRequired
  }),
  defaultChecked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  disabledHandleStyle: React.PropTypes.object,
  disabledStyle: React.PropTypes.object,
  focusStyle: React.PropTypes.object,
  handleProps: React.PropTypes.shape({
    onMouseDown: React.PropTypes.func,
    onMouseMove: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    onTouchMove: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchCancel: React.PropTypes.func
  }),
  handleStyle: React.PropTypes.object,
  hoverHandleStyle: React.PropTypes.object,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onMouseEnter: React.PropTypes.func,
  onMouseLeave: React.PropTypes.func,
  onMouseUp: React.PropTypes.func,
  onTouchStart: React.PropTypes.func,
  sliderProps: React.PropTypes.shape({
    onClick: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    onTouchMove: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchCancel: React.PropTypes.func
  }),
  sliderStyle: React.PropTypes.object,
  sliderWrapperProps: React.PropTypes.object,
  style: React.PropTypes.object
};

Toggle.defaultProps = {
  disabled: false,
  preventFocusStyleForTouchAndClick: config.preventFocusStyleForTouchAndClick
};

function sanitizeChildProperties (properties) {
  return omit(properties, [
    'checked',
    'className',
    'firstChoiceProps',
    'secondChoiceProps',
    'defaultChecked',
    'focusStyle',
    'handleProps',
    'onFocus',
    'onBlur',
    'onChange',
    'onMouseDown',
    'onMouseLeave',
    'onMouseUp',
    'onTouchStart',
    'sliderProps',
    'sliderWrapperProps',
    'style',
    'tabIndex'
  ]);
}

function sanitizeSliderProperties (properties) {
  return omit(properties, [
    'style',
    'onClick',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel'
  ]);
}

function sanitizeSliderWrapperProperties (properties) {
  return omit(properties, [
    'style'
  ]);
}

function sanitizeChoiceProperties (properties) {
  return omit(properties, [
    'ref',
    'style'
  ]);
}

function sanitizeHandleProperties (properties) {
  return omit(properties, [
    'onMouseDown',
    'onMouseMove',
    'onMouseUp',
    'onMouseLeave',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel',
    'ref',
    'style'
  ]);
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


/**
 * Update focus style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing custom styles
 */
function updatePseudoClassStyle(styleId, properties) {
  let focusStyle;
  if (properties.preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    focusStyle = extend({}, style.focusStyle, properties.focusStyle);
  }

  const styles = [
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus'
    }
  ];

  injectStyles(styles);
}
