/* global jest describe beforeEach it expect */

jest.dontMock('../components/DatePicker');
jest.dontMock('../utils/inject-style');
jest.dontMock('../utils/date-helpers');
jest.dontMock('../config/i18n');

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const DatePicker = require('../components/DatePicker');
const injectStyle = require('../utils/inject-style');

describe('DatePicker', () => {
  it('should initialise props as expected', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    expect(datePicker.props.month).toBe((new Date()).getMonth() + 1);
    expect(datePicker.props.year).toBe((new Date()).getFullYear());
    expect(datePicker.props.tabIndex).toBe(0);
    expect(datePicker.props['aria-label']).toBe('datepicker');
    expect(datePicker.props.disabled).toBe(false);
    expect(datePicker.props.readOnly).toBe(false);
    expect(datePicker.props.showOtherMonthDate).toBe(true);
    expect(datePicker.props.styleWeekend).toBe(false);
  });

  it('should have undefined date value if value is not passed in props', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    expect(datePicker.state.dateValue).toBeUndefined();
  });

  it('should change date when a day is focused and enter key is pressed', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="date_picker_wrapper"/>
    );

    expect(datePicker.state.dateValue).toBeUndefined();
    const dayPickerWrapper = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker_wrapper')[0];
    TestUtils.Simulate.focus(dayPickerWrapper);
    TestUtils.Simulate.keyDown(dayPickerWrapper, {key: 'Enter'});
    expect(datePicker.state.dateValue).toBeGreaterThan(0);
  });

  it('should select / deselect date when space key is pressed', () => {
    let dateSelected;
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test" wrapperClassName="date_picker_wrapper" onUpdate={ (obj) => dateSelected = obj.value }/>
    );

    expect(datePicker.state.dateValue).toBeUndefined();
    //const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    const dayPickerWrapper = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker_wrapper')[0];
    TestUtils.Simulate.focus(dayPickerWrapper);
    TestUtils.Simulate.keyDown(dayPickerWrapper, {key: ' '});
    expect(datePicker.state.dateValue).toBeGreaterThan(0);
    //expect(dateSelected.getDay()).toBeGreaterThan(0);
    TestUtils.Simulate.keyDown(dayPickerWrapper, {key: ' '});
    expect(datePicker.state.dateValue).toBeUndefined();
    expect(dateSelected).toBeUndefined();
  });

  it('should not change date when a day is focused and enter key is pressed if component is disabled or readOnly', () => {
    const disabledDatePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test" disabled/>
    );
    expect(disabledDatePicker.state.dateValue).toBeUndefined();
    let day = TestUtils.scryRenderedDOMComponentsWithClass(disabledDatePicker, 'day_test')[8];
    TestUtils.Simulate.focus(day);
    TestUtils.Simulate.keyDown(day, {key: 'Enter'});
    expect(disabledDatePicker.state.dateValue).toBeUndefined();

    const readOnlyDatePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test" readOnly/>
    );
    expect(readOnlyDatePicker.state.dateValue).toBeUndefined();
    day = TestUtils.scryRenderedDOMComponentsWithClass(readOnlyDatePicker, 'day_test')[8];
    TestUtils.Simulate.focus(day);
    TestUtils.Simulate.keyDown(day, {key: 'Enter'});
    expect(readOnlyDatePicker.state.dateValue).toBeUndefined();
  });

  it('should change focusedDay on mouse down', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test"/>
    );

    expect(datePicker.state.focusedDay).toBeUndefined();
    const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    TestUtils.Simulate.mouseDown(day, {button: 0});
    expect(datePicker.state.focusedDay).toBeDefined();
  });

  it('should reduce focusedDay by 1 when arrowLeft is pressed', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="date_picker"/>
    );

    expect(datePicker.state.focusedDay).toBeUndefined();
    const datePickerWrapper = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    TestUtils.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDay).toBeDefined();
    const prevFocusedDay = new Date(datePicker.state.focusedDay);
    TestUtils.Simulate.keyDown(datePickerWrapper, {key: 'ArrowLeft'});
    expect(datePicker.state.focusedDay).toBeDefined();
    const nextFocusedDay = new Date(datePicker.state.focusedDay);
    prevFocusedDay.setDate(prevFocusedDay.getDate() - 1);
    expect(prevFocusedDay.getDate() === nextFocusedDay.getDate()).toBeTruthy();
  });

  it('should increase focusedDay by 1 when arrowLeft is pressed for arabic calendar', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="date_picker" locale="ar"/>
    );

    expect(datePicker.state.focusedDay).toBeUndefined();
    const datePickerWrapper = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    TestUtils.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDay).toBeDefined();
    const prevFocusedDay = new Date(datePicker.state.focusedDay);
    TestUtils.Simulate.keyDown(datePickerWrapper, {key: 'ArrowLeft'});
    expect(datePicker.state.focusedDay).toBeDefined();
    const nextFocusedDay = new Date(datePicker.state.focusedDay);
    prevFocusedDay.setDate(prevFocusedDay.getDate() + 1);
    expect(prevFocusedDay.getDate() === nextFocusedDay.getDate()).toBeTruthy();
  });

  it('should reduce focusedDay by 7 when arrowUp is pressed', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="date_picker"/>
    );

    expect(datePicker.state.focusedDay).toBeUndefined();
    const datePickerWrapper = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    TestUtils.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDay).toBeDefined();
    const prevFocusedDay = new Date(datePicker.state.focusedDay);
    TestUtils.Simulate.keyDown(datePickerWrapper, {key: 'ArrowUp'});
    expect(datePicker.state.focusedDay).toBeDefined();
    const nextFocusedDay = new Date(datePicker.state.focusedDay);
    prevFocusedDay.setDate(prevFocusedDay.getDate() - 7);
    expect(prevFocusedDay.getDate() === nextFocusedDay.getDate()).toBeTruthy();
  });

  it('should increase focusedDay by 1 when arrowRight is pressed', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="date_picker"/>
    );

    expect(datePicker.state.focusedDay).toBeUndefined();
    const datePickerWrapper = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    TestUtils.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDay).toBeDefined();
    const prevFocusedDay = new Date(datePicker.state.focusedDay);
    TestUtils.Simulate.keyDown(datePickerWrapper, {key: 'ArrowRight'});
    expect(datePicker.state.focusedDay).toBeDefined();
    const nextFocusedDay = new Date(datePicker.state.focusedDay);
    prevFocusedDay.setDate(prevFocusedDay.getDate() + 1);
    expect(prevFocusedDay.getDate() === nextFocusedDay.getDate()).toBeTruthy();
  });

  it('should reduce focusedDay by 1 when arrowRight is pressed for arabic calendar', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="date_picker" locale="ar"/>
    );

    expect(datePicker.state.focusedDay).toBeUndefined();
    const datePickerWrapper = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    TestUtils.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDay).toBeDefined();
    const prevFocusedDay = new Date(datePicker.state.focusedDay);
    TestUtils.Simulate.keyDown(datePickerWrapper, {key: 'ArrowRight'});
    expect(datePicker.state.focusedDay).toBeDefined();
    const nextFocusedDay = new Date(datePicker.state.focusedDay);
    prevFocusedDay.setDate(prevFocusedDay.getDate() - 1);
    expect(prevFocusedDay.getDate() === nextFocusedDay.getDate()).toBeTruthy();
  });

  it('should increase focusedDay by 1 when arrowRight is pressed', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="date_picker"/>
    );

    expect(datePicker.state.focusedDay).toBeUndefined();
    const datePickerWrapper = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    TestUtils.Simulate.focus(datePickerWrapper);
    expect(datePicker.state.focusedDay).toBeDefined();
    const prevFocusedDay = new Date(datePicker.state.focusedDay);
    TestUtils.Simulate.keyDown(datePickerWrapper, {key: 'ArrowDown'});
    expect(datePicker.state.focusedDay).toBeDefined();
    const nextFocusedDay = new Date(datePicker.state.focusedDay);
    prevFocusedDay.setDate(prevFocusedDay.getDate() + 7);
    expect(prevFocusedDay.getDate() === nextFocusedDay.getDate()).toBeTruthy();
  });

  it('should show days in decreasing order if RTL for locale is true', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="date_picker_day" locale="ar"/>
    );

    const datePickerDays = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker_day');
    let firstDate = new Date(datePickerDays[0]._reactInternalInstance._currentElement.ref);
    firstDate.setDate(firstDate.getDate() - 1);
    const secondDate = new Date(datePickerDays[1]._reactInternalInstance._currentElement.ref);
    expect(firstDate.getDate() === secondDate.getDate()).toBeTruthy();
  });

  it('should show friday as first day of week according to locale data', () => {
    const datePickerAr = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="date_picker_day" locale="ar"/>
    );
    let datePickerDays = TestUtils.scryRenderedDOMComponentsWithClass(datePickerAr, 'date_picker_day');
    let firstDate = new Date(datePickerDays[0]._reactInternalInstance._currentElement.ref);
    expect(firstDate.getDay() + 1).toBe(6);

    const datePickerHe = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="date_picker_day" locale="he"/>
    );
    datePickerDays = TestUtils.scryRenderedDOMComponentsWithClass(datePickerHe, 'date_picker_day');
    firstDate = new Date(datePickerDays[0]._reactInternalInstance._currentElement.ref);
    expect(6 - firstDate.getDay()).toBe(0);
  });

  it('should change dateValue when a day receives mouseDown with button 0', () => {
    let dateSelected;
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test" onUpdate={ (obj) => dateSelected = obj.value }/>
    );

    expect(datePicker.state.dateValue).toBeUndefined();
    let day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    TestUtils.Simulate.focus(day);
    TestUtils.Simulate.mouseDown(day, {button: 0});
    const newDate = datePicker.state.dateValue;
    expect(datePicker.state.dateValue).toBeGreaterThan(0);
    expect(dateSelected.getDay()).toBeGreaterThan(0);
    day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[10];
    TestUtils.Simulate.mouseDown(day, {button: 1});
    expect(datePicker.state.dateValue).toBe(newDate);
  });

  it('should not change dateValue in state if component uses value property', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test" value={ undefined }/>
    );

    expect(datePicker.state.dateValue).toBeUndefined();
    const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    TestUtils.Simulate.focus(day);
    TestUtils.Simulate.mouseDown(day, {button: 0});
    expect(datePicker.state.dateValue).toBeUndefined();
  });


  it('should not change dateValue in state if component uses valueLink property', () => {
    const compDateValue = new Date();
    const valueLink = {
      value: compDateValue,
      requestChange: () => {
        //compDateValue = newValue;
      }
    };

    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test" valueLink={ valueLink }/>
    );

    expect(datePicker.state.dateValue).toBe(compDateValue);
    const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    TestUtils.Simulate.focus(day);
    TestUtils.Simulate.mouseDown(day, {button: 0});
    expect(datePicker.state.dateValue).toBe(compDateValue);
  });

  it('should call function updatePseudoClassStyle when component is created', () => {
    DatePicker.updatePseudoClassStyle = jest.genMockFunction();
    injectStyle.removeAllStyles = jest.genMockFunction();
    TestUtils.renderIntoDocument(
      <DatePicker />
    );
    expect(DatePicker.updatePseudoClassStyle.mock.calls.length).toBe(1);
    expect(DatePicker.updatePseudoClassStyle.mock.calls[0][0].wrapperStyleId).toBeDefined();
    expect(DatePicker.updatePseudoClassStyle.mock.calls[0][0].prevMonthNavStyleId).toBeDefined();
    expect(DatePicker.updatePseudoClassStyle.mock.calls[0][0].nextMonthNavStyleId).toBeDefined();
  });

  it('should call function removeAllStyles when component will unmount', () => {
    DatePicker.updatePseudoClassStyle = jest.genMockFunction();
    injectStyle.removeAllStyles = jest.genMockFunction();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    datePicker.componentWillUnmount();
    expect(injectStyle.removeAllStyles.mock.calls.length).toBe(1);
  });

  it('should update state.dateValue when value is received in props', () => {
    const currentDate = new Date();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker/>
    );
    expect(datePicker.state.dateValue).toBeUndefined();
    datePicker.componentWillReceiveProps({value: currentDate});
    expect(datePicker.state.dateValue).toBe(currentDate);
  });

  it('should update state.dateValue when valueLink is received in props', () => {
    const currentDate = new Date();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker/>
    );
    let compDateValue = currentDate;
    const valueLink = {
      value: compDateValue,
      requestChange: (newValue) => {
        compDateValue = newValue;
      }
    };
    expect(datePicker.state.dateValue).toBeUndefined();
    datePicker.componentWillReceiveProps({valueLink: valueLink});
    expect(datePicker.state.dateValue).toBe(currentDate);
  });

  it('should not update state.dateValue when defaultValue is received in props', () => {
    const currentDate = new Date();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker defaultValue={ undefined }/>
    );
    expect(datePicker.state.dateValue).toBeUndefined();
    datePicker.componentWillReceiveProps({defaultValue: currentDate});
    expect(datePicker.state.dateValue).toBeUndefined();
  });

  it('should set isWrapperFocused to true when wrapper receives focus and to false on blur', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="wrapper_test"/>
    );
    const wrapper = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'wrapper_test');
    TestUtils.Simulate.focus(wrapper);
    expect(datePicker.state.isWrapperFocused).toBeTruthy();
    TestUtils.Simulate.blur(wrapper);
    expect(datePicker.state.isWrapperFocused).toBeFalsy();
  });

  it('should not set isWrapperFocused to true when wrapper receives focus btu component is disabled', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="wrapper_test" disabled/>
    );
    const wrapper = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'wrapper_test');
    TestUtils.Simulate.focus(wrapper);
    expect(datePicker.state.isWrapperFocused).toBeFalsy();
  });

  it('should not set isWrapperFocused to true when wrapper receives focus but is active', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="wrapper_test"/>
    );
    const wrapper = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'wrapper_test');
    TestUtils.Simulate.mouseDown(wrapper, {button: 0});
    expect(datePicker.state.isWrapperActive).toBeTruthy();
    TestUtils.Simulate.focus(wrapper);
    expect(datePicker.state.isWrapperFocused).toBeFalsy();
  });

  it('should not set isWrapperActive to true when touch starts and reset when touch ends', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="wrapper_test"/>
    );
    const wrapper = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'wrapper_test');
    TestUtils.Simulate.touchStart(wrapper, {touches: {length: 1}});
    expect(datePicker.state.isWrapperActive).toBeTruthy();
    TestUtils.Simulate.touchEnd(wrapper);
    expect(datePicker.state.isWrapperActive).toBeFalsy();
  });

  it('should set isWrapperHovered on mouse over for all components including disabled and readOnly', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="wrapper_test"/>
    );
    const wrapper = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'wrapper_test');
    TestUtils.Simulate.mouseOver(wrapper);
    expect(datePicker.state.isWrapperHovered).toBeTruthy();
    TestUtils.Simulate.mouseOut(wrapper);
    expect(datePicker.state.isWrapperHovered).toBeFalsy();

    const disabledDatePicker = TestUtils.renderIntoDocument(
      <DatePicker disabled dayClassName="day_test" wrapperClassName="wrapper_test"/>
    );
    const disabledWrapper = TestUtils.findRenderedDOMComponentWithClass(disabledDatePicker, 'wrapper_test');
    TestUtils.Simulate.mouseOver(disabledWrapper);
    expect(disabledDatePicker.state.isWrapperHovered).toBeTruthy();
    TestUtils.Simulate.mouseOut(disabledWrapper);
    expect(disabledDatePicker.state.isWrapperHovered).toBeFalsy();

    const readOnlyDatePicker = TestUtils.renderIntoDocument(
      <DatePicker readOnly dayClassName="day_test" wrapperClassName="wrapper_test"/>
    );
    const readOnlyWrapper = TestUtils.findRenderedDOMComponentWithClass(readOnlyDatePicker, 'wrapper_test');
    TestUtils.Simulate.mouseOver(readOnlyWrapper);
    expect(readOnlyDatePicker.state.isWrapperHovered).toBeTruthy();
    TestUtils.Simulate.mouseOut(readOnlyWrapper);
    expect(readOnlyDatePicker.state.isWrapperHovered).toBeFalsy();
  });

  it('should not focus day on disabled component', () => {
    const disabledDatePicker = TestUtils.renderIntoDocument(
      <DatePicker disabled dayClassName="day_test"/>
    );
    expect(disabledDatePicker.state.focusedDay).toBeUndefined();
    const day = TestUtils.scryRenderedDOMComponentsWithClass(disabledDatePicker, 'day_test')[8];
    TestUtils.Simulate.focus(day);
    expect(disabledDatePicker.state.focusedDay).toBeUndefined();
  });

  it('should focus readOnly component', () => {
    const readOnlyDatePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="date_picker" readOnly dayClassName="day_test"/>
    );
    expect(readOnlyDatePicker.state.focusedDay).toBeUndefined();
    const datePicker = TestUtils.scryRenderedDOMComponentsWithClass(readOnlyDatePicker, 'date_picker')[0];
    TestUtils.Simulate.focus(datePicker);
    expect(readOnlyDatePicker.state.isWrapperFocused).toBeTruthy();
  });

  it('should decrease month when prevMonthNav is clicked', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker prevMonthNavClassName="prev_month"/>
    );
    const month = datePicker.state.month > 1 ? datePicker.state.month : 13;
    const prevMonth = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'prev_month')[0];
    TestUtils.Simulate.mouseDown(prevMonth, {button: 0});
    expect(datePicker.state.month).toBe(month - 1);
  });

  it('should increase month when nextMonthNav is clicked', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker nextMonthNavClassName="next_month"/>
    );
    const month = datePicker.state.month > 1 ? datePicker.state.month : 13;
    const nextMonth = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'next_month')[0];
    TestUtils.Simulate.mouseDown(nextMonth, {button: 0});
    expect(datePicker.state.month).toBe(month + 1);
  });

  it('should set activeDay when touch starts on a day and reset when touch ends', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test"/>
    );
    const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    expect(datePicker.state.activeDay).toBeFalsy();
    TestUtils.Simulate.touchStart(day, {touches: {length: 1}});
    expect(datePicker.state.activeDay).toBeTruthy();
    TestUtils.Simulate.touchEnd(day, {touches: {length: 1}});
    expect(datePicker.state.activeDay).toBeFalsy();
  });

  it('should apply hover styles to wrapper when mouse is over', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperClassName="wrapper_test" hoverWrapperStyle={ {backgroundColor: 'red'} }/>
    );
    const wrapper = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'wrapper_test');
    TestUtils.Simulate.mouseOver(wrapper);
    expect(datePicker.state.isWrapperHovered).toBeTruthy();
    expect(wrapper.props.style.backgroundColor).toBe('red');
    TestUtils.Simulate.mouseOut(wrapper);
    expect(datePicker.state.isWrapperHovered).toBeFalsy();
  });

  it('should apply activeDayStyle to day when touchStart but immediately after touchEnd should apply selectedDayStyle', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker activeDayStyle={ {color: 'blue'} } selectedDayStyle={ {color: 'red'} } dayClassName="day_test"/>
    );
    expect(datePicker.state.dateValue).toBeUndefined();
    const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    TestUtils.Simulate.touchStart(day, {touches: {length: 1}});
    expect(datePicker.state.dateValue.getDay()).toBeGreaterThan(0);
    expect(day.props.style.color).toBe('blue');
    TestUtils.Simulate.touchEnd(day, {touches: {length: 1}});
    expect(day.props.style.color).toBe('red');
  });

  it('should not apply focusDayStyles for mouseDown wrapper', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker wrapperStyle={ {fontSize: '10px'} } focusWrapperStyle={ {fontSize: '5px'} } activeWrapperStyle={ {backgroundColor: 'blue'} } wrapperClassName="date_picker"/>
    );
    const picker = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'date_picker')[0];
    TestUtils.Simulate.mouseDown(picker, {button: 0});
    expect(picker.props.style.backgroundColor).toBe('blue');
    expect(picker.props.style.fontSize).toBe('10px');
    TestUtils.Simulate.mouseUp(picker, {button: 0});
    expect(picker.props.style.backgroundColor === 'blue').toBeFalsy();
  });

  it('should apply focusDayStyles for mouseDown by on day', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker focusDayStyle={ {fontSize: '5px'} } activeDayStyle={ {backgroundColor: 'blue'} } dayClassName="day_test"/>
    );
    const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    TestUtils.Simulate.mouseDown(day, {button: 0});
    expect(datePicker.state.dateValue.getDay()).toBeGreaterThan(0);
    expect(day.props.style.backgroundColor).toBe('blue');
    expect(day.props.style.fontSize).toBe('5px');
    TestUtils.Simulate.mouseUp(day, {button: 0});
    expect(day.props.style.backgroundColor === 'blue').toBeFalsy();
  });
});
