import React, {Component} from 'react';
// import {injectStyles, removeAllStyles, removeStyle} from '../utils/inject-style';
// import unionClassNames from '../utils/union-class-names';
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
    onUpdate: React.PropTypes.func,
    tabIndex: React.PropTypes.number
  };

  static defaultProps = {
    month: CURRENT_MONTH + 1,
    year: CURRENT_YEAR,
    tabIndex: 0
  };

  /**
   * Generates the style-id & inject the focus & hover style.
   * The style-id is based on React's unique DOM node id.
   */
  componentWillMount() {
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
  }

  /**
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
  }

  _onWrapperFocus() {
    this.setState({
      isWrapperFocused: true
    });
  }

  _onWrapperBlur() {
    this.setState({
      isWrapperFocused: false
    });
  }

  _onDayFocus(day) {
    this.setState({
      focusedDay: day
    });
  }

  _onDayBlur() {
    this.setState({
      focusedDay: 0
    });
  }

  _onKeyDown(event) {
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
        this._onDateSelection(this.state.focusedDay);
      }
    }
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
  }

  _onDateSelection(date) {
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

  _getNavBar() {
    return (
      <div>
          <span onClick={ this._decreaseMonth.bind(this) }
                style= { style.navButtonStyle }>&lt;</span>
        { MONTHS[this.state.month] + '-' + this.state.year }
          <span onClick={ this._increaseMonth.bind(this) }
                style= { style.navButtonStyle }>&gt;</span>
      </div>
    );
  }

  _getDaysHeader() {
    return (
      <div>
        {
          map(DAYS_ABBR, (dayAbbr, index) => {
            return (
              <span key={ 'dayAbbr' + index }
                    style={ style.dayHeaderStyle }>
                  { dayAbbr }
                </span>
            );
          })
        }
      </div>
    );
  }

  _getDayFragment(day, index) {
    let dayStyle = extend({}, style.dayStyle);
    const dateValue = this.state.dateValue;
    if (day === CURRENT_DATE && this.state.month === CURRENT_MONTH && this.state.year === CURRENT_YEAR) {
      dayStyle = extend(dayStyle, style.todayStyle);
    }
    if (dateValue && day === dateValue.getDate() && this.state.month === dateValue.getMonth() && this.state.year === dateValue.getFullYear()) {
      dayStyle = extend(dayStyle, style.selectedDayStyle);
    }
    const tabIndex = day ? this.props.tabIndex : -1;
    return (<span tabIndex={ tabIndex }
                  key={ 'day-' + index }
                  ref={ 'day-' + day }
                  style={ dayStyle }
                  onClick={ this._onDateSelection.bind(this, day) }
                  onFocus={ this._onDayFocus.bind(this, day) }
                  onBlur={ this._onDayBlur.bind(this, day) }>
              { day }
            </span>);
  }

  render() {
    const weekArray = getWeekArrayForMonth(this.state.month, this.state.year);

    return (
      <div tabIndex={ this.props.tabIndex }
           onFocus={ this._onWrapperFocus.bind(this) }
           onBlur={ this._onWrapperBlur.bind(this) }
           onKeyDown={ this._onKeyDown.bind(this) }>
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

}

/**
 * TODO-S:
 * 3. Handling touch events
 * 4. Discuss styling api
 * 6. ARIA support
 * 7. Adding support of disabled / display-only component (we might consider renaming got calendar in case we support a component for date display also)
 * 9. Localization support
 * 10. Implement default belle styling and bootstrap styling for date-picker
 *
 * I have kept isWrapperFocused and focussedDay in state as we might need to re-render to show focus styles,
 * in case we prefer to use pseudo classes for focus styles we can safely remove these from sate
 **/
