'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest describe beforeEach it expect */

jest.dontMock('../components/Rating');
jest.dontMock('../utils/inject-style');
jest.dontMock('../utils/union-class-names');

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
var Rating = require('../components/Rating').default;

describe('Rating', function () {
  it('should be able to provide a valueLink', function () {
    var valueLink = {
      requestChange: function requestChange() {
        return undefined;
      },
      value: 1
    };
    var rating = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Rating, { valueLink: valueLink }));

    expect(rating.state.value).toBe(1);
  });

  it('should be able to provide a value', function () {
    var rating = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Rating, { value: 4 }));
    expect(rating.state.value).toBe(4);
  });

  it('should be able to provide a defaultValue', function () {
    var rating = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Rating, { defaultValue: 2 }));
    expect(rating.state.value).toBe(2);
  });

  it('should to not provide any kind of value', function () {
    var rating = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Rating, null));
    expect(rating.state.value).toBeUndefined();
  });

  it('should not be able to change value via the user interface if a value property is defined', function () {
    var rating = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Rating, { value: 4 }));
    rating.setState({ focusedValue: 3 });
    rating._triggerComponentUpdate();
    expect(rating.state.value).toBe(4);
  });

  describe('update the internal value', function () {
    var rating = void 0;

    beforeEach(function () {
      rating = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Rating, null));
    });

    it('should be possible by updating the value property', function () {
      rating.componentWillReceiveProps({ value: 2 });
      expect(rating.state.value).toBe(2);
    });

    it('should be possible by updating the valueLink property', function () {
      var valueLink = {
        requestChange: function requestChange() {
          return undefined;
        },
        value: 1
      };

      rating.componentWillReceiveProps({ valueLink: valueLink });
      expect(rating.state.value).toBe(1);
    });

    it('should not be possible by updating the defaultValue property', function () {
      rating.componentWillReceiveProps({ defaultValue: 3 });
      expect(rating.state.value).toBeUndefined();
    });
  });
});