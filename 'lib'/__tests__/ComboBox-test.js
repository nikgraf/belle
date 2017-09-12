'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest describe beforeEach it expect */

jest.dontMock('../components/ComboBox');
jest.dontMock('../components/ComboBoxItem');
jest.dontMock('../components/Option');

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
var ComboBox = require('../components/ComboBox').default;
var Option = require('../components/Option').default;

describe('ComboBox', function () {
  it('should initialise inputValue & filteredOptions during construction', function () {
    var combobox = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      ComboBox,
      { value: 'vie' },
      _react2.default.createElement(
        Option,
        { value: 'rome' },
        'Rome'
      ),
      _react2.default.createElement(
        Option,
        { value: 'vienna' },
        'Vienna'
      )
    ));

    expect(combobox.state.inputValue).toBe('vie');
    expect(_react2.default.Children.count(combobox.filteredOptions)).toBe(1);
  });

  it('should filter all values case no value, defaultValue or valueLink is defined', function () {
    var combobox = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      ComboBox,
      null,
      _react2.default.createElement(
        Option,
        { value: 'rome' },
        'Rome'
      ),
      _react2.default.createElement(
        Option,
        { value: 'vienna' },
        'Vienna'
      )
    ));

    expect(combobox.state.inputValue).toBe('');
    expect(_react2.default.Children.count(combobox.filteredOptions)).toBe(2);
  });

  it('should be able to provide a onUpdate callback', function () {
    var wasCalled = false;

    var combobox = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      ComboBox,
      { onUpdate: function onUpdate() {
          wasCalled = true;
        } },
      _react2.default.createElement(
        Option,
        { value: 'rome' },
        'Rome'
      ),
      _react2.default.createElement(
        Option,
        { value: 'vienna', className: 'vienna-option' },
        'Vienna'
      )
    ));

    var viennaOptionNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(combobox, 'vienna-option');
    _reactAddonsTestUtils2.default.Simulate.click(viennaOptionNode);

    expect(wasCalled).toBeTruthy();
  });

  it('should provide a parameter with 2 fields: value and identifier in onUpdate callback', function () {
    var value = void 0;
    var identifier = void 0;
    var isMatch = void 0;
    var isSelect = void 0;

    var combobox = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      ComboBox,
      {
        onUpdate: function onUpdate(obj) {
          value = obj.value;
          identifier = obj.identifier;
          isMatch = obj.isMatchingOption;
          isSelect = obj.isOptionSelection;
        }
      },
      _react2.default.createElement(
        Option,
        { value: 'rome', identifier: 1 },
        'Rome'
      ),
      _react2.default.createElement(
        Option,
        { value: 'vienna', identifier: 2, className: 'vienna-option' },
        'Vienna'
      )
    ));

    var viennaOptionNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(combobox, 'vienna-option');
    _reactAddonsTestUtils2.default.Simulate.click(viennaOptionNode);

    expect(value).toBe('vienna');
    expect(identifier).toBe(2);
    expect(isMatch).toBe(true);
    expect(isSelect).toBe(true);
  });

  it('should change the inputValue on selection', function () {
    var combobox = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      ComboBox,
      { defaultValue: 'vie' },
      _react2.default.createElement(
        Option,
        { value: 'vienna123' },
        'Rome'
      ),
      _react2.default.createElement(
        Option,
        { value: 'vienna', className: 'vienna-option' },
        'Vienna'
      )
    ));

    var viennaOptionNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(combobox, 'vienna-option');
    _reactAddonsTestUtils2.default.Simulate.click(viennaOptionNode);

    expect(combobox.state.inputValue).toBe('vienna');
  });

  it('should be able to adopt the styles of a combobox', function () {
    var combobox = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      ComboBox,
      { style: { cursor: 'cross' } },
      _react2.default.createElement(
        Option,
        { value: 'rome' },
        'Rome'
      ),
      _react2.default.createElement(
        Option,
        { value: 'vienna' },
        'Vienna'
      )
    ));

    var selectedAreaNode = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(combobox, 'input')[1];
    expect(selectedAreaNode.hasAttribute('style')).toBeTruthy();
    expect(selectedAreaNode.getAttribute('style').indexOf('cursor: cross') > -1).toBeTruthy();
  });

  describe('updating props', function () {
    var combobox = void 0;

    beforeEach(function () {
      combobox = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        ComboBox,
        null,
        _react2.default.createElement(
          Option,
          { value: 'rome' },
          'Rome'
        ),
        _react2.default.createElement(
          Option,
          { value: 'vienna' },
          'Vienna'
        )
      ));
    });

    it('should update it\'s state in case value is provided', function () {
      var properties = _extends({}, combobox.props, {
        value: 'vienna'
      });
      combobox.componentWillReceiveProps(properties);

      expect(combobox.state.inputValue).toBe('vienna');
    });

    it('should update it\'s state in case value is provided', function () {
      var valueLink = {
        requestChange: function requestChange() {
          return undefined;
        },
        value: 'vienna'
      };

      var properties = _extends({}, combobox.props, {
        valueLink: valueLink
      });
      combobox.componentWillReceiveProps(properties);

      expect(combobox.state.inputValue).toBe('vienna');
    });

    /*
     it('should not update it\'s state in case defaultValue is updated', () => {
     const properties = extend({}, combobox.props, { defaultValue: "vienna" });
     combobox.componentWillReceiveProps(properties);
       expect(combobox.state.inputValue).toBe("rome");
     });
     */
  });

  function testKeyEvents(container) {
    it('should open the menu by pressing ArrowDown', function () {
      _reactAddonsTestUtils2.default.Simulate.keyDown(container.comboNode, { key: 'ArrowDown' });
      expect(container.combobox.state.isOpen).toBeTruthy();
    });

    it('should open the menu by pressing ArrowUp', function () {
      _reactAddonsTestUtils2.default.Simulate.keyDown(container.comboNode, { key: 'ArrowUp' });
      expect(container.combobox.state.isOpen).toBeTruthy();
    });

    it('should open the menu by pressing Space', function () {
      _reactAddonsTestUtils2.default.Simulate.keyDown(container.comboNode, { key: 'ArrowUp' });
      expect(container.combobox.state.isOpen).toBeTruthy();
    });

    describe('when the menu is open', function () {
      beforeEach(function () {
        container.combobox.setState({ isOpen: true });
      });

      it('should close menu when pressing Escape', function () {
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.comboNode, { key: 'Escape' });
        expect(container.combobox.state.isOpen).toBeFalsy();
      });

      it('should focus on the next option when pressing ArrowDown', function () {
        container.combobox.setState({ focusedOptionIndex: 0 });
        expect(container.combobox.state.focusedOptionIndex).toBe(0);
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.comboNode, { key: 'ArrowDown' });
        expect(container.combobox.state.focusedOptionIndex).toBe(1);
      });

      it('should focus on the first option when pressing ArrowDown and none was focused on', function () {
        container.combobox.setState({ focusedOptionIndex: undefined });
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.comboNode, { key: 'ArrowDown' });
        expect(container.combobox.state.focusedOptionIndex).toBe(0);
      });

      it('should focus on the previous option when pressing ArrowUp', function () {
        container.combobox.setState({ focusedOptionIndex: 2 });
        expect(container.combobox.state.focusedOptionIndex).toBe(2);
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.comboNode, { key: 'ArrowUp' });
        expect(container.combobox.state.focusedOptionIndex).toBe(1);
      });

      it('should focus on the last option when pressing ArrowUp and none was focused on', function () {
        container.combobox.setState({ focusedOptionIndex: undefined });
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.comboNode, { key: 'ArrowUp' });
        expect(container.combobox.state.focusedOptionIndex).toBe(2);
      });

      it('should select the focused option when pressing Enter', function () {
        container.combobox.setState({ focusedOptionIndex: 2 });
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.comboNode, { key: 'Enter' });
        expect(container.combobox.state.inputValue).toBe('berlin');
      });

      it('should select the focused option when pressing Tab', function () {
        container.combobox.setState({ focusedOptionIndex: 2 });
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.comboNode, { key: 'Tab' });
        expect(container.combobox.state.inputValue).toBe('berlin');
      });
    });
  }

  describe('manage key events for simple list', function () {
    // in order to ensure no references are lost a container object is used
    var container = {};

    beforeEach(function () {
      container.combobox = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        ComboBox,
        null,
        _react2.default.createElement(
          Option,
          { value: 'rome' },
          'Rome'
        ),
        _react2.default.createElement(
          Option,
          { value: 'vienna' },
          'Vienna'
        ),
        _react2.default.createElement(
          Option,
          { value: 'berlin' },
          'Berlin'
        )
      ));
      container.comboNode = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(container.combobox, 'input')[1];
    });

    testKeyEvents(container);
  });
});