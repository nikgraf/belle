/* global jest describe beforeEach it expect */

jest.dontMock('../components/Placeholder');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Placeholder = require('../components/Placeholder');

describe('Placeholder', () => {
  it('should come with a set of default styles', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder>Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.getAttribute('style')).toBeDefined();
    expect(div.getAttribute('style').indexOf('color:#666') > -1).toBeTruthy();
  });

  it('should be able to overwrite the default styles', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder style={ { color: '#F00'} }>Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.getAttribute('style')).toBeDefined();
    expect(div.getAttribute('style').indexOf('color:#F00') > -1).toBeTruthy();
  });

  it('should be able to provide custom properties', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder data-custom="example">Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.getAttribute('data-custom')).toBe('example');
  });
});
