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
    borderBottom: '1px solid #6EB8D4',
    boxSizing: 'border-box',
    paddingTop: '7px',
    paddingBottom: '5px',
    outline: 'none',

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
    borderBottom: '1px solid #92D6EF',
    boxSizing: 'border-box',
    paddingTop: '7px',
    paddingBottom: '5px',

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

  disabledStyle: {
    borderBottom: '1px dotted #9F9F9F',
    boxSizing: 'border-box',
    paddingTop: '7px',
    paddingBottom: '5px',
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

  disabledHoverStyle: {
    borderBottom: '1px dotted #92D6EF',
    cursor: 'not-allowed',
    boxSizing: 'border-box',
    paddingTop: '7px',
    paddingBottom: '5px',
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

  disabledCaretToOpenStyle: {
    paddingRight: '26px',
    backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"12\"><polygon points=\"0,0 20,0 10,12\" style=\"fill:#ccc\"></polygon></svg>')",
    backgroundSize: '10px 6px',
    backgroundPosition: 'right 10px bottom 10px',
    backgroundRepeat: 'no-repeat'
  },

  caretToCloseStyle: {
    paddingRight: '26px',
    backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"12\"><polygon points=\"0,12 20,12 10,0\" style=\"fill:grey\"></polygon></svg>')",
    backgroundSize: '10px 6px',
    backgroundPosition: 'right 10px bottom 10px',
    backgroundRepeat: 'no-repeat'
  },

  caretToOpenStyle: {
    paddingRight: '26px',
    backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"12\"><polygon points=\"0,0 20,0 10,12\" style=\"fill:grey\"></polygon></svg>')",
    backgroundSize: '10px 6px',
    backgroundPosition: 'right 10px bottom 10px',
    backgroundRepeat: 'no-repeat'
  },

  hintStyle: {

    position: 'absolute',
    top: 0,
    left: 0,
    outline: 'none',
    color: '#ccc',

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
    border: '0 solid #fff',
    borderBottom: '1px solid #ccc',
    display: 'block',
    boxSizing: 'border-box',

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
  }
};

export default comboBoxStyle;
