"use strict";

jest.dontMock('../lib/components/Button');
jest.dontMock('../lib/utils/inject-style');

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

const injectStyle = require('../lib/utils/inject-style');


// Babel would move an import in front of the jest.dontMock. That's why require
// is used here.
const Button = require('../lib/components/Button');

describe('Button', () => {

  describe('without any properties', () => {

    var button, buttonNode;

    beforeEach(() => {
      injectStyle.injectStyles = jest.genMockFunction();
      button = TestUtils.renderIntoDocument(
        <Button>Follow</Button>
      );
      buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    });


    it('should come with default styles', () => {
      expect(buttonNode.props.style).toBeDefined();
    });


    it('should set the type to button by default', () => {
      expect(buttonNode.props.type).toEqual('button');
    });


    it('should inject styles for hover, active & foucs', () => {
      expect(injectStyle.injectStyles.mock.calls.length).toBe(1);

      const styles = injectStyle.injectStyles.mock.calls[0][0];
      expect(styles[0].pseudoClass).toBe('hover');
      expect(styles[1].pseudoClass).toBe('focus');
      expect(styles[2].pseudoClass).toBe('active');
    });

  });


  it('should be able to bind onClick', () => {
    let wasClicked = false;

    // Render a button with an onClick handler
    const button = TestUtils.renderIntoDocument(
      <Button onClick={ function() { wasClicked = true; } }>Follow</Button>
    );

    // Simulate a click
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));

    expect(wasClicked).toEqual(true);
  });


  it('should be able to provide a className', () => {
    const button = TestUtils.renderIntoDocument(
      <Button className="test-me">Follow</Button>
    );

    const buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.props.className).toEqual('test-me');
  });


  it('should be able to adopt the style of the button', () => {
    const button = TestUtils.renderIntoDocument(
      <Button style={{ color: '#F00' }}>Follow</Button>
    );

    const buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.props.style.color).toEqual('#F00');
  });


  it('should be able to use a primary button', () => {
    const defaultButton = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    const primaryButton = TestUtils.renderIntoDocument(
      <Button primary={ true }>Follow</Button>
    );

    const defaultButtonNode = TestUtils.findRenderedDOMComponentWithTag(defaultButton, 'button');
    const prmaryButtonNode = TestUtils.findRenderedDOMComponentWithTag(primaryButton, 'button');

    expect(prmaryButtonNode.props.style.background).toNotEqual(defaultButtonNode.props.style.background);
  });

  it('should be able to change the type to submit or reset', () => {
    const submitButton = TestUtils.renderIntoDocument(
      <Button type="submit">Submit</Button>
    );
    const submitButtonNode = TestUtils.findRenderedDOMComponentWithTag(submitButton, 'button');
    expect(submitButtonNode.props.type).toEqual('submit');

    const resetButton = TestUtils.renderIntoDocument(
      <Button type="reset">Submit</Button>
    );
    const resetButtonNode = TestUtils.findRenderedDOMComponentWithTag(resetButton, 'button');
    expect(resetButtonNode.props.type).toEqual('reset');
  });


  it('should blur the button after clicking', () => {
    const button = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    button._blur = jest.genMockFunction();

    const buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    TestUtils.Simulate.click(buttonNode);

    expect(button._blur.mock.calls.length).toBe(1);
  });


  it('should be able to adopt the pseudoClass styles of the button', function() {
    injectStyle.injectStyles = jest.genMockFunction();

    const bodyWithButton = TestUtils.renderIntoDocument(
      <Button hoverStyle={{ color: 'red' }}
              focusStyle={{ color: 'brown' }}
              activeStyle={{ color: 'green' }}>
        Follow
      </Button>
    );

    const buttonNode = TestUtils.findRenderedDOMComponentWithTag(bodyWithButton, 'button');

    expect(injectStyle.injectStyles.mock.calls.length).toBe(1);

    const styles = injectStyle.injectStyles.mock.calls[0][0];
    expect(styles[0].pseudoClass).toBe('hover');
    expect(styles[0].style.color).toBe('red');
    expect(styles[1].pseudoClass).toBe('focus');
    expect(styles[1].style.color).toBe('brown');
    expect(styles[2].pseudoClass).toBe('active');
    expect(styles[2].style.color).toBe('green');

  });

  it('should remove the custom styles from the dom when the button unmounts', function() {
    injectStyle.removeStyle = jest.genMockFunction();
    expect(injectStyle.removeStyle.mock.calls.length).toBe(0);

    const button = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    button.componentWillUnmount();

    expect(injectStyle.removeStyle.mock.calls.length).toBe(1);
  });

});
