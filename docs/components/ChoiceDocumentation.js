import React, {Component} from 'react';
import {Choice, Toggle} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

const choiceCodeExample = `<!-- toggle with custom choices -->
<Toggle defaultValue={ true }>
  <Choice value={ true }>On</Choice>
  <Choice value={ false }>Off</Choice>
</Toggle>`;

export default class ChoiceDocumentation extends Component {

  render() {
    return (<div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Choice</h2>

      <Toggle defaultValue={ true }>
        <Choice value={ true }>On</Choice>
        <Choice value={ false }>Off</Choice>
      </Toggle>

      <Code value={ choiceCodeExample } style={{marginTop: 40}} />

      <h3>Properties</h3>

      <table>

        <tr>
          <td style={ propertyNameStyle }>
            value
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Boolean</i>
              <br />
              required</p>
            <p>
              The value to be set in case this Choice is set.
            </p>
          </td>
        </tr>

      </table>

      <p>
        Any property valid for a HTML div like
        <span style={ {color: 'grey'} }> style, id, className, …</span>
      </p>

    </div>);
  }
}
