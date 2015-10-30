import React from 'react';
import {Card, DatePicker, Button} from 'belle';

export default React.createClass({

  _resetValue() {
    this.refs.calendar1.resetValue();
  },

  _renderDay(day) {
    const date = day.getDate();
    return (
      <div>
        🎁{ date }
      </div>
    );
  },

  render() {
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + 5);

    const minDate = new Date();
    minDate.setDate(10);

    const maxDate = new Date();
    maxDate.setDate(20);

    return (
      <div>

        <h2>ComboBox</h2>

        <Card>
          <h3>Default Calendar Example</h3>
          <div style={{ marginBottom: '20px' }}>
            <DatePicker ref="calendar1" defaultValue={ selectedDate }/>
          </div>
          <Button onClick={ this._resetValue }>Reset Date</Button>

          <h3>DatePicker with min & max</h3>
            <div style={{ marginBottom: '20px' }}>
            <DatePicker defaultValue={ selectedDate }
                        min={ minDate }
                        max={ maxDate } />
          </div>

          <h3>Disabled Calendar Example</h3>
            <div style={{ marginBottom: '20px' }}>
            <DatePicker showOtherMonthDate={ false } defaultValue={ selectedDate } disabled/>
          </div>
          <h3>Read-Only Calendar Example</h3>
          <div style={{ marginBottom: '20px' }}>
            <DatePicker styleWeekend
                        defaultValue={ selectedDate }
                        readOnly
                        renderDay={ this._renderDay }/>
          </div>
          <h3>Calendar in dutch french !!!</h3>
          <div style={{ marginBottom: '20px' }}>
            <DatePicker defaultValue={ selectedDate } locale="fr"/>
          </div>
          <h3>Calendar in dutch arabic !!!</h3>
          <div style={{ marginBottom: '20px' }}>
            <DatePicker defaultValue={ selectedDate } locale="ar"/>
          </div>
          <h3>Calendar in dutch hebrew !!!</h3>
          <div style={{ marginBottom: '20px' }}>
            <DatePicker styleWeekend
                        defaultValue={ selectedDate }
                        locale="he"/>
          </div>
        </Card>

      </div>
    );
  },
});
