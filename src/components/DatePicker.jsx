import React, {Component} from 'react';
import {injectStyles, removeAllStyles} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import {has, extend, map} from '../utils/helpers';
import {getWeekArrayForMonth, MONTHS, DAYS_ABBR, CURRENT_DATE, CURRENT_MONTH, CURRENT_YEAR, getMaxDateForMonth} from '../utils/date-helpers';
import style from '../style/date-picker';

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
    onDayTouchStart: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    onMonthChange: React.PropTypes.func,
    tabIndex: React.PropTypes.number,
    'aria-label': React.PropTypes.string,
    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    // styling api related props - hover, disabledHover styles
    hoverWrapperStyle: React.PropTypes.object,
    disabledHoverWrapperStyle: React.PropTypes.object,
    hoverNavBarStyle: React.PropTypes.object,
    disabledHoverNavBarStyle: React.PropTypes.object,
    hoverLeftNavStyle: React.PropTypes.object,
    disabledHoverLeftNavStyle: React.PropTypes.object,
    hoverRightNavStyle: React.PropTypes.object,
    disabledHoverRightNavStyle: React.PropTypes.object,
    hoverMonthLblStyle: React.PropTypes.object,
    disabledHoverMonthLblStyle: React.PropTypes.object,
    hoverDayLblStyle: React.PropTypes.object,
    disabledHoverDayLblStyle: React.PropTypes.object,
    hoverDayStyle: React.PropTypes.object,
    disabledHoverDayStyle: React.PropTypes.object,
    // ClassNames
    wrapperClassName: React.PropTypes.object,
    navBarClassName: React.PropTypes.object,
    leftNavClassName: React.PropTypes.object,
    rightNavClassName: React.PropTypes.object,
    monthLblClassName: React.PropTypes.object,
    dayLblClassName: React.PropTypes.object,
    dayClassName: React.PropTypes.object,
    // other styles in style api
    wrapperStyle: React.PropTypes.object,
    disabledWrapperStyle: React.PropTypes.object,
    navBarStyle: React.PropTypes.object,
    disabledNavBarStyle: React.PropTypes.object,
    leftNavStyle: React.PropTypes.object,
    disabledLeftNavStyle: React.PropTypes.object,
    rightNavStyle: React.PropTypes.object,
    disabledRightNavStyle: React.PropTypes.object,
    monthLblStyle: React.PropTypes.object,
    disabledMonthLblStyle: React.PropTypes.object,
    dayLblStyle: React.PropTypes.object,
    disabledDayLblStyle: React.PropTypes.object,
    dayStyle: React.PropTypes.object,
    disabledDayStyle: React.PropTypes.object,
    todayStyle: React.PropTypes.object,
    selectedDayStyle: React.PropTypes.object
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
  static updatePseudoClassStyle(pseudoStyleIds, properties) {
    const styles = [];
    ['wrapper', 'navBar', 'leftNav', 'rightNav', 'monthLbl', 'dayLbl', 'day'].forEach((elm) => {
      const elmFirstCaps = elm[0].toUpperCase() + elm.substr(1, elm.length);
      styles.push({
        id: pseudoStyleIds[elm + 'StyleId'],
        style: extend({}, style['hover' + elmFirstCaps + 'Style'], properties['hover' + elmFirstCaps + 'Style']),
        pseudoClass: 'hover'
      });
      styles.push({
        id: pseudoStyleIds.wrapperStyleId,
        style: extend({}, style['disabledHover' + elmFirstCaps + 'Style'], properties['disabledHover' + elmFirstCaps + 'Style']),
        pseudoClass: 'hover',
        disabled: true
      });
    });
    injectStyles(styles);
  }

  /**
   * Generates the style-id & inject the hover styles.
   * The style-id is based on React's unique DOM node id.
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
    DatePicker.updatePseudoClassStyle(this.pseudoStyleIds, this.props);
  }

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

    removeAllStyles(Object.keys(this.pseudoStyleIds));
    DatePicker.updatePseudoClassStyle(this.pseudoStyleIds, this.props);
  }

  /**
   * Removes pseudo classes from the DOM once component gets removed.
   */
  componentWillUnmount() {
    removeAllStyles(Object.keys(this.pseudoStyleIds));
  }

  _onWrapperFocus(event) {
    if (!this.props.disabled) {
      this.setState({
        isWrapperFocused: true
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

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

  _onNavBarPrevMonthFocus() {
    if (!this.props.disabled) {
      this.setState({
        isNavBarPrevMonthFocused: true
      });
    }
  }

  _onNavBarPrevMonthBlur() {
    if (!this.props.disabled) {
      this.setState({
        isNavBarPrevMonthFocused: false
      });
    }
  }

  _onNavBarNextMonthFocus() {
    if (!this.props.disabled) {
      this.setState({
        isNavBarNextMonthFocused: true
      });
    }
  }

  _onNavBarNextMonthBlur() {
    if (!this.props.disabled) {
      this.setState({
        isNavBarNextMonthFocused: false
      });
    }
  }

  _onDayFocus(day, event) {
    if (!this.props.disabled) {
      this.setState({
        focusedDay: day
      });
    }

    if (this.props.onDayFocus) {
      this.props.onDayFocus(event);
    }
  }

  _onDayBlur(event) {
    if (!this.props.disabled) {
      this.setState({
        focusedDay: 0
      });
    }

    if (this.props.onDayBlur) {
      this.props.onDayBlur(event);
    }
  }

  _onKeyDown(event) {
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
        } else if (this.state.isNavBarPrevMonthFocused) {
          this._decreaseMonth();
        } else if (this.state.isNavBarNextMonthFocused) {
          this._increaseMonth();
        }
      }
    }

    if (this.state.focusedDay && this.props.onDayKeyDown) {
      this.onDayKeyDown(event);
    } if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  // mouseEvent.button is supported by all browsers are are targeting: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
  _onDayMouseDown(date, event) {
    if (event.button === 0) {
      this._selectDate(date);
    }

    if (this.props.onDayMouseDown) {
      this.props.onDayMouseDown(event);
    }
  }

  _onDayTouchStart(date) {
    if (event.touches.length === 1) {
      this._selectDate(date);
    }

    if (this.props.onDayTouchStart) {
      this.props.onDayTouchStart(event);
    }
  }

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

  _getNavBar() {
    let navBarStyle = extend({}, style.navBarStyle, this.props.navBarStyle);
    let leftNavStyle = extend({}, style.leftNavStyle, this.props.leftNavStyle);
    let rightNavStyle = extend({}, style.rightNavStyle, this.props.rightNavStyle);
    let monthLblStyle = extend({}, style.monthLblStyle, this.props.monthLblStyle);
    if (this.props.disabled) {
      navBarStyle = extend(navBarStyle, style.disabledNavBarStyle, this.props.disabledNavBarStyle);
      leftNavStyle = extend(leftNavStyle, style.disabledLeftNavStyle, this.props.disabledLeftNavStyle);
      rightNavStyle = extend(rightNavStyle, style.disabledRightNavStyle, this.props.disabledRightNavStyle);
      monthLblStyle = extend(monthLblStyle, style.disabledMonthLblStyle, this.props.disabledMonthLblStyle);
    }

    return (
      <div style={ navBarStyle }
           className={ unionClassNames(this.props.navBarClassName, this.pseudoStyleIds.navBarStyleId) }>
          <span tabIndex={ this.props.tabIndex }
                onMouseDown={ this._onPrevNavMouseDown.bind(this) }
                onTouchStart={ this._onPrevNavTouchStart.bind(this) }
                onFocus={ this._onNavBarPrevMonthFocus.bind(this)}
                onBlur={ this._onNavBarPrevMonthBlur.bind(this)}
                style= { leftNavStyle }
                className={ unionClassNames(this.props.leftNavClassName, this.pseudoStyleIds.leftNavStyleId) }>&lt;</span>
          <span style={ monthLblStyle }
                className={ unionClassNames(this.props.monthLblClassName, this.pseudoStyleIds.monthLblStyleId) }>
            { MONTHS[this.state.month] + '-' + this.state.year }
          </span>
          <span tabIndex={ this.props.tabIndex }
                onMouseDown={ this._onNextNavMouseDown.bind(this) }
                onTouchStart={ this._onNextNavTouchStart.bind(this) }
                onFocus={ this._onNavBarNextMonthFocus.bind(this)}
                onBlur={ this._onNavBarNextMonthBlur.bind(this)}
                style= { rightNavStyle }
                className={ unionClassNames(this.props.rightNavClassName, this.pseudoStyleIds.rightNavStyleId) }>&gt;</span>
      </div>
    );
  }

  _getDaysHeader() {
    let dayLblStyle = extend({}, style.dayLblStyle, this.props.dayLblStyle);
    if (this.props.disabled) {
      dayLblStyle = extend(dayLblStyle, style.disabledDayLblStyle, this.props.disabledDayLblStyle);
    }

    return (
      <div>
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
  _getDayFragment(day, index) {
    const dateValue = this.state.dateValue;
    let ariaCurrent = '';
    let ariaSelected = false;

    let dayStyle = extend({}, style.dayStyle, this.props.dayStyle);
    if (day === CURRENT_DATE && this.state.month === CURRENT_MONTH && this.state.year === CURRENT_YEAR) {
      dayStyle = extend(dayStyle, style.todayStyle, this.props.todayStyle);
      ariaCurrent = 'date';
    }
    if (dateValue && day === dateValue.getDate() && this.state.month === dateValue.getMonth() && this.state.year === dateValue.getFullYear()) {
      dayStyle = extend(dayStyle, style.selectedDayStyle, this.props.selectedDayStyle);
      ariaSelected = true;
    }
    if (this.props.disabled) {
      dayStyle = extend(dayStyle, style.disabledDayStyle, this.props.disabledDayStyle);
    }

    // Setting tabIndex to false makes the div non-focuseable, its still focuseable with value of -1.
    const tabIndex = (!this.props.disabled && !this.props.readOnly && day) ? this.props.tabIndex : false;
    return (<span tabIndex={ tabIndex }
                  key={ 'day-' + index }
                  ref={ 'day-' + day }
                  onMouseDown={ this._onDayMouseDown.bind(this, day) }
                  onTouchState={ this._onDayTouchStart.bind(this, day) }
                  onFocus={ this._onDayFocus.bind(this, day) }
                  onBlur={ this._onDayBlur.bind(this) }
                  aria-current={ ariaCurrent }
                  aria-selected={ ariaSelected }
                  style={ dayStyle }
                  className={ unionClassNames(this.props.dayClassName, this.pseudoStyleIds.dayStyleId) }>
              { day }
            </span>);
  }

  render() {
    let wrapperStyle = extend({}, style.wrapperStyle, this.props.wrapperStyle);
    if (this.props.disabled) {
      wrapperStyle = extend(wrapperStyle, style.disabledWrapperStyle, this.props.disabledWrapperStyle);
    }

    const weekArray = getWeekArrayForMonth(this.state.month, this.state.year);
    const tabIndex = !this.props.disabled ? this.props.tabIndex : false;

    return (
      <div tabIndex={ tabIndex }
           onFocus={ this._onWrapperFocus.bind(this) }
           onBlur={ this._onWrapperBlur.bind(this) }
           onKeyDown={ this._onKeyDown.bind(this) }
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
                <div key={ 'week-' + weekIndex }>
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

  _onPrevNavMouseDown(event) {
    if (event.button === 0 && !this.props.disabled) {
      this._decreaseMonth();
    }
  }

  _onPrevNavTouchStart() {
    if (!this.props.disabled) {
      this._decreaseMonth();
    }
  }

  _onNextNavMouseDown(event) {
    if (event.button === 0 && !this.props.disabled) {
      this._increaseMonth();
    }
  }

  _onNextNavTouchStart() {
    if (!this.props.disabled) {
      this._increaseMonth();
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

  _onNavBarNextMonthClick() {
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

}

/**
 * TODO-S:
 * - Implement default belle styling and bootstrap styling for date-picker
 * - images for left and right nav buttonStyle
 *
 * Localization support is required mainly to format month names and day names, start of week day - we can also use moment.js for localization by default,
 * Will babel support creating add-ons for belle where we can include moment.js.
 * I would rather prefer to create our own small lib for localization use JS date api underneath.
 *
 * We can rename component to calendar also as this component as its used for date display also.
 *
 * Do we need separate styles for read-only calendar.
 **/
