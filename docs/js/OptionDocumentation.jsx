"use strict";

import React, {Component} from 'react';
import {Card, Option, Select} from 'belle';
import {map} from 'underscore';
import Code from './Code';

export default class OptionDocumentation extends Component {

  render() {
    return <Card>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Option</h2>

      <Select>
        <Option value="berlin">Berlin</Option>
        <Option value="tokyo">Tokyo</Option>
        <Option value="vienna">Vienna</Option>
      </Select>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <p>
        Documentation coming soon …
      </p>

    </Card>;
  }
}

const basicCodeExample = `<!-- basic select example with multiple options -->
<Select>
  <Option value="berlin">Berlin</Option>
  <Option value="tokyo">Tokyo</Option>
  <Option value="vienna">Vienna</Option>
</Select>`;
