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

  dayLblHoverStyle: {
  },

  dayLblDisabledHoverStyle: {
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
 * - leftNavFocusStyle
 * - leftNavHoverStyle
 * - leftNavDisabledStyle
 * - leftNavDisabledHoverStyle
 * - rightNavStyle
 * - rightNavFocusStyle
 * - rightNavHoverStyle
 * - rightNavDisabledStyle
 * - rightNavDisabledHoverStyle
 *
 * tasks:
 * -implementing hover styles using pseudo classes
 * -implementing focus styles for calendar
 * -implementing focus styles for days
 */
