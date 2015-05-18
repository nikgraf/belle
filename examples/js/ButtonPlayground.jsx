"use strict";

import React from 'react';
import {Button, Card} from 'belle';

export default React.createClass({

  render () {
    return (
      <Card>
        <h2>Button</h2>

        <h3>Default Button</h3>
        <Button>Press me …</Button>

        <h3>Disabled Button</h3>
        <Button disabled={ true }>Press me …</Button>

        <h3>Primary Button</h3>
        <Button primary={ true }>Primary Button</Button>

        <h3>Disabled Primary Button</h3>
        <Button disabled={ true } primary={ true }>Press me …</Button>

        <h3>Colored Buttons</h3>
        <Button primary={ true } hoverStyle={{ color: 'blue' }}>Primary Button</Button>

        <Button primary={ true } hoverStyle={{ color: 'red' }}>Primary Button</Button>

        <Button primary={ true } hoverStyle={{ color: 'green' }}>Primary Button</Button>
      </Card>
    );
  }
});
