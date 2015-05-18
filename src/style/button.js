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
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    MsTouchAction: 'manipulation',
    touchAction: 'manipulation'
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
    boxShadow: 'inset 0 1px 0px #BDBDBD, 0 2px 0px #E0E0E0'
  },

  disabledStyle: {
    background: '#EEEEEE',
    color: '#FFFFFF',
    boxShadow: '0 1px 0px #BDBDBD',
    cursor: 'not-allowed'
  },

  disabledHoverStyle: {
    background: 'rgba(108, 210, 247, 0.65)',
    color: '#FFFFFF',
    boxShadow: '0 1px 0px rgba(57, 149, 183, 0.65)',
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
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    MsTouchAction: 'manipulation',
    touchAction: 'manipulation'
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
    boxShadow: 'inset 0 1px 0px #3995B7, 0 1px 0px #4DBEE8',
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
