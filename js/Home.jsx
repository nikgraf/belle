"use strict";

import React, {Component} from 'react';
import {Card, Button, TextInput} from 'belle';

export default class Home extends Component {

  render() {
    return <Card>
      <Button primary={ true } style={ {marginRight: 10} }>Follow</Button>
    </Card>;
  }
}
