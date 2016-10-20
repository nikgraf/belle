'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _injectStyle = require('../utils/inject-style');

var _helpers = require('../utils/helpers');

var _toggle = require('../style/toggle');

var _toggle2 = _interopRequireDefault(_toggle);

var _toggle3 = require('../config/toggle');

var _toggle4 = _interopRequireDefault(_toggle3);

var _isComponentOfType = require('../utils/is-component-of-type.js');

var _isComponentOfType2 = _interopRequireDefault(_isComponentOfType);

var _animationFrameManagement = require('../utils/animation-frame-management');

var _unionClassNames = require('../utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _Choice = require('../components/Choice');

var _Choice2 = _interopRequireDefault(_Choice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Verifies that the children is an array containing only two choices with a
 * different value.
 */
function validateChoices(props, propName, componentName) {
  var propValue = props[propName];
  if (!propValue) {
    return undefined;
  }

  if (!Array.isArray(propValue) || propValue.length !== 2) {
    return new Error('Invalid ' + propName + ' supplied to `' + componentName + '`, expected exactly two Choice components.');
  }

  for (var i = 0; i < propValue.length; ++i) {
    var item = propValue[i];
    if (!item || !(0, _isComponentOfType2.default)(_Choice2.default, item)) {
      return new Error('Invalid ' + propName + '[' + i + '] supplied to `' + componentName + '`, expected a Choice component from Belle.');
    }
  }

  if ((0, _helpers.first)(propValue).props.value === (0, _helpers.last)(propValue).props.value) {
    return new Error('Invalid ' + propName + ' supplied to `' + componentName + '`, expected different value properties for the provided Choice components.');
  }

  return undefined;
}

var togglePropTypes = {
  activeHandleStyle: _react.PropTypes.object,
  children: validateChoices,
  className: _react.PropTypes.string,
  defaultValue: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  disabledHandleStyle: _react.PropTypes.object,
  disabledStyle: _react.PropTypes.object,
  firstChoiceProps: _react.PropTypes.object,
  firstChoiceStyle: _react.PropTypes.shape({
    width: _react.PropTypes.number
  }),
  focusStyle: _react.PropTypes.object,
  handleProps: _react.PropTypes.shape({
    onMouseDown: _react.PropTypes.func,
    onMouseMove: _react.PropTypes.func,
    onMouseUp: _react.PropTypes.func,
    onMouseLeave: _react.PropTypes.func,
    onTouchStart: _react.PropTypes.func,
    onTouchMove: _react.PropTypes.func,
    onTouchEnd: _react.PropTypes.func,
    onTouchCancel: _react.PropTypes.func
  }),
  handleStyle: _react.PropTypes.shape({
    height: _react.PropTypes.number,
    width: _react.PropTypes.number
  }),
  hoverHandleStyle: _react.PropTypes.object,
  onBlur: _react.PropTypes.func,
  onUpdate: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  secondChoiceProps: _react.PropTypes.object,
  secondChoiceStyle: _react.PropTypes.shape({
    width: _react.PropTypes.number
  }),
  sliderProps: _react.PropTypes.shape({
    onClick: _react.PropTypes.func,
    onTouchStart: _react.PropTypes.func,
    onTouchMove: _react.PropTypes.func,
    onTouchEnd: _react.PropTypes.func,
    onTouchCancel: _react.PropTypes.func
  }),
  sliderStyle: _react.PropTypes.object,
  sliderWrapperProps: _react.PropTypes.object,
  sliderWrapperStyle: _react.PropTypes.object,
  style: _react.PropTypes.shape({
    width: _react.PropTypes.number
  }),
  value: _react.PropTypes.bool,
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.bool.isRequired,
    requestChange: _react.PropTypes.func.isRequired
  }),
  wrapperProps: _react.PropTypes.object
};

function sanitizeChildProps(properties) {
  return (0, _helpers.omit)(properties, Object.keys(togglePropTypes));
}

function sanitizeSliderProps(properties) {
  return (0, _helpers.omit)(properties, ['style', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel']);
}

function sanitizeSliderWrapperProps(properties) {
  return (0, _helpers.omit)(properties, ['ref', 'style']);
}

function sanitizeChoiceProps(properties) {
  return (0, _helpers.omit)(properties, ['ref', 'style']);
}

function sanitizeHandleProps(properties) {
  return (0, _helpers.omit)(properties, ['onMouseDown', 'onMouseMove', 'onMouseUp', 'onMouseLeave', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel', 'ref', 'style']);
}

/**
 * Update focus style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing custom styles
 */
function updatePseudoClassStyle(styleId, properties, preventFocusStyleForTouchAndClick) {
  var focusStyle = void 0;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    focusStyle = _extends({}, _toggle2.default.focusStyle, properties.focusStyle);
  }

  var styles = [{
    id: styleId,
    style: focusStyle,
    pseudoClass: 'focus'
  }];

  (0, _injectStyle.injectStyles)(styles);
}

/**
 * Toggle component
 */

var Toggle = function (_Component) {
  _inherits(Toggle, _Component);

  function Toggle(properties) {
    _classCallCheck(this, Toggle);

    var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, properties));

    _initialiseProps.call(_this);

    var value = void 0;
    if ((0, _helpers.has)(properties, 'valueLink')) {
      value = properties.valueLink.value;
    } else if ((0, _helpers.has)(properties, 'value')) {
      value = properties.value;
    } else if ((0, _helpers.has)(properties, 'defaultValue')) {
      value = properties.defaultValue;
    } else {
      value = false;
    }

    _this.state = {
      firstChoiceProps: sanitizeChoiceProps(properties.firstChoiceProps),
      childProps: sanitizeChildProps(properties),
      secondChoiceProps: sanitizeChoiceProps(properties.secondChoiceProps),
      handleProps: sanitizeHandleProps(properties.handleProps),
      isActive: false,
      isDraggingWithMouse: false,
      isDraggingWithTouch: false,
      sliderProps: sanitizeSliderProps(properties.sliderProps),
      sliderWrapperProps: sanitizeSliderWrapperProps(properties.sliderWrapperProps),
      value: value,
      wasFocusedWithClickOrTouch: false
    };

    _this._touchStartedAtSlider = false;
    _this._touchEndedNotInSlider = false;

    _this._preventTouchSwitch = false;

    _this._mouseDragStart = undefined;
    _this._mouseDragEnd = undefined;
    _this._preventMouseSwitch = false;

    // The isFocused attribute is used to apply the one-time focus animation.
    // As it is reset after every render it can't be set inside state as this
    // would trigger an endless loop.
    _this.isFocused = false;

    _this.preventFocusStyleForTouchAndClick = (0, _helpers.has)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _toggle4.default.preventFocusStyleForTouchAndClick;
    return _this;
  }

  _createClass(Toggle, [{
    key: 'componentWillMount',


    /**
     * Generates the style-id & inject the focus style.
     */
    value: function componentWillMount() {
      var id = (0, _helpers.uniqueId)();
      this.styleId = 'style-id' + id;
      updatePseudoClassStyle(this.styleId, this.props, this.preventFocusStyleForTouchAndClick);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {
        firstChoiceProps: sanitizeChoiceProps(properties.firstChoiceProps),
        childProps: sanitizeChildProps(properties),
        secondChoiceProps: sanitizeChoiceProps(properties.secondChoiceProps),
        handleProps: sanitizeHandleProps(properties.handleProps),
        sliderProps: sanitizeSliderProps(properties.sliderProps),
        sliderWrapperProps: sanitizeSliderWrapperProps(properties.sliderWrapperProps)
      };

      if ((0, _helpers.has)(properties, 'valueLink')) {
        newState.value = properties.valueLink.value;
      } else if ((0, _helpers.has)(properties, 'value')) {
        newState.value = properties.value;
      }

      this.setState(newState);

      this.preventFocusStyleForTouchAndClick = (0, _helpers.has)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _toggle4.default.preventFocusStyleForTouchAndClick;

      (0, _injectStyle.removeStyle)(this.styleId);
      updatePseudoClassStyle(this.styleId, properties, this.preventFocusStyleForTouchAndClick);
    }

    /**
     * Deactivate the focused attribute in order to make sure the focus animation
     * only runs once when the component is focused on & not after re-rendering
     * e.g when the user clicks on the toggle.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.isFocused = false;
    }

    /**
     * Remove a component's associated styles whenever it gets removed from the DOM.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeStyle)(this.styleId);
    }

    /**
     * Activate the focused attribute used to determine when to show the
     * one-time focus animation and trigger a render.
     */


    /**
     * Deactivate the focused attribute used to determine when to show the
     * one-time focus animation and trigger a render.
     */

  }, {
    key: '_onArrowLeftKeyDown',


    /**
     * Flip value in case it is false.
     */
    value: function _onArrowLeftKeyDown() {
      if (this.state.value === true) {
        this._triggerChange(false);
      }
    }

    /**
     * Flip value in case it is true.
     */

  }, {
    key: '_onArrowRightKeyDown',
    value: function _onArrowRightKeyDown() {
      if (this.state.value === false) {
        this._triggerChange(true);
      }
    }

    /**
     * Flip value and trigger change.
     */

  }, {
    key: '_onEnterOrSpaceKeyDown',
    value: function _onEnterOrSpaceKeyDown() {
      this._triggerChange(!this.state.value);
    }
  }, {
    key: '_getHandleHeight',
    value: function _getHandleHeight() {
      return (0, _helpers.has)(this.props.handleStyle, 'height') ? this.props.handleStyle.height : _toggle2.default.handleStyle.height;
    }
  }, {
    key: '_getHandleWidth',
    value: function _getHandleWidth() {
      return (0, _helpers.has)(this.props.handleStyle, 'width') ? this.props.handleStyle.width : _toggle2.default.handleStyle.width;
    }
  }, {
    key: '_getSliderOffset',
    value: function _getSliderOffset() {
      var firstChoiceWidth = (0, _helpers.has)(this.props.firstChoiceStyle, 'width') ? this.props.firstChoiceStyle.width : _toggle2.default.firstChoiceStyle.width;

      return firstChoiceWidth - this._getHandleWidth() / 2;
    }
  }, {
    key: '_getToggleWidth',
    value: function _getToggleWidth() {
      return (0, _helpers.has)(this.props.style, 'width') ? this.props.style.width : _toggle2.default.style.width;
    }
  }, {
    key: '_triggerChange',
    value: function _triggerChange(value) {
      if ((0, _helpers.has)(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(value);
        this.setState({
          isDraggingWithMouse: false,
          isDraggingWithTouch: false,
          isActive: false
        });
      } else if ((0, _helpers.has)(this.props, 'value')) {
        this.setState({
          isDraggingWithMouse: false,
          isDraggingWithTouch: false,
          isActive: false
        });
      } else {
        this.setState({
          value: value,
          isDraggingWithMouse: false,
          isDraggingWithTouch: false,
          isActive: false
        });
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({ value: value });
      }
    }
  }, {
    key: '_triggerUpdateComponentOnMouseMove',
    value: function _triggerUpdateComponentOnMouseMove(pageX) {
      var difference = pageX - this._mouseDragStart;

      if (this.state.value && this._mouseDragEnd && difference > this._mouseDragEnd) {
        this._preventMouseSwitch = true;
      } else if (!this.state.value && this._mouseDragEnd && difference < this._mouseDragEnd) {
        this._preventMouseSwitch = true;
      }

      this._mouseDragEnd = difference;

      if (difference < 0 || difference > this._getToggleWidth() - this._getHandleWidth()) return;

      this.setState({
        sliderOffset: difference
      });
    }
  }, {
    key: '_triggerUpdateComponentOnTouchMoveAtSlider',
    value: function _triggerUpdateComponentOnTouchMoveAtSlider(touch) {
      var touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
      var firstChoiceNode = _reactDom2.default.findDOMNode(this.refs.firstChoice);
      var secondChoiceNode = _reactDom2.default.findDOMNode(this.refs.secondChoice);

      this._touchEndedNotInSlider = touchedElement !== firstChoiceNode && touchedElement !== secondChoiceNode;
      if (this.state.isActive && this._touchEndedNotInSlider) {
        this.setState({ isActive: false });
      } else if (!this.state.isActive && !this._touchEndedNotInSlider) {
        this.setState({ isActive: true });
      }
    }
  }, {
    key: '_triggerUpdateComponentOnTouchMoveAtHandle',
    value: function _triggerUpdateComponentOnTouchMoveAtHandle(touch) {
      var sliderWrapperNode = _reactDom2.default.findDOMNode(this.refs.sliderWrapper);
      var rect = sliderWrapperNode.getBoundingClientRect();
      var difference = touch.pageX - this._touchDragStart;
      var horizontalTolerance = this._getHandleWidth() * 2;
      var verticalTolerance = this._getHandleHeight() * 2;

      // touch left the allowed handle drag area
      if (touch.clientX < rect.left - horizontalTolerance || touch.clientX > rect.right + horizontalTolerance || touch.clientY < rect.top - verticalTolerance || touch.clientY > rect.bottom + verticalTolerance) {
        if (this._preventTouchSwitch) {
          var value = difference > this._getHandleWidth() / 2;
          this._triggerChange(value);
        } else {
          this._triggerChange(!this.state.value);
        }
      } else if (this.state.isDraggingWithTouch) {
        // is still dragging
        if (this.state.value && this._touchDragEnd && difference > this._touchDragEnd) {
          this._preventTouchSwitch = true;
        } else if (!this.state.value && this._touchDragEnd && difference < this._touchDragEnd) {
          this._preventTouchSwitch = true;
        }

        if (difference < 0 || difference > this._getToggleWidth() - this._getHandleWidth()) return;

        this._touchDragEnd = difference;
        this.setState({
          sliderOffset: difference
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var wrapperStyle = _extends({}, _toggle2.default.style, this.props.style);

      if (this.isFocused && !this.state.wasFocusedWithClickOrTouch) {
        wrapperStyle = _extends({}, wrapperStyle, _toggle2.default.focusStyle, this.props.focusStyle);
      }

      var computedSliderStyle = void 0;
      var handleStyle = void 0;

      var sliderWrapperStyle = _extends({}, _toggle2.default.sliderWrapperStyle, this.props.sliderWrapperStyle);
      var defaultSliderOffset = this._getSliderOffset();

      if (this.state.isDraggingWithMouse || this.state.isDraggingWithTouch) {
        computedSliderStyle = _extends({}, _toggle2.default.sliderStyle, this.props.sliderStyle, {
          left: this.state.sliderOffset - defaultSliderOffset,
          transition: 'none'
        });

        // right now even when handle is clicked, it momentarily shows this grabbing styles
        // may be this.state.isDraggingWithMouse should be set to true only after mouse movement starts
        var activeStyle = _extends({}, _toggle2.default.activeHandleStyle, this.props.handleStyle);
        handleStyle = _extends({}, _toggle2.default.handleStyle, activeStyle, this.props.activeHandleStyle, {
          left: this.state.sliderOffset,
          transition: activeStyle.transition ? activeStyle.transition : 'none'
        });
      } else {
        handleStyle = _extends({}, _toggle2.default.handleStyle, this.props.handleStyle);
        computedSliderStyle = _extends({}, _toggle2.default.sliderStyle, {
          left: this.state.value ? 0 : -defaultSliderOffset
        });

        if (this.state.isActive) {
          handleStyle = _extends({}, handleStyle, _toggle2.default.activeHandleStyle, this.props.activeHandleStyle);
        } else if (this.state.isHovered) {
          handleStyle = _extends({}, handleStyle, _toggle2.default.hoverHandleStyle, this.props.hoverHandleStyle);
        }

        var position = {
          left: this.state.value ? defaultSliderOffset : 0
        };
        handleStyle = _extends({}, handleStyle, position);
      }

      var computedTrueChoice = (0, _helpers.first)(this.props.children) ? (0, _helpers.first)(this.props.children) : '✓';
      var computedFalseChoice = (0, _helpers.last)(this.props.children) ? (0, _helpers.last)(this.props.children) : '✘';

      var computedTrueChoiceStyle = _extends({}, _toggle2.default.firstChoiceStyle, this.props.firstChoiceStyle);
      var computedFalseChoiceStyle = _extends({}, _toggle2.default.secondChoiceStyle, this.props.secondChoiceStyle);

      var hasCustomTabIndex = this.props.wrapperProps && this.props.wrapperProps.tabIndex;
      var tabIndex = hasCustomTabIndex ? this.props.wrapperProps.tabIndex : '0';
      if (this.props.disabled) {
        tabIndex = -1;
        wrapperStyle = _extends({}, wrapperStyle, _toggle2.default.disabledStyle, this.props.disabledStyle);
        handleStyle = _extends({}, handleStyle, _toggle2.default.disabledHandleStyle, this.props.disabledHandleStyle);
      }

      var role = (0, _helpers.has)(this.state.childProps, 'role') ? this.state.childProps.role : 'checkbox';

      return _react2.default.createElement(
        'div',
        _extends({
          style: wrapperStyle,
          tabIndex: tabIndex,
          className: (0, _unionClassNames2.default)(this.props.className, this.styleId),
          onKeyDown: this._onKeyDown,
          onMouseDown: this._onMouseDownOnWrapper,
          onMouseUp: this._onMouseUpOnWrapper,
          onTouchStart: this._onTouchStartOnWrapper,
          onFocus: this._onFocus,
          onBlur: this._onBlur,
          onMouseEnter: this._onMouseEnterAtSliderWrapper,
          onMouseLeave: this._onMouseLeaveAtSliderWrapper,
          role: role,
          'aria-checked': this.state.value
        }, this.state.childProps),
        _react2.default.createElement(
          'div',
          _extends({
            style: sliderWrapperStyle,
            ref: 'sliderWrapper'
          }, this.state.sliderWrapperProps),
          _react2.default.createElement(
            'div',
            _extends({
              style: computedSliderStyle,
              onClick: this._onClickAtSlider,
              onTouchStart: this._onTouchStartAtSlider,
              onTouchMove: this._onTouchMoveAtSlider,
              onTouchEnd: this._onTouchEndAtSlider,
              onTouchCancel: this._onTouchCancelAtSlider
            }, this.state.sliderProps),
            _react2.default.createElement(
              'div',
              _extends({
                ref: 'firstChoice',
                style: computedTrueChoiceStyle
              }, this.state.firstChoiceProps),
              computedTrueChoice
            ),
            _react2.default.createElement(
              'div',
              _extends({
                ref: 'secondChoice',
                style: computedFalseChoiceStyle
              }, this.state.secondChoiceProps),
              computedFalseChoice
            )
          )
        ),
        _react2.default.createElement('div', _extends({
          ref: 'handle',
          style: handleStyle,
          onMouseDown: this._onMouseDownOnHandle,
          onMouseMove: this._onMouseMoveOnHandle,
          onMouseUp: this._onMouseUpOnHandle,
          onMouseLeave: this._onMouseLeaveOnHandle,
          onTouchStart: this._onTouchStartHandle,
          onTouchMove: this._onTouchMoveHandle,
          onTouchEnd: this._onTouchEndHandle,
          onTouchCancel: this._onTouchCancelHandle
        }, this.state.handleProps))
      );
    }
  }]);

  return Toggle;
}(_react.Component);

Toggle.displayName = 'Toggle';
Toggle.propTypes = togglePropTypes;
Toggle.defaultProps = {
  disabled: false
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._onFocus = function (event) {
    if (!_this2.props.disabled) {
      _this2.isFocused = true;
      _this2.forceUpdate();
    }

    if (_this2.props.onFocus) {
      _this2.props.onFocus(event);
    }
  };

  this._onBlur = function (event) {
    _this2.isFocused = false;
    _this2.setState({ wasFocusedWithClickOrTouch: false });

    if (_this2.props.onBlur) {
      _this2.props.onBlur(event);
    }
  };

  this._onMouseDownOnWrapper = function (event) {
    if (!_this2.props.disabled) {
      _this2.setState({ wasFocusedWithClickOrTouch: true, isActive: true });
    }

    if (_this2.props.onMouseDown) {
      _this2.props.onMouseDown(event);
    }
  };

  this._onMouseUpOnWrapper = function (event) {
    if (!_this2.props.disabled) {
      _this2.setState({ isActive: false });
    }

    if (_this2.props.onMouseUp) {
      _this2.props.onMouseUp(event);
    }
  };

  this._onTouchStartOnWrapper = function (event) {
    if (!_this2.props.disabled) {
      _this2.setState({ wasFocusedWithClickOrTouch: true });
    }

    if (_this2.props.onTouchStart) {
      _this2.props.onTouchStart(event);
    }
  };

  this._onClickAtSlider = function (event) {
    if (!_this2.props.disabled) {
      _this2._triggerChange(!_this2.state.value);
    }

    if (_this2.props.sliderProps && _this2.props.sliderProps.onClick) {
      _this2.props.sliderProps.onClick(event);
    }
  };

  this._onMouseDownOnHandle = function (event) {
    // check for left mouse button pressed
    if (event.button === 0 && !_this2.props.disabled) {
      var defaultSliderOffset = _this2._getSliderOffset();
      _this2._mouseDragStart = event.pageX - (_this2.state.value ? defaultSliderOffset : 0);
      _this2._preventMouseSwitch = false;

      _this2.setState({
        isDraggingWithMouse: true,
        sliderOffset: _this2.state.value ? defaultSliderOffset : 0
      });
    }

    if (_this2.props.handleProps && _this2.props.handleProps.onMouseDown) {
      _this2.props.handleProps.onMouseDown(event);
    }
  };

  this._onMouseMoveOnHandle = function (event) {
    if (_this2.state.isDraggingWithMouse && !_this2.props.disabled) {
      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      var animationFrame = _animationFrameManagement.requestAnimationFrame.call(window, _this2._triggerUpdateComponentOnMouseMove.bind(_this2, event.pageX));

      if (_this2.previousMouseMoveFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        _animationFrameManagement.cancelAnimationFrame.call(window, _this2.previousMouseMoveFrame);
      }

      _this2.previousMouseMoveFrame = animationFrame;
    }

    if (_this2.props.handleProps && _this2.props.handleProps.onMouseMove) {
      _this2.props.handleProps.onMouseMove(event);
    }
  };

  this._onMouseUpOnHandle = function (event) {
    if (!_this2.props.disabled) {
      if (_this2._mouseDragEnd) {
        if (!_this2._preventMouseSwitch) {
          _this2._triggerChange(!_this2.state.value);
        } else if (_this2._preventMouseSwitch) {
          var value = _this2._mouseDragEnd > _this2._getHandleWidth() / 2;
          _this2._triggerChange(value);
        }
      } else {
        _this2._triggerChange(!_this2.state.value);
      }
    }

    _this2._mouseDragStart = undefined;
    _this2._mouseDragEnd = undefined;
    _this2._preventMouseSwitch = false;

    if (_this2.props.handleProps && _this2.props.handleProps.onMouseUp) {
      _this2.props.handleProps.onMouseUp(event);
    }
  };

  this._onMouseLeaveOnHandle = function (event) {
    if (!_this2.props.disabled) {
      if (_this2._mouseDragStart && !_this2._preventMouseSwitch) {
        _this2._triggerChange(!_this2.state.value);
      } else if (_this2._mouseDragStart && _this2._preventMouseSwitch) {
        var value = _this2._mouseDragEnd > _this2._getHandleWidth() / 2;
        _this2._triggerChange(value);
      } else {
        _this2.setState({ isActive: false });
      }
    }

    _this2._mouseDragStart = undefined;
    _this2._mouseDragEnd = undefined;
    _this2._preventMouseSwitch = false;

    if (_this2.props.handleProps && _this2.props.handleProps.onMouseLeave) {
      _this2.props.handleProps.onMouseLeave(event);
    }
  };

  this._onTouchStartAtSlider = function (event) {
    if (event.touches.length === 1 && !_this2.props.disabled) {
      _this2._touchStartedAtSlider = true;
      _this2.setState({
        isActive: true
      });
    }

    if (_this2.props.sliderProps && _this2.props.sliderProps.onTouchStart) {
      _this2.props.sliderProps.onTouchStart(event);
    }
  };

  this._onTouchMoveAtSlider = function (event) {
    if (event.touches.length === 1 && _this2._touchStartedAtSlider && !_this2.props.disabled) {
      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      var animationFrame = _animationFrameManagement.requestAnimationFrame.call(window, _this2._triggerUpdateComponentOnTouchMoveAtSlider.bind(_this2, event.touches[0]));

      if (_this2.previousTouchMoveAtSliderFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        _animationFrameManagement.cancelAnimationFrame.call(window, _this2.previousTouchMoveAtSliderFrame);
      }

      _this2.previousTouchMoveAtSliderFrame = animationFrame;
    }

    if (_this2.props.sliderProps && _this2.props.sliderProps.onTouchMove) {
      _this2.props.sliderProps.onTouchMove(event);
    }
  };

  this._onTouchEndAtSlider = function (event) {
    // prevent the onClick to happen
    event.preventDefault();

    if (_this2._touchStartedAtSlider && !_this2._touchEndedNotInSlider && !_this2.props.disabled) {
      _this2.setState({
        isActive: false
      });
      _this2._triggerChange(!_this2.state.value);
    } else {
      _this2.setState({ isActive: false });
    }

    _this2._touchStartedAtSlider = false;
    _this2._touchEndedNotInSlider = false;

    if (_this2.props.sliderProps && _this2.props.sliderProps.onTouchEnd) {
      _this2.props.sliderProps.onTouchEnd(event);
    }
  };

  this._onTouchCancelAtSlider = function (event) {
    _this2.setState({ isActive: false });
    _this2._touchStartedAtSlider = false;
    _this2._touchEndedNotInSlider = false;

    if (_this2.props.sliderProps && _this2.props.sliderProps.onTouchCancel) {
      _this2.props.sliderProps.onTouchCancel(event);
    }
  };

  this._onTouchStartHandle = function (event) {
    event.preventDefault();

    // check for one touch as multiple could be browser gestures and only one
    // is relevant for us
    if (event.touches.length === 1 && !_this2.props.disabled) {
      _this2._preventTouchSwitch = false;

      var defaultSliderOffset = _this2._getSliderOffset();
      _this2.setState({
        isDraggingWithTouch: true,
        sliderOffset: _this2.state.value ? defaultSliderOffset : 0
      });

      _this2._touchDragStart = event.touches[0].pageX - (_this2.state.value ? defaultSliderOffset : 0);
    }

    if (_this2.props.handleProps && _this2.props.handleProps.onTouchStart) {
      _this2.props.handleProps.onTouchStart(event);
    }
  };

  this._onTouchMoveHandle = function (event) {
    if (event.touches.length === 1 && _this2.state.isDraggingWithTouch && !_this2.props.disabled) {
      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      var animationFrame = _animationFrameManagement.requestAnimationFrame.call(window, _this2._triggerUpdateComponentOnTouchMoveAtHandle.bind(_this2, event.touches[0]));

      if (_this2.previousTouchMoveAtHandleFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        _animationFrameManagement.cancelAnimationFrame.call(window, _this2.previousTouchMoveAtHandleFrame);
      }

      _this2.previousTouchMoveAtHandleFrame = animationFrame;
    }

    if (_this2.props.handleProps && _this2.props.handleProps.onTouchMove) {
      _this2.props.handleProps.onTouchMove(event);
    }
  };

  this._onTouchEndHandle = function (event) {
    // prevent the onClick to happen
    event.preventDefault();

    if (_this2.state.isDraggingWithTouch && !_this2.props.disabled) {
      // no click & move was involved
      if (_this2._touchDragEnd) {
        if (_this2._preventTouchSwitch) {
          var value = _this2._touchDragEnd > _this2._getHandleWidth() / 2;
          _this2._triggerChange(value);
        } else {
          _this2._triggerChange(!_this2.state.value);
        }
      } else {
        // click like
        _this2._triggerChange(!_this2.state.value);
      }
    } else {
      _this2.setState({
        isActive: false,
        isDraggingWithTouch: false
      });
    }

    _this2._touchDragStart = undefined;
    _this2._touchDragEnd = undefined;
    _this2._preventTouchSwitch = false;

    if (_this2.props.handleProps && _this2.props.handleProps.onTouchEnd) {
      _this2.props.handleProps.onTouchEnd(event);
    }
  };

  this._onTouchCancelHandle = function (event) {
    _this2.setState({
      isDraggingWithTouch: false
    });
    _this2._touchDragStart = undefined;
    _this2._touchDragEnd = undefined;
    _this2._preventTouchSwitch = false;

    if (_this2.props.handleProps && _this2.props.handleProps.onTouchCancel) {
      _this2.props.handleProps.onTouchCancel(event);
    }
  };

  this._onKeyDown = function (event) {
    if (!_this2.props.disabled) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        _this2._onArrowLeftKeyDown();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        _this2._onArrowRightKeyDown();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        _this2._onEnterOrSpaceKeyDown();
      }
    }

    if (_this2.props.onKeyDown) {
      _this2.props.onKeyDown(event);
    }
  };

  this._onMouseEnterAtSliderWrapper = function () {
    _this2.setState({
      isHovered: true
    });
    if (_this2.props.onMouseEnter) {
      _this2.props.onMouseEnter(event);
    }
  };

  this._onMouseLeaveAtSliderWrapper = function () {
    _this2.setState({
      isHovered: false,
      isActive: false
    });
    if (_this2.props.onMouseLeave) {
      _this2.props.onMouseLeave(event);
    }
  };
};

exports.default = Toggle;