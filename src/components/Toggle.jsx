"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {injectStyles, removeStyle} from '../utils/inject-style';
import {extend, omit, isUndefined, first, last} from "underscore";
import style from '../style/toggle';

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

  _onClick(event){
    const input = React.findDOMNode(this.refs.belleToggle);

    const clickEvent = new MouseEvent('click', event.nativeEvent);
    input.dispatchEvent(clickEvent);

    input.focus();
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

  _onMouseDown(e){
    // Bind onMouseMove
  }

  _onMouseMove(e){
    // Detect if user intended to manually move Toggle handle. If so, inverted state and trigger onMouseUp.
  }

  _onMouseUp(e){
    // Unbind onMouseMove
  }

  render() {

    const computedTrueChoice      = first(this.props.children) ? first(this.props.children) : "✔";
    const computedFalseChoice     = last(this.props.children) ? last(this.props.children) : "✘";

    const computedToggleStyle     = extend( {}, style.toggle, this.props.style, (this.state.value ? style.toggleActive : {}) );
    const computedSliderStyle     = extend( {}, style.slider, { transform: this.state.value ? 'translateX(0)' : 'translateX(' + style.sliderOffset + 'px)' } );
    const computedBackgroundStyle = extend( {}, style.background, (this.state.value ? style.backgroundActive : {}) );

    return (
      <div style={ computedToggleStyle }>
        <div style={ computedBackgroundStyle }/>
        <div style={ computedSliderStyle } onClick={ this._onClick.bind(this) }>
          <div style={ style.check }>{ computedTrueChoice }</div>
          <div style={ style.handle } onMouseDown={ this._onMouseDown.bind(this)} />
          <div style={ style.cross }>{ computedFalseChoice }</div>
        </div>
        <input
          ref="belleToggle"
          name={this.props.name}
          value={this.props.value}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onChange={this._onChange.bind(this)}
          checked={this.state.value}
          style={ style.checkbox}
          type="checkbox"
          {...this.childProperties} />
      </div>
    );
  }
}

Toggle.displayName = 'Belle Toggle';

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
