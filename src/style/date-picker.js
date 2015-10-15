const datePickerStyle = {

  // wrapper of entire component
  style: {
    padding: 2,
    borderRadius: 2,
    width: 280,
    textAlign: 'center',
    boxSizing: 'content-box',
    borderCollapse: 'collapse',
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
    transitionTimingFunction: 'ease-out'
  },

  disabledStyle: {
    backgroundColor: '#D8D8D8'
  },

  readOnlyStyle: {
  },

  hoverStyle: {
  },

  activeStyle: {
  },

  focusStyle: {
    boxShadow: '0 0 0 2px rgba(140, 224, 255, 0.6) inset',
    outline: 0
  },

  disabledHoverStyle: {
    backgroundColor: '#E1E9EC'
  },

  // nav-bar at top for month navigation
  navBarStyle: {
    display: 'table-caption',
    height: 30,
    lineHeight: '30px',
    border: '1px solid #ccc'
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
    WebkitTapHighlightColor: 'transparent'
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
    WebkitTapHighlightColor: 'transparent'
  },

  hoverNextMonthNavStyle: {
  },

  activeNextMonthNavStyle: {
  },

  // styling for month label on top of calendar
  monthLabelStyle: {
    fontSize: 15,
    width: 125,

    /*
     User should be able to copy date.
     */
    WebkitUserSelect: 'initial',
    MozUserSelect: 'initial',
    MsUserSelect: 'initial',
    userSelect: 'initial'
  },

  // styling for entire grid of week-header and weeks
  weekGroupStyle: {
    'display': 'table-row-group'
  },

  // styling for week's row
  weekStyle: {
    display: 'table-row'
  },

  // styling for week's day label
  dayLabelStyle: {
    height: 30,
    padding: 0,
    lineHeight: '30px',
    backgroundColor: 'white',
    margin: 0.5,
    color: '#716D6D',
    display: 'table-cell',

    /*
     User should be able to copy date.
     */
    WebkitUserSelect: 'initial',
    MozUserSelect: 'initial',
    MsUserSelect: 'initial',
    userSelect: 'initial'
  },

  disabledDayLabelStyle: {
    color: '#C1BABA'
  },

  weekendLabelStyle: {
    backgroundColor: '#F0F0F0'
  },

  // styling for individual day
  dayStyle: {
    width: 40,
    height: 30,
    lineHeight: '30px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    color: '#716D6D',
    display: 'table-cell',
    padding: 0,

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
    transitionTimingFunction: 'ease-out'
  },

  disabledDayStyle: {
    color: '#C1BABA',
    cursor: 'auto'
  },

  readOnlyDayStyle: {
    cursor: 'auto'
  },

  hoverDayStyle: {
    backgroundColor: '#87CEFA',
    color: 'white'
  },

  activeDayStyle: {
    backgroundColor: '#DEF1F7',
    color: '#716D6D'
  },

  focusDayStyle: {
    boxShadow: '0 0 0 2px rgba(140, 224, 255, 0.6) inset',
    outline: 0
  },

  disabledHoverDayStyle: {
    cursor: 'auto'
  },

  todayStyle: {
    color: '#E24545'
  },

  weekendStyle: {
    backgroundColor: '#F0F0F0'
  },

  selectedDayStyle: {
    backgroundColor: '#1E90FF',
    color: 'white'
  },

  otherMonthDayStyle: {
    color: '#D3D0D0',
    cursor: 'auto'
  }
};

export default datePickerStyle;
