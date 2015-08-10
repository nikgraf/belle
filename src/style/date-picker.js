const datePickerStyle = {

  // wrapper of entire component
  wrapperStyle: {
  },

  disabledWrapperStyle: {
  },

  hoverWrapperStyle: {
  },

  disabledHoverWrapperStyle: {
  },

  // nav-bar at top for month navigation
  navBarStyle: {
  },

  disabledNavBarStyle: {
  },

  hoverNavBarStyle: {
  },

  disabledHoverNavBarStyle: {
  },

  // left button in nav-bar to go to previous month
  leftNavStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20,
    cursor: 'pointer'
  },

  disabledLeftNavStyle: {
    display: 'none'
  },

  hoverLeftNavStyle: {
  },

  disabledHoverLeftNavStyle: {
  },

  // right button in nav-bar to go to previous month
  rightNavStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20,
    cursor: 'pointer'
  },

  disabledRightNavStyle: {
  },

  hoverRightNavStyle: {
    display: 'none'
  },

  disabledHoverRightNavStyle: {
  },

  // styling for month label on top of calendar
  monthLblStyle: {
  },

  disabledMonthLblStyle: {
  },

  hoverMonthLblStyle: {
  },

  disabledHoverMonthLblStyle: {
  },

  dayLblStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20
  },

  dayLblDisabledStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20,
    color: 'gray',
    backgroundColor: 'lightGray'
  },

  hoverDayLblStyle: {
  },

  hoverDayLblDisabledStyle: {
  },

  dayStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20,
    cursor: 'pointer'
  },

  disabledDayStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20,
    cursor: 'auto',
    color: 'gray',
    backgroundColor: 'lightGray'
  },

  todayStyle: {
    color: 'red'
  },

  selectedDayStyle: {
    backgroundColor: 'blue',
    color: 'white'
  },

  hoverDayStyle: {
  },

  hoverDayDisabledStyle: {
  }

};

export default datePickerStyle;

/**
 * API for styling:
 *
 * Wrapper:
 * - style
 * - focusStyle
 * - hoverStyle
 * - disabledStyle
 * - disabledHoverStyle
 *
 * Day:
 * - dayStyle
 * - dayActiveStyle
 * - dayFocusStyle
 * - dayHoverStyle
 * - daySelectedStyle
 * - dayDisabledStyle
 * - dayDisabledHoverStyle
 *
 * NavBar:
 * - navBarStyle
 * - navBarHoverStyle
 * - navBarDisabledStyle
 * - navBarDisabledHoverStyle
 * - leftNavStyle
 * - leftNavActiveStyle
 * - leftNavFocusStyle
 * - leftNavHoverStyle
 * - leftNavDisabledStyle
 * - leftNavDisabledHoverStyle
 * - rightNavStyle
 * - leftNavActiveStyle
 * - leftNavFocusStyle
 * - rightNavHoverStyle
 * - rightNavDisabledStyle
 * - rightNavDisabledHoverStyle
 *
 * tasks:
 * -implementing focus styles for calendar
 * -implementing focus styles for days
 *
 * We might need separate styles for wrapper of day-labels and days.
 */
