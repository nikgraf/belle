'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest describe beforeEach it expect */

jest.dontMock('../components/Option');
jest.dontMock('../style/option');

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
var Option = require('../components/Option').default;

describe('Option', function () {
  var shallowRenderer = void 0;

  beforeEach(function () {
    shallowRenderer = _reactAddonsTestUtils2.default.createRenderer();
  });

  it('should initialise _isDisplayedAsSelected during construction', function () {
    shallowRenderer.render(_react2.default.createElement(
      Option,
      { value: 'rome' },
      'Rome'
    ), { isDisabled: false });
    var option = shallowRenderer.getRenderOutput();

    expect(option._isDisplayedAsSelected).toBeFalsy();
  });

  it('should show the select style in case _isDisplayedAsSelected is true', function () {
    shallowRenderer.render(_react2.default.createElement(
      Option,
      { value: 'rome', _isDisplayedAsSelected: true },
      'Rome'
    ), { isDisabled: false });
    var option = shallowRenderer.getRenderOutput();

    expect(option.props.style.padding).toBe(0);
  });

  it('should show the hover style in case _isHovered is true', function () {
    shallowRenderer.render(_react2.default.createElement(
      Option,
      { value: 'rome' },
      'Rome'
    ), {
      isDisabled: false,
      isHoveredValue: 'rome'
    });
    var option = shallowRenderer.getRenderOutput();

    expect(option.props.style.background).toBe('#F5F5F5');
  });

  it('should be able to provide custom properties', function () {
    shallowRenderer.render(_react2.default.createElement(
      Option,
      { value: 'rome', 'data-custom': 'example' },
      'Rome'
    ), { isDisabled: false });
    var option = shallowRenderer.getRenderOutput();

    expect(option.props['data-custom']).toBe('example');
  });
});