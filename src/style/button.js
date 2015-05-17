"use strict";

var buttonStyle = {

  style: {
    background: '#EFEFEF',
    border: 0,
    boxShadow: '0 1px 0px #D0D0D0',
    borderRadius: 2,
    boxSizing: 'border-box',
    color: '#555',
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
    boxShadow: '0 1px 0px #D0D0D0',
    color: '#666'
  },

  focusStyle: {
    background: '#F5F5F5',
    boxShadow: '0 1px 0px #D0D0D0',
    color: '#666',
    outline: 0 // avoid default focus behaviour
  },

  activeStyle: {
    background: '#E8E8E8',
    color: '#5C5C5C',
    boxShadow: 'inset 0 1px 0px #CFCFCF, 0 1px 0px #E8E8E8'
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
    background: '#5FCDF5',
    boxShadow: '0 1px 0px #4FB4DA',
    color: '#FFF'
  },

  primaryFocusStyle: {
    background: '#5FCDF5',
    boxShadow: '0 1px 0px #4FB4DA',
    color: '#FFF',
    outline: 0 // avoid default focus behaviour
  },

  primaryActiveStyle: {
    background: '#4DBEE8',
    boxShadow: 'inset 0 1px 0px #3995B7, 0 1px 0px #4DBEE8',
    color: '#F5F5F5'
  }
};

export default buttonStyle;
