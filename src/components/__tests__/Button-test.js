"use strict";

jest.dontMock('../Button');

var React = require('react/addons');
var Button = require('../Button');
var TestUtils = React.addons.TestUtils;

describe('Button', function() {

  describe('without any properties', function() {

    var button, buttonNode;

    beforeEach(function() {
      button = TestUtils.renderIntoDocument(
        <Button>Follow</Button>
      );
      buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    });

    it('should come with default styles', function() {
      expect(buttonNode.props.style).toBeDefined();
    });

    it('should set the type to button by default', function() {
      expect(buttonNode.props.type).toEqual('button');
    });

  });

  it('should be able to bind onClick', function() {

    var wasClicked = false;

    // Render a button with an onClick handler
    var button = TestUtils.renderIntoDocument(
      <Button onClick={ function() { wasClicked = true; } }>Follow</Button>
    );

    // Simulate a click
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(button, 'button'));

    expect(wasClicked).toEqual(true);

  });

  it('should be able to provide a className', function() {
    var button = TestUtils.renderIntoDocument(
      <Button className="test-me">Follow</Button>
    );

    var buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.props.className).toEqual('test-me');
  });


  it('should be able to adopt the style of the button', function() {
    var button = TestUtils.renderIntoDocument(
      <Button style={{ color: '#F00' }}>Follow</Button>
    );

    var buttonNode = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
    expect(buttonNode.props.style.color).toEqual('#F00');
  });

  it('should be able to use a primary button', function() {
    var defaultButton = TestUtils.renderIntoDocument(
      <Button>Follow</Button>
    );

    var primaryButton = TestUtils.renderIntoDocument(
      <Button primary={ true }>Follow</Button>
    );

    var defaultButtonNode = TestUtils.findRenderedDOMComponentWithTag(defaultButton, 'button');
    var prmaryButtonNode = TestUtils.findRenderedDOMComponentWithTag(primaryButton, 'button');

    expect(prmaryButtonNode.props.style.background).toNotEqual(defaultButtonNode.props.style.background);
  });

});
