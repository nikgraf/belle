"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import {Input, Card} from 'belle';

// export for http://fb.me/react-devtools
window.React = React;

class App extends Component {

  render() {
    return <div style={ {margin: '0 150px'} }>
      <h1>Belle Examples</h1>

      <h2>Input</h2>

      <Input style={ {width: 250} } defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <br />

      <div style={ {width: 250} }>
        <Input/>
      </div>
      <br />

      <div style={ {width: 250} }>
        <Input value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      </div>
      <br />

      <div>
        <Input defaultValue="This is a very long text. Hint: if you resize the browser and there is not enough space it will automatically expand the box for the height needed. TODO: fix this"/>
      </div>
      <br />

      <div style={ {width: 250} }>
        <Input minHeight={90} placeholder="What is going on? Ohh, we provided a minHeight here." />
      </div>

      <br />

      <h2>Card</h2>

      <Card><p>Looks nice!</p></Card>

      <Card style={ { color: '#2994BB' }} data-custom-attribute={'custom'}>What about another font color?</Card>

    </div>;
  }
}

React.render(<App/>, document.getElementById('react'));
