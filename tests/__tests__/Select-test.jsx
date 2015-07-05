"use strict";

jest.dontMock('../lib/components/Select');
jest.dontMock('../lib/components/Option');
jest.dontMock('../lib/components/Placeholder');
jest.dontMock('../lib/components/Separator');

import {extend} from 'underscore';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Select = require('../lib/components/Select');
const Option = require('../lib/components/Option');
const Placeholder = require('../lib/components/Placeholder');
const Separator = require('../lib/components/Separator');

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

  it('should not have any option selected, but focusedOn the first in case there is a Placeholder & no value, defaultValue or valueLink is defined', () => {
    const select = TestUtils.renderIntoDocument(
      <Select>
        <Placeholder>Select a City</Placeholder>
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    expect(select.state.selectedValue).toBeUndefined();
    expect(select.state.focusedOptionValue).toBe('rome');
  });

  it('should render the content of selected option', () => {
    const select = TestUtils.renderIntoDocument(
      <Select value='vienna'>
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    const selectedOptionArea = TestUtils.scryRenderedDOMComponentsWithTag(select, 'div')[1];
    expect(selectedOptionArea.props.children[0]._store.props.children).toBe('Vienna');
  });

  it('should render the placeholder content', () => {
    const select = TestUtils.renderIntoDocument(
      <Select>
        <Placeholder>Select a City</Placeholder>
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    const selectedOptionArea = TestUtils.scryRenderedDOMComponentsWithTag(select, 'div')[1];

    expect(selectedOptionArea.props.children[0]._store.props.children).toBe('Select a City');
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
        <Option value='vienna' className="vienna-option">Vienna</Option>
      </Select>
    );

    const viennaOptionNode = TestUtils.findRenderedDOMComponentWithClass(select, 'vienna-option');
    TestUtils.Simulate.click(viennaOptionNode);

    expect(wasCalled).toBeTruthy();
  });

  it('should be able to provide a onUpdate callback', () => {
    let wasCalled = false;

    const select = TestUtils.renderIntoDocument(
      <Select onUpdate={ () => { wasCalled = true; } } >
        <Option value='rome'>Rome</Option>
        <Option value='vienna' className="vienna-option">Vienna</Option>
      </Select>
    );

    const viennaOptionNode = TestUtils.findRenderedDOMComponentWithClass(select, 'vienna-option');
    TestUtils.Simulate.click(viennaOptionNode);

    expect(wasCalled).toBeTruthy();
  });

  it('should change the selectedValue & focusedOptionValue on selection', () => {
    const select = TestUtils.renderIntoDocument(
      <Select defaultValue='rome'>
        <Option value='rome'>Rome</Option>
        <Option value='vienna' className="vienna-option">Vienna</Option>
      </Select>
    );

    const viennaOptionNode = TestUtils.findRenderedDOMComponentWithClass(select, 'vienna-option');
    TestUtils.Simulate.click(viennaOptionNode);

    expect(select.state.selectedValue).toBe('vienna');
    expect(select.state.focusedOptionValue).toBe('vienna');
  });

  it('should not change the selectedValue & focusedOptionValue on selection in case props.value is provided', () => {
    const select = TestUtils.renderIntoDocument(
      <Select value='rome' >
        <Option value='rome'>Rome</Option>
        <Option value='vienna' className="vienna-option">Vienna</Option>
      </Select>
    );

    const viennaOptionNode = TestUtils.findRenderedDOMComponentWithClass(select, 'vienna-option');
    TestUtils.Simulate.click(viennaOptionNode);

    expect(select.state.selectedValue).toBe('rome');
    expect(select.state.focusedOptionValue).toBe('rome');
  });

  it('should be able to adopt the styles of a select', () => {
    const select = TestUtils.renderIntoDocument(
      <Select style={ { cursor: 'cross' } }>
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    const selectedAreaNode = TestUtils.scryRenderedDOMComponentsWithTag(select, 'div')[1];
    expect(selectedAreaNode.props.style.cursor).toBe('cross');
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

  function testKeyEvents(container) {

    it('should open the menu by pressing ArrowDown', () => {
      TestUtils.Simulate.keyDown(container.selectNode, {key: 'ArrowDown'});
      expect(container.select.state.isOpen).toBeTruthy();
    });

    it('should open the menu by pressing ArrowUp', () => {
      TestUtils.Simulate.keyDown(container.selectNode, {key: 'ArrowUp'});
      expect(container.select.state.isOpen).toBeTruthy();
    });

    it('should open the menu by pressing Space', () => {
      TestUtils.Simulate.keyDown(container.selectNode, {key: 'ArrowUp'});
      expect(container.select.state.isOpen).toBeTruthy();
    });

    describe('when the menu is open', () => {

      beforeEach(() => {
        container.select.setState({ isOpen: true });
      });

      it('should close menu when pressing Escape', () => {
        TestUtils.Simulate.keyDown(container.selectNode, {key: 'Escape'});
        expect(container.select.state.isOpen).toBeFalsy();
      });

      it('should focus on the next option when pressing ArrowDown', () => {
        expect(container.select.state.focusedOptionValue).toBe('rome');
        TestUtils.Simulate.keyDown(container.selectNode, {key: 'ArrowDown'});
        expect(container.select.state.focusedOptionValue).toBe('vienna');
      });

      it('should focus on the first option when pressing ArrowDown and none was focused on', () => {
        container.select.setState({ focusedOptionValue: undefined });
        TestUtils.Simulate.keyDown(container.selectNode, {key: 'ArrowDown'});
        expect(container.select.state.focusedOptionValue).toBe('rome');
      });

      it('should focus on the previous option when pressing ArrowUp', () => {
        container.select.setState({ focusedOptionValue: 'vienna' });
        expect(container.select.state.focusedOptionValue).toBe('vienna');
        TestUtils.Simulate.keyDown(container.selectNode, {key: 'ArrowUp'});
        expect(container.select.state.focusedOptionValue).toBe('rome');
      });

      it('should focus on the last option when pressing ArrowUp and none was focused on', () => {
        container.select.setState({ focusedOptionValue: undefined });
        TestUtils.Simulate.keyDown(container.selectNode, {key: 'ArrowUp'});
        expect(container.select.state.focusedOptionValue).toBe('berlin');
      });

      it('should select the focused option when pressing Enter', () => {
        container.select.setState({ focusedOptionValue: 'berlin' });
        TestUtils.Simulate.keyDown(container.selectNode, {key: 'Enter'});
        expect(container.select.state.selectedValue).toBe('berlin');
      });

      it('should select the focused option when pressing Space', () => {
        container.select.setState({ focusedOptionValue: 'berlin' });
        TestUtils.Simulate.keyDown(container.selectNode, {key: ' '});
        expect(container.select.state.selectedValue).toBe('berlin');
      });

    });

  }


  describe('manage key events for simple list', () => {

    // in order to ensure no references are lost a container object is used
    var container = {};

    beforeEach(() => {
      container.select = TestUtils.renderIntoDocument(
        <Select>
          <Option value='rome'>Rome</Option>
          <Option value='vienna'>Vienna</Option>
          <Option value='berlin'>Berlin</Option>
        </Select>
      );
      container.selectNode = React.findDOMNode(container.select);
    });

    testKeyEvents(container);

  });

  describe('manage key events when separators are present', () => {

    // in order to ensure no references are lost a container object is used
    var container = {};

    beforeEach(() => {
      container.select = TestUtils.renderIntoDocument(
        <Select>
          <Separator>Italy</Separator>
          <Option value='rome'>Rome</Option>
          <Separator>Austria</Separator>
          <Option value='vienna'>Vienna</Option>
          <Separator>Germany</Separator>
          <Option value='berlin'>Berlin</Option>
        </Select>
      );
      container.selectNode = React.findDOMNode(container.select);
    });

    testKeyEvents(container);

  });

});
