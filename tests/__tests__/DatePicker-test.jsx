/*global jest describe beforeEach it expect */

jest.dontMock('../lib/components/DatePicker');
jest.dontMock('../lib/utils/inject-style');

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const DatePicker = require('../lib/components/DatePicker');
const injectStyle = require('../lib/utils/inject-style');

describe('DatePicker', () => {
  it('should initialise current month and year in props', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    expect(datePicker.props.month).toBe((new Date()).getMonth() + 1);
    expect(datePicker.props.year).toBe((new Date()).getFullYear());
    expect(datePicker.state.dateValue).toBeUndefined();
  });

  it('should decrease month when left nav is focused and enter is pressed', () => {
    let componentMonth;
    const currentMonth = (new Date()).getMonth();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker leftNavClassName="left_nav_test" onMonthChange={ (newMonth) => componentMonth = newMonth }/>
    );

    expect(datePicker.props.month).toBe(currentMonth + 1);
    expect(datePicker.state.month).toBe(currentMonth);
    const leftNav = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'left_nav_test');
    TestUtils.Simulate.focus(leftNav);
    TestUtils.Simulate.keyDown(leftNav, {key: 'Enter'});
    expect(componentMonth).toBe(currentMonth);
    expect(datePicker.state.month).toBe(currentMonth - 1);
  });

  it('should increase month when right nav is focused and enter is pressed', () => {
    let componentMonth;
    const currentMonth = (new Date()).getMonth();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker rightNavClassName="right_nav_test" onMonthChange={ (newMonth) => componentMonth = newMonth }/>
    );

    expect(datePicker.props.month).toBe(currentMonth + 1);
    expect(datePicker.state.month).toBe(currentMonth);
    const rightNav = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'right_nav_test');
    TestUtils.Simulate.focus(rightNav);
    TestUtils.Simulate.keyDown(rightNav, {key: 'Enter'});
    expect(componentMonth).toBe(currentMonth + 2);
    expect(datePicker.state.month).toBe(currentMonth + 1);
  });

  it('should change date when a day is focused and enter key is pressed', () => {
    let dateSelected;
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test" onUpdate={ (obj) => dateSelected = obj.value }/>
    );

    expect(datePicker.state.dateValue).toBeUndefined();
    const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    TestUtils.Simulate.focus(day);
    TestUtils.Simulate.keyDown(day, {key: 'Enter'});
    expect(datePicker.state.dateValue).toBeGreaterThan(0);
    expect(dateSelected.getDay()).toBeGreaterThan(0);
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

  it('should component date should change when a day receives mouseDown with button 0', () => {
    let dateSelected;
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test" onUpdate={ (obj) => dateSelected = obj.value }/>
    );

    expect(datePicker.state.dateValue).toBeUndefined();
    const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    TestUtils.Simulate.focus(day);
    TestUtils.Simulate.mouseDown(day, {button: 0});
    const newDate = datePicker.state.dateValue;
    expect(datePicker.state.dateValue).toBeGreaterThan(0);
    expect(dateSelected.getDay()).toBeGreaterThan(0);
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

  it('should focus next day when a day s focused and component receives rightArrow key press', () => {
    DatePicker.updatePseudoClassStyle = jest.genMockFunction();
    injectStyle.removeAllStyles = jest.genMockFunction();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    expect(DatePicker.updatePseudoClassStyle.mock.calls.length).toBe(1);
    expect(DatePicker.updatePseudoClassStyle.mock.calls[0][0].wrapperStyleId).toBeDefined();
    expect(DatePicker.updatePseudoClassStyle.mock.calls[0][0].navBarStyleId).toBeDefined();
    expect(DatePicker.updatePseudoClassStyle.mock.calls[0][0].leftNavStyleId).toBeDefined();
    expect(DatePicker.updatePseudoClassStyle.mock.calls[0][0].rightNavStyleId).toBeDefined();
    expect(DatePicker.updatePseudoClassStyle.mock.calls[0][0].monthLblStyleId).toBeDefined();
    expect(DatePicker.updatePseudoClassStyle.mock.calls[0][0].dayLblStyleId).toBeDefined();
    expect(DatePicker.updatePseudoClassStyle.mock.calls[0][0].dayStyleId).toBeDefined();
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

  it('should not focus day on disabled or readOnly component', () => {
    const disabledDatePicker = TestUtils.renderIntoDocument(
      <DatePicker disabled dayClassName="day_test"/>
    );
    expect(disabledDatePicker.state.focusedDay).toBeUndefined();
    let day = TestUtils.scryRenderedDOMComponentsWithClass(disabledDatePicker, 'day_test')[8];
    TestUtils.Simulate.focus(day);
    expect(disabledDatePicker.state.focusedDay).toBeUndefined();

    const readOnlyDatePicker = TestUtils.renderIntoDocument(
      <DatePicker readOnly dayClassName="day_test"/>
    );
    expect(disabledDatePicker.state.focusedDay).toBeUndefined();
    day = TestUtils.scryRenderedDOMComponentsWithClass(readOnlyDatePicker, 'day_test')[8];
    TestUtils.Simulate.focus(day);
    expect(readOnlyDatePicker.state.focusedDay).toBeUndefined();
  });

  it('should not set activeDay when touch starts on a day and reset when touch ends', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker dayClassName="day_test"/>
    );
    const day = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'day_test')[8];
    TestUtils.Simulate.touchStart(day, {touches: {length: 1}});
    expect(datePicker.state.activeDay).toBeGreaterThan(0);
    TestUtils.Simulate.touchEnd(day, {touches: {length: 1}});
    expect(datePicker.state.activeDay).toBe(0);
  });

  it('should set dateValue to undefined when calling resetValue', () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker value={ new Date() }/>
    );
    expect(datePicker.state.dateValue).toBeDefined();
    datePicker.resetValue();
    expect(datePicker.state.dateValue).toBeUndefined();
  });
});
