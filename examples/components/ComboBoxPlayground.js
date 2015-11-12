import React from 'react';
import {Card, ComboBox, Option} from 'belle';

export default React.createClass({

  getInitialState() {
    return { comboValue: 'te' };
  },

  render() {
    const valueLink = {
      value: this.state.comboValue,
      requestChange: this._handleChange,
    };

    return (
      <div>

        <h2>ComboBox</h2>

        <Card>
          <h3>Default Value Example</h3>
          <div style={{ marginBottom: 20 }}>
            <ComboBox defaultValue={ 'test' }>
              <Option value="te">Te</Option>
              <Option value="tes">Tes</Option>
              <Option value="test">Test</Option>
              <Option value="test1">Test1</Option>
              <Option value="test123">Test123</Option>
              <Option value="orange">Orange</Option>
            </ComboBox>
          </div>

          <h3>Value Example</h3>
          <div style={{ marginBottom: 20 }}>
            <ComboBox value={ this.state.comboValue }
                      onUpdate={ (event) => {console.log(event.value + ' - ' + event.identifier + ' - ' + event.isOptionSelection + ' - ' + event.isMatchingOption); } }>
              <Option value="te" identifier="123">Te</Option>
              <Option value="tes" identifier="123">Tes</Option>
              <Option value="test" identifier="123">Test</Option>
              <Option value="test1" identifier="123">Test1</Option>
              <Option value="test123" identifier="123">Test123</Option>
              <Option value="orange" identifier="123">Orange</Option>
            </ComboBox>
          </div>

          <h3>Value Link Example</h3>
          <div style={{ marginBottom: 20 }}>
            <ComboBox valueLink={ valueLink } onUpdate={ (event) => { console.log(event.value); } }>
              <Option value="te">Te</Option>
              <Option value="tes">Tes</Option>
              <Option value="test">Test</Option>
              <Option value="test1">Test1</Option>
              <Option value="test123">Test123</Option>
              <Option value="orange">Orange</Option>
            </ComboBox>
          </div>

          <div style={{ marginBottom: 20 }}>
            <ComboBox disabled>
              <Option value="te">Te</Option>
            </ComboBox>
          </div>

          <div>
            <ComboBox displayCaret={ false }>
              <Option value="te">Te</Option>
              <Option value="tes">Tes</Option>
              <Option value="test">Test</Option>
              <Option value="test1">Test1</Option>
              <Option value="test123">Test123</Option>
              <Option value="orange">Orange</Option>
            </ComboBox>
          </div>

          <div>
            <ComboBox displayCaret disabled>
              <Option value="te">Te</Option>
              <Option value="tes">Tes</Option>
              <Option value="test">Test</Option>
              <Option value="test1">Test1</Option>
              <Option value="test123">Test123</Option>
              <Option value="orange">Orange</Option>
            </ComboBox>
          </div>

          <div>
            <ComboBox>
              <Option value={ 0 }>Zero</Option>
              <Option value={ 1 }>One</Option>
            </ComboBox>
          </div>

        </Card>

      </div>
    );
  },

  _handleChange(newValue) {
    this.setState({ comboValue: newValue });
  },
});
