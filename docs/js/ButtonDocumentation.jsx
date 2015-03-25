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

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <table>
        <tr>
          <td style={ propertyNameStyle }>
            primary
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Boolean</i>
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
              <i>String</i> of 'button', 'submit', 'reset'
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
              Works like React's built-in style property.
              Becomes active once the user hovers over the button with the cursor.
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
              Works like React's built-in style property.
              Becomes active once the button is the element focused in the DOM.
            </p>
          </td>
        </tr>
        <tr>
          <td style={ propertyNameStyle }>
            activeStyle
          </td>
          <td style={ propertyDescriptionStyle }>
            <p style={ {marginTop: 0} }>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              Works like React's built-in style property.
              Becomes active once the button is pressed by a user, but yet not release.
            </p>
          </td>
        </tr>
      </table>

      <p>
        Any other property valid for a HTML button like
        <span style={ {color: 'grey'} }> style, onClick, …</span>
      </p>

      <h3>More Examples</h3>

      <p>Primary button with custom styles</p>

      <Button primary={ true }
              style={{
                marginRight: 10,
                color: '#222',
                border: '1px solid #222',
                borderBottom: '1px solid #222',
                borderRadius: 2,
                background: '#fff'
              }}
              hoverStyle={{
                border: '1px solid red',
                borderBottom: '1px solid red',
                color: 'red',
                background: '#fff'
              }}
              focusStyle={{
                border: '1px solid red',
                borderBottom: '1px solid red',
                color: 'red',
                background: '#fff',
                boxShadow: 'red 0px 0px 5px'
              }}
              activeStyle={{
                border: '1px solid red',
                borderTop: '1px solid red',
                color: 'red',
                background: '#fff'
              }}>
        Follow
      </Button>

      <Code value={ customStyleCodeExample } style={ {marginTop: 20} } />


    </Card>;
  }
}

const basicCodeExample = `<!-- default button -->
<Button>Follow</Button>

<!-- primary button -->
<Button primary={ true }>Follow</Button>`;

const customStyleCodeExample = `<Button primary={ true }
        style={{
          marginRight: 10,
          color: '#222',
          border: '1px solid #222',
          borderBottom: '1px solid #222',
          borderRadius: 2,
          background: '#fff'
        }}
        hoverStyle={{
          border: '1px solid red',
          borderBottom: '1px solid red',
          color: '#red',
          background: '#fff'
        }}
        focusStyle={{
          border: '1px solid red',
          borderBottom: '1px solid red',
          color: '#red',
          background: '#fff',
          boxShadow: 'red 0px 0px 5px'
        }}
        activeStyle={{
          border: '1px solid red',
          borderTop: '1px solid red',
          color: '#000',
          background: '#fff'
        }}>
  Follow
</Button>`;

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
