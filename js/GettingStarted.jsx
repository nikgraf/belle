"use strict";

import React, {Component} from 'react';
import {Card} from 'belle';
import Code from './Code';

export default class GettingStarted extends Component {

  render() {
    return <Card>
      <h2>Getting Started</h2>

      <p>
        Belle is available as <a href="http://npmjs.org">npm</a> package. Once you have npm you can install Belle in your project folder with:
      </p>

      <Code value={ installCommand } style={ {marginTop: 40} } />

      <h3>Import & use Belle Components</h3>

      <p>
        We recommend you get started with <a href="https://facebook.github.io/react/">React</a> first. Once you have a simple application setup you can import any Belle component and use it right away. <b>No stylesheets, font or any other prerequisite needed.</b>
      </p>

      <Code value={ usageExample } style={ {marginTop: 40} } />


      <h3>Learn more</h3>

      <p>
        In addition you can dig through the <a href="http://nikgraf.github.io/belle/">documentation</a> to learn about how to modify Belle components.
      </p>

    </Card>;
  }
}

const installCommand = `npm install belle`;

const usageExample = `import React, {Component} from 'react';
import {TextInput} from 'belle';

class App extends Component {

  render() {
    return <div>
      <TextInput defaultValue="Update this input here and see how it grows …" />
    </div>;
  }
}

React.render(<App/>, document.getElementById('body'));
`;
