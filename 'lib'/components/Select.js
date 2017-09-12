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

var _helpers = require('../utils/helpers');

var _exenv = require('exenv');

var _unionClassNames = require('../utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _injectStyle = require('../utils/inject-style');

var _select = require('../style/select');

var _select2 = _interopRequireDefault(_select);

var _select3 = require('../config/select');

var _select4 = _interopRequireDefault(_select3);

var _isComponentOfType = require('../utils/is-component-of-type');

var _isComponentOfType2 = _interopRequireDefault(_isComponentOfType);

var _Option = require('../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _Placeholder = require('../components/Placeholder');

var _Placeholder2 = _interopRequireDefault(_Placeholder);

var _Separator = require('../components/Separator');

var _Separator2 = _interopRequireDefault(_Separator);

var _SelectItem = require('../components/SelectItem');

var _SelectItem2 = _interopRequireDefault(_SelectItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Returns true if the provided property is a Placeholder component from Belle.
 */
function isPlaceholder(reactElement) {
  return (0, _isComponentOfType2.default)(_Placeholder2.default, reactElement);
}

/**
 * Returns true if the provided property is a Option component from Belle.
 */
function isOption(reactElement) {
  return (0, _isComponentOfType2.default)(_Option2.default, reactElement);
}

/**
 * Returns true if the provided property is a Separator component from Belle.
 */
function isSeparator(reactElement) {
  return (0, _isComponentOfType2.default)(_Separator2.default, reactElement);
}

/**
 * Verifies that the children is an array containing only Options & at maximum
 * one Placeholder.
 */
function validateChildrenAreOptionsAndMaximumOnePlaceholder(props, propName, componentName) {
  var validChildren = (0, _helpers.filterReactChildren)(props[propName], function (node) {
    return isOption(node) || isSeparator(node) || isPlaceholder(node);
  });
  if (_react2.default.Children.count(props[propName]) !== _react2.default.Children.count(validChildren)) {
    return new Error('Invalid children supplied to `' + componentName + '`, expected an Option, Separator or Placeholder component from Belle.');
  }

  var placeholders = (0, _helpers.filterReactChildren)(props[propName], function (node) {
    return isPlaceholder(node);
  });
  if (_react2.default.Children.count(placeholders) > 1) {
    return new Error('Invalid children supplied to `' + componentName + '`, expected only one Placeholder component.');
  }

  return undefined;
}

var selectPropTypes = {
  children: validateChildrenAreOptionsAndMaximumOnePlaceholder,
  value: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.instanceOf(Date)]),
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number]),
  onUpdate: _react.PropTypes.func,
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.string.isRequired,
    requestChange: _react.PropTypes.func.isRequired
  }),
  className: _react.PropTypes.string,
  shouldPositionOptions: _react.PropTypes.bool,
  positionOptions: _react.PropTypes.func,
  style: _react.PropTypes.object,
  focusStyle: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  activeStyle: _react.PropTypes.object,
  wrapperStyle: _react.PropTypes.object,
  menuStyle: _react.PropTypes.object,
  caretToOpenStyle: _react.PropTypes.object,
  caretToCloseStyle: _react.PropTypes.object,
  wrapperProps: _react.PropTypes.object,
  menuProps: _react.PropTypes.object,
  caretProps: _react.PropTypes.object,
  disabled: _react.PropTypes.bool,
  disabledStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,
  disabledCaretToOpenStyle: _react.PropTypes.object,
  id: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  onTouchCancel: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func
};

/**
 * Update hover style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing hoverStyle
 */
function updatePseudoClassStyle(styleId, properties) {
  var hoverStyle = _extends({}, _select2.default.hoverStyle, properties.hoverStyle);
  var disabledHoverStyle = _extends({}, _select2.default.disabledHoverStyle, properties.disabledHoverStyle);

  var styles = [{
    id: styleId,
    style: hoverStyle,
    pseudoClass: 'hover'
  }, {
    id: styleId,
    style: disabledHoverStyle,
    pseudoClass: 'hover',
    disabled: true
  }];
  (0, _injectStyle.injectStyles)(styles);
}

/**
 * Returns true in case there one more element in the list.
 */
var hasNext = function hasNext(list, currentIndex) {
  return currentIndex + 2 <= list.length;
};

/**
 * Returns true in case there is one previous element in the list.
 */
var hasPrevious = function hasPrevious(list, currentIndex) {
  return currentIndex - 1 >= 0;
};

/**
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeSelectedOptionWrapperProps(properties) {
  return (0, _helpers.omit)(properties, Object.keys(selectPropTypes));
}

/**
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeWrapperProps(properties) {
  return (0, _helpers.omit)(properties, ['style', 'ref', 'tabIndex', 'onKeyDown', 'onBlur', 'onFocus']);
}

/**
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeMenuProps(properties) {
  return (0, _helpers.omit)(properties, ['style', 'ref', 'aria-labelledby', 'role']);
}

/**
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeCaretProps(properties) {
  return (0, _helpers.omit)(properties, ['style', 'ref']);
}

/**
 * Select component.
 *
 * In its simplest form the select component behaves almost identical to the
 * native HTML select which the exception that it comes with beautiful styles.
 *
 * Example:
 *
 *     <Select defaultValue="rome">
 *       <Option value="vienna">Vienna</Option>
 *       <Option value="rome">Rome</Option>
 *     </Select>
 *
 * For more advanced examples please see:
 * nikgraf.github.io/belle/#/component/select
 *
 * This component was inpired by:
 * - Jet Watson: https://github.com/JedWatson/react-select
 * - Instructure React Team: https://github.com/instructure-react/react-select-box
 */

var Select = function (_Component) {
  _inherits(Select, _Component);

  /*
   * Initialize the component based on the provided properties.
   *
   * By default the Select is closed & the focused option in case the user opens
   * it will be the selected option.
   */
  function Select(properties) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, properties));

    _this._onTouchStartAtOption = function (event, index) {
      if (event.touches.length === 1) {
        _this._touchStartedAt = _this._getValueForIndex(index);

        // save the scroll position
        var menuNode = _reactDom2.default.findDOMNode(_this.refs.menu);
        if (menuNode.scrollHeight > menuNode.offsetHeight) {
          _this._scrollTopPosition = menuNode.scrollTop;

          // Note: don't use setState in here as it would prevent the scrolling
        } else {
          _this._scrollTopPosition = 0;
          _this.setState({ focusedOptionValue: _this._touchStartedAt });
        }

        // reset interaction
        _this._scrollActive = false;
      }
    };

    _this._onTouchMoveAtOption = function () {
      var menuNode = _reactDom2.default.findDOMNode(_this.refs.menu);
      if (menuNode.scrollTop !== _this._scrollTopPosition) {
        _this._scrollActive = true;
      }
    };

    _this._onTouchEndAtOption = function (event, index) {
      if (_this._touchStartedAt && !_this._scrollActive) {
        var value = _this._getValueForIndex(index);
        if (_this._touchStartedAt === value) {
          event.preventDefault();
          _this._triggerChange(value);
        }
      }

      _this._touchStartedAt = undefined;
    };

    _this._onTouchCancelAtOption = function () {
      _this._touchStartedAt = undefined;
    };

    _this._onClickAtOption = function (index) {
      _this._triggerChange(_this._getValueForIndex(index));
    };

    _this._onBlur = function (event) {
      _this.setState({
        isOpen: false,
        isFocused: false
      });

      if (_this.props.wrapperProps && _this.props.wrapperProps.onBlur) {
        _this.props.wrapperProps.onBlur(event);
      }
    };

    _this._onFocus = function (event) {
      _this.setState({
        isFocused: true
      });

      if (_this.props.wrapperProps && _this.props.wrapperProps.onFocus) {
        _this.props.wrapperProps.onFocus(event);
      }
    };

    _this._onMouseEnterAtOption = function (index) {
      _this.setState({
        focusedOptionValue: _this._getValueForIndex(index)
      });
    };

    _this._onTouchStartToggleMenu = function (event) {
      if (event.touches.length === 1) {
        _this.setState({ isTouchedToToggle: true, isActive: true });
      } else {
        _this.setState({ isTouchedToToggle: false });
      }

      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(event);
      }
    };

    _this._onTouchEndToggleMenu = function (event) {
      // In case touch events are used preventDefault is applied to avoid
      // triggering the click event which would cause trouble for toggling.
      // In any case calling setState triggers a render. This leads to the fact
      // that the click event won't be triggered anyways. Nik assumes it's due the
      // element won't be in the DOM anymore.
      // This also means the Select's onClick won't be triggered for touchDevices.
      event.preventDefault();

      /* To avoid weird behaviour we check before focusing again - no specific use-case found */
      var wrapperNode = _reactDom2.default.findDOMNode(_this.refs.wrapper);
      if (document.activeElement !== wrapperNode) {
        wrapperNode.focus();
      }

      if (_this.state.isTouchedToToggle) {
        if (_this.state.isOpen) {
          _this.setState({ isOpen: false });
        } else {
          _this.setState({ isOpen: true });
        }
      }

      _this.setState({ isTouchedToToggle: false, isActive: false });

      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(event);
      }
    };

    _this._onTouchCancelToggleMenu = function (event) {
      _this.setState({ isTouchedToToggle: false, isActive: false });

      if (_this.props.onTouchCancel) {
        _this.props.onTouchCancel(event);
      }
    };

    _this._onMouseDown = function (event) {
      _this.setState({ isActive: true });

      if (_this.props.onMouseDown) {
        _this.props.onMouseDown(event);
      }
    };

    _this._onMouseUp = function (event) {
      _this.setState({ isActive: false });

      if (_this.props.onMouseUp) {
        _this.props.onMouseUp(event);
      }
    };

    _this._onMouseUpOnDocument = function () {
      _this.setState({ isActive: false });
    };

    _this._onContextMenu = function () {
      _this.setState({ isActive: false });
    };

    _this._onArrowDownKeyDown = function () {
      if (_this.state.focusedOptionValue !== void 0) {
        var indexOfFocusedOption = _this._getIndexOfFocusedOption();

        if (hasNext(_this.options, indexOfFocusedOption)) {
          _this.setState({
            focusedOptionValue: _this.options[indexOfFocusedOption + 1].props.value
          });
        }
      } else {
        _this.setState({
          focusedOptionValue: (0, _helpers.first)(_this.options).props.value
        });
      }
    };

    _this._onArrowUpKeyDown = function () {
      if (_this.state.focusedOptionValue !== void 0) {
        var indexOfFocusedOption = _this._getIndexOfFocusedOption();

        if (hasPrevious(_this.options, indexOfFocusedOption)) {
          _this.setState({
            focusedOptionValue: _this.options[indexOfFocusedOption - 1].props.value
          });
        }
      } else {
        _this.setState({
          focusedOptionValue: (0, _helpers.last)(_this.options).props.value
        });
      }
    };

    _this._onEnterOrSpaceKeyDown = function () {
      _this._triggerChange(_this.state.focusedOptionValue);
    };

    _this._onKeyDown = function (event) {
      if (!_this.props.disabled) {
        if (!(0, _helpers.isEmpty)(_this.options)) {
          if (!_this.state.isOpen) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === ' ') {
              event.preventDefault();
              _this.setState({ isOpen: true });
            }
          } else {
            // Updates the state to set focus on the next option
            // In case no option is active it should jump to the first.
            // In case it is the last it should stop there.
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              _this._onArrowDownKeyDown();
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              _this._onArrowUpKeyDown();
            } else if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              _this._onEnterOrSpaceKeyDown();
            }
          }

          if (event.key === 'Escape') {
            event.preventDefault();
            _this.setState({ isOpen: false });
          }
        }
      }

      if (_this.props.wrapperProps && _this.props.wrapperProps.onKeyDown) {
        _this.props.wrapperProps.onKeyDown(event);
      }
    };

    _this._onClickToggleMenu = function (event) {
      if (!_this.props.disabled) {
        if (_this.state.isOpen) {
          _this.setState({ isOpen: false });
        } else {
          _this.setState({ isOpen: true });
        }
      }

      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    };

    var selectedValue = void 0;
    var focusedOptionValue = void 0;

    if (properties.children) {
      _this.children = (0, _helpers.flattenReactChildren)(properties.children);
      _this.options = (0, _helpers.filter)(_this.children, isOption);
    }

    if ((0, _helpers.has)(properties, 'valueLink')) {
      selectedValue = properties.valueLink.value;
      focusedOptionValue = selectedValue;
    } else if ((0, _helpers.has)(properties, 'value')) {
      selectedValue = properties.value;
      focusedOptionValue = selectedValue;
    } else if ((0, _helpers.has)(properties, 'defaultValue')) {
      selectedValue = properties.defaultValue;
      focusedOptionValue = selectedValue;
    } else if (!(0, _helpers.isEmpty)(_this.children) && !(0, _helpers.some)(_this.children, isPlaceholder)) {
      var firstOption = (0, _helpers.first)(_this.options);
      selectedValue = firstOption ? firstOption.props.value : void 0;
      focusedOptionValue = selectedValue;
    } else if (!(0, _helpers.isEmpty)(_this.children)) {
      var _firstOption = (0, _helpers.first)(_this.options);
      focusedOptionValue = _firstOption ? _firstOption.props.value : void 0;
    }

    _this.state = {
      isOpen: false,
      isFocused: false,
      selectedValue: selectedValue,
      focusedOptionValue: focusedOptionValue,
      selectedOptionWrapperProps: sanitizeSelectedOptionWrapperProps(properties),
      wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
      menuProps: sanitizeMenuProps(properties.menuProps),
      caretProps: sanitizeCaretProps(properties.caretProps),
      isTouchedToToggle: false
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        isDisabled: this.props.disabled,
        isHoveredValue: this.state.focusedOptionValue
      };
    }

    /**
     * Generates the style-id & inject the focus & hover style.
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var id = (0, _helpers.uniqueId)();

      // Note: To ensure server side rendering creates the same results React's internal
      // id for this element is leveraged.
      this.selectedOptionWrapperId = this.props.id ? this.props.id : 'belle-select-id-' + id;
      this._styleId = 'style-id' + id;
      updatePseudoClassStyle(this._styleId, this.props);

      if (_exenv.canUseDOM) {
        this.mouseUpOnDocumentCallback = this._onMouseUpOnDocument;
        document.addEventListener('mouseup', this.mouseUpOnDocumentCallback);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.children) {
        this.children = (0, _helpers.flattenReactChildren)(properties.children);
        this.options = (0, _helpers.filter)(this.children, isOption);
      }

      var newState = {
        selectedOptionWrapperProps: sanitizeSelectedOptionWrapperProps(properties),
        wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
        menuProps: sanitizeMenuProps(properties.menuProps),
        caretProps: sanitizeCaretProps(properties.caretProps)
      };

      if ((0, _helpers.has)(properties, 'valueLink')) {
        newState.selectedValue = properties.valueLink.value;
        newState.focusedOptionValue = properties.valueLink.value;
      } else if ((0, _helpers.has)(properties, 'value')) {
        newState.selectedValue = properties.value;
        newState.focusedOptionValue = properties.value;
      }

      this.setState(newState);
      (0, _injectStyle.removeStyle)(this._styleId);
      updatePseudoClassStyle(this._styleId, properties);
    }

    /**
     * In case shouldPositionOptions is active the scrollTop position is stored
     * to be applied later on. The menu is hidden to make sure it is
     * not displayed beofre repositioned.
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProperties, nextState) {
      var shouldPositionOptions = (0, _helpers.has)(nextProperties, 'shouldPositionOptions') ? nextProperties.shouldPositionOptions : _select4.default.shouldPositionOptions;

      if (shouldPositionOptions) {
        var menuNode = _reactDom2.default.findDOMNode(this.refs.menu);
        this.cachedMenuScrollTop = menuNode.scrollTop;

        if (!this.state.isOpen && nextState.isOpen) {
          menuNode.style.display = 'none';
        }
      }
    }

    /**
     * In case shouldPositionOptions is active when opening the menu it is
     * repositioned & switched to be visible.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(previousProperties, previousState) {
      var shouldPositionOptions = (0, _helpers.has)(this.props, 'shouldPositionOptions') ? this.props.shouldPositionOptions : _select4.default.shouldPositionOptions;

      if (shouldPositionOptions && !this.props.disabled) {
        var menuNode = _reactDom2.default.findDOMNode(this.refs.menu);

        // the menu was just opened
        if (!previousState.isOpen && this.state.isOpen && this.children && this.children.length > 0) {
          var positionOptions = (0, _helpers.has)(this.props, 'positionOptions') ? this.props.positionOptions : _select4.default.positionOptions;
          positionOptions(this);

          // restore the old scrollTop position
        } else {
          menuNode.scrollTop = this.cachedMenuScrollTop;
        }

        var separators = (0, _helpers.filter)(this.children, isSeparator);
        var childrenPresent = !(0, _helpers.isEmpty)(this.options) || !(0, _helpers.isEmpty)(separators);
        if (!previousState.isOpen && this.state.isOpen && childrenPresent) {
          var menuStyle = _extends({}, _select2.default.menuStyle, this.props.menuStyle);
          menuNode.style.display = menuStyle.display;
        }
      }
    }

    /**
     * Remove a component's associated styles whenever it gets removed from the DOM.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeStyle)(this._styleId);
      if (_exenv.canUseDOM) {
        document.removeEventListener('mouseup', this.mouseUpOnDocumentCallback);
      }
    }

    /**
     * Update the focusedOption based on Option the user is touching.
     *
     * Unfortunately updating the focusedOption only works in case the menu
     * is not scrollable.
     * If a setState would be triggered during a touch with the intention to
     * scroll the setState would trigger a re-render & prevent the scrolling.
     */


    /**
     * Identifies if the menu is scrollable.
     */


    /**
     * Triggers a change event after the user touched on an Option.
     */


    /**
     * Triggers a change event after the user touched on an Option.
     */


    /**
     * Triggers a change event after the user clicked on an Option.
     */


    /**
     * In order to inform the user which element in the document is active the
     * component keeps track of when it's de-selected and depending on that
     * close the menu.
     */


    /**
     * In order to inform the user which element in the document is active the
     * component keeps track of when it's de-selected and depending on that
     * close the menu.
     */


    /**
     * In order to inform the user which Option is active the component keeps
     * track of when an option is in focus by the user and depending on that
     * provide a visual indicator.
     */


    /**
     * Initiate the toggle for the menu.
     */


    /**
     * Toggle the menu after a user touched it & resets the pressed state
     * for to toggle.
     */


    /**
     * Reset the precondition to initialize a toggle of the menu.
     */


    /**
     * Set isActive to true on mouse-down.
     */


    /**
     * Set isActive to false on mouse-up.
     */


    /**
     * Set isActive to false on mouse-up.
     */


    /**
     * Set isActive to false on is context menu opens on select's div.
     */


    /**
     * Update focus for the options for an already open menu.
     *
     * The user experience of HTML's native select is good and the goal here is to
     * achieve the same behaviour.
     *
     * - Focus on the first entry in case no options is focused on.
     * - Switch focus to the next option in case one option already has focus.
     */


    /**
     * Update focus for the options for an already open menu.
     *
     * The user experience of HTML's native select is good and the goal here is to
     * achieve the same behaviour.
     *
     * - Focus on the last entry in case no options is focused on.
     * - Switch focus to the previous option in case one option already has focus.
     */


    /**
     * After the user pressed the `Enter` or `Space` key for an already open
     * menu the focused option is selected.
     *
     * Same as _onClickAtOption this update the state & dispatches a change event.
     */


    /**
     * Manages the keyboard events.
     *
     * In case the Select is in focus, but closed ArrowDown, ArrowUp, Enter and
     * Space will result in opening the menu.
     *
     * In case the menu is already open each key press will have
     * different effects already documented in the related methods.
     *
     * Pressing Escape will close the menu.
     */


    /**
     * Toggle the menu after a user clicked on it.
     */

  }, {
    key: '_getIndexOfFocusedOption',


    /**
     * Returns the index of the entry with a certain value from the component's
     * children.
     *
     * The index search includes only option components.
     */
    value: function _getIndexOfFocusedOption() {
      var _this2 = this;

      return (0, _helpers.findIndex)(this.options, function (element) {
        return element.props.value === _this2.state.focusedOptionValue;
      });
    }

    /**
     * Returns the value of the child with a certain index.
     */

  }, {
    key: '_getValueForIndex',
    value: function _getValueForIndex(index) {
      return this.options[index].props.value;
    }

    /**
     * After an option has been selected the menu gets closed and the
     * selection processed.
     *
     * Depending on the component's properties the value gets updated and the
     * provided change callback for onUpdate or valueLink is called.
     */

  }, {
    key: '_triggerChange',
    value: function _triggerChange(value) {
      if ((0, _helpers.has)(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(value);
        this.setState({
          isOpen: false
        });
      } else if ((0, _helpers.has)(this.props, 'value')) {
        this.setState({
          isOpen: false
        });
      } else {
        this.setState({
          focusedOptionValue: value,
          selectedValue: value,
          isOpen: false
        });
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({ value: value });
      }
    }
  }, {
    key: '_renderChildren',
    value: function _renderChildren() {
      var _this3 = this;

      var optionsIndex = 0;

      return _react2.default.Children.map(this.children, function (entry, index) {
        if (isOption(entry)) {
          // filter out all non-Option Components
          var localOptionIndex = optionsIndex;
          var isHovered = entry.props.value === _this3.state.focusedOptionValue;
          var element = _react2.default.createElement(
            _SelectItem2.default,
            {
              onItemClick: _this3._onClickAtOption,
              onItemTouchStart: _this3._onTouchStartAtOption,
              onItemTouchMove: _this3._onTouchMoveAtOption,
              onItemTouchEnd: _this3._onTouchEndAtOption,
              onItemTouchCancel: _this3._onTouchCancelAtOption,
              onItemMouseEnter: _this3._onMouseEnterAtOption,
              isHovered: isHovered,
              index: localOptionIndex,
              key: index
            },
            entry
          );
          optionsIndex++;

          return element;
        } else if (isSeparator(entry)) {
          return _react2.default.createElement(
            'li',
            {
              key: index,
              role: 'presentation'
            },
            entry
          );
        }

        return null;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var defaultStyle = _extends({}, _select2.default.style, this.props.style);
      var hoverStyle = _extends({}, defaultStyle, _select2.default.hoverStyle, this.props.hoverStyle);
      var focusStyle = _extends({}, defaultStyle, _select2.default.focusStyle, this.props.focusStyle);
      var activeStyle = _extends({}, defaultStyle, _select2.default.activeStyle, this.props.activeStyle);
      var disabledStyle = _extends({}, defaultStyle, _select2.default.disabledStyle, this.props.disabledStyle);
      var disabledHoverStyle = _extends({}, disabledStyle, _select2.default.disabledHoverStyle, this.props.disabledHoverStyle);
      var menuStyle = _extends({}, _select2.default.menuStyle, this.props.menuStyle);
      var caretToCloseStyle = _extends({}, _select2.default.caretToCloseStyle, this.props.caretToCloseStyle);
      var caretToOpenStyle = _extends({}, _select2.default.caretToOpenStyle, this.props.caretToOpenStyle);
      var disabledCaretToOpenStyle = _extends({}, caretToOpenStyle, _select2.default.disabledCaretToOpenStyle, this.props.disabledCaretToOpenStyle);
      var wrapperStyle = _extends({}, _select2.default.wrapperStyle, this.props.wrapperStyle);

      var selectedOptionOrPlaceholder = void 0;
      if (this.state.selectedValue !== void 0) {
        var selectedEntry = (0, _helpers.find)(this.children, function (entry) {
          return entry.props.value === _this4.state.selectedValue;
        });

        if (selectedEntry) {
          selectedOptionOrPlaceholder = _react2.default.cloneElement(selectedEntry, {
            _isDisplayedAsSelected: true
          });
        }
      } else {
        selectedOptionOrPlaceholder = (0, _helpers.find)(this.children, isPlaceholder);
      }

      var separators = (0, _helpers.filter)(this.children, isSeparator);
      var childrenNotPresent = (0, _helpers.isEmpty)(this.options) && (0, _helpers.isEmpty)(separators);
      var computedMenuStyle = this.props.disabled || !this.state.isOpen || childrenNotPresent ? { display: 'none' } : menuStyle;
      var hasCustomTabIndex = this.props.wrapperProps && this.props.wrapperProps.tabIndex;
      var tabIndex = hasCustomTabIndex ? this.props.wrapperProps.tabIndex : '0';

      var selectedOptionWrapperStyle = void 0;
      if (this.props.disabled) {
        if (this.state.isTouchedToToggle) {
          selectedOptionWrapperStyle = disabledHoverStyle;
        } else {
          selectedOptionWrapperStyle = disabledStyle;
        }

        tabIndex = -1;
      } else {
        if (this.state.isActive) {
          selectedOptionWrapperStyle = activeStyle;
        } else if (this.state.isFocused) {
          selectedOptionWrapperStyle = focusStyle;
        } else if (this.state.isTouchedToToggle) {
          selectedOptionWrapperStyle = hoverStyle;
        } else {
          selectedOptionWrapperStyle = defaultStyle;
        }
      }

      var caretStyle = void 0;
      if (this.props.disabled) {
        caretStyle = disabledCaretToOpenStyle;
      } else if (this.state.isOpen) {
        caretStyle = caretToCloseStyle;
      } else {
        caretStyle = caretToOpenStyle;
      }

      return _react2.default.createElement(
        'div',
        _extends({
          style: wrapperStyle,
          tabIndex: tabIndex,
          onKeyDown: this._onKeyDown,
          onBlur: this._onBlur,
          onFocus: this._onFocus,
          ref: 'wrapper'
        }, this.state.wrapperProps),
        _react2.default.createElement(
          'div',
          _extends({
            onClick: this._onClickToggleMenu,
            onTouchStart: this._onTouchStartToggleMenu,
            onTouchEnd: this._onTouchEndToggleMenu,
            onTouchCancel: this._onTouchCancelToggleMenu,
            onContextMenu: this._onContextMenu,
            onMouseDown: this._onMouseDown,
            onMouseUp: this._onMouseUp,
            style: selectedOptionWrapperStyle,
            className: (0, _unionClassNames2.default)(this.props.className, this._styleId),
            ref: 'selectedOptionWrapper',
            role: 'button',
            'aria-expanded': this.state.isOpen,
            id: this.selectedOptionWrapperId
          }, this.state.selectedOptionWrapperProps),
          selectedOptionOrPlaceholder,
          _react2.default.createElement('span', _extends({
            style: caretStyle
          }, this.state.caretProps))
        ),
        _react2.default.createElement(
          'ul',
          _extends({
            style: computedMenuStyle,
            role: 'listbox',
            'aria-labelledby': this.selectedOptionWrapperId,
            ref: 'menu'
          }, this.state.menuProps),
          this._renderChildren()
        )
      );
    }
  }]);

  return Select;
}(_react.Component);

Select.displayName = 'Select';
Select.propTypes = selectPropTypes;
Select.childContextTypes = {
  isDisabled: _react.PropTypes.bool.isRequired,
  isHoveredValue: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number])
};
Select.defaultProps = {
  disabled: false
};
exports.default = Select;