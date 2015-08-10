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
    display: 'none'
  },

  hoverRightNavStyle: {
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

  // styling for week's day label
  dayLblStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20
  },

  disabledDayLblStyle: {
    display: 'inline-block',
    width: 20,
    border: '1px solid black',
    height: 20,
    color: 'gray',
    backgroundColor: 'lightGray'
  },

  hoverDayLblStyle: {
  },

  disabledHoverDayLblStyle: {
  },

  // styling for individual day
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
 * tasks remaining:
 * -implementing focus styles
 * -implementing active styles
 *
 * We might need separate styles for wrapper of day-labels and days.
 */
