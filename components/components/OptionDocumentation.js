import React, { Component } from 'react';
import { Option, Select } from 'belle';
import Code from '../Code';
import { propertyNameStyle, propertyDescriptionStyle } from '../../style';

const basicCodeExample = `<!-- basic select example with multiple options -->
<Select>
  <Option value="berlin">Berlin</Option>
  <Option value="tokyo">Tokyo</Option>
  <Option value="vienna">Vienna</Option>
</Select>`;

export default class OptionDocumentation extends Component {

  render() {
    return (<div>

      <h2 style={{ marginTop: 0, marginBottom: 40 }}>Option</h2>

      <Select>
        <Option value="berlin">Berlin</Option>
        <Option value="tokyo">Tokyo</Option>
        <Option value="vienna">Vienna</Option>
      </Select>

      <Code value={ basicCodeExample } style={{ marginTop: 40 }} />

      <h3>Properties</h3>

      <table><tbody>

        <tr>
          <td style={ propertyNameStyle }>
            value
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>String, Boolean, Number</i>
              <br />
              required</p>
            <p>
              The value to be set in case this Option is selected. The value must be
              unique for all Options within one Select. It can be of type Boolean, String or
              Number.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            hoverStyle
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              Works like React's built-in style property.
              Becomes active once the user hovers over the Option with the cursor or focus
              on it by leveragin the key board inputs like Arrow-down or Arrow-up.
            </p>
          </td>
        </tr>

      </tbody></table>

      <p>
        Any property valid for a HTML div like
        <span style={{ color: 'grey' }}> style, id, className, …</span>
      </p>

    </div>);
  }
}
