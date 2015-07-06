const toggleStyle = {

  style: {
    boxSizing: 'border-box',
    borderRadius: 28,
    height: 28,
    width: 60,
    WebkitUserSelect: 'none',
    position: 'relative',
    cursor: 'pointer',
    display: 'inline-block'
  },

  focusStyle: {
    WebkitAnimation: 'belle-toggle-focus 2s',
    outline: 0 // avoid default focus behaviour
  },

  disabledStyle: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },

  sliderStyle: {
    boxSizing: 'border-box',
    position: 'relative',
    // Calculated with 2 * the width of choice area
    width: 92,
    transition: 'left 0.1s ease-in-out'
  },

  sliderWrapperStyle: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    borderRadius: 28,
    boxShadow: 'inset 0 1px 0px 0px rgba(0,0,0,0.6)'
  },

  handleStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    borderRadius: 28,
    backgroundColor: 'rgb(238, 238, 238)',
    height: 28,
    width: 28,
    cursor: 'pointer',
    borderBottom: '1px solid rgb(189, 189, 189)',
    transition: 'left 0.1s ease-in-out',

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

  firstChoiceStyle: {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: 28,
    // Calculated with the width of the whole toggle - half of the width from the handle
    //
    // This allows to have a round handle that is position exactly in on top of the
    // border between the two choice areas.
    width: 46,
    lineHeight: 28 + 'px',
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: 'rgba(43, 206, 56, 0.8)',
    textIndent: -10,

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

  secondChoiceStyle: {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: 28,
    // Calculated with the width of the whole toggle - half of the width from the handle
    //
    // This allows to have a round handle that is position exactly in on top of the
    // border between the two choice areas.
    width: 46,
    lineHeight: 28 + 'px',
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: 'rgba(205, 205, 205, 0.8)',
    textIndent: 10,

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

  hoverHandleStyle: {
    backgroundColor: '#F8F8F8'
  },

  activeHandleStyle: {
    backgroundColor: '#F8F8F8',
    cursor: 'url(http://www.google.com/intl/en_ALL/mapfiles/closedhand.cur), move'
  },

  disabledHandleStyle: {
    cursor: 'not-allowed'
  }

};

export default toggleStyle;
