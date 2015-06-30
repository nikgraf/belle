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

          <tr>
            <td style={ propertyNameStyle }>
              activeHandleStyle
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
                Becomes active once the user clicks or touches the toggle (including the check & cross areas).
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              checkAreaStyle
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
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              crossAreaStyle
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
                Works like React's built-in style property. Becomes active once the Toggle
                is disabled via the disabled property.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              disabledHandleStyle
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
                Works like React's built-in style property. Becomes active once the Toggle
                is disabled via the disabled property.
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
                Works like React's built-in style property. Becomes active once the Toggle
                is focused on. Only applies to the handle node.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              handleStyle
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
                Works like React's built-in style property. Only applies to the handle node.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              hoverHandleStyle
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
                Works like React's built-in style property. Becomes active once a user moves the mouse above the Toggle component. Only applies to the handle node.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              sliderStyle
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
                Works like React's built-in style property. Only applies to the slider node.
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
              <p>If true the Toggle will be disabled and can't be changed by the user.</p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              checkAreaProps
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
                This object allows to provide any kind of valid properties for a
                div tag.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              crossAreaProps
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
                This object allows to provide any kind of valid properties for a
                div tag.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              handleProps
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
                This object allows to provide any kind of valid properties for a
                div tag.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              sliderProps
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
                This object allows to provide any kind of valid properties for a
                div tag.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              sliderWrapperProps
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
                This object allows to provide any kind of valid properties for a
                div tag.
              </p>
            </td>
          </tr>

        </table>

        <p>
          Any property valid for a HTML div like
          <span style={ {color: 'grey'} }> style, id, className, onMouseDown, onTouchStart …</span>
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
