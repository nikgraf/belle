import React, {Component, PropTypes} from 'react';
import {injectStyles, removeAllStyles} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import {has, map, shift, reverse, omit} from '../utils/helpers';
import {getWeekArrayForMonth, getLocaleData, CURRENT_DATE, CURRENT_MONTH, CURRENT_YEAR} from '../utils/date-helpers';
import defaultStyle from '../style/date-picker';
import config from '../config/datePicker';

/**
 * Returns an object with properties that are relevant for the wrapping div of the date picker.
 */
function sanitizeWrapperProps(properties) {
  return omit(properties, [
    'tabIndex',
    'onFocus',
    'onBlur',
    'onMouseDown',
    'onMouseUp',
    'onTouchStart',
    'onTouchEnd',
    'disabled',
    'style',
    'className',
  ]);
}

/**
 * Returns an object with properties that are relevant for day span.
 */
function sanitizeDayProps(properties) {
  return omit(properties, [
    'tabIndex',
    'key',
    'ref',
    'onMouseDown',
    'onMouseUp',
    'onMouseOver',
    'onMouseOut',
    'onTouchStart',
    'onTouchEnd',
    'style',
    'className',
  ]);
}

/**
 * Injects pseudo classes for styles into the DOM.
 */
function updatePseudoClassStyle(pseudoStyleIds, properties, preventFocusStyleForTouchAndClick) {
  const styles = [
    {
      id: pseudoStyleIds.prevMonthNavStyleId,
      style: {
        ...defaultStyle.hoverPrevMonthNavStyle,
        ...properties.hoverPrevMonthNavStyle,
      },
      pseudoClass: 'hover',

    }, {
      id: pseudoStyleIds.nextMonthNavStyleId,
      style: {
        ...defaultStyle.hoverNextMonthNavStyle,
        ...properties.hoverNextMonthNavStyle,
      },
      pseudoClass: 'hover',
    },
  ];
  let focusStyle;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    focusStyle = {
      ...defaultStyle.focusStyle,
      ...properties.focusStyle,
    };
  }

  styles.push({
    id: pseudoStyleIds.styleId,
    style: focusStyle,
    pseudoClass: 'focus',
  });
  injectStyles(styles);
}

/**
 * DatePicker React Component.
 *
 * This implementation follows the recommendations proposed here:
 * http://www.w3.org/TR/wai-aria-practices/#datepicker
 */
export default class DatePicker extends Component {

  constructor(properties) {
    super(properties);
    let dateValue;

    if (has(properties, 'valueLink')) {
      dateValue = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      dateValue = properties.value;
    } else if (has(properties, 'defaultValue')) {
      dateValue = properties.defaultValue;
    }

    this.state = {
      isFocused: false,
      isActive: false,
      dateValue: dateValue,
      month: properties.month - 1,
      year: properties.year,
    };

    this.localeData = getLocaleData(properties.locale);
    this.wrapperProps = sanitizeWrapperProps(properties.wrapperProps);
    this.dayProps = sanitizeDayProps(properties.dayProps);
    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;
  }

  static displayName = 'DatePicker';

  static propTypes = {
    // value related props
    defaultValue: PropTypes.instanceOf(Date),
    value: PropTypes.instanceOf(Date),
    valueLink: PropTypes.shape({
      value: PropTypes.instanceOf(Date),
      requestChange: PropTypes.func.isRequired,
    }),

    // component config related props
    locale: PropTypes.string,
    month: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    year: PropTypes.number,
    showOtherMonthDate: PropTypes.bool,
    styleWeekend: PropTypes.bool,
    renderDay: PropTypes.func,
    tabIndex: PropTypes.number,
    'aria-label': PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    preventFocusStyleForTouchAndClick: PropTypes.bool,

    // event callbacks for wrapper
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,

    // event callbacks for previous month and next month navigation links
    onPrevMonthNavMouseDown: PropTypes.func,
    onPrevMonthNavMouseUp: PropTypes.func,
    onPrevMonthNavTouchStart: PropTypes.func,
    onPrevMonthNavTouchEnd: PropTypes.func,
    onNextMonthNavMouseDown: PropTypes.func,
    onNextMonthNavMouseUp: PropTypes.func,
    onNextMonthNavTouchStart: PropTypes.func,
    onNextMonthNavTouchEnd: PropTypes.func,

    // event callbacks for days
    onDayMouseOver: PropTypes.func,
    onDayMouseOut: PropTypes.func,
    onDayMouseDown: PropTypes.func,
    onDayMouseUp: PropTypes.func,
    onDayTouchStart: PropTypes.func,
    onDayTouchEnd: PropTypes.func,

    // callbacks for change of values
    onUpdate: PropTypes.func,
    onMonthYearChange: PropTypes.func,

    // props for wrapper and day
    wrapperProps: PropTypes.object,
    dayProps: PropTypes.object,

    // ClassNames
    wrapperClassName: PropTypes.string,
    navBarClassName: PropTypes.string,
    prevMonthNavClassName: PropTypes.string,
    nextMonthNavClassName: PropTypes.string,
    monthLabelClassName: PropTypes.string,
    dayLabelClassName: PropTypes.string,
    dayClassName: PropTypes.string,

    // wrapper styles
    style: PropTypes.object,
    disabledStyle: PropTypes.object,
    readOnlyStyle: PropTypes.object,
    hoverStyle: PropTypes.object,
    activeStyle: PropTypes.object,
    focusStyle: PropTypes.object,
    disabledHoverStyle: PropTypes.object,

    // navbar styles
    navBarStyle: PropTypes.object,

    // prevMonthNav styles
    prevMonthNavStyle: PropTypes.object,
    hoverPrevMonthNavStyle: PropTypes.object,
    activePrevMonthNavStyle: PropTypes.object,

    // nextMonthNav styles
    nextMonthNavStyle: PropTypes.object,
    hoverNextMonthNavStyle: PropTypes.object,
    activeNextMonthNavStyle: PropTypes.object,

    // monthlbl styles
    monthLabelStyle: PropTypes.object,

    // daylbl styles
    dayLabelStyle: PropTypes.object,
    disabledDayLabelStyle: PropTypes.object,
    weekendLabelStyle: PropTypes.object,

    // day styles
    dayStyle: PropTypes.object,
    disabledDayStyle: PropTypes.object,
    readOnlyDayStyle: PropTypes.object,
    hoverDayStyle: PropTypes.object,
    activeDayStyle: PropTypes.object,
    focusDayStyle: PropTypes.object,
    disabledHoverDayStyle: PropTypes.object,
    todayStyle: PropTypes.object,
    selectedDayStyle: PropTypes.object,
    otherMonthDayStyle: PropTypes.object,
    weekendStyle: PropTypes.object,
  };

  static defaultProps = {
    month: CURRENT_MONTH + 1,
    year: CURRENT_YEAR,
    tabIndex: 0,
    'aria-label': 'datepicker',
    disabled: false,
    readOnly: false,
    showOtherMonthDate: true,
    styleWeekend: false,
  };

  /**
   * Generates the style-id based on React's unique DOM node id.
   * Calls function to inject the pseudo classes into the dom.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this.pseudoStyleIds = {};
    this.pseudoStyleIds.styleId = `wrapper-style-id${id}`;
    this.pseudoStyleIds.prevMonthNavStyleId = `prevMonthNav-style-id${id}`;
    this.pseudoStyleIds.nextMonthNavStyleId = `nextMonthNav-style-id${id}`;
    updatePseudoClassStyle(this.pseudoStyleIds, this.props, this.preventFocusStyleForTouchAndClick);
  }

  /**
   * Function will update component state and styles as new props are received.
   */
  componentWillReceiveProps(properties) {
    const newState = {
      month: properties.month - 1,
      year: properties.year,
    };

    if (has(properties, 'valueLink')) {
      newState.dateValue = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      newState.dateValue = properties.value;
    }

    this.setState(newState);

    this.localeData = getLocaleData(properties.locale);
    this.wrapperProps = sanitizeWrapperProps(properties.wrapperProps);
    this.dayProps = sanitizeDayProps(properties.dayProps);
    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;

    removeAllStyles(Object.keys(this.pseudoStyleIds));
    updatePseudoClassStyle(this.pseudoStyleIds, properties, this.preventFocusStyleForTouchAndClick);
  }

  /**
   * Removes pseudo classes from the DOM once component gets unmounted.
   */
  componentWillUnmount() {
    removeAllStyles(Object.keys(this.pseudoStyleIds));
  }

  /**
   * Callback is called when wrapper is focused, it will conditionally set isFocused.
   * this.state.focusedDay will be set to current date of whichever month is displayed on date-picker (if this.state.focusedDay is undefined).
   */
  _onFocus() {
    if (!this.props.disabled) {
      if (!this.state.isActive) {
        const newState = {
          isFocused: true,
        };
        if (!this.state.focusedDay) {
          newState.focusedDay = this.state.month + 1 + '/' + CURRENT_DATE + '/' + CURRENT_YEAR;
        }

        this.setState(newState);
      }

      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    }
  }

  /**
   * Callback is called when wrapper is blurred, it will reset isFocused, focusedDay.
   */
  _onBlur() {
    if (!this.props.disabled) {
      this.setState({
        isFocused: false,
        focusedDay: undefined,
      });
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    }
  }

  /**
    * Callback is called when wrapper receives mouseDown. Conditionally set isActive.
    */
  _onMouseDown(event) {
    if (!this.props.disabled && event.button === 0) {
      this.setState({
        isActive: true,
      });
      if (this.props.onMouseDown) {
        this.props.onMouseDown(event);
      }
    }
  }

  /**
   * Callback is called when wrapper receives mouseUp. Reset isActive.
   */
  _onMouseUp(event) {
    if (!this.props.disabled && event.button === 0) {
      this.setState({
        isActive: false,
      });
      if (this.props.onMouseUp) {
        this.props.onMouseUp(event);
      }
    }
  }

  /**
   * Callback is called when touch starts on wrapper. Conditionally sets isActive.
   */
  _onTouchStart(event) {
    if (!this.props.disabled && event.touches.length === 1) {
      this.setState({
        isActive: true,
      });
      if (this.props.onTouchStart) {
        this.props.onTouchStart(event);
      }
    }
  }

  /**
   * Callback is called when touch ends on wrapper. Reset isActive.
   */
  _onTouchEnd() {
    if (!this.props.disabled) {
      this.setState({
        isActive: false,
      });
      if (this.props.onTouchEnd) {
        this.props.onTouchEnd(event);
      }
    }
  }

  /**
   * On keyDown on wrapper if date-picker is not disabled and some day is focused:
   * 1. arrow keys will navigate calendar
   * 2. enter key will set dateValue of component
   * 3. space key will set / unset dateValue
   * 4. props.onKeyDown will be called
   */
  _onKeyDown(event) {
    if (!this.props.disabled) {
      if (this.state.focusedDay) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          this._focusOtherDay(7);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          this._focusOtherDay(-7);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          this._focusOtherDay(this.localeData.isRTL ? 1 : -1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          this._focusOtherDay(this.localeData.isRTL ? -1 : 1);
        } else if (event.key === 'Enter') {
          event.preventDefault();
          this._triggerSelectDate(new Date(this.state.focusedDay).getDate());
        } else if (event.key === ' ') {
          event.preventDefault();
          this._triggerToggleDate(new Date(this.state.focusedDay));
        }
      }

      if (this.props.onKeyDown) {
        this.props.onKeyDown(event);
      }
    }
  }

  // mouseEvent.button is supported by all browsers are are targeting: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
  /**
   * Callback is called when some day receives mouseDown.
   * It will conditionally set this.state.activeDay, this.state.focusedDay and call props.onDayMouseDown.
   */
  _onDayMouseDown(dayKey, day, event) {
    if (event.button === 0 && !this.props.disabled && !this.props.readOnly) {
      this._triggerSelectDate(day);
      this.setState({
        activeDay: dayKey,
        focusedDay: dayKey,
      });
      if (this.props.onDayMouseDown) {
        this.props.onDayMouseDown(event);
      }
    }
  }

  /**
   * Callback is called when some day receives mouseUp.
   * It will reset this.state.activeDay and call props.onDayMouseUp.
   */
  _onDayMouseUp(dayKey, event) {
    if (event.button === 0 && !this.props.disabled && !this.props.readOnly && this.state.activeDay === dayKey) {
      this.setState({
        activeDay: null,
      });
      if (this.props.onDayMouseUp) {
        this.props.onDayMouseUp(event);
      }
    }
  }

  /**
   * Callback is called when some day receives MouseOver. It will conditionally set this.state.hoveredDay.
   */
  _onDayMouseOver(dayKey) {
    if (!this.props.disabled && !this.props.readOnly) {
      this.setState({
        hoveredDay: dayKey,
      });
      if (this.props.onDayMouseOver) {
        this.props.onDayMouseOver(event);
      }
    }
  }

  /**
   * Callback is called when some day receives MouseOut. It will reset this.state.hoveredDay.
   */
  _onDayMouseOut(dayKey, event) {
    if (!this.props.disabled && !this.props.readOnly && event.button === 0 && this.state.hoveredDay === dayKey) {
      this.setState({
        hoveredDay: 0,
      });
      if (this.props.onDayMouseOut) {
        this.props.onDayMouseOut(event);
      }
    }
  }

  /**
   * Callback is called when some day receives touchStart.
   * It will conditionally set this.state.activeDay and call props.onDayTouchStart.
   */
  _onDayTouchStart(dayKey, day, event) {
    if (!this.props.disabled && !this.props.readOnly && event.touches.length === 1) {
      this._triggerSelectDate(day);
      this.setState({
        activeDay: dayKey,
      });
      if (this.props.onDayTouchStart) {
        this.props.onDayTouchStart(event);
      }
    }
  }

  /**
   * Callback is called when some day receives touchEnd.
   * It will reset this.state.activeDay and call props.onDayTouchEnd.
   */
  _onDayTouchEnd(dayKey, event) {
    if (!this.props.disabled && !this.props.readOnly && event.touches.length === 1) {
      if (this.state.activeDay === dayKey) {
        this.setState({
          activeDay: null,
        });
      }

      if (this.props.onDayTouchEnd) {
        this.props.onDayTouchEnd(event);
      }
    }
  }

  /**
   * Depending on whether component is controlled or uncontrolled the function will update this.state.dateValue.
   * It will also call props.onUpdate.
   */
  _triggerSelectDate(date) {
    if (!this.props.disabled && !this.props.readOnly) {
      let dateValue;
      if (date) {
        dateValue = new Date(this.state.year, this.state.month, date);
      }

      if (has(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(dateValue);
      } else if (!has(this.props, 'value')) {
        this.setState({
          dateValue: dateValue,
        });
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({
          value: dateValue,
        });
      }
    }
  }

  /**
   * Function will select / deselect date passed to it, it is used in case of 'Space' keyDown on a day.
   */
  _triggerToggleDate(date) {
    if (!this.props.disabled && !this.props.readOnly) {
      let dateValue;
      if (this.state.dateValue && date && this.state.dateValue.getDate() === date.getDate() && this.state.dateValue.getMonth() === date.getMonth() && this.state.dateValue.getYear() === date.getYear()) {
        dateValue = undefined;
      } else {
        dateValue = date.getDate();
      }

      this._triggerSelectDate(dateValue);
    }
  }

  /**
   * The function is mainly used when some day is focused and Arrow keys are pressed to navigate to some other day.
   * days is the number of days by which focused should be moved ahead or behind.
   */
  _focusOtherDay(days) {
    const focusedDay = new Date(this.state.focusedDay);
    const currentMonth = focusedDay.getMonth();
    focusedDay.setDate(focusedDay.getDate() + days);
    const nextFocusedDayKey = (focusedDay.getMonth() + 1) + '/' + focusedDay.getDate() + '/' + focusedDay.getFullYear();
    const nextMonth = focusedDay.getMonth();
    if (nextMonth !== currentMonth) {
      if ((nextMonth < currentMonth || (nextMonth === 11 && currentMonth === 0)) &&
          !(nextMonth === 0 && currentMonth === 11)) {
        this._decreaseMonthYear();
      } else if ((nextMonth > currentMonth || (nextMonth === 0 && currentMonth === 11)) &&
          !(nextMonth === 11 && currentMonth === 0)) {
        this._increaseMonthYear();
      }
    }

    this.setState({
      focusedDay: nextFocusedDayKey,
    });
  }

  /**
   * Callback is called when prevMonthNav receives mouse down.
   * If component is not disabled it will decrease the month and set active state for prevMonthNav.
   */
  _onPrevMonthNavMouseDown(event) {
    if (event.button === 0 && !this.props.disabled) {
      this._decreaseMonthYear();
      this.setState({
        isPrevMonthNavActive: true,
      });
      if (this.props.onPrevMonthNavMouseDown) {
        this.props.onPrevMonthNavMouseDown(event);
      }
    }
  }

  /**
   * Callback is called when prevMonthNav receives mouse up.
   * It will reset active state for prevMonthNav.
   */
  _onPrevMonthNavMouseUp(event) {
    if (event.button === 0 && !this.props.disabled) {
      this.setState({
        isPrevMonthNavActive: false,
      });
      if (this.props.onPrevMonthNavMouseUp) {
        this.props.onPrevMonthNavMouseUp(event);
      }
    }
  }

  /**
   * Callback is called when prevMonthNav receives touch start.
   * If component is not disabled it will decrease the month and set active state for prevMonthNav.
   */
  _onPrevMonthNavTouchStart(event) {
    if (!this.props.disabled && event.touches.length === 1) {
      this._decreaseMonthYear();
      this.setState({
        isPrevMonthNavActive: true,
      });
      if (this.props.onPrevMonthNavTouchStart) {
        this.props.onPrevMonthNavTouchStart(event);
      }
    }
  }

  /**
   * Callback is called when prevMonthNav receives touch end. It will reset active state for prevMonthNav.
   */
  _onPrevMonthNavTouchEnd() {
    if (!this.props.disabled) {
      this.setState({
        isPrevMonthNavActive: false,
      });
      if (this.props.onPrevMonthNavTouchEnd) {
        this.props.onPrevMonthNavTouchEnd(event);
      }
    }
  }

  /**
   * Callback is called when nextMonthNav receives mouseDown.
   * If component is not disabled it will increase the month and set active state for nextMonthNav.
   */
  _onNextMonthNavMouseDown(event) {
    if (event.button === 0 && !this.props.disabled) {
      this._increaseMonthYear();
      this.setState({
        isNextMonthNavActive: true,
      });
      if (this.props.onNextMonthNavMouseDown) {
        this.props.onNextMonthNavMouseDown(event);
      }
    }
  }

  /**
   * Callback is called when nextMonthNav receives mouse up. It will reset active state for nextMonthNav.
   */
  _onNextMonthNavMouseUp(event) {
    if (event.button === 0 && !this.props.disabled) {
      this.setState({
        isNextMonthNavActive: false,
      });
      if (this.props.onNextMonthNavMouseUp) {
        this.props.onNextMonthNavMouseUp(event);
      }
    }
  }

  /**
   * Callback is called when nextMonthNav receives touch start.
   * If component is not disabled it will increase the month and set active state for nextMonthNav.
   */
  _onNextMonthNavTouchStart(event) {
    if (!this.props.disabled && event.touches.length === 1) {
      this._increaseMonthYear();
      this.setState({
        isNextMonthNavActive: true,
      });
      if (this.props.onNextMonthNavTouchStart) {
        this.props.onNextMonthNavTouchStart(event);
      }
    }
  }

  /**
   * Callback is called when nextMonthNav receives touch end. It will reset active state for nextMonthNav.
   */
  _onNextMonthNavTouchEnd() {
    if (!this.props.disabled) {
      this.setState({
        isNextMonthNavActive: false,
      });
      if (this.props.onNextMonthNavTouchEnd) {
        this.props.onNextMonthNavTouchEnd(event);
      }
    }
  }

  /**
   * The function will decrease current month in state. It will also call props.onMonthYearChange.
   */
  _decreaseMonthYear() {
    let newMonth;
    let newYear;
    if (this.state.month === 0) {
      newMonth = 11;
      newYear = this.state.year - 1;
    } else {
      newMonth = this.state.month - 1;
      newYear = this.state.year;
    }

    this.setState({
      month: newMonth,
      year: newYear,
    });
    if (this.props.onMonthYearChange) {
      this.props.onMonthYearChange(newMonth + 1, newYear);
    }
  }

  /**
   * The function will increase current month in state. It will also call props.onMonthYearChange.
   */
  _increaseMonthYear() {
    let newMonth;
    let newYear;
    if (this.state.month === 11) {
      newMonth = 0;
      newYear = this.state.year + 1;
    } else {
      newMonth = this.state.month + 1;
      newYear = this.state.year;
    }

    this.setState({
      month: newMonth,
      year: newYear,
    });
    if (this.props.onMonthYearChange) {
      this.props.onMonthYearChange(newMonth + 1, newYear);
    }
  }

  _renderPrevMonthNav(prevMonthNavStyle) {
    if (this.props.disabled) return undefined;
    return (
      <div onMouseDown={ ::this._onPrevMonthNavMouseDown }
           onMouseUp={ ::this._onPrevMonthNavMouseUp }
           onTouchStart={ ::this._onPrevMonthNavTouchStart }
           onTouchEnd={ ::this._onPrevMonthNavTouchEnd }
           style={ prevMonthNavStyle }
           className={ unionClassNames(this.props.prevMonthNavClassName, this.pseudoStyleIds.prevMonthNavStyleId) }>
        left
      </div>
    );
  }

  _renderNextMonthNav(nextMonthNavStyle) {
    if (this.props.disabled) return undefined;
    return (
      <div onMouseDown={ ::this._onNextMonthNavMouseDown }
           onMouseUp={ ::this._onNextMonthNavMouseUp }
           onTouchStart={ ::this._onNextMonthNavTouchStart }
           onTouchEnd={ ::this._onNextMonthNavTouchEnd }
           style= { nextMonthNavStyle }
           className={ unionClassNames(this.props.nextMonthNavClassName, this.pseudoStyleIds.nextMonthNavStyleId) }>
        right
      </div>
    );
  }

  /**
   * Function will return jsx for rendering the nav bar for calendar.
   * Depending on following rules it will apply styles to prevMonthNav and nextMonthNav:
   * 1. If disabled hide navs
   * 2. If active apply activeStyles
   */
  _renderNavBar() {
    const navBarStyle = {
      ...defaultStyle.navBarStyle,
      ...this.props.navBarStyle,
    };
    const monthLabelStyle = {
      ...defaultStyle.monthLabelStyle,
      ...this.props.monthLabelStyle,
    };
    let prevMonthNavStyle = {
      ...defaultStyle.prevMonthNavStyle,
      ...this.props.prevMonthNavStyle,
    };
    let nextMonthNavStyle = {
      ...defaultStyle.nextMonthNavStyle,
      ...this.props.nextMonthNavStyle,
    };
    if (this.state.isPrevMonthNavActive) {
      prevMonthNavStyle = {
        ...prevMonthNavStyle,
        ...defaultStyle.activePrevMonthNavStyle,
        ...this.props.activePrevMonthNavStyle,
      };
    } else if (this.state.isNextMonthNavActive) {
      nextMonthNavStyle = {
        ...nextMonthNavStyle,
        ...defaultStyle.activeNextMonthNavStyle,
        ...this.props.activeNextMonthNavStyle,
      };
    }

    return (
      <div style={ navBarStyle }
           className={ this.props.navBarClassName }>
        { this._renderPrevMonthNav(prevMonthNavStyle) }
        <span style={ monthLabelStyle }
              className={ this.props.monthLabelClassName }
              role="heading"
              /*
                This label has an id as suggested in http://www.w3.org/TR/wai-aria-practices/#datepicker
              */
              id={ `${this.state.month}-${this.state.year}` }>
          { `${this.localeData.monthNames[this.state.month]} ${this.state.year}` }
        </span>
        { this._renderNextMonthNav(nextMonthNavStyle) }
      </div>
    );
  }

  /**
   * Function will return jsx for rendering the week header for calendar.
   * Disabled styles will be applied for disabled date-picker.
   * Day headers will be rendered using locale information.
   */
  _renderWeekHeader() {
    let dayLabelStyle = {
      ...defaultStyle.dayLabelStyle,
      ...this.props.dayLabelStyle,
    };
    if (this.props.disabled) {
      dayLabelStyle = {
        ...dayLabelStyle,
        ...defaultStyle.disabledDayLabelStyle,
        ...this.props.disabledDayLabelStyle,
      };
    }

    const weekendLabelStyle = {
      ...dayLabelStyle,
      ...defaultStyle.weekendLabelStyle,
      ...this.props.weekendLabelStyle,
    };
    let dayNames = shift(this.localeData.dayNamesMin, this.localeData.firstDay);
    dayNames = this.localeData.isRTL ? reverse(dayNames) : dayNames;
    let weekendIndex = ((7 - this.localeData.firstDay) % 7) + this.localeData.weekEnd;
    weekendIndex = this.localeData.isRTL ? 6 - weekendIndex : weekendIndex;

    return map(dayNames, (dayAbbr, index) => {
      return (
        <span key={ 'dayAbbr-' + index }
              style={ (this.props.styleWeekend && index === weekendIndex) ? weekendLabelStyle : dayLabelStyle }
              className={ this.props.dayLabelClassName }
              role="columnheader">
            { dayAbbr }
          </span>
      );
    });
  }

  // According to http://www.w3.org/TR/wai-aria-1.1/#aria-current an empty value for aria-current indicated false.
  /**
   * Function will return jsx for rendering the a day.
   * It will apply various styles in sequence as below (styles will be additive):
   * 1. If component is readOnly apply readOnly styles
   * 2. If component is disabled apply disabled styles
   *    - If component is disabled and hovered apply disableHover styles
   * 3. If day is weekend apply weekendStyle
   * 4. If its day in current month and component is not disabled or readOnly:
   *    - If its current day apply todayStyle
   *    - If this is selected day apply selectedDayStyle
   *    - If component is hovered apply hover styles
   *    - If component is hovered and active apply hoveredStyles + activeStyles
   *    - If component is hovered and not active but focused and preventFocusStyleForTouchAndClick apply focus styles
   * 5. If current day represents other months day in calendar apply otherMonthDayStyle
   */
  _renderDay(currentDate, index) {
    const day = currentDate.getDate();
    const isNotOtherMonth = currentDate.getMonth() === this.state.month;
    const dayKey = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();

    let ariaCurrent = '';
    let ariaSelected = false;

    let dayStyle = {
      ...defaultStyle.dayStyle,
      ...this.props.dayStyle,
    };

    if (this.props.readOnly) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.readOnlyDayStyle,
        ...this.props.readOnlyDayStyle,
      };
    }

    if (this.props.disabled) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.disabledDayStyle,
        ...this.props.disabledDayStyle,
      };
      if (isNotOtherMonth && this.state.hoveredDay === dayKey) {
        dayStyle = {
          ...dayStyle,
          ...defaultStyle.disabledHoverDayStyle,
          ...this.props.disabledHoverDayStyle,
        };
      }
    }

    if (this.props.styleWeekend && currentDate.getDay() === this.localeData.weekEnd) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.weekendStyle,
        ...this.props.weekendStyle,
      };
    }

    if (isNotOtherMonth) {
      if (day === CURRENT_DATE && this.state.month === CURRENT_MONTH && this.state.year === CURRENT_YEAR) {
        dayStyle = {
          ...dayStyle,
          ...defaultStyle.todayStyle,
          ...this.props.todayStyle,
        };
        ariaCurrent = 'date';
      }

      if (this.state.dateValue && day === this.state.dateValue.getDate()
        && currentDate.getMonth() === this.state.dateValue.getMonth() && currentDate.getYear() === this.state.dateValue.getYear()) {
        dayStyle = {
          ...dayStyle,
          ...defaultStyle.selectedDayStyle,
          ...this.props.selectedDayStyle,
        };
        ariaSelected = true;
      }

      if (!this.props.disabled && this.state.focusedDay === dayKey) {
        dayStyle = {
          ...dayStyle,
          outline: 0,
        };
        dayStyle = {
          ...dayStyle,
          ...defaultStyle.focusDayStyle,
          ...this.props.focusDayStyle,
        };
      }

      if (!this.props.disabled && this.state.hoveredDay === dayKey) {
        dayStyle = {
          ...dayStyle,
          ...defaultStyle.hoverDayStyle,
          ...this.props.hoverDayStyle,
        };
      }

      if (!this.props.disabled && !this.props.readOnly && this.state.activeDay === dayKey) {
        dayStyle = {
          ...dayStyle,
          ...defaultStyle.activeDayStyle,
          ...this.props.activeDayStyle,
        };
      }
    } else {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.otherMonthDayStyle,
        ...this.props.otherMonthDayStyle,
      };
    }

    if (isNotOtherMonth) {
      return (
        <span key={ 'day-' + index }
              ref={ dayKey }
              onMouseDown={ this._onDayMouseDown.bind(this, dayKey, day) }
              onMouseUp={ this._onDayMouseUp.bind(this, dayKey) }
              onMouseOver={ this._onDayMouseOver.bind(this, dayKey) }
              onMouseOut={ this._onDayMouseOut.bind(this, dayKey) }
              onTouchStart={ this._onDayTouchStart.bind(this, dayKey, day) }
              onTouchEnd={ this._onDayTouchEnd.bind(this, dayKey) }
              aria-current={ ariaCurrent }
              aria-selected={ ariaSelected }
              style={ dayStyle }
              className={ this.props.dayClassName }
              role="gridcell"
          {...this.dayProps} >
          { this.props.renderDay ? this.props.renderDay(currentDate) : day }
        </span>
      );
    }

    const renderedDay = this.props.renderDay ? this.props.renderDay(currentDate) : day;
    return (
      <span key={ 'day-' + index }
            style={ dayStyle }
            className={ this.props.dayClassName }
            role="gridcell"
        {...this.dayProps} >
        { this.props.showOtherMonthDate ? renderedDay : ''}
      </span>
    );
  }

  /**
   * Function will render:
   * - main calendar component
   * - call methods to render navBar and week header
   * - get array of weeks in a month and for each day in the week call method to render day
   *
   * It will apply styles sequentially according to Wrapper according to following rules:
   * 1. If component is readOnly apply readOnlyStyle
   * 2. If component is disabled apply disabledStyle
   *    - If disabled component is hovered apply disabledHoverStyle
   * 3. If component is not disabled:
   *    - If component is hovered apply hover style
   *    - If component is hovered and active apply hover + active styles
   *    - If component is hovered and focused but not active and preventFocusStyleForTouchAndClick is true apply focusStyles
   */
  render() {
    let style = {
      ...defaultStyle.style,
      ...this.props.style,
    };
    if (this.props.readOnly) {
      style = {
        ...style,
        ...defaultStyle.readOnlyStyle,
        ...this.props.readOnlyStyle,
      };
    }

    if (this.props.disabled) {
      style = {
        ...style,
        ...defaultStyle.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    if (this.preventFocusStyleForTouchAndClick && this.state.isFocused) {
      style = {
        ...style,
        ...defaultStyle.focusStyle,
        ...this.props.focusStyle,
      };
    }

    if (this.state.isActive) {
      style = {
        ...style,
        ...defaultStyle.activeStyle,
        ...this.props.activeStyle,
      };
    }

    const weekArray = getWeekArrayForMonth(this.state.month, this.state.year, this.localeData.firstDay);
    const tabIndex = !this.props.disabled ? this.props.tabIndex : false;

    return (
      <div ref="datePicker"
           tabIndex={ tabIndex }
           disabled={ this.props.disabled }
           onFocus={ ::this._onFocus }
           onBlur={ ::this._onBlur }
           onKeyDown={ ::this._onKeyDown }
           onMouseDown={ ::this._onMouseDown }
           onMouseUp={ ::this._onMouseUp }
           onTouchStart={ ::this._onTouchStart }
           onTouchEnd={ ::this._onTouchEnd }
           aria-label={ this.props['aria-label'] }
           aria-disabled={ this.props.disabled }
           aria-readonly={ this.props.readOnly }
           style={ style }
           className={ unionClassNames(this.props.wrapperClassName, this.pseudoStyleIds.styleId) }
           {...this.wrapperProps} >
        { this._renderNavBar() }
        <div role="grid" style={ defaultStyle.weekGroupStyle}>
          { this._renderWeekHeader() }
          {
            map(weekArray, (week) => {
              const weekDays = this.localeData.isRTL ? reverse(week) : week;
              return map(weekDays, (day, dayIndex) => {
                return this._renderDay(day, dayIndex);
              });
            })
          }
        </div>
      </div>
    );
  }
}
