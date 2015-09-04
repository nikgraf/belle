import React, {Component} from 'react';
import {Button} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

const basicCodeExample = `<!-- primary button -->
<Button primary>Follow</Button>

<!-- default button -->
<Button>Follow</Button>`;

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

const disabledButtonCodeExample = `<Button primary style={ {marginRight: 10} }>Follow</Button>

<Button primary disabled style={ {marginRight: 10} }>Follow</Button>

<Button style={ {marginRight: 10} }>Follow</Button>

<Button disabled>Follow</Button>
`;

export default class ButtonDocumentation extends Component {

  render() {
    return (<div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Button</h2>

      <Button primary style={ {marginRight: 15} }>Follow</Button>

      <Button>Follow</Button>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <p style={{ marginTop: 40 }}>
        <i>Note:</i> Belle's Button is rendered as normal HTML button and behaves exactly like it except for these behaviours:
      </p>

      <ul>
        <li>By default the button is of type="button" instead of "submit".</li>
      </ul>

      <h3>Properties</h3>

      <table>
        <tr>
          <td style={ propertyNameStyle }>
            primary
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p >
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
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
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
            disabled
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Boolean</i>
              <br />
              default: false</p>
            <p>If true the Button will be disabled and can't be pressed by a user.</p>
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
              Becomes active once the user hovers over the button with the cursor.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            focusStyle
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
              Works like React's built-in style property except that it extends
              the properties from the base style.
              Becomes active once the button is the element focused in the DOM.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            activeStyle
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
              Works like React's built-in style property except that it extends
              the properties from the base style.
              Becomes active once the button is pressed by a user, but yet not release.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            disabledStyle
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
              Works like React's built-in style property except that it extends
              the properties from the base style.
              Becomes active once the button is disabled.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            disabledHoverStyle
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
              Works like React's built-in style property except that it extends
              the properties from the base disabledStyle.
              Becomes active once the button is disabled and a user hovers over it.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            preventFocusStyleForTouchAndClick
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Boolean</i>
              <br />
              optional (default: true)
            </p>
            <p>
              Prevents the focus style being applied in case the buttons becomes
              focused by a click or touch.<br />
              <b>Background:</b>
              Focus styles are helpful to identify which element is currently
              in focus when tabbing through the elements e.g. a user wants to
              switch to the next input element. Yet it feels somewhat distracting
              when clicking on the Button. That's why Belle by default prevents
              the focus style being applied in case the Button is focused on
              by a touch or click event.
            </p>
          </td>
        </tr>
      </table>

      <p>
        Any other property valid for a HTML button like
        <span style={ {color: 'grey'} }> style, onClick, …</span>
      </p>

      <h3>More Examples</h3>

      <h4>Disabled buttons</h4>

      <Button primary style={ {marginRight: 15} }>Follow</Button>

      <Button primary disabled style={ {marginRight: 15} }>Follow</Button>

      <Button style={ {marginRight: 15} }>Follow</Button>

      <Button disabled>Follow</Button>

      <Code value={ disabledButtonCodeExample } style={ {marginTop: 20} } />

      <h4>Primary button with custom styles</h4>

      <Button primary={ true }
              style={{
                marginRight: 10,
                color: '#222',
                border: '1px solid #222',
                borderBottom: '1px solid #222',
                borderRadius: 2,
                background: '#fff',
                boxShadow: 'none'
              }}
              hoverStyle={{
                border: '1px solid red',
                borderBottom: '1px solid red',
                color: 'red',
                background: '#fff',
                boxShadow: 'none'
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
                background: '#fff',
                boxShadow: 'none'
              }}>
        Follow
      </Button>

      <Code value={ customStyleCodeExample } style={ {marginTop: 20} } />


    </div>);
  }
}
