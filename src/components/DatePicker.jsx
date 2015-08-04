import React, {Component} from 'react';
import {injectStyles, removeAllStyles, removeStyle} from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import {omit, extend, has, map} from '../utils/helpers';
import style from '../style/combo-box';

// Enable React Touch Events
React.initializeTouchEvents(true);

/**
 * Update hover style for the specified styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing hoverStyle
 */
function updatePseudoClassStyle(styleId, properties) {
  const hoverStyle = extend({}, style.hoverStyle, properties.hoverStyle);
  const focusStyle = extend({}, style.focusStyle, properties.focusStyle);
  const disabledHoverStyle = extend({}, style.disabledHoverStyle, properties.disabledHoverStyle);

  const styles = [
    {
      id: styleId,
      style: hoverStyle,
      pseudoClass: 'hover'
    },
    {
      id: styleId,
      style: disabledHoverStyle,
      pseudoClass: 'hover',
      disabled: true
    },
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus'
    }
  ];
  injectStyles(styles);
}

/**
 * Returns an object with properties that are relevant for the input box.
 */
function sanitizeProps(properties) {
  return omit(properties, [
    'ref'
  ]);
}

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
    format: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onUpdate: React.PropTypes.func,
    tabIndex: React.PropTypes.number,
    onKeyDown: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    focusStyle: React.PropTypes.object,
    disabledStyle: React.PropTypes.object,
    disabledHoverStyle: React.PropTypes.object,
    hoverStyle: React.PropTypes.object
  };

  static defaultProps = {
    format: 'mm/dd/yyyy',
    disabled: false,
    tabIndex: 0
  };

  /**
   * Generates the style-id & inject the focus & hover style.
   * The style-id is based on React's unique DOM node id.
   */
  componentWillMount() {
    const id = this._reactInternalInstance._rootNodeID.replace(/\./g, '-');
    this._styleId = `style-id${id}`;
    this._caretStyleId = `caretStyle-id${id}`;
    updatePseudoClassStyle(this._styleId, this.props);
  }

  componentWillReceiveProps(properties) {
    this.setState({
      month: properties.month,
      year: properties.year
    });
    removeStyle(this._styleId);
    updatePseudoClassStyle(this._styleId, properties);
  }

  /**
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this._styleId);
  }

  /**
   * Closed opened combo-box options and removed focusStyles on blur.
   */
  _onBlur(event) {
    if (!this.props.disabled) {
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  /**
   * Set focused state when element is focused.
   */
  _onFocus(event) {
    if (!this.props.disabled) {
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * Handle keyDown in input (when input is focused):
   */
  _onKeyDown(event) {
    if (!this.props.disabled) {
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  /**
   * The function is called when user type/ paste value in the input box.
   */
  _onChange(event) {
    const value = event.target.value;
    this._userUpdateValue(value);
  }

  static _getWeekArrayForMonth(month, year) {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDay = new Date(year, month, 0).getDate();
    let weekArray = [];
    let dayCounter = 1;
    for (let index = 1; index <= lastDay;) {
      let newWeek = [];
      if (index === 1) {
        for (;dayCounter < firstDay; dayCounter++) {
          newWeek.push(undefined);
        }
      }
      for (;dayCounter <= 7 && index <= lastDay; dayCounter++) {
        newWeek.push(index);
        index++;
      }
      dayCounter = 1;
      weekArray.push(newWeek);
    }
    console.log('weekArray', weekArray);
    return weekArray;
  }

  render() {
    console.log('hey');
    const weekArray = DatePicker._getWeekArrayForMonth(this.state.month, this.state.year);

    return (
      <div>
        <div>{DatePicker.MONTHS[this.state.month - 1]}</div>
        <div>
          {
            map(weekArray, (week) => {
              return (
                <div>
                  {
                    map(week, (day) => {
                      return (
                        <span>{day}</span>
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

  static MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

}
