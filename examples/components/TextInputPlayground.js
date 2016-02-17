/* eslint-disable no-console */

import React from 'react';
import { TextInput, Card } from 'belle';

function conditionalTextInput(showTextInput) {
  if (showTextInput) {
    return <TextInput style={{ width: 250 }} defaultValue="This TextInput can be removed." />;
  }
}

export default React.createClass({

  getInitialState() {
    return {
      showTextInput: true,
      inputValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
  },

  _handleChange(newValue) {
    this.setState({ inputValue: newValue });
  },

  _removeTextInput() {
    this.setState({
      showTextInput: false,
    });
  },

  render() {
    const valueLink = {
      value: this.state.inputValue,
      requestChange: this._handleChange,
    };

    return (
      <Card>
        <h2>TextInput</h2>

        {/* Common use case */}
        <TextInput
          allowNewLine
          style={{ width: 250 }}
          valueLink= { valueLink }
          onUpdate={ (event) => console.log(event.value) }
        />
        <br />

        {/* Common use case disabled */}
        <TextInput style={{ width: 250 }} disabled defaultValue="Lorem ipsum disabled sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <br />

        {/* Remove TextInput behaviour */}
        {conditionalTextInput(this.state.showTextInput)}
        <br />
        <button type="button" onClick={this._removeTextInput}>Remove TextInput</button>

        {/* Empty TextInput */}
        <TextInput style={{ width: 250 }}/>
        <br />

        <h3>Not editable value</h3>
        <div style={{ width: 250 }}>
          <TextInput
            allowNewLine={false}
            value={ this.state.inputValue }
            onUpdate={ (event) => {
              console.log(event.value);
              this._handleChange(event.value);
            }
            }
          />
        </div>
        <br />

        {/* Full width TextInput */}
        <div style={{ position: 'relative' }}>
          <TextInput defaultValue="This is a very long text. Hint: if you resize the browser and there is not enough space it will automatically expand the box for the height needed. TODO: fix this"/>
        </div>
        <br />

        {/* TextInput with placeholder & a minHeight & custom hoverStyle */}
        <div style={{ width: 250 }}>
          <TextInput
            minHeight={120}
            placeholder="What is going on? Ohh, we provided a minHeight & a custom hoverStyle & focusStyle here."
            focusStyle={{ borderBottom: '1px brown solid' }}
          />
        </div>

        <h3>Test with 3 min rows & 5 max rows</h3>
        <div style={{ width: 250 }}>
          <TextInput placeholder="Hello" minRows={ 3 } maxRows={ 5 }/>
        </div>

        <h3>Test 4 min rows & minHeight 80</h3>
        <div style={{ width: 250 }}>
          <TextInput placeholder="Hello" minRows={ 4 } minHeight={ 80 }/>
        </div>

        <h3>Test 2 max rows & maxHeight 300</h3>
        <div style={{ width: 250 }}>
          <TextInput placeholder="Hello" maxRows={ 2 } maxHeight={ 300 }/>
        </div>

        <h3>style minHeight 80</h3>
        <div style={{ width: 250 }}>
          <TextInput style={{ minHeight: 80 }}/>
        </div>

        {/* Value test */}
        <div style={{ width: 250 }}>
          <textarea value="abc" onChange={ (event) => console.log(event.target.value) }/>
        </div>
      </Card>
    );
  },
});
