import React from 'react';
import { Rating } from 'belle';
import Code from '../Code';
import { propertyNameStyle, propertyDescriptionStyle } from '../../style';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

const basicCodeExample = `<Rating defaultValue={3}></Rating>`;

const advanceCodeExample1 = `<Rating defaultValue={4} disabled></Rating>`;

const advanceCodeExample2 = `<Rating defaultValue={4} character={'✪'}></Rating>`;

const advanceCodeExample3 = `<Rating valueLink={ this.linkState('customRatingValue') }/>

<a onClick={ this._resetRating }
   style={ {
     marginLeft: 20,
     position: 'relative',
     top: -5,
     textDecoration: 'underline',
     cursor: 'pointer'
    } }>Reset</a>

_resetRating() {
  this.setState({
    customRatingValue: undefined
  });
}`;

export default React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      customRatingValue: 3,
    };
  },

  _resetRating() {
    this.setState({
      customRatingValue: undefined,
    });
  },

  render() {
    return (<div>

      <h2 style={ { marginTop: 0, marginBottom: 40 } }>Rating</h2>

      <Rating defaultValue={3}/>

      <Code value={ basicCodeExample } style={ { marginTop: 40 } } />

      <h3>Properties</h3>

      <table><tbody>
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
              wrapping the characters.
              Works like React's built-in style property except that it extends
              the properties from the base characterStyle.
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
              applied to the spans wrapping the characters.
              Works like React's built-in style property except that it extends
              the properties from the base characterStyle.
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
              Works like React's built-in style property except that it extends
              the properties from the base style.
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
              applied when the component is disabled.
              Works like React's built-in style property except that it extends
              the properties from the base style.
            </p>
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
              The property is used to apply a style directly to the wrapper
              applied when the component is hovered.
              Works like React's built-in style property except that it extends
              the properties from the base style.
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
              The property is used to apply a style directly to the wrapper
              applied when the component is disabled and is hovered.
              Works like React's built-in style property except that it extends
              the properties from the base style.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            wrapperProps
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
              div tag. It allows to extend the div wrapping the whole rating
              component.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            characterProps
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
      </tbody></table>

      <p>
      Other supported properties include:
      <span style={ { color: 'grey' } }> tabIndex, style, className, focusStyle, onMouseDown,
        onMouseUp, onMouseEnter, onMouseMove, onMouseLeave, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel, onFocus, onBlur, onClick,
        onKeyDown</span>
      </p>

      <h3>More Examples</h3>

      <h4>Disabled Rating</h4>
      <Rating defaultValue={4} disabled/>
      <Code value= { advanceCodeExample1 } style={ { marginTop: 20, marginBottom: 40 } } />

      <h4>Rating with a custom Character</h4>
      <Rating defaultValue={4} character={'✪'}/>
      <Code value= { advanceCodeExample2 } style={ { marginTop: 20, marginBottom: 40 } } />

      <h4>Controlled Rating Component with a Reset Link</h4>
      <p>Reset rating functionality can be implemented using controlled rating component like this:</p>
      <Rating valueLink={ this.linkState('customRatingValue') }/>
      <a
        onClick={ this._resetRating }
        style={{
          marginLeft: 20,
          position: 'relative',
          top: -5,
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
      >Reset</a>
      <Code value= { advanceCodeExample3 } style={ { marginTop: 20 } } />
    </div>);
  },
});
