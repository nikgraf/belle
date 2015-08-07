import React from 'react';
import {Card, DatePicker} from 'belle';

export default React.createClass({

  render() {
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + 5);

    return (
      <div>

        <h2>ComboBox</h2>

        <Card>
          <div tabIndex={false}>testing</div>
          <h3>Default Calendar Example</h3>
          <div style={ { 'marginBottom': '20px' } }>
            <DatePicker defaultValue={ selectedDate }/>
          </div>
          <h3>Disabled Calendar Example</h3>
          <div style={ { 'marginBottom': '20px' } }>
            <DatePicker defaultValue={ selectedDate } disabled={true}/>
          </div>
        </Card>

      </div>
    );
  }
});
