"use strict";

var optionStyle = {

  style: {
    boxSizing: 'border-box',
    color: '#666',
    cursor: 'pointer',
    padding: 10,

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
    boxSizing: 'border-box',
    background: '#F5F5F5',
    color: '#444',
    cursor: 'pointer',
    padding: 10,
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    MsTouchAction: 'manipulation',
    touchAction: 'manipulation'
  },

  selectStyle: {
    boxSizing: 'border-box',
    color: '#666',
    padding: 0,
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    MsTouchAction: 'manipulation',
    touchAction: 'manipulation'
  }

};

export default optionStyle;
