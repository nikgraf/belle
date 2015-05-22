"use strict";

import React from 'react';
import {Card, Rating} from 'belle';

export default React.createClass({

  render () {
    return (
      <div>
        <h2>Rating</h2>

        <Card>

          <Rating value={1} ratingCharacter={'\\2600'}></Rating><br />
          <Rating value={4} disabled></Rating><br />
          <Rating value={3} onChange={ (event) => console.log(event.target.value) } style={{color: 'gray'}}></Rating><br />

        </Card>

      </div>
    );
  }
});
