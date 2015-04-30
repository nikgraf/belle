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
    let header;
    if (this.context.router.getCurrentPath() === '/') {
      header = <header style={ {background: 'rgb(44, 44, 44)', width: '100%'} }>
        <div style={ {margin: '0 auto', width: 800, paddingLeft: 160 } }>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=nikgraf&repo=belle&type=star&count=true&size=large"
            frameBorder="0"
            scrolling="0"
            width="111px"
            height="30px"
            style={ { float: 'right', marginTop: 207 } }>
          </iframe>

          <Link style={{ display: 'inline' }} to="app">
            <h1 style={{ fontSize: 72, margin: 0, paddingTop: 110, color: '#FFF', fontFamily: '"Trebuchet MS", Helvetica, sans-serif' }}>
              <i style={ belleLogoStyle }></i> Belle
            </h1>
          </Link>

          <p style={{ fontSize: 18, marginTop: -10, paddingBottom: 60, color: '#B8B8B8'}}>
            React Components with great User Experience
          </p>
        </div>
      </header>;
    } else {
      header = <header style={ {background: 'rgb(44, 44, 44)', width: '100%'} }>
        <div style={ {margin: '0 auto', width: 800} }>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=nikgraf&repo=belle&type=star&count=true&size=medium"
            frameBorder="0"
            scrolling="0"
            width="73px"
            height="30px"
            style={ { float: 'right', marginTop: 20 } }>
          </iframe>

          <Link style={{ display: 'inline' }} to="app">
            <h1 style={{ fontSize: 24, margin: 0, padding: '10px 0', color: '#FFF', fontFamily: '"Trebuchet MS", Helvetica, sans-serif' }}>
              Belle
            </h1>
          </Link>
        </div>
      </header>;
    }

    return <div>

      { header }

      <div style={ {margin: '0 auto', width: 800, marginTop: 40 } }>
        <div style={ {float: 'left', width: 160 } }>
          <ul style={ { listStyleType: 'none', paddingLeft: 0, marginTop: 0 } }>
            <li>
              <Link style={{ display: 'block' }} to="getting-started">Getting Started</Link>
            </li>
          </ul>
          <span style={ { color: '#888', fontWeight: 'bold' } } >Components</span>
          <ul style={ { listStyleType: 'none', paddingLeft: 0 } }>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block' }} to="component/button">Button</Link>
            </li>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block' }} to="component/card">Card</Link>
            </li>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block' }} to="component/select">Select & Option</Link>
            </li>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block' }} to="component/text-input">TextInput</Link>
            </li>

            <li style={{ marginTop: 12 }}>
              <Link style={{ display: 'block' }} to="philosophy">Philosophy</Link>
            </li>
            <li style={{ marginTop: 12 }}>
              <Link style={{ display: 'block' }} to="configuration">Configuration</Link>
            </li>
            <li style={{ marginTop: 12 }}>
              <Link style={{ display: 'block' }} to="future-work">Future Plans</Link>
            </li>
            <li style={{ marginTop: 12 }}>
              <a style={{ display: 'block' }} href="https://github.com/nikgraf/belle" target="_blank">Code on Github</a>
            </li>
            <li style={{ marginTop: 12 }}>
              <a style={{ display: 'block' }} href="https://github.com/nikgraf/belle/issues" target="_blank">Report an Issue</a>
            </li>
          </ul>
        </div>

        <div style={ {float: 'left', width: 640 } }>
          <RouteHandler/>
        </div>
        <div style={{ clear: 'left' }}></div>
      </div>
      <footer style={{ clear: 'both', textAlign: 'center', paddingTop: 40, marginBottom: 60 }}>
        <span style={{ paddingLeft: 160 }}>
          Built with
          <span style={{ color: 'rgb(200, 0, 0)', fontSize: 22, position: 'relative', top: 3 }}>
            &nbsp;&#x2764;&nbsp;
          </span>
          on Planet Earth :)
        </span>
      </footer>
    </div>;
  }
}

Base.contextTypes = {
  router: React.PropTypes.func
};
