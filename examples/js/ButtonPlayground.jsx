"use strict";

import React from 'react';
import {Button} from 'belle';

export default React.createClass({

  render () {
    return (
      <div>
        <h2>Button</h2>

        <Button>Press me …</Button>

        <Button primary={ true }>Primary Button</Button>

        <br />

        <Button primary={ true } hoverStyle={{ color: 'blue' }}>Primary Button</Button>

        <Button primary={ true } hoverStyle={{ color: 'red' }}>Primary Button</Button>

        <Button primary={ true } hoverStyle={{ color: 'green' }}>Primary Button</Button>
      </div>
    );
  }
});
