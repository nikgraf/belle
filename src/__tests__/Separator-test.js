/* global jest describe beforeEach it expect */

jest.dontMock('../components/Separator');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Separator = require('../components/Separator');

describe('Separator', () => {
  it('should come with a set of default styles', () => {
    const separator = TestUtils.renderIntoDocument(
      <Separator>Europe</Separator>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(separator, 'div');
    expect(div.hasAttribute('style')).toBeTruthy();
    expect(div.getAttribute('style').indexOf('color:#666') > -1).toBeTruthy();
  });

  it('should be able to overwrite the default styles', () => {
    const separator = TestUtils.renderIntoDocument(
      <Separator style={ { color: '#F00'} }>Please select a city</Separator>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(separator, 'div');
    expect(div.hasAttribute('style')).toBeTruthy();
    expect(div.getAttribute('style').indexOf('color:#F00') > -1).toBeTruthy();
  });

  it('should be able to provide custom properties', () => {
    const separator = TestUtils.renderIntoDocument(
      <Separator data-custom="example">Please select a city</Separator>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(separator, 'div');
    expect(div.getAttribute('data-custom')).toBe('example');
  });
});
