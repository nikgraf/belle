import React, {Component} from 'react';
import {Toggle} from 'belle';

export default class Why extends Component {

  render() {
    return (<div>
      <h2 style={ {marginTop: 0, marginBottom: 40} }>Wait, but why another component library?</h2>

      <p>
        Pretty simple: We wanted to do better.
      </p>
      <p>
        The Web is a fantastic environment. Due its history you know there are certain limitations.
        After developing with React for the first time I
        saw the opportunity to do things I imagined for a while, but couldn't
        accomplish with the tools I had before.
      </p>
      <p>
        For the first time I was able to do all of these things and compile them
        into one set of configurable components:
      </p>
      <ul>
        <li>Encapsulated components</li>
        <li>Mobile support built-in</li>
        <li>ARIA Support</li>
        <li>Customizable styles / themes (right now there is Belle & Bootstrap 3)</li>
        <li>Advanced localized styling on a component level</li>
      </ul>
      <p>
        It's a lot of work to get it right and instead of everbody doing it again & again we should leverage each others work.
      </p>

      <h3 style={{ marginBottom: 20}}>Show me something!</h3>

      <h4>Toggle component with Belle & Bootstrap style</h4>

      <img src="/images/why/toggle-desktop.gif" style={{ width: 97, height: 62 }} />
      <br />
      <img src="/images/why/toggle-bootstrap-desktop.gif" style={{ width: 107, height: 62 }} />
      <br />
      Try it yourself here:
      <br /><br />
      <Toggle style={{ marginLeft: 12 }}/>

      <h4>Select component with Belle style</h4>

      <img src="/images/why/select-dektop.gif" style={{ height: 220 }} />
      <br /><br /><br />

      <h4>Select component with Bootstrap style</h4>
      <img src="/images/why/select-desktop-bootstrap.gif" style={{ height: 200 }} />
      <br />

      <p>
        In case we caught your interest please reach out us via Twitter
         <a href="https://twitter.com/nikgraf"> @nikgraf</a> &
         <a href="https://twitter.com/jyoti_puri_1"> @jyoti_puri_1</a> or contact us
        via mail
        <a href="mailto:nik@nikgraf.com?cc=jyotipuri@gmail.com ">Nik Graf & Jyoti Puri</a>.
        We want to release Belle soon and need help promoting it.
        Of course we are also happy to receive any feedback that comes to your mind.
      </p>

    </div>);
  }
}
