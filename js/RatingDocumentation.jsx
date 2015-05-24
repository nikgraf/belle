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
              optional
            </p>
            <p>
              The value specifies the initial rating.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onChange
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This function will get executed when user changes the rating interactively.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            ratingCharacter
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Character</i>
              <br />
              optional
              </p>
              <p>
                This character will be used as the rating character in the component.
              </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            style
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              These are general css styles that will get applied to the Rating component.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            tabIndex
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Integer</i>
              <br />
              optional
            </p>
            <p>
              This tabIndex will get assigned to the Rating component on the page.
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
