"use strict";

jest.dontMock('../lib/components/Placeholder');

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Placeholder = require('../lib/components/Placeholder');

describe('Placeholder', () => {

  it('should come with a set of default styles', () => {
    const option = TestUtils.renderIntoDocument(
      <Placeholder>Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(option, 'div');
    expect(div.props.style.color).toBe('#666');
  });

  it('should be able to overwrite the default styles', () => {
    const option = TestUtils.renderIntoDocument(
      <Placeholder style={ { color: '#F00'} }>Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(option, 'div');
    expect(div.props.style.color).toBe('#F00');
  });

});
