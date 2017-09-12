'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ratingStyle = {
  style: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    fontSize: '2.6rem',
    lineHeight: '2.6rem',
    color: '#e3e3e3',
    textShadow: '0px 1px 0px #D2D1D1',

    /*
     To avoid any kind of flickering the user won't get feedback
     for selecting the rating stars
     */
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',

    /* This button can only be pressed */
    MsTouchAction: 'none',
    touchAction: 'none',

    /*
     Prevent flickering while tapping on WebKit
     http://stackoverflow.com/a/3516243/837709
     */
    WebkitTapHighlightColor: 'transparent'
  },

  disabledStyle: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },

  focusStyle: {
    outline: 0,
    WebkitAnimation: 'belle-rating-focus 2s',
    borderRadius: 2
  },

  hoverStyle: {
    opacity: 1
  },

  disabledHoverStyle: {
    opacity: 0.6
  },

  characterStyle: {
    color: '#FFCC00',
    textShadow: '0px 1px 0px #DCB000',
    top: 0,

    /* animations */
    transition: 'color 0.1s',
    transitionTimingFunction: 'ease-out'
  },

  hoverCharacterStyle: {
    color: '#FFDA46'
  },

  activeCharacterStyle: {
    textShadow: '0px -1px 0px #D6AB00',
    color: '#F3C200',
    position: 'relative',
    top: 1
  }
};

exports.default = ratingStyle;