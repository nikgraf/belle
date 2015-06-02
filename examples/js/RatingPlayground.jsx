"use strict";

import React from 'react';
import {Card, Rating} from 'belle';

export default React.createClass({

  render () {
    return (
      <div>
        <h2>Rating</h2>

        <Card>

          <Rating defaultValue={1} ratingCharacter={'\\2600'} id={'my_rating'} aria-label={ 'user_provided' }></Rating><br />
          <Rating defaultValue={4} disabled aria-labelledby={'testing-only'}></Rating><br />
          <Rating defaultValue={3} onChange={ (event) => console.log(event.target.value) } style={{color: 'gray'}}></Rating><br />

        </Card>

      </div>
    );
  }
});
