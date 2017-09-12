'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _injectStyle = require('../utils/inject-style');

var _unionClassNames = require('../utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _helpers = require('../utils/helpers');

var _comboBox = require('../style/combo-box');

var _comboBox2 = _interopRequireDefault(_comboBox);

var _ComboBoxItem = require('../components/ComboBoxItem');

var _ComboBoxItem2 = _interopRequireDefault(_ComboBoxItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var comboBoxPropTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
  defaultValue: _react.PropTypes.string,
  value: _react.PropTypes.string,
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.string,
    requestChange: _react.PropTypes.func.isRequired
  }),
  placeholder: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  wrapperProps: _react.PropTypes.object,
  menuProps: _react.PropTypes.object,
  caretProps: _react.PropTypes.object,
  onUpdate: _react.PropTypes.func,
  onInputMatch: _react.PropTypes.func,
  tabIndex: _react.PropTypes.number,
  onKeyDown: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  className: _react.PropTypes.string,
  caretClassName: _react.PropTypes.string,
  style: _react.PropTypes.object,
  wrapperStyle: _react.PropTypes.object,
  hintStyle: _react.PropTypes.object,
  menuStyle: _react.PropTypes.object,
  focusStyle: _react.PropTypes.object,
  disabledStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  caretToOpenStyle: _react.PropTypes.object,
  caretToCloseStyle: _react.PropTypes.object,
  disabledCaretToOpenStyle: _react.PropTypes.object,
  maxOptions: _react.PropTypes.number,
  displayCaret: _react.PropTypes.bool,
  enableHint: _react.PropTypes.bool,
  filterFunc: _react.PropTypes.func,
  'aria-label': _react.PropTypes.string
};

/**
 * Update hover style for the specified styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param caretStyleId {string} - unique is assigned as class to caret span
 * @param properties {object} - the components properties optionally containing hoverStyle
 */
function updatePseudoClassStyle(styleId, caretStyleId, properties) {
  var hoverStyle = _extends({}, _comboBox2.default.hoverStyle, properties.hoverStyle);
  var focusStyle = _extends({}, _comboBox2.default.focusStyle, properties.focusStyle);
  var disabledHoverStyle = _extends({}, _comboBox2.default.disabledHoverStyle, properties.disabledHoverStyle);
  var caretFocusStyle = _extends({}, _comboBox2.default.caretFocusStyle);

  var styles = [{
    id: styleId,
    style: hoverStyle,
    pseudoClass: 'hover'
  }, {
    id: styleId,
    style: disabledHoverStyle,
    pseudoClass: 'hover',
    disabled: true
  }, {
    id: styleId,
    style: focusStyle,
    pseudoClass: 'focus'
  }, {
    id: caretStyleId,
    style: caretFocusStyle,
    pseudoClass: 'focus'
  }];
  (0, _injectStyle.injectStyles)(styles);
}

/**
 * Returns an object with properties that are relevant for the wrapper div.
 */
function sanitizeWrapperProps(properties) {
  return (0, _helpers.omit)(properties, ['style', 'aria-label', 'aria-disabled']);
}

/**
 * Returns an object with properties that are relevant for the input box.
 */
function sanitizeInputProps(properties) {
  return (0, _helpers.omit)(properties, Object.keys(comboBoxPropTypes));
}

/**
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeCaretProps(properties) {
  return (0, _helpers.omit)(properties, ['style', 'className', 'onClick', 'tabIndex']);
}

/**
 * Returns an object with properties that are relevant for the combo-box menu.
 */
function sanitizeMenuProps(properties) {
  return (0, _helpers.omit)(properties, ['style', 'ref', 'role']);
}

/**
 * Default function used for filtering options.
 */
function filterFunc(inputValue, optionValue) {
  if (inputValue && optionValue) {
    return optionValue.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  }

  return false;
}

/**
 * ComboBox React Component.
 */

var ComboBox = function (_Component) {
  _inherits(ComboBox, _Component);

  function ComboBox(properties) {
    _classCallCheck(this, ComboBox);

    var _this = _possibleConstructorReturn(this, (ComboBox.__proto__ || Object.getPrototypeOf(ComboBox)).call(this, properties));

    _this._onTouchStartAtOption = function (event, index) {
      if (!_this.props.disabled && event.touches.length === 1) {
        _this._touchStartedAt = index;
        _this.setState({ focusedOptionIndex: index });
      }
    };

    _this._onTouchEndAtOption = function (event, index) {
      if (!_this.props.disabled && _this._touchStartedAt) {
        if (_this._touchStartedAt === index) {
          event.preventDefault();
          _this._triggerChange(_this._getValueForIndex(index));
        }

        _this._touchStartedAt = undefined;
      }
    };

    _this._onTouchCancelAtOption = function () {
      if (!_this.props.disabled) {
        _this._touchStartedAt = undefined;
        _this.setState({ focusedOptionIndex: undefined });
      }
    };

    _this._onBlur = function (event) {
      if (!_this.props.disabled) {
        _this.setState({
          isOpen: false,
          focusedOptionIndex: undefined
        });
      }

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    };

    _this._onFocus = function (event) {
      if (!_this.props.disabled) {
        _this.setState({
          isOpen: true
        });
      }

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    };

    _this._onCaretClick = function () {
      if (!_this.props.disabled) {
        var isOpen = !_this.state.isOpen;
        _this.setState({
          isOpen: isOpen
        });
      }
    };

    _this._onMouseEnterAtOption = function (index) {
      if (!_this.props.disabled) {
        _this.setState({
          focusedOptionIndex: index
        });
      }
    };

    _this._onMouseLeaveAtOption = function () {
      if (!_this.props.disabled) {
        _this.setState({
          focusedOptionIndex: undefined
        });
      }
    };

    _this._onClickAtOption = function (index) {
      if (!_this.props.disabled) {
        _this._triggerChange(_this._getValueForIndex(index));
      }
    };

    _this._onKeyDown = function (event) {
      if (!_this.props.disabled) {
        if (!_this.state.isOpen) {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            _this.setState({
              isOpen: true
            });
          }
        } else {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            _this._onArrowDownKeyDown();
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            _this._onArrowUpKeyDown();
          } else if (event.key === 'ArrowRight') {
            if (_this.props.enableHint) {
              event.preventDefault();
              var hint = _this._getHint();
              if (hint) {
                _this._userUpdateValue(hint);
              }
            }
          } else if (event.key === 'Enter') {
            event.preventDefault();
            _this._onEnterOrTabKeyDown();
          } else if (event.key === 'Tab') {
            // event.preventDefault(); should not be called here else tab
            // will not be able to take user to next component on the page
            _this._onEnterOrTabKeyDown();
          } else if (event.key === 'Escape') {
            event.preventDefault();
            _this.setState({
              isOpen: false,
              focusedOptionIndex: undefined
            });
          }
        }
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(event);
      }
    };

    _this._onArrowDownKeyDown = function () {
      var index = 0;
      if (_this.state.focusedOptionIndex !== undefined && _this.state.focusedOptionIndex + 1 < _this.filteredOptions.length) {
        index = _this.state.focusedOptionIndex + 1;
      }

      _this.setState({
        focusedOptionIndex: index
      });
    };

    _this._onChange = function (event) {
      var value = event.target.value;
      _this._userUpdateValue(value);
    };

    var inputValue = void 0;

    if ((0, _helpers.has)(properties, 'valueLink')) {
      inputValue = properties.valueLink.value;
    } else if ((0, _helpers.has)(properties, 'value')) {
      inputValue = properties.value;
    } else if ((0, _helpers.has)(properties, 'defaultValue')) {
      inputValue = properties.defaultValue;
    }

    _this.state = {
      isOpen: false,
      focusedOptionIndex: undefined,
      inputValue: inputValue || '',
      wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
      inputProps: sanitizeInputProps(properties),
      caretProps: sanitizeCaretProps(properties.caretProps),
      menuProps: sanitizeMenuProps(properties.menuProps)
    };

    _this.filteredOptions = ComboBox.filterOptions(inputValue, properties);
    return _this;
  }

  _createClass(ComboBox, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var value = void 0;
      if (typeof this.state.focusedOptionIndex !== 'undefined') {
        value = this.filteredOptions[this.state.focusedOptionIndex].props.value;
      }

      return {
        isDisabled: this.props.disabled,
        isHoveredValue: value
      };
    }

    /**
     * This method will calculate the hint that should be present in comboBox at some point in time. Rules:
     * 1. If menu is not open hint is undefined
     * 2. If menu is open but there are no filteredOptions hint is undefined
     * 3. If if some option is highlighted hint is equal to its value
     * 4. If no option is highlighted but some value is present in input box hint is equal to value of first filteredOptions
     * If user has typed some text in input box and there is a hint(according to above calculations), the starting of hint
     * is replaced by the text input by user ( this is to make sure that case of letters in hint is same as that in input box
     * value and overlap is perfect.)
     * todo: simplify logic in method below
     */

  }, {
    key: '_getHint',
    value: function _getHint() {
      if (this.state.isOpen) {
        var filteredOptions = this.filteredOptions;
        if (filteredOptions && filteredOptions.length > 0) {
          var hint = void 0;
          var focusedOptionIndex = this.state.focusedOptionIndex;
          var inputValue = this.state.inputValue;
          if (focusedOptionIndex >= 0) {
            hint = filteredOptions[focusedOptionIndex].props.value;
          } else if (inputValue && inputValue.length > 0) {
            hint = filteredOptions[0].props.value;
          }

          if (hint) {
            if (inputValue && inputValue.length > 0) {
              var position = hint.toLowerCase().indexOf(inputValue.toLowerCase());
              if (position === 0) {
                return inputValue + hint.substr(inputValue.length, hint.length - inputValue.length);
              } else if (position === -1) {
                return hint;
              }
            } else {
              return hint;
            }
          }
        }
      }

      return undefined;
    }

    /**
     * Generates the style-id & inject the focus & hover style.
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var id = (0, _helpers.uniqueId)();
      this._styleId = 'style-id' + id;
      this._caretStyleId = 'caretStyle-id' + id;
      updatePseudoClassStyle(this._styleId, this._caretStyleId, this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {
        wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
        inputProps: sanitizeInputProps(properties),
        caretProps: sanitizeCaretProps(properties.caretProps),
        menuProps: sanitizeMenuProps(properties.menuProps)
      };

      if ((0, _helpers.has)(properties, 'valueLink')) {
        newState.inputValue = properties.valueLink.value || '';
      } else if ((0, _helpers.has)(properties, 'value')) {
        newState.inputValue = properties.value || '';
      }

      if (newState.inputValue) {
        newState.filteredOptions = ComboBox.filterOptions(newState.inputValue, properties);
      }

      this.setState(newState);

      (0, _injectStyle.removeAllStyles)([this._styleId, this._caretStyleId]);
      updatePseudoClassStyle(this._styleId, this._caretStyleId, properties);
    }

    /**
     * Remove a component's associated styles whenever it gets removed from the DOM.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeAllStyles)([this._styleId, this._caretStyleId]);
    }

    /**
     * Update focusedOptionIndex when an option is touched.
     */


    /**
     * Triggers a change event after the user touched on an Option.
     */


    /**
     * Update focusedOptionIndex to undefined on touch cancel.
     */


    /**
     * Closed opened combo-box options and removed focusStyles on blur.
     */


    /**
     * Set focused state when element is focused.
     */


    /**
     * Open/ Close menu when create is clicked.
     */


    /**
     * Update focusedOptionIndex for component when mouse enters an option.
     */


    /**
     * Set focusedOptionIndex to undefined.
     */


    /**
     * Update component value when an option is clicked.
     */


    /**
     * Handle keyDown in input (when input is focused):
     * 1. ComboBox is closed and ArrowDown/ ArrowUp is pressed -> open the ComboBox
     * 2. ComboBox is opened and ArrowDown is pressed -> highlight next option
     * 3. ComboBox is opened and ArrowUp is pressed -> highlight previous option
     * 4. ComboBox is opened and ArrowRight is pressed -> value of hint is copied over to inputBox
     * 5. ComboBox is opened and Enter/ Tab is pressed -> update input value to value of option
     * 6. ComboBox is opened and Esc is pressed -> close ComboBox
     */


    /**
     * Highlight next option when arrowDown key is pressed.
     * Highlight first option if currently last option is focused.
     */

  }, {
    key: '_onArrowUpKeyDown',


    /**
     * Highlight previous option when arrowUp key is pressed.
     * Highlight last option if currently first option is focused.
     */
    value: function _onArrowUpKeyDown() {
      if (this.filteredOptions.length > 0) {
        var index = this.filteredOptions.length - 1;
        if (this.state.focusedOptionIndex) {
          index = this.state.focusedOptionIndex - 1;
        }

        this.setState({
          focusedOptionIndex: index
        });
      }
    }

    /**
     * Update value of Input box to the value of highlighted option.
     */

  }, {
    key: '_onEnterOrTabKeyDown',
    value: function _onEnterOrTabKeyDown() {
      if (this.state.focusedOptionIndex >= 0) {
        this._triggerChange(this.filteredOptions[this.state.focusedOptionIndex].props.value);
      }
    }

    /**
     * The function will return options (if any) who's value is same as value of the combo-box input.
     */

  }, {
    key: '_findMatch',
    value: function _findMatch(value) {
      return (0, _helpers.find)(this.filteredOptions, function (entry) {
        return entry.props.value === value;
      });
    }

    /**
     * The function is called when user selects an option. Function will do following:
     * 1. Close the options
     * 2. Change value of input depending on whether its has value, defaultValue or valueLink property
     * 3. Call onUpdate props function
     */

  }, {
    key: '_triggerChange',
    value: function _triggerChange(value) {
      if ((0, _helpers.has)(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(value);
        this.setState({
          isOpen: false,
          focusedOptionIndex: undefined
        });
      } else if ((0, _helpers.has)(this.props, 'value')) {
        this.setState({
          isOpen: false,
          focusedOptionIndex: undefined
        });
      } else {
        this.setState({
          inputValue: value,
          isOpen: false,
          focusedOptionIndex: undefined
        });
        this.filteredOptions = ComboBox.filterOptions(value, this.props);
      }

      var obj = { value: value, isOptionSelection: true, isMatchingOption: true };
      var matchedOption = this._findMatch(value);
      obj.identifier = matchedOption ? matchedOption.props.identifier : undefined;

      if (this.props.onUpdate) {
        this.props.onUpdate(obj);
      }
    }

    /**
     * The function is called when user type/ paste value in the input box.
     */

  }, {
    key: '_getValueForIndex',


    /**
     * Returns the value of the child with a certain index.
     */
    value: function _getValueForIndex(index) {
      return this.filteredOptions[index].props.value;
    }

    /**
     * The function is called when user inputs a value in the input box. This can be done by:
     * 1. typing/ pasting value into input box
     * 2. pressing arrowRight key when there is some hint in the input box
     *
     * Function will do following:
     * 1. Open the options
     * 2. Change value of input depending on whether its has value, defaultValue or valueLink property
     * 3. Call onUpdate props function
     */

  }, {
    key: '_userUpdateValue',
    value: function _userUpdateValue(value) {
      if ((0, _helpers.has)(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(value);
        this.setState({
          isOpen: true,
          focusedOptionIndex: undefined
        });
      } else if ((0, _helpers.has)(this.props, 'value')) {
        this.setState({
          isOpen: true,
          focusedOptionIndex: undefined
        });
      } else {
        this.setState({
          inputValue: value,
          isOpen: true,
          focusedOptionIndex: undefined
        });
        this.filteredOptions = ComboBox.filterOptions(value, this.props);
      }

      var obj = { value: value, isOptionSelection: false, isMatchingOption: false };

      var matchedOption = this._findMatch(value);
      if (matchedOption) {
        obj.identifier = matchedOption.props.identifier;
        obj.isMatchingOption = true;
      }

      if (this.props.onUpdate) {
        this.props.onUpdate(obj);
      }
    }

    /**
     * Function to filter options using input value.
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var inputStyle = _extends({}, _comboBox2.default.style, this.props.style);
      var hintStyle = _extends({}, _comboBox2.default.hintStyle, this.props.hintStyle);
      var wrapperStyle = _extends({}, _comboBox2.default.wrapperStyle, this.props.wrapperStyle);
      var menuStyle = _extends({}, _comboBox2.default.menuStyle, this.props.menuStyle);

      var hint = this.props.enableHint ? this._getHint() : undefined;
      var placeHolder = !hint ? this.props.placeholder : undefined;
      var inputClassName = (0, _unionClassNames2.default)(this.props.className, this._styleId);
      var tabIndex = this.props.tabIndex ? this.props.tabIndex : '0';

      if (this.props.disabled) {
        inputStyle = _extends({}, inputStyle, _comboBox2.default.disabledStyle, this.props.disabledStyle);
      }

      // todo: Currently there are no different hover styles for caret, like select they are probably not really needed.
      var caretStyle = void 0;
      if (this.props.displayCaret) {
        if (this.props.disabled) {
          caretStyle = _extends({}, _comboBox2.default.caretToOpenStyle, this.props.caretToOpenStyle, _comboBox2.default.disabledCaretToOpenStyle, this.props.disabledCaretToOpenStyle);
        } else if (this.state.isOpen) {
          caretStyle = _extends({}, _comboBox2.default.caretToCloseStyle, this.props.caretToCloseStyle);
        } else {
          caretStyle = _extends({}, _comboBox2.default.caretToOpenStyle, this.props.caretToOpenStyle);
        }
      }

      var computedMenuStyle = this.state.isOpen && !this.props.disabled && this.filteredOptions && this.filteredOptions.length > 0 ? menuStyle : { display: 'none' };

      // using value for input makes it a controlled component and it will be changed in controlled manner if (1) user enters value, (2) user selects some option
      // value will be updated depending on whether user has passed value / valueLink / defaultValue as property
      return _react2.default.createElement(
        'div',
        _extends({
          style: wrapperStyle,
          'aria-label': this.props['aria-label'],
          'aria-disabled': this.props.disabled
        }, this.state.wrapperProps),
        _react2.default.createElement('input', {
          style: hintStyle,
          value: hint,
          tabIndex: -1,
          key: 'style-hint',
          readOnly: true
        }),
        _react2.default.createElement('input', _extends({
          disabled: this.props.disabled,
          'aria-disabled': this.props.disabled,
          value: this.state.inputValue,
          placeholder: placeHolder,
          style: inputStyle,
          className: inputClassName,
          onChange: this._onChange,
          tabIndex: tabIndex,
          onBlur: this._onBlur,
          onFocus: this._onFocus,
          onKeyDown: this._onKeyDown,
          'aria-autocomplete': 'list',
          key: 'combo-input'
        }, this.state.inputProps)),
        _react2.default.createElement('span', _extends({
          style: caretStyle,
          className: this._caretStyleId,
          onClick: this._onCaretClick,
          tabIndex: -1
        }, this.state.caretProps)),
        _react2.default.createElement(
          'ul',
          _extends({
            style: computedMenuStyle,
            role: 'listbox',
            'aria-expanded': this.state.isOpen
          }, this.state.menuProps),
          _react2.default.Children.map(this.filteredOptions, function (entry, index) {
            return _react2.default.createElement(
              _ComboBoxItem2.default,
              {
                key: index,
                index: index,
                onItemTouchStart: _this2._onTouchStartAtOption,
                onItemTouchEnd: _this2._onTouchEndAtOption,
                onItemTouchCancel: _this2._onTouchCancelAtOption,
                onItemClick: _this2._onClickAtOption,
                onItemMouseEnter: _this2._onMouseEnterAtOption,
                onItemMouseLeave: _this2._onMouseLeaveAtOption
              },
              entry
            );
          })
        )
      );
    }
  }], [{
    key: 'filterOptions',
    value: function filterOptions(inputValue, properties) {
      /* eslint react/sort-comp:0*/
      var filteredOptions = [];
      if (!(0, _helpers.isEmpty)(properties.children)) {
        if (inputValue) {
          filteredOptions = (0, _helpers.filterReactChildren)(properties.children, function (entry) {
            return properties.filterFunc(inputValue, entry.props.value);
          });
        } else {
          filteredOptions = (0, _helpers.getArrayForReactChildren)(properties.children, function (entry) {
            return entry;
          });
        }

        if (properties.maxOptions) {
          filteredOptions = filteredOptions.splice(0, properties.maxOptions);
        }
      }

      return filteredOptions;
    }
  }]);

  return ComboBox;
}(_react.Component);

ComboBox.displayName = 'ComboBox';
ComboBox.propTypes = comboBoxPropTypes;
ComboBox.childContextTypes = {
  isDisabled: _react.PropTypes.bool.isRequired,
  isHoveredValue: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number])
};
ComboBox.defaultProps = {
  disabled: false,
  displayCaret: false,
  enableHint: false,
  'aria-label': 'ComboBox',
  filterFunc: filterFunc, // TODO rename to filterFunction in 4.0.0
  tabIndex: 0,
  children: []
};
exports.default = ComboBox;