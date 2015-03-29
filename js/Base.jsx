"use strict";

import React, {Component} from 'react';
import {Card} from 'belle';
import {RouteHandler, Link} from 'react-router';

const belleLogoStyle = {
  height: 54,
  width: 54,
  background: '#53C7F2',
  display: 'inline-block',
  fontSize: 14,
  borderRadius: '100%',
  position: 'relative',
  top: 1
};

export default class Base extends Component {

  render() {
    return <div>
      <header style={ {background: 'rgb(44, 44, 44)', width: '100%'} }>
        <div style={ {margin: '0 auto', width: 640 } }>
          <h1 style={{ fontSize: 72, margin: 0, paddingTop: 110, color: '#FFF', fontFamily: '"Trebuchet MS", Helvetica, sans-serif' }}><i style={ belleLogoStyle }></i> Belle</h1>

          <p style={{ fontSize: 18, marginTop: -10, paddingBottom: 60, color: '#B8B8B8'}}>
            React Components with great User Experience
          </p>
        </div>
      </header>

      <div style={ {margin: '0 auto', width: 640, marginTop: 40 } }>
        <p><b>Notice:</b> Keep in mind this library is early stage and might change a lot soon.</p>

        <h2 style={{ float: 'left' }}>Components</h2>

        <ul style={ { listStyleType: 'none', paddingLeft: 10, paddingTop: 12, float: 'left' } }>
          <li style={{ float: 'left', padding: '0 10px' }}>
            <Link to="component/button">Button</Link>
          </li>
          <li style={{ float: 'left', padding: '0 10px' }}>
            <Link to="component/text-input">TextInput</Link>
          </li>
          <li style={{ float: 'left', padding: '0 10px' }}>
            <Link to="component/card">Card</Link>
          </li>
        </ul>

        <div style={{ clear: 'left' }}></div>

        <RouteHandler/>
      </div>
    </div>;
  }
}
