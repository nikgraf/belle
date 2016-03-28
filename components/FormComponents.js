/* jscs:disable disallowSpacesInsideTemplateStringPlaceholders */

import React, { Component } from 'react';
import Code from './Code';

const controlledComponentCodeOne = `
  render: function() {
    return <TextInput value="Hello!" />;
  }`;

const controlledComponentCodeTwo = `
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(obj) {
    this.setState({value: obj.value});
  },
  render: function() {
    var value = this.state.value;
    return <TextInput type="text" value={value} onUpdate={this.handleChange} />;
  }`;

const uncontrolledComponentCode = `
  render: function() {
    return <input type="text" />;
  }`;

const reactLinkCode = `var WithLink = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  render: function() {
    return <input type="text" valueLink={this.linkState('message')} />;
  }
});`;

export default class FormComponents extends Component {

  render() {
    return (<div>
      <h2 style={{ marginTop: 0, marginBottom: 40 }}>Form Components</h2>

      <p>
        Belle has many Form Components: ComboBox, Select, Rating, TextInput and Toggle.
        They differ from other components because they can be mutated via user interactions.
      </p>

      <h4>onUpdate Prop</h4>

      <p>
        Form components allow listening for changes by setting a callback to the onUpdate property.
        The callback receives an object as parameter containing a field 'value' which is the value entered by the user.
      </p>

      <h4>Controlled Components</h4>

      <p>
        An Form Component with value set is a controlled component. In a controlled component,
        the value of the rendered element will always reflect the value prop. For example:
      </p>

      <Code value={ controlledComponentCodeOne } style={{ marginTop: 20 }} />

      <p>
        This will render a TextInput that always has a value of Hello!. Any user input will have no effect on the rendered element
        because React has declared the value to be Hello!. If you wanted to update the value in response to user input, you
        could use the onUpdate event:
      </p>

      <Code value={ controlledComponentCodeTwo } style={{ marginTop: 20 }} />

      <p>This pattern makes it easy to implement interfaces that respond to or validate user interactions.</p>

      <h4>Uncontrolled Components</h4>

      <p>A component that does not supply a value is an uncontrolled component.
        In an uncontrolled component, the value of the rendered element will reflect the user's input. For example:
      </p>

      <Code value={ uncontrolledComponentCode } style={{ marginTop: 20 }} />

      <p>
        This will render an input that starts off with an empty value. Any user input will be immediately reflected by the rendered element.
        If you wanted to listen to updates to the value, you could use the onUpdate event just like you can with controlled components.
        If you want to initialize the component with a non-empty value, you can supply a defaultValue prop.
      </p>

      <h4>Two-Way Binding Helpers</h4>

      <p>Two-way binding is implicitly enforcing that some value in the DOM is always consistent with some React state.
        Like React form components Belle form components also provide ReactLink: its syntactic sugar for setting up the common
        data flow loop pattern, or "linking" some data source to React state.
      </p>

      <Code value={ reactLinkCode } style={{ marginTop: 20 }} />

      <p>Note:<br />
        ReactLink is just a thin wrapper and convention around the onUpdate/setState() pattern. It doesn't fundamentally change how data
        flows in your React application.</p>

      <h4>References</h4>
      <p>
        <a href="https://facebook.github.io/react/docs/forms.html">React Forms</a>
      </p>
      <p>
        <a href="https://facebook.github.io/react/docs/two-way-binding-helpers.html">Two-Way Binding Helpers</a>
      </p>

    </div>);
  }
}
