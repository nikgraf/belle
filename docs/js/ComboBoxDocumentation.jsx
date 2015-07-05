"use strict";

import React from 'react';
import {Card, ComboBox, Option, Rating} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

const animals = [
  {name: 'Abyssinian', description: 'The oldest breed of cat in the world!', image: 'images/abyssinian.jpg'},
  {name: 'Albatross', description: 'The largest wingspan of any bird!', image: 'images/albatross.jpg'},
  {name: 'Angelfish', description: 'There are 100 different species!', image: 'images/angelfish.jpg'},
  {name: 'Ant', description: 'First evolved 100 million years ago!', image: 'images/ant.jpg'},
  {name: 'Antelope', description: 'Renew their horns every year!', image: 'images/antelope.jpg'},
  {name: 'Asian Elephant', description: 'Domesticated for hundreds of years!', image: 'images/asian_elephant.jpg'}
];

const currencies = [
  {code: 'AUD', name: 'Australia Dollar'},
  {code: 'BRL', name: 'Brazil Real'},
  {code: 'CAD', name: 'Canada Dollar'},
  {code: 'CNY', name: 'China Yuan Renminbi'},
  {code: 'CRC', name: 'Costa Rica Colon'},
  {code: 'CUP', name: 'Cuba Peso'},
  {code: 'EGP', name: 'Egypt Pound'},
  {code: 'HKD', name: 'Hong Kong Dollar'},
  {code: 'NZD', name: 'New Zealand Dollar'},
  {code: 'SEK', name: 'Sweden Krona'},
  {code: 'GBP', name: 'United Kingdom Pound'},
  {code: 'USD', name: 'United States Dollar'}
];

const currencyFilterFunc = function(inputValue, optionValue) {
  if(inputValue && optionValue) {
    return optionValue.indexOf(inputValue) === 0;
  }
  return false;
};

export default React.createClass({

  render() {
    return <div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>ComboBox</h2>

      <ComboBox placeholder="Choose a State">
        <Option value="Alabama">Alabama</Option>
        <Option value="Alaska">Alaska</Option>
        <Option value="Arizona">Arizona</Option>
        <Option value="Arkansas">Arkansas</Option>
      </ComboBox>

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
              optional</p>
            <p>
              Behaves like the valueLink property of a native input-tag.
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
              <i>String, Boolean, Number</i>
              <br />
              optional</p>
            <p>
              Behaves like the defaultValue property of a native input-tag.
              This value will be the initial value of the combo-box and can be manipulated through the user interface.
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
              <i>String, Boolean, Number</i>
              <br />
              optional</p>
            <p>
              Behaves like the value property of a native input-tag.
              This value will be the initial value of the combo-box and can <b>not</b> be manipulated through the user interface.
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
              Callback executed every time an Option is selected or a user inputs some value. onUpdate has one argument which is an object containing the value e.g. {'{'} value: 'Rome' {'}'}.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            maxOptions
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
              Using this property the developer can put an upper limit to the number of options that will be shown for the combo-box.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            displayCaret
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Object</i>
              <br />
              default: true
            </p>
            <p>
              Can be used to show/hide the caret that appears inside combo-box.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            filterFunc
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
              By default the options to be shown to the user are filtered using simple case-insensitive comparison, to find occurrence of input string in option value.
              But using  this property developer can provide a custom function for filtering using. The function should expect to receive 2 parameters:<br/>
              1. String input in the combo-box <br/>
              2. Value of the selected option
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
            <p>If true the combo-box will be disabled and can't be changed by the user.</p>
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
              Works like React's built-in style property.
              Becomes active once the combo-box is disabled.
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
              Works like React's built-in style property.
              Becomes active once the user hovers over the combo-box with the cursor.
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
              Works like React's built-in style property.
              Becomes active once the combo-box is disabled and a user hovers over it.
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
              Works like React's built-in style property.
              Becomes active once the combo-box is the element focused in the DOM.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            wrapperStyle
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
              Manipulates the styling for the div-tag wrapped around the component.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            menuStyle
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
              Manipulates the styling for the ul-tag wrapped around the options.
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
              div tag. It allows to extend the div wrapping the whole combo-box
              component.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            menuProps
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
              ul tag. It allows to extend the ul wrapping the available options.
            </p>
          </td>
        </tr>

      </table>

      <p>
        Any other property valid for an input element like
        <span style={ {color: 'grey'} }> placeholder, onFocus, onBlur, onClick…</span><br />
      </p>

      <h3>Internal HTML Structure</h3>

      <p>
        This should help developer to understand how the ComboBox is structured
        in order to use the API
      </p>

      <Code value={ htmlStructure } style={ {marginTop: 40} } />

      <h3>More Examples</h3>

      <h3>ComboBox with each option having an image and description</h3>

      <ComboBox placeholder = { 'Choose an Animal' }
                    defaultValue = "Ant">
        {
          animals.map(function(animal, index) {
            return (
              <Option value={ animal.name }
                      style={{
                        padding: '5px 0 5px 60px',
                        marginBottom: '5px',
                        height: 50,
                        background:  'url(' + animal.image + ') no-repeat',
                        backgroundSize: '50px 50px'
                      }}
                      hoverStyle={{
                        padding: '5px 0 5px 60px',
                        marginBottom: '5px',
                        height: 50,
                        background:  'url(' + animal.image + ') no-repeat',
                        backgroundSize: '50px 50px',
                        backgroundColor: '#FFE95D'
                      }}
                      key={ index }>
                <span>
                  <div style={ {fontWeight: 'bold', fontSize: '14px'} }>
                    { animal.name }
                  </div>
                  <div style={ {fontSize: '12px'} }>
                    { animal.description }
                  </div>
                </span>
              </Option>
            );
          })
        }
      </ComboBox>

      <Code value={ dataCodeExampleOnePartOne } style={ {marginTop: 40} } />

      <Code value={ dataCodeExampleOnePartTwo } style={ {marginTop: 40} } />

      <h3>ComboBox with custom filtering, onUpdate callback & maxOptions set to 5</h3>

      <ComboBox placeholder = { 'Choose a Currency' }
                    onUpdate={ function(event) { console.log(event.value); } }
                    maxOptions = { 5 }
                    filterFunc = { currencyFilterFunc }>
        {
          currencies.map(function(currency, index) {
            return (
              <Option value={ currency.code }
                      key={ index }>
                <span style={ {fontWeight: 'bold', fontSize: '14px', marginRight: '10px'} }>
                  { currency.code }
                </span>
                <span style={ {fontSize: '12px'} }>
                  { currency.name }
                </span>
              </Option>
            );
          })
        }
      </ComboBox>

      <Code value={ dataCodeExampleTwoPartOne } style={ {marginTop: 40} } />

      <Code value={ dataCodeExampleTwoPartTwo } style={ {marginTop: 40} } />

      <Code value={ dataCodeExampleTwoPartThree } style={ {marginTop: 40} } />

    </div>;
  }
});

const basicCodeExample = `<ComboBox placeholder="Choose a State">
  <Option value="Alabama">Alabama</Option>
  <Option value="Alaska">Alaska</Option>
  <Option value="Arizona">Arizona</Option>
  <Option value="Arkansas">Arkansas</Option>
</ComboBox>`;

const dataCodeExampleOnePartOne = `<!-- defining the data -->
const animals = [
  {name: 'Abyssinian', description: 'The oldest breed of cat in the world!', image: 'images/abyssinian.jpg'},
  {name: 'Albatross', description: 'The largest wingspan of any bird!', image: 'images/albatross.jpg'},
  {name: 'Angelfish', description: 'There are 100 different species!', image: 'images/angelfish.jpg'},
  {name: 'Ant', description: 'First evolved 100 million years ago!', image: 'images/ant.jpg'},
  {name: 'Antelope', description: 'Renew their horns every year!', image: 'images/antelope.jpg'},
  {name: 'Asian Elephant', description: 'Domesticated for hundreds of years!', image: 'images/asian_elephant.jpg'}
]`;

const dataCodeExampleOnePartTwo = `<ComboBox placeholder = { 'Choose an Animal' }>
  {
    animals.map(function(animal, index) {
      return (
        <Option value={ animal.name }
                style={{
                  padding: '5px 0 5px 60px',
                  marginBottom: '5px',
                  height: 50,
                  background:  'url(' + animal.image + ') no-repeat',
                  backgroundSize: '50px 50px'
                }}
                hoverStyle={{
                  padding: '5px 0 5px 60px',
                  marginBottom: '5px',
                  height: 50,
                  background:  'url(' + animal.image + ') no-repeat',
                  backgroundSize: '50px 50px',
                  backgroundColor: '#FFE95D'
                }}
                key={ index }>
          <span>
            <div style={ {fontWeight: 'bold', fontSize: '14px'} }>
              { animal.name }
            </div>
            <div style={ {fontSize: '12px'} }>
              { animal.description }
            </div>
          </span>
        </Option>
      );
    })
  }
</ComboBox>`;

const dataCodeExampleTwoPartOne = `const currencies = [
  {code: 'AUD', name: 'Australia Dollar'},
  {code: 'BRL', name: 'Brazil Real'},
  {code: 'CAD', name: 'Canada Dollar'},
  {code: 'CNY', name: 'China Yuan Renminbi'},
  {code: 'CRC', name: 'Costa Rica Colon'},
  {code: 'CUP', name: 'Cuba Peso'},
  {code: 'EGP', name: 'Egypt Pound'},
  {code: 'HKD', name: 'Hong Kong Dollar'},
  {code: 'NZD', name: 'New Zealand Dollar'},
  {code: 'SEK', name: 'Sweden Krona'},
  {code: 'GBP', name: 'United Kingdom Pound'},
  {code: 'USD', name: 'United States Dollar'}
];`;

const dataCodeExampleTwoPartTwo = `<ComboBox placeholder = { 'Choose a Currency' }
              onUpdate={ function(event) { console.log(event.value); } }
              maxOptions = { 5 }
              filterFunc = { currencyFilterFunc }>
  {
    currencies.map(function(currency, index) {
      return (
        <Option value={ currency.code }
                key={ index }>
          <span style={ {fontWeight: 'bold', fontSize: '14px', marginRight: '10px'} }>
            { currency.code }
          </span>
          <span style={ {fontSize: '12px'} }>
            { currency.name }
          </span>
        </Option>
      );
    })
  }
</ComboBox>`;

const dataCodeExampleTwoPartThree = `const currencyFilterFunc = function(inputValue, optionValue) {
  if(inputValue && optionValue) {
    return optionValue.indexOf(inputValue) === 0;
  }
  return false;
};`;

const htmlStructure = `<div style={ wrapperStyle }>
  <input style={ style }>
  </input>
  <ul style={ menuStyle }>
    <li>
      <Option />
    </li>
    <li>
      <Option />
    </li>
    … more entries …
  </ul>
</div>`;
