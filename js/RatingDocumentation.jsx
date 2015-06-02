"use strict";

import React, {Component} from 'react';
import {Card, Rating} from 'belle';
import Code from './Code';

export default class RatingDocumentation extends Component {

  render() {
    return <Card>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Rating</h2>

      <Rating defaultValue={3}></Rating>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <table>
        <tr>
          <td style={ propertyNameStyle }>
            defaultValue
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Integer(0-5)</i>
              <br />
              optional (default: 0)
            </p>
            <p>
              Initial value for rating component.
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
              Callback executed as user changes rating interactively.
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
              optional (default: '★')
              </p>
              <p>
                Rating character used in the component.
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
              optional (default: false)
            </p>
            <p>
              Can be used to disable rating component.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            preventFocusStyleForTouchAndClick
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Boolean</i>
              <br />
              optional (default: true)
            </p>
            <p>
              Prevents the focus style being applied in case the buttons becomes focused by a click or touch..
            </p>
          </td>
        </tr>
      </table>

      <p>
      Other supported properties include:
      <span style={ {color: 'grey'} }> tabIndex, style, className, hoverStyle, focusStyle, disabledStyle, disabledHoverStyle, onMouseDown, onMouseUp, onMouseEnter, onMouseMove, onMouseLeave, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel, onFocus, onBlur, onClick, onKeyDown, …</span>
      </p>

      <h3>More Examples</h3>

      <Rating defaultValue={4} disabled></Rating>
      <Code value= { advanceCodeExample1 } style={ {marginTop: 40} } />
      <Rating defaultValue={4} ratingCharacter={'✪'}></Rating>
      <Code value= { advanceCodeExample2 } style={ {marginTop: 40} } />

</Card>;
  }
}

const basicCodeExample = `<Rating defaultValue={3}></Rating>`;

const advanceCodeExample1 = `<Rating defaultValue={4} disabled></Rating>`;

const advanceCodeExample2 = `<Rating defaultValue={4} ratingCharacter={'✪'}></Rating>`;

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
