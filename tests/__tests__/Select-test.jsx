"use strict";

jest.dontMock('../lib/components/Select');
jest.dontMock('../lib/components/Option');

import {extend} from 'underscore';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Select = require('../lib/components/Select');
const Option = require('../lib/components/Option');

describe('Select', () => {

  it('should initialise selectedValue & focusedOptionValue during construction', () => {
    const select = TestUtils.renderIntoDocument(
      <Select value='vienna' >
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    expect(select.state.selectedValue).toBe('vienna');
    expect(select.state.focusedOptionValue).toBe('vienna');
  });

  it('should take the first option in case no value, defaultValue or valueLink is defined', () => {
    const select = TestUtils.renderIntoDocument(
      <Select>
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    expect(select.state.selectedValue).toBe('rome');
    expect(select.state.focusedOptionValue).toBe('rome');
  });

  it('should be able to provide a valueLink', () => {
    let wasCalled = false;

    const valueLink = {
      requestChange: () => { wasCalled = true; },
      value: 'rome'
    };

    const select = TestUtils.renderIntoDocument(
      <Select valueLink={ valueLink } >
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    const nativeSelect = TestUtils.findRenderedDOMComponentWithTag(select, 'select');
    TestUtils.Simulate.change(nativeSelect);

    expect(wasCalled).toBeTruthy();
  });

  it('should be able to provide a onChange callback', () => {
    let wasCalled = false;

    const select = TestUtils.renderIntoDocument(
      <Select onChange={ () => { wasCalled = true; } } >
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    const nativeSelect = TestUtils.findRenderedDOMComponentWithTag(select, 'select');
    TestUtils.Simulate.change(nativeSelect);

    expect(wasCalled).toBeTruthy();
  });

  it('should dispatch a change event on the native select in case the user clicks on an option', () => {
    const select = TestUtils.renderIntoDocument(
      <Select defaultValue='rome' >
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    // mock functions
    window.Event = jest.genMockFunction();
    const nativeSelect = TestUtils.findRenderedDOMComponentWithTag(select, 'select');
    var nativeSelectNode = React.findDOMNode(nativeSelect);
    nativeSelectNode.dispatchEvent = jest.genMockFunction();

    // dispatch event on the vienna entry
    const viennaOption = TestUtils.scryRenderedDOMComponentsWithTag(select, 'li')[1];
    TestUtils.Simulate.click(viennaOption);

    expect(window.Event.mock.calls[0][0]).toBe('change');
    expect(nativeSelectNode.dispatchEvent.mock.calls.length).toBe(1);
    expect(nativeSelectNode.value).toBe('vienna');
  });


  it('should change the selectedValue & focusedOptionValue on selection', () => {
    const select = TestUtils.renderIntoDocument(
      <Select defaultValue='rome' >
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    const nativeSelect = TestUtils.findRenderedDOMComponentWithTag(select, 'select');
    TestUtils.Simulate.change(nativeSelect, {target: {value: 'vienna'}});

    expect(select.state.selectedValue).toBe('vienna');
    expect(select.state.focusedOptionValue).toBe('vienna');
  });

  it('should not change the selectedValue & focusedOptionValue on selection in case props.value is provided', () => {
    const select = TestUtils.renderIntoDocument(
      <Select value='rome' >
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    const nativeSelect = TestUtils.findRenderedDOMComponentWithTag(select, 'select');
    TestUtils.Simulate.change(nativeSelect, {target: {value: 'vienna'}});

    expect(select.state.selectedValue).toBe('rome');
    expect(select.state.focusedOptionValue).toBe('rome');
  });

  it('should be able to adopt the styles of a select', () => {
    const select = TestUtils.renderIntoDocument(
      <Select nativeSelectStyle={ { color: '#700' } }>
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    const nativeSelectNode = TestUtils.findRenderedDOMComponentWithTag(select, 'select');

    expect(nativeSelectNode.props.style.color).toBe('#700');
  });

  describe('updating props', () => {

    let select, nativeSelect;

    beforeEach(() => {
      select = TestUtils.renderIntoDocument(
        <Select>
          <Option value='rome'>Rome</Option>
          <Option value='vienna'>Vienna</Option>
        </Select>
      );
    });

    it('should update it\'s state in case value is provided', () => {
      const properties = extend({}, select.props, { value: 'vienna' });
      select.componentWillReceiveProps(properties);

      expect(select.state.selectedValue).toBe('vienna');
    });

    it('should update it\'s state in case value is provided', () => {
      const valueLink = {
        requestChange: () => {},
        value: 'vienna'
      };

      const properties = extend({}, select.props, { valueLink: valueLink });
      select.componentWillReceiveProps(properties);

      expect(select.state.selectedValue).toBe('vienna');
    });

    it('should not update it\'s state in case defaultValue is updated', () => {
      const properties = extend({}, select.props, { defaultValue: 'vienna' });
      select.componentWillReceiveProps(properties);

      expect(select.state.selectedValue).toBe('rome');
    });
  });

  describe('manage key events', () => {

    let select, nativeSelect;

    beforeEach(() => {
      select = TestUtils.renderIntoDocument(
        <Select>
          <Option value='rome'>Rome</Option>
          <Option value='vienna'>Vienna</Option>
          <Option value='berlin'>Berlin</Option>
        </Select>
      );
      nativeSelect = TestUtils.findRenderedDOMComponentWithTag(select, 'select');
    });

    it('should open the options area by pressing ArrowDown', () => {
      TestUtils.Simulate.keyDown(nativeSelect, {key: 'ArrowDown'});
      expect(select.state.isOpen).toBeTruthy();
    });

    it('should open the options area by pressing ArrowUp', () => {
      TestUtils.Simulate.keyDown(nativeSelect, {key: 'ArrowUp'});
      expect(select.state.isOpen).toBeTruthy();
    });

    it('should open the options area by pressing Space', () => {
      TestUtils.Simulate.keyDown(nativeSelect, {key: 'ArrowUp'});
      expect(select.state.isOpen).toBeTruthy();
    });

    describe('when the options area is open', () => {

      beforeEach(() => {
        select.setState({ isOpen: true });
      });

      it('should close options area when pressing Escape', () => {
        TestUtils.Simulate.keyDown(nativeSelect, {key: 'Escape'});
        expect(select.state.isOpen).toBeFalsy();
      });

      it('should focus on the next option when pressing ArrowDown', () => {
        expect(select.state.focusedOptionValue).toBe('rome');
        TestUtils.Simulate.keyDown(nativeSelect, {key: 'ArrowDown'});
        expect(select.state.focusedOptionValue).toBe('vienna');
      });

      it('should focus on the first option when pressing ArrowDown and none was focused on', () => {
        select.setState({ focusedOptionValue: undefined });
        TestUtils.Simulate.keyDown(nativeSelect, {key: 'ArrowDown'});
        expect(select.state.focusedOptionValue).toBe('rome');
      });

      it('should focus on the previous option when pressing ArrowUp', () => {
        select.setState({ focusedOptionValue: 'vienna' });
        expect(select.state.focusedOptionValue).toBe('vienna');
        TestUtils.Simulate.keyDown(nativeSelect, {key: 'ArrowUp'});
        expect(select.state.focusedOptionValue).toBe('rome');
      });

      it('should focus on the last option when pressing ArrowUp and none was focused on', () => {
        select.setState({ focusedOptionValue: undefined });
        TestUtils.Simulate.keyDown(nativeSelect, {key: 'ArrowUp'});
        expect(select.state.focusedOptionValue).toBe('berlin');
      });

      it('should select the focused option when pressing Enter', () => {
        select.setState({ focusedOptionValue: 'berlin' });

        window.Event = jest.genMockFunction();
        const nativeSelect = TestUtils.findRenderedDOMComponentWithTag(select, 'select');
        var nativeSelectNode = React.findDOMNode(nativeSelect);
        nativeSelectNode.dispatchEvent = jest.genMockFunction();

        TestUtils.Simulate.keyDown(nativeSelect, {key: 'Enter'});

        expect(window.Event.mock.calls[0][0]).toBe('change');
        expect(nativeSelectNode.dispatchEvent.mock.calls.length).toBe(1);
        expect(nativeSelectNode.value).toBe('berlin');
      });

      it('should select the focused option when pressing Space', () => {
        select.setState({ focusedOptionValue: 'berlin' });

        window.Event = jest.genMockFunction();
        const nativeSelect = TestUtils.findRenderedDOMComponentWithTag(select, 'select');
        var nativeSelectNode = React.findDOMNode(nativeSelect);
        nativeSelectNode.dispatchEvent = jest.genMockFunction();

        TestUtils.Simulate.keyDown(nativeSelect, {key: ' '});

        expect(window.Event.mock.calls[0][0]).toBe('change');
        expect(nativeSelectNode.dispatchEvent.mock.calls.length).toBe(1);
        expect(nativeSelectNode.value).toBe('berlin');
      });

    });

  });

});
