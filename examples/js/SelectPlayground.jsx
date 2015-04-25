"use strict";

import React from 'react/addons';
import {Select, Option} from 'belle';
import {map} from 'underscore';

const fruits = [
  { value: "pineapple", content: (<span>🍍</span>) },
  { value: "banana", content: (<span>🍌</span>) },
  { value: "peach", content: (<span>🍑</span>) },
  { value: "pear", content: (<span>🍐</span>) },
  { value: "cherries", content: (<span>🍒</span>) }
];

export default React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState () {
    return {
      valueA: 'rome'
    };
  },

  render () {
    return (
      <div>
        <h2>Select</h2>

        <h3>Native Select with value</h3>
        <select value="B">
          <option value="A">Apple</option>
          <option value="B">Banana</option>
          <option value="C">Cranberry</option>
        </select>

        <h3>Select with onChange</h3>
        <Select onChange={ (event) => console.log(event) }>
          <Option value={ "vienna" }>Vienna</Option>
          <Option value={ "rome" }>Rome</Option>
        </Select>

        <h3>Select with value & onChange</h3>
        <Select value="rome" onChange={ (event) => console.log(event) }>
          <Option value="vienna">Vienna</Option>
          <Option value="rome">Rome</Option>
        </Select>

        <h3>Select with defaultValue</h3>
        <Select defaultValue="rome">
          <Option value="vienna">Vienna</Option>
          <Option value="rome">Rome</Option>
        </Select>

        <h3>Select with valueLink: { this.state.valueA }</h3>
        <Select valueLink={ this.linkState('valueA') } >
          <Option value="vienna">Vienna</Option>
          <Option value="rome">Rome</Option>
        </Select>

        <h3>Select from Data</h3>
        <Select>
          {
            map(fruits, (fruit, index) => {
              return (
                <Option value={ fruit.value }
                        key={ index }>
                  { fruit.content }
                </Option>
              );
            })
          }
        </Select>

        <h3>Select from Data with defaultValue & onChange</h3>
        <Select defaultValue={ fruits[2].value }
                onChange={ (event) => console.log(event) }>
          {
            map(fruits, (fruit, index) => {
              return (
                <Option value={ fruit.value }
                        key={ index }>
                  { fruit.content }
                </Option>
              );
            })
          }
        </Select>
      </div>
    );
  }
});
