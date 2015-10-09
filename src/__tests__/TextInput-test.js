/* global jest, describe, it, expect*/

jest.dontMock('../components/TextInput');
jest.dontMock('../utils/inject-style');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const injectStyle = require('../utils/inject-style');
const TextInput = require('../components/TextInput');

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

    textInput._triggerResize = jest.genMockFunction();
    textInput.componentDidMount();

    expect(textInput._triggerResize.mock.calls.length).toBe(1);
  });


  it('should re-calculate its height after changing (default)', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput />
    );

    textInput._triggerResize = jest.genMockFunction();

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some input text');

    expect(textInput._triggerResize.mock.calls.length).toBe(1);
  });


  it('should re-calculate its height after changing (with value & new lines not allowed)', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput value="some text"/>
    );

    textInput._triggerResize = jest.genMockFunction();

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some other text');

    expect(textInput._triggerResize.mock.calls.length).toBe(1);
  });


  it('should re-calculate its height after changing (new lines allowed)', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput value="some text" allowNewLine />
    );

    textInput._triggerResize = jest.genMockFunction();

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some other text');

    expect(textInput._triggerResize.mock.calls.length).toBe(1);
  });


  it('should be able to bind onKeyDown', () => {
    let wasPressed = false;

    const textInput = TestUtils.renderIntoDocument(
      <TextInput onKeyDown={ () => wasPressed = true }/>
    );

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.keyDown(textareaNode, {key: '1'});

    expect(wasPressed).toEqual(true);
  });


  it('should be able to bind onUpdate', () => {
    let wasChanged = false;

    const textInput = TestUtils.renderIntoDocument(
      <TextInput onUpdate={ () => wasChanged = true }/>
    );

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some text');

    expect(wasChanged).toEqual(true);
  });


  it('should be able to provide a valueLink', () => {
    let wasCalled = false;

    const valueLink = {
      requestChange: () => { wasCalled = true; },
      value: 'some text'
    };

    const textInput = TestUtils.renderIntoDocument(
      <TextInput valueLink={ valueLink }/>
    );

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');

    TestUtils.Simulate.change(textareaNode, 'some other text');

    expect(wasCalled).toEqual(true);
  });


  it('should be able to provide a className', () => {
    const textInput = TestUtils.renderIntoDocument(
      <TextInput className="test-me" />
    );

    const textareaNode = TestUtils.findRenderedDOMComponentWithTag(textInput, 'textarea');
    expect(textareaNode.props.className.indexOf('test-me')).toBeGreaterThan(-1);
  });


  it('should remove the custom styles from the dom when the textInput unmounts', () => {
    injectStyle.removeStyle = jest.genMockFunction();

    const textInput = TestUtils.renderIntoDocument(
      <TextInput />
    );

    textInput.componentWillUnmount();

    expect(injectStyle.removeStyle.mock.calls.length).toBe(1);
  });
});
