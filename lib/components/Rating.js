'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _exenv = require('exenv');

var _helpers = require('../utils/helpers');

var _rating = require('../style/rating.js');

var _rating2 = _interopRequireDefault(_rating);

var _injectStyle = require('../utils/inject-style');

var _unionClassNames = require('../utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _rating3 = require('../config/rating');

var _rating4 = _interopRequireDefault(_rating3);

var _animationFrameManagement = require('../utils/animation-frame-management');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ratingPropTypes = {
  defaultValue: _react.PropTypes.oneOf([1, 2, 3, 4, 5]),
  value: _react.PropTypes.oneOf([1, 2, 3, 4, 5]),
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.oneOf([1, 2, 3, 4, 5]),
    requestChange: _react.PropTypes.func.isRequired
  }),
  disabled: _react.PropTypes.bool,
  tabIndex: _react.PropTypes.number,
  character: _react.PropTypes.string,
  characterProps: _react.PropTypes.object,
  preventFocusStyleForTouchAndClick: _react.PropTypes.bool,
  'aria-label': _react.PropTypes.string,
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  focusStyle: _react.PropTypes.object,
  disabledStyle: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,
  characterStyle: _react.PropTypes.object,
  activeCharacterStyle: _react.PropTypes.object,
  hoverCharacterStyle: _react.PropTypes.object,
  onUpdate: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseMove: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  onTouchMove: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onTouchCancel: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func
};

/**
 * sanitize properties for the wrapping div.
 */
function sanitizeWrapperProps(properties) {
  return (0, _helpers.omit)(properties, Object.keys(ratingPropTypes));
}

/**
 * sanitize properties for the character span.
 */
function sanitizeCharacterProps(properties) {
  return (0, _helpers.omit)(properties, ['data-belle-value', 'style']);
}

/**
 * Injects pseudo classes for styles into the DOM.
 */
function updatePseudoClassStyle(ratingWrapperStyleId, properties, preventFocusStyleForTouchAndClick) {
  var ratingFocusStyle = void 0;
  if (preventFocusStyleForTouchAndClick) {
    ratingFocusStyle = { outline: 0 };
  } else {
    ratingFocusStyle = _extends({}, _rating2.default.focusStyle, properties.focusStyle);
  }

  var styles = [{
    id: ratingWrapperStyleId,
    style: ratingFocusStyle,
    pseudoClass: 'focus'
  }];
  (0, _injectStyle.injectStyles)(styles);
}

/**
 * Rating component
 *
 * The component leverages 5 characters (by default stars) to allow the user to
 * to rate.
 */

var Rating = function (_Component) {
  _inherits(Rating, _Component);

  function Rating(properties) {
    _classCallCheck(this, Rating);

    var _this = _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).call(this, properties));

    _initialiseProps.call(_this);

    var value = void 0;

    if ((0, _helpers.has)(properties, 'valueLink')) {
      value = properties.valueLink.value;
    } else if ((0, _helpers.has)(properties, 'value')) {
      value = properties.value;
    } else if ((0, _helpers.has)(properties, 'defaultValue')) {
      value = properties.defaultValue;
    }

    _this.state = {
      value: value,
      focusedValue: undefined,
      generalProps: sanitizeWrapperProps(properties),
      characterProps: sanitizeCharacterProps(properties.characterProps),
      isFocus: false,
      isActive: false
    };

    _this.preventFocusStyleForTouchAndClick = (0, _helpers.has)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _rating4.default.preventFocusStyleForTouchAndClick;
    return _this;
  }

  /**
   * Setting default prop values.
   */


  _createClass(Rating, [{
    key: 'componentWillMount',


    /**
     * Apply pseudo class styling to the wrapper div.
     */
    value: function componentWillMount() {
      var id = (0, _helpers.uniqueId)();
      this.ratingWrapperStyleId = 'rating-wrapper-style-id' + id;
      updatePseudoClassStyle(this.ratingWrapperStyleId, this.props, this.preventFocusStyleForTouchAndClick);

      if (_exenv.canUseDOM) {
        this.mouseUpOnDocumentCallback = this._onMouseUpOnDocument;
        document.addEventListener('mouseup', this.mouseUpOnDocumentCallback);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {
        wrapperProps: sanitizeWrapperProps(properties),
        characterProps: sanitizeCharacterProps(properties.characterProps)
      };

      if (properties.valueLink) {
        newState.value = properties.valueLink.value;
      } else if (properties.value) {
        newState.value = properties.value;
      }

      this.setState(newState);

      this.preventFocusStyleForTouchAndClick = (0, _helpers.has)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _rating4.default.preventFocusStyleForTouchAndClick;

      (0, _injectStyle.removeStyle)(this.ratingWrapperStyleId);
      updatePseudoClassStyle(this.ratingWrapperStyleId, properties, this.preventFocusStyleForTouchAndClick);
    }

    /**
     * Removes pseudo classes from the DOM once component gets removed.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeStyle)(this.ratingWrapperStyleId);
      if (_exenv.canUseDOM) {
        document.removeEventListener('mouseup', this.mouseUpOnDocumentCallback);
      }
    }

    /**
     * As soon as the mouse enters the component the focusedValue is updated based
     * on the value of the targeted span.
     */


    /**
     * As the mouse moved over the component and enters a new star the focusedValue
     * is updated based on the value of the targeted span.
     */


    /**
     * Resets the component as the mouse leaves the hover area.
     */


    /**
     * Sets isActive state to true.
     */


    /**
     * Sets isActive state to false.
     */


    /**
     * Change focusValue and sets isActive state to true.
     */


    /**
     * set the focusedValue depending on mouse position
     */


    /**
     * update the component when touch ends
     */


    /**
     * reset the component in case of touch cancel
     */


    /**
     * reset the component on blur
     */


    /**
     * enable focus styling of component when tab is used to focus component
     */


    /**
     * Manages the keyboard events.
     *
     * In case the Rating Component is in focus Space, ArrowUp will result in increasing the value and arrow down will result in decreasing the value.
     * Enter/ space will result in updating the value of the component.
     *
     * Pressing Escape will reset the value to last value.
     *
     */


    /**
     * decrease the value by 1 when arrow down key is pressed
     */


    /**
     * increase value by 1 when arrow up key is pressed
     */


    /**
     * set component value to current focus value
     */


    /**
     * reset component when escape key is pressed
     * esc key should just reset the component displayed rating without removing hover or focus styles
     */

  }, {
    key: '_getCurrentValue',


    /**
     * Returns current value of rating to be displayed on the component
     */
    value: function _getCurrentValue() {
      var value = void 0;
      if (this.state.focusedValue !== undefined) {
        value = this.state.focusedValue;
      } else {
        value = this.state.value ? this.state.value : 0;
      }

      return value;
    }

    /**
     * The function will be passed to requestAnimationFrame for touchMove
     */

  }, {
    key: '_triggerComponentUpdateOnTouchMove',
    value: function _triggerComponentUpdateOnTouchMove(touches) {
      var touchedElement = document.elementFromPoint(touches.clientX, touches.clientY);
      var value = Number(touchedElement.getAttribute('data-belle-value'));
      if (value && this.state.focusedValue !== value) {
        this.setState({
          focusedValue: value
        });
      }
    }

    /**
     * update component when component is clicked, touch ends, enter or space key are hit
     * different update logic will apply depending on whether component has property defaultValue, value or valueLink specified
     */

  }, {
    key: '_triggerComponentUpdate',
    value: function _triggerComponentUpdate(value) {
      if ((0, _helpers.has)(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(value);
        this.setState({
          focusedValue: undefined,
          isActive: false
        });
      } else if ((0, _helpers.has)(this.props, 'value')) {
        this.setState({
          focusedValue: undefined,
          isActive: false
        });
      } else {
        this.setState({
          focusedValue: undefined,
          isActive: false,
          value: value
        });
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({ value: value });
      }
    }

    /**
     * Returns the HTML function to be rendered by this component.
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var currentValue = this._getCurrentValue();
      var tabIndex = !this.props.disabled ? this.props.tabIndex : -1;

      var characterStyle = _extends({}, _rating2.default.characterStyle, this.props.characterStyle);

      if (this.state.isActive) {
        characterStyle = _extends({}, characterStyle, _rating2.default.activeCharacterStyle, this.props.activeCharacterStyle);
      } else if (this.state.isHover) {
        characterStyle = _extends({}, characterStyle, _rating2.default.hoverCharacterStyle, this.props.hoverCharacterStyle);
      }

      var wrapperStyle = _extends({}, _rating2.default.style, this.props.style);
      if (this.props.disabled) {
        wrapperStyle = _extends({}, wrapperStyle, _rating2.default.disabledStyle, this.props.disabledStyle);
        if (this.state.isHover) {
          wrapperStyle = _extends({}, wrapperStyle, _rating2.default.disabledHoverStyle, this.props.disabledHoverStyle);
        }
      } else {
        if (this.state.isFocus && this.preventFocusStyleForTouchAndClick) {
          wrapperStyle = _extends({}, wrapperStyle, _rating2.default.focusStyle, this.props.focusStyle);
        }

        if (this.state.isHover) {
          wrapperStyle = _extends({}, wrapperStyle, _rating2.default.hoverStyle, this.props.hoverStyle);
        }
      }

      return _react2.default.createElement(
        'div',
        _extends({
          ref: 'wrapper',
          style: wrapperStyle,
          className: (0, _unionClassNames2.default)(this.props.className, this.ratingWrapperStyleId),
          onKeyDown: this._onKeyDown,
          onMouseEnter: this._onMouseEnter,
          onMouseMove: this._onMouseMove,
          onMouseLeave: this._onMouseLeave,
          onMouseUp: this._onMouseUp,
          onMouseDown: this._onMouseDown,
          onTouchStart: this._onTouchStart,
          onTouchMove: this._onTouchMove,
          onTouchEnd: this._onTouchEnd,
          onTouchCancel: this._onTouchCancel,
          onContextMenu: this._onContextMenu,
          onBlur: this._onBlur,
          onFocus: this._onFocus,
          tabIndex: tabIndex,
          'aria-label': this.props['aria-label'],
          'aria-valuemax': 5,
          'aria-valuemin': 1,
          'aria-valuenow': this.state.value,
          'aria-disabled': this.props.disabled
        }, this.state.wrapperProps),
        _react2.default.Children.map([1, 2, 3, 4, 5], function (value) {
          var ratingStyle = currentValue >= value ? characterStyle : {};
          return _react2.default.createElement(
            'span',
            _extends({
              'data-belle-value': value,
              style: ratingStyle
            }, _this2.state.characterProps),
            _this2.props.character
          );
        })
      );
    }
  }]);

  return Rating;
}(_react.Component);

Rating.displayName = 'Rating';
Rating.propTypes = ratingPropTypes;
Rating.defaultProps = {
  disabled: false,
  tabIndex: 0,
  character: '★',
  'aria-label': 'rating'
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._onMouseEnter = function (event) {
    // In case the user pressed the mouse and then hovers over the rating and
    // releases the mousUp should no be trigger. Only when the mouseDown starts
    // inside.
    // Activating inside, going out & coming back should still be possible.
    if (!_this3.state.isActive) {
      _this3.preventNextMouseUpTriggerUpdate = true;
    }

    if (!_this3.props.disabled) {
      var value = Number(event.target.getAttribute('data-belle-value'));
      _this3.setState({
        focusedValue: value,
        isHover: true
      });
    } else {
      _this3.setState({
        isHover: true
      });
    }

    if (_this3.props.onMouseEnter) {
      _this3.props.onMouseEnter(event);
    }
  };

  this._onMouseMove = function (event) {
    if (!_this3.props.disabled) {
      var value = Number(event.target.getAttribute('data-belle-value'));
      if (_this3.state.focusedValue !== value) {
        _this3.setState({
          focusedValue: value
        });
      }
    }

    if (_this3.props.onMouseMove) {
      _this3.props.onMouseMove(event);
    }
  };

  this._onMouseLeave = function (event) {
    if (!_this3.props.disabled) {
      _this3.setState({
        focusedValue: undefined,
        isHover: false
      });
    } else {
      _this3.setState({
        isHover: false
      });
    }

    if (_this3.props.onMouseLeave) {
      _this3.props.onMouseLeave(event);
    }
  };

  this._onMouseDown = function (event) {
    if (!_this3.props.disabled && event.button === 0) {
      _this3.setState({ isActive: true });
      _this3.preventNextMouseUpTriggerUpdate = false;
    }

    if (_this3.props.onMouseDown) {
      _this3.props.onMouseDown(event);
    }
  };

  this._onMouseUp = function (event) {
    if (!_this3.props.disabled && !_this3.preventNextMouseUpTriggerUpdate) {
      var value = Number(event.target.getAttribute('data-belle-value'));
      _this3._triggerComponentUpdate(value);
    }

    if (_this3.props.onMouseUp) {
      _this3.props.onMouseUp(event);
    }
  };

  this._onMouseUpOnDocument = function () {
    _this3.setState({ isActive: false });
  };

  this._onContextMenu = function () {
    _this3.setState({ isActive: false });
  };

  this._onTouchStart = function (event) {
    event.preventDefault();

    if (!_this3.props.disabled && event.touches.length === 1) {
      var value = Number(event.target.getAttribute('data-belle-value'));
      _this3.setState({
        focusedValue: value,
        isActive: true
      });
    }

    if (_this3.props.onTouchStart) {
      _this3.props.onTouchStart(event);
    }
  };

  this._onTouchMove = function (event) {
    if (!_this3.props.disabled && event.touches.length === 1) {
      var touches = event.touches[0];

      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      var animationFrame = _animationFrameManagement.requestAnimationFrame.call(window, _this3._triggerComponentUpdateOnTouchMove.bind(_this3, touches));

      if (_this3.previousTouchMoveFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        _animationFrameManagement.cancelAnimationFrame.call(window, _this3.previousTouchMoveFrame);
      }

      _this3.previousTouchMoveFrame = animationFrame;
    }

    if (_this3.props.onTouchMove) {
      _this3.props.onTouchMove(event);
    }
  };

  this._onTouchEnd = function (event) {
    if (!_this3.props.disabled) {
      event.preventDefault();
      _this3.setState({ isActive: false });
      var value = _this3.state.focusedValue;
      _this3._triggerComponentUpdate(value);
    }

    if (_this3.props.onTouchEnd) {
      _this3.props.onTouchEnd(event);
    }
  };

  this._onTouchCancel = function (event) {
    if (!_this3.props.disabled) {
      _this3.setState({
        isActive: false,
        focusedValue: undefined
      });
    }

    if (_this3.props.onTouchCancel) {
      _this3.props.onTouchCancel(event);
    }
  };

  this._onBlur = function (event) {
    if (!_this3.props.disabled) {
      _this3.setState({
        focusedValue: undefined,
        isFocus: false,
        isActive: false
      });
    }

    if (_this3.props.onBlur) {
      _this3.props.onBlur(event);
    }
  };

  this._onFocus = function () {
    if (!_this3.state.isActive && !_this3.props.disabled) {
      _this3.setState({ isFocus: true });
    }

    if (_this3.props.onFocus) {
      _this3.props.onFocus(event);
    }
  };

  this._onKeyDown = function (event) {
    if (!_this3.props.disabled) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
        event.preventDefault();
        _this3._onArrowDownKeyDown();
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
        event.preventDefault();
        _this3._onArrowUpKeyDown();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        _this3._onEnterSpaceKeyDown();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        _this3._onEscapeKeyDown();
      }
    }

    if (_this3.props.onKeyDown) {
      _this3.props.onKeyDown(event);
    }
  };

  this._onArrowDownKeyDown = function () {
    var newValue = _this3.state.focusedValue !== undefined ? _this3.state.focusedValue : _this3.state.value;
    newValue = newValue > 0 ? newValue - 1 : 0;
    _this3.setState({
      focusedValue: newValue
    });
  };

  this._onArrowUpKeyDown = function () {
    var newValue = _this3.state.focusedValue !== undefined ? _this3.state.focusedValue : _this3.state.value;
    if (!newValue) {
      newValue = 1;
    } else if (newValue < 5) {
      newValue = newValue + 1;
    } else {
      newValue = 5;
    }

    _this3.setState({
      focusedValue: newValue
    });
  };

  this._onEnterSpaceKeyDown = function () {
    var newValue = void 0;
    if (_this3.state.focusedValue !== undefined) {
      if (_this3.state.focusedValue === 0) {
        newValue = undefined;
      } else {
        newValue = _this3.state.focusedValue;
      }

      _this3._triggerComponentUpdate(newValue);
    }
  };

  this._onEscapeKeyDown = function () {
    _this3.setState({
      focusedValue: undefined
    });
  };
};

exports.default = Rating;