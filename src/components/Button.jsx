"use strict";

import React, {Component} from 'react';
import {omit, extend, contains} from 'underscore';
import style from '../style/button';
import unionClassNames from '../utils/union-class-names';
import {injectStyles, removeStyle} from '../utils/inject-style';

const buttonTypes = ['button', 'submit', 'reset'];

// Enable React Touch Events
React.initializeTouchEvents(true);

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
    this.state = {
      childProperties: sanitizeChildProperties(properties),
      // used for touch devices like iOS Chrome/Safari where the active
      // pseudoClass is not supported on touch
      active: false
    };
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
    this.setState({ childProperties: sanitizeChildProperties(properties) });
    updatePseudoClassStyle(this.styleId, properties);
  }

  /**
   * Remove focus from this button
   */
  _blur() {
    React.findDOMNode(this).blur();
  }

  /**
   * Updates the button to be pressed right now.
   */
  _onTouchStart(event) {
    this.setState({ active: true });

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  }

  /**
   * Updates the button to be release.
   */
  _onTouchEnd(event) {
    this.setState({ active: false });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  /**
   * Updates the button to be release.
   */
  _onTouchCancel(event) {
    this.setState({ active: false });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  render() {
    const baseStyle = this.props.primary ? style.primaryStyle : style.style;
    const baseButtonStyle = extend({}, baseStyle, this.props.style);

    let buttonStyle;
    if (this.props.disabled) {
      if (this.props.primary) {
        const primaryDisabledStyle = extend({}, style.primaryDisabledStyle, this.props.disabledStyle);
        buttonStyle = extend({}, baseButtonStyle, primaryDisabledStyle);
      } else {
        const disabledStyle = extend({}, style.disabledStyle, this.props.disabledStyle);
        buttonStyle = extend({}, baseButtonStyle, disabledStyle);
      }
    } else {
      if (this.state.active) {
        const baseActiveStyle = this.props.primary ? style.primaryActiveStyle : style.activeStyle;
        const activeStyle = extend({}, baseButtonStyle, baseActiveStyle, this.props.activeStyle);
        buttonStyle = activeStyle;
      } else {
        buttonStyle = baseButtonStyle;
      }
    }

    return <button style={ buttonStyle }
                   className={ unionClassNames(this.props.className, this.styleId) }
                   onTouchStart={ this._onTouchStart.bind(this) }
                   onTouchEnd={ this._onTouchEnd.bind(this) }
                   onTouchCancel={ this._onTouchCancel.bind(this) }
                   {...this.state.childProperties}>
      { this.props.children }
    </button>;
  }
}

Button.displayName = 'Belle Button';

Button.propTypes = {
  primary: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  type: React.PropTypes.oneOf(buttonTypes),
  style: React.PropTypes.object,
  focusStyle: React.PropTypes.object,
  hoverStyle: React.PropTypes.object,
  disabledStyle: React.PropTypes.object,
  disabledHoverStyle: React.PropTypes.object,
  onTouchStart: React.PropTypes.func,
  onTouchEnd: React.PropTypes.func,
  onTouchCancel: React.PropTypes.func
};

Button.defaultProps = {
  primary: false,
  disabled: false,
  type: 'button'
};

/**
 * Returns an object with properties that are relevant for the button element.
 *
 * In case a wrong or no type is defined the type of the child button will be
 * set to `button`.
 */
function sanitizeChildProperties(properties) {
  let childProperties = omit(properties, [
    'className',
    'style',
    'hoverStyle',
    'focusStyle',
    'activeStyle',
    'disabledStyle',
    'disabledHoverStyle',
    'primary',
    'onTouchStart',
    'onTouchEnd',
    'onTouchCancel'
  ]);
  return childProperties;
}

/**
 * Update hover, focus & active style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing custom styles
 */
function updatePseudoClassStyle(styleId, properties) {
  const baseHoverStyle = properties.primary ? style.primaryHoverStyle : style.hoverStyle;
  const baseFocusStyle = properties.primary ? style.primaryFocusStyle : style.focusStyle;
  const baseActiveStyle = properties.primary ? style.primaryActiveStyle : style.activeStyle;
  const baseDisabledHoverStyle = properties.primary ? style.primaryDisabledHoverStyle : style.disabledHoverStyle;
  const hoverStyle = extend({}, baseHoverStyle, properties.hoverStyle);
  const focusStyle = extend({}, baseFocusStyle, properties.focusStyle);
  const activeStyle = extend({}, baseActiveStyle, properties.activeStyle);
  const disabledHoverStyle = extend({}, baseDisabledHoverStyle, properties.disabledHoverStyle);
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
    },
    {
      id: styleId,
      style: disabledHoverStyle,
      pseudoClass: 'hover',
      disabled: true
    }
  ];
  injectStyles(styles);
}
