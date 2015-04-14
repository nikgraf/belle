"use strict";

jest.dontMock('../lib/components/TextInput');
jest.dontMock('../lib/utils/inject-style');

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

// Babel would move an import in front of the jest.dontMock. That's why require
// is used here.
const injectStyle = require('../lib/utils/inject-style');
const TextInput = require('../lib/components/TextInput');

describe('TextInput', () => {

  it('should come with default styles', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput />
    );
    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    expect(textareaNode.props.style).toBeDefined();
    expect(textareaNode.props.style.overflow).toBe('hidden');
  });

  it('should be able to adopt the style of the textInput', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput style={{ color: 'red'}} />
    );
    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    expect(textareaNode.props.style.color).toBe('red');
  });

  it('should calculate its height after initializing', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput />
    );

    textInput._resize = jest.genMockFunction();
    textInput.componentDidMount();

    expect(textInput._resize.mock.calls.length).toBe(1);
  });

  it('should re-calculate its height after changing', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput />
    );

    textInput._resize = jest.genMockFunction();
    expect(textInput._resize.mock.calls.length).toBe(0);

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some input text');

    expect(textInput._resize.mock.calls.length).toBe(2);
  });



  it('should remove the custom styles from the dom when the textInput unmounts', function() {
    injectStyle.removeStyle = jest.genMockFunction();
    expect(injectStyle.removeStyle.mock.calls.length).toBe(0);

    const textInput = TestUtils.renderIntoDocument(
      <TextInput />
    );

    textInput.componentWillUnmount();

    expect(injectStyle.removeStyle.mock.calls.length).toBe(1);
  });

});
