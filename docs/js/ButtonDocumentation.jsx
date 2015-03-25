"use strict";

import React, {Component} from 'react';
import {Card, Button} from 'belle';
import Code from './Code';

export default class ButtonDocumentation extends Component {

  render() {
    return <Card>

      <h2 id="button" style={ {marginTop: 0, marginBottom: 40} }>Button</h2>

      <Button primary={ true } style={ {marginRight: 10} }>Follow</Button>

      <Button>Follow</Button>

      <Code value={ codeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <table>
        <tr>
          <td style={ propertyNameStyle }>
            primary
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              Boolean
              <br />
              default: false</p>
            <p>If true the Button will be appear with the primary button styles</p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            type
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              String of 'button', 'submit', 'reset'
              <br />
              default: 'buttom'
            </p>
            <p>
              This button by is set to type 'button' by default. This different
              to the default behavior in HTML where a button would submit in case
              the 'type' attribute is not defined.
            </p>
          </td>
        </tr>
      </table>

    </Card>;
  }
}

const codeExample = `<!-- default button -->
<Button>Follow</Button>

<!-- primary button -->
<Button primary={ true }>Follow</Button>`;

const propertyNameStyle = {
  padding: '0 20px 0 0',
  textAlign: 'left',
  verticalAlign: 'top',
  color: 'grey'
};

const propertyDescriptionStyle = {
  padding: 0,
  textAlign: 'left',
  verticalAlign: 'top'
};
