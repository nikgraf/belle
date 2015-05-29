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
              optional
            </p>
            <p>
              The property specifies the default value for rating.
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
        <tr>
          <td style={ propertyNameStyle }>
            className
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>String</i>
              <br />
              optional
            </p>
            <p>
              Name of the classes that will get added to the component.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            hoverStyle
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              This style will be applied to the component when it is hovered.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            focusStyle
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              This style will be applied to the component when it is focused.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            disabledStyle
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              This style will be applied to the component if it is disabled.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            disabledHoverStyle
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              This style will be applied to the component if it is disabled and it is hovered.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onMouseEnter
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed as mouse enters into the component.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onMouseLeave
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed as mouse leaves the component.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onMouseMove
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed as mouse moves over the component.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onTouchStart
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed as on touch start event.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onTouchMove
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed as on touch move event.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onTouchEnd
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed as on touch end event.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onTouchCancel
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed as on touch cancel event.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onFocus
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed as the component receives focus.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onBlur
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed as focus leaves the component.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onClick
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed as mouse is clicked over the component.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            onKeyDown
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This callback will get executed on key press if the component is focused.
            </p>
          </td>
        </tr>
      </table>

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
