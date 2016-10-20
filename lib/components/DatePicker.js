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

var _dateHelpers = require('../utils/date-helpers');

var _datePicker = require('../style/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _datePicker3 = require('../config/datePicker');

var _datePicker4 = _interopRequireDefault(_datePicker3);

var _ActionArea = require('./ActionArea');

var _ActionArea2 = _interopRequireDefault(_ActionArea);

var _DisabledDay = require('./DisabledDay');

var _DisabledDay2 = _interopRequireDefault(_DisabledDay);

var _Day = require('./Day');

var _Day2 = _interopRequireDefault(_Day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var datePickerPropTypes = {
  // value related props
  defaultValue: _react.PropTypes.instanceOf(Date),
  value: _react.PropTypes.instanceOf(Date),
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.instanceOf(Date),
    requestChange: _react.PropTypes.func.isRequired
  }),

  min: _react.PropTypes.instanceOf(Date),
  max: _react.PropTypes.instanceOf(Date),

  // component config related props
  locale: _react.PropTypes.string,
  month: _react.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  defaultMonth: _react.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  year: _react.PropTypes.number,
  defaultYear: _react.PropTypes.number,
  showOtherMonthDate: _react.PropTypes.bool,
  renderDay: _react.PropTypes.func,
  tabIndex: _react.PropTypes.number,
  'aria-label': _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  readOnly: _react.PropTypes.bool,
  preventFocusStyleForTouchAndClick: _react.PropTypes.bool,

  // event callbacks for wrapper
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onTouchCancel: _react.PropTypes.func,

  // callbacks for change of values
  onUpdate: _react.PropTypes.func,
  onMonthUpdate: _react.PropTypes.func,

  // props
  dayProps: _react.PropTypes.object,
  navBarProps: _react.PropTypes.object,
  prevMonthNavProps: _react.PropTypes.object,
  prevMonthNavIconProps: _react.PropTypes.object,
  nextMonthNavProps: _react.PropTypes.object,
  nextMonthNavIconProps: _react.PropTypes.object,
  monthLabelProps: _react.PropTypes.object,
  dayLabelProps: _react.PropTypes.object,
  weekHeaderProps: _react.PropTypes.object,
  weekGridProps: _react.PropTypes.object,

  // ClassNames
  className: _react.PropTypes.string,

  // wrapper styles
  style: _react.PropTypes.object,
  disabledStyle: _react.PropTypes.object,
  readOnlyStyle: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  activeStyle: _react.PropTypes.object,
  focusStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,

  // navbar styles
  navBarStyle: _react.PropTypes.object,

  // prevMonthNav styles
  prevMonthNavStyle: _react.PropTypes.object,
  prevMonthNavIconStyle: _react.PropTypes.object,
  hoverPrevMonthNavStyle: _react.PropTypes.object,
  activePrevMonthNavStyle: _react.PropTypes.object,

  // nextMonthNav styles
  nextMonthNavStyle: _react.PropTypes.object,
  nextMonthNavIconStyle: _react.PropTypes.object,
  hoverNextMonthNavStyle: _react.PropTypes.object,
  activeNextMonthNavStyle: _react.PropTypes.object,

  weekHeaderStyle: _react.PropTypes.object,

  // monthlbl styles
  monthLabelStyle: _react.PropTypes.object,

  // daylbl styles
  dayLabelStyle: _react.PropTypes.object,
  disabledDayLabelStyle: _react.PropTypes.object,
  weekendLabelStyle: _react.PropTypes.object,

  // day styles
  dayStyle: _react.PropTypes.object,
  disabledDayStyle: _react.PropTypes.object,
  readOnlyDayStyle: _react.PropTypes.object,
  activeDayStyle: _react.PropTypes.object,
  focusDayStyle: _react.PropTypes.object,
  disabledFocusDayStyle: _react.PropTypes.object,
  todayStyle: _react.PropTypes.object,
  selectedDayStyle: _react.PropTypes.object,
  otherMonthDayStyle: _react.PropTypes.object,
  weekendStyle: _react.PropTypes.object
};

/**
 * Returns an object with properties that are relevant for the wrapping div of the date picker.
 */
function sanitizeWrapperProps(properties) {
  return (0, _helpers.omit)(properties, Object.keys(datePickerPropTypes));
}

/**
 * Returns an object with properties that are relevant for day span.
 */
function sanitizeEmptyDayProps(properties) {
  return (0, _helpers.omit)(properties, ['key', 'style']);
}

/**
 * Returns an object with properties that are relevant for day span.
 */
function sanitizeDisabledDayProps(properties) {
  return (0, _helpers.omit)(properties, ['key', 'onMouseEnter', 'onMouseLeave', 'style']);
}

/**
 * Returns an object with properties that are relevant for day span.
 */
function sanitizeDayProps(properties) {
  return (0, _helpers.omit)(properties, ['key', 'onMouseDown', 'onMouseUp', 'onMouseEnter', 'onMouseLeave', 'onTouchStart', 'onTouchEnd', 'onTouchCancel', 'aria-selected', 'style', 'role']);
}

function sanitizeNavBarProps(properties) {
  return (0, _helpers.omit)(properties, ['style']);
}

function sanitizePrevMonthNavProps(properties) {
  return (0, _helpers.omit)(properties, ['aria-label', 'className', 'onClick', 'style']);
}

function sanitizePrevMonthNavIconProps(properties) {
  return (0, _helpers.omit)(properties, ['style']);
}

function sanitizeNextMonthNavProps(properties) {
  return (0, _helpers.omit)(properties, ['aria-label', 'className', 'onClick', 'style']);
}

function sanitizeNextMonthNavIconProps(properties) {
  return (0, _helpers.omit)(properties, ['style']);
}

function sanitizeMonthLabelProps(properties) {
  return (0, _helpers.omit)(properties, ['id', 'role', 'style']);
}

function sanitizeDayLabelProps(properties) {
  return (0, _helpers.omit)(properties, ['key', 'role', 'style']);
}

function sanitizeWeekHeaderProps(properties) {
  return (0, _helpers.omit)(properties, ['style']);
}

function sanitizeWeekGridProps(properties) {
  return (0, _helpers.omit)(properties, ['role', 'style']);
}

/**
 * Injects pseudo classes for styles into the DOM.
 */
function updatePseudoClassStyle(pseudoStyleIds, properties, preventFocusStyleForTouchAndClick) {
  var styles = [{
    id: pseudoStyleIds.prevMonthNavStyleId,
    style: _extends({}, _datePicker2.default.hoverPrevMonthNavStyle, properties.hoverPrevMonthNavStyle),
    pseudoClass: 'hover'

  }, {
    id: pseudoStyleIds.nextMonthNavStyleId,
    style: _extends({}, _datePicker2.default.hoverNextMonthNavStyle, properties.hoverNextMonthNavStyle),
    pseudoClass: 'hover'
  }];
  var focusStyle = void 0;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    focusStyle = _extends({}, _datePicker2.default.focusStyle, properties.focusStyle);
  }

  styles.push({
    id: pseudoStyleIds.styleId,
    style: focusStyle,
    pseudoClass: 'focus'
  });
  (0, _injectStyle.injectStyles)(styles);
}

/**
 * DatePicker React Component.
 *
 * This implementation follows the recommendations proposed here:
 * http://www.w3.org/TR/wai-aria-practices/#datepicker
 */

var DatePicker = function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(properties) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, properties));

    _initialiseProps.call(_this);

    var selectedDate = void 0;
    var month = void 0;
    var year = void 0;

    if ((0, _helpers.has)(properties, 'valueLink')) {
      selectedDate = properties.valueLink.value;
    } else if ((0, _helpers.has)(properties, 'value')) {
      selectedDate = properties.value;
    } else if ((0, _helpers.has)(properties, 'defaultValue')) {
      selectedDate = properties.defaultValue;
    }

    if (properties.defaultMonth) {
      month = properties.defaultMonth - 1;
    } else if (selectedDate) {
      month = selectedDate.getMonth();
    } else {
      month = (0, _dateHelpers.today)().getMonth();
    }

    if (properties.defaultYear) {
      year = properties.defaultYear;
    } else if (selectedDate) {
      year = selectedDate.getFullYear();
    } else {
      year = (0, _dateHelpers.today)().getFullYear();
    }

    _this.state = {
      isFocused: false,
      isActive: false,
      selectedDate: selectedDate,
      month: month,
      year: year
    };

    _this.localeData = (0, _dateHelpers.getLocaleData)(properties.locale);
    _this.wrapperProps = sanitizeWrapperProps(properties);
    _this.dayProps = sanitizeDayProps(properties.dayProps);
    _this.disabledDayProps = sanitizeDisabledDayProps(properties.dayProps);
    _this.emptyDayProps = sanitizeEmptyDayProps(properties.dayProps);
    _this.navBarProps = sanitizeNavBarProps(properties.navBarProps);
    _this.prevMonthNavProps = sanitizePrevMonthNavProps(properties.prevMonthNavProps);
    _this.prevMonthNavIconProps = sanitizePrevMonthNavIconProps(properties.prevMonthNavIconProps);
    _this.nextMonthNavProps = sanitizeNextMonthNavProps(properties.nextMonthNavProps);
    _this.nextMonthNavIconProps = sanitizeNextMonthNavIconProps(properties.nextMonthNavIconProps);
    _this.monthLabelProps = sanitizeMonthLabelProps(properties.monthLabelProps);
    _this.dayLabelProps = sanitizeDayLabelProps(properties.dayLabelProps);
    _this.weekHeaderProps = sanitizeWeekHeaderProps(properties.weekHeaderProps);
    _this.weekGridProps = sanitizeWeekGridProps(properties.weekGridProps);

    _this.preventFocusStyleForTouchAndClick = (0, _helpers.has)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _datePicker4.default.preventFocusStyleForTouchAndClick;
    return _this;
  }

  _createClass(DatePicker, [{
    key: 'componentWillMount',


    /**
     * Generates the style-id based on React's unique DOM node id.
     * Calls function to inject the pseudo classes into the dom.
     */
    value: function componentWillMount() {
      var id = (0, _helpers.uniqueId)();
      this.pseudoStyleIds = {};
      this.pseudoStyleIds.styleId = 'wrapper-style-id' + id;
      this.pseudoStyleIds.prevMonthNavStyleId = 'prevMonthNav-style-id' + id;
      this.pseudoStyleIds.nextMonthNavStyleId = 'nextMonthNav-style-id' + id;
      updatePseudoClassStyle(this.pseudoStyleIds, this.props, this.preventFocusStyleForTouchAndClick);
    }

    /**
     * Function will update component state and styles as new props are received.
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {};

      if ((0, _helpers.has)(properties, 'valueLink')) {
        newState.selectedDate = properties.valueLink.value;
      } else if ((0, _helpers.has)(properties, 'value')) {
        newState.selectedDate = properties.value;
      }

      this.setState(newState);

      this.localeData = (0, _dateHelpers.getLocaleData)(properties.locale);
      this.wrapperProps = sanitizeWrapperProps(properties);
      this.dayProps = sanitizeDayProps(properties.dayProps);
      this.disabledDayProps = sanitizeDisabledDayProps(properties.dayProps);
      this.emptyDayProps = sanitizeEmptyDayProps(properties.dayProps);
      this.navBarProps = sanitizeNavBarProps(properties.navBarProps);
      this.prevMonthNavProps = sanitizePrevMonthNavProps(properties.prevMonthNavProps);
      this.prevMonthNavIconProps = sanitizePrevMonthNavIconProps(properties.prevMonthNavIconProps);
      this.nextMonthNavProps = sanitizeNextMonthNavProps(properties.nextMonthNavProps);
      this.nextMonthNavIconProps = sanitizeNextMonthNavIconProps(properties.nextMonthNavIconProps);
      this.monthLabelProps = sanitizeMonthLabelProps(properties.monthLabelProps);
      this.dayLabelProps = sanitizeDayLabelProps(properties.dayLabelProps);
      this.weekHeaderProps = sanitizeWeekHeaderProps(properties.weekHeaderProps);
      this.weekGridProps = sanitizeWeekGridProps(properties.weekGridProps);

      this.preventFocusStyleForTouchAndClick = (0, _helpers.has)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _datePicker4.default.preventFocusStyleForTouchAndClick;

      (0, _injectStyle.removeAllStyles)(Object.keys(this.pseudoStyleIds));
      updatePseudoClassStyle(this.pseudoStyleIds, properties, this.preventFocusStyleForTouchAndClick);
    }

    /**
     * Removes pseudo classes from the DOM once component gets unmounted.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeAllStyles)(Object.keys(this.pseudoStyleIds));
    }

    /**
     * Callback is called when wrapper is focused, it will conditionally set isFocused.
     *
     * In addition this.state.focusedDateKey will be set to current date of whichever month is displayed on date-picker (if this.state.focusedDateKey is undefined).
     */


    /**
     * Callback is called when wrapper is blurred, it will reset isFocused, focusedDateKey.
     */


    /**
      * Callback is called when wrapper receives mouseDown. Conditionally set isActive.
      */


    /**
     * Callback is called when wrapper receives mouseUp. Reset isActive.
     */


    /**
     * Callback is called when touch starts on wrapper. Conditionally sets isActive.
     */


    /**
     * Callback is called when touch ends on wrapper. Reset isActive.
     */


    /**
     * On keyDown on wrapper if date-picker is not disabled and some day is focused:
     * 1. arrow keys will navigate calendar
     * 2. enter key will set selectedDate of component
     * 3. space key will set / unset selectedDate
     * 4. props.onKeyDown will be called
     */


    /**
     * Function will handle pageUp key down event.
     */


    /**
     * Function will handle pageDown key down event.
     */


    /**
     * Callback is called when some day receives mouseDown.
     * It will conditionally set this.state.activeDay, this.state.focusedDateKey and call props.onDayMouseDown.
     *
     * Note: mouseEvent.button is supported by all browsers are are targeting: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
     */


    /**
     * Callback is called when some day receives mouseUp.
     * It will reset this.state.activeDay and call props.onDayMouseUp.
     */


    /**
     * Callback is called when some day receives MouseEnter. It will conditionally set this.state.focusedDateKey.
     */


    /**
     * Callback is called when some day receives MouseLeave. It will reset this.state.focusedDateKey.
     */


    /**
     * Callback is called when some day receives touchStart.
     * It will conditionally set this.state.activeDay and call props.onDayTouchStart.
     */


    /**
     * Callback is called when some day receives touchEnd.
     * It will reset this.state.activeDay and call props.onDayTouchEnd.
     */

  }, {
    key: '_triggerSelectDate',


    /**
     * Depending on whether component is controlled or uncontrolled the function will update this.state.selectedDate.
     * It will also call props.onUpdate.
     */
    value: function _triggerSelectDate(day, month, year) {
      if (!this.props.disabled && !this.props.readOnly) {
        var selectedDate = day ? new Date(year, month, day) : undefined;

        if ((0, _helpers.has)(this.props, 'valueLink')) {
          this.props.valueLink.requestChange(selectedDate);
        } else if (!(0, _helpers.has)(this.props, 'value')) {
          this.setState({
            selectedDate: selectedDate,
            month: month,
            year: year
          });
        }

        if (this.props.onUpdate) {
          this.props.onUpdate({
            value: selectedDate
          });
        }
      }
    }

    /**
     * Function will select / deselect date passed to it, it is used in case of 'Space' keyDown on a day.
     */

  }, {
    key: '_triggerToggleDate',
    value: function _triggerToggleDate(date) {
      if (!this.props.disabled && !this.props.readOnly) {
        var day = void 0;
        var month = void 0;
        var year = void 0;
        if (this.state.selectedDate && date && this.state.selectedDate.getDate() === date.getDate() && this.state.selectedDate.getMonth() === date.getMonth() && this.state.selectedDate.getFullYear() === date.getFullYear()) {
          day = undefined;
          month = this.state.month;
          year = this.state.year;
        } else {
          day = date.getDate();
          month = date.getMonth();
          year = date.getFullYear();
        }

        this._triggerSelectDate(day, month, year);
      }
    }
  }, {
    key: '_focusOnTheFistDayOfTheMonth',
    value: function _focusOnTheFistDayOfTheMonth() {
      this.setState({
        focusedDateKey: this.state.year + '-' + (this.state.month + 1) + '-1'
      });
    }
  }, {
    key: '_focusOnFallbackDay',
    value: function _focusOnFallbackDay() {
      if (this.state.lastHoveredDay) {
        this.setState({
          focusedDateKey: this.state.lastHoveredDay
        });
      } else {
        this._focusOnTheFistDayOfTheMonth();
      }
    }

    /**
     * The function is mainly used when some day is focused and Arrow keys are pressed to navigate to some other day.
     * days is the number of days by which focused should be moved ahead or behind.
     */

  }, {
    key: '_focusOtherDay',
    value: function _focusOtherDay(days) {
      var focusedDate = (0, _dateHelpers.getDateForDateKey)(this.state.focusedDateKey);
      var currentMonth = focusedDate.getMonth();

      var nextFocusedDate = (0, _dateHelpers.getDateForDateKey)(this.state.focusedDateKey);
      nextFocusedDate.setDate(nextFocusedDate.getDate() + days);
      var nextFocusedDateKey = (0, _dateHelpers.convertDateToDateKey)(nextFocusedDate);
      var nextMonth = nextFocusedDate.getMonth();

      if (nextMonth !== currentMonth) {
        if ((nextMonth < currentMonth || nextMonth === 11 && currentMonth === 0) && !(nextMonth === 0 && currentMonth === 11)) {
          this._decreaseMonthYear();
        } else if ((nextMonth > currentMonth || nextMonth === 0 && currentMonth === 11) && !(nextMonth === 11 && currentMonth === 0)) {
          this._increaseMonthYear();
        }
      }

      this.setState({
        focusedDateKey: nextFocusedDateKey
      });
    }

    /**
     * The function will decrease current month in state. It will also call props.onMonthUpdate.
     */

  }, {
    key: '_decreaseMonthYear',
    value: function _decreaseMonthYear() {
      var newMonth = void 0;
      var newYear = void 0;
      if (this.state.month === 0) {
        newMonth = 11;
        newYear = this.state.year - 1;
      } else {
        newMonth = this.state.month - 1;
        newYear = this.state.year;
      }

      this.setState({
        month: newMonth,
        year: newYear,
        focusedDateKey: undefined,
        lastHoveredDay: undefined
      });
      if (this.props.onMonthUpdate) {
        this.props.onMonthUpdate(newMonth + 1, newYear);
      }
    }

    /**
     * The function will increase current month in state. It will also call props.onMonthUpdate.
     */

  }, {
    key: '_increaseMonthYear',
    value: function _increaseMonthYear() {
      var newMonth = void 0;
      var newYear = void 0;
      if (this.state.month === 11) {
        newMonth = 0;
        newYear = this.state.year + 1;
      } else {
        newMonth = this.state.month + 1;
        newYear = this.state.year;
      }

      this.setState({
        month: newMonth,
        year: newYear,
        focusedDateKey: undefined,
        lastHoveredDay: undefined
      });
      if (this.props.onMonthUpdate) {
        this.props.onMonthUpdate(newMonth + 1, newYear);
      }
    }
  }, {
    key: '_isWithinMinAndMax',
    value: function _isWithinMinAndMax(date) {
      return !(this.props.min && date < this.props.min || this.props.max && date > this.props.max);
    }
  }, {
    key: '_renderPrevMonthNav',
    value: function _renderPrevMonthNav() {
      var prevMonthNavStyle = _extends({}, _datePicker2.default.prevMonthNavStyle, this.props.prevMonthNavStyle);

      var prevMonthNavIconStyle = _extends({}, _datePicker2.default.prevMonthNavIconStyle, this.props.prevMonthNavIconStyle);

      var className = this.pseudoStyleIds.prevMonthNavStyleId;
      if (this.props.prevMonthNavProps) {
        className = (0, _unionClassNames2.default)(this.props.prevMonthNavProps.className, className);
      }

      return _react2.default.createElement(
        _ActionArea2.default,
        _extends({
          onUpdate: this._onClickPrevMonth,
          style: prevMonthNavStyle,
          className: className,
          'aria-label': 'Go to previous month'
        }, this.prevMonthNavProps),
        _react2.default.createElement('div', _extends({
          style: prevMonthNavIconStyle
        }, this.prevMonthNavIconProps))
      );
    }
  }, {
    key: '_renderNextMonthNav',
    value: function _renderNextMonthNav() {
      var nextMonthNavStyle = _extends({}, _datePicker2.default.nextMonthNavStyle, this.props.nextMonthNavStyle);

      var nextMonthNavIconStyle = _extends({}, _datePicker2.default.nextMonthNavIconStyle, this.props.nextMonthNavIconStyle);

      var className = this.pseudoStyleIds.nextMonthNavStyleId;
      if (this.props.nextMonthNavProps) {
        className = (0, _unionClassNames2.default)(this.props.nextMonthNavProps.className, className);
      }

      return _react2.default.createElement(
        _ActionArea2.default,
        _extends({
          onUpdate: this._onClickNextMonth,
          style: nextMonthNavStyle,
          className: className,
          'aria-label': 'Go to next month'
        }, this.nextMonthNavProps),
        _react2.default.createElement('div', _extends({
          style: nextMonthNavIconStyle
        }, this.nextMonthNavIconProps))
      );
    }

    /**
     * Function will return jsx for rendering the nav bar for calendar.
     * Depending on following rules it will apply styles to prevMonthNav and nextMonthNav:
     * 1. If disabled hide navs
     * 2. If active apply activeStyles
     */

  }, {
    key: '_renderNavBar',
    value: function _renderNavBar() {
      var navBarStyle = _extends({}, _datePicker2.default.navBarStyle, this.props.navBarStyle);
      var monthLabelStyle = _extends({}, _datePicker2.default.monthLabelStyle, this.props.monthLabelStyle);

      return _react2.default.createElement(
        'div',
        _extends({
          style: navBarStyle
        }, this.navBarProps),
        this._renderPrevMonthNav(),
        _react2.default.createElement(
          'span',
          _extends({
            style: monthLabelStyle,
            role: 'heading'
            /*
              This label has an id as suggested in http://www.w3.org/TR/wai-aria-practices/#datepicker
            */
            , id: this.state.year + '-' + this.state.month
          }, this.monthLabelProps),
          this.localeData.monthNames[this.state.month] + ' ' + this.state.year
        ),
        this._renderNextMonthNav()
      );
    }

    /**
     * Function will return jsx for rendering the week header for calendar.
     * Disabled styles will be applied for disabled date-picker.
     * Day headers will be rendered using locale information.
     */

  }, {
    key: '_renderWeekHeader',
    value: function _renderWeekHeader() {
      var _this2 = this;

      var weekHeaderStyle = _extends({}, _datePicker2.default.weekHeaderStyle, this.props.weekHeaderStyle);

      var dayLabelStyle = _extends({}, _datePicker2.default.dayLabelStyle, this.props.dayLabelStyle);
      if (this.props.disabled) {
        dayLabelStyle = _extends({}, dayLabelStyle, _datePicker2.default.disabledDayLabelStyle, this.props.disabledDayLabelStyle);
      }

      var weekendLabelStyle = _extends({}, dayLabelStyle, _datePicker2.default.weekendLabelStyle, this.props.weekendLabelStyle);
      var dayNames = (0, _helpers.shift)(this.localeData.dayNamesMin, this.localeData.firstDay);
      dayNames = this.localeData.isRTL ? (0, _helpers.reverse)(dayNames) : dayNames;
      var weekendIndex = (7 - this.localeData.firstDay) % 7 + this.localeData.weekEnd;
      weekendIndex = this.localeData.isRTL ? 6 - weekendIndex : weekendIndex;

      return _react2.default.createElement(
        'div',
        _extends({
          style: weekHeaderStyle
        }, this.weekHeaderProps),
        (0, _helpers.map)(dayNames, function (dayAbbr, index) {
          return _react2.default.createElement(
            'span',
            _extends({
              key: 'dayAbbr-' + index,
              style: index === weekendIndex ? weekendLabelStyle : dayLabelStyle,
              role: 'columnheader'
            }, _this2.dayLabelProps),
            dayAbbr
          );
        })
      );
    }

    /**
     * Function will return jsx for rendering the a day.
     * It will apply various styles in sequence as below (styles will be additive):
     * 1. If component is readOnly apply readOnly styles
     * 2. If component is disabled apply disabled styles
     *    - If component is disabled and hovered apply disableHover styles
     * 3. If day is weekend apply weekendStyle
     * 4. If its day in current month and component is not disabled or readOnly:
     *    - If its current day apply todayStyle
     *    - If this is selected day apply selectedDayStyle
     *    - If component is hovered apply hover styles
     *    - If component is hovered and active apply hoveredStyles + activeStyles
     *    - If component is hovered and not active but focused and preventFocusStyleForTouchAndClick apply focus styles
     * 5. If current day represents other months day in calendar apply otherMonthDayStyle
     */

  }, {
    key: '_renderDay',
    value: function _renderDay(currentDate, index) {
      var day = currentDate.getDate();
      var month = currentDate.getMonth();
      var year = currentDate.getFullYear();
      var isOtherMonth = month !== this.state.month;
      var dateKey = (0, _dateHelpers.convertDateToDateKey)(currentDate);
      var isDisabledDay = !this._isWithinMinAndMax(currentDate);

      var ariaSelected = false;

      var dayStyle = _extends({}, _datePicker2.default.dayStyle, this.props.dayStyle);

      if (this.props.readOnly) {
        dayStyle = _extends({}, dayStyle, _datePicker2.default.readOnlyDayStyle, this.props.readOnlyDayStyle);
      }

      if (isOtherMonth) {
        dayStyle = _extends({}, dayStyle, _datePicker2.default.otherMonthDayStyle, this.props.otherMonthDayStyle);
      }

      if (this.props.disabled || isDisabledDay) {
        dayStyle = _extends({}, dayStyle, _datePicker2.default.disabledDayStyle, this.props.disabledDayStyle);
      }

      if (currentDate.getDay() === this.localeData.weekEnd) {
        dayStyle = _extends({}, dayStyle, _datePicker2.default.weekendStyle, this.props.weekendStyle);
      }

      if (day === (0, _dateHelpers.today)().getDate() && month === (0, _dateHelpers.today)().getMonth() && year === (0, _dateHelpers.today)().getFullYear()) {
        dayStyle = _extends({}, dayStyle, _datePicker2.default.todayStyle, this.props.todayStyle);
      }

      if (this.state.selectedDate && day === this.state.selectedDate.getDate() && currentDate.getMonth() === this.state.selectedDate.getMonth() && currentDate.getFullYear() === this.state.selectedDate.getFullYear()) {
        dayStyle = _extends({}, dayStyle, _datePicker2.default.selectedDayStyle, this.props.selectedDayStyle);
        ariaSelected = true;
      }

      if (this.state.focusedDateKey === dateKey) {
        dayStyle = _extends({}, dayStyle, _datePicker2.default.focusDayStyle, this.props.focusDayStyle);
        if (this.props.disabled || isDisabledDay) {
          dayStyle = _extends({}, dayStyle, _datePicker2.default.disabledFocusDayStyle, this.props.disabledFocusDayStyle);
        }
      }

      if (!this.props.disabled && !this.props.readOnly && this.state.activeDay === dateKey) {
        dayStyle = _extends({}, dayStyle, _datePicker2.default.activeDayStyle, this.props.activeDayStyle);
      }

      var renderedDay = this.props.renderDay ? this.props.renderDay(currentDate) : day;

      if (!this.props.showOtherMonthDate && isOtherMonth) {
        return _react2.default.createElement('span', _extends({
          key: 'day-' + index,
          style: dayStyle
        }, this.emptyDayProps));
      }

      if (isDisabledDay) {
        return _react2.default.createElement(
          _DisabledDay2.default,
          {
            key: 'day-' + index,
            style: dayStyle,
            dateKey: dateKey,
            onDayMouseEnter: this._onDayMouseEnter,
            onDayMouseLeave: this._onDayMouseLeave,
            disabledDayProps: this.disabledDayProps
          },
          renderedDay
        );
      }

      return _react2.default.createElement(
        _Day2.default,
        {
          key: 'day-' + index,
          dateKey: dateKey,
          onDayMouseDown: this._onDayMouseDown,
          onDayMouseUp: this._onDayMouseUp,
          onDayMouseEnter: this._onDayMouseEnter,
          onDayMouseLeave: this._onDayMouseLeave,
          onDayTouchStart: this._onDayTouchStart,
          onDayTouchEnd: this._onDayTouchEnd,
          onDayTouchCancel: this._onDayTouchCancel,
          selected: ariaSelected,
          style: dayStyle,
          dayProps: this.dayProps
        },
        renderedDay
      );
    }

    /**
     * Function will render:
     * - main calendar component
     * - call methods to render navBar and week header
     * - get array of weeks in a month and for each day in the week call method to render day
     *
     * It will apply styles sequentially according to Wrapper according to following rules:
     * 1. If component is readOnly apply readOnlyStyle
     * 2. If component is disabled apply disabledStyle
     *    - If disabled component is hovered apply disabledHoverStyle
     * 3. If component is not disabled:
     *    - If component is hovered apply hover style
     *    - If component is hovered and active apply hover + active styles
     *    - If component is hovered and focused but not active and preventFocusStyleForTouchAndClick is true apply focusStyles
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var style = _extends({}, _datePicker2.default.style, this.props.style);
      if (this.props.readOnly) {
        style = _extends({}, style, _datePicker2.default.readOnlyStyle, this.props.readOnlyStyle);
      }

      if (this.props.disabled) {
        style = _extends({}, style, _datePicker2.default.disabledStyle, this.props.disabledStyle);
      }

      if (this.preventFocusStyleForTouchAndClick && this.state.isFocused) {
        style = _extends({}, style, _datePicker2.default.focusStyle, this.props.focusStyle);
      }

      if (this.state.isActive) {
        style = _extends({}, style, _datePicker2.default.activeStyle, this.props.activeStyle);
      }

      var weekArray = (0, _dateHelpers.getWeekArrayForMonth)(this.state.month, this.state.year, this.localeData.firstDay);

      var tabIndex = !this.props.disabled ? this.props.tabIndex : false;

      return _react2.default.createElement(
        'div',
        _extends({
          tabIndex: tabIndex,
          onFocus: this._onFocus,
          onBlur: this._onBlur,
          onKeyDown: this._onKeyDown,
          onMouseDown: this._onMouseDown,
          onMouseUp: this._onMouseUp,
          onTouchStart: this._onTouchStart,
          onTouchEnd: this._onTouchEnd,
          onTouchCancel: this._onTouchCancel,
          'aria-label': this.props['aria-label'],
          'aria-disabled': this.props.disabled,
          'aria-readonly': this.props.readOnly,
          style: style,
          className: (0, _unionClassNames2.default)(this.props.className, this.pseudoStyleIds.styleId)
        }, this.wrapperProps),
        this._renderNavBar(),
        _react2.default.createElement(
          'div',
          _extends({
            role: 'grid',
            style: _datePicker2.default.weekGridStyle
          }, this.weekGridProps),
          this._renderWeekHeader(),
          (0, _helpers.map)(weekArray, function (week) {
            var weekDays = _this3.localeData.isRTL ? (0, _helpers.reverse)(week) : week;
            return (0, _helpers.map)(weekDays, function (day, dayIndex) {
              return _this3._renderDay(day, dayIndex);
            });
          })
        )
      );
    }
  }]);

  return DatePicker;
}(_react.Component);

DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = datePickerPropTypes;
DatePicker.defaultProps = {
  tabIndex: 0,
  'aria-label': 'datepicker',
  disabled: false,
  readOnly: false,
  showOtherMonthDate: true
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this._onFocus = function () {
    if (!_this4.props.disabled) {
      if (!_this4.state.isActive) {
        var newState = {
          isFocused: true
        };
        if (!_this4.state.focusedDateKey) {
          if (_this4.state.selectedDate && _this4.state.selectedDate.getMonth() === _this4.state.month && _this4.state.selectedDate.getFullYear() === _this4.state.year) {
            newState.focusedDateKey = (0, _dateHelpers.convertDateToDateKey)(_this4.state.selectedDate);
          } else if (_this4.state.month === (0, _dateHelpers.today)().getMonth() && _this4.state.year === (0, _dateHelpers.today)().getFullYear()) {
            newState.focusedDateKey = (0, _dateHelpers.getDateKey)((0, _dateHelpers.today)().getFullYear(), (0, _dateHelpers.today)().getMonth() + 1, (0, _dateHelpers.today)().getDate());
          } else {
            newState.focusedDateKey = (0, _dateHelpers.getDateKey)(_this4.state.year, _this4.state.month + 1, 1);
          }
        }

        _this4.setState(newState);
      }
    }

    if (_this4.props.onFocus) {
      _this4.props.onFocus(event);
    }
  };

  this._onBlur = function () {
    if (!_this4.props.disabled) {
      _this4.setState({
        isFocused: false,
        focusedDateKey: undefined
      });
    }

    if (_this4.props.onBlur) {
      _this4.props.onBlur(event);
    }
  };

  this._onMouseDown = function (event) {
    if (!_this4.props.disabled && event.button === 0) {
      _this4.setState({
        isActive: true
      });
    }

    if (_this4.props.onMouseDown) {
      _this4.props.onMouseDown(event);
    }
  };

  this._onMouseUp = function (event) {
    if (!_this4.props.disabled && event.button === 0) {
      _this4.setState({
        isActive: false
      });
    }

    if (_this4.props.onMouseUp) {
      _this4.props.onMouseUp(event);
    }
  };

  this._onTouchStart = function (event) {
    if (!_this4.props.disabled && event.touches.length === 1) {
      _this4.setState({
        isActive: true
      });
    }

    if (_this4.props.onTouchStart) {
      _this4.props.onTouchStart(event);
    }
  };

  this._onTouchEnd = function () {
    if (!_this4.props.disabled) {
      _this4.setState({
        isActive: false
      });
    }

    if (_this4.props.onTouchEnd) {
      _this4.props.onTouchEnd(event);
    }
  };

  this._onTouchCancel = function () {
    _this4.setState({
      isActive: false
    });

    if (_this4.props.onTouchCancel) {
      _this4.props.onTouchCancel(event);
    }
  };

  this._onKeyDown = function (event) {
    if (!_this4.props.disabled) {
      if (event.key === 'Home') {
        // Moves to the first day of the current month.
        event.preventDefault();
        _this4._focusOnTheFistDayOfTheMonth();
      } else if (event.key === 'End') {
        // Moves to the last day of the current month.
        event.preventDefault();
        var date = (0, _dateHelpers.getLastDayForMonth)(_this4.state.year, _this4.state.month);
        _this4.setState({
          focusedDateKey: (0, _dateHelpers.convertDateToDateKey)(date)
        });
      }

      if (_this4.state.focusedDateKey) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          _this4._focusOtherDay(7);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          _this4._focusOtherDay(-7);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          _this4._focusOtherDay(_this4.localeData.isRTL ? 1 : -1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          _this4._focusOtherDay(_this4.localeData.isRTL ? -1 : 1);
        } else if (event.key === 'PageUp') {
          _this4._onPageUpKeyDown(event);
        } else if (event.key === 'PageDown') {
          _this4._onPageDownKeyDown(event);
        } else if (event.key === 'Enter') {
          event.preventDefault();
          var _date = (0, _dateHelpers.getDateForDateKey)(_this4.state.focusedDateKey);
          if (_this4._isWithinMinAndMax(_date)) {
            _this4._triggerSelectDate(_date.getDate(), _date.getMonth(), _date.getFullYear());
          }
        } else if (event.key === ' ') {
          event.preventDefault();
          var _date2 = (0, _dateHelpers.getDateForDateKey)(_this4.state.focusedDateKey);
          if (_this4._isWithinMinAndMax(_date2)) {
            _this4._triggerToggleDate(_date2);
          }
        }
      } else {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          _this4._focusOnFallbackDay();
        }
      }
    }

    if (_this4.props.onKeyDown) {
      _this4.props.onKeyDown(event);
    }
  };

  this._onPageUpKeyDown = function (event) {
    // Moves to the same date in the previous month.
    event.preventDefault();

    // TODO extract this to a helper function and test various edge cases
    var date = void 0;
    var lastDayInMonth = (0, _dateHelpers.getLastDayForMonth)(_this4.state.year, _this4.state.month - 1);
    var focusedDate = (0, _dateHelpers.getDateForDateKey)(_this4.state.focusedDateKey);

    // jump from March 30 to Feb 29
    if (focusedDate.getDate() > lastDayInMonth.getDate()) {
      date = lastDayInMonth;
    } else {
      date = (0, _dateHelpers.getDateForDateKey)(_this4.state.focusedDateKey);
      date.setMonth(date.getMonth() - 1);
    }

    _this4.setState({
      focusedDateKey: (0, _dateHelpers.convertDateToDateKey)(date),
      month: date.getMonth(),
      year: date.getFullYear(),
      lastHoveredDay: undefined
    });
  };

  this._onPageDownKeyDown = function (event) {
    // Moves to the same date in the next month.
    event.preventDefault();

    // TODO extract this to a helper function and test various edge cases
    var date = void 0;
    var lastDayInMonth = (0, _dateHelpers.getLastDayForMonth)(_this4.state.year, _this4.state.month + 1);
    var focusedDate = (0, _dateHelpers.getDateForDateKey)(_this4.state.focusedDateKey);

    // Use case: Jump from Jan 31 to Feb 29
    if (focusedDate.getDate() > lastDayInMonth.getDate()) {
      date = lastDayInMonth;
    } else {
      date = (0, _dateHelpers.getDateForDateKey)(_this4.state.focusedDateKey);
      date.setMonth(date.getMonth() + 1);
    }

    _this4.setState({
      focusedDateKey: (0, _dateHelpers.convertDateToDateKey)(date),
      month: date.getMonth(),
      year: date.getFullYear(),
      lastHoveredDay: undefined
    });
  };

  this._onDayMouseDown = function (dateKey, event) {
    if (event.button === 0 && !_this4.props.disabled && !_this4.props.readOnly) {
      _this4.setState({
        activeDay: dateKey
      });
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onMouseDown) {
      _this4.props.dayProps.onMouseDown(event);
    }
  };

  this._onDayMouseUp = function (dateKey, event) {
    if (event.button === 0 && !_this4.props.disabled && !_this4.props.readOnly && _this4.state.activeDay === dateKey) {
      var date = (0, _dateHelpers.getDateForDateKey)(dateKey);
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      _this4._triggerSelectDate(day, month, year);
      _this4.setState({
        // Note: updating focusedDateKey in mouseEnter normally would be good enough,
        // but it is necessary to set on mouseUp for the following edge case:
        // A user moves the cursor over a day. Moves on with the keyboard and
        // then without moving again just pressing the mouse. In this case
        // mouseEnter did not get called again.
        focusedDateKey: dateKey,
        activeDay: undefined
      });
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onMouseUp) {
      _this4.props.dayProps.onMouseUp(event);
    }
  };

  this._onDayMouseEnter = function (dateKey, event) {
    if (!_this4.props.readOnly) {
      _this4.setState({
        focusedDateKey: dateKey
      });
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onMouseEnter) {
      _this4.props.dayProps.onMouseEnter(event);
    }
  };

  this._onDayMouseLeave = function (dateKey, event) {
    if (!_this4.props.readOnly && event.button === 0 && _this4.state.focusedDateKey === dateKey) {
      _this4.setState({
        focusedDateKey: undefined,
        lastHoveredDay: _this4.state.focusedDateKey
      });
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onMouseLeave) {
      _this4.props.dayProps.onMouseLeave(event);
    }
  };

  this._onDayTouchStart = function (dateKey, event) {
    if (!_this4.props.disabled && !_this4.props.readOnly && event.touches.length === 1) {
      _this4.setState({
        activeDay: dateKey
      });
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onTouchStart) {
      _this4.props.dayProps.onTouchStart(event);
    }
  };

  this._onDayTouchEnd = function (dateKey, event) {
    if (!_this4.props.disabled && !_this4.props.readOnly) {
      var date = (0, _dateHelpers.getDateForDateKey)(dateKey);
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      _this4._triggerSelectDate(day, month, year);
      if (_this4.state.activeDay === dateKey) {
        _this4.setState({
          activeDay: undefined
        });
      }
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onTouchEnd) {
      _this4.props.dayProps.onTouchEnd(event);
    }
  };

  this._onDayTouchCancel = function (dateKey, event) {
    _this4.setState({
      activeDay: undefined
    });

    if (_this4.props.dayProps && _this4.props.dayProps.onTouchCancel) {
      _this4.props.dayProps.onTouchCancel(event);
    }
  };

  this._onClickPrevMonth = function () {
    _this4._decreaseMonthYear();
    if (_this4.props.prevMonthNavProps && _this4.props.prevMonthNavProps.onClick) {
      _this4.props.prevMonthNavProps.onClick(event);
    }
  };

  this._onClickNextMonth = function () {
    _this4._increaseMonthYear();
    if (_this4.props.nextMonthNavProps && _this4.props.nextMonthNavProps.onClick) {
      _this4.props.nextMonthNavProps.onClick(event);
    }
  };
};

exports.default = DatePicker;