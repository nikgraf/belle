"use strict";

import React from 'react';
import {Card, Rating, Button} from 'belle';

export default React.createClass({

  getInitialState: function() {
    return {ratingValue: 2};
  },

  _handleChange: function(newValue) {
    this.setState({ratingValue: newValue});
  },

  _buttonMouseDown() {
    this.refs.rating3.resetRating();
  },

  render () {

  var valueLink = {
    value: this.state.ratingValue,
    requestChange: this._handleChange
  };

    return (
      <div>
        <h2>Rating</h2>

        <Card>

          ValueLink:<br/> <Rating valueLink={ valueLink } onChange={ (event) => console.log(event.target.value) }></Rating><br />
          Value:<br/> <Rating value={ this.state.ratingValue } onChange={ function(event){console.log(event.target.value);this._handleChange(event.target.value);}.bind(this) }></Rating><br />
          DefaultValue:<br/> <Rating defaultValue={ 4 } onChange={ (event) => console.log(event.target.value) }></Rating><br />
          Disabled:<br/> <Rating defaultValue={4} disabled aria-labelledby={'testing-only'}></Rating><br />
          RatingCharacter:<br/> <Rating defaultValue={ 1 } ratingCharacter={'✪'} id={'my_rating'} aria-label={ 'user_provided' }></Rating><br />
          ResetValue:<br/> <Rating ref="rating3" defaultValue={3} onChange={ (event) => console.log(event.target.value) } style={{color: 'gray'}}></Rating><br />

          <Button onMouseDown={ this._buttonMouseDown }>Reset Rating</Button>

        </Card>

      </div>
    );
  }
});
