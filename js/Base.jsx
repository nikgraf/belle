import React from 'react';
import belle, {Card, Option, Select} from 'belle';
import bootstrap3Theme from './theme/bootstrap-3';
import belleWithClassicFocusTheme from './theme/belle-with-classic-focus';
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
    if (info.value === 'bootstrap') {
      updateStructure(belle.style, bootstrap3Theme.style);
      updateStructure(belle.config, bootstrap3Theme.config);
    } else if (info.value === 'belle-with-classic-focus') {
      updateStructure(belle.style, this.belleStyle);
      updateStructure(belle.style, belleWithClassicFocusTheme.style);
      updateStructure(belle.config, belleWithClassicFocusTheme.config);
    } else {
      updateStructure(belle.style, this.belleStyle);
      updateStructure(belle.config, this.belleConfig);
    }

    this.forceUpdate();
  },

  render() {
    const cardContentStyle = (this.state.viewport.width <= 480) ? { padding: 20 } : {};

    let header;
    if (this.context.router.getCurrentPath() === '/') {
      header = (<header style={ {background: '#0A202D', width: '100%', marginBottom: 40} }>
        <Column smallScreenStyle={{ width: '100%', padding: '0 20px' }}
                mediumScreenStyle={{margin: '0 auto', width: 910, paddingLeft: 160, paddingRight: 110 }}>

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
                mediumScreenStyle={{margin: '0 auto', width: 910, paddingRight: 110 }}>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=nikgraf&repo=belle&type=star&count=true&size=medium"
            frameBorder="0"
            scrolling="0"
            width="78px"
            height="30px"
            style={{ 'float': 'right', marginTop: 20 }}>
          </iframe>

          <div style={{ display: 'inline-block',
                        width: 250,
                        'float': 'right',
                        marginTop: 15,
                        marginRight: 15 }}>
            <Select onUpdate={ this._onChangeTheme }
                    shouldPositionOptions={ false }
                    style={{
                      border: '1px solid #CCC',
                      borderRadius: 2,
                      color: '#333',
                      backgroundColor: '#fff',
                      padding: '3px 0px 3px 10px',

                      borderBottom: '1px solid #CCC',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                      position: 'relative',
                      /* overwrite bootstrap */
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 'normal',
                      lineHeight: 1.42857143,
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                      verticalAlign: 'middle',
                      msTouchAction: 'manipulation',
                      touchAction: 'manipulation',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      userSelect: 'none',
                      backgroundImage: 'none'
                    }}
                    focusStyle={{
                      border: '1px solid #6EB8D4',
                      /* overwrite bootstrap */
                      outline: 0,
                      outlineOffset: 0,
                      color: '#333',
                      backgroundColor: '#fff',
                      borderColor: '#6EB8D4'
                    }}
                    hoverStyle={{
                      border: '1px solid #92D6EF',
                      /* overwrite bootstrap */
                      color: '#333',
                      backgroundColor: '#fff',
                      borderColor: '#92D6EF'
                    }}
                    menuStyle={{
                      top: 32,
                      display: 'block',
                      listStyleType: 'none',
                      background: '#FFF',
                      padding: '6px 0',
                      margin: 0,
                      position: 'absolute',
                      width: '100%',
                      zIndex: 10000,
                      boxSizing: 'border-box',
                      borderRadius: 2,
                      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                      WebkitBoxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                      borderTop: '1px solid #f2f2f2',
                      border: '1px solid #f2f2f2',
                      left: 0,
                      'float': 'none',
                      minWidth: 0,
                      fontSize: 14,
                      textAlign: 'left',
                      listStyle: 'none',
                      backgroundColor: '#fff',
                      WebkitBackgroundClip: 'padding-box',
                      backgroundClip: 'padding-box'
                    }}
                    caretToOpenStyle={{
                      height: 0,
                      width: 0,
                      position: 'absolute',
                      top: 11,
                      right: 8,
                      borderTop: '6px solid #666',
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent'
                    }}
                    caretToCloseStyle={{
                      height: 0,
                      width: 0,
                      position: 'absolute',
                      top: 11,
                      right: 8,
                      borderTop: '0px solid transparent',
                      borderBottom: '6px solid #666',
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent'
                    }}>
              <Option value={ "belle" } style={{ padding: 10 }}>Belle</Option>
              <Option value={ "bootstrap" } style={{ padding: 10 }}>Bootstrap</Option>
              <Option value={ "belle-with-classic-focus" } style={{ padding: 10 }}>Belle with classic focus behaviour</Option>
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
              mediumScreenStyle={{margin: '0 auto', width: 910, paddingRight: 110 }}>

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
          <span style={ { color: '#738088' } } >Guides</span>
          <ul style={ { listStyleType: 'none', paddingLeft: 0 } }>
            <li>
              <Link style={{ display: 'block', padding: '3px 0' }} to="guide/formComponents">Form Components</Link>
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
                mediumScreenStyle={{ 'float': 'left', width: 640 }}>
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
