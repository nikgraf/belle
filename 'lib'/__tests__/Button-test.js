'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest describe beforeEach it expect */

jest.dontMock('../components/Button');
jest.dontMock('../utils/inject-style');
jest.dontMock('../utils/union-class-names');
jest.dontMock('../style/button');

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
var Button = require('../components/Button').default;
var injectStyle = require('../utils/inject-style');

describe('Button', function () {
  describe('without any properties', function () {
    var button = void 0;
    var buttonNode = void 0;

    beforeEach(function () {
      injectStyle.injectStyles = jest.genMockFunction();
      button = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        Button,
        null,
        'Follow'
      ));
      buttonNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(button, 'button');
    });

    it('should come with default styles', function () {
      expect(buttonNode.hasAttribute('style')).toBeTruthy();
    });

    it('should set the type to button by default', function () {
      expect(buttonNode.type).toBe('button');
    });

    it('should inject styles for active & foucs', function () {
      expect(injectStyle.injectStyles.mock.calls.length).toBe(1);

      var styles = injectStyle.injectStyles.mock.calls[0][0];
      expect(styles[0].pseudoClass).toBe('active');
      expect(styles[2].pseudoClass).toBe('focus');
    });
  });

  it('should be able to bind onClick', function () {
    var wasClicked = false;

    // Render a button with an onClick handler
    var button = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Button,
      { onClick: function onClick() {
          wasClicked = true;
        } },
      'Follow'
    ));

    // Simulate a click
    _reactAddonsTestUtils2.default.Simulate.click(_reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(button, 'button'));

    expect(wasClicked).toBeTruthy();
  });

  it('should be able to provide a className', function () {
    var button = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Button,
      { className: 'test-me' },
      'Follow'
    ));

    var buttonNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.className).toContain('test-me');
  });

  it('should be able to adopt the style of the button', function () {
    var button = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Button,
      { style: { color: '#F00' } },
      'Follow'
    ));

    var buttonNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.getAttribute('style').indexOf('color: rgb(255, 0, 0)') > -1).toBeTruthy();
  });

  it('should be able to use a primary button', function () {
    var defaultButton = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Button,
      null,
      'Follow'
    ));

    var primaryButton = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Button,
      { primary: true },
      'Follow'
    ));

    var defaultButtonNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(defaultButton, 'button');
    var prmaryButtonNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(primaryButton, 'button');

    expect(prmaryButtonNode.getAttribute('style')).not.toEqual(defaultButtonNode.getAttribute('style'));
  });

  it('should be able to change the type to submit or reset', function () {
    var submitButton = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Button,
      { type: 'submit' },
      'Submit'
    ));
    var submitButtonNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(submitButton, 'button');
    expect(submitButtonNode.type).toBe('submit');

    var resetButton = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Button,
      { type: 'reset' },
      'Submit'
    ));
    var resetButtonNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(resetButton, 'button');
    expect(resetButtonNode.type).toBe('reset');
  });

  it('should be able to adopt the pseudoClass styles of the button', function () {
    injectStyle.injectStyles = jest.genMockFunction();

    var bodyWithButton = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Button,
      {
        hoverStyle: { color: 'red' },
        focusStyle: { color: 'brown' },
        activeStyle: { color: 'green' },
        preventFocusStyleForTouchAndClick: false
      },
      'Follow'
    ));

    _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(bodyWithButton, 'button');

    expect(injectStyle.injectStyles.mock.calls.length).toBe(1);

    var styles = injectStyle.injectStyles.mock.calls[0][0];

    expect(styles[0].pseudoClass).toBe('active');
    expect(styles[0].style.color).toBe('green');
    expect(styles[2].pseudoClass).toBe('focus');
    expect(styles[2].style.color).toBe('brown');
  });

  it('should remove the custom styles from the dom when the button unmounts', function () {
    injectStyle.removeStyle = jest.genMockFunction();
    expect(injectStyle.removeStyle.mock.calls.length).toBe(0);

    var button = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Button,
      null,
      'Follow'
    ));

    button.componentWillUnmount();

    expect(injectStyle.removeStyle.mock.calls.length).toBe(1);
  });

  it('should set isHovered state to true on mouseEnter and false on mouseLeave', function () {
    var button = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Button,
      null,
      'Follow'
    ));

    expect(button.state.isHovered).toBeFalsy();
    _reactAddonsTestUtils2.default.Simulate.mouseEnter(_reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(button, 'button'));
    expect(button.state.isHovered).toBeTruthy();
    _reactAddonsTestUtils2.default.Simulate.mouseLeave(_reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(button, 'button'));
    expect(button.state.isHovered).toBeFalsy();
  });
});