"use strict";

import React, {Component} from 'react';
import {Card, Rating} from 'belle';
import Code from './Code';

export default class RatingDocumentation extends Component {

  render() {
    return <Card>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Rating</h2>

      <Rating value={3}></Rating>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <table>
        <tr>
          <td style={ propertyNameStyle }>
            value
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Integer(0-5)</i>
              <br />
              required
            </p>
            <p>
              The value specifies the initital rating.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            disabled
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Boolean</i>
              <br />
              optional
            </p>
            <p>
              Property can be used to prevent any user input and changes to rating.
            </p>
          </td>
        </tr>
      </table>

      <h3>More Examples</h3>

      <Rating value={4} disabled></Rating>
      <Code value= { advanceCodeExample } style={ {marginTop: 40} } />

</Card>;
  }
}

const basicCodeExample = `<Rating value={3}></Rating>`;

const advanceCodeExample = `<Rating value={4} disabled></Rating>`;

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
