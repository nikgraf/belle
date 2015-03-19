"use strict";

import React, {Component} from 'react';
import calculateTextareaHeight from '../utils/calculate-textarea-height';
import {omit, extend} from 'underscore';

/**
 * Input component with a great UX like autogrowing & handling states
 *
 * Note on styling: Right now this component doen't allow to change style after
 * initialisation.
 *
 * Note on resizing:
 * If you fill a textarea only with spaces and the cursor reaches the right end
 * it won't break the line. This can leads to unexpected behaviour for the automatic
 * resizing.
 *
 * This component was highly inspired by the great work from these guys
 * - Andrey Popp: https://github.com/andreypopp/react-textarea-autosize
 * - Eugene: https://gist.github.com/eugene1g/5dbaa7d35d0c7d5c2c56
 */
export default class Input extends Component {

  constructor(properties) {
    this.textareaProperties = sanitizeChildProperties(properties);
    this.state = {
      height: 'auto'
    };
    super(properties);
  }

  render() {
    let style = extend({}, defaultStyle, this.props.style);
    style.height = this.state.height;
    return <textarea {...this.textareaProperties} style={style} onChange={this.onChange.bind(this)}/>;
  }

  /**
   * Right after the component go injected into the DOM it should be resized.
   */
  componentDidMount() {
    this.resize();
  }

  /**
   * Update the properties passed to the textarea and resize as with the new
   * properties the height might have changed.
   */
  componentWillReceiveProps(properties) {
    this.textareaProperties = sanitizeChildProperties(properties);
    this.resize();
  }

  /**
   * Update the height and provide the changeCallback for valueLink.
   */
  onChange(event) {
    this.resize();

    let changeCallback = this.props.onChange,
        valueLink = this.props.valueLink;

    if (typeof valueLink == 'object' && typeof valueLink.requestChange == 'function') {
      changeCallback = ev => valueLink.requestChange(ev.target.value);
    }

    if (changeCallback) {
      changeCallback(event);
    }
  }

  /**
   * Calculate the height and store the new height in the state to trigger a render.
   */
  resize() {
    let height = calculateTextareaHeight(React.findDOMNode(this));

    if (this.props.minHeight && this.props.minHeight > height) {
      height = this.props.minHeight;
    }

    if (this.props.maxHeight && this.props.maxHeight < height) {
      height = this.props.maxHeight;
    }

    this.setState({height});
  }

  /**
   * Set focus on this Input Component.
   */
  focus() {
    React.findDOMNode(this).focus();
  }
}

Input.displayName = 'Belle Input';
Input.propTypes = {
  minHeight: React.PropTypes.number,
  maxHeight: React.PropTypes.number
};

const defaultStyle = {
  /* normalize.css v3.0.1 */
  font: 'inherit',
  margin: 0,

  /* belle input style */
  overflow: 'hidden',
  resize: 'none',
  width: '100%',
  fontSize: 14,
  paddingBottom: 5,
  paddingTop: 7,
  color: '#505050',
  border: '0 #fff solid',
  borderBottom: '1px #ccc solid',
  background: 'none',
  display: 'block',
  boxSizing: 'border-box'
};

/**
 * Returns an object with properties that are relevant for the Input's textarea.
 *
 * As the height of the textarea needs to be calculated valueLink & onChange can
 * not be passed down to the textarea, but made available through this component.
 */
function sanitizeChildProperties(properties) {
  let childProperties = omit(properties, ['valueLink', 'onChange', 'minHeight', 'maxHeight', 'style']);
  if (typeof properties.valueLink == 'object') {
    childProperties.value = properties.valueLink.value;
  }
  return childProperties;
}
