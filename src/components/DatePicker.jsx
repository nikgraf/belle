import React, {Component} from 'react';
import {injectStyles, removeAllStyles, removeStyle} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import {omit, extend, map} from '../utils/helpers';
import {getWeekArrayForMonth, MONTHS, DAYS_ABBR} from '../utils/date-helpers';
import style from '../style/date-picker';

// Enable React Touch Events
React.initializeTouchEvents(true);

/**
 * DatePicker React Component.
 */
export default class DatePicker extends Component {

  constructor(properties) {
    super(properties);

    this.state = {
      month: properties.month,
      year: properties.year
    };
  }

  static displayName = 'Belle DatePicker';

  static propTypes = {
    month: React.PropTypes.number,
    year: React.PropTypes.number
  };

  static defaultProps = {
    disabled: false,
    tabIndex: 0
  };

  /**
   * Generates the style-id & inject the focus & hover style.
   * The style-id is based on React's unique DOM node id.
   */
  componentWillMount() {
  }

  componentWillReceiveProps(properties) {
    this.setState({
      month: properties.month,
      year: properties.year
    });
  }

  /**
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
  }

  _onDecreaseMonthClick() {
    if (this.state.month === 1) {
      this.setState({
        month: 12,
        year: this.state.year - 1
      });
    } else {
      this.setState({
        month: this.state.month - 1
      });
    }
  }

  _onIncreaseMonthClick() {
    if (this.state.month === 12) {
      this.setState({
        month: 1,
        year: this.state.year + 1
      });
    } else {
      this.setState({
        month: this.state.month + 1
      });
    }
  }

  render() {
    const weekArray = getWeekArrayForMonth(this.state.month - 1, this.state.year);

    return (
      <div>
        <div>
          <span onClick={this._onDecreaseMonthClick.bind(this)}
                style= {style.navButtonStyle}>&lt;</span>
          {MONTHS[this.state.month - 1]}
          <span onClick={this._onIncreaseMonthClick.bind(this)}
                style= {style.navButtonStyle}>&gt;</span>
        </div>
        <div>
          {
            map(DAYS_ABBR, (dayAbbr) => {
              return (
                <span style={style.dayHeaderStyle}>{dayAbbr}</span>
              );
            })
          }
        </div>
        <div>
          {
            map(weekArray, (week) => {
              return (
                <div>
                  {
                    map(week, (day) => {
                      return (
                        <span style={style.dayStyle}>{day}</span>
                      );
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
 * TODOS:
 * 1. Setting default year and month
 * 2. Decide on call-backs when day / month / year changes
 * 3. Handling touch events
 * 4. Discuss styling api
 **/