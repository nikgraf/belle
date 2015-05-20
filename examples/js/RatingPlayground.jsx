"use strict";

import React from 'react';
import {Card, Rating} from 'belle';

export default React.createClass({

  render () {
    return (
      <div>
        <h2>Rating</h2>

        <Card>

          <Rating value={0}></Rating><br />
          <Rating value={4} disabled></Rating><br />
          <Rating value={1}></Rating><br />

        </Card>

      </div>
    );
  }
});
