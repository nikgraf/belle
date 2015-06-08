"use strict";

var ratingStyle = {

  style: {
    cursor: 'pointer',
    fontSize: 32,
    lineHeight: '32px'
  },

  defaultStyle: {
    color: '#e3e3e3',
    textShadow: '0px -1px 0px #D2D1D1'
  },

  //TODO: we might prefer a different shade of gray for disabled default stars
  disabledDefaultStyle: {
    cursor: 'not-allowed',
    color: '#e3e3e3',
    textShadow: '0px -1px 0px #D2D1D1'
  },

  highlightedStyle: {
    color: '#FFCC00',
    textShadow: '0px 1px 0px #DCB000'
  },

  disabledHighlightedStyle: {
    cursor: 'not-allowed',
    color: '#FFE375',
    textShadow: '0px 1px 0px #F3CE3C'
  },

  wrapperStyle: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    fontSize: 32,
    lineHeight: '32px',
    color: '#e3e3e3',
    textShadow: '0px -1px 0px #D2D1D1',

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
    color: '#FFDA46'
  },

  focusStyle: {
    outline: 0,
    WebkitAnimation: 'belle-rating-focus 2s',
    borderRadius: 2
  },

  activeStyle: {
    textShadow: '0px -1px 0px #D6AB00',
    color: '#F3C200',
    top: 0
  },

  disabledHoverStyle: {
    cursor: 'not-allowed',
    color: '#FFE375',
    textShadow: '0px 1px 0px #F3CE3C'
  }

};

export default ratingStyle;
