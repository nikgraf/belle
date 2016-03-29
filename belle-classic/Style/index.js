/* @flow */

import React, { Component } from 'react';

const style = {
  background: '#EEEEEE',
  border: 0,
  borderTop: '1px solid #EEEEEE',
  borderBottom: '1px solid #BDBDBD',
  borderRadius: 2,
  boxSizing: 'border-box',
  color: '#616161',
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: 17,
  lineHeight: '26px',
  padding: '8px 14px 6px 14px',
  textAlign: 'center',
  textDecoration: 'none',
  verticalAlign: 'bottom',
};

/**
 * Card component with a light shadow.
 *
 * This component will apply any attribute to the div that has been provided as
 * property & is valid for a div.
 */
export default class Style extends Component {

  render() {
    return (
      <div
        style={ style }
      >
        lala
      </div>
    );
  }
}
