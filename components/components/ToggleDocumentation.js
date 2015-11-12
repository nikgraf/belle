import React, {Component} from 'react';
import {Choice, Toggle} from 'belle';
import Code from '../Code';
import {propertyNameStyle, propertyDescriptionStyle} from '../../style';

const basicCodeExample = `<!-- basic toggle examples -->
<Toggle />

<Toggle defaultValue style={ { marginLeft: 20 } }/>`;

const choiceCodeExample = `<!-- toggle with custom choices -->
<Toggle defaultValue
        firstChoiceStyle={{ backgroundColor: 'rgba(43, 176, 206, 0.8)' }}>
  <Choice value>On</Choice>
  <Choice value={ false }>Off</Choice>
</Toggle>`;

const htmlStructure = `<div style={ wrapperStyle }
     tabIndex={ tabIndex } >
  <div ref="sliderWrapper"
       style={ sliderWrapperStyle }>
    <div style={ sliderStyle }>
      <div ref="firstChoice"
           style={ firstChoiceStyle }>
        <Choice />
      </div>
      <div ref="secondChoice"
           style={ secondChoiceStyle }>
        <Choice />
      </div>
    </div>
  </div>
  <div ref="handle"
       style={ handleStyle } />
</div>`;

const toggleWithSizeStyling1 = `<Toggle style={{ transform: 'scale(0.6)' }} />`;

const toggleWithSizeStyling2 = `<Toggle style={{
          borderRadius: 10,
          height: 20,
          width: 50
        }}
        sliderStyle={{
          // Calculated with 2 * the width of choice area
          width: 80
        }}
        sliderWrapperStyle={{
          borderRadius: 10
        }}
        handleStyle={{
          borderRadius: 10,
          // 1 px smaller than the width due the border effect
          height: 19,
          width: 20
        }}
        firstChoiceStyle={{
          height: 20,
          // Calculated with the width of the whole toggle - half of the width from the handle
          width: 40,
          lineHeight: 20 + 'px',
          textIndent: -5,
          fontSize: 12
        }}
        secondChoiceStyle={{
          height: 20,
          // Calculated with the width of the whole toggle - half of the width from the handle
          // style.width - (handleStyle.width / 2 )
          width: 40,
          lineHeight: 20 + 'px',
          textIndent: 5,
          fontSize: 10
        }}
        activeHandleStyle={{
          height: 20
        }} />`;

export default class ToggleDocumentation extends Component {

  render() {
    return (<div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Toggle</h2>

      <Toggle />

      <Toggle defaultValue style={ { marginLeft: 20 } }/>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

        <h3>Properties</h3>

        <table><tbody>

          <tr>
            <td style={ propertyNameStyle }>
              defaultValue
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
              value
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
              valueLink
            </td>
          </tr>
          <tr>
            <td style={ propertyDescriptionStyle }>
              <p>
                <i>Boolean Reference</i>
                <br />
                optional</p>
              <p>
                Behaves like the valueLink poperty of a React rendered checkbox.
                vlaueLink allows to enable two-way data binding between a state property and the value in
                the user interface.
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              onUpdate
            </td>
          </tr>
          <tr>
            <td style={ propertyDescriptionStyle }>
              <p>
                <i>Function</i>
                <br />
                optional</p>
              <p>
                Callback executed every the toggle switches from true to false or the other way around via user input. onUpdate has one argument which is an object containing the value e.g. {'{'} value: true {'}'}.
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
                Works like React's built-in style property except that it extends
                the properties from the base handleStyle.
                Becomes active once the user clicks or touches the toggle (including the first & second choice area).
              </p>
            </td>
          </tr>

          <tr>
            <td style={ propertyNameStyle }>
              firstChoiceStyle
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
              secondChoiceStyle
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
                Works like React's built-in style property except that it extends
                the properties from the base style.
                Becomes active once the Toggle
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
                Works like React's built-in style property except that it extends
                the properties from the base handleStyle.
                Becomes active once the Toggle
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
                Works like React's built-in style property except that it extends
                the properties from the base style.
                Becomes active once the Toggle
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
                Works like React's built-in style property except that it extends
                the properties from the base handleStyle.
                Becomes active once a user moves the mouse above the Toggle component. Only applies to the handle node.
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
              firstChoiceProps
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
              secondChoiceProps
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

        </tbody></table>

        <p>
          Any property valid for a HTML div like
          <span style={ {color: 'grey'} }> style, id, className, onMouseDown, onTouchStart …</span>
        </p>

        <h3>Internal HTML Structure</h3>

        <p>
          This should help developer to understand how the Select is structured
          in order to use the API
        </p>

        <Code value={ htmlStructure } style={ {marginTop: 40} } />

        <h3>More Examples</h3>

        <h4>Toggle with custom choices</h4>

        <Toggle defaultValue
                firstChoiceStyle={{ backgroundColor: 'rgba(43, 176, 206, 0.8)' }}>
          <Choice value>On</Choice>
          <Choice value={ false }>Off</Choice>
        </Toggle>

        <Code value={ choiceCodeExample } style={ {marginTop: 40} } />

        <h4 style={{ marginTop: 40 }}>Toggle with adopted size styling - using CSS 'transform' property</h4>

        <p>
          When you need to change the size of a component don't forget the CSS
          transform property. With the -ms- prefix transform is supported
          back to IE 9.
        </p>

        <Toggle style={{ transform: 'scale(0.6)' }} />

        <Code value={ toggleWithSizeStyling1 } style={ {marginTop: 40} } />

        <h4 style={{ marginTop: 40 }}>Toggle with adopted size styling - using style properties</h4>

        <p>
          Toggle can also be re-sized by proportionately changing the size of all the components in structure of Toggle.
        </p>

        <Toggle style={{
                  borderRadius: 10,
                  height: 20,
                  width: 40
                }}
                sliderStyle={{
                  // Calculated with 2 * the width of choice area
                  width: 80
                }}
                sliderWrapperStyle={{
                  borderRadius: 10
                }}
                handleStyle={{
                  borderRadius: 10,
                  // 1 px smaller than the width due the border effect
                  height: 19,
                  width: 20
                }}
                firstChoiceStyle={{
                  height: 20,
                  // Calculated with the width of the whole toggle - half of the width from the handle
                  width: 30,
                  lineHeight: 20 + 'px',
                  textIndent: -5,
                  fontSize: 12
                }}
                secondChoiceStyle={{
                  height: 20,
                  // Calculated with the width of the whole toggle - half of the width from the handle
                  // style.width - (handleStyle.width / 2 )
                  width: 30,
                  lineHeight: 20 + 'px',
                  textIndent: 5,
                  fontSize: 10
                }}
                activeHandleStyle={{
                  height: 20
                }} />

          <Code value={ toggleWithSizeStyling2 } style={ {marginTop: 40} } />

    </div>);
  }
}
