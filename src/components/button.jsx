"use strict";

import React, {Component} from 'react';
import {omit, extend, contains} from 'underscore';
import injectStyle, {removeStyle} from '../utils/inject-style';

var computedStyle;
const buttonTypes = ['button', 'submit', 'reset'];

/**
 * Button component
 *
 * The button behaves exactly like a normal html button except:
 * - Once a user clicks on the button it will loose focus
 * - By default every button is of type="button" instead of "submit"
 */
export default class Button extends Component {

  constructor(properties) {
    this.childProperties = sanitizeChildProperties(properties);
    // the computed styles are generated during initialization of the component
    // in order to reduce computation
    computedStyle = {
      primary: extend({}, defaultStyle, primaryStyle),
      primaryHover: extend({}, defaultHoverStyle, primaryHoverStyle),
      primaryFocus: extend({}, defaultFocusStyle, primaryFocusStyle),
      primaryActive: extend({}, defaultActiveStyle, primaryActiveStyle),
    };
    super(properties);
  }

  /**
   * Generates the style-id & inject the focus, hover & active style.
   *
   * The style-id is based on React's unique DOM node id.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this.styleId = `style-id${id}`;
    updatePseudoClassStyle(this.styleId, this.props);
  }

  /**
   * Remove a component's associated syles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this.styleId);
  }

  /**
   * Update the childProperties based on the updated properties of the button.
   */
  componentWillReceiveProps(properties) {
    this.childProperties = sanitizeChildProperties(properties);
    updatePseudoClassStyle(this.styleId, properties);
  }

  render() {
    const baseStyle = this.props.primary ? computedStyle.primary : defaultStyle;
    const style = extend({}, baseStyle, this.props.style);

    return <button style={ style }
                   className={ `${this.props.className} ${this.styleId}` }
                   onClick={ this.blur.bind(this) }
                   {...this.childProperties}>
      { this.props.children }
    </button>;
  }

  /**
   * Remove focus from this button
   */
  blur() {
    React.findDOMNode(this).blur();
  }

  /**
   * Set focus on this Button component.
   */
  focus() {
    React.findDOMNode(this).focus();
  }
}

Button.displayName = 'Belle Button';

Button.propTypes = {
  primary: React.PropTypes.bool,
  type: React.PropTypes.oneOf(buttonTypes)
};

const defaultStyle = {
  boxSizing: 'border-box',
  borderRadius: 2,
  cursor: 'pointer',
  padding: '8px 12px 6px 12px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  background: '#EFEFEF',
  border: '1px solid #EFEFEF',
  borderBottomColor: '#D0D0D0',
  color: '#555',
  verticalAlign: 'bottom',
  fontSize: 16,
  lineHeight: '26px'
};

const defaultHoverStyle = {
  color: '#666',
  background: '#F5F5F5',
  border: '1px solid #F5F5F5',
  borderBottomColor: '#D0D0D0'
};

const defaultFocusStyle = {
  outline: 0, // avoid default focus behaviour
  color: '#666',
  background: '#F5F5F5',
  border: '1px solid #F5F5F5',
  borderBottomColor: '#D0D0D0'
};

const defaultActiveStyle = {
  background: '#E8E8E8',
  border: '1px solid #E8E8E8',
  borderTopColor: '#CFCFCF',
  color: '#5C5C5C'
};

const primaryStyle = {
  background: '#53C7F2',
  border: '1px solid #53C7F2',
  borderBottomColor: '#3C9CC0',
  color:'#FAFAFA',
  verticalAlign: 'bottom'
};

const primaryHoverStyle = {
  background: '#5FCDF5',
  border: '1px solid #5FCDF5',
  borderBottomColor: '#4FB4DA',
  color: '#FFF'
};

const primaryFocusStyle = {
  background: '#5FCDF5',
  border: '1px solid #5FCDF5',
  borderBottomColor: '#4FB4DA',
  color: '#FFF'
};

const primaryActiveStyle = {
  background: '#4DBEE8',
  border: '1px solid #4DBEE8',
  borderTopColor: '#3B97BA',
  color: '#F5F5F5'
};

/**
 * Returns an object with properties that are relevant for the button element.
 *
 * In case a wrong or no type is defined the type of the child button will be
 * set to `button`.
 */
function sanitizeChildProperties(properties) {
  let childProperties = omit(properties, [
    'type',
    'style'
  ]);
  if ( contains(buttonTypes, properties.type) ) {
    childProperties.type = properties.type;
  } else {
    childProperties.type = 'button';
  }
  return childProperties;
}

/**
 * Update hover, focus & active style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing custom styles
 */
function updatePseudoClassStyle(styleId, properties) {
  const baseHoverStyle = properties.primary ? computedStyle.primaryHover : defaultHoverStyle;
  const baseFocusStyle = properties.primary ? computedStyle.primaryFocus : defaultFocusStyle;
  const baseActiveStyle = properties.primary ? computedStyle.primaryActive : defaultActiveStyle;
  const hoverStyle = extend({}, baseHoverStyle, properties.hoverStyle);
  const focusStyle = extend({}, baseFocusStyle, properties.focusStyle);
  const activeStyle = extend({}, baseActiveStyle, properties.activeStyle);
  injectStyle(styleId, hoverStyle, 'hover');
  injectStyle(styleId, focusStyle, 'focus');
  injectStyle(styleId, activeStyle, 'active');
}
