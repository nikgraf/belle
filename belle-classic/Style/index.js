/* @flow */

import React, { Component } from 'react';

const style = {
  background: '#53C7F2',
  border: 0,

  // boxShadow: '0 1px 0px #3995B7',
  borderTop: '1px solid #53C7F2',
  borderBottom: '1px solid #3995B7',

  borderRadius: 2,
  boxSizing: 'border-box',
  color: '#FAFAFA',
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: 17,
  lineHeight: '26px',
  padding: '8px 14px 6px 14px',
  textAlign: 'center',
  textDecoration: 'none',
  verticalAlign: 'bottom',

  /* animations */
  transition: 'border-top 0.1s, border-bottom 0.1s, color 0.1s',
  transitionTimingFunction: 'ease-out',

  /*
  To avoid any kind of flickering the user won't get feedback
  for selecting the button text
  */
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  MsUserSelect: 'none',
  userSelect: 'none',

  /* This button can only be pressed */
  MsTouchAction: 'manipulation',
  touchAction: 'manipulation',

  /*
  Prevent flickering while tapping on WebKit
  http://stackoverflow.com/a/3516243/837709
  */
  WebkitTapHighlightColor: 'transparent',
};

/**
 * Card component with a light shadow.
 *
 * This component will apply any attribute to the div that has been provided as
 * property & is valid for a div.
 */
export default class Style extends Component {

  render(): ReactElement {
    return (
      <div
        style={ style }
      >
        lala
      </div>
    );
  }
}
