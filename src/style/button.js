"use strict";

var buttonStyle = {

  style: {
    background: '#EEEEEE',
    border: 0,
    boxShadow: '0 1px 0px #BDBDBD',
    borderRadius: 2,
    boxSizing: 'border-box',
    color: '#616161',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: 16,
    lineHeight: '26px',
    padding: '8px 12px 6px 12px',
    textAlign: 'center',
    textDecoration: 'none',
    verticalAlign: 'bottom',

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
    WebkitTapHighlightColor: 'transparent'
  },

  hoverStyle: {
    background: '#F5F5F5',
    boxShadow: '0 1px 0px #BDBDBD',
    color: '#757575'
  },

  focusStyle: {
    background: '#F5F5F5',
    boxShadow: '0 1px 0px #E0E0E0',
    color: '#757575',
    outline: 0 // avoid default focus behaviour
  },

  activeStyle: {
    background: '#E0E0E0',
    color: '#424242',
    boxShadow: 'inset 0 1px 1px #BDBDBD, 0 2px 0px #E0E0E0'
  },

  disabledStyle: {
    background: '#EEEEEE',
    color: '#C5C4C4',
    boxShadow: '0 1px 0px #BDBDBD',
    cursor: 'not-allowed'
  },

  disabledHoverStyle: {
    background: '#F5F5F5',
    color: '#D0D0D0',
    boxShadow: '0 1px 0px #BDBDBD',
    cursor: 'not-allowed'
  },

  primaryStyle: {
    background: '#53C7F2',
    border: 0,
    boxShadow: '0 1px 0px #3995B7',
    borderRadius: 2,
    boxSizing: 'border-box',
    color:'#FAFAFA',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: 16,
    lineHeight: '26px',
    padding: '8px 12px 6px 12px',
    textAlign: 'center',
    textDecoration: 'none',
    verticalAlign: 'bottom',

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
    WebkitTapHighlightColor: 'transparent'
  },

  primaryHoverStyle: {
    background: '#82D9F9',
    boxShadow: '0 1px 0px #3995B7',
    color: '#FFF'
  },

  primaryFocusStyle: {
    background: '#82D9F9',
    boxShadow: '0 1px 0px #3995B7',
    color: '#FFF',
    outline: 0 // avoid default focus behaviour
  },

  primaryActiveStyle: {
    background: '#4DBEE8',
    boxShadow: 'inset 0 1px 1px #3995B7, 0 1px 0px #4DBEE8',
    color: '#F5F5F5'
  },

  primaryDisabledStyle: {
    background: '#98DEF8',
    color: '#FAFAFA',
    boxShadow: '0 1px 0px #74B4CC',
    cursor: 'not-allowed'
  },

  primaryDisabledHoverStyle: {
    background: '#A7E4FB',
    color: '#FFF',
    boxShadow: '0 1px 0px #74B4CC',
    cursor: 'not-allowed'
  }
};

export default buttonStyle;
