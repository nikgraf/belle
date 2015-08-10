const datePickerStyle = {

  wrapperStyle: {
  },

  disabledWrapperStyle: {
  },

  hoverWrapperStyle: {
  },

  disabledHoverWrapperStyle: {
  },

  hoverNavBarStyle: {
  },

  disabledHoverNavBarStyle: {
  },

  hoverLeftNavStyle: {
  },

  hoverLeftNavDisabledStyle: {
  },

  hoverRightNavStyle: {
  },

  disabledHoverRightNavStyle: {
  },

  navButtonStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20,
    cursor: 'pointer'
  },

  disabledNavButtonStyle: {
    display: 'none'
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
