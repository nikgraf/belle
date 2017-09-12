'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest, describe, it, expect*/

jest.dontMock('../components/TextInput');
jest.dontMock('../utils/inject-style');
jest.dontMock('../utils/calculate-textarea-height');
jest.dontMock('../style/text-input');

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
var injectStyle = require('../utils/inject-style');
var TextInput = require('../components/TextInput').default;

describe('TextInput', function () {
  it('should come with default styles', function () {
    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, null));
    var textareaNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(textInput, 'textarea');

    expect(textareaNode.hasAttribute('style')).toBeTruthy();
    expect(textareaNode.getAttribute('style').indexOf('overflow: hidden') > -1).toBeTruthy();
  });

  it('should be able to adopt the style of the textInput', function () {
    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, { style: { color: 'red' } }));
    var textareaNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(textInput, 'textarea');

    expect(textareaNode.hasAttribute('style')).toBeTruthy();
    expect(textareaNode.getAttribute('style').indexOf('color: red') > -1).toBeTruthy();
  });

  it('should calculate its height after initializing', function () {
    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, null));

    textInput._triggerResize = jest.genMockFunction();
    textInput.componentDidMount();

    expect(textInput._triggerResize.mock.calls.length).toBe(1);
  });

  it('should re-calculate its height after changing (default)', function () {
    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, null));

    textInput._triggerResize = jest.genMockFunction();

    var textareaNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(textInput, 'textarea');

    _reactAddonsTestUtils2.default.Simulate.change(textareaNode, 'some input text');

    expect(textInput._triggerResize.mock.calls.length).toBe(1);
  });

  it('should re-calculate its height after changing (with value & new lines not allowed)', function () {
    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, { value: 'some text' }));

    textInput._triggerResize = jest.genMockFunction();

    var textareaNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(textInput, 'textarea');

    _reactAddonsTestUtils2.default.Simulate.change(textareaNode, 'some other text');

    expect(textInput._triggerResize.mock.calls.length).toBe(1);
  });

  it('should re-calculate its height after changing (new lines allowed)', function () {
    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, { value: 'some text', allowNewLine: true }));

    textInput._triggerResize = jest.genMockFunction();

    var textareaNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(textInput, 'textarea');

    _reactAddonsTestUtils2.default.Simulate.change(textareaNode, 'some other text');

    expect(textInput._triggerResize.mock.calls.length).toBe(1);
  });

  it('should be able to bind onKeyDown', function () {
    var wasPressed = false;

    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, { onKeyDown: function onKeyDown() {
        wasPressed = true;
      } }));

    var textareaNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(textInput, 'textarea');

    _reactAddonsTestUtils2.default.Simulate.keyDown(textareaNode, { key: '1' });

    expect(wasPressed).toEqual(true);
  });

  it('should be able to bind onUpdate', function () {
    var wasChanged = false;

    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, { onUpdate: function onUpdate() {
        wasChanged = true;
      } }));

    var textareaNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(textInput, 'textarea');

    _reactAddonsTestUtils2.default.Simulate.change(textareaNode, 'some text');

    expect(wasChanged).toEqual(true);
  });

  it('should be able to provide a valueLink', function () {
    var wasCalled = false;

    var valueLink = {
      requestChange: function requestChange() {
        wasCalled = true;
      },

      value: 'some text'
    };

    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, { valueLink: valueLink }));

    var textareaNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(textInput, 'textarea');

    _reactAddonsTestUtils2.default.Simulate.change(textareaNode, 'some other text');

    expect(wasCalled).toEqual(true);
  });

  it('should be able to provide a className', function () {
    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, { className: 'test-me' }));

    var textareaNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(textInput, 'textarea');
    expect(textareaNode.className.indexOf('test-me')).toBeGreaterThan(-1);
  });

  it('should remove the custom styles from the dom when the textInput unmounts', function () {
    injectStyle.removeStyle = jest.genMockFunction();

    var textInput = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TextInput, null));

    textInput.componentWillUnmount();

    expect(injectStyle.removeStyle.mock.calls.length).toBe(1);
  });
});