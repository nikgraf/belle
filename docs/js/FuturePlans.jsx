"use strict";

import React, {Component} from 'react';

export default class FuturePlans extends Component {

  render() {
    return <div>
      <h2 style={ {marginTop: 0, marginBottom: 40} }>Future Plans</h2>

      <ul>
        <li>Make sure components don't break when rendered by the backend</li>
        <li>Make sure the components work great on Mobile</li>
        <li>Components to add: dateformatter, datepicker, toggle, checkbox, tooltip, popover, menu/dropdown, NumberInput, EmailInput , anchor?, code?</li>
      </ul>
    </div>;
  }
}
