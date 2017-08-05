/* global jest describe beforeEach it expect */

jest.dontMock('../components/Placeholder');
jest.dontMock('../style/placeholder');

import React from 'react';
import TestUtils from 'react-dom/test-utils';

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Placeholder = require('../components/Placeholder').default;

describe('Placeholder', () => {
  it('should come with a set of default styles', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder>Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.hasAttribute('style')).toBeTruthy();
    expect(div.getAttribute('style').indexOf('color: rgb(102, 102, 102)') > -1).toBeTruthy();
  });

  it('should be able to overwrite the default styles', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder style={{ color: '#F00' }}>Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.hasAttribute('style')).toBeTruthy();
    expect(div.getAttribute('style').indexOf('color: rgb(255, 0, 0)') > -1).toBeTruthy();
  });

  it('should be able to provide custom properties', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder data-custom="example">Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.getAttribute('data-custom')).toBe('example');
  });
});
