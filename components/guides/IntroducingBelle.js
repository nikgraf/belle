import React, {Component} from 'react';
import {Card, Toggle} from 'belle';
import Code from '../Code';

const basicToggleExample = `<!-- all the JSX code you need -->
<Toggle defaultValue/>`;

const selectExample = `<!-- all the JSX code you need for the example above -->
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
</Select>`;

export default class Why extends Component {

  render() {
    return (<div>
      <p style={{ color: '#999', marginTop: 19, fontSize: 15, 'float': 'right' }}>Nik Graf, 15th July 2015 </p>

      <h1 style={ {marginTop: 0, marginBottom: 20} }>Introducing Belle</h1>

      <Card style={{ borderTop: '1px solid #f2f2f2' }}>
        <img src="images/overview.png"
             style={{ width: '100%' }} />
      </Card>

      <p>
        Belle is a set of React components including Toggle, ComboBox, Rating, TextInput, Button, Card & Select. Many more like DatePicker, NumberInput, DropZone & Menu will come soon. As of today we hit version 1.0.0 :)
      </p>

      <h3 style={ {marginTop: 40, marginBottom: 20} }>Wait, but why yet another component library?</h3>

      <p>
        The web platform is a fantastic environment. Still it has certain limitations that are holding you back as a developer. React opened up new opportunities and I finally had tools in my hand to make the kind of UI components I always wanted to.
      </p>
      <p>Don't get me wrong. There are a ton of really great UI libraries out there like jQuery UI, Bootstrap, Polymer, you name it. They are super useful and to me often a source for inspiration. Through them I learned a lot about the details to take care of when developing user interface elements. Nevertheless always some feature was missing or the UX not as good as we imagined it. That’s why Jyoti & I started to research and explore building our own components. Quickly it became clear others might benefit from sharing our lessons learned and our endeavour shifted to creating Belle  - a set of configurable components with all these features included:
      </p>
      <ul>
        <li>Encapsulated components</li>
        <li>Mobile support built-in</li>
        <li>ARIA Support</li>
        <li>Customizable styles / themes (right now there is Belle & Bootstrap 3)</li>
        <li>Advanced localized styling for each individual component</li>
      </ul>

      <p>
        With Belle we aim to provide the best possible UX while making the components highly configurable to allow users applying their own theme. For demonstration purposes Belle comes with two themes (Belle, Bootstrap3) and we aim to add more like Elemental UI or Material Design soon.
      </p>

      <div style={{ marginTop: 20, marginBottom: 40 }}>
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

      <p>Let’s have a look at two of the components and walk you through some of the details we took care of.</p>

      <h3 style={{ marginBottom: 20}}>Toggle</h3>

      <p>The handle can be grabbed and dragged on mobile as well as on desktop devices. In addition a simple tap or click also initiates switching the state. As like with the native iOS Toggle it is possible to slightly leave the bounding area while continuing to slide. In order to prevent shaky page behaviour and delayed animations is scrolling is prevented while the Toggle is active.
      </p>

      <div style={{width: '100%'}}>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/ImtZ-EDjfc8" frameBorder="0" allowFullScreen></iframe>
      </div>

        <br />
          <br />

      <span>With custom Styles</span>
      <br />
      <img src="http://static.nikgraf.com/belle/why-belle/toggle-desktop.gif" style={{ width: 97, height: 62 }} />
      <br />

      <span>Bootstrap Styles</span><br />
      <img src="http://static.nikgraf.com/belle/why-belle/toogle-bootstrap-dektop.gif" style={{ height: 71 }} />

      <br />

      Try it yourself here:
      <br /><br />
      <Toggle defaultValue style={{ marginLeft: 12 }}/>

      <Code value={ basicToggleExample } style={ {marginTop: 20, marginBottom: 20} } />

      <p>
        Let’s look at another component.
      </p>

      <h3>Select</h3>

      <p>
        While the HTML native select-tag is a great component it’s styling capabilities are very limited. Adding images is not possible. That’s why we built a Select component allowing you to modify its appearance.
      </p>

      <img src="http://static.nikgraf.com/belle/why-belle/fancy-select.gif" style={{ height: 240 }} />

      <h4 style={{ marginTop: 0 }}>Select on Mobile</h4>

      <p>
        As promised before the Select component even works well on mobile devices. Even if scrolling is involved. You will notice that the menu will always positioned in a way that the focused Option is always visible and right above the selected one.
      </p>

      <div style={{width: '100%'}}>
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/rBbc3hRyyGw" frameBorder="0" allowFullScreen></iframe>
      </div>

      <Code value={ selectExample } style={ {marginTop: 20, marginBottom: 20} } />

      <p style={{ paddingTop: 40 }}>
        I hope Belle caught your interest. In case you want to give it a try please checkout our example projects like <a href="https://github.com/nikgraf/react-starter-with-belle">react-starter-with-belle</a> or <a href="https://github.com/nikgraf/react-server-example">react-server-example</a>. We look forward to your feedback. Feel free to reach out to us via Twitter <a href="https://twitter.com/nikgraf"> @nikgraf</a> &
        <a href="https://twitter.com/jyopur"> @jyopur</a>.
      </p>

      <div>
        <a href="https://twitter.com/share" className="twitter-share-button" data-url="http://nikgraf.github.io/belle/#/guide/introducing-belle" data-text="I just discovered Belle - configurable React components with really good UX #ReactJS #UX #UI" data-size="large">Tweet</a>

      </div>
      <div>
        <div className="fb-like" data-href="http://nikgraf.github.io/belle/#/guide/introducing-belle" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>
      </div>


    </div>);
  }
}
