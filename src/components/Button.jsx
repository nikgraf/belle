"use strict";

import React, {Component} from 'react';
import {omit, extend, contains} from 'underscore';
import style from '../style/button';
import {injectStyles, removeStyle} from '../utils/inject-style';

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
    super(properties);
    this.childProperties = sanitizeChildProperties(properties);
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
    const baseStyle = this.props.primary ? style.primaryStyle : style.defaultStyle;
    const buttonStyle = extend({}, baseStyle, this.props.style);

    return <button style={ buttonStyle }
                   className={ `${this.props.className} ${this.styleId}` }
                   onClick={ this.onClick.bind(this) }
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

  /**
   * Once a user clicks on the button it will loose focus. In addition the
   * onClick event is passed to the onClick property.
   */
  onClick(event) {
    this.blur();

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }
}

Button.displayName = 'Belle Button';

Button.propTypes = {
  primary: React.PropTypes.bool,
  type: React.PropTypes.oneOf(buttonTypes)
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
    'style',
    'hoverStyle',
    'focusStyle',
    'activeStyle'
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
  const baseHoverStyle = properties.primary ? style.primaryHoverStyle : style.defaultHoverStyle;
  const baseFocusStyle = properties.primary ? style.primaryFocusStyle : style.defaultFocusStyle;
  const baseActiveStyle = properties.primary ? style.primaryActiveStyle : style.defaultActiveStyle;
  const hoverStyle = extend({}, baseHoverStyle, properties.hoverStyle);
  const focusStyle = extend({}, baseFocusStyle, properties.focusStyle);
  const activeStyle = extend({}, baseActiveStyle, properties.activeStyle);
  const styles = [
    {
      id: styleId,
      style: hoverStyle,
      pseudoClass: 'hover'
    },
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus'
    },
    {
      id: styleId,
      style: activeStyle,
      pseudoClass: 'active'
    }
  ];
  injectStyles(styles);
}
