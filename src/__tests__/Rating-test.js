/* global jest describe beforeEach it expect */

jest.dontMock('../components/Rating');
jest.dontMock('../utils/inject-style');
jest.dontMock('../utils/union-class-names');

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Rating = require('../components/Rating');

describe('Rating', () => {
  it('should be able to provide a valueLink', () => {
    const valueLink = {
      requestChange: () => {},
      value: 1
    };
    const rating = TestUtils.renderIntoDocument(<Rating valueLink={ valueLink } />);

    expect(rating.state.value).toBe( 1 );
  });

  it('should be able to provide a value', () => {
    const rating = TestUtils.renderIntoDocument(<Rating value={ 4 } />);
    expect(rating.state.value).toBe( 4 );
  });

  it('should be able to provide a defaultValue', () => {
    const rating = TestUtils.renderIntoDocument(<Rating defaultValue={ 2 } />);
    expect(rating.state.value).toBe( 2 );
  });

  it('should to not provide any kind of value', () => {
    const rating = TestUtils.renderIntoDocument(<Rating />);
    expect(rating.state.value).toBeUndefined();
  });

  it('should not be able to change value via the user interface if a value property is defined', () => {
    const rating = TestUtils.renderIntoDocument(<Rating value={ 4 } />);
    rating.setState({ focusedValue: 3 });
    rating._updateComponent();
    expect(rating.state.value).toBe( 4 );
  });

  describe('update the internal value', () => {
    let rating;

    beforeEach(() => {
      rating = TestUtils.renderIntoDocument(
        <Rating />
      );
    });

    it('should be possible by updating the value property', () => {
      rating.componentWillReceiveProps({ value: 2 });
      expect(rating.state.value).toBe( 2 );
    });

    it('should be possible by updating the valueLink property', () => {
      const valueLink = {
        requestChange: () => {},
        value: 1
      };

      rating.componentWillReceiveProps({ valueLink: valueLink });
      expect(rating.state.value).toBe( 1 );
    });

    it('should not be possible by updating the defaultValue property', () => {
      rating.componentWillReceiveProps({ defaultValue: 3 });
      expect(rating.state.value).toBeUndefined();
    });
  });
});
