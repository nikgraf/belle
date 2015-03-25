"use strict";

import React, {Component} from 'react';
import {Card, Input} from 'belle';
import Code from './Code';

export default class ButtonDocumentation extends Component {

  render() {
    const code = `<!-- default input with a defaultValue -->
<Input defaultValue="Jane Doe" />`;

    return <Card>

      <h2 id="input" style={ {marginTop: 0, marginBottom: 40} }>Input</h2>

      <Input defaultValue="Jane Doe" />

      <Code value={ code } style={ {marginTop: 40} } />

    </Card>;
  }
}
