import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {TextInput} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

const exampleCode = `<!-- TextInput with a defaultValue -->
<TextInput defaultValue="Jane Doe" placeholder="Name"/>

<!-- TextInput with allowNewLine set to true -->
<TextInput defaultValue="This TextInput has allowNewLine set to true. Just press 'Return' once editing the text."
           allowNewLine={ true } />`;

const advancedExampleCode = `<TextInput minRows={ 3 }
       valueLink={ this.linkState('customTextInputValue') }
       placeholder="Just fill in whatever you like :)"
       style={{
         border: '1px solid #C8C8C8',
         padding: 10,
         width: 280,
         borderRadius: 3,
         boxShadow: 'inset 0 1px 2px #CCC'
       }}
       hoverStyle={{
         border: '1px solid #6C6C6C'
       }}
       focusStyle={{
         borderColor: '#53C7F2',
         boxShadow: 'inset 0 1px 2px #CCC, 0 0 8px #53C7F2'
       }}/>

<p>Two-way data binding: { this.state.customTextInputValue }</p>`;

const disabledExampleCode = `<TextInput disabled defaultValue="Maecenas eu placerat ante. Fusce venenatis. Duis tincidunt mi at quam condimentum lobortis condimentum lobortis." />`;

export default React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      customTextInputValue: 'What is going on? Ohh, we provided minRows and custom styles. Please be so kind and add a little bit more text here.'
    };
  },

  render() {
    return (<div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>TextInput</h2>

      <TextInput defaultValue="Jane Doe" placeholder="Name" style={ { marginBottom: 20} }/>

      <TextInput defaultValue="This TextInput has allowNewLine set to true &amp;. Just press 'Return' once editing the text."
                 allowNewLine={ true } />

      <Code value={ exampleCode } style={ {marginTop: 40} } />

      <p style={{ marginTop: 40 }}>
        <i>Note</i>: The TextInput automatically grows in height once the text becomes too long to fit in. Still every TextInput is just rendered as a simple HTML textarea.
      </p>

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
              optional</p>
            <p>
              Behaves like the valueLink poperty of any React rendered input of type="text" or textarea.
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
              <i>String</i>
              <br />
              optional</p>
            <p>
              Behaves like the defaultValue property of any React rendered input of type="text" or textarea.
              The TextInput's field value is set and can be manipulated through the user interface.
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
              <i>String</i>
              <br />
              optional</p>
            <p>
              Behaves like the value property of any React rendered input of type="text" or textarea.
              The TextInput's field value is set and can <b>not</b> be manipulated through the user interface.
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
              Callback executed every time a user updates the text in the textarea. onUpdate has one argument which is an object containing the value e.g. {'{'} value: 'What a beautiful da' {'}'}.
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
              optional
            </p>
            <p>If true the Textarea will be disabled and text can't be manipulated by a user.</p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            minRows
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Integer</i>
              <br />
              optional</p>
            <p>
              Once set the TextInput will always keep a minimum height to fit
              this amount of text input lines.
              This can be useful to indicate to users that it is expected from
              them to provide a certain amount of text input.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            maxRows
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Integer</i>
              <br />
              optional</p>
            <p>
              Once set the TextInput will always keep a maximum height to fit
              this amount of text input lines.
              This can be useful to keep your layout sane even with a lot of
              text input.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            minHeight
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Integer</i>
              <br />
              optional</p>
            <p>
              Will be deprecated with Belle 2.0.0. We recommend to use minRows.
              In case you need it based on pixels you can set minHeight via the
              style property:
              <Code value={ '<TextInput style={{ minHeight: 80 }} />' } />
            </p>
            <p>
              Once set the TextInput will always keep a minimum height. This can be useful to indicate
              to users that it is expected from them to provide a certain amount of text input.
            </p>
            <p>
              Note that when specifying both minRows and minHeight that minRows is ignored.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            maxHeight
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Integer</i>
              <br />
              optional</p>
            <p>
              Will be deprecated with Belle 2.0.0. We recommend to use maxRows.
              In case you need it based on pixels you can set manHeight via the
              style property:
              <Code value={ '<TextInput style={{ maxHeight: 300 }} />' } />
            </p>
            <p>
              Once set the TextInput will always keep a maximum height. This
              can be useful to keep your layout sane even with a lot of text input.
            </p>
            <p>
              Note that when specifying both maxRows and maxHeight that maxRows is ignored.
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
              Works like React's built-in style property except that it extends
              the properties from the base style.
              Becomes active once the user hovers over the input with the cursor.
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
              Becomes active once the input is the element focused in the DOM.
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
              Becomes active once the textarea is disabled.
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
              Becomes active once the textarea is disabled and a user hovers over it.
            </p>
          </td>
        </tr>
      </table>

      <p>
        Any other property valid for a HTML textarea like
        <span style={ {color: 'grey'} }> style, placeholder, onClick, …</span>
      </p>

      <h3>More Examples</h3>

      <h4>TextInput with custom styling & two-way data binding</h4>
      <TextInput minRows={ 3 }
                 valueLink={ this.linkState('customTextInputValue') }
                 placeholder="Just fill in whatever you like :)"
                 style={{
                   border: '1px solid #C8C8C8',
                   padding: 10,
                   width: 280,
                   borderRadius: 3,
                   boxShadow: 'inset 0 1px 2px #CCC'
                 }}
                 hoverStyle={{
                   border: '1px solid #6C6C6C'
                 }}
                 focusStyle={{
                   borderColor: '#53C7F2',
                   boxShadow: 'inset 0 1px 2px #CCC, 0 0 8px #53C7F2'
                 }}/>

      <p>Two-way data binding: { this.state.customTextInputValue }</p>

      <Code value={ advancedExampleCode } style={ {marginTop: 40} } />

      <h4>Disabled Text Input</h4>
      <TextInput disabled defaultValue="Maecenas eu placerat ante. Fusce venenatis. Duis tincidunt mi at quam condimentum lobortis condimentum lobortis."/>

      <Code value={ disabledExampleCode } style={ {marginTop: 40} } />

    </div>);
  }
});
