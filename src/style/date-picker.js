const datePickerStyle = {

  wrapperHoverStyle: {
  },

  wrapperDisabledHoverStyle: {
  },

  navBarHoverStyle: {
  },

  navBarDisabledHoverStyle: {
  },

  leftNavHoverStyle: {
  },

  leftNavDisabledHoverStyle: {
  },

  rightNavHoverStyle: {
  },

  rightNavDisabledHoverStyle: {
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

  monthLblHoverStyle: {
  },

  monthLblDisabledHoverStyle: {
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

  dayLblHoverStyle: {
  },

  dayLblDisabledHoverStyle: {
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

  dayHoverStyle: {
  },

  dayDisabledHoverStyle: {
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
 */
