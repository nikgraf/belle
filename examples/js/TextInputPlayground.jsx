"use strict";

import React from 'react';
import {TextInput} from 'belle';

function conditionalTextInput (showTextInput) {
  if (showTextInput) {
    return <TextInput style={ {width: 250} } defaultValue="This TextInput can be removed." />;
  }
}

export default React.createClass({

  getInitialState () {
    return {
      showTextInput: true
    };
  },

  _removeTextInput() {
    this.setState({
      showTextInput: false
    });
  },

  render () {
    return (
      <div>
        <h2>TextInput</h2>

        {/* Common use case */}
        <TextInput style={ {width: 250} } defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <br />

        {/* Remove TextInput behaviour */}
        {conditionalTextInput(this.state.showTextInput)}
        <br />
        <button type="button" onClick={this._removeTextInput.bind(this)}>Remove TextInput</button>

        {/* Empty TextInput */}
        <TextInput style={ {width: 250} }/>
        <br />

        {/* Not editable value */}
        <div style={ {width: 250} }>
          <TextInput value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        </div>
        <br />

        {/* Full width TextInput */}
        <div style={ {position: 'relative'} }>
          <TextInput defaultValue="This is a very long text. Hint: if you resize the browser and there is not enough space it will automatically expand the box for the height needed. TODO: fix this"/>
        </div>
        <br />

        {/* TextInput with placeholder & a minHeight & custom hoverStyle */}
        <div style={ {width: 250} }>
          <TextInput minHeight={120}
                 placeholder="What is going on? Ohh, we provided a minHeight & a custom hoverStyle & focusStyle here."
                 hoverStyle={ { borderBottom: '1px red solid' } }
                 focusStyle={ { borderBottom: '1px brown solid' } } />
        </div>
      </div>
    );
  }
});
