import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Radio, Card } from 'belle';

export default React.createClass({

  mixins: [LinkedStateMixin],

  render() {
    return (
      <Card>
        <h2>Radio</h2>

        <h3>Default radio buttons</h3>
        <div><Radio name="city" 
            defaultChecked={true} 
            onChange={(e) => console.log(e.target.value)}
            value="Boston"
        >Boston</Radio></div>
        <div><Radio name="colors"
            onChange={(e) => console.log(e.target.value)}
            value="Red"
        >Red</Radio></div>
      </Card>
    );
  },
});
