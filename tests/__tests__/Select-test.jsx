"use strict";

jest.dontMock('../lib/components/Select');
jest.dontMock('../lib/components/Option');

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

// Babel would move an import in front of the jest.dontMock. That's why require
// is used here.
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

    expect(select.state.selectedValue).toEqual('vienna');
    expect(select.state.focusedOptionValue).toEqual('vienna');
  });

  it('should take the first option in case no value, defaultValue or valueLink is defined', () => {
    const select = TestUtils.renderIntoDocument(
      <Select>
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    expect(select.state.selectedValue).toEqual('rome');
    expect(select.state.focusedOptionValue).toEqual('rome');
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
    TestUtils.SimulateNative.change(nativeSelect);

    expect(wasCalled).toEqual(true);
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
    TestUtils.SimulateNative.change(nativeSelect);

    expect(wasCalled).toEqual(true);
  });

  it('should change the selectedValue & focusedOptionValue on selection', () => {
    const select = TestUtils.renderIntoDocument(
      <Select defaultValue='rome' >
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    const nativeSelect = TestUtils.findRenderedDOMComponentWithTag(select, 'select');
    var nativeSelectNode = React.findDOMNode(nativeSelect);
    nativeSelectNode.value = 'vienna';

    TestUtils.SimulateNative.change(nativeSelect);

    expect(select.state.selectedValue).toEqual('vienna');
    expect(select.state.focusedOptionValue).toEqual('vienna');
  });

  it('should not change the selectedValue & focusedOptionValue on selection in case props.value is provided', () => {
    const select = TestUtils.renderIntoDocument(
      <Select value='rome' >
        <Option value='rome'>Rome</Option>
        <Option value='vienna'>Vienna</Option>
      </Select>
    );

    const nativeSelect = TestUtils.findRenderedDOMComponentWithTag(select, 'select');
    var nativeSelectNode = React.findDOMNode(nativeSelect);
    nativeSelectNode.value = 'vienna';

    TestUtils.SimulateNative.change(nativeSelect);

    expect(select.state.selectedValue).toEqual('rome');
    expect(select.state.focusedOptionValue).toEqual('rome');
  });

});
