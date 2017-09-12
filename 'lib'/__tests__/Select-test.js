'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest describe beforeEach it expect */

jest.dontMock('../components/Select');
jest.dontMock('../components/SelectItem');
jest.dontMock('../components/Option');
jest.dontMock('../components/Placeholder');
jest.dontMock('../components/Separator');

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
var Select = require('../components/Select').default;
var Option = require('../components/Option').default;
var Placeholder = require('../components/Placeholder').default;
var Separator = require('../components/Separator').default;

describe('Select', function () {
  it('should initialise selectedValue & focusedOptionValue during construction', function () {
    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      { value: 'vienna' },
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

    expect(select.state.selectedValue).toBe('vienna');
    expect(select.state.focusedOptionValue).toBe('vienna');
  });

  it('should take the first option in case no value, defaultValue or valueLink is defined', function () {
    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
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

    expect(select.state.selectedValue).toBe('rome');
    expect(select.state.focusedOptionValue).toBe('rome');
  });

  it('should not have any option selected, but focusedOn the first in case there is a Placeholder & no value, defaultValue or valueLink is defined', function () {
    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      null,
      _react2.default.createElement(
        Placeholder,
        null,
        'Select a City'
      ),
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

    expect(select.state.selectedValue).toBeUndefined();
    expect(select.state.focusedOptionValue).toBe('rome');
  });

  it('should render the content of selected option', function () {
    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      { value: 'vienna' },
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

    var selectedOptionArea = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(select, 'div')[1];
    expect(selectedOptionArea.childNodes[0].textContent).toBe('Vienna');
  });

  it('should render the content of selected option with a falsy value', function () {
    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      { value: 0 },
      _react2.default.createElement(
        Option,
        { value: 0 },
        'Zero'
      ),
      _react2.default.createElement(
        Option,
        { value: 1 },
        'One'
      )
    ));

    var selectedOptionArea = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(select, 'div')[1];
    expect(selectedOptionArea.childNodes[0].textContent).toBe('Zero');
  });

  it('should render the placeholder content', function () {
    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      null,
      _react2.default.createElement(
        Placeholder,
        null,
        'Select a City'
      ),
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

    var selectedOptionArea = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(select, 'div')[1];

    expect(selectedOptionArea.childNodes[0].textContent).toBe('Select a City');
  });

  it('should work with one option provided', function () {
    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      null,
      _react2.default.createElement(
        Option,
        { value: 'rome' },
        'Rome'
      )
    ));

    var selectedOptionArea = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(select, 'div')[1];
    expect(selectedOptionArea.childNodes[0].textContent).toBe('Rome');
  });

  it('should work with a placehoder and an array of options provided', function () {
    var options = [{ value: 'rome', content: 'Rome' }, { value: 'vienna', content: 'Vienna' }];

    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      null,
      _react2.default.createElement(
        Placeholder,
        null,
        'Select a City'
      ),
      options.map(function (option, index) {
        return _react2.default.createElement(
          Option,
          {
            key: index,
            value: option.value
          },
          option.content
        );
      })
    ));

    var selectedOptionArea = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(select, 'div')[1];
    var entries = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(select, 'li');

    expect(selectedOptionArea.childNodes[0].textContent).toBe('Select a City');
    expect(entries[0].textContent).toBe('Rome');
    expect(entries[1].textContent).toBe('Vienna');
  });

  it('should work with a placehoder and a combination of single options and an array of options provided', function () {
    var options = [{ value: 'rome', content: 'Rome' }, { value: 'vienna', content: 'Vienna' }];

    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      null,
      _react2.default.createElement(
        Placeholder,
        null,
        'Select a City'
      ),
      _react2.default.createElement(
        Option,
        { value: 'boston' },
        'Boston'
      ),
      options.map(function (option, index) {
        return _react2.default.createElement(
          Option,
          {
            key: index,
            value: option.value
          },
          option.content
        );
      }),
      _react2.default.createElement(
        Option,
        { value: 'newyork' },
        'New York'
      )
    ));

    var selectedOptionArea = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(select, 'div')[1];
    var entries = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(select, 'li');

    expect(selectedOptionArea.childNodes[0].textContent).toBe('Select a City');
    expect(entries[0].textContent).toBe('Boston');
    expect(entries[1].textContent).toBe('Rome');
    expect(entries[2].textContent).toBe('Vienna');
    expect(entries[3].textContent).toBe('New York');
  });

  it('should be able to provide a valueLink', function () {
    var wasCalled = false;

    var valueLink = {
      requestChange: function requestChange() {
        wasCalled = true;
      },

      value: 'rome'
    };

    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      { valueLink: valueLink },
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

    var viennaOptionNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(select, 'vienna-option');
    _reactAddonsTestUtils2.default.Simulate.mouseDown(viennaOptionNode);

    expect(wasCalled).toBeTruthy();
  });

  it('should be able to provide a onUpdate callback', function () {
    var wasCalled = false;

    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
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

    var viennaOptionNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(select, 'vienna-option');
    _reactAddonsTestUtils2.default.Simulate.mouseDown(viennaOptionNode);

    expect(wasCalled).toBeTruthy();
  });

  it('should change the selectedValue & focusedOptionValue on selection', function () {
    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      { defaultValue: 'rome' },
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

    var viennaOptionNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(select, 'vienna-option');
    _reactAddonsTestUtils2.default.Simulate.mouseDown(viennaOptionNode);

    expect(select.state.selectedValue).toBe('vienna');
    expect(select.state.focusedOptionValue).toBe('vienna');
  });

  it('should not change the selectedValue & focusedOptionValue on selection in case props.value is provided', function () {
    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
      { value: 'rome' },
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

    var viennaOptionNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(select, 'vienna-option');
    _reactAddonsTestUtils2.default.Simulate.click(viennaOptionNode);

    expect(select.state.selectedValue).toBe('rome');
    expect(select.state.focusedOptionValue).toBe('rome');
  });

  it('should be able to adopt the styles of a select', function () {
    var select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Select,
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

    var selectedAreaNode = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(select, 'div')[1];
    expect(selectedAreaNode.hasAttribute('style')).toBeTruthy();
    expect(selectedAreaNode.getAttribute('style').indexOf('cursor: cross') > -1).toBeTruthy();
  });

  describe('updating props', function () {
    var select = void 0;

    beforeEach(function () {
      select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        Select,
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
      var properties = _extends({}, select.props, {
        value: 'vienna'
      });
      select.componentWillReceiveProps(properties);

      expect(select.state.selectedValue).toBe('vienna');
    });

    it('should update it\'s state in case value is provided', function () {
      var valueLink = {
        requestChange: function requestChange() {
          return undefined;
        },
        value: 'vienna'
      };

      var properties = _extends({}, select.props, {
        valueLink: valueLink
      });
      select.componentWillReceiveProps(properties);

      expect(select.state.selectedValue).toBe('vienna');
    });

    it('should not update it\'s state in case defaultValue is updated', function () {
      var properties = _extends({}, select.props, {
        defaultValue: 'vienna'
      });
      select.componentWillReceiveProps(properties);

      expect(select.state.selectedValue).toBe('rome');
    });
  });

  function testKeyEvents(container) {
    it('should open the menu by pressing ArrowDown', function () {
      _reactAddonsTestUtils2.default.Simulate.keyDown(container.selectNode, { key: 'ArrowDown' });
      expect(container.select.state.isOpen).toBeTruthy();
    });

    it('should open the menu by pressing ArrowUp', function () {
      _reactAddonsTestUtils2.default.Simulate.keyDown(container.selectNode, { key: 'ArrowUp' });
      expect(container.select.state.isOpen).toBeTruthy();
    });

    it('should open the menu by pressing Space', function () {
      _reactAddonsTestUtils2.default.Simulate.keyDown(container.selectNode, { key: 'ArrowUp' });
      expect(container.select.state.isOpen).toBeTruthy();
    });

    describe('when the menu is open', function () {
      beforeEach(function () {
        container.select.setState({ isOpen: true });
      });

      it('should close menu when pressing Escape', function () {
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.selectNode, { key: 'Escape' });
        expect(container.select.state.isOpen).toBeFalsy();
      });

      it('should focus on the next option when pressing ArrowDown', function () {
        expect(container.select.state.focusedOptionValue).toBe('rome');
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.selectNode, { key: 'ArrowDown' });
        expect(container.select.state.focusedOptionValue).toBe('vienna');
      });

      it('should focus on the first option when pressing ArrowDown and none was focused on', function () {
        container.select.setState({ focusedOptionValue: undefined });
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.selectNode, { key: 'ArrowDown' });
        expect(container.select.state.focusedOptionValue).toBe('rome');
      });

      it('should focus on the previous option when pressing ArrowUp', function () {
        container.select.setState({ focusedOptionValue: 'vienna' });
        expect(container.select.state.focusedOptionValue).toBe('vienna');
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.selectNode, { key: 'ArrowUp' });
        expect(container.select.state.focusedOptionValue).toBe('rome');
      });

      it('should focus on the last option when pressing ArrowUp and none was focused on', function () {
        container.select.setState({ focusedOptionValue: undefined });
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.selectNode, { key: 'ArrowUp' });
        expect(container.select.state.focusedOptionValue).toBe('berlin');
      });

      it('should select the focused option when pressing Enter', function () {
        container.select.setState({ focusedOptionValue: 'berlin' });
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.selectNode, { key: 'Enter' });
        expect(container.select.state.selectedValue).toBe('berlin');
      });

      it('should select the focused option when pressing Space', function () {
        container.select.setState({ focusedOptionValue: 'berlin' });
        _reactAddonsTestUtils2.default.Simulate.keyDown(container.selectNode, { key: ' ' });
        expect(container.select.state.selectedValue).toBe('berlin');
      });
    });
  }

  describe('manage key events for simple list', function () {
    // in order to ensure no references are lost a container object is used
    var container = {};

    beforeEach(function () {
      container.select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        Select,
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
      container.selectNode = _reactDom2.default.findDOMNode(container.select);
    });

    testKeyEvents(container);
  });

  describe('manage key events when separators are present', function () {
    // in order to ensure no references are lost a container object is used
    var container = {};

    beforeEach(function () {
      container.select = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        Select,
        null,
        _react2.default.createElement(
          Separator,
          null,
          'Italy'
        ),
        _react2.default.createElement(
          Option,
          { value: 'rome' },
          'Rome'
        ),
        _react2.default.createElement(
          Separator,
          null,
          'Austria'
        ),
        _react2.default.createElement(
          Option,
          { value: 'vienna' },
          'Vienna'
        ),
        _react2.default.createElement(
          Separator,
          null,
          'Germany'
        ),
        _react2.default.createElement(
          Option,
          { value: 'berlin' },
          'Berlin'
        )
      ));
      container.selectNode = _reactDom2.default.findDOMNode(container.select);
    });

    testKeyEvents(container);
  });
});