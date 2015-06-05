"use strict";

var ratingStyle = {

  style: {
    fontSize: 32,
    color: '#FFCC00',
    position: 'absolute',
    top: -1,
    left: 0,
    overflow: 'hidden',
    textShadow: '0px 1px 0px #DCB000'
  },

  wrapperStyle: {
    position: 'relative',
    display: 'inline-block'
  },

  backgroundStyle: {
    fontSize: 32,
    color: '#e3e3e3',
    textShadow: '0px -1px 0px #D2D1D1'
  },

  activeBackgroundStyle: {
    textShadow: 'none'
  },

  disabledStyle: {
    cursor: 'not-allowed',
    opacity: 0.6
  },

  hoverStyle: {
    color: '#FFDA46',
    cursor: 'pointer'
  },

  focusStyle: {
    outline: 0,
    boxShadow: '0 1px 0 0 #ffb400'
  },

  activeStyle: {
    textShadow: '0px -1px 0px #D6AB00',
    color: '#F3C200',
    top: 0
  }

};

export default ratingStyle;
