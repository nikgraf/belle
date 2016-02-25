/* global jest describe beforeEach it expect */

jest.dontMock('../components/Spinner');
jest.dontMock('../components/Spinner/styles');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Spinner = require('../components/Spinner').default;

describe('Spinner', () => {
  it('should come with default styles', () => {
    const spinner = TestUtils.renderIntoDocument(
      <Spinner />
    );
    const spanNode = TestUtils.scryRenderedDOMComponentsWithTag(spinner, 'span')[0];
    expect(spanNode.hasAttribute('style')).toBeTruthy();
    expect(spanNode.getAttribute('style')).toContain('font-size:15px');
  });

  it('should be able to adopt the style of the spinner wrapper', () => {
    const spinner = TestUtils.renderIntoDocument(
      <Spinner style={{ width: 200 }} />
    );
    const spanNode = TestUtils.scryRenderedDOMComponentsWithTag(spinner, 'span')[0];
    expect(spanNode.getAttribute('style')).toContain('width:200px');
  });

  it('should be able to adopt the character style of the spinner', () => {
    const spinner = TestUtils.renderIntoDocument(
      <Spinner characterStyle={{ color: 'red' }} />
    );
    const spanNode = TestUtils.scryRenderedDOMComponentsWithTag(spinner, 'span')[1];
    expect(spanNode.getAttribute('style')).toContain('color:red');
  });
});
