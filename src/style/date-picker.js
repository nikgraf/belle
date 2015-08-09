const datePickerStyle = {

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

  dayHeaderStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20
  },

  disabledDayHeaderStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20,
    color: 'gray',
    backgroundColor: 'lightGray'
  }
};

export default datePickerStyle;

/**
 * API for styling:
 *
 * Calendar:
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
 */
