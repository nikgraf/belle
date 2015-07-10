const comboBoxStyle = {

  style: {

    background: 'transparent',

    /* normalize.css v3.0.1 */
    font: 'inherit',
    margin: 0,

    /* Reset the default borderRadius for Mobile Safari */
    borderRadius: 0,

    /* Belle TextInput style */
    overflow: 'hidden',
    resize: 'none',
    width: '100%',
    fontSize: 14,
    paddingTop: '7px',
    paddingBottom: '5px',
    color: '#505050',
    border: '0 solid #fff',
    borderBottom: '1px solid #ccc',
    display: 'block',
    boxSizing: 'border-box',
    position: 'relative',

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
    borderBottom: '1px solid #6EB8D4',
    outline: 'none'
  },

  hoverStyle: {
    borderBottom: '1px solid #92D6EF'
  },

  disabledStyle: {
    borderBottom: '1px dotted #9F9F9F'
  },

  disabledHoverStyle: {
    borderBottom: '1px dotted #92D6EF',
    cursor: 'not-allowed'
  },

  wrapperStyle: {
    outline: 0, // to avoid default focus behaviour
    boxSizing: 'border-box',
    position: 'relative'
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
    /* Improve scrolling for mobile Safari */
    WebkitOverflowScrolling: 'touch'
  },

  caretToOpenStyle: {
    height: 0,
    width: 0,
    content: ' ',
    position: 'absolute',
    top: 15,
    right: 8,
    cursor: 'pointer',
    borderTop: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  },

  caretToCloseStyle: {
    height: 0,
    width: 0,
    content: ' ',
    position: 'absolute',
    top: 15,
    right: 8,
    cursor: 'pointer',
    borderBottom: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  },

  caretFocusStyle: {
    outline: 0
  },

  disabledCaretToOpenStyle: {
    borderTop: '6px solid #9F9F9F'
  },

  hintStyle: {

    position: 'absolute',
    top: 0,
    left: 0,
    outline: 'none',
    color: '#ccc',
    border: 'none',

    /* normalize.css v3.0.1 */
    font: 'inherit',
    margin: 0,

    /* Reset the default borderRadius for Mobile Safari */
    borderRadius: 0,

    /* Belle TextInput style */
    overflow: 'hidden',
    resize: 'none',
    width: '100%',
    fontSize: 14,
    paddingTop: '7px',
    paddingBottom: '5px',
    display: 'block',
    boxSizing: 'border-box',

    /* This button can only be pressed */
    MsTouchAction: 'manipulation',
    touchAction: 'manipulation',

    /*
     Prevent flickering while tapping on WebKit
     http://stackoverflow.com/a/3516243/837709
     */
    WebkitTapHighlightColor: 'transparent'
  }
};

export default comboBoxStyle;
