"use strict";

var ratingStyle = {

  style: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    fontSize: 32,
    lineHeight: '32px',
    color: '#e3e3e3',
    textShadow: '0px 1px 0px #D2D1D1',

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

  focusStyle: {
    outline: 0,
    WebkitAnimation: 'belle-rating-focus 2s',
    borderRadius: 2
  },

  characterStyle: {
    color: '#FFCC00',
    textShadow: '0px 1px 0px #DCB000'
  },

  disabledCharacterStyle: {
    cursor: 'not-allowed',
    color: '#FFE375',
    textShadow: '0px 1px 0px #F3CE3C'
  },

  disabledDefaultCharacterStyle: {
    cursor: 'not-allowed'
  },

  hoverCharacterStyle: {
    color: '#FFDA46'
  },

  activeCharacterStyle: {
    textShadow: '0px -1px 0px #D6AB00',
    color: '#F3C200'
  },

  //todo: we might show some different styling here or else we can get rid or this and refactor line #414 in Rating.jsx
  disabledHoverCharacterStyle: {
  }

};

export default ratingStyle;
