import React from 'react';
import belle, {Card, Option, Select} from 'belle';
import bootstrap3Theme from './theme/bootstrap3';
import {RouteHandler, Link} from 'react-router';
import Column from './Column';
import ViewportMixin from './mixin/viewport';

/**
 * Updates the deepest structure while keeping the original reference of the outer objects.
 */
function updateStructure(targetObject, object) {
  for (const componentName in object) {
    if (object.hasOwnProperty(componentName)) {
      for (const styleName in object[componentName]) {
        if (object[componentName].hasOwnProperty(styleName)) {
          targetObject[componentName][styleName] = object[componentName][styleName];
        }
      }
    }
  }
}

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [ViewportMixin],

  componentWillMount() {
    this.belleConfig = JSON.parse(JSON.stringify(belle.config));
    this.belleStyle = JSON.parse(JSON.stringify(belle.style));
  },

  _onChangeTheme(info) {
    if (info.value === 'belle') {
      updateStructure(belle.style, this.belleStyle);
      updateStructure(belle.config, this.belleConfig);
    } else {
      updateStructure(belle.style, bootstrap3Theme.style);
      updateStructure(belle.config, bootstrap3Theme.config);
    }

    this.forceUpdate();
  },

  render() {
    const cardContentStyle = (this.state.viewport.width <= 480) ? { padding: 20 } : {};

    let header;
    if (this.context.router.getCurrentPath() === '/') {
      header = (<header style={ {background: '#0A202D', width: '100%', marginBottom: 40} }>
        <Column smallScreenStyle={{ width: '100%', padding: '0 20px' }}
                mediumScreenStyle={{margin: '0 auto', width: 820, paddingLeft: 160 }}>

          <Link style={{ display: 'inline' }} to="app">
            <h1 style={{ fontSize: 52, margin: 0, paddingTop: 110, color: '#FFF', fontFamily: '"Trebuchet MS", Helvetica, sans-serif' }}>
              <svg version="1.1"
                   viewBox="0 0 80 80"
                   style={{ width: 50,
                            height: 50,
                            position: 'relative',
                            top: 3,
                            marginRight: 12 }}>
                <circle cx="40" cy="40" r="40" fill="#53C7F2" data-reactid=".0.0.0.2.0"></circle>
                <circle cx="44" cy="44" r="30" fill="white" data-reactid=".0.0.0.2.1"></circle>
              </svg>
              Belle
            </h1>
          </Link>

          <p style={{ fontSize: 22, marginTop: 0, paddingBottom: 26, color: '#FEFEFE'}}>
            Configurable React Components with great UX
          </p>

          <iframe
            src="https://ghbtns.com/github-btn.html?user=nikgraf&repo=belle&type=star&count=true&size=large"
            frameBorder="0"
            scrolling="0"
            width="120px"
            height="30px"
            style={ { marginBottom: 20 } }>
          </iframe>
        </Column>
      </header>);
    } else {
      header = (<header style={ {background: '#0A202D', width: '100%', marginBottom: 40} }>
        <Column smallScreenStyle={{ width: '100%', padding: '0 20px' }}
                mediumScreenStyle={{margin: '0 auto', width: 820}}>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=nikgraf&repo=belle&type=star&count=true&size=medium"
            frameBorder="0"
            scrolling="0"
            width="78px"
            height="30px"
            style={{ 'float': 'right', marginTop: 20 }}>
          </iframe>

          <div style={{ display: 'inline-block' }}>
            <Select onUpdate={ this._onChangeTheme }
                    shouldPositionOptions={ false }>
              <Option value={ "belle" }>Belle</Option>
              <Option value={ "bootstrap" }>Bootstrap</Option>
            </Select>
          </div>

          <Link style={{ display: 'inline' }} to="app">
            <h1 style={{ fontSize: 24, margin: 0, padding: '10px 0', color: '#FFF', fontFamily: '"Trebuchet MS", Helvetica, sans-serif' }}>
              <svg version="1.1"
                   viewBox="0 0 80 80"
                   style={{ width: 22,
                            height: 22,
                            position: 'relative',
                            top: 2,
                            marginRight: 6 }}>
                <circle cx="40" cy="40" r="40" fill="#53C7F2" data-reactid=".0.0.0.2.0"></circle>
                <circle cx="44" cy="44" r="30" fill="white" data-reactid=".0.0.0.2.1"></circle>
              </svg>
              Belle
            </h1>
          </Link>
        </Column>
      </header>);
    }

    return (<div style={{ background: '#F7F7F7' }}>

      { header }

      <Column smallScreenStyle={{ width: '100%' }}
              mediumScreenStyle={{margin: '0 auto', width: 820 }}>

        <Column smallScreenStyle={{ width: '100%', padding: '0 40px' }}
                mediumScreenStyle={{ 'float': 'left', width: 160 }}
                className="navigation">
          <ul style={ { listStyleType: 'none', paddingLeft: 0, marginTop: 0 } }>
            <li>
              <Link style={{ display: 'block', padding: '3px 0' }} to="getting-started">Getting Started</Link>
            </li>
          </ul>
          <span style={ { color: '#738088' } } >Components</span>
          <ul style={ { listStyleType: 'none', paddingLeft: 0 } }>
            <li>
              <Link style={{ display: 'block', padding: '3px 0' }} to="component/button">Button</Link>
            </li>
            <li>
              <Link style={{ display: 'block', padding: '3px 0' }} to="component/card">Card</Link>
            </li>
            <li>
              <Link style={{ display: 'block', padding: '3px 0' }} to="component/combo-box">ComboBox</Link>
            </li>
            <li>
              <Link style={{ display: 'block', padding: '3px 0' }} to="component/select">Select</Link>
            </li>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block', padding: '1px 0' }} to="component/option">Option</Link>
            </li>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block', padding: '1px 0' }} to="component/placeholder">Placeholder</Link>
            </li>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block', padding: '1px 0' }} to="component/separator">Separator</Link>
            </li>
            <li>
              <Link style={{ display: 'block', padding: '4px 0' }} to="component/rating">Rating</Link>
            </li>
            <li>
              <Link style={{ display: 'block', padding: '4px 0' }} to="component/text-input">TextInput</Link>
            </li>
            <li>
              <Link style={{ display: 'block', padding: '4px 0' }} to="component/toggle">Toggle</Link>
            </li>
            <li style={{ paddingLeft: 10 }}>
              <Link style={{ display: 'block', padding: '1px 0' }} to="component/choice">Choice</Link>
            </li>
          </ul>
          <span style={ { color: '#738088' } } >General</span>
          <ul style={ { listStyleType: 'none', paddingLeft: 0 } }>
            <li>
              <Link style={{ display: 'block', padding: '3px 0' }} to="philosophy">Philosophy</Link>
            </li>
            <li>
              <Link style={{ display: 'block', padding: '3px 0' }} to="configuration">Configuration</Link>
            </li>
            <li>
              <Link style={{ display: 'block', padding: '3px 0' }} to="future-work">Future Plans</Link>
            </li>
            <li>
              <a style={{ display: 'block', padding: '3px 0' }} href="https://github.com/nikgraf/belle" target="_blank">Code on Github</a>
            </li>
            <li>
              <a style={{ display: 'block', padding: '3px 0' }} href="https://github.com/nikgraf/belle/issues" target="_blank">Report an Issue</a>
            </li>
          </ul>
        </Column>

        <Column smallScreenStyle={{ width: '96%', margin: '0 auto' }}
                mediumScreenStyle={{ 'float': 'left', width: 660 }}>
          <Card style={ cardContentStyle }>
            <RouteHandler/>
          </Card>
        </Column>
        <div style={{ clear: 'left' }}></div>
      </Column>
      <footer style={{ clear: 'both', textAlign: 'center', paddingTop: 40, paddingBottom: 60 }}>
        <Column smallScreenStyle={{}}
                mediumScreenStyle={{ paddingLeft: 160 }}>
          Built with
          <span style={{ color: 'rgb(200, 0, 0)', fontSize: 22, position: 'relative', top: 3 }}>
            &nbsp;&#x2764;&nbsp;
          </span>
          on Planet Earth :)
        </Column>
      </footer>
    </div>);
  }
});
