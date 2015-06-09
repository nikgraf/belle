"use strict";

import React from 'react';
import {Toggle, Choice} from 'belle';

export default React.createClass({

  render () {
    return (
      <div>
        <h2>Toggle</h2>

        <Toggle />
        <Toggle checked={true} />
        <Toggle checked={false} />
        <Toggle defaultChecked={true} />
        <Toggle defaultChecked={false} onChange={ (event) => console.log(event) } />

        <Toggle defaultChecked={ true }>
          <Choice value={ true }>ja</Choice>
          <Choice value={ false }>nein</Choice>
        </Toggle>

      </div>
    );
  }
});
