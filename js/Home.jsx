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

        <div style={{ marginTop: 40 }}>
          <p style={{ borderRadius: 2,
                      clear: 'both',
                      padding: 5 }}>
            <span style={{ fontSize: 32, color: '#ccc'}}>“ </span>
            This is so good. I like the effort you put into tweaking the UX.
            <span style={{ fontSize: 32,
                           display: 'inline-block',
                           position: 'relative',
                           top: 26,
                           color: '#ccc',
                           left: 4 }}> ”</span>
          </p>
          <div style={{ marginLeft: 30 }}>
            <img src="images/vjeux.jpeg"
                 style={{ height: 50,
                          'float': 'left',
                          borderRadius: 50 }} />
            <div style={{ fontSize: 18,
                          marginLeft: 60 }}>Christopher Chedeau (Vjeux)</div>
            <div style={{ color: '#888',
                          marginLeft: 60 }}>React Core Team</div>
          </div>
          <div stlye={{ clear: 'both' }}></div>
        </div>

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
