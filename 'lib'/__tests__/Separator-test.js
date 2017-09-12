'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest describe beforeEach it expect */

jest.dontMock('../components/Separator');
jest.dontMock('../style/separator');

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
var Separator = require('../components/Separator').default;

describe('Separator', function () {
  it('should come with a set of default styles', function () {
    var separator = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Separator,
      null,
      'Europe'
    ));

    var div = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(separator, 'div');
    expect(div.hasAttribute('style')).toBeTruthy();
    expect(div.getAttribute('style').indexOf('color: rgb(102, 102, 102)') > -1).toBeTruthy();
  });

  it('should be able to overwrite the default styles', function () {
    var separator = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Separator,
      { style: { color: '#F00' } },
      'Please select a city'
    ));

    var div = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(separator, 'div');
    expect(div.hasAttribute('style')).toBeTruthy();
    expect(div.getAttribute('style').indexOf('color: rgb(255, 0, 0)') > -1).toBeTruthy();
  });

  it('should be able to provide custom properties', function () {
    var separator = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Separator,
      { 'data-custom': 'example' },
      'Please select a city'
    ));

    var div = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(separator, 'div');
    expect(div.getAttribute('data-custom')).toBe('example');
  });
});