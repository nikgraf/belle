import React, {Component} from 'react';

export default class FuturePlans extends Component {

  render() {
    return (<div>
      <h2 style={ {marginTop: 0, marginBottom: 40} }>Future Plans</h2>

      <ul>
        <li>Make sure components don't break when rendered by the backend</li>
        <li>Components to add: Dateformatter, Datepicker, Tooltip, Popover, Modal, Navigation Menu, NumberInput, EmailInput, Anchor, DropZone</li>
      </ul>
    </div>);
  }
}
