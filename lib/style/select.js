'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var selectStyle = {
  style: {
    borderBottom: '1px solid #CCC',
    boxSizing: 'border-box',
    cursor: 'pointer',
    /*
    While the Select should have the same padding as TextInput 4px for
    paddingBottom was chosen as in Chrome the Text is larger by 1px than in
    the textarea.
     */
    padding: '7px 0 4px 0',
    position: 'relative',

    /* animations */
    transition: 'border-bottom 0.2s',
    transitionTimingFunction: 'ease-out',

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
    borderBottom: '1px solid #6EB8D4'
  },

  activeStyle: {
    borderBottom: '1px solid #6EB8D4'
  },

  hoverStyle: {
    borderBottom: '1px solid #92D6EF'
  },

  wrapperStyle: {
    outline: 0, // to avoid default focus behaviour
    boxSizing: 'border-box',
    position: 'relative'
  },

  disabledStyle: {
    borderBottom: '1px dotted #9F9F9F'
  },

  disabledHoverStyle: {
    borderBottom: '1px dotted #92D6EF',
    cursor: 'not-allowed'
  },

  menuStyle: {
    display: 'block',
    listStyleType: 'none',
    background: '#FFF',
    padding: '6px 0',
    margin: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 10000,
    boxSizing: 'border-box',
    borderRadius: 2,
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
    borderTop: '1px solid #f2f2f2',
    top: 0,
    /* Improve scrolling for mobile Safari */
    WebkitOverflowScrolling: 'touch'
  },

  caretToOpenStyle: {
    height: 0,
    width: 0,
    content: '-', // Avoid this warning: was passed a numeric string value for CSS property `content` (value: ` `)
    position: 'absolute',
    top: 15,
    right: 8,
    borderTop: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  },

  caretToCloseStyle: {
    height: 0,
    width: 0,
    content: '-', // Avoid this warning: was passed a numeric string value for CSS property `content` (value: ` `)
    position: 'absolute',
    top: 15,
    right: 8,
    borderBottom: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  },

  disabledCaretToOpenStyle: {
    borderTop: '6px solid #9F9F9F'
  }
};

exports.default = selectStyle;