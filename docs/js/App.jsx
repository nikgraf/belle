"use strict";

/* jslint browser: true */

import React, {Component} from 'react';
import ButtonDocumentation from './ButtonDocumentation';
import InputDocumentation from './InputDocumentation';

// export for http://fb.me/react-devtools
window.React = React;

class App extends Component {

  render() {
    return <div style={ {margin: '0 auto', width: 640 } }>
      <h1>Belle Documentation</h1>

      <ul style={ { listStyleType: 'none', paddingLeft: 0 } }>
        <li><a href="#button">Button</a></li>
        <li><a href="#input">Input</a></li>
      </ul>

      <ButtonDocumentation />
      <InputDocumentation />

    </div>;
  }
}

React.render(<App/>, document.getElementById('react'));
