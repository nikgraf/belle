/* global jest describe beforeEach it expect */

jest.dontMock('../components/Option');
jest.dontMock('../components/Option/styles');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Option = require('../components/Option').default;

describe('Option', () => {
  let shallowRenderer;

  beforeEach(() => {
    shallowRenderer = TestUtils.createRenderer();
  });

  it('should initialise _isDisplayedAsSelected during construction', () => {
    shallowRenderer.render(
      <Option value="rome">Rome</Option>,
      { isDisabled: false, }
    );
    const option = shallowRenderer.getRenderOutput();

    expect(option._isDisplayedAsSelected).toBeFalsy();
  });

  it('should show the select style in case _isDisplayedAsSelected is true', () => {
    shallowRenderer.render(
      <Option value="rome" _isDisplayedAsSelected>Rome</Option>,
      { isDisabled: false, }
    );
    const option = shallowRenderer.getRenderOutput();

    expect(option.props.style.padding).toBe(0);
  });

  it('should show the hover style in case _isHovered is true', () => {
    shallowRenderer.render(
      <Option value="rome">Rome</Option>,
      {
        isDisabled: false,
        isHoveredValue: 'rome',
      }
    );
    const option = shallowRenderer.getRenderOutput();

    expect(option.props.style.background).toBe('#F5F5F5');
  });

  it('should be able to provide custom properties', () => {
    shallowRenderer.render(
      <Option value="rome" data-custom="example">Rome</Option>,
      { isDisabled: false, }
    );
    const option = shallowRenderer.getRenderOutput();

    expect(option.props['data-custom']).toBe('example');
  });
});
