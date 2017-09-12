'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest describe beforeEach it expect */

jest.dontMock('../components/Card');
jest.dontMock('../style/card');
jest.dontMock('../utils/inject-style');

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
var Card = require('../components/Card').default;

describe('Card', function () {
  it('should come with default styles', function () {
    var card = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Card, null));
    var divNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(card, 'div');
    expect(divNode.hasAttribute('style')).toBeTruthy();

    expect(divNode.getAttribute('style').indexOf('background: rgb(255, 255, 255)') > -1).toBeTruthy();
  });

  it('should be able to adopt the style of the card', function () {
    var card = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Card, { style: { background: '#F00' } }));
    var divNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(card, 'div');
    expect(divNode.getAttribute('style').indexOf('background: rgb(255, 0, 0)') > -1).toBeTruthy();
  });

  it('should render its children', function () {
    var card = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Card,
      null,
      _react2.default.createElement(
        'span',
        null,
        'Hello there'
      )
    ));
    var divNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(card, 'div');
    var spanNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(card, 'span');

    expect(divNode.tagName).toEqual('DIV');
    expect(divNode.childNodes[0].tagName).toEqual('SPAN');
    expect(spanNode.textContent).toEqual('Hello there');
  });
});