"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {injectStyles, removeStyle} from '../utils/inject-style';
import {extend, omit, isUndefined, first, last} from "underscore";
import style from '../style/toggle';

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

    if(!isUndefined(this.props.children)){
      if(this.props.children.length !== 2){
        console.warn("You must have 2 choices for each toggle.");
      }
      if(first(this.props.children).props.value == last(this.props.children).props.value){
        console.warn("Your Choices must not have the same value.");
      }
    }
  }

  _onClick(event) {
    this._triggerChange(!this.state.value);
  }

  _triggerChange(value) {
    this.setState( { value: value } );

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
        this.setState({
          isDraggingWithMouse: false,
          value: !this.state.value
        });
      } else if (this._preventSwitch) {
        let state = this._mouseDragEnd > (style.handle.width / 2);
        this.setState({
          isDraggingWithMouse: false,
          value: state
        });
      }

    } else {
      this.setState({
        isDraggingWithMouse: false,
        value: !this.state.value
      });
    }

    this._mouseDragStart = undefined;
    this._mouseDragMoved = undefined;
    this._mouseDragEnd = undefined;
    this._preventSwitch = false;
  }

  _onMouseLeave(event) {
    if (this._mouseDragStart && !this._preventSwitch) {
      this.setState({
        isDraggingWithMouse: false,
        value: !this.state.value
      });
    } else if (this._mouseDragStart && this._preventSwitch) {
      let state = this._mouseDragEnd > (style.handle.width / 2);
      this.setState({
        isDraggingWithMouse: false,
        value: state
      });
    }

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._mouseDragMoved = undefined;
    this._preventSwitch = false;
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
            <div className="react-toggle-track-check"
                 style={ computedTrueChoiceStyle }
                 onClick={ this._onClick.bind(this) }>
              { computedTrueChoice }
            </div>
            <div className="react-toggle-track-cross"
                 style={ computedFalseChoiceStyle }
                 onClick={ this._onClick.bind(this) }>
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
             onMouseLeave={ this._onMouseLeave.bind(this) } />
      </div>
    );
  }
}

Toggle.displayName = 'Belle Toggle';
