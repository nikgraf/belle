/* global jest describe beforeEach it expect */

jest.dontMock('../components/Button');
jest.dontMock('../utils/inject-style');
jest.dontMock('../utils/union-class-names');
jest.dontMock('../components/Button/styles');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// Babel would move an import in front of the jest.dontMock. That's why require
// is used instead of import.
const Button = require('../components/Button').default;
const injectStyle = require('../utils/inject-style');

describe('Button', () => {
  describe('without any properties', () => {
    const button = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );
    let buttonNode;

    beforeEach(() => {
      injectStyle.injectStyles = jest.genMockFunction();
      buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    });

    it('should come with default styles', () => {
      expect(buttonNode.hasAttribute('style')).toBeTruthy();
    });

    it('should set the type to button by default', () => {
      expect(buttonNode.type).toBe('button');
    });

    it('should inject styles for active & foucs', () => {
      expect(injectStyle.injectStyles.mock.calls.length).toBe(1);

      const styles = injectStyle.injectStyles.mock.calls[0][0];
      expect(styles[0].pseudoClass).toBe('active');
      expect(styles[2].pseudoClass).toBe('focus');
    });
  });

  it('should be able to bind onClick', () => {
    let wasClicked = false;

    // Render a button with an onClick handler
    const button = TestUtils.renderIntoDocument(
      <Button onClick={ () => { wasClicked = true; }}>Follow</Button>
    );

    // Simulate a click
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));

    expect(wasClicked).toBeTruthy();
  });

  it('should be able to provide a className', () => {
    const button = TestUtils.renderIntoDocument(
      <Button className="test-me">Follow</Button>
    );

    const buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.className).toContain('test-me');
  });

  it('should be able to adopt the style of the button', () => {
    const button = TestUtils.renderIntoDocument(
      <Button style={{ color: '#F00' }}>Follow</Button>
    );

    const buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.getAttribute('style').indexOf('color: rgb(255, 0, 0)') > -1).toBeTruthy();
  });

  it('should be able to use a primary button', () => {
    const defaultButton = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    const primaryButton = TestUtils.renderIntoDocument(
      <Button primary>Follow</Button>
    );

    const defaultButtonNode = TestUtils.findRenderedDOMComponentWithTag(defaultButton, 'button');
    const prmaryButtonNode = TestUtils.findRenderedDOMComponentWithTag(primaryButton, 'button');

    expect(prmaryButtonNode.getAttribute('style')).not.toEqual(defaultButtonNode.getAttribute('style'));
  });

  it('should be able to change the type to submit or reset', () => {
    const submitButton = TestUtils.renderIntoDocument(
      <Button type="submit">Submit</Button>
    );
    const submitButtonNode = TestUtils.findRenderedDOMComponentWithTag(submitButton, 'button');
    expect(submitButtonNode.type).toBe('submit');

    const resetButton = TestUtils.renderIntoDocument(
      <Button type="reset">Submit</Button>
    );
    const resetButtonNode = TestUtils.findRenderedDOMComponentWithTag(resetButton, 'button');
    expect(resetButtonNode.type).toBe('reset');
  });

  it('should be able to adopt the pseudoClass styles of the button', () => {
    injectStyle.injectStyles = jest.genMockFunction();

    const bodyWithButton = TestUtils.renderIntoDocument(
      <Button
        hoverStyle={{ color: 'red' }}
        focusStyle={{ color: 'brown' }}
        activeStyle={{ color: 'green' }}
        preventFocusStyleForTouchAndClick={ false }
      >
        Follow
      </Button>
    );

    TestUtils.findRenderedDOMComponentWithTag(bodyWithButton, 'button');

    expect(injectStyle.injectStyles.mock.calls.length).toBe(1);

    const styles = injectStyle.injectStyles.mock.calls[0][0];

    expect(styles[0].pseudoClass).toBe('active');
    expect(styles[0].style.color).toBe('green');
    expect(styles[2].pseudoClass).toBe('focus');
    expect(styles[2].style.color).toBe('brown');
  });

  it('should remove the custom styles from the dom when the button unmounts', () => {
    injectStyle.removeStyle = jest.genMockFunction();
    expect(injectStyle.removeStyle.mock.calls.length).toBe(0);

    const button = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    button.componentWillUnmount();

    expect(injectStyle.removeStyle.mock.calls.length).toBe(1);
  });

  it('should set isHovered state to true on mouseEnter and false on mouseLeave', () => {
    const button = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    expect(button.state.isHovered).toBeFalsy();
    TestUtils.Simulate.mouseEnter(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));
    expect(button.state.isHovered).toBeTruthy();
    TestUtils.Simulate.mouseLeave(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));
    expect(button.state.isHovered).toBeFalsy();
  });
});
