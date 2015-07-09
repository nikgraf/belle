const optionStyle = {

  style: {
    boxSizing: 'border-box',
    color: '#666',
    cursor: 'pointer',
    padding: 10,
    /*
    To avoid any kind of flickering the user won't get feedback
    for selecting the option text
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
    color: '#444'
  },

  selectStyle: {
    color: '#666',
    padding: 0
  },

  disabledSelectStyle: {
    color: '#9F9F9F',
    padding: 0
  }

};

export default optionStyle;
