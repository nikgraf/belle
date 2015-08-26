import React, {Component} from 'react';
import {has, omit, extend} from '../utils/helpers';
import style from '../style/button';
import unionClassNames from '../utils/union-class-names';
import {injectStyles, removeStyle} from '../utils/inject-style';
import config from '../config/button';

const buttonTypes = ['button', 'submit', 'reset'];

/**
 * Returns an object with properties that are relevant for the button element.
 *
 * In case a wrong or no type is defined the type of the child button will be
 * set to `button`.
 */
function sanitizeChildProps(properties) {
  return omit(properties, [
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
    'onTouchCancel',
    'onMouseDown',
    'onFocus',
    'onBlur'
  ]);
}

/**
 * Update hover, focus & active style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing custom styles
 */
function updatePseudoClassStyle(styleId, properties, preventFocusStyleForTouchAndClick) {
  const baseHoverStyle = properties.primary ? style.primaryHoverStyle : style.hoverStyle;
  const baseActiveStyle = properties.primary ? style.primaryActiveStyle : style.activeStyle;
  const baseDisabledHoverStyle = properties.primary ? style.primaryDisabledHoverStyle : style.disabledHoverStyle;
  const hoverStyle = extend({}, baseHoverStyle, properties.hoverStyle);
  const activeStyle = extend({}, baseActiveStyle, properties.activeStyle);
  const disabledHoverStyle = extend({}, baseDisabledHoverStyle, properties.disabledHoverStyle);

  let focusStyle;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    const baseFocusStyle = properties.primary ? style.primaryFocusStyle : style.focusStyle;
    focusStyle = extend({}, baseFocusStyle, properties.focusStyle);
  }

  const styles = [
    {
      id: styleId,
      style: hoverStyle,
      pseudoClass: 'hover'
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
    },
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus'
    }
  ];

  injectStyles(styles);
}

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

    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;

    this.state = {
      childProps: sanitizeChildProps(properties),
      // used for touch devices like iOS Chrome/Safari where the active
      // pseudoClass is not supported on touch
      active: false
    };
    // The focused attribute is used to apply the one-time focus animation.
    // As it is reset after every render it can't be set inside state as this
    // would trigger an endless loop.
    this.focused = false;

    // This used to determine if the one-time focus animation should be prevented.
    this.mouseDownOnButton = false;
  }

  static displayName = 'Belle Button';

  static propTypes = {
    activeStyle: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    type: React.PropTypes.oneOf(buttonTypes),
    style: React.PropTypes.object,
    focusStyle: React.PropTypes.object,
    hoverStyle: React.PropTypes.object,
    disabledStyle: React.PropTypes.object,
    disabledHoverStyle: React.PropTypes.object,
    onTouchStart: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchCancel: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    preventFocusStyleForTouchAndClick: React.PropTypes.bool,
    primary: React.PropTypes.bool
  };

  static defaultProps = {
    primary: false,
    disabled: false,
    type: 'button'
  };

  /**
   * Generates the style-id & inject the focus, hover & active style.
   *
   * The style-id is based on React's unique DOM node id.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this.styleId = `style-id${id}`;
    updatePseudoClassStyle(this.styleId, this.props, this.preventFocusStyleForTouchAndClick);
  }

  /**
   * Update the childProps based on the updated properties of the button.
   */
  componentWillReceiveProps(properties) {
    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;

    this.setState({
      childProps: sanitizeChildProps(properties)
    });
    removeStyle(this.styleId);
    updatePseudoClassStyle(this.styleId, properties, this.preventFocusStyleForTouchAndClick);
  }

  /**
   * Deactivate the focused attribute in order to make sure the focus animation
   * only runs once when the component is focused on & not after re-rendering
   * e.g when the user clicks the button.
   */
  componentDidUpdate() {
    this.focused = false;
    this.mouseDownOnButton = false;
  }

  /**
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this.styleId);
  }

  /**
   * Activate the focused attribute used to determine when to show the
   * one-time focus animation and trigger a render.
   */
  _onFocus(event) {
    this.focused = true;
    this.forceUpdate();

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * Deactivate the focused attribute used to determine when to show the
   * one-time focus animation and trigger a render.
   */
  _onBlur(event) {
    this.focused = false;
    this.setState({ active: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  _onMouseDown(event) {
    if (event.button === 0 && !this.props.disabled) {
      this.mouseDownOnButton = true;
    }

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  }

  /**
   * Updates the button to be pressed.
   */
  _onTouchStart(event) {
    if (!this.props.disabled && event.touches.length === 1) {
      this.setState({ active: true });
    }

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
        buttonStyle = extend({}, baseButtonStyle, style.primaryDisabledStyle, this.props.disabledStyle);
      } else {
        buttonStyle = extend({}, baseButtonStyle, style.disabledStyle, this.props.disabledStyle);
      }
    } else {
      if (this.state.active) {
        const baseActiveStyle = this.props.primary ? style.primaryActiveStyle : style.activeStyle;
        buttonStyle = extend({}, baseButtonStyle, baseActiveStyle, this.props.activeStyle);
      } else if (this.focused &&
                 !this.state.active &&
                 !this.mouseDownOnButton &&
                 this.preventFocusStyleForTouchAndClick) {
        const baseFocusStyle = this.props.primary ? style.primaryFocusStyle : style.focusStyle;
        buttonStyle = extend({}, baseButtonStyle, baseFocusStyle, this.props.focusStyle);
      } else {
        buttonStyle = baseButtonStyle;
      }
    }

    return (
      <button style={ buttonStyle }
              className={ unionClassNames(this.props.className, this.styleId) }
              onTouchStart={ this._onTouchStart.bind(this) }
              onTouchEnd={ this._onTouchEnd.bind(this) }
              onTouchCancel={ this._onTouchCancel.bind(this) }
              onFocus={ this._onFocus.bind(this) }
              onBlur={ this._onBlur.bind(this) }
              onMouseDown={ this._onMouseDown.bind(this) }
              {...this.state.childProps}>
        { this.props.children }
      </button>
    );
  }
}
