const buttonStyle = {

  style: {
    background: '#EEEEEE',
    border: 0,
    borderTop: '1px solid #EEEEEE',
    borderBottom: '1px solid #BDBDBD',
    borderRadius: 2,
    boxSizing: 'border-box',
    color: '#616161',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: 16,
    lineHeight: '26px',
    padding: '8px 14px 6px 14px',
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
    borderTop: '1px solid #F5F5F5',
    borderBottom: '1px solid #BDBDBD',
    color: '#757575'
  },

  focusStyle: {
    WebkitAnimation: 'belle-button-focus 2s',
    outline: 0 // avoid default focus behaviour
  },

  activeStyle: {
    background: '#E0E0E0',
    color: '#424242',
    borderBottom: '1px solid #E0E0E0',
    borderTop: '1px solid #BDBDBD'
  },

  disabledStyle: {
    background: '#EEEEEE',
    color: '#C5C4C4',
    borderBottom: '1px solid #BDBDBD',
    borderTop: '1px solid #EEEEEE',
    cursor: 'not-allowed'
  },

  disabledHoverStyle: {
    background: '#F5F5F5',
    color: '#D0D0D0',
    borderBottom: '1px solid #BDBDBD',
    borderTop: '1px solid #F5F5F5',
    cursor: 'not-allowed'
  },

  primaryStyle: {
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
    fontSize: 16,
    lineHeight: '26px',
    padding: '8px 14px 6px 14px',
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
    borderTop: '1px solid #82D9F9',
    borderBottom: '1px solid #3995B7',
    color: '#FFF'
  },

  primaryFocusStyle: {
    WebkitAnimation: 'belle-button-focus 2s',
    outline: 0 // avoid default focus behaviour
  },

  primaryActiveStyle: {
    background: '#4DBEE8',
    borderBottom: '1px solid #4DBEE8',
    borderTop: '1px solid #3995B7',
    color: '#F5F5F5'
  },

  primaryDisabledStyle: {
    background: '#98DEF8',
    color: '#FAFAFA',
    borderTop: '1px solid #98DEF8',
    borderBottom: '1px solid #74B4CC',
    cursor: 'not-allowed'
  },

  primaryDisabledHoverStyle: {
    background: '#A7E4FB',
    color: '#FFF',
    borderTop: '1px solid #A7E4FB',
    borderBottom: '1px solid #74B4CC',
    cursor: 'not-allowed'
  }
};

export default buttonStyle;
