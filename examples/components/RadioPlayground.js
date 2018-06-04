import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Radio, Card, RadioGroup } from 'belle';

export default React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {
      value: null
    };
  },

  render() {
    return (
      <Card>
        <h2>Radio</h2>
        <h3>Default radio buttons</h3>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          <Radio value="Boston">Boston</Radio>
          <Radio value="Rome">Rome</Radio>
        </RadioGroup>
      </Card>
    );
  }
});
