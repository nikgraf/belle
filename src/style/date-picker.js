const datePickerStyle = {

  // wrapper of entire component
  wrapperStyle: {
    padding: '5px 10px',
    backgroundColor: '#00D1FF',
    borderRadius: 5
  },

  disabledWrapperStyle: {
  },

  readOnlyWrapperStyle: {
  },

  hoverWrapperStyle: {
    backgroundColor: '#92D6EF'
  },

  activeWrapperStyle: {
  },

  focusWrapperStyle: {
    outline: '1px solid blue'
  },

  disabledHoverWrapperStyle: {
  },

  // nav-bar at top for month navigation
  navBarStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    height: 22,
    padding: '4px 0',
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 5
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
    cursor: 'pointer'
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
  },

  disabledHoverLeftNavStyle: {
  },

  // right button in nav-bar to go to previous month
  rightNavStyle: {
    cursor: 'pointer'
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
  },

  disabledHoverRightNavStyle: {
  },

  // styling for month label on top of calendar
  monthLblStyle: {
  },

  disabledMonthLblStyle: {
  },

  readOnlyMonthLblStyle: {
  },

  hoverMonthLblStyle: {
  },

  disabledHoverMonthLblStyle: {
  },

  weekHeaderStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 10px'
  },

  // styling for week's day label
  dayLblStyle: {
    display: 'inline-block',
    width: 24,
    height: 24,
    backgroundColor: 'white',
    marginRight: 2,
    borderRadius: 4,
    textAlign: 'center'
  },

  disabledDayLblStyle: {
    display: 'inline-block',
    width: 24,
    height: 24,
    marginRight: 2,
    borderRadius: 4,
    color: 'gray',
    backgroundColor: 'lightGray'
  },

  readOnlyDayLblStyle: {
    display: 'inline-block',
    width: 24,
    height: 24,
    marginRight: 2,
    borderRadius: 4
  },

  hoverDayLblStyle: {
  },

  disabledHoverDayLblStyle: {
  },

  dayWrapperStyle: {
    textAlign: 'center'
  },

  weekStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 10px'
  },

  // styling for individual day
  dayStyle: {
    display: 'inline-block',
    width: 24,
    height: 24,
    backgroundColor: 'white',
    marginRight: 2,
    borderRadius: 4,
    cursor: 'pointer'
  },

  disabledDayStyle: {
    display: 'inline-block',
    width: 24,
    height: 24,
    cursor: 'auto',
    color: 'gray',
    backgroundColor: 'lightGray'
  },

  readOnlyDayStyle: {
    display: 'inline-block',
    width: 24,
    height: 24,
    cursor: 'auto'
  },

  todayStyle: {
    color: 'red'
  },

  selectedDayStyle: {
    backgroundColor: 'blue',
    color: 'white'
  },

  hoverDayStyle: {
    //boxShadow: '0px 0px 2px gray'
  },

  activeDayStyle: {
    boxShadow: 'gray 0px 0px 2px inset'
  },

  focusDayStyle: {
    outline: '1px solid blue'
  },

  disabledHoverDayStyle: {
  }

};

export default datePickerStyle;

/*
Belle styling for date-picker:
- adding separate class for non-selectable days
- adding more classes for - weekStyle, dayWrapperStyle...

might be it will be good idea to not use pseudo classes for hover and have box-shadow outset

focus styles broken for preventFocusStyleForTouchAndClick
 */
