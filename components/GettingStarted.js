import React, {Component} from 'react';
import Code from './Code';

const installCommand = `npm install belle`;

const usageExampleHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
</head>
<body>
  <div id="react-root"></div>
  <!--
    You can use browserify, webpack or similar tools
    to compile & combine your JSX code
  -->
  <script src="bundle.js"></script>
</body>
</html>
`;

const usageExampleJavaScript = `var React = require('react');
var belle = require('belle');
var TextInput = belle.TextInput;

var App = React.createClass({

  render: function() {
    return (
      <div>
        <TextInput defaultValue="Update here and see how the input grows …" />
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('react-root'));`;

export default class GettingStarted extends Component {

  render() {
    return (<div>
      <h2 style={ {marginTop: 0, marginBottom: 40} }>Getting Started</h2>

      <p>
        Belle is available as <a href="http://npmjs.org">npm</a> package. Once you have npm you can install Belle in your project folder with:
      </p>

      <Code value={ installCommand } style={ {marginTop: 40} } />

      <h3>Import & use Belle Components</h3>

      <p>
        We recommend you get started with <a href="https://facebook.github.io/react/">React</a> first. Once you have a simple application setup you can import any Belle component and use it right away. <b>No stylesheets, font or any other prerequisite needed.</b>
      </p>

      <Code value={ usageExampleHtml } style={ {marginTop: 40} } />

      <Code value={ usageExampleJavaScript } style={ {marginTop: 40} } />

      <h3>Discussion or need help?</h3>

      <p>
        Join us at the <b>#belle</b> channel of the <a href="http://reactiflux.com/">Reactiflux</a> Slack community or our <a href="https://gitter.im/nikgraf/belle">Gitter room</a>.
      </p>

    </div>);
  }
}
