/* global jest describe beforeEach it expect */

jest.dontMock('../components/Option');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Option = require('../components/Option');

describe('Option', () => {
  it('should initialise _isHovered & _isDisplayedAsSelected during construction', () => {
    const option = TestUtils.renderIntoDocument(
      <Option value="rome">Rome</Option>
    );

    expect(option._isHovered).toBeFalsy();
    expect(option._isDisplayedAsSelected).toBeFalsy();
  });

  it('should show the select style in case _isDisplayedAsSelected is true', () => {
    const option = TestUtils.renderIntoDocument(
      <Option value="rome" _isDisplayedAsSelected>Rome</Option>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(option, 'div');
    expect(div.getAttribute('style')).toBeDefined();
    expect(div.getAttribute('style').indexOf('padding:0') > -1).toBeTruthy();
  });

  it('should show the hover style in case _isHovered is true', () => {
    const option = TestUtils.renderIntoDocument(
      <Option value="rome" _isHovered>Rome</Option>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(option, 'div');
    expect(div.getAttribute('style')).toBeDefined();
    expect(div.getAttribute('style').indexOf('background:#F5F5F5') > -1).toBeTruthy();
  });

  it('should be able to provide custom properties', () => {
    const option = TestUtils.renderIntoDocument(
      <Option value="rome" data-custom="example">Rome</Option>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(option, 'div');
    expect(div.getAttribute('data-custom')).toBe('example');
  });
});
