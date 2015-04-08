"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {TextInput, Card, Button, Toggle, style} from 'belle';
import {extend} from 'underscore';

style.button.defaultStyle = {
  boxSizing: 'border-box',
  borderRadius: 2,
  cursor: 'pointer',
  padding: '8px 12px 6px 12px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  background: 'red',
  border: '1px solid #EFEFEF',
  borderBottomColor: '#D0D0D0',
  color: 'brown',
  verticalAlign: 'bottom',
  fontSize: 16,
  lineHeight: '26px'
};

style.card.defaultStyle = extend(style.card.defaultStyle, {
  background: '#ddd'
});

style.textInput.defaultStyle = extend(style.textInput.defaultStyle, {
  color: 'blue'
});

function conditionalTextInput (showTextInput) {
  if (showTextInput) {
    return <TextInput style={ {width: 250} } defaultValue="This TextInput can be removed." />;
  }
}

// export for http://fb.me/react-devtools
window.React = React;

class App extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      showTextInput: true
    };
  }

  _removeTextInput() {
    this.setState({
      showTextInput: false
    });
  }

  render() {
    return <div style={ {margin: '0 150px'} }>
      <h1>Belle Playground</h1>

      <h2>Toggle</h2>

      <Toggle />

      <h2>Button</h2>

      <Button>Press me …</Button>

      <Button primary={ true }>Primary Button</Button>

      <h2>TextInput</h2>

      {/* Common use case */}
      <TextInput style={ {width: 250} } defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <br />

      {/* Remove TextInput behaviour */}
      {conditionalTextInput(this.state.showTextInput)}
      <br />
      <button type="button" onClick={this._removeTextInput.bind(this)}>Remove TextInput</button>

      {/* Empty TextInput */}
      <TextInput style={ {width: 250} }/>
      <br />

      {/* Not editable value */}
      <div style={ {width: 250} }>
        <TextInput value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      </div>
      <br />

      {/* Full width TextInput */}
      <div style={ {position: 'relative'} }>
        <TextInput defaultValue="This is a very long text. Hint: if you resize the browser and there is not enough space it will automatically expand the box for the height needed. TODO: fix this"/>
      </div>
      <br />

      {/* TextInput with placeholder & a minHeight & custom hoverStyle */}
      <div style={ {width: 250} }>
        <TextInput minHeight={120}
               placeholder="What is going on? Ohh, we provided a minHeight & a custom hoverStyle & focusStyle here."
               hoverStyle={ { borderBottom: '1px red solid' } }
               focusStyle={ { borderBottom: '1px brown solid' } } />
      </div>


      <br />

      <label>
        <input type="radio" value="true"/>
        <input type="radio" value="false"/>
        Test
      </label>

      <br />

      <h2>Card</h2>

      <Card><p>Looks nice!</p></Card>

      <Card style={ { color: '#2994BB' }} data-custom-attribute={'custom'}>What about another font color?</Card>

    </div>;
  }
}

React.render(<App/>, document.getElementById('react'));
