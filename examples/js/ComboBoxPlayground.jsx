"use strict";

import React from 'react';
import {Card, ComboBox, Option} from 'belle';

export default React.createClass({

  render () {
    return (
      <div>

        <h2>ComboBox</h2>

        <Card>

          <div style={ { 'marginBottom': '20px' } }>
            <ComboBox defaultValue={ 'test' }>
              <Option value="te">Te</Option>
              <Option value="tes">Tes</Option>
              <Option value="test">Test</Option>
              <Option value="test1">Test1</Option>
              <Option value="test123">Test123</Option>
              <Option value="orange">Orange</Option>
            </ComboBox>
          </div>

          <div style={ { 'marginBottom': '20px' } }>
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

        </Card>

      </div>
    );
  }
});
