"use strict";

import React from 'react';
import {Toggle, Choice, Card} from 'belle';

export default React.createClass({

  render () {
    return (
      <Card>
        <h2>Toggle</h2>

        <h3>Default Toggle</h3>
        <Toggle />

        <h3>Default Checked Toggle</h3>
        <Toggle checked={true} />

        <h3>Default Unchecked Toggle</h3>
        <Toggle checked={false} />

        <h3>Default Checked Toggle (defaultChecked)</h3>
        <Toggle defaultChecked={true} />

        <h3>Default Unchecked Toggle (defaultChecked)</h3>
        <Toggle defaultChecked={false} />

        <h3>Custom Toggle</h3>
        <Toggle defaultChecked={ true }>
          <Choice value={ true }>On</Choice>
          <Choice value={ false }>Off</Choice>
        </Toggle>

      </Card>
    );
  }
});
