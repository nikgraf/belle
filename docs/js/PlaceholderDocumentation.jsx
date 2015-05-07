"use strict";

import React, {Component} from 'react';
import {Card, Option, Placeholder, Select} from 'belle';
import {map} from 'underscore';
import Code from './Code';

export default class PlaceholderDocumentation extends Component {

  render() {
    return <Card>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Placeholder</h2>

      <Select>
        <Placeholder>Choose a City</Placeholder>
        <Option value="tokyo">Tokyo</Option>
        <Option value="vienna">Vienna</Option>
      </Select>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <p>
        Any property valid for a HTML div like
        <span style={ {color: 'grey'} }> style, id, className, …</span>
      </p>

    </Card>;
  }
}

const basicCodeExample = `<!-- basic select example with a placeholder -->
<Select>
  <Placeholder>Choose a City</Placeholder>
  <Option value="tokyo">Tokyo</Option>
  <Option value="vienna">Vienna</Option>
</Select>`;
