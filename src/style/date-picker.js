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
    backgroundColor: '#D8D8D8'
  },

  readOnlyWrapperStyle: {
  },

  hoverWrapperStyle: {
    backgroundColor: '#92D6EF'
  },

  activeWrapperStyle: {
  },

  focusWrapperStyle: {
    boxShadow: '0 0 0 2px rgba(140, 224, 255, 0.6) inset',
    outline: 0
  },

  disabledHoverWrapperStyle: {
    backgroundColor: '#E1E9EC'
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

  // left button in nav-bar to go to previous month
  leftNavStyle: {
    cursor: 'pointer',
    backgroundImage: 'url(data:image/png;base64,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)',
    backgroundRepeat: 'no-repeat',
    width: 30,
    backgroundSize: 30,
    marginTop: 2,

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

  // right button in nav-bar to go to previous month
  rightNavStyle: {
    cursor: 'pointer',
    backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACuklEQVRoQ+2ZbcraQBDHd42viKKIoii+oIiCiDlKb+ARcoT0BvYG9gb2BvYAYquIfhBNQQgBUR9QkIjZslIhfSpmYjZ5lMavmezMb2b+u9kRoxf/4RePH7kAH11BtwJuBSxm4P9pIZ7nCxjjNk0YIaQ7HA5/WUwek9fBFeB5fogQal29EkI6HMeJg8HgjUkkDy4CBmi1WuS9D0LIjoKMRqPPD/q3/BoYoNls/gOg8y4RQoTxePzNckQmFwADNBqNewBXt30KMplMfpqM42FzEEC9Xi94PB7JhJeupmnidDq1XeggABp4vV6HVEDPeNGHqqqdxWJhm9DBALVazSzABYYQImGMxdls9tVEBcGmYIBqtfoQgG7bpfoQ5/P5d3B0AEMwQKVSsQSgi6V3Pp+F5XLJRB9ggHK5zArg2loiQsiyPsAApVKJKcCfilChi5IkfQF0y00TMECxWLQDQC/0tiRJpvUBBsjn87YB6IXu9XrbZvQBBsjlcrYD6HpEWK1WoLYCA2SzWScBEMa4t1qtPhlpAwyQyWQcBaCBy7JsGJ+hwTUD6XTaUQBCSE9RFHYVSKVSjgFgjAVFUdhqIJlMOgHQp7uQLMvgUxrcQolEwk4A+sHXXq/X9p0D8XjcDoAd/VLdbDagdrm1I4ErEIvFWAOIGOPOdru1dFcAA0SjUSYAdH+nIt3tduA+v3cWgAEikYglAIzxD03ThP1+b7rPmQCEw+FHAehdWjwcDh97IwuFQmYBqEA7gUDAcp8zqUAwGDQD0KVZPx6PTPqcCYDf7zcEIIT0EULC6XR6rrkQzYDP57s7maM7i6qqzzuZ4zjuFsBl9qNp2vPPRjHGf02nqUDp9A0hZOkgMvreN3oOPgcQQgWE0OX/AYQQFantAjUKnj43AwBZz3EbF8DxlL9z6FbArYDFDLx8C/0G++38MazN2IUAAAAASUVORK5CYII=)',
    backgroundRepeat: 'no-repeat',
    width: 30,
    backgroundSize: 30,
    marginTop: 2,
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

  // styling for month label on top of calendar
  monthLblStyle: {
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

  disabledMonthLblStyle: {
  },

  readOnlyMonthLblStyle: {
  },

  hoverMonthLblStyle: {
  },

  // styling for week's header bar
  weekHeaderStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#716D6D'
  },

  disabledWeekHeaderStyle: {
    color: '#C1BABA'
  },

  readOnlyHeaderStyle: {
  },

  hoverHeaderStyle: {
  },

  // styling for week's day label
  dayLblStyle: {
    width: 40,
    height: 35,
    lineHeight: '35px',
    verticalAlign: 'middle',
    backgroundColor: 'white',
    margin: 0.5,

    /*
     User should be able to copy date.
     */
    WebkitUserSelect: 'initial',
    MozUserSelect: 'initial',
    MsUserSelect: 'initial',
    userSelect: 'initial'
  },

  disabledDayLblStyle: {
  },

  readOnlyDayLblStyle: {
  },

  hoverDayLblStyle: {
  },

  // styling for week's row
  weekStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#716D6D'
  },

  disabledWeekStyle: {
  },

  readOnlyWeekStyle: {
  },

  hoverWeekStyle: {
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
    cursor: 'auto'
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
