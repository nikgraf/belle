"use strict";

import React from 'react';
import {Card, Rating, Button} from 'belle';

export default React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return { ratingValue: 2 };
  },

  _handleChange(newValue) {
    this.setState({ ratingValue: newValue });
  },

  _updateRatingToThree() {
    this.setState({ ratingValue: 3 });
  },

  _resetValue() {
    this.refs.rating3.resetValue();
  },

  render () {
    return (
      <div>
        <h2>Rating</h2>

        <Card>

          <Button onClick={ this._updateRatingToThree }>Update Rating to value 3</Button>

          <h3>ValueLink</h3>
          <Rating valueLink={ this.linkState('ratingValue') } />

          <h3>Value with update function onChange</h3>
          <Rating value={ this.state.ratingValue }
                  onChange={ (event) => {
                      console.log(event.target.value);
                      this._handleChange(event.target.value);
                    }
                  } />

          <h3>Value</h3>
          <Rating value={ this.state.ratingValue }
                  onChange={ (event) => {
                      console.log(event.target.value);
                    }
                  } />

          <h3>DefaultValue</h3>
          <Rating defaultValue={ this.state.ratingValue }
                  onChange={ (event) => console.log(event.target.value) } />

          <h3>Disabled</h3>
          <Rating defaultValue={ 2 } disabled aria-labelledby={'testing-only'} />

          <h3>RatingCharacter</h3>
          <Rating defaultValue={ 1 } ratingCharacter={'✪'} id={'my_rating'} aria-label={ 'user_provided' } />

          <h3>ResetValue</h3>
          <Rating ref="rating3"
                  defaultValue={3}
                  onChange={ (event) => console.log(event.target.value) }
                  style={{color: 'gray'}} />
          <Button onClick={ this._resetValue }>Reset Rating</Button>

        </Card>

      </div>
    );
  }
});
