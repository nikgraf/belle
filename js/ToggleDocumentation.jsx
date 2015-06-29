"use strict";

import React, {Component} from 'react';
import {Choice, Toggle} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

export default class ToggleDocumentation extends Component {

  render() {
    return <div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Toggle</h2>

      <Toggle />

      <Toggle defaultChecked={ true } style={ { marginLeft: 20 } }/>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

        <h3>Properties</h3>

        <table>

          <tr>
            <td style={ propertyNameStyle }>
              defaultChecked
            </td>
          </tr>
          <tr>
            <td style={ propertyDescriptionStyle }>
              <p>
                <i>Boolean</i>
                <br />
                optional</p>
              <p>
                Behaves like the defaultChecked property of a checkbox in React.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              checked
            </td>
          </tr>
          <tr>
            <td style={ propertyDescriptionStyle }>
              <p>
                <i>Boolean</i>
                <br />
                optional</p>
              <p>
                Behaves like the checked property of a checkbox in React.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              checkedLink
            </td>
          </tr>
          <tr>
            <td style={ propertyDescriptionStyle }>
              <p>
                <i>Boolean Reference</i>
                <br />
                optional</p>
              <p>
                Behaves like the checkedLink poperty of a React rendered checkbox.
                CheckedLink allows to enable two-way data binding between a state property and the value in
                the user interface.
              </p>
            </td>
          </tr>
        </table>

        <p>
          Any property valid for a HTML div like
          <span style={ {color: 'grey'} }> style, id, className, …</span>
        </p>

        <h3>More Examples</h3>

        <p>Toggle with custom choices</p>

        <Toggle defaultChecked={ true }>
          <Choice value={ true }
                  style={ { background: 'rgba(43, 176, 206, 0.8)' } }>On</Choice>
          <Choice value={ false }>Off</Choice>
        </Toggle>

        <Code value={ choiceCodeExample } style={ {marginTop: 40} } />

    </div>;
  }
}

const basicCodeExample = `<!-- basic toggle examples -->
<Toggle />

<Toggle defaultChecked={ true } style={ { marginLeft: 20 } }/>`;

const choiceCodeExample = `<!-- toggle with custom choices -->
<Toggle defaultChecked={ true }>
  <Choice value={ true }
          style={ { background: 'rgba(43, 176, 206, 0.8)' } }>On</Choice>
  <Choice value={ false }>Off</Choice>
</Toggle>`;
