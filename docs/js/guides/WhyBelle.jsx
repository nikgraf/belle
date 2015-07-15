import React, {Component} from 'react';
import {Toggle} from 'belle';

export default class Why extends Component {

  render() {
    return (<div>
      <h2 style={ {marginTop: 0, marginBottom: 40} }>Wait, but why yet another component library?</h2>

      <p>
        The web platform is a fantastic environment! Still it has certain limitations that are holding you back as a developer. Luckily React was invented and opened up new opportunities.
      </p>
      <p>
        Jyoti & I started to explore them and as a result we compiled Belle - a set of configurable components with all these features included:
      </p>
      <ul>
        <li>Encapsulated components</li>
        <li>Mobile support built-in</li>
        <li>ARIA Support</li>
        <li>Customizable styles / themes (right now there is Belle & Bootstrap 3)</li>
        <li>Advanced localized styling on each individual component</li>
      </ul>
      <p>
        Don't get me wrong. There are a ton of great UI libraries out there like jQuery UI, Bootstrap, Polymer, you name it. They are super useful and to me often a source for inspiration. Through them I learned a lot about the details to take care of when developing a user interface. While I enjoyed working on these details, I believe developers should get them in form of a set of configurable, but still easy to use components. That's exactly what Belle is aiming to be.
      </p>

      <h3 style={{ marginBottom: 20}}>Let's see the Toggle for example</h3>

      <p>The handle can be grabbed and dragged on mobile as well as on desktop devices. In addition a
      simple click or tap initiates switching the state. Of course there is more to it. There are many small details like the possibility to slightly leave the toggle area while continuing to slide. Another one is preventing scrolling while the Toggle being active. All done to enhance the user experience.</p>

      <h4>On Mobile</h4>

      <img src="http://static.nikgraf.com/belle/why-belle/toggle-mobile.gif" style={{ width: 366, height: 270 }} />

      <h4>On Mobile with Bootstrap Style</h4>

      <img src="http://static.nikgraf.com/belle/why-belle/toggle-bootstrap.gif" style={{ width: 372, height: 268 }} />

      <h4>With custom Styles</h4>

      <img src="http://static.nikgraf.com/belle/why-belle/toggle-desktop.gif" style={{ width: 97, height: 62 }} />
      <br />
      Try it yourself here:
      <br /><br />
      <Toggle defaultValue style={{ marginLeft: 12 }}/>

      <h3>Let's checkout the Select next</h3>

      <p>
        Its appearance can be modified while it will continue to work well on mobile & desktop devices. See the last example with a Bootstrap variation of the Select component.
      </p>

      <img src="http://static.nikgraf.com/belle/why-belle/select-dektop.gif" style={{ height: 332 }} />

      <h4>Select on Mobile</h4>

      <img src="http://static.nikgraf.com/belle/why-belle/select-mobile.gif" style={{ height: 270 }} />

      <h4>Select with Bootstrap style</h4>
      <img src="http://static.nikgraf.com/belle/why-belle/select-desktop-bootstrap.gif" style={{ height: 280 }} />
      <br />
      <br />

      <p>
        In case we caught your interest please reach out to us via Twitter
         <a href="https://twitter.com/nikgraf"> @nikgraf</a> &
         <a href="https://twitter.com/jyo_pur"> @jyo_pur</a> or mail us at
        <a href="mailto:nik@nikgraf.com?cc=jyotipuri@gmail.com "> nik@nikgraf.com & jyotipuri@gmail.com</a>.
        We look forward to your feedback.
      </p>
      <p>
        As we want to release Belle soon and we could also use your help in promoting it. Please help us sharing.
      </p>

    </div>);
  }
}
