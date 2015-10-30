import React, {Component, PropTypes} from 'react';
import { canUseDOM } from 'exenv';
import {omit, has} from '../utils/helpers';
import style from '../style/rating.js';
import {injectStyles, removeStyle} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import config from '../config/rating';
import {requestAnimationFrame, cancelAnimationFrame} from '../utils/animation-frame-management';

/**
 * sanitize properties for the wrapping div.
 */
function sanitizeWrapperProps(properties) {
  return omit(properties, [
    'className',
    'onKeyDown',
    'onMouseEnter',
    'onMouseMove',
    'onMouseLeave',
    'onMouseUp',
    'onMouseDown',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel',
    'onBlur',
    'onFocus',
    'tabIndex',
    'aria-label',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-disabled',
    'style',
    'focusStyle',
    'disabledStyle',
    'characterStyle',
    'activeCharacterStyle',
    'hoverCharacterStyle',
    'characterProps',
  ]);
}

/**
 * sanitize properties for the character span.
 */
function sanitizeCharacterProps(properties) {
  return omit(properties, [
    'data-belle-value',
    'style',
  ]);
}

/**
 * Injects pseudo classes for styles into the DOM.
 */
function updatePseudoClassStyle(ratingWrapperStyleId, properties, preventFocusStyleForTouchAndClick) {
  let ratingFocusStyle;
  if (preventFocusStyleForTouchAndClick) {
    ratingFocusStyle = { outline: 0 };
  } else {
    ratingFocusStyle = {
      ...style.focusStyle,
      ...properties.focusStyle,
    };
  }

  const styles = [
    {
      id: ratingWrapperStyleId,
      style: ratingFocusStyle,
      pseudoClass: 'focus',
    },
  ];
  injectStyles(styles);
}

/**
 * Rating component
 *
 * The component leverages 5 characters (by default stars) to allow the user to
 * to rate.
 */
export default class Rating extends Component {

  constructor(properties) {
    super(properties);

    let value;

    if (has(properties, 'valueLink')) {
      value = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      value = properties.value;
    } else if (has(properties, 'defaultValue')) {
      value = properties.defaultValue;
    }

    this.state = {
      value: value,
      focusedValue: undefined,
      generalProps: sanitizeWrapperProps(properties),
      characterProps: sanitizeCharacterProps(properties.characterProps),
      isFocus: false,
      isActive: false,
    };

    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;
  }

  static displayName = 'Rating';

  static propTypes = {
    defaultValue: PropTypes.oneOf([1, 2, 3, 4, 5]),
    value: PropTypes.oneOf([1, 2, 3, 4, 5]),
    valueLink: PropTypes.shape({
      value: PropTypes.oneOf([1, 2, 3, 4, 5]),
      requestChange: PropTypes.func.isRequired,
    }),
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    character: PropTypes.string,
    characterProps: PropTypes.object,
    preventFocusStyleForTouchAndClick: PropTypes.bool,
    'aria-label': PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    focusStyle: PropTypes.object,
    disabledStyle: PropTypes.object,
    hoverStyle: PropTypes.object,
    disabledHoverStyle: PropTypes.object,
    characterStyle: PropTypes.object,
    activeCharacterStyle: PropTypes.object,
    hoverCharacterStyle: PropTypes.object,
    onUpdate: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchCancel: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
  };

  /**
   * Setting default prop values.
   */
  static defaultProps = {
    disabled: false,
    tabIndex: 0,
    character: '★',
    'aria-label': 'rating',
  };

  /**
   * Apply pseudo class styling to the wrapper div.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this.ratingWrapperStyleId = `rating-wrapper-style-id${id}`;
    updatePseudoClassStyle(this.ratingWrapperStyleId, this.props, this.preventFocusStyleForTouchAndClick);

    if (canUseDOM) {
      this.mouseUpOnDocumentCallback = ::this._onMouseUpOnDocument;
      document.addEventListener('mouseup', this.mouseUpOnDocumentCallback);
    }
  }

  componentWillReceiveProps(properties) {
    const newState = {
      wrapperProps: sanitizeWrapperProps(properties),
      characterProps: sanitizeCharacterProps(properties.characterProps),
    };

    if (properties.valueLink) {
      newState.value = properties.valueLink.value;
    } else if (properties.value) {
      newState.value = properties.value;
    }

    this.setState(newState);

    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;

    removeStyle(this.ratingWrapperStyleId);
    updatePseudoClassStyle(this.ratingWrapperStyleId, properties, this.preventFocusStyleForTouchAndClick);
  }

  /**
   * Removes pseudo classes from the DOM once component gets removed.
   */
  componentWillUnmount() {
    removeStyle(this.ratingWrapperStyleId);
    if (canUseDOM) {
      document.removeEventListener('mouseup', this.mouseUpOnDocumentCallback);
    }
  }

  /**
   * As soon as the mouse enters the component the focusedValue is updated based
   * on the value of the targeted span.
   */
  _onMouseEnter(event) {
    // In case the user pressed the mouse and then hovers over the rating and
    // releases the mousUp should no be trigger. Only when the mouseDown starts
    // inside.
    // Activating inside, going out & coming back should still be possible.
    if (!this.state.isActive) {
      this.preventNextMouseUpTriggerUpdate = true;
    }

    if (!this.props.disabled) {
      const value = Number(event.target.getAttribute('data-belle-value'));
      this.setState({
        focusedValue: value,
        isHover: true,
      });
    } else {
      this.setState({
        isHover: true,
      });
    }

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  }

  /**
   * As the mouse moved over the component and enters a new star the focusedValue
   * is updated based on the value of the targeted span.
   */
  _onMouseMove(event) {
    if (!this.props.disabled) {
      const value = Number(event.target.getAttribute('data-belle-value'));
      if (this.state.focusedValue !== value) {
        this.setState({
          focusedValue: value,
        });
      }
    }

    if (this.props.onMouseMove) {
      this.props.onMouseMove(event);
    }
  }

  /**
   * Resets the component as the mouse leaves the hover area.
   */
  _onMouseLeave(event) {
    if (!this.props.disabled) {
      this.setState({
        focusedValue: undefined,
        isHover: false,
      });
    } else {
      this.setState({
        isHover: false,
      });
    }

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  }

  /**
   * Sets isActive state to true.
   */
  _onMouseDown(event) {
    if (!this.props.disabled && event.buttons === 1) {
      this.setState({ isActive: true });
      this.preventNextMouseUpTriggerUpdate = false;
    }

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  }

  /**
   * Sets isActive state to false.
   */
  _onMouseUp(event) {
    if (!this.props.disabled && !this.preventNextMouseUpTriggerUpdate) {
      const value = Number(event.target.getAttribute('data-belle-value'));
      this._triggerComponentUpdate(value);
    }

    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  }

  _onMouseUpOnDocument() {
    this.setState({ isActive: false });
  }

  _onContextMenu() {
    this.setState({ isActive: false });
  }

  /**
   * Change focusValue and sets isActive state to true.
   */
  _onTouchStart(event) {
    event.preventDefault();

    if (!this.props.disabled && event.touches.length === 1) {
      const value = Number(event.target.getAttribute('data-belle-value'));
      this.setState({
        focusedValue: value,
        isActive: true,
      });
    }

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  }

  /**
   * set the focusedValue depending on mouse position
   */
  _onTouchMove(event) {
    if (!this.props.disabled && event.touches.length === 1) {
      const touches = event.touches[0];

      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      const animationFrame = requestAnimationFrame.call(
        window,
        this._triggerComponentUpdateOnTouchMove.bind(this, touches)
      );

      if (this.previousTouchMoveFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        cancelAnimationFrame.call(window, this.previousTouchMoveFrame);
      }

      this.previousTouchMoveFrame = animationFrame;
    }

    if (this.props.onTouchMove) {
      this.props.onTouchMove(event);
    }
  }

  /**
   * update the component when touch ends
   */
  _onTouchEnd(event) {
    if (!this.props.disabled) {
      event.preventDefault();
      this.setState({isActive: false});
      const value = this.state.focusedValue;
      this._triggerComponentUpdate(value);
    }

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  /**
   * reset the component in case of touch cancel
   */
  _onTouchCancel(event) {
    if (!this.props.disabled) {
      this.setState({
        isActive: false,
        focusedValue: undefined,
      });
    }

    if (this.props.onTouchCancel) {
      this.props.onTouchCancel(event);
    }
  }

  /**
   * reset the component on blur
   */
  _onBlur(event) {
    if (!this.props.disabled) {
      this.setState({
        focusedValue: undefined,
        isFocus: false,
        isActive: false,
      });
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  /**
   * enable focus styling of component when tab is used to focus component
   */
  _onFocus() {
    if (!this.state.isActive && !this.props.disabled) {
      this.setState({isFocus: true});
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * Manages the keyboard events.
   *
   * In case the Rating Component is in focus Space, ArrowUp will result in increasing the value and arrow down will result in decreasing the value.
   * Enter/ space will result in updating the value of the component.
   *
   * Pressing Escape will reset the value to last value.
   *
   */
  _onKeyDown(event) {
    if (!this.props.disabled) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
        event.preventDefault();
        this._onArrowDownKeyDown();
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
        event.preventDefault();
        this._onArrowUpKeyDown();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this._onEnterSpaceKeyDown();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        this._onEscapeKeyDown();
      }
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  /**
   * decrease the value by 1 when arrow down key is pressed
   */
  _onArrowDownKeyDown() {
    let newValue = this.state.focusedValue !== undefined ? this.state.focusedValue : this.state.value;
    newValue = newValue > 0 ? (newValue - 1) : 0;
    this.setState({
      focusedValue: newValue,
    });
  }

  /**
   * increase value by 1 when arrow up key is pressed
   */
  _onArrowUpKeyDown() {
    let newValue = this.state.focusedValue !== undefined ? this.state.focusedValue : this.state.value;
    if (!newValue) {
      newValue = 1;
    } else if (newValue < 5) {
      newValue = newValue + 1;
    } else {
      newValue = 5;
    }

    this.setState({
      focusedValue: newValue,
    });
  }

  /**
   * set component value to current focus value
   */
  _onEnterSpaceKeyDown() {
    let newValue;
    if (this.state.focusedValue !== undefined) {
      if (this.state.focusedValue === 0) {
        newValue = undefined;
      } else {
        newValue = this.state.focusedValue;
      }

      this._triggerComponentUpdate(newValue);
    }
  }

  /**
   * reset component when escape key is pressed
   * esc key should just reset the component displayed rating without removing hover or focus styles
   */
  _onEscapeKeyDown() {
    this.setState({
      focusedValue: undefined,
    });
  }

  /**
   * Returns current value of rating to be displayed on the component
   */
  _getCurrentValue() {
    let value;
    if (this.state.focusedValue !== undefined) {
      value = this.state.focusedValue;
    } else {
      value = (this.state.value) ? this.state.value : 0;
    }

    return value;
  }

  /**
   * The function will be passed to requestAnimationFrame for touchMove
   */
  _triggerComponentUpdateOnTouchMove(touches) {
    const touchedElement = document.elementFromPoint(touches.clientX, touches.clientY);
    const value = Number(touchedElement.getAttribute('data-belle-value'));
    if (value && this.state.focusedValue !== value) {
      this.setState({
        focusedValue: value,
      });
    }
  }

  /**
   * update component when component is clicked, touch ends, enter or space key are hit
   * different update logic will apply depending on whether component has property defaultValue, value or valueLink specified
   */
  _triggerComponentUpdate(value) {
    if (has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
      this.setState({
        focusedValue: undefined,
        isActive: false,
      });
    } else if (has(this.props, 'value')) {
      this.setState({
        focusedValue: undefined,
        isActive: false,
      });
    } else {
      this.setState({
        focusedValue: undefined,
        isActive: false,
        value: value,
      });
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({ value: value });
    }
  }

  /**
   * Returns the HTML function to be rendered by this component.
   */
  render() {
    const currentValue = this._getCurrentValue();
    const tabIndex = !this.props.disabled ? this.props.tabIndex : -1;

    let characterStyle = {
      ...style.characterStyle,
      ...this.props.characterStyle,
    };

    if (this.state.isActive) {
      characterStyle = {
        ...characterStyle,
        ...style.activeCharacterStyle,
        ...this.props.activeCharacterStyle,
      };
    } else if (this.state.isHover) {
      characterStyle = {
        ...characterStyle,
        ...style.hoverCharacterStyle,
        ...this.props.hoverCharacterStyle,
      };
    }

    let wrapperStyle = {
      ...style.style,
      ...this.props.style,
    };
    if (this.props.disabled) {
      wrapperStyle = {
        ...wrapperStyle,
        ...style.disabledStyle,
        ...this.props.disabledStyle,
      };
      if (this.state.isHover) {
        wrapperStyle = {
          ...wrapperStyle,
          ...style.disabledHoverStyle,
          ...this.props.disabledHoverStyle,
        };
      }
    } else {
      if (this.state.isFocus && this.preventFocusStyleForTouchAndClick) {
        wrapperStyle = {
          ...wrapperStyle,
          ...style.focusStyle,
          ...this.props.focusStyle,
        };
      }

      if (this.state.isHover) {
        wrapperStyle = {
          ...wrapperStyle,
          ...style.hoverStyle,
          ...this.props.hoverStyle,
        };
      }
    }

    return (
      <div ref="wrapper"
           style={ wrapperStyle }
           className={ unionClassNames(this.props.className, this.ratingWrapperStyleId) }
           onKeyDown={ ::this._onKeyDown }
           onMouseEnter={ ::this._onMouseEnter }
           onMouseMove={ ::this._onMouseMove }
           onMouseLeave={ ::this._onMouseLeave }
           onMouseUp={ ::this._onMouseUp }
           onMouseDown={ ::this._onMouseDown }
           onTouchStart={ ::this._onTouchStart }
           onTouchMove={ ::this._onTouchMove }
           onTouchEnd={ ::this._onTouchEnd }
           onTouchCancel={ ::this._onTouchCancel }
           onContextMenu={ ::this._onContextMenu }
           onBlur={ ::this._onBlur }
           onFocus={ ::this._onFocus }
           tabIndex={ tabIndex }
           aria-label = { this.props['aria-label'] }
           aria-valuemax = { 5 }
           aria-valuemin = { 1 }
           aria-valuenow = { this.state.value }
           aria-disabled = { this.props.disabled }
           {...this.state.wrapperProps}>

           {
             React.Children.map([1, 2, 3, 4, 5], (value) => {
               const ratingStyle = (currentValue >= value) ? characterStyle : {};
               return (
                 <span data-belle-value= { value }
                       style={ ratingStyle }
                       {...this.state.characterProps}>
                   { this.props.character }
                 </span>
               );
             })
           }
      </div>
    );
  }
}
