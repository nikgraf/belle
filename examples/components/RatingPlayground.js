import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {Card, Rating, Button} from 'belle';

export default React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState() {
    return { ratingValue: 2 };
  },

  render() {
    return (
      <div>
        <h2>Rating</h2>

        <Card>

          <Button onClick={ this._updateRatingToThree }>Update Rating to value 3</Button>

          //onUpdate should not be called for valueLink
          <h3>ValueLink</h3>
          <Rating valueLink={ this.linkState('ratingValue') }
                  onUpdate={ (event) => { console.log(event.value); } } />

          <h3>Value with update function onUpdate</h3>
          <Rating
            value={ this.state.ratingValue }
            onUpdate={ (event) => {
              console.log(event.value);
              this._handleChange(event.value);
            }}
          />

          <h3>Value</h3>
          <Rating value={ this.state.ratingValue }
                  onUpdate={ (event) => { console.log(event.value); } } />

          <h3>DefaultValue</h3>
          <Rating
            defaultValue={ this.state.ratingValue }
            onUpdate={ (event) => console.log(event.value) }
          />

          <h3>Disabled</h3>
          <Rating defaultValue={ 2 } disabled aria-labelledby={'testing-only'} />

          <h3>RatingCharacter</h3>
          <Rating defaultValue={ 1 } character={'✪'} id={'my_rating'} aria-label={ 'user_provided' } />

        </Card>

      </div>
    );
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
});
