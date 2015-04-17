"use strict";

import React, {Component} from 'react';
import {injectStyles, removeStyle} from '../utils/inject-style';
import {extend, omit, isUndefined} from "underscore";

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
}

const sliderStyle = {
  position: "relative",
  width: sliderWidth,
  transition: "left .25s ease-in-out"
}

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
}

const optionStyle = {
  display: "inline-block",
  boxSizing: "border-box",
  height: optionHeight,
  width: optionWidth,
  cursor: "pointer"
}

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
}

const toggleFocusStyle = {
  boxShadow: "0 0 5px 0 rgba(0,0,255, .4)"
}

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
    let checked = properties.defaultChecked ? properties.defaultChecked : false
    checked = properties.checked ? properties.checked : checked
    
    this.childProperties = sanitizeChildProperties(properties);
    
    this.state = {
      value : checked
    };
  }
  
  onClick(){
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

  render() {
    const computedToggleStyle = extend( {}, toggleStyle, (this.state.hasFocus ? toggleFocusStyle : {}) );
    const computedSliderStyle = extend( {}, sliderStyle, { left: this.state.value ? 0 : sliderOffset } );

    return <div style={ computedToggleStyle }>
              <div className="react-toggle-slider" 
                   style={ computedSliderStyle } 
                   onClick={ this.onClick.bind(this) }>
                <div className="react-toggle-track-check" style={ checkStyle }>✔</div>
                <div className="react-toggle-handle" style={ handleStyle }></div>
                <div className="react-toggle-track-cross" style={ crossStyle }>✘</div>
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
            </div>;
  }
}

Toggle.displayName = 'Belle Toggle';
