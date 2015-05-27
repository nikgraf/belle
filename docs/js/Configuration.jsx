"use strict";

import React, {Component} from 'react';
import {Button, Card} from 'belle';
import Code from './Code';

export default class Configuration extends Component {

  render() {
    return <div>
      <h2 style={ {marginTop: 0, marginBottom: 40} }>Configuration</h2>

      <p>
        Belle provides you with the ability to modify the default appearance of
        it's components and even some of the behaviour.
      </p>

      <h3>Styles</h3>

      <p>
        With this example you overwrite the hover style of default Belle button.
      </p>

      <Code value={ overwriteCardStyleExample } style={ {marginTop: 40} } />

      <Card style={{marginBottom: 20,
                    padding: 20,
                    borderRadius: 2,
                    color: '#FFF',
                    background: '#5FB1CF',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                    boxSizing: 'border-box'}}>
        This is how your all your cards might look like.
      </Card>

      <p style={ {marginTop: 40} }>
        In case you only want to change a couple parameters you easily can do it
        by leveraging ES6 Object.assign() or Underscores' extend for example.
        This is possible due all styles are simply plain JavaScript objects.
        Of course you also can overwrite the hoverStyle as well.
      </p>

      <Code value={ extendButtonStyleExample } style={ {marginTop: 40} } />

      <Button style={{color: '#FFF',
                      background: '#444',
                      border: '1px solid #444',
                      borderBottomColor: '#000'}}
              hoverStyle={{color: '#FFF',
                           background: '#666',
                           border: '1px solid #666',
                           borderBottomColor: '#555'}}>
        Follow
      </Button>

      <h4>Structure</h4>

      <p>
        The following example shows the structure of belle.style.
      </p>

      <Code value={ styleStructure } style={ {marginTop: 40} } />

      <h3>Behaviour</h3>

      <h4>Select</h4>

      <p>
        By default the optionsArea of the Select component is positioned in a way
        that the focused Option is right above the previously selected one. In
        order to switch off this behaviour for all Select components in your
        application change the `shouldPositionOptions` option in config.
      </p>
      <p>
        In order you as developer want to implement your own functionality you
        you can provide your own positioning function for all Select components.
        Keep in mind to set make the optionsArea visible e.g. `display: block`.
      </p>

      <h4>Structure</h4>

      <p>
        The following example shows the structure of belle.config.
      </p>

      <Code value={ configStructure } style={ {marginTop: 40} } />

    </div>;
  }
}

const overwriteCardStyleExample = `var belle = require('belle');

belle.style.card.style = {
  marginBottom: 20,
  padding: 20,
  borderRadius: 2,
  color: '#FFF',
  background: '#5FB1CF',
  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
  boxSizing: 'border-box'
};
`;

const extendButtonStyleExample = `var _ = require('underscore');
var belle = require('belle');

belle.style.button.style = _.extend(belle.style.button.style, {
  color: '#FFF',
  background: '#444',
  border: '1px solid #444',
  borderBottomColor: '#000'
});

// extending hoverStyle works as well
belle.style.button.hoverStyle = _.extend(belle.style.button.hoverStyle, {
  color: '#FFF',
  background: '#666',
  border: '1px solid #666',
  borderBottomColor: '#555'
});
`;

const styleStructure = `style = {
  button: {
    style: { … },
    hoverStyle: { … },
    focusStyle: { … },
    activeStyle: { … },
    disabledStyle: { … },
    disabledHoveredStyle: { … },
    primaryStyle: { … },
    primaryHoverStyle: { … },
    primaryFocusStyle: { … },
    primaryActiveStyle: { … },
    pirmaryDisabledStyle: { … },
    pirmaryDisabledHoveredStyle: { … }
  },
  card: {
    style: { … }
  },
  select: {
    style: { … },
    focusStyle: { … },
    hoverStyle: { … },
    disabledStyle: { … },
    disabledHoveredStyle: { … },
    wrapperStyle: { … },
    optionsAreaStyle: { … },
    nativeSelectStyle: { … },
    caretToOpenStyle: { … },
    caretToCloseStyle: { … }
  },
  option: {
    style: { … },
    hoverStyle: { … },
    selectStyle: { … }
  },
  placeholder: {
    style: { … }
  },
  separator: {
    style: { … }
  },
  textInput: {
    style: { … },
    hoverStyle: { … },
    focusStyle: { … },
    disabledStyle: { … },
    disabledHoveredStyle: { … }
  }
}
`;

const configStructure = `config = {
  select: {
    shouldPositionOptions: true/false,
    repositionOptionsArea: function () {}
  }
}
`;
