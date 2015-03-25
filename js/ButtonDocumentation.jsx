"use strict";

import React, {Component} from 'react';
import {Card, Button} from 'belle';
import Code from './Code';

export default class ButtonDocumentation extends Component {

  render() {
    const code = `<!-- default button -->
<Button>Follow</Button>

<!-- primary button -->
<Button primary={ true }>Follow</Button>`;

    return <Card>

      <h2 id="button" style={ {marginTop: 0, marginBottom: 40} }>Button</h2>

      <Button primary={ true } style={ {marginRight: 10} }>Follow</Button>

      <Button>Follow</Button>

      <Code value={ code } style={ {marginTop: 40} } />

    </Card>;
  }
}
