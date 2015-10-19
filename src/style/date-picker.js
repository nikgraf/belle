const datePickerStyle = {

  // wrapper of entire component
  style: {
    borderRadius: 2,
    width: 267,
    textAlign: 'center',
    boxSizing: 'border-box',
    backgroundColor: 'white',

    /*
     To avoid any kind of flickering the user won't get feedback
     for selecting the button text
     */
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',

    MsTouchAction: 'manipulation',
    touchAction: 'manipulation',

    /*
     Prevent flickering while tapping on WebKit
     http://stackoverflow.com/a/3516243/837709
     */
    WebkitTapHighlightColor: 'transparent',

    transition: 'color 0.1s',
    transitionTimingFunction: 'ease-out',
  },

  disabledStyle: {
    backgroundColor: '#D8D8D8',
  },

  readOnlyStyle: {
  },

  hoverStyle: {
  },

  focusStyle: {
    boxShadow: '0 0 0 2px rgba(140, 224, 255, 0.6) inset',
    outline: 0,
  },

  disabledHoverStyle: {
    backgroundColor: '#E1E9EC',
  },

  // nav-bar at top for month navigation
  navBarStyle: {
    height: 30,
    lineHeight: '30px',
    border: '1px solid #ccc',
  },

  // left button in nav-bar to go to previous month
  prevMonthNavStyle: {
    cursor: 'pointer',
    float: 'left',

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

  hoverPrevMonthNavStyle: {
  },

  activePrevMonthNavStyle: {
  },

  // right button in nav-bar to go to previous month
  nextMonthNavStyle: {
    cursor: 'pointer',
    float: 'right',

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

  hoverNextMonthNavStyle: {
  },

  activeNextMonthNavStyle: {
  },

  // styling for month label on top of calendar
  monthLabelStyle: {
    fontSize: 15,
    width: 125,
    boxSizing: 'border-box',

    /*
     User should be able to copy date.
     */
    WebkitUserSelect: 'initial',
    MozUserSelect: 'initial',
    MsUserSelect: 'initial',
    userSelect: 'initial',
  },

  // styling for entire grid of week-header and weeks
  weekGroupStyle: {
    boxSizing: 'border-box',
    overflow: 'auto',
    paddingBottom: 1,
  },

  weekHeaderStyle: {
    overflow: 'auto',
    boxSizing: 'border-box',
    boxShadow: '1px 0 0 0 #EEE inset, -1px 0 0 0 #EEE inset',
  },

  // styling for week's day label
  dayLabelStyle: {
    width: 39,
    height: 30,
    padding: 0,
    marginRight: -1,
    lineHeight: '30px',
    color: '#716D6D',
    display: 'block',
    float: 'left',
    boxSizing: 'border-box',

    /*
     User should be able to copy date.
     */
    WebkitUserSelect: 'initial',
    MozUserSelect: 'initial',
    MsUserSelect: 'initial',
    userSelect: 'initial',
  },

  disabledDayLabelStyle: {
    color: '#C1BABA',
  },

  weekendLabelStyle: {
    backgroundColor: '#F0F0F0',
  },

  // styling for individual day
  dayStyle: {
    width: 39,
    height: 30,
    lineHeight: '30px',
    cursor: 'pointer',
    border: '1px solid #EEE',
    color: '#716D6D',
    display: 'block',
    float: 'left',
    padding: 0,
    marginRight: -1,
    marginBottom: -1,
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 100,

    /*
     User should be able to copy date.
     */
    WebkitUserSelect: 'initial',
    MozUserSelect: 'initial',
    MsUserSelect: 'initial',
    userSelect: 'initial',

    /* This button can only be pressed */
    MsTouchAction: 'manipulation',
    touchAction: 'manipulation',

    /*
     Prevent flickering while tapping on WebKit
     http://stackoverflow.com/a/3516243/837709
     */
    WebkitTapHighlightColor: 'transparent',

    transition: 'color 0.1s',
    transitionTimingFunction: 'ease-out',
  },

  disabledDayStyle: {
    color: '#C1BABA',
    cursor: 'auto',
  },

  readOnlyDayStyle: {
    cursor: 'auto',
  },

  hoverDayStyle: {
    border: '1px solid #EEE',
    background: '#EEE',
    color: '#616161',
  },

  activeDayStyle: {
    boxShadow: 'none',
    border: '1px solid #EEE',
    borderTop: '1px solid #BDBDBD',
    background: '#E0E0E0',
    color: '#424242',
  },

  focusDayStyle: {
    border: '1px solid rgba(140, 224, 255, 0.8)',
    zIndex: 200,
  },

  disabledHoverDayStyle: {
    cursor: 'auto',
  },

  todayStyle: {
    color: '#2C87A9',
  },

  weekendStyle: {
    backgroundColor: '#F0F0F0',
  },

  selectedDayStyle: {
    boxShadow: 'none',
    border: '1px solid #EEE',
    borderTop: '1px solid #BDBDBD',
    background: '#E0E0E0',
    color: '#424242',
  },

  otherMonthDayStyle: {
    color: '#BDBDBD',
  },
};

export default datePickerStyle;
