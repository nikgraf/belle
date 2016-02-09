const toggleStyle = {
  style: {
    boxSizing: 'border-box',
    borderRadius: 32,
    height: 32,
    width: 68,
    WebkitUserSelect: 'none',
    position: 'relative',
    cursor: 'pointer',
    display: 'inline-block',
  },

  focusStyle: {
    WebkitAnimation: 'belle-toggle-focus 2s',
    outline: 0, // avoid default focus behaviour
  },

  disabledStyle: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  sliderStyle: {
    boxSizing: 'border-box',
    position: 'relative',

    // Calculated with 2 * the width of choice area
    width: 104,
    transition: 'left 0.1s',
    transitionTimingFunction: 'ease-in-out',

    /*
    Prevent flickering while tapping on WebKit
    http://stackoverflow.com/a/3516243/837709
    */
    WebkitTapHighlightColor: 'transparent',
  },

  sliderWrapperStyle: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    borderRadius: 32,
    lineHeight: 1,
    boxShadow: 'inset 0 1px 0px 0px rgba(0,0,0,0.6)',
  },

  handleStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    borderRadius: 32,
    backgroundColor: 'rgb(243, 243, 243)',
    height: 31,
    width: 32,
    cursor: 'pointer',
    border: '1px solid rgb(220, 220, 220)',
    boxShadow: '0 1px 0px 0px rgb(185, 185, 185)',

    /* animations */
    transition: 'left 0.1s',
    transitionTimingFunction: 'ease-in-out',

    /*
    To avoid any kind of flickering the user won't get feedback
    for selecting the button text
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
    WebkitTapHighlightColor: 'transparent',
  },

  firstChoiceStyle: {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: 32,

    // Calculated with the width of the whole toggle - half of the width from the handle
    //
    // This allows to have a round handle that is position exactly in on top of the
    // border between the two choice areas.
    width: 52,
    lineHeight: '32px',
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: 'rgba(43, 206, 56, 0.8)',
    textIndent: -10,
    fontSize: 15,

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
    WebkitTapHighlightColor: 'transparent',
  },

  secondChoiceStyle: {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: 32,

    // Calculated with the width of the whole toggle - half of the width from the handle
    //
    // This allows to have a round handle that is position exactly in on top of the
    // border between the two choice areas.
    width: 52,
    lineHeight: '32px',
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: 'rgba(205, 205, 205, 0.8)',
    textIndent: 10,
    fontSize: 15,

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
    WebkitTapHighlightColor: 'transparent',
  },

  hoverHandleStyle: {
    backgroundColor: 'rgb(250, 250, 250)',
  },

  activeHandleStyle: {
    height: 32,
    backgroundColor: 'rgb(246, 246, 246)',
    boxShadow: '0 0 0 0 rgb(189, 189, 189)',
  },

  disabledHandleStyle: {
    cursor: 'not-allowed',
  },
};

export default toggleStyle;
