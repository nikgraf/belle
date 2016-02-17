const datePickerStyle = {

  // wrapper of entire component
  style: {
    borderRadius: 2,
    width: 267,
    fontSize: 14,
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
  },

  readOnlyStyle: {
  },

  hoverStyle: {
  },

  focusStyle: {
    WebkitAnimation: 'belle-button-focus 2s',
    outline: 0, // avoid default focus behaviour
  },

  disabledHoverStyle: {
    backgroundColor: '#E1E9EC',
  },

  // nav-bar at top for month navigation
  navBarStyle: {
    height: 38,
    border: '1px solid #E0E0E0',
    boxSizing: 'border-box',
  },

  // left button in nav-bar to go to previous month
  prevMonthNavStyle: {
    float: 'left',
    marginLeft: -1,
    paddingLeft: '15px',
    paddingRight: '19px',
  },

  prevMonthNavIconStyle: {
    width: 0,
    height: 0,
    borderTop: '7px solid transparent',
    borderBottom: '7px solid transparent',
    borderRight: '12px solid #666',
    borderRadius: 2,
  },

  hoverPrevMonthNavStyle: {
  },

  activePrevMonthNavStyle: {
  },

  // right button in nav-bar to go to previous month
  nextMonthNavStyle: {
    float: 'right',
    marginRight: -1,
    paddingLeft: '19px',
    paddingRight: '15px',
  },

  nextMonthNavIconStyle: {
    width: 0,
    height: 0,
    borderTop: '7px solid transparent',
    borderBottom: '7px solid transparent',
    borderLeft: '12px solid #666',
    borderRadius: 2,
  },

  hoverNextMonthNavStyle: {
  },

  activeNextMonthNavStyle: {
  },

  // styling for month label on top of calendar
  monthLabelStyle: {
    fontSize: 15,
    boxSizing: 'border-box',
    paddingTop: 7,
    display: 'inline-block',

    /*
     User should be able to copy date.
     */
    WebkitUserSelect: 'initial',
    MozUserSelect: 'initial',
    MsUserSelect: 'initial',
    userSelect: 'initial',
  },

  // styling for entire grid of week-header and weeks
  weekGridStyle: {
    boxSizing: 'border-box',
    overflow: 'auto',
    paddingBottom: 1,
  },

  weekHeaderStyle: {
    overflow: 'auto',
    boxSizing: 'border-box',
    boxShadow: '1px 0 0 0 #E0E0E0 inset, -1px 0 0 0 #E0E0E0 inset',
  },

  // styling for week's day label
  dayLabelStyle: {
    width: 39,
    height: 32,
    marginRight: -1,
    color: '#666',
    display: 'block',
    float: 'left',
    boxSizing: 'border-box',
    paddingTop: 5,

    /*
     User should be able to copy date.
     */
    WebkitUserSelect: 'initial',
    MozUserSelect: 'initial',
    MsUserSelect: 'initial',
    userSelect: 'initial',
  },

  disabledDayLabelStyle: {
  },

  weekendLabelStyle: {
    // color: '#8E8071',
  },

  // styling for individual day
  dayStyle: {
    width: 39,
    height: 32,
    borderLeft: '1px solid #E0E0E0',
    borderRight: '1px solid #E0E0E0',
    borderTop: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0',
    color: '#716D6D',
    float: 'left',
    marginRight: -1,
    marginBottom: -1,
    boxSizing: 'border-box',
    paddingTop: 5,
    position: 'relative',
    zIndex: 100,
    cursor: 'default',

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

  readOnlyDayStyle: {
  },

  activeDayStyle: {
    borderTop: '1px solid #B1B1B1',
    borderLeft: '1px solid #D0D0D0',
    borderRight: '1px solid #D0D0D0',
    borderBottom: '1px solid #D4D4D4',
    background: '#E0E0E0',
    zIndex: 200,
  },

  focusDayStyle: {
    background: '#EEE',
    cursor: 'pointer',
  },

  disabledDayStyle: {
    color: '#C1BABA',
    cursor: 'not-allowed',
  },

  disabledFocusDayStyle: {
    cursor: 'not-allowed',
  },

  todayStyle: {
    color: '#2C87A9',
  },

  weekendStyle: {
    color: '#8E8071',
  },

  selectedDayStyle: {
    borderTop: '1px solid #B1B1B1',
    borderLeft: '1px solid #D0D0D0',
    borderRight: '1px solid #D0D0D0',
    borderBottom: '1px solid #D4D4D4',
    background: '#E0E0E0',
    zIndex: 200,
  },

  otherMonthDayStyle: {
    color: '#BDBDBD',
  },
};

export default datePickerStyle;
