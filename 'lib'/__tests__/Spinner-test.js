'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest describe beforeEach it expect */

jest.dontMock('../components/Spinner');
jest.dontMock('../style/spinner');

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
var Spinner = require('../components/Spinner').default;

describe('Spinner', function () {
  it('should come with default styles', function () {
    var spinner = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Spinner, null));
    var spanNode = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(spinner, 'span')[0];
    expect(spanNode.hasAttribute('style')).toBeTruthy();
    expect(spanNode.getAttribute('style')).toContain('font-size: 15px');
  });

  it('should be able to adopt the style of the spinner wrapper', function () {
    var spinner = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Spinner, { style: { width: 200 } }));
    var spanNode = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(spinner, 'span')[0];
    expect(spanNode.getAttribute('style')).toContain('width: 200px');
  });

  it('should be able to adopt the character style of the spinner', function () {
    var spinner = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Spinner, { characterStyle: { color: 'red' } }));
    var spanNode = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(spinner, 'span')[1];
    expect(spanNode.getAttribute('style')).toContain('color: red');
  });
});