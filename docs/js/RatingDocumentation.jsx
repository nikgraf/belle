import React from 'react';
import {Card, Rating} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

export default React.createClass({

  render() {
    return <div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Rating</h2>

      <Rating defaultValue={3}></Rating>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <table>
        <tr>
          <td style={ propertyNameStyle }>
            valueLink
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Value Reference</i>
              <br />
              optional
            </p>
            <p>
              Behaves like the valueLink poperty of a native input-tag.
              ValueLink allows to enable two-way data binding between a state property and the value in
              the user interface.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            defaultValue
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Integer (1-5)</i>
              <br />
              optional
            </p>
            <p>
              Behaves like the defaultValue poperty of a native input-tag.
              The rating can be manipulated through the user interface.
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
              <i>Integer (1-5)</i>
              <br />
              optional
            </p>
            <p>
              Behaves like the value poperty of a native input-tag.
              The rating can <b>not</b> be manipulated through the user interface.
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
              optional
            </p>
            <p>
              Callback executed when a user changes the rating via the user interface. onUpdate has one argument which is an object containing the value e.g. {'{'} value: 3 {'}'}.
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
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Boolean</i>
              <br />
              optional (default: true)
            </p>
            <p>
              Prevents the focus style being applied in case the buttons becomes focused by a click or touch.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            character
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
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
            characterStyle
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
              The property can be used to specify styling of set rating values
              and will be applied to the spans wrapping the characters. Behaves
              like React's built-in style property.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            hoverCharacterStyle
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
              The property can be used to specify styling of set rating values
              when a user hover them. These styles will be applied to the spans
              wrapping the characters. Behaves like React's built-in style property.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            activeCharacterStyle
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
              The property can be used to specify styling of set rating values
              when a user touches or presses the rating. These styles will be
              applied to the spans wrapping the characters. Behaves like React's
              built-in style property.
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
              The property is used to apply a focus style directly to the wrapper.
              Behaves like React's built-in style property.
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
              The property is used to apply a style directly to the wrapper
              applied when the component is disabled. It behaves like React's
              built-in style property.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            characterProperties
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
              The property can be used to specify any other properties specific to rating character apart from styling. They will be applied to the span wrapping the character.
            </p>
          </td>
        </tr>
      </table>

      <p>
      Other supported properties include:
      <span style={ {color: 'grey'} }> tabIndex, style, className, focusStyle, onMouseDown,
        onMouseUp, onMouseEnter, onMouseMove, onMouseLeave, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel, onFocus, onBlur, onClick,
        onKeyDown</span>
      </p>

      <h3>Methods</h3>

      <table>
        <tr>
          <td style={ propertyNameStyle }>
            resetValue
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              This method can be called to reset the Rating's value to undefined.
            </p>
          </td>
        </tr>
      </table>

      <h3>More Examples</h3>

      <Rating defaultValue={4} disabled></Rating>
      <Code value= { advanceCodeExample1 } style={ {marginTop: 20, marginBottom: 40} } />
      <Rating defaultValue={4} character={'✪'}></Rating>
      <Code value= { advanceCodeExample2 } style={ {marginTop: 20, marginBottom: 40} } />
      <Rating ref="rating" defaultValue={4}></Rating>
      <a onClick={ function() { this.refs.rating.resetValue(); }.bind(this) }
         style={ {
           marginLeft: 20,
           position: 'relative',
           top: -5,
           textDecoration: 'underline',
           cursor: 'pointer'
          } }>Reset</a>
      <Code value= { advanceCodeExample3 } style={ {marginTop: 20} } />
    </div>;
  }
});

const basicCodeExample = `<Rating defaultValue={3}></Rating>`;

const advanceCodeExample1 = `<Rating defaultValue={4} disabled></Rating>`;

const advanceCodeExample2 = `<Rating defaultValue={4} character={'✪'}></Rating>`;

const advanceCodeExample3 = `<Rating ref="rating" defaultValue={4}></Rating>
<a onClick={ function() { this.refs.rating.resetValue(); }.bind(this); }
   style={ {
     marginLeft: 20,
     position: 'relative',
     top: -5,
     textDecoration: 'underline',
     cursor: 'pointer'
    } }>Reset</a>`;
