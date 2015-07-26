import React from 'react';
import {ComboBox, Option} from 'belle';
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

const destinations = [
  {code: '1', name: 'Marrakech, Morocco'},
  {code: '2', name: 'Siem Reap, Cambodia'},
  {code: '3', name: 'Istanbul, Turkey'},
  {code: '4', name: 'Hanoi, Vietnam'},
  {code: '6', name: 'London, United Kingdom'},
  {code: '7', name: 'Rome, Italy'},
  {code: '5', name: 'Prague, Czech Republic'},
  {code: '8', name: 'Buenos Aires, Argentina'},
  {code: '9', name: 'Paris, France'},
  {code: '10', name: 'Cape Town Central, South Africa'},
  {code: '11', name: 'New York City, New York'},
  {code: '12', name: 'Zermatt, Switzerland'},
  {code: '13', name: 'Barcelona, Spain'},
  {code: '14', name: 'Goreme, Turkey'},
  {code: '15', name: 'Ubud, Indonesia'},
  {code: '16', name: 'Cusco, Peru'},
  {code: '17', name: 'St. Petersburg, Russia'},
  {code: '18', name: 'Bangkok, Thailand'},
  {code: '19', name: 'Kathmandu, Nepal'},
  {code: '20', name: 'Athens, Greece'},
  {code: '21', name: 'Budapest, Hungary'},
  {code: '22', name: 'Queenstown, New Zealand'},
  {code: '23', name: 'Hong Kong, China'},
  {code: '24', name: 'Dubai, United Arab Emirates'},
  {code: '25', name: 'Sydney, Australia'}
];

const babyNames = ['Palma', 'Paloma', 'Pamella', 'Paris', 'Patti', 'Paulina', 'Pearl', 'Pearlie'];

function customFilterFunc(inputValue, optionValue) {
  if (inputValue && optionValue) {
    return optionValue.toLowerCase().indexOf(inputValue.toLowerCase()) === 0;
  }
  return false;
}

const onUpdateCode = `{
  value: value string,
  identifier: identifier of the type you passed
  optionMatch: true/false
  optionSelect: true/false
}`;

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

const dataCodeExampleOnePartTwo = `<ComboBox placeholder = { 'Choose an Animal' }
              defaultValue = "Ant"
              displayCaret = { true }>
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

const dataCodeExampleTwoPartOne = `const destinations = [
  {code: '1', name: 'Marrakech, Morocco'},
  {code: '2', name: 'Siem Reap, Cambodia'},
  {code: '3', name: 'Istanbul, Turkey'},
  {code: '4', name: 'Hanoi, Vietnam'},
  {code: '5', name: 'Prague, Czech Republic'},
  ...
];`;

const dataCodeExampleTwoPartTwo = `<ComboBox placeholder = { 'Choose a Destination' }
          menuStyle = { {maxHeight: 250, overflow: 'scroll'} }
          onUpdate={ (event) => {
            if (event.optionMatch) {
              console.log(event.identifier);
            }
          }}>
  {
    destinations.map((destination, index) => {
      return (
        <Option value={ destination.name }
                identifier={ destination.code }
                key={ index }>
            { destination.name }
        </Option>
      );
    })
  }
</ComboBox>`;

const dataCodeExampleThreePartOne = `const currencies = [
  {code: 'AUD', name: 'Australia Dollar'},
  {code: 'BRL', name: 'Brazil Real'},
  {code: 'CAD', name: 'Canada Dollar'},
  {code: 'CNY', name: 'China Yuan Renminbi'},
  {code: 'CRC', name: 'Costa Rica Colon'},
  ...
];`;

const dataCodeExampleThreePartTwo = `<ComboBox placeholder = { 'Choose a Currency' }
              onUpdate={ (event) => {
                console.log(event.value);
                console.log(event.identifier);
                console.log(event.optionMatch);
                console.log(event.optionSelect); }}
              maxOptions = { 5 }>
  {
    currencies.map((currency, index) => {
      return (
        <Option value={ currency.name }
                identifier={ currency.code }
                key={ index }>
          { currency.name }
        </Option>
      );
    })
  }
</ComboBox>`;

const dataCodeExampleFourPartOne = `const babyNames = ['Palma', 'Paloma', 'Pamella', 'Paris', 'Patti', 'Paulina', 'Pearl', 'Pearlie'];`;

const dataCodeExampleFourPartTwo = `<ComboBox enableHint = { true }
          filterFunc = { customFilterFunc }
          placeholder = { 'Select Baby Name' }>
  {
    babyNames.map(function(name, index) {
      return (
        <Option value={ name }
                key={ index }>
          { name }
        </Option>
      );
    })
  }
</ComboBox>`;

const htmlStructure = `<div style={ wrapperStyle }>
  <input style={ hintStyle } />
  <input style={ style } />
  <span style={ caretToCloseStyle or caretToOpenStyle } />
  </span>
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

export default React.createClass({

  render() {
    return (<div>

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
              This callback is executed every time the combo-box value changes. This could happen when: <br/>
              1. user selects an option.<br/>
              2. user types value(function will be called on each keypress).<br/>
              3. user paste some value.<br/>
              4. if hints are enabled and user hits right-arrow key on keyboard.<br/>
              <br/>
              onUpdate has one argument which is an object containing 4 fields:<br/>
              1. value, the value of the combo-box.<br/>
              2. identifier, identifier of the matching option (optional). This is passed only if the options have identifiers and the value of the combo-box exactly matches one of the options.<br/>
              3. optionSelect, true when combo-box is updated by user selecting an option (point:1 above).<br/>
              4. optionMatch, true when value of combo-box exactly matches one of the options, irrespective of how the user entered it.<br/>
            </p>
            <Code value={ onUpdateCode } style={ {marginTop: 40} } />
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
              default: false
            </p>
            <p>
              Can be used to show/hide the caret that appears inside combo-box.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            enableHint
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Object</i>
              <br />
              default: false
            </p>
            <p>
              Can be used to enable/disable showing hints to users in combo-box.
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
              Works like React's built-in style property except that it extends
              the properties from the base style.
              Becomes active once the combo-box is disabled.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            disabledCaretToOpenStyle
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
              the properties from the base disabledCaretToOpenStyle.
              Is applied to the Caret once the combo-box is disabled.
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
              Works like React's built-in style property except that it extends
              the properties from the base disabledStyle.
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
              Works like React's built-in style property except that it extends
              the properties from the base style.
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
            hintStyle
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
              Manipulates the styling for underlying input which is suggesting
              the first option. This input is only visible if the property `enableHint`
              is enabled.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            caretToOpenStyle
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
              Manipulates the styling for the caret when the options to combo-box
              are not visible.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            caretToCloseStyle
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
              Manipulates the styling for the caret when the options to combo-box
              are visible.
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

        <tr>
          <td style={ propertyNameStyle }>
            caretProps
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
              span tag.
            </p>
          </td>
        </tr>

      </table>

      <p>
        Any other property valid for an input element like
        <span style={ {color: 'grey'} }> placeholder, onFocus, onBlur…</span><br />
      </p>

      <h3>Internal HTML Structure</h3>

      <p>
        This should help developer to understand how the ComboBox is structured
        in order to use the API
      </p>

      <Code value={ htmlStructure } style={ {marginTop: 40} } />

      <h3>More Examples</h3>

      <h3>ComboBox with a caret and each option having an image & description</h3>

      <ComboBox placeholder = { 'Choose an Animal' }
                defaultValue = "Ant"
                displayCaret>
        {
          animals.map((animal, index) => {
            return (
              <Option value={ animal.name }
                      style={{
                        padding: '5px 0 5px 60px',
                        marginBottom: '5px',
                        height: 50,
                        background: 'url(' + animal.image + ') no-repeat',
                        backgroundSize: '50px 50px'
                      }}
                      hoverStyle={{
                        padding: '5px 0 5px 60px',
                        marginBottom: '5px',
                        height: 50,
                        background: 'url(' + animal.image + ') no-repeat',
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

      <h3>ComboBox only logging in case of an exact match of the passed Options</h3>

      <ComboBox placeholder = { 'Choose a Destination' }
                menuStyle = { {maxHeight: 250, overflow: 'scroll'} }
                onUpdate={ (event) => {
                  if (event.optionMatch) {
                    console.log(event.identifier);
                  }
                }}>
        {
          destinations.map((destination, index) => {
            return (
              <Option value={ destination.name }
                      identifier={ destination.code }
                      key={ index }>
                  { destination.name }
              </Option>
            );
          })
        }
      </ComboBox>

      <Code value={ dataCodeExampleTwoPartOne } style={ {marginTop: 40} } />

      <Code value={ dataCodeExampleTwoPartTwo } style={ {marginTop: 40} } />

      <h3>ComboBox with options with identifier, onUpdate callback & maxOptions set to 5</h3>

      <ComboBox placeholder = { 'Choose a Currency' }
                    onUpdate={ (event) => {
                      console.log(event.value);
                      console.log(event.identifier);
                      console.log(event.optionMatch);
                      console.log(event.optionSelect);
                    }}
                    maxOptions = { 5 }>
        {
          currencies.map((currency, index) => {
            return (
              <Option value={ currency.name }
                      identifier={ currency.code }
                      key={ index }>
                { currency.name }
              </Option>
            );
          })
        }
      </ComboBox>

      <Code value={ dataCodeExampleThreePartOne } style={ {marginTop: 40} } />

      <Code value={ dataCodeExampleThreePartTwo } style={ {marginTop: 40} } />

      <h3>ComboBox with custom filtering, and hints enabled</h3>

      <ComboBox enableHint = { true }
                filterFunc = { customFilterFunc }
                placeholder = { 'Select Baby Name' }>
        {
          babyNames.map((name, index) => {
            return (
              <Option value={ name }
                      key={ index }>
                { name }
              </Option>
            );
          })
        }
      </ComboBox>

      <Code value={ dataCodeExampleFourPartOne } style={ {marginTop: 40} } />

      <Code value={ dataCodeExampleFourPartTwo } style={ {marginTop: 40} } />

    </div>);
  }
});
