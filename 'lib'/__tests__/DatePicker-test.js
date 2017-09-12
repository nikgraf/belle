'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest describe beforeEach it expect */

jest.dontMock('../components/ActionArea');
jest.dontMock('../components/DatePicker');
jest.dontMock('../components/DisabledDay');
jest.dontMock('../components/Day');
jest.dontMock('../utils/inject-style');
jest.dontMock('../utils/date-helpers');
jest.dontMock('../config/i18n');
jest.dontMock('../style/date-picker');

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
var DatePicker = require('../components/DatePicker').default;
var injectStyle = require('../utils/inject-style');

describe('DatePicker', function () {
  it('should initialise props as expected', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, null));
    expect(datePicker.props.tabIndex).toBe(0);
    expect(datePicker.props['aria-label']).toBe('datepicker');
    expect(datePicker.props.disabled).toBe(false);
    expect(datePicker.props.readOnly).toBe(false);
    expect(datePicker.props.showOtherMonthDate).toBe(true);
  });

  it('should have undefined date value if value is not passed in props', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, null));
    expect(datePicker.state.selectedDate).toBeUndefined();
  });

  it('should change date when a day is focused and enter key is pressed', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'date_picker_wrapper' }));

    expect(datePicker.state.selectedDate).toBeUndefined();
    var dayPickerWrapper = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker_wrapper')[0];
    _reactAddonsTestUtils2.default.Simulate.focus(dayPickerWrapper);
    _reactAddonsTestUtils2.default.Simulate.keyDown(dayPickerWrapper, { key: 'Enter' });
    expect(+datePicker.state.selectedDate).toBeGreaterThan(0);
  });

  describe('injecting styles', function () {
    beforeEach(function () {
      injectStyle.injectStyles = jest.genMockFunction();
    });

    it('should inject styles for hover, active & foucs', function () {
      _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, null));

      expect(injectStyle.injectStyles.mock.calls.length).toBe(1);
      var styles = injectStyle.injectStyles.mock.calls[0][0];
      expect(styles[0].id).toContain('prevMonthNav-style-id');
      expect(styles[1].id).toContain('nextMonthNav-style-id');
      expect(styles[2].id).toContain('wrapper-style-id');
    });
  });

  it('should select / deselect date when space key is pressed', function () {
    var dateSelected = void 0;
    var onUpdate = function onUpdate(obj) {
      dateSelected = obj.value;
    };

    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, {
      onUpdate: onUpdate,
      className: 'date_picker_wrapper'
    }));

    expect(datePicker.state.selectedDate).toBeUndefined();

    // const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    var dayPickerWrapper = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker_wrapper')[0];
    _reactAddonsTestUtils2.default.Simulate.focus(dayPickerWrapper);
    _reactAddonsTestUtils2.default.Simulate.keyDown(dayPickerWrapper, { key: ' ' });
    expect(+datePicker.state.selectedDate).toBeGreaterThan(0);
    expect(+dateSelected).toBeGreaterThan(0);

    // expect(dateSelected.getDay()).toBeGreaterThan(0);
    _reactAddonsTestUtils2.default.Simulate.keyDown(dayPickerWrapper, { key: ' ' });
    expect(datePicker.state.selectedDate).toBeUndefined();
    expect(dateSelected).toBeUndefined();
  });

  it('should not change date when a day is focused and enter key is pressed if component is disabled or readOnly', function () {
    var disabledDatePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { dayProps: { className: 'day_test' }, disabled: true }));
    expect(disabledDatePicker.state.selectedDate).toBeUndefined();
    var day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(disabledDatePicker, 'day_test')[8];
    _reactAddonsTestUtils2.default.Simulate.focus(day);
    _reactAddonsTestUtils2.default.Simulate.keyDown(day, { key: 'Enter' });
    expect(disabledDatePicker.state.selectedDate).toBeUndefined();

    var readOnlyDatePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { dayProps: { className: 'day_test' }, readOnly: true }));
    expect(readOnlyDatePicker.state.selectedDate).toBeUndefined();
    day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(readOnlyDatePicker, 'day_test')[8];
    _reactAddonsTestUtils2.default.Simulate.focus(day);
    _reactAddonsTestUtils2.default.Simulate.keyDown(day, { key: 'Enter' });
    expect(readOnlyDatePicker.state.selectedDate).toBeUndefined();
  });

  it('should change focusedDateKey on mouse down + up', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { dayProps: { className: 'day_test' } }));

    expect(datePicker.state.focusedDateKey).toBeUndefined();
    var day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    _reactAddonsTestUtils2.default.Simulate.mouseDown(day, { button: 0 });
    _reactAddonsTestUtils2.default.Simulate.mouseUp(day, { button: 0 });
    expect(datePicker.state.focusedDateKey).toBeDefined();
  });

  it('should reduce focusedDateKey by 1 when arrowLeft is pressed', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'date_picker' }));

    expect(datePicker.state.focusedDateKey).toBeUndefined();
    var datePickerWrapper = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    _reactAddonsTestUtils2.default.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var prevFocusedDate = new Date(datePicker.state.focusedDateKey);
    _reactAddonsTestUtils2.default.Simulate.keyDown(datePickerWrapper, { key: 'ArrowLeft' });
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var nextFocusedDate = new Date(datePicker.state.focusedDateKey);
    prevFocusedDate.setDate(prevFocusedDate.getDate() - 1);
    expect(prevFocusedDate.getDate() === nextFocusedDate.getDate()).toBeTruthy();
  });

  it('should increase focusedDateKey by 1 when arrowLeft is pressed for arabic calendar', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'date_picker', locale: 'ar' }));

    expect(datePicker.state.focusedDateKey).toBeUndefined();
    var datePickerWrapper = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    _reactAddonsTestUtils2.default.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var prevFocusedDate = new Date(datePicker.state.focusedDateKey);
    _reactAddonsTestUtils2.default.Simulate.keyDown(datePickerWrapper, { key: 'ArrowLeft' });
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var nextFocusedDate = new Date(datePicker.state.focusedDateKey);
    prevFocusedDate.setDate(prevFocusedDate.getDate() + 1);
    expect(prevFocusedDate.getDate() === nextFocusedDate.getDate()).toBeTruthy();
  });

  it('should reduce focusedDateKey by 7 when arrowUp is pressed', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'date_picker' }));

    expect(datePicker.state.focusedDateKey).toBeUndefined();
    var datePickerWrapper = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    _reactAddonsTestUtils2.default.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var prevFocusedDate = new Date(datePicker.state.focusedDateKey);
    _reactAddonsTestUtils2.default.Simulate.keyDown(datePickerWrapper, { key: 'ArrowUp' });
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var nextFocusedDate = new Date(datePicker.state.focusedDateKey);
    prevFocusedDate.setDate(prevFocusedDate.getDate() - 7);
    expect(prevFocusedDate.getDate() === nextFocusedDate.getDate()).toBeTruthy();
  });

  it('should increase focusedDateKey by 1 when arrowRight is pressed', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'date_picker' }));

    expect(datePicker.state.focusedDateKey).toBeUndefined();
    var datePickerWrapper = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    _reactAddonsTestUtils2.default.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var prevFocusedDate = new Date(datePicker.state.focusedDateKey);
    _reactAddonsTestUtils2.default.Simulate.keyDown(datePickerWrapper, { key: 'ArrowRight' });
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var nextFocusedDate = new Date(datePicker.state.focusedDateKey);
    prevFocusedDate.setDate(prevFocusedDate.getDate() + 1);
    expect(prevFocusedDate.getDate() === nextFocusedDate.getDate()).toBeTruthy();
  });

  it('should reduce focusedDateKey by 1 when arrowRight is pressed for arabic calendar', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'date_picker', locale: 'ar' }));

    expect(datePicker.state.focusedDateKey).toBeUndefined();
    var datePickerWrapper = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    _reactAddonsTestUtils2.default.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var prevFocusedDate = new Date(datePicker.state.focusedDateKey);
    _reactAddonsTestUtils2.default.Simulate.keyDown(datePickerWrapper, { key: 'ArrowRight' });
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var nextFocusedDate = new Date(datePicker.state.focusedDateKey);
    prevFocusedDate.setDate(prevFocusedDate.getDate() - 1);
    expect(prevFocusedDate.getDate() === nextFocusedDate.getDate()).toBeTruthy();
  });

  it('should increase focusedDateKey by 1 when arrowRight is pressed', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'date_picker' }));

    expect(datePicker.state.focusedDateKey).toBeUndefined();
    var datePickerWrapper = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    _reactAddonsTestUtils2.default.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var prevFocusedDate = new Date(datePicker.state.focusedDateKey);
    _reactAddonsTestUtils2.default.Simulate.keyDown(datePickerWrapper, { key: 'ArrowDown' });
    expect(datePicker.state.focusedDateKey).toBeDefined();
    var nextFocusedDate = new Date(datePicker.state.focusedDateKey);
    prevFocusedDate.setDate(prevFocusedDate.getDate() + 7);
    expect(prevFocusedDate.getDate() === nextFocusedDate.getDate()).toBeTruthy();
  });

  it('should show days in decreasing order if RTL for locale is true', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { dayProps: { className: 'date_picker_day' }, locale: 'ar' }));

    var datePickerDays = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker_day');
    var firstDay = _reactDom2.default.findDOMNode(datePickerDays[0]).textContent;
    var secondDay = _reactDom2.default.findDOMNode(datePickerDays[1]).textContent;
    expect(+firstDay).toBeGreaterThan(+secondDay);
  });

  it('should change selectedDate when a day receives mouseDown with button 0', function () {
    var dateSelected = void 0;
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { dayProps: { className: 'day_test' }, onUpdate: function onUpdate(obj) {
        dateSelected = obj.value;
      } }));

    expect(datePicker.state.selectedDate).toBeUndefined();
    var day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    _reactAddonsTestUtils2.default.Simulate.focus(day);
    _reactAddonsTestUtils2.default.Simulate.mouseDown(day, { button: 0 });
    _reactAddonsTestUtils2.default.Simulate.mouseUp(day, { button: 0 });
    var newDate = datePicker.state.selectedDate;
    expect(+datePicker.state.selectedDate).toBeGreaterThan(0);
    expect(dateSelected.getDay()).toBeGreaterThan(0);
    day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[10];
    _reactAddonsTestUtils2.default.Simulate.mouseDown(day, { button: 1 });
    _reactAddonsTestUtils2.default.Simulate.mouseUp(day, { button: 1 });
    expect(+datePicker.state.selectedDate).toBe(+newDate);
  });

  it('should not change selectedDate in state if component uses value property', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { dayProps: { className: 'day_test' }, value: undefined }));

    expect(datePicker.state.selectedDate).toBeUndefined();
    var day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    _reactAddonsTestUtils2.default.Simulate.focus(day);
    _reactAddonsTestUtils2.default.Simulate.mouseDown(day, { button: 0 });
    expect(datePicker.state.selectedDate).toBeUndefined();
  });

  it('should not change selectedDate in state if component uses valueLink property', function () {
    var compSelectedDate = new Date();
    var valueLink = {
      value: compSelectedDate,
      requestChange: function requestChange() {
        // compSelectedDate = newValue;
      }
    };

    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { dayProps: { className: 'day_test' }, valueLink: valueLink }));

    expect(datePicker.state.selectedDate).toBe(compSelectedDate);
    var day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    _reactAddonsTestUtils2.default.Simulate.focus(day);
    _reactAddonsTestUtils2.default.Simulate.mouseDown(day, { button: 0 });
    expect(datePicker.state.selectedDate.getTime()).toBe(compSelectedDate.getTime());
  });

  it('should call function removeAllStyles when component will unmount', function () {
    DatePicker.updatePseudoClassStyle = jest.genMockFunction();
    injectStyle.removeAllStyles = jest.genMockFunction();
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, null));
    datePicker.componentWillUnmount();
    expect(injectStyle.removeAllStyles.mock.calls.length).toBe(1);
  });

  it('should update state.selectedDate when value is received in props', function () {
    var currentDate = new Date();
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, null));
    expect(datePicker.state.selectedDate).toBeUndefined();
    datePicker.componentWillReceiveProps({ value: currentDate });
    expect(datePicker.state.selectedDate.getTime()).toBe(currentDate.getTime());
  });

  it('should update state.selectedDate when valueLink is received in props', function () {
    var currentDate = new Date();
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, null));
    var compSelectedDate = currentDate;
    var valueLink = {
      value: compSelectedDate,
      requestChange: function requestChange(newValue) {
        compSelectedDate = newValue;
      }
    };
    expect(datePicker.state.selectedDate).toBeUndefined();
    datePicker.componentWillReceiveProps({ valueLink: valueLink });
    expect(datePicker.state.selectedDate.getTime()).toBe(currentDate.getTime());
  });

  it('should not update state.selectedDate when defaultValue is received in props', function () {
    var currentDate = new Date();
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { defaultValue: undefined }));
    expect(datePicker.state.selectedDate).toBeUndefined();
    datePicker.componentWillReceiveProps({ defaultValue: currentDate });
    expect(datePicker.state.selectedDate).toBeUndefined();
  });

  it('should set isFocused to true when wrapper receives focus and to false on blur', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'wrapper_test' }));
    var wrapper = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(datePicker, 'wrapper_test');
    _reactAddonsTestUtils2.default.Simulate.focus(wrapper);
    expect(datePicker.state.isFocused).toBeTruthy();
    _reactAddonsTestUtils2.default.Simulate.blur(wrapper);
    expect(datePicker.state.isFocused).toBeFalsy();
  });

  it('should not set isFocused to true when wrapper receives focus btu component is disabled', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'wrapper_test', disabled: true }));
    var wrapper = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(datePicker, 'wrapper_test');
    _reactAddonsTestUtils2.default.Simulate.focus(wrapper);
    expect(datePicker.state.isFocused).toBeFalsy();
  });

  it('should not set isFocused to true when wrapper receives focus but is active', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'wrapper_test' }));
    var wrapper = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(datePicker, 'wrapper_test');
    _reactAddonsTestUtils2.default.Simulate.mouseDown(wrapper, { button: 0 });
    expect(datePicker.state.isActive).toBeTruthy();
    _reactAddonsTestUtils2.default.Simulate.focus(wrapper);
    expect(datePicker.state.isFocused).toBeFalsy();
  });

  it('should not set isActive to true when touch starts and reset when touch ends', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'wrapper_test' }));
    var wrapper = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(datePicker, 'wrapper_test');
    _reactAddonsTestUtils2.default.Simulate.touchStart(wrapper, { touches: { length: 1 } });
    expect(datePicker.state.isActive).toBeTruthy();
    _reactAddonsTestUtils2.default.Simulate.touchEnd(wrapper);
    expect(datePicker.state.isActive).toBeFalsy();
  });

  it('should not focus day on disabled component', function () {
    var disabledDatePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { disabled: true, dayProps: { className: 'day_test' } }));
    expect(disabledDatePicker.state.focusedDateKey).toBeUndefined();
    var day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(disabledDatePicker, 'day_test')[8];
    _reactAddonsTestUtils2.default.Simulate.focus(day);
    expect(disabledDatePicker.state.focusedDateKey).toBeUndefined();
  });

  it('should focus readOnly component', function () {
    var readOnlyDatePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { className: 'date_picker', readOnly: true, dayProps: { className: 'day_test' } }));
    expect(readOnlyDatePicker.state.focusedDateKey).toBeUndefined();
    var datePicker = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(readOnlyDatePicker, 'date_picker')[0];
    _reactAddonsTestUtils2.default.Simulate.focus(datePicker);
    expect(readOnlyDatePicker.state.isFocused).toBeTruthy();
  });

  it('should decrease month when prevMonthNav is clicked', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { prevMonthNavProps: { className: 'prev_month' } }));
    datePicker.state.month = 5;
    var prevMonth = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'prev_month')[0];
    _reactAddonsTestUtils2.default.Simulate.click(prevMonth);
    expect(datePicker.state.month).toBe(4);
  });

  it('should increase month when nextMonthNav is clicked', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { nextMonthNavProps: { className: 'next_month' } }));
    datePicker.state.month = 5;
    var nextMonth = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'next_month')[0];
    _reactAddonsTestUtils2.default.Simulate.click(nextMonth);
    expect(datePicker.state.month).toBe(6);
  });

  it('should set activeDay when touch starts on a day and reset when touch ends', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, { dayProps: { className: 'day_test' } }));
    var day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    expect(datePicker.state.activeDay).toBeFalsy();
    _reactAddonsTestUtils2.default.Simulate.touchStart(day, { touches: { length: 1 } });
    expect(datePicker.state.activeDay).toBeTruthy();
    _reactAddonsTestUtils2.default.Simulate.touchEnd(day, { touches: { length: 1 } });
    expect(datePicker.state.activeDay).toBeFalsy();
  });

  it('should apply activeDayStyle to day when touchStart but immediately after touchEnd should apply selectedDayStyle', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, {
      activeDayStyle: { color: 'blue' },
      selectedDayStyle: { color: 'red' },
      dayProps: { className: 'day_test' }
    }));
    expect(datePicker.state.selectedDate).toBeUndefined();
    var day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    _reactAddonsTestUtils2.default.Simulate.touchStart(day, { touches: { length: 1 } });
    expect(datePicker.state.activeDay).toBeDefined();
    expect(datePicker.state.selectedDate).toBeUndefined();
    expect(day.getAttribute('style')).toContain('color: blue');
    _reactAddonsTestUtils2.default.Simulate.touchEnd(day, { touches: { length: 1 } });
    expect(datePicker.state.activeDay).toBeUndefined();
    expect(datePicker.state.selectedDate).toBeDefined();
    expect(day.getAttribute('style')).toContain('color: red');
  });

  it('should not apply focusDayStyles for mouseUp wrapper', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, {
      style: { fontSize: '10px' },
      focusStyle: { fontSize: '5px' },
      activeStyle: { backgroundColor: 'blue' },
      className: 'date_picker'
    }));
    var picker = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    _reactAddonsTestUtils2.default.Simulate.mouseDown(picker, { button: 0 });
    expect(picker.getAttribute('style')).toContain('background-color: blue');
    expect(picker.getAttribute('style')).toContain('font-size: 10px');
    _reactAddonsTestUtils2.default.Simulate.mouseUp(picker, { button: 0 });
    expect(picker.getAttribute('style')).not.toContain('background-color: blue');
  });

  it('should apply focusDayStyles for mouseUp by on day', function () {
    var datePicker = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(DatePicker, {
      focusDayStyle: { fontSize: '5px' },
      activeDayStyle: { backgroundColor: 'blue' },
      dayProps: { className: 'day_test' }
    }));
    var day = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    _reactAddonsTestUtils2.default.Simulate.mouseDown(day, { button: 0 });
    expect(datePicker.state.activeDay).toBeDefined();
    expect(datePicker.state.selectedDate).toBeUndefined();
    expect(day.getAttribute('style')).toContain('background-color: blue');
    _reactAddonsTestUtils2.default.Simulate.mouseUp(day, { button: 0 });
    expect(datePicker.state.activeDay).toBeUndefined();
    expect(datePicker.state.selectedDate).toBeDefined();
    expect(day.getAttribute('style')).toContain('font-size: 5px');
    expect(day.getAttribute('style')).not.toContain('background-color: blue');
  });
});