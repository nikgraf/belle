/*global jest describe beforeEach it expect */

jest.dontMock('../lib/components/Placeholder');

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Placeholder = require('../lib/components/Placeholder');

describe('Placeholder', () => {
  it('should come with a set of default styles', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder>Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.props.style.color).toBe('#666');
  });

  it('should be able to overwrite the default styles', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder style={ { color: '#F00'} }>Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.props.style.color).toBe('#F00');
  });

  it('should be able to provide custom properties', () => {
    const placeholder = TestUtils.renderIntoDocument(
      <Placeholder data-custom="example">Please select a city</Placeholder>
    );

    const div = TestUtils.findRenderedDOMComponentWithTag(placeholder, 'div');
    expect(div.props['data-custom']).toBe('example');
  });
});
