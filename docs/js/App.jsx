"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import ButtonDocumentation from './ButtonDocumentation';
import InputDocumentation from './InputDocumentation';
import CardDocumentation from './CardDocumentation';
import {Card} from 'belle';

// export for http://fb.me/react-devtools
window.React = React;

const belleLogoStyle = {
  height: 32,
  width: 32,
  background: '#53C7F2',
  display: 'inline-block',
  fontSize: 14,
  borderRadius: '100%',
  position: 'relative',
  top: 1
};

class App extends Component {

  render() {
    return <div style={ {margin: '0 auto', width: 640 } }>
      <h1 style={{ fontSize: 42 }}><i style={ belleLogoStyle }></i> Belle</h1>

      <p style={{ fontSize: 28, marginTop: 50 }}>
        <i>
          <a href="http://facebook.github.io/react/">React</a> Components with a great User Experience.
        </i>
      </p>
      <p><b>Notice:</b> Keep in mind this library is early stage and might change a lot soon.</p>


      <h2 style={{ float: 'left' }}>Components</h2>

      <ul style={ { listStyleType: 'none', paddingLeft: 10, paddingTop: 12, float: 'left' } }>
        <li style={{ float: 'left', padding: '0 10px' }}><a href="#button">Button</a></li>
        <li style={{ float: 'left', padding: '0 10px' }}><a href="#input">Input</a></li>
        <li style={{ float: 'left', padding: '0 10px' }}><a href="#card">Card</a></li>
      </ul>

      <div style={{ clear: 'left' }}></div>

      <ButtonDocumentation />
      <InputDocumentation />
      <CardDocumentation />

    </div>;
  }
}

React.render(<App/>, document.getElementById('react'));
