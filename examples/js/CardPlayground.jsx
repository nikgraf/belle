"use strict";

import React from 'react';
import {Card} from 'belle';

export default React.createClass({

  render () {
    return (
      <div>
        <h2>Card</h2>

        <Card><p>Looks nice!</p></Card>

        <Card style={{ color: '#2994BB' }} data-custom-attribute={'custom'}>What about another font color?</Card>
      </div>
    );
  }
});
