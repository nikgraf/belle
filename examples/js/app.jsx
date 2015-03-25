"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {Input, Card, Button} from 'belle';

function conditionalInput (showInput) {
  if (showInput) {
    return <Input style={ {width: 250} } defaultValue="This Input can be removed." />;
  }
}

// export for http://fb.me/react-devtools
window.React = React;

class App extends Component {

  constructor(properties) {
    this.state = {
      showInput: true
    };
    super(properties);
  }

  _removeInput() {
    this.setState({
      showInput: false
    });
  }

  render() {
    return <div style={ {margin: '0 150px'} }>
      <h1>Belle Examples</h1>

      <h2>Button</h2>

      <Button>Press me …</Button>

      <Button primary={ true }>Primary Button</Button>

      <h2>Input</h2>

      {/* Common use case */}
      <Input style={ {width: 250} } defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <br />

      {/* Remove Input behaviour */}
      {conditionalInput(this.state.showInput)}
      <br />
      <button type="button" onClick={this._removeInput.bind(this)}>Remove Input</button>

      {/* Empty Input */}
      <Input style={ {width: 250} }/>
      <br />

      {/* Not editable value */}
      <div style={ {width: 250} }>
        <Input value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      </div>
      <br />

      {/* Full width input */}
      <div style={ {position: 'relative'} }>
        <Input defaultValue="This is a very long text. Hint: if you resize the browser and there is not enough space it will automatically expand the box for the height needed. TODO: fix this"/>
      </div>
      <br />

      {/* Input with placeholder & a minHeight & custom hoverStyle */}
      <div style={ {width: 250} }>
        <Input minHeight={120}
               placeholder="What is going on? Ohh, we provided a minHeight & a custom hoverStyle & focusStyle here."
               hoverStyle={ { borderBottom: '1px red solid' } }
               focusStyle={ { borderBottom: '1px brown solid' } } />
      </div>

      <br />

      <h2>Card</h2>

      <Card><p>Looks nice!</p></Card>

      <Card style={ { color: '#2994BB' }} data-custom-attribute={'custom'}>What about another font color?</Card>

    </div>;
  }
}

React.render(<App/>, document.getElementById('react'));
