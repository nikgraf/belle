import React, {Component, PropTypes} from 'react';
import {has, omit} from '../utils/helpers';
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
    'onMouseEnter',
    'onMouseLeave',
    'onFocus',
    'onBlur',
  ]);
}

/**
 * Update hover, focus & active style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing custom styles
 */
function updatePseudoClassStyle(styleId, properties, preventFocusStyleForTouchAndClick) {
  const baseActiveStyle = properties.primary ? style.primaryActiveStyle : style.activeStyle;

  const activeStyle = {
    ...baseActiveStyle,
    ...properties.activeStyle,
  };

  let focusStyle;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    const baseFocusStyle = properties.primary ? style.primaryFocusStyle : style.focusStyle;
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
    this.setState({ isActive: false });

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
      this.setState({ isActive: true });
    }

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  }

  /**
   * Updates the button to be release.
   */
  _onTouchEnd(event) {
    this.setState({ isActive: false });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  /**
   * Updates the button to be release.
   */
  _onTouchCancel(event) {
    this.setState({ isActive: false });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  /**
   * As soon as the mouse enters the component the isHovered state is activated.
   */
  _onMouseEnter(event) {
    this.setState({
      isHovered: true,
    });

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  }

  /**
   * Deactivate the isHovered state.
   */
  _onMouseLeave(event) {
    this.setState({
      isHovered: false,
    });

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  }

  render() {
    const baseStyle = this.props.primary ? style.primaryStyle : style.style;
    let buttonStyle = {
      ...baseStyle,
      ...this.props.style,
    };

    if (this.state.isHovered) {
      const baseHoverStyle = this.props.primary ? style.primaryHoverStyle : style.hoverStyle;
      buttonStyle = {
        ...buttonStyle,
        ...baseHoverStyle,
        ...this.props.hoverStyle,
      };
    }

    if (this.props.disabled) {
      const baseDisabledStyle = this.props.primary ? style.primaryDisabledStyle : style.disabledStyle;
      buttonStyle = {
        ...buttonStyle,
        ...baseDisabledStyle,
        ...this.props.disabledStyle,
      };
      if (this.state.isHovered) {
        const baseDisabledHoverStyle = this.props.primary ? style.primaryDisabledHoverStyle : style.disabledHoverStyle;
        buttonStyle = {
          ...buttonStyle,
          ...baseDisabledHoverStyle,
          ...this.props.disabledHoverStyle,
        };
      }
    } else {
      if (this.state.isActive) {
        const baseActiveStyle = this.props.primary ? style.primaryActiveStyle : style.activeStyle;
        buttonStyle = {
          ...buttonStyle,
          ...baseActiveStyle,
          ...this.props.activeStyle,
        };
      } else if (this.focused &&
                 !this.state.isActive &&
                 !this.mouseDownOnButton &&
                 this.preventFocusStyleForTouchAndClick) {
        const baseFocusStyle = this.props.primary ? style.primaryFocusStyle : style.focusStyle;
        buttonStyle = {
          ...buttonStyle,
          ...baseFocusStyle,
          ...this.props.focusStyle,
        };
      }
    }

    return (
      <button style={ buttonStyle }
              className={ unionClassNames(this.props.className, this.styleId) }
              onTouchStart={ ::this._onTouchStart }
              onTouchEnd={ ::this._onTouchEnd }
              onTouchCancel={ ::this._onTouchCancel }
              onFocus={ ::this._onFocus }
              onBlur={ ::this._onBlur }
              onMouseDown={ ::this._onMouseDown }
              onMouseEnter={ ::this._onMouseEnter }
              onMouseLeave={ ::this._onMouseLeave }
              {...this.state.childProps}>
        { this.props.children }
      </button>
    );
  }
}
