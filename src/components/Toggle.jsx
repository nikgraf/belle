"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {injectStyles, removeStyle} from '../utils/inject-style';
import {extend, omit, isUndefined, first, last} from "underscore";

const toggleWidth = 60;
const toggleHeight = 30;

const handleHeight = toggleHeight;
const handleWidth = toggleHeight;

const optionHeight = toggleHeight;
const optionWidth = toggleWidth - handleWidth / 2;

const sliderWidth = 2 * optionWidth;

const sliderOffset = -(optionWidth - handleWidth / 2);

const toggleStyle = {
  boxSizing: "border-box",
  borderRadius: toggleHeight,
  border: "1px solid #999",
  overflow: "hidden",
  height: toggleHeight + 2,
  width: toggleWidth + 2,
  WebkitUserSelect: "none"
};

const sliderStyle = {
  position: "relative",
  width: sliderWidth,
  transition: "left .25s ease-in-out"
};

const handleStyle = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  boxSizing: "border-box",
  borderRadius: handleHeight,
  border: "1px solid #999",
  backgroundColor: '#eee',
  height: handleHeight,
  width: handleWidth,
  cursor: "pointer"
};

const optionStyle = {
  display: "inline-block",
  boxSizing: "border-box",
  height: optionHeight,
  width: optionWidth,
  cursor: "pointer"
};

const checkStyle = extend( {}, optionStyle, {
  backgroundColor: "#00ff00",
  borderRadius: "20px 0 0 20px"
});


const crossStyle = extend( {}, optionStyle, {
  borderRadius: "0 20px 20px 0",
  backgroundColor: "#ff0000",
  textAlign: "right"
});

const checkboxStyle = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1
};

const toggleFocusStyle = {
  boxShadow: "0 0 5px 0 rgba(0,0,255, .4)"
};

function sanitizeChildProperties(properties) {
  let childProperties = omit(properties, [
    'type',
    'style',
    'onChange',
    'onFocus',
    'onBlur',
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

    this._mouseMoveEvent  = this._onMouseMove.bind(this);
    this._mouseUpEvent    = this._onMouseUp.bind(this);

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

  _onClick(){
    if(isUndefined(this.props.checked)){
      this.setState( { value: !this.state.value } );
    }
    React.findDOMNode(this.refs.belleToggle).focus();
  }

  onFocus(){
    this.setState( { hasFocus : true } );
  }

  onBlur(){
    this.setState( { hasFocus : false } );
  }

  _onChange(event){
    if(isUndefined(this.props.checked)){
      this.setState( { value: event.target.checked } );
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }

  }

  _bindDocumentMouseEvents () {
    document.addEventListener('mousemove', this._mouseMoveEvent);
    document.addEventListener('mouseup', this._mouseUpEvent);
  }

  _unbindDocumentMouseEvents () {
    document.removeEventListener('mousemove', this._mouseMoveEvent);
    document.removeEventListener('mouseup', this._mouseUpEvent);
  }

  _onMouseDown(e){
    if (e.button !== 0) return;

    this._bindDocumentMouseEvents();
    this._dragStart = e.pageX - (this.state.value ? 0 : sliderOffset);

    this.setState({
      isDragging: true,
      hasFocus: true,
      sliderOffset: (this.state.value ? 0 : sliderOffset)
    });
  }

  _onMouseMove(e){
    if (!this.state.isDragging) return;

    let difference = e.pageX - this._dragStart;
    if (difference < -handleWidth || difference > 0) return;

    this._dragEnd = difference;
    this.setState({
      sliderOffset: difference
    });
  }

  _onMouseUp(e){
    this._unbindDocumentMouseEvents();

    if(this._dragEnd){
      let state = this._dragEnd > -(handleWidth / 2);

      this.setState({
        isDragging: false,
        value: state
      });

      this._dragEnd = false;
    } else {
      this.setState( { isDragging: false } );
    }

    this._dragStart = false;
  }

  _onMouseLeave(e){
    this._onMouseUp(e);
  }

  render() {

    const computedToggleStyle = extend( {}, toggleStyle, (this.state.hasFocus ? toggleFocusStyle : {}) );
    var computedSliderStyle;

    if(this.state.isDragging){
      computedSliderStyle = extend( {}, sliderStyle, { left: this.state.sliderOffset, transition: "none" } );
    }else{
      computedSliderStyle = extend( {}, sliderStyle, { left: this.state.value ? 0 : sliderOffset } );
    }

    const computedTrueChoice = first(this.props.children) ? first(this.props.children) : "✔";
    const computedFalseChoice = last(this.props.children) ? last(this.props.children) : "✘";

    return (
      <div style={ computedToggleStyle }
           onMouseLeave={ this.state.isDragging ? this._onMouseLeave.bind(this) : null }>
        <div className="react-toggle-slider"
             ref="belleToggleSlider"
             style={ computedSliderStyle }>
          <div className="react-toggle-track-check"
               style={ checkStyle }
               onClick={ this._onClick.bind(this) }>
            { computedTrueChoice }
          </div>
          <div className="react-toggle-handle"
               ref="belleToggleHandle"
               style={ handleStyle }
               onMouseDown={ this._onMouseDown.bind(this)} />
          <div className="react-toggle-track-cross"
               style={ crossStyle }
               onClick={ this._onClick.bind(this) }>
            { computedFalseChoice }
          </div>
        </div>
        <input
          ref="belleToggle"
          name={this.props.name}
          value={this.props.value}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onChange={this._onChange.bind(this)}
          checked={this.state.value}
          style={ checkboxStyle}
          type="checkbox"
          {...this.childProperties} />
      </div>
    );
  }
}

Toggle.displayName = 'Belle Toggle';
