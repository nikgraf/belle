import React, {Component} from 'react';
import {Option, Placeholder, Select, Separator, TextInput} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

function positionOptions(selectComponent) {
  const menuNode = React.findDOMNode(selectComponent.refs.menu);
  menuNode.style.top = '35px';
}

const fruits = [
  { value: 'pineapple', content: (<span>🍍 Pineapple</span>) },
  { value: 'banana', content: (<span>🍌 Banana</span>) },
  { value: 'peach', content: (<span>🍑 Peach</span>) },
  { value: 'pear', content: (<span>🍐 Pear</span>) },
  { value: 'cherries', content: (<span>🍒 Cherries</span>) }
];

const basicCodeExample = `<!-- basic select example -->
<Select>
  <Placeholder>Choose a City</Placeholder>
  <Option value="berlin">Berlin</Option>
  <Option value="tokyo">Tokyo</Option>
  <Option value="vienna">Vienna</Option>
</Select>`;

const dataCodeExamplePartOne = `<!-- defining the data -->
var fruits = [
  { value: "pineapple", content: (<span>🍍 Pineapple</span>) },
  { value: "banana", content: (<span>🍌 Banana</span>) },
  { value: "peach", content: (<span>🍑 Peach</span>) },
  { value: "pear", content: (<span>🍐 Pear</span>) },
  { value: "cherries", content: (<span>🍒 Cherries</span>) }
];`;

const dataCodeExamplePartTwo = `<!-- filling a select with Option  -->
<Select defaultValue={ fruits[3].value }
        onUpdate={ function(event) { console.log(event.value); } }>
  {
    fruits.map(function(fruit, index) {
      return (
        <Option value={ fruit.value }
                key={ index }>
          { fruit.content }
        </Option>
      );
    })
  }
</Select>`;

const formCodeExample = `<!-- form consiting of an input & a select  -->
<div style={ { display: 'table' } }>
  <TextInput style={ { width: 138,
                       float: 'left'} }
             placeholder="Fill in your address …" />
           <div style={ { width: 110,
                          float: 'left',
                          marginLeft: 16 } }>
    <Select defaultValue="tokyo"
            menuStyle={ { height: 160,
                                 overflow: 'scroll' } }>
      <Option value="berlin">Berlin</Option>
      <Option value="hong-kong">Hong Kong</Option>
      <Option value="istanbul">Istanbul</Option>
      <Option value="rome">Rome</Option>
      <Option value="san-francisco">San Francisco</Option>
      <Option value="tokyo">Tokyo</Option>
      <Option value="vienna">Vienna</Option>
    </Select>
  </div>
</div>`;

const separatorCodeExample = `<!-- basic select example with separators -->
<Select>
  <Separator>Asia</Separator>
  <Option value="hong-kong">Hong Kong</Option>
  <Option value="tokyo">Tokyo</Option>
  <Separator>Europe</Separator>
  <Option value="berlin">Berlin</Option>
  <Option value="istanbul">Istanbul</Option>
</Select>`;

const advancedStylingCodeExample = `<!-- select example with more advanced styling -->
<Select menuStyle={{ padding: 6 }}>
  <Placeholder>Choose your next Vacation</Placeholder>
  <Option value="santorini"
          style={{
            padding: '15px 0 0 60px',
            height: 50,
            background: 'url(images/santorini_100.jpg) no-repeat',
            backgroundSize: '50px 50px',
            backgroundColor: '#FFEE82'
          }}
          hoverStyle={{
            padding: '15px 0 0 60px',
            height: 50,
            background: 'url(images/santorini_100.jpg) no-repeat',
            backgroundSize: '50px 50px',
            backgroundColor: '#FFE95D'
          }} >
    Santorini (Special Deal)
  </Option>
  <Separator style={{ height: 4, padding: 0 }}></Separator>
  <Option value="yosemite"
          style={{
            padding: '15px 0 0 60px',
            height: 50,
            background: 'url(images/yosemite_100.jpg) no-repeat',
            backgroundSize: '50px 50px'
          }}
          hoverStyle={{
            padding: '15px 0 0 60px',
            height: 50,
            backgroundColor: '#F5F5F5',
            background: 'url(images/yosemite_100.jpg) no-repeat',
            backgroundSize: '50px 50px'
          }} >
    Yosemite
  </Option>
  <Separator style={{ height: 4, padding: 0 }}></Separator>
  <Option value="croatia"
          style={{
            padding: '15px 0 0 60px',
            height: 50,
            background: 'url(images/croatia_100.jpg) no-repeat',
            backgroundSize: '50px 50px'
          }}
          hoverStyle={{
            padding: '15px 0 0 60px',
            height: 50,
            backgroundColor: '#F5F5F5',
            background: 'url(images/croatia_100.jpg) no-repeat',
            backgroundSize: '50px 50px'
          }} >
    Croatia
  </Option>
</Select>`;

const positionOptionsCodeExample = `<!-- custom positionOptions function in your JS code -->
function positionOptions (selectComponent) {
  const menuNode = React.findDOMNode(selectComponent.refs.menu);
  menuNode.style.top = '35px';
}`;

const positionOptionsSelectCodeExample = `<!-- select with a custom positionOptions function -->
<Select positionOptions={ positionOptions }>
  <Placeholder>Choose a City</Placeholder>
  <Option value="berlin">Berlin</Option>
  <Option value="tokyo">Tokyo</Option>
  <Option value="vienna">Vienna</Option>
</Select>`;

const htmlStructure = `<div tabIndex="0"
     style={ wrapperStyle }>
  <div style={ style }>
    <Option /> or <Placeholder />
    <span style={ caretToCloseStyle or caretToOpenStyle } />
  </div>
  <ul style={ menuStyle }>
    <li>
      <Option /> or <Separator />
    </li>
    <li>
      <Option /> or <Separator />
    </li>
    … more entries …
  </ul>
</div>`;

export default class SelectDocumentation extends Component {

  render() {
    return (<div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Select</h2>

      <Select>
        <Placeholder>Choose a City</Placeholder>
        <Option value="berlin">Berlin</Option>
        <Option value="tokyo">Tokyo</Option>
        <Option value="vienna">Vienna</Option>
      </Select>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <p style={{ marginTop: 40 }}>
        <i>Note</i>: The select is designed to behave exactly like the native
        select tag with the benefit that you have full control over its appearance.
        You might want to try navigating the options with your keyboard.
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
              Behaves like the valueLink property of a native select-tag.
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
              Behaves like the defaultValue property of a native select-tag.
              The Option with the same value is initially used as selected and can be manipulated through the user interface.
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
              Behaves like the value property of a native select-tag.
              The Option with the same value is initially used as selected and can <b>not</b> be manipulated through the user interface.
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
              Callback executed every time an Option is selected. onUpdate has one argument which is an object containing the value e.g. {'{'} value: 'Rome' {'}'}.
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
              Becomes active once the user hovers over the select with the cursor.
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
              Becomes active once the select is the element focused in the DOM.
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
              Manipulates the styling for the div-tag wrapped around the options.
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
              Manipulates the styling for the caret when the options to select
              from are not visible.
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
              Manipulates the styling for the caret when the options to select
              from are visible.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            shouldPositionOptions
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Boolean</i>
              <br />
              optional</p>
            <p>
              This one is by default true. If set to true the menu is
              repositioned after opening it to position the focused Option right
              on top of the already selected one. By default it also finds the
              right entry in case the menu has a maxHeight and scrolling
              is active. If set to false it is not repositioned.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            positionOptions
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>function(this)</i>
              <br />
              optional
            </p>
            <p>
              A function called after the user opens the menu.
              The function's purpose is to reposition the menu to
              improve the user experience.
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
              div tag. It allows to extend the div wrapping the whole select
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
            <p>If true the Select will be disabled and can't be changed by the user.</p>
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
              Becomes active once the Select is disabled.
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
              Becomes active once the Select is disabled and a user hovers over it.
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
              Is applied to the Caret once the Select is disabled.
            </p>
          </td>
        </tr>
      </table>

      <p>
        Any other property valid for a Div element like
        <span style={ {color: 'grey'} }> style, onClick, …</span><br />
        The properties will directly applied to the wrapper for the selected
        option.
      </p>

      <h3>Internal HTML Structure</h3>

      <p>
        This should help developer to understand how the Select is structured
        in order to use the API
      </p>

      <Code value={ htmlStructure } style={ {marginTop: 40} } />

      <h3>More Examples</h3>

      <p>Select from a dynamic data set including a defaultValue & onUpdate callback</p>

      <Select defaultValue={ fruits[3].value }
              onUpdate={ (event) => { console.log(event.value); } }>
        {
          fruits.map(function(fruit, index) {
            return (
              <Option value={ fruit.value }
                      key={ index }>
                { fruit.content }
              </Option>
            );
          })
        }
      </Select>

      <Code value={ dataCodeExamplePartOne } style={ {marginTop: 40} } />

      <Code value={ dataCodeExamplePartTwo } style={ {marginTop: 40} } />

      <h3>Select as part of a form with a scrollable menu</h3>

      <div style={ { display: 'table' } }>
        <TextInput style={ { width: 138,
                             'float': 'left'} }
                   placeholder="Fill in your address …" />
                 <div style={ { width: 110,
                                'float': 'left',
                                marginLeft: 16 } }>
          <Select defaultValue="tokyo"
                  menuStyle={ { height: 160,
                                       overflow: 'scroll' } }>
            <Option value="berlin">Berlin</Option>
            <Option value="hong-kong">Hong Kong</Option>
            <Option value="istanbul">Istanbul</Option>
            <Option value="rome">Rome</Option>
            <Option value="san-francisco">San Francisco</Option>
            <Option value="tokyo">Tokyo</Option>
            <Option value="vienna">Vienna</Option>
          </Select>
        </div>
      </div>

      <Code value={ formCodeExample } style={ {marginTop: 40} } />

      <h3>Select with Separators</h3>

      <Select>
        <Separator>Asia</Separator>
        <Option value="hong-kong">Hong Kong</Option>
        <Option value="tokyo">Tokyo</Option>
        <Separator>Europe</Separator>
        <Option value="berlin">Berlin</Option>
        <Option value="istanbul">Istanbul</Option>
      </Select>

      <Code value={ separatorCodeExample } style={ {marginTop: 40} } />

      <h3>Select with various Option styles</h3>

      <Select menuStyle={{ padding: 6 }}>
        <Placeholder>Choose your next Vacation</Placeholder>
        <Option value="santorini"
                style={{
                  padding: '15px 0 0 60px',
                  height: 50,
                  background: 'url(images/santorini_100.jpg) no-repeat',
                  backgroundSize: '50px 50px',
                  backgroundColor: '#FFEE82'
                }}
                hoverStyle={{
                  padding: '15px 0 0 60px',
                  height: 50,
                  background: 'url(images/santorini_100.jpg) no-repeat',
                  backgroundSize: '50px 50px',
                  backgroundColor: '#FFE95D'
                }} >
          Santorini (Special Deal)
        </Option>
        <Separator style={{ height: 4, padding: 0 }}/>
        <Option value="yosemite"
                style={{
                  padding: '15px 0 0 60px',
                  height: 50,
                  background: 'url(images/yosemite_100.jpg) no-repeat',
                  backgroundSize: '50px 50px'
                }}
                hoverStyle={{
                  padding: '15px 0 0 60px',
                  height: 50,
                  backgroundColor: '#F5F5F5',
                  background: 'url(images/yosemite_100.jpg) no-repeat',
                  backgroundSize: '50px 50px'
                }} >
          Yosemite
        </Option>
        <Separator style={{ height: 4, padding: 0 }}/>
        <Option value="croatia"
                style={{
                  padding: '15px 0 0 60px',
                  height: 50,
                  background: 'url(images/croatia_100.jpg) no-repeat',
                  backgroundSize: '50px 50px'
                }}
                hoverStyle={{
                  padding: '15px 0 0 60px',
                  height: 50,
                  backgroundColor: '#F5F5F5',
                  background: 'url(images/croatia_100.jpg) no-repeat',
                  backgroundSize: '50px 50px'
                }} >
          Croatia
        </Option>
      </Select>

      <Code value={ advancedStylingCodeExample } style={ {marginTop: 40} } />

      <h3>Select with a custom positionOptions function</h3>

      <Select positionOptions={ positionOptions }>
        <Placeholder>Choose a City</Placeholder>
        <Option value="berlin">Berlin</Option>
        <Option value="tokyo">Tokyo</Option>
        <Option value="vienna">Vienna</Option>
      </Select>

      <Code value={ positionOptionsCodeExample } style={ {marginTop: 40} } />

      <Code value={ positionOptionsSelectCodeExample } style={ {marginTop: 40} } />

    </div>);
  }
}
