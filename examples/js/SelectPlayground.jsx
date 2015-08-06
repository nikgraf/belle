import React from 'react/addons';
import {Button, TextInput, Select, Separator, Option, Placeholder} from 'belle';
import {map} from 'underscore';

const fruits = [
  { value: 'pineapple', content: (<span>🍍</span>) },
  { value: 'banana', content: (<span>🍌</span>) },
  { value: 'peach', content: (<span>🍑</span>) },
  { value: 'pear', content: (<span>🍐</span>) },
  { value: 'cherries', content: (<span>🍒</span>) }
];

export default React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      valueA: 'rome'
    };
  },

  render() {
    return (
      <div>
        <h2>Select</h2>

        <h3>Native Select with value</h3>
        <select value="B">
          <option value="A">Apple</option>
          <option value="B">Banana</option>
          <option value="C">Cranberry</option>
        </select>

        <h3>Native Select with complexObject as values</h3>
        <select defaultValue={ {a: 1, b: 2} } onChange={ (event) => console.log(event.target.value) }>
          <option value={ {a: 1, b: 2} }>Option A</option>
          <option value={ {a: 3, c: 4} }>Option B</option>
        </select>

        <h3>Native Select with empty option</h3>
        <select defaultValue="">
          <option value disabled hidden>Select me</option>
          <option value="B">Banana</option>
          <option value="C">Cranberry</option>
        </select>

        <h3>Native Select with onChange</h3>
        <select onChange={ (event) => console.log(event.target.value) }>
          <option value="A">Apple</option>
          <option value="B">Banana</option>
          <option value="C">Cranberry</option>
        </select>

        <h3>Select with one option</h3>
        <Select>
          <Option value={ "vienna" }>Vienna</Option>
        </Select>

        <h3>Select with placeholder, option array combined and a single option combined.</h3>
        <Select>
          <Placeholder>Lala</Placeholder>
          {
            fruits.map((fruit, index) => {
              return (
                <Option key={ index } value={ fruit.value }>
                  { fruit.content }
                </Option>
              );
            })
          }
          <Option value={ "newyork" }>New York</Option>
        </Select>

        <h3>Select with onUpdate</h3>
        <Select onUpdate={ (event) => console.log(event.value) }>
          <Option value={ "vienna" }>Vienna</Option>
          <Option value={ "rome" }>Rome</Option>
        </Select>

        <h3>Select with value & onUpdate</h3>
        <Select value="rome" onUpdate={ (event) => console.log(event.value) }>
          <Option value="vienna">Vienna</Option>
          <Option value="rome">Rome</Option>
        </Select>

        <h3>Select with defaultValue</h3>
        <Select defaultValue="rome">
          <Option value="vienna">Vienna</Option>
          <Option value="rome">Rome</Option>
        </Select>

        <h3>Select with an ID (for proper aria labeling)</h3>
        <Select defaultValue="rome" id="test-id-5">
          <Option value="vienna">Vienna</Option>
          <Option value="rome">Rome</Option>
        </Select>

        <h3>
          Select with value
          <Button onClick={ () => this.setState({ valueA: 'vienna' }) }>Change to Vienna</Button>
        </h3>
        <Select value={ this.state.valueA }>
          <Option value="vienna">Vienna</Option>
          <Option value="rome">Rome</Option>
        </Select>

        <h3>Select with valueLink: { this.state.valueA }</h3>
        <Select valueLink={ this.linkState('valueA') } onUpdate={ (event) => console.log(event.value) }>
          <Option value="vienna">Vienna</Option>
          <Option value="rome">Rome</Option>
        </Select>

        <h3>
          Select after TextInput
        </h3>
        <div style={ { content: '', display: 'table', clear: 'both' } }>
          <TextInput style={ {width: 150, 'float': 'left' } } defaultValue="Lorem ipsum …" />
          <div style={ { width: 150, 'float': 'left', marginLeft: 16 } }>
            <Select>
              <Option value="vienna">Vienna</Option>
              <Option value="rome">Rome</Option>
            </Select>
          </div>
        </div>

        <h3>Select with custom styles</h3>
        <Select style={ { background: '#FFF', borderBottom: 0, padding: 8 } }
                focusStyle={ { borderBottom: 0, padding: 8, background: '#FFF', border: '1px solid red' } }
                hoverStyle={ { borderBottom: 0, padding: 8, background: '#DDD' } }>
          <Option value="vienna">Vienna</Option>
          <Option value="rome">Rome</Option>
        </Select>

        <h3>Select with scrollable options field</h3>
        <Select menuStyle={ { height: 160, overflow: 'scroll' } } defaultValue="tokyo">
          <Option value="berlin">Berlin</Option>
          <Option value="hong-kong">Hong Kong</Option>
          <Option value="istanbul">Istanbul</Option>
          <Option value="rome">Rome</Option>
          <Option value="san-francisco">San Francisco</Option>
          <Option value="tokyo">Tokyo</Option>
          <Option value="vienna">Vienna</Option>
        </Select>

        <h3>Select with Separators</h3>
        <Select>
          <Separator>America</Separator>
          <Option value="san-francisco">San Francisco</Option>
          <Option value="vancouver">Vancouver</Option>
          <Separator>Asia</Separator>
          <Option value="hong-kong">Hong Kong</Option>
          <Option value="tokyo">Tokyo</Option>
          <Separator>Europe</Separator>
          <Option value="berlin">Berlin</Option>
          <Option value="istanbul">Istanbul</Option>
          <Option value="rome">Rome</Option>
          <Option value="vienna">Vienna</Option>
        </Select>

        <h3>Select with Placeholder</h3>
        <Select>
          <Option value="tokyo">Tokyo</Option>
          <Placeholder>-- Select a City --</Placeholder>
          <Option value="vienna">Vienna</Option>
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

        <h3>Select from Data with defaultValue & onUpdate</h3>
        <Select defaultValue={ fruits[2].value }
                onUpdate={ (event) => console.log(event) }>
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

        <h3>Disabled Select with Placeholder</h3>
        <Select disabled>
          <Option value="tokyo">Tokyo</Option>
          <Placeholder>-- Select a City --</Placeholder>
          <Option value="vienna">Vienna</Option>
        </Select>

        <h3>Disabled Select</h3>
        <Select disabled>
          <Option value="tokyo">Tokyo</Option>
          <Option value="vienna">Vienna</Option>
        </Select>

        <br />
        <br />
      </div>
    );
  }
});
