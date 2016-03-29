/* global jest describe beforeEach it expect */

jest.dontMock('../components/Card');
jest.dontMock('../utils/inject-style');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Card = require('../components/Card').default;

describe('Card', () => {
  it('should render its children', () => {
    const card = TestUtils.renderIntoDocument(
      <Card><span>Hello there</span></Card>
    );
    const divNode = TestUtils.findRenderedDOMComponentWithTag(card, 'div');
    const spanNode = TestUtils.findRenderedDOMComponentWithTag(card, 'span');

    expect(divNode.tagName).toEqual('DIV');
    expect(divNode.childNodes[0].tagName).toEqual('SPAN');
    expect(spanNode.textContent).toEqual('Hello there');
  });
});
