"use strict";

import React, {Component} from 'react';
import {Card} from 'belle';
import {RouteHandler, Link} from 'react-router';
import Column from './Column';

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
      header = <header style={ {background: 'rgb(44, 44, 44)', width: '100%', marginBottom: 40} }>
        <Column smallScreenStyle={{ width: '100%', padding: '0 20px' }}
                mediumScreenStyle={{margin: '0 auto', width: 800, paddingLeft: 160 }}>

          <Link style={{ display: 'inline' }} to="app">
            <h1 style={{ fontSize: 72, margin: 0, paddingTop: 110, color: '#FFF', fontFamily: '"Trebuchet MS", Helvetica, sans-serif' }}>
              <i style={ belleLogoStyle }></i> Belle
            </h1>
          </Link>

          <p style={{ fontSize: 22, marginTop: -10, paddingBottom: 20, color: '#FEFEFE'}}>
            Configurable React Components with great UX
          </p>

          <iframe
            src="https://ghbtns.com/github-btn.html?user=nikgraf&repo=belle&type=star&count=true&size=large"
            frameBorder="0"
            scrolling="0"
            width="120px"
            height="30px"
            style={ { marginBottom: 20 } }>
          </iframe>
        </Column>
      </header>;
    } else {
      header = <header style={ {background: 'rgb(44, 44, 44)', width: '100%', marginBottom: 40} }>
        <Column smallScreenStyle={{ width: '100%', padding: '0 20px' }}
                mediumScreenStyle={{margin: '0 auto', width: 800}}>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=nikgraf&repo=belle&type=star&count=true&size=medium"
            frameBorder="0"
            scrolling="0"
            width="78px"
            height="30px"
            style={ { float: 'right', marginTop: 20 } }>
          </iframe>

          <Link style={{ display: 'inline' }} to="app">
            <h1 style={{ fontSize: 24, margin: 0, padding: '10px 0', color: '#FFF', fontFamily: '"Trebuchet MS", Helvetica, sans-serif' }}>
              Belle
            </h1>
          </Link>
        </Column>
      </header>;
    }

    return <div>

      { header }

      <Column smallScreenStyle={{ width: '100%' }}
              mediumScreenStyle={{margin: '0 auto', width: 800 }}>

        <Column smallScreenStyle={{ width: '100%', padding: '0 40px' }}
                mediumScreenStyle={{ float: 'left', width: 160 }}>
          <ul style={ { listStyleType: 'none', paddingLeft: 0, marginTop: 0 } }>
            <li>
              <Link style={{ display: 'block' }} to="getting-started">Getting Started</Link>
            </li>
          </ul>
          <span style={ { color: '#888', fontWeight: 'bold' } } >Components</span>
          <ul style={ { listStyleType: 'none', paddingLeft: 0 } }>
            <li>
              <Link style={{ display: 'block' }} to="component/button">Button</Link>
            </li>
            <li>
              <Link style={{ display: 'block' }} to="component/card">Card</Link>
            </li>
            <li>
              <Link style={{ display: 'block' }} to="component/select">Select</Link>
            </li>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block' }} to="component/option">Option</Link>
            </li>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block' }} to="component/placeholder">Placeholder</Link>
            </li>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block' }} to="component/separator">Separator</Link>
            </li>
            <li>
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
        </Column>

        <Column smallScreenStyle={{ width: '96%', margin: '0 auto' }}
                mediumScreenStyle={{ float: 'left', width: 640 }}>
          <RouteHandler/>
        </Column>
        <div style={{ clear: 'left' }}></div>
      </Column>
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
