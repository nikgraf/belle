"use strict";

import React, {Component} from 'react';
import {Card, Button} from 'belle';
import Code from './Code';

export default class Configuration extends Component {

  render() {
    return <Card>
      <h2 style={ {marginTop: 0, marginBottom: 40} }>Configuration</h2>

      <p>
        Belle provides you with the ability to modify the default appearance of
        it's components.
      </p>

      <h3>How To</h3>

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

      <h3>Structure</h3>

      <p>
        The following example shows the structure of belle.style.
      </p>

      <Code value={ styleStructure } style={ {marginTop: 40} } />

    </Card>;
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
    primaryStyle: { … },
    primaryHoverStyle: { … },
    primaryFocusStyle: { … },
    primaryActiveStyle: { … }
  },
  card: {
    style: { … }
  },
  select: {
    style: { … },
    focusStyle: { … },
    hoverStyle: { … },
    wrapperStyle: { … },
    optionsAreaStyle: { … },
    nativeSelectStyle: { … },
    caretDownStyle: { … },
    caretUpStyle: { … }
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
    focusStyle: { … }
  }
}
`;
