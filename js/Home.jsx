import React, {Component} from 'react';
import ThemeSwitch from './theme/ThemeSwitch';
import GettingStarted from './GettingStarted';

export default class Home extends Component {

  render() {
    return (
      <div style={{ marginTop: -20 }}>
        <p>
          Belle provides you with a set of React components like Toggle, ComboBox, Rating, TextInput, Button, Card, Select and soon many more.
        </p>
        <p>
          All of the components are optimized to work both on <b>mobile & desktop devices</b>. The styles are highly customizable on two levels. You can <b>configure the base styles</b> of all the components as well as <b>modify each one of them individually</b>.
        </p>

        <h3>Browser Support</h3>
        <ul>
          <li>Chrome (mobile and desktop)</li>
          <li>Safari (mobile and desktop)</li>
          <li>Firefox</li>
          <li>Internet Explorer 9, 10, 11</li>
        </ul>

        <h3>Theme Support</h3>

        As mentioned above the styles are highly configurable and for demonstration purposes you can view this website with the Boostrap3 theme.

        <ThemeSwitch />

        <br /><br />

        <GettingStarted />

      </div>
    );
  }
}
