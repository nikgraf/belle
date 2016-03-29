import React, { Component, PropTypes } from 'react';
import { has, uniqueId } from '../../utils/helpers';
import buttonStyle from './styles';
import unionClassNames from '../../utils/union-class-names';
import { injectStyles, removeStyle } from '../../utils/inject-style';
import config from './config';

const buttonTypes = ['button', 'submit', 'reset']; // eslint-disable-line no-unused-vars

/**
 * Returns an object with properties that are relevant for the button element.
 *
 * In case a wrong or no type is defined the type of the child button will be
 * set to `button`.
 */
function sanitizeChildProps(properties) {
  /* eslint-disable no-use-before-define */
  const {
    className, // eslint-disable-line no-unused-vars
    style, // eslint-disable-line no-unused-vars
    hoverStyle, // eslint-disable-line no-unused-vars
    focusStyle, // eslint-disable-line no-unused-vars
    activeStyle, // eslint-disable-line no-unused-vars
    disabledStyle, // eslint-disable-line no-unused-vars
    disabledHoverStyle, // eslint-disable-line no-unused-vars
    primary, // eslint-disable-line no-unused-vars
    onTouchStart, // eslint-disable-line no-unused-vars
    onTouchEnd, // eslint-disable-line no-unused-vars
    onTouchCancel, // eslint-disable-line no-unused-vars
    onMouseDown, // eslint-disable-line no-unused-vars
    onMouseEnter, // eslint-disable-line no-unused-vars
    onMouseLeave, // eslint-disable-line no-unused-vars
    onFocus, // eslint-disable-line no-unused-vars
    onBlur, // eslint-disable-line no-unused-vars
    ...childProps,
  } = properties;
  /* eslint-enable no-use-before-define */

  return childProps;
}

/**
 * Update hover, focus & active style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing custom styles
 */
function updatePseudoClassStyle(styleId, properties, preventFocusStyleForTouchAndClick) {
  const baseStyle = properties.primary ? buttonStyle.primaryStyle : buttonStyle.style;
  const baseDisabledStyle = properties.primary ? buttonStyle.primaryDisabledStyle : buttonStyle.disabledStyle;
  const disabledStyle = {
    ...baseStyle,
    ...properties.style,
    ...baseDisabledStyle,
    ...properties.disabledStyle,
  };
  const baseActiveStyle = properties.primary ? buttonStyle.primaryActiveStyle : buttonStyle.activeStyle;
  const activeStyle = {
    ...baseActiveStyle,
    ...properties.activeStyle,
  };

  let focusStyle;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    const baseFocusStyle = properties.primary ? buttonStyle.primaryFocusStyle : buttonStyle.focusStyle;
    focusStyle = {
      ...baseFocusStyle,
      ...properties.focusStyle,
    };
  }

  const styles = [
    {
      id: styleId,
      style: activeStyle,
      pseudoClass: 'active',
    },
    {
      id: styleId,
      style: disabledStyle,
      pseudoClass: 'active',
      disabled: true,
    },
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus',
    },
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
      isActive: false,
      isHovered: false,

      // Note: On touch devices mouseEnter is fired while mouseLeave is not.
      // This would result in a hover effect that keeps active until another
      // element is focused on. This would result in the same behaviour as using
      // the :hover pseudo class. To prevent it from happening activating the
      // hover state is prevented when a touch event has been triggered before.
      // source: http://stackoverflow.com/a/22444532/837709
      isIgnoringHover: false,
    };

    // The focused attribute is used to apply the one-time focus animation.
    // As it is reset after every render it can't be set inside state as this
    // would trigger an endless loop.
    this.focused = false;

    // This used to determine if the one-time focus animation should be prevented.
    this.mouseDownOnButton = false;
  }

  static displayName = 'Button';

  static propTypes = {
    activeStyle: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(buttonTypes),
    style: PropTypes.object,
    focusStyle: PropTypes.object,
    hoverStyle: PropTypes.object,
    disabledStyle: PropTypes.object,
    disabledHoverStyle: PropTypes.object,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchCancel: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    preventFocusStyleForTouchAndClick: PropTypes.bool,
    primary: PropTypes.bool,
  };

  static defaultProps = {
    primary: false,
    disabled: false,
    type: 'button',
  };

  /**
   * Generates the style-id & inject the focus & active style.
   */
  componentWillMount() {
    this.styleId = `style-id${uniqueId()}`;
    updatePseudoClassStyle(this.styleId, this.props, this.preventFocusStyleForTouchAndClick);
  }

  /**
   * Update the childProps based on the updated properties of the button.
   */
  componentWillReceiveProps(properties) {
    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;

    this.setState({
      childProps: sanitizeChildProps(properties),
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
  _onFocus = (event) => {
    this.focused = true;
    this.forceUpdate();

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  /**
   * Deactivate the focused attribute used to determine when to show the
   * one-time focus animation and trigger a render.
   */
  _onBlur = (event) => {
    this.focused = false;
    this.setState({ isActive: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  _onMouseDown = (event) => {
    if (event.button === 0 && !this.props.disabled) {
      this.mouseDownOnButton = true;
    }

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };

  /**
   * Updates the button to be pressed.
   */
  _onTouchStart = (event) => {
    if (!this.props.disabled && event.touches.length === 1) {
      this.setState({
        isActive: true,
        isIgnoringHover: true,
      });
    }

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  };

  /**
   * Updates the button to be release.
   */
  _onTouchEnd = (event) => {
    this.setState({
      isActive: false,
      isIgnoringHover: true,
    });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  };

  /**
   * Updates the button to be release.
   */
  _onTouchCancel = (event) => {
    this.setState({
      isActive: false,
      isIgnoringHover: true,
    });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  };

  /**
   * As soon as the mouse enters the component the isHovered state is activated.
   */
  _onMouseEnter = (event) => {
    if (!this.state.isIgnoringHover) {
      this.setState({
        isHovered: true,
        isIgnoringHover: false,
      });
    }

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  /**
   * Deactivate the isHovered state.
   */
  _onMouseLeave = (event) => {
    this.setState({
      isHovered: false,
    });

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  render() {
    const baseStyle = this.props.primary ? buttonStyle.primaryStyle : buttonStyle.style;
    let combinedStyle = {
      ...baseStyle,
      ...this.props.style,
    };

    if (this.state.isHovered) {
      const baseHoverStyle = this.props.primary ? buttonStyle.primaryHoverStyle : buttonStyle.hoverStyle;
      combinedStyle = {
        ...combinedStyle,
        ...baseHoverStyle,
        ...this.props.hoverStyle,
      };
    }

    if (this.props.disabled) {
      const baseDisabledStyle = this.props.primary ? buttonStyle.primaryDisabledStyle : buttonStyle.disabledStyle;
      combinedStyle = {
        ...combinedStyle,
        ...baseDisabledStyle,
        ...this.props.disabledStyle,
      };
      if (this.state.isHovered) {
        const baseDisabledHoverStyle = this.props.primary ? buttonStyle.primaryDisabledHoverStyle : buttonStyle.disabledHoverStyle;
        combinedStyle = {
          ...combinedStyle,
          ...baseDisabledHoverStyle,
          ...this.props.disabledHoverStyle,
        };
      }
    } else {
      if (this.state.isActive) {
        const baseActiveStyle = this.props.primary ? buttonStyle.primaryActiveStyle : buttonStyle.activeStyle;
        combinedStyle = {
          ...combinedStyle,
          ...baseActiveStyle,
          ...this.props.activeStyle,
        };
      } else if (this.focused &&
                 !this.state.isActive &&
                 !this.mouseDownOnButton &&
                 this.preventFocusStyleForTouchAndClick) {
        const baseFocusStyle = this.props.primary ? buttonStyle.primaryFocusStyle : buttonStyle.focusStyle;
        combinedStyle = {
          ...combinedStyle,
          ...baseFocusStyle,
          ...this.props.focusStyle,
        };
      }
    }

    return (
      <button
        style={ combinedStyle }
        className={ unionClassNames(this.props.className, this.styleId) }
        onTouchStart={ this._onTouchStart }
        onTouchEnd={ this._onTouchEnd }
        onTouchCancel={ this._onTouchCancel }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
        onMouseDown={ this._onMouseDown }
        onMouseEnter={ this._onMouseEnter }
        onMouseLeave={ this._onMouseLeave }
        {...this.state.childProps}
      >
        { this.props.children }
      </button>
    );
  }
}
