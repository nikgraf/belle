import React, {Component} from 'react';
import {injectStyles, removeAllStyles} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import {has, extend, map} from '../utils/helpers';
import {getWeekArrayForMonth, MONTHS, DAYS_ABBR, CURRENT_DATE, CURRENT_MONTH, CURRENT_YEAR, getMaxDateForMonth} from '../utils/date-helpers';
import style from '../style/date-picker';
import config from '../config/datePicker';

// Enable React Touch Events
React.initializeTouchEvents(true);

/**
 * DatePicker React Component.
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
      dateValue: dateValue,
      month: properties.month - 1,
      year: properties.year
    };

    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;
  }

  static displayName = 'Belle DatePicker';

  static propTypes = {
    defaultValue: React.PropTypes.instanceOf(Date),
    value: React.PropTypes.instanceOf(Date),
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.instanceOf(Date),
      requestChange: React.PropTypes.func.isRequired
    }),
    month: React.PropTypes.number,
    year: React.PropTypes.number,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onDayFocus: React.PropTypes.func,
    onDayBlur: React.PropTypes.func,
    onDayKeyDown: React.PropTypes.func,
    onDayMouseDown: React.PropTypes.func,
    onDayMouseUp: React.PropTypes.func,
    onDayTouchStart: React.PropTypes.func,
    onDayTouchEnd: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    onMonthChange: React.PropTypes.func,
    tabIndex: React.PropTypes.number,
    'aria-label': React.PropTypes.string,
    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    // ClassNames
    wrapperClassName: React.PropTypes.object,
    navBarClassName: React.PropTypes.object,
    leftNavClassName: React.PropTypes.object,
    rightNavClassName: React.PropTypes.object,
    monthLblClassName: React.PropTypes.object,
    dayLblClassName: React.PropTypes.object,
    dayClassName: React.PropTypes.object,
    // wrapper styles
    wrapperStyle: React.PropTypes.object,
    disabledWrapperStyle: React.PropTypes.object,
    readOnlyWrapperStyle: React.PropTypes.object,
    hoverWrapperStyle: React.PropTypes.object,
    activeWrapperStyle: React.PropTypes.object,
    focusWrapperStyle: React.PropTypes.object,
    disabledHoverWrapperStyle: React.PropTypes.object,
    // navbar styles
    navBarStyle: React.PropTypes.object,
    disabledNavBarStyle: React.PropTypes.object,
    readOnlyNavBarStyle: React.PropTypes.object,
    hoverNavBarStyle: React.PropTypes.object,
    // leftnav styles
    leftNavStyle: React.PropTypes.object,
    disabledLeftNavStyle: React.PropTypes.object,
    readOnlyLeftNavStyle: React.PropTypes.object,
    hoverLeftNavStyle: React.PropTypes.object,
    activeLeftNavStyle: React.PropTypes.object,
    focusLeftNavStyle: React.PropTypes.object,
    // rightnav styles
    rightNavStyle: React.PropTypes.object,
    disabledRightNavStyle: React.PropTypes.object,
    readOnlyRightNavStyle: React.PropTypes.object,
    hoverRightNavStyle: React.PropTypes.object,
    activeRightNavStyle: React.PropTypes.object,
    focusRightNavStyle: React.PropTypes.object,
    // monthlbl styles
    monthLblStyle: React.PropTypes.object,
    disabledMonthLblStyle: React.PropTypes.object,
    readOnlyMonthLblStyle: React.PropTypes.object,
    hoverMonthLblStyle: React.PropTypes.object,
    // week header style
    weekHeaderStyle: React.PropTypes.object,
    disabledWeekHeaderStyle: React.PropTypes.object,
    readOnlyWeekHeaderStyle: React.PropTypes.object,
    hoverWeekHeaderStyle: React.PropTypes.object,
    // daylbl styles
    dayLblStyle: React.PropTypes.object,
    disabledDayLblStyle: React.PropTypes.object,
    readOnlyDayLblStyle: React.PropTypes.object,
    hoverDayLblStyle: React.PropTypes.object,
    // week style
    weekStyle: React.PropTypes.object,
    disabledWeekStyle: React.PropTypes.object,
    readOnlyWeekStyle: React.PropTypes.object,
    hoverWeekStyle: React.PropTypes.object,
    // day styles
    dayStyle: React.PropTypes.object,
    disabledDayStyle: React.PropTypes.object,
    readOnlyDayStyle: React.PropTypes.object,
    hoverDayStyle: React.PropTypes.object,
    activeDayStyle: React.PropTypes.object,
    focusDayStyle: React.PropTypes.object,
    disabledHoverDayStyle: React.PropTypes.object,
    todayStyle: React.PropTypes.object,
    selectedDayStyle: React.PropTypes.object,
    otherMonthDayStyle: React.PropTypes.object
  };

  static defaultProps = {
    month: CURRENT_MONTH + 1,
    year: CURRENT_YEAR,
    tabIndex: 0,
    'aria-label': 'Calendar',
    disabled: false,
    readOnly: false
  };

  /**
   * Injects pseudo classes for styles into the DOM.
   */
  static updatePseudoClassStyle(pseudoStyleIds, properties, preventFocusStyleForTouchAndClick) {
    const styles = [];
    ['navBar', 'leftNav', 'rightNav', 'monthLbl', 'dayLbl', 'weekHeader'].forEach((elm) => {
      const elmFirstCaps = elm[0].toUpperCase() + elm.substr(1, elm.length);
      styles.push({
        id: pseudoStyleIds[elm + 'StyleId'],
        style: extend({}, style['hover' + elmFirstCaps + 'Style'], properties['hover' + elmFirstCaps + 'Style']),
        pseudoClass: 'hover'
      });
    });
    ['wrapper', 'navBar', 'leftNav', 'rightNav', 'monthLbl', 'dayLbl', 'weekHeader', 'day'].forEach((elm) => {
      const elmFirstCaps = elm[0].toUpperCase() + elm.substr(1, elm.length);
      let focusStyle;
      if (preventFocusStyleForTouchAndClick) {
        focusStyle = { outline: 0 };
      } else {
        focusStyle = extend({}, style['focus' + elmFirstCaps + 'Style'], properties['focus' + elmFirstCaps + 'Style']);
      }
      styles.push({
        id: pseudoStyleIds[elm + 'StyleId'],
        style: focusStyle,
        pseudoClass: 'focus'
      });
    });
    injectStyles(styles);
  }

  /**
   * Generates the style-id based on React's unique DOM node id.
   * Calls function to inject the pseudo classes into the dom.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this.pseudoStyleIds = {};
    this.pseudoStyleIds.wrapperStyleId = `wrapper-style-id${id}`;
    this.pseudoStyleIds.navBarStyleId = `navBar-style-id${id}`;
    this.pseudoStyleIds.leftNavStyleId = `leftNav-style-id${id}`;
    this.pseudoStyleIds.rightNavStyleId = `rightNav-style-id${id}`;
    this.pseudoStyleIds.monthLblStyleId = `monthLbl-style-id${id}`;
    this.pseudoStyleIds.dayLblStyleId = `dayLbl-style-id${id}`;
    this.pseudoStyleIds.dayStyleId = `day-style-id${id}`;
    DatePicker.updatePseudoClassStyle(this.pseudoStyleIds, this.props, this.preventFocusStyleForTouchAndClick);
  }

  /**
   * FUnction will update component state and styles as new props are received.
   */
  componentWillReceiveProps(properties) {
    let dateValue;
    if (has(properties, 'valueLink')) {
      dateValue = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      dateValue = properties.value;
    } else {
      dateValue = this.state.dateValue;
    }

    this.setState({
      dateValue: dateValue,
      month: properties.month - 1,
      year: properties.year
    });

    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;

    removeAllStyles(Object.keys(this.pseudoStyleIds));
    DatePicker.updatePseudoClassStyle(this.pseudoStyleIds, properties, this.preventFocusStyleForTouchAndClick);
  }

  /**
   * Removes pseudo classes from the DOM once component gets removed.
   */
  componentWillUnmount() {
    removeAllStyles(Object.keys(this.pseudoStyleIds));
  }

  /**
   * Callback is called when wrapper is focused.
   * It will conditionally set isWrapperFocused and call props.onFocus.
   */
  _onWrapperFocus(event) {
    if (!this.props.disabled && !this.state.isWrapperActive) {
      this.setState({
        isWrapperFocused: true
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * Callback is called when wrapper is blurred.
   * It will reset isWrapperFocused and call props.onBlur.
   */
  _onWrapperBlur(event) {
    if (!this.props.disabled) {
      this.setState({
        isWrapperFocused: false
      });
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  /**
   * Callback is called when wrapper receives mouseDown.
   * Conditionally set isWrapperActive.
   */
  _onWrapperMouseDown(event) {
    if (!this.props.disabled && event.button === 0) {
      this.setState({
        isWrapperActive: true
      });
    }
  }

  /**
   * Callback is called when wrapper receives mouseUp.
   * Reset isWrapperActive.
   */
  _onWrapperMouseUp(event) {
    if (!this.props.disabled && event.button === 0) {
      this.setState({
        isWrapperActive: false
      });
    }
  }

  /**
   * Callback is called when mouse enters wrapper.
   * Conditionally set isWrapperHovered.
   */
  _onWrapperMouseEnter() {
    this.setState({
      isWrapperHovered: true
    });
  }

  /**
   * Callback is called when mouse leaves wrapper.
   * Reset isWrapperHovered.
   */
  _onWrapperMouseLeave() {
    this.setState({
      isWrapperHovered: false
    });
  }

  /**
   * Callback is called when touch starts on wrapper.
   * Conditionally sets isWrapperActive.
   */
  _onWrapperTouchStart() {
    if (!this.props.disabled && event.touches.length === 1) {
      this.setState({
        isWrapperActive: true
      });
    }
  }

  /**
   * Callback is called when touch ends on wrapper.
   * Reset isWrapperActive.
   */
  _onWrapperTouchEnd() {
    if (!this.props.disabled) {
      this.setState({
        isWrapperActive: false
      });
    }
  }

  /**
   * The callback is called when wrapper receives keyDown event.
   * 1. If wrapper is focused: ArrowLeft/ ArrowRight keys will increase or decrease month.
   * 2. If left nav if focused: Enter key will decrease month.
   * 3. If right nav is focused: Enter key will increase the month.
   * 4. Id some day is focused: arrow keys will navigate calendar and enter key will change dateValue of component.
   * Function will call props.onDayKeyDown or props.onKeyDown depending on whether wrapper or day is focused.
   */
  _onWrapperKeyDown(event) {
    if (!this.props.disabled) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (this.state.focusedDay) {
          this._focusNextWeeksDay();
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (this.state.focusedDay) {
          this._focusPreviousWeeksDay();
        }
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (this.state.focusedDay) {
          this._focusPreviousDay();
        } else if (this.state.isWrapperFocused) {
          this._decreaseMonth();
        }
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (this.state.focusedDay) {
          this._focusNextDay();
        } else if (this.state.isWrapperFocused) {
          this._increaseMonth();
        }
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (this.state.focusedDay) {
          this._selectDate(this.state.focusedDay);
        } else if (this.state.isLeftNavFocused) {
          this._decreaseMonth();
        } else if (this.state.isRightNavFocused) {
          this._increaseMonth();
        }
      }
    }

    if (this.state.focusedDay && this.props.onDayKeyDown) {
      this.props.onDayKeyDown(event);
    } if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  /**
   * Callback is called when some day received focus.
   * It will conditionally set this.state.focusedDay to value of focused day and call props.onDayFocus.
   */
  _onDayFocus(day, event) {
    if (!this.props.disabled && !this.props.readOnly && !(this.state.activeDay && this.state.activeDay === day)) {
      this.setState({
        focusedDay: day
      });
    }

    if (this.props.onDayFocus) {
      this.props.onDayFocus(event);
    }
  }

  /**
   * Callback is called when some day receives blur.
   * It will reset this.state.focusedDay and call props.onDayBlur.
   */
  _onDayBlur(day, event) {
    if (!this.props.disabled && this.state.focusedDay && this.state.focusedDay === day) {
      this.setState({
        focusedDay: 0
      });
    }

    if (this.props.onDayBlur) {
      this.props.onDayBlur(event);
    }
  }

  // mouseEvent.button is supported by all browsers are are targeting: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
  /**
   * Callback is called when some day receives mouseDown.
   * It will conditionally set this.state.activeDay and call props.onDayMouseDown.
   */
  _onDayMouseDown(day, event) {
    if (event.button === 0 && !this.props.disabled && !this.props.readOnly) {
      this._selectDate(day);
      this.setState({
        activeDay: day
      });
    }

    if (this.props.onDayMouseDown) {
      this.props.onDayMouseDown(event);
    }
  }

  /**
   * Callback is called when some day receives mouseUp.
   * It will reset this.state.activeDay and call props.onDayMouseUp.
   */
  _onDayMouseUp(day, event) {
    if (event.button === 0 && !this.props.disabled && !this.props.readOnly && this.state.activeDay === day) {
      this.setState({
        activeDay: 0
      });
    }

    if (this.props.onDayMouseUp) {
      this.props.onDayMouseUp(event);
    }
  }

  /**
   * Callback is called when some day receives mouseEnter.
   * It will conditionally set this.state.hoveredDay.
   */
  _onDayMouseEnter(day, event) {
    if (!this.props.disabled && !this.props.readOnly && event.button === 0) {
      this.setState({
        hoveredDay: day
      });
    }
  }

  /**
   * Callback is called when some day receives mouseLeave.
   * It will reset this.state.hoveredDay.
   */
  _onDayMouseLeave(day, event) {
    if (!this.props.disabled && !this.props.readOnly && event.button === 0 && this.state.hoveredDay === day) {
      this.setState({
        hoveredDay: 0
      });
    }
  }

  /**
   * Callback is called when some day receives touchStart.
   * It will conditionally set this.state.activeDay and call props.onDayTouchStart.
   */
  _onDayTouchStart(day) {
    if (!this.props.disabled && !this.props.readOnly && event.touches.length === 1) {
      this._selectDate(day);
      this.setState({
        activeDay: day
      });
    }

    if (this.props.onDayTouchStart) {
      this.props.onDayTouchStart(event);
    }
  }

  /**
   * Callback is called when some day receives touchEnd.
   * It will reset this.state.activeDay and call props.onDayTouchEnd.
   */
  _onDayTouchEnd(day) {
    if (!this.props.disabled && !this.props.readOnly && event.touches.length === 1 && this.state.activeDay === day) {
      this.setState({
        activeDay: 0
      });
    }

    if (this.props.onDayTouchEnd) {
      this.props.onDayTouchEnd(event);
    }
  }

  /**
   * Depending on whether component is controlled or uncontrolled the function will update this.state.dateValue.constructor.
   * It will also call props.onUpdate.
   */
  _selectDate(date) {
    if (!this.props.disabled && !this.props.readOnly) {
      const dateValue = new Date(this.state.year, this.state.month, date);
      if (has(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(dateValue);
      } else if (!has(this.props, 'value')) {
        this.setState({
          dateValue: dateValue
        });
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({
          value: dateValue
        });
      }
    }
  }

  /**
   * Function will return jsx for rendering the nav bar for calendar.
   * Depending on following rules it will apply various styles:
   * 1. If component is readOnly apply readOnly styles
   * 2. If component is disabled apply disabled styles
   * 3. If component is not disabled
   *    - If its active apply activeStyles
   *    - If its not active and is focused also preventFocusStyleForTouchAndClick is true apply focus styles
   * (If preventFocusStyleForTouchAndClick is false focus styles already get applied by pseudo classes).
   */
  _getNavBar() {
    let navBarStyle = extend({}, style.navBarStyle, this.props.navBarStyle);
    let leftNavStyle = extend({}, style.leftNavStyle, this.props.leftNavStyle);
    let rightNavStyle = extend({}, style.rightNavStyle, this.props.rightNavStyle);
    let monthLblStyle = extend({}, style.monthLblStyle, this.props.monthLblStyle);
    if (this.props.readOnly) {
      navBarStyle = extend(navBarStyle, style.readOnlyNavBarStyle, this.props.readOnlyNavBarStyle);
      leftNavStyle = extend(leftNavStyle, style.readOnlyLeftNavStyle, this.props.readOnlyLeftNavStyle);
      rightNavStyle = extend(rightNavStyle, style.readOnlyRightNavStyle, this.props.readOnlyRightNavStyle);
      monthLblStyle = extend(monthLblStyle, style.readOnlyMonthLblStyle, this.props.readOnlyMonthLblStyle);
    }
    if (this.props.disabled) {
      navBarStyle = extend(navBarStyle, style.disabledNavBarStyle, this.props.disabledNavBarStyle);
      leftNavStyle = extend(leftNavStyle, style.disabledLeftNavStyle, this.props.disabledLeftNavStyle);
      rightNavStyle = extend(rightNavStyle, style.disabledRightNavStyle, this.props.disabledRightNavStyle);
      monthLblStyle = extend(monthLblStyle, style.disabledMonthLblStyle, this.props.disabledMonthLblStyle);
    } else {
      if (this.state.isLeftNavActive) {
        leftNavStyle = extend(leftNavStyle, style.activeLeftNavStyle, this.props.activeLeftNavStyle);
      } else if (this.preventFocusStyleForTouchAndClick && this.state.isLeftNavFocused) {
        leftNavStyle = extend(leftNavStyle, style.focusLeftNavStyle, this.props.focusLeftNavStyle);
      }
      if (this.state.isRightNavActive) {
        rightNavStyle = extend(rightNavStyle, style.activeRightNavStyle, this.props.activeRightNavStyle);
      } else if (this.preventFocusStyleForTouchAndClick && this.state.isRightNavFocused) {
        rightNavStyle = extend(rightNavStyle, style.focusRightNavStyle, this.props.focusRightNavStyle);
      }
    }

    return (
      <div style={ navBarStyle }
           className={ unionClassNames(this.props.navBarClassName, this.pseudoStyleIds.navBarStyleId) }>
          <span tabIndex={ this.props.tabIndex }
                onMouseDown={ this._onLeftNavMouseDown.bind(this) }
                onMouseUp={ this._onLeftNavMouseUp.bind(this) }
                onTouchStart={ this._onLeftNavTouchStart.bind(this) }
                onTouchEnd={ this._onLeftNavTouchEnd.bind(this) }
                onFocus={ this._onLeftNavFocus.bind(this)}
                onBlur={ this._onLeftNavBlur.bind(this)}
                style= { leftNavStyle }
                className={ unionClassNames(this.props.leftNavClassName, this.pseudoStyleIds.leftNavStyleId) }>&lt;</span>
          <span style={ monthLblStyle }
                className={ unionClassNames(this.props.monthLblClassName, this.pseudoStyleIds.monthLblStyleId) }>
            { MONTHS[this.state.month] + '-' + this.state.year }
          </span>
          <span tabIndex={ this.props.tabIndex }
                onMouseDown={ this._onRightNavMouseDown.bind(this) }
                onMouseUp={ this._onRightNavMouseUp.bind(this) }
                onTouchStart={ this._onRightNavTouchStart.bind(this) }
                onTouchEnd={ this._onRightNavTouchEnd.bind(this) }
                onFocus={ this._onRightNavFocus.bind(this)}
                onBlur={ this._onRightNavBlur.bind(this)}
                style= { rightNavStyle }
                className={ unionClassNames(this.props.rightNavClassName, this.pseudoStyleIds.rightNavStyleId) }>&gt;</span>
      </div>
    );
  }

  /**
   * Function will return jsx for rendering the week header for calendar.
   * Depending on following rules it will apply various styles:
   * 1. If component is readOnly apply readOnly styles
   * 2. If component is disabled apply disabled styles
   */
  _getDaysHeader() {
    let dayLblStyle = extend({}, style.dayLblStyle, this.props.dayLblStyle);
    let weekHeaderStyle = extend({}, style.weekHeaderStyle, this.props.weekHeaderStyle);
    if (this.props.readOnly) {
      dayLblStyle = extend(dayLblStyle, style.readOnlyDayLblStyle, this.props.readOnlyDayLblStyle);
      weekHeaderStyle = extend(weekHeaderStyle, style.weekHeaderStyle, this.props.weekHeaderStyle);
    }
    if (this.props.disabled) {
      dayLblStyle = extend(dayLblStyle, style.disabledDayLblStyle, this.props.disabledDayLblStyle);
      weekHeaderStyle = extend(weekHeaderStyle, style.disabledWeekHeaderStyle, this.props.disabledWeekHeaderStyle);
    }

    return (
      <div style={ weekHeaderStyle }>
        {
          map(DAYS_ABBR, (dayAbbr, index) => {
            return (
              <span key={ 'dayAbbr-' + index }
                    style={ dayLblStyle }
                    className={ unionClassNames(this.props.dayLblClassName, this.pseudoStyleIds.dayLblStyleId) }>
                  { dayAbbr }
                </span>
            );
          })
        }
      </div>
    );
  }

  // According to http://www.w3.org/TR/wai-aria-1.1/#aria-current an empty value for aria-current indicated false.
  /**
   * Function will return jsx for rendering the a day.
   * It will apply various styles in sequence as below (styles will be additive):
   * 1. If component is readOnly apply readOnly styles
   * 2. If component is disabled apply disabled styles
   *    - If component is disabled and hovered apply diableHover styles
   * 3. If its day in current month and component is not disabled or readOnly:
   *    - If component is hovered apply hover styles
   *    - If component is hovered and active apply hoveredStyles + activeStyles
   *    - If component is hovered and not active but focused and preventFocusStyleForTouchAndClick apply focus styles
   * 4. If current day represents other months day in calendar apply otherMonthDayStyle
   * 5. If its current day apply todayStyle
   * 6. If this is selected day apply selectedDayStyle
   */
  _getDayFragment(day, index) {
    const dateValue = this.state.dateValue;
    let ariaCurrent = '';
    let ariaSelected = false;

    let dayStyle = extend({}, style.dayStyle, this.props.dayStyle);

    if (this.props.readOnly) {
      dayStyle = extend(dayStyle, style.readOnlyDayStyle, this.props.readOnlyDayStyle);
    }

    if (this.props.disabled) {
      dayStyle = extend(dayStyle, style.disabledDayStyle, this.props.disabledDayStyle);
      if (day && this.state.hoveredDay === day) {
        dayStyle = extend(dayStyle, style.disabledHoverDayStyle, this.props.disabledHoverDayStyle);
      }
    }

    if (day && !this.props.readOnly && !this.props.disabled) {
      if (this.state.hoveredDay === day) {
        dayStyle = extend(dayStyle, style.hoverDayStyle, this.props.hoverDayStyle);
      }
      if (this.state.activeDay === day) {
        dayStyle = extend(dayStyle, style.activeDayStyle, this.props.activeDayStyle);
      } else {
        if (this.preventFocusStyleForTouchAndClick && this.state.focusedDay === day) {
          dayStyle = extend(dayStyle, style.focusDayStyle, this.props.focusDayStyle);
        }
      }
    }

    if (!day) {
      dayStyle = extend(dayStyle, style.otherMonthDayStyle, this.props.otherMonthDayStyle);
    }

    if (day === CURRENT_DATE && this.state.month === CURRENT_MONTH && this.state.year === CURRENT_YEAR) {
      dayStyle = extend(dayStyle, style.todayStyle, this.props.todayStyle);
      ariaCurrent = 'date';
    }

    if (this.state.activeDay !== day && dateValue && day === dateValue.getDate() && this.state.month === dateValue.getMonth() && this.state.year === dateValue.getFullYear()) {
      dayStyle = extend(dayStyle, style.selectedDayStyle, this.props.selectedDayStyle);
      ariaSelected = true;
    }

    // Setting tabIndex to false makes the div non-focuseable, its still focuseable with value of -1.
    const tabIndex = (!this.props.disabled && !this.props.readOnly && day) ? this.props.tabIndex : false;
    return (<span tabIndex={ tabIndex }
                  key={ 'day-' + index }
                  ref={ 'day-' + day }
                  onMouseDown={ this._onDayMouseDown.bind(this, day) }
                  onMouseUp={ this._onDayMouseUp.bind(this, day) }
                  onMouseEnter={ this._onDayMouseEnter.bind(this, day) }
                  onMouseLeave={ this._onDayMouseLeave.bind(this, day) }
                  onTouchStart={ this._onDayTouchStart.bind(this, day) }
                  onTouchEnd={ this._onDayTouchEnd.bind(this, day) }
                  onFocus={ this._onDayFocus.bind(this, day) }
                  onBlur={ this._onDayBlur.bind(this, day) }
                  aria-current={ ariaCurrent }
                  aria-selected={ ariaSelected }
                  style={ dayStyle }
                  className={ unionClassNames(this.props.dayClassName, this.pseudoStyleIds.dayStyleId) }>
              { day }
            </span>);
  }

  /**
   * Function will render the main calendar component and will apply styles sequentially according to following rules:
   * 1.
   */
  render() {
    let wrapperStyle = extend({}, style.wrapperStyle, this.props.wrapperStyle);
    let weekStyle = extend({}, style.weekStyle, this.props.weekStyle);
    if (this.props.readOnly) {
      wrapperStyle = extend(wrapperStyle, style.readOnlyWrapperStyle, this.props.readOnlyWrapperStyle);
      weekStyle = extend(weekStyle, style.weekStyle, this.props.weekStyle);
    }
    if (this.props.disabled) {
      wrapperStyle = extend(wrapperStyle, style.disabledWrapperStyle, this.props.disabledWrapperStyle);
      weekStyle = extend(weekStyle, style.weekStyle, this.props.weekStyle);
      if (this.state.isWrapperHovered) {
        wrapperStyle = extend(wrapperStyle, style.disabledHoverWrapperStyle, this.props.disabledHoverWrapperStyle);
      }
    } else {
      if (this.state.isWrapperHovered) {
        wrapperStyle = extend(wrapperStyle, style.hoverWrapperStyle, this.props.hoverWrapperStyle);
      }
      if (this.state.isWrapperActive) {
        wrapperStyle = extend(wrapperStyle, style.activeWrapperStyle, this.props.activeWrapperStyle);
      } else if (this.preventFocusStyleForTouchAndClick && this.state.isWrapperFocused &&
        !(this.state.isLeftNavFocused || this.state.isRightNavFocused || this.state.focusedDay > 0)) {
        wrapperStyle = extend(wrapperStyle, style.focusWrapperStyle, this.props.focusWrapperStyle);
      }
    }

    const weekArray = getWeekArrayForMonth(this.state.month, this.state.year);
    const tabIndex = !this.props.disabled ? this.props.tabIndex : false;

    return (
      <div tabIndex={ tabIndex }
           onFocus={ this._onWrapperFocus.bind(this) }
           onBlur={ this._onWrapperBlur.bind(this) }
           onKeyDown={ this._onWrapperKeyDown.bind(this) }
           onMouseDown={ this._onWrapperMouseDown.bind(this) }
           onMouseUp={ this._onWrapperMouseUp.bind(this) }
           onMouseEnter={ this._onWrapperMouseEnter.bind(this) }
           onMouseLeave={ this._onWrapperMouseLeave.bind(this) }
           onTouchStart={ this._onWrapperTouchStart.bind(this) }
           onTouchEnd={ this._onWrapperTouchEnd.bind(this) }
           disabled={ this.props.disabled }
           aria-label={ this.props['aria-label'] }
           aria-disabled={ this.props.disabled }
           aria-readonly={ this.props.readOnly }
           style={ wrapperStyle }
           className={ unionClassNames(this.props.wrapperClassName, this.pseudoStyleIds.wrapperStyleId) }>
        { this._getNavBar() }
        { this._getDaysHeader() }
        <div>
          {
            map(weekArray, (week, weekIndex) => {
              return (
                <div key={ 'week-' + weekIndex }
                     style={ weekStyle }>
                  {
                    map(week, (day, dayIndex) => {
                      return this._getDayFragment(day, dayIndex);
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

  _focusPreviousDay() {
    if (this.state.focusedDay > 1) {
      React.findDOMNode(this.refs['day-' + (this.state.focusedDay - 1)]).focus();
    } else {
      this._decreaseMonth(() => {
        React.findDOMNode(this.refs['day-' + (getMaxDateForMonth(this.state.month, this.state.year))]).focus();
      });
    }
  }

  _focusNextDay() {
    if (this.state.focusedDay < getMaxDateForMonth(this.state.month, this.state.year)) {
      React.findDOMNode(this.refs['day-' + (this.state.focusedDay + 1)]).focus();
    } else {
      this._increaseMonth(() => {
        React.findDOMNode(this.refs['day-1']).focus();
      });
    }
  }

  _focusPreviousWeeksDay() {
    const newDate = this.state.focusedDay - 7;
    if (newDate <= 0) {
      this._decreaseMonth(() => {
        React.findDOMNode(this.refs['day-' + (getMaxDateForMonth(this.state.month, this.state.year) + newDate)]).focus();
      });
    } else {
      React.findDOMNode(this.refs['day-' + newDate]).focus();
    }
  }

  _focusNextWeeksDay() {
    const newDate = this.state.focusedDay + 7;
    const maxDateForCurrentMonth = getMaxDateForMonth(this.state.month, this.state.year);
    if (newDate > maxDateForCurrentMonth) {
      this._increaseMonth(() => {
        React.findDOMNode(this.refs['day-' + (newDate - maxDateForCurrentMonth)]).focus();
      });
    } else {
      React.findDOMNode(this.refs['day-' + newDate]).focus();
    }
  }

  _onLeftNavMouseDown(event) {
    if (event.button === 0 && !this.props.disabled) {
      this._decreaseMonth();
      this.setState({
        isLeftNavActive: true
      });
    }
  }

  _onLeftNavMouseUp(event) {
    if (event.button === 0 && !this.props.disabled) {
      this.setState({
        isLeftNavActive: false
      });
    }
  }

  _onLeftNavTouchStart() {
    if (!this.props.disabled) {
      this._decreaseMonth();
      this.setState({
        isLeftNavActive: true
      });
    }
  }

  _onLeftNavTouchEnd() {
    if (!this.props.disabled) {
      this._decreaseMonth();
      this.setState({
        isLeftNavActive: false
      });
    }
  }

  _onLeftNavFocus() {
    if (!this.props.disabled && !this.state.isLeftNavActive) {
      this.setState({
        isLeftNavFocused: true
      });
    }
  }

  _onLeftNavBlur() {
    if (!this.props.disabled) {
      this.setState({
        isLeftNavFocused: false
      });
    }
  }

  _onRightNavMouseDown(event) {
    if (event.button === 0 && !this.props.disabled) {
      this._increaseMonth();
      this.setState({
        isRightNavActive: true
      });
    }
  }

  _onRightNavMouseUp(event) {
    if (event.button === 0 && !this.props.disabled) {
      this.setState({
        isRightNavActive: false
      });
    }
  }

  _onRightNavTouchStart() {
    if (!this.props.disabled) {
      this._increaseMonth();
      this.setState({
        isRightNavActive: true
      });
    }
  }

  _onRightNavTouchEnd() {
    if (!this.props.disabled) {
      this.setState({
        isRightNavActive: false
      });
    }
  }

  _onRightNavFocus() {
    if (!this.props.disabled && !this.state.isRightNavActive) {
      this.setState({
        isRightNavFocused: true
      });
    }
  }

  _onRightNavBlur() {
    if (!this.props.disabled) {
      this.setState({
        isRightNavFocused: false
      });
    }
  }

  _decreaseMonth(postStateUpdateFunc) {
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
      year: newYear
    }, () => {
      if (postStateUpdateFunc) {
        postStateUpdateFunc.call(this);
      }
    });
    if (this.props.onMonthChange) {
      this.props.onMonthChange(newMonth);
    }
  }

  _onRightNavMonthClick() {
    if (!this.props.disabled) {
      this._increaseMonth();
    }
  }

  _increaseMonth(postStateUpdateFunc) {
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
      year: newYear
    }, () => {
      if (postStateUpdateFunc) {
        postStateUpdateFunc.call(this);
      }
    });
    if (this.props.onMonthChange) {
      this.props.onMonthChange(newMonth);
    }
  }

  /**
   * Reset the value to undefined.
   *
   * This can be used in case you as developer want to reset the rating manually.
   */
  resetValue() {
    this.setState({
      dateValue: undefined
    });
  }
}

/**
 * TODO-S:
 *
 * 1. Styling:
 * - Improve default belle styling
 * - Implement bootstrap styling for date-picker
 * - Images for left and right nav buttonStyle
 * - Animated focus style for wrapper
 * - Some of styles in api can be removed (which are not used)
 *
 * 2. Localization: I would  prefer to create our own small lib for localization use JS date api underneath.
 *
 * 3. Rename: We can rename component to calendar as its used for date display also.
 *
 * 4. Comments: to be added
 *
 * 5. Test coverage
 *
 * 6. Docs
 *
 **/
