import React from 'react';
import {Card, DatePicker} from 'belle';

export default React.createClass({

  render() {
    return (
      <div>

        <h2>ComboBox</h2>

        <Card>
          <h3>Default Value Example</h3>
          <div style={ { 'marginBottom': '20px' } }>
            <DatePicker/>
          </div>
        </Card>

      </div>
    );
  }
});
