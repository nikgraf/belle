import React from 'react';
import {Card, DatePicker, Button} from 'belle';

export default React.createClass({

  render() {
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + 5);

    return (
      <div>

        <h2>ComboBox</h2>

        <Card>
          <h3>Default Calendar Example</h3>
          <div style={ { 'marginBottom': '20px' } }>
            <DatePicker ref="calendar1" defaultValue={ selectedDate }/>
          </div>
          <Button onClick={ this._resetValue }>Reset Date</Button>
          <h3>Disabled Calendar Example</h3>
          <div style={ { 'marginBottom': '20px' } }>
            <DatePicker showOtherMonthDate={ false } defaultValue={ selectedDate } disabled/>
          </div>
          <h3>Read-Only Calendar Example</h3>
          <div style={ { 'marginBottom': '20px' } }>
            <DatePicker styleWeekend={ false } defaultValue={ selectedDate } readOnly/>
          </div>
          <h3>Calendar in dutch locale !!!</h3>
          <div style={ { 'marginBottom': '20px' } }>
            <DatePicker defaultValue={ selectedDate } locale="ar"/>
          </div>
        </Card>

      </div>
    );
  },

  _resetValue() {
    this.refs.calendar1.resetValue();
  }
});
