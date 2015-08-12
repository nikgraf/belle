const datePickerStyle = {

  // wrapper of entire component
  wrapperStyle: {
    padding: 8,
    backgroundColor: '#C5E6F2',
    borderRadius: 5,
    width: 275,
    height: 287,
    textAlign: 'center',

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

    transition: 'color 0.1s',
    transitionTimingFunction: 'ease-out'
  },

  disabledWrapperStyle: {
  },

  readOnlyWrapperStyle: {
  },

  hoverWrapperStyle: {
    backgroundColor: '#92D6EF'
  },

  // can be deprecated
  activeWrapperStyle: {
  },

  focusWrapperStyle: {
    boxShadow: '0 0 0 2px rgba(140, 224, 255, 0.6) inset',
    outline: 0
  },

  disabledHoverWrapperStyle: {
  },

  // nav-bar at top for month navigation
  navBarStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    height: 35,
    lineHeight: '30px',
    verticalAlign: 'middle',
    color: 'white'
  },

  disabledNavBarStyle: {
  },

  readOnlyNavBarStyle: {
  },

  hoverNavBarStyle: {
  },

  disabledHoverNavBarStyle: {
  },

  // left button in nav-bar to go to previous month
  leftNavStyle: {
    cursor: 'pointer',

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

  disabledLeftNavStyle: {
    display: 'none'
  },

  readOnlyLeftNavStyle: {
  },

  hoverLeftNavStyle: {
  },

  activeLeftNavStyle: {
  },

  focusLeftNavStyle: {
    boxShadow: '0 0 0 2px rgba(140, 224, 255, 0.6)',
    outline: 0
  },

  disabledHoverLeftNavStyle: {
  },

  // right button in nav-bar to go to previous month
  rightNavStyle: {
    cursor: 'pointer',

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

  disabledRightNavStyle: {
    display: 'none'
  },

  readOnlyRightNavStyle: {
  },

  hoverRightNavStyle: {
  },

  activeRightNavStyle: {
  },

  focusRightNavStyle: {
    boxShadow: '0 0 0 2px rgba(140, 224, 255, 0.6)',
    outline: 0
  },

  disabledHoverRightNavStyle: {
  },

  // styling for month label on top of calendar
  monthLblStyle: {
    fontSize: 15
  },

  disabledMonthLblStyle: {
  },

  readOnlyMonthLblStyle: {
  },

  hoverMonthLblStyle: {
  },

  disabledHoverMonthLblStyle: {
  },

  // styling for week's header bar
  weekHeaderStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#716D6D'
  },

  disabledWeekHeaderStyle: {
  },

  readOnlyHeaderStyle: {
  },

  hoverHeaderStyle: {
  },

  disabledHoverWeekHeaderStyle: {
  },

  // styling for week's day label
  dayLblStyle: {
    width: 40,
    height: 35,
    lineHeight: '35px',
    verticalAlign: 'middle',
    backgroundColor: 'white',
    margin: 0.5
  },

  disabledDayLblStyle: {
    color: 'gray',
    backgroundColor: 'lightGray'
  },

  readOnlyDayLblStyle: {
  },

  hoverDayLblStyle: {
  },

  disabledHoverDayLblStyle: {
  },

  // styling for week's row
  weekStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#716D6D',

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

  disabledWeekStyle: {
  },

  readOnlyWeekStyle: {
  },

  hoverWeekStyle: {
  },

  disabledHoverWeekStyle: {
  },

  // styling for individual day
  dayStyle: {
    width: 40,
    height: 35,
    lineHeight: '35px',
    verticalAlign: 'middle',
    margin: 0.5,
    cursor: 'pointer',
    backgroundColor: '#F8F8F8',

    transition: 'color 0.1s',
    transitionTimingFunction: 'ease-out'
  },

  disabledDayStyle: {
    color: 'gray',
    backgroundColor: 'lightGray'
  },

  readOnlyDayStyle: {
  },

  hoverDayStyle: {
    backgroundColor: '#DEF1F7'
  },

  activeDayStyle: {
    backgroundColor: '#E8E8E8'
  },

  focusDayStyle: {
    boxShadow: '0 0 0 2px rgba(140, 224, 255, 0.6) inset',
    outline: 0
  },

  disabledHoverDayStyle: {
  },

  todayStyle: {
    color: '#E24545'
  },

  selectedDayStyle: {
    backgroundColor: '#1E90FF',
    color: 'white'
  },

  otherMonthDayStyle: {
    cursor: 'auto'
  }
};

export default datePickerStyle;
