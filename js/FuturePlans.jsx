"use strict";

import React, {Component} from 'react';
import {Card} from 'belle';

export default class FuturePlans extends Component {

  render() {
    return <Card>
      <h2 style={ {marginTop: 0, marginBottom: 40} }>Future Plans</h2>

      <ul>
        <li>Introduce some kind of styling configuration</li>
        <li>Add disabled style to TextInput & Button</li>
        <li>Make sure components don't break when rendered by the backend</li>
        <li>Make sure the components work great on Mobile</li>
        <li>Components to add: rating, autocomplete, dateformatter, datepicker, toggle, checkbox, tooltip, popover, menu/dropdown, NumberInput, EmailInput , anchor?, code?</li>
      </ul>
    </Card>;
  }
}
