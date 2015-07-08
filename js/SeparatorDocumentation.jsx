import React, {Component} from 'react';
import {Option, Select, Separator} from 'belle';
import Code from './Code';

const basicCodeExample = `<!-- basic select example with separators -->
<Select>
  <Separator>Amerika</Separator>
  <Option value="san-francisco">San Francisco</Option>
  <Option value="vancouver">Vancouver</Option>
  <Separator>Asia</Separator>
  <Option value="hong-kong">Hong Kong</Option>
  <Option value="tokyo">Tokyo</Option>
  <Separator>Europe</Separator>
  <Option value="berlin">Berlin</Option>
  <Option value="istanbul">Istanbul</Option>
  <Option value="rome">Rome</Option>
  <Option value="vienna">Vienna</Option>
</Select>`;

export default class SeparatorDocumentation extends Component {

  render() {
    return (<div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>Separator</h2>

      <Select>
        <Separator>Amerika</Separator>
        <Option value="san-francisco">San Francisco</Option>
        <Option value="vancouver">Vancouver</Option>
        <Separator>Asia</Separator>
        <Option value="hong-kong">Hong Kong</Option>
        <Option value="tokyo">Tokyo</Option>
        <Separator>Europe</Separator>
        <Option value="berlin">Berlin</Option>
        <Option value="istanbul">Istanbul</Option>
        <Option value="rome">Rome</Option>
        <Option value="vienna">Vienna</Option>
      </Select>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <p>
        Any property valid for a HTML div like
        <span style={ {color: 'grey'} }> style, id, className, …</span>
      </p>

    </div>);
  }
}
