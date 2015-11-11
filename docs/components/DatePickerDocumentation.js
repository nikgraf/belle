import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {DatePicker, Select, Option} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

const TODAY = new Date();

const basicCodeExample = `<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + 15 + `) }/>`;

const htmlStructure = `<div style={ style }>
  <div>
    <!-- this is navigation bar at the top -->
    <div style={ navBarStyle }>
      <span style={ prevMonthStyle }></span>
      <span style={ monthLabelStyle }></span>
      <span style={ nextMonthStyle }></span>
    </div>
    <!-- this is week header -->
    <div style={ weekHeaderStyle }>
      <span style={ dayLabelStyle }></span>
      <span style={ dayLabelStyle }></span>
      <span style={ dayLabelStyle }></span>
      <span style={ dayLabelStyle }></span>
      <span style={ dayLabelStyle }></span>
      <span style={ dayLabelStyle }></span>
      <span style={ dayLabelStyle }></span>
    </div>
    <!-- following is repeated for each week -->
    <div style={ dayStyle }></div>
    <div style={ dayStyle }></div>
    <div style={ dayStyle }></div>
    <div style={ dayStyle }></div>
    <div style={ dayStyle }></div>
    <div style={ dayStyle }></div>
    <div style={ dayStyle }></div>
  </div>
</div>`;

const advanceCodeExample1 = `
<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + 15 + `) }
            showOtherMonthDate={ false } />`;

const advanceCodeExample2 = `
<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + 15 + `) }
            locale={ this.state.selectedLocale }/>`;

const advanceCodeExample3 = `
<DatePicker readOnly
            renderDay={ this.renderDay }
            defaultMonth={ 12 }/>

renderDay(day) {
  if (day.getDate() === 25 && day.getMonth() === 11) {
    return (
      <div>
        <span style={ {color: '#FFDA46'} }>✵</span>
        <span style={ {color: 'red'} }>
          { day.getDate() }
        </span>
      </div>
    );
  }
  return (
    day.getDate()
  );
}`;

const advanceCodeExample4 = `
<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + 15 + `) }
            readOnly/>`;

const advanceCodeExample5 = `
<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + 15 + `) }
            disabled/>`;

const advanceCodeExample6 = `
<DatePicker onMonthUpdate={ this.onMonthUpdate }
            defaultMonth={ this.state.selectedMonth }
            defaultYear={ this.state.selectedYear }
            valueLink={ this.linkState('selectedDate') }/>

<div>
  <div>Date: { this.state.selectedDate ?
               this.state.selectedDate.getMonth() + '/' +
               this.state.selectedDate.getDate() + '/' +
               this.state.selectedDate.getFullYear() : '-'}
  </div>
  <div>Month: {this.state.selectedMonth}</div>
  <div>Year: {this.state.selectedYear}</div>
  <div><a onClick={ this.resetDate }>Reset Date</a></div>
</div>

onMonthUpdate(month, year) {
  this.setState({
    selectedMonth: month,
    selectedYear: year
  });
}

resetDate() {
  this.setState({
    selectedDate: undefined
  });
}`;

export default React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      selectedMonth: TODAY.getMonth() + 1,
      selectedYear: TODAY.getFullYear(),
      selectedLocale: 'ar',
      selectedDate: new Date(TODAY.getFullYear(), TODAY.getMonth(), 15),
    };
  },

  render() {
    return (<div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>DatePicker</h2>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), 15) }/>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <table><tbody>

        <tr>
          <td style={ propertyNameStyle }>
            valueLink
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Value Reference</i>
              <br />
              optional</p>
            <p>
              Behaves like the valueLink property of a native form components.
              ValueLink allows to enable two-way data binding between a state property and the value in
              the user interface.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            defaultValue
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Date</i>
              <br />
              optional
            </p>
            <p>
              Behaves like the defaultValue property of a native form components.
              The date can be manipulated through the user interface.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            value
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Date</i>
              <br />
              optional
            </p>
            <p>
              Behaves like the value property of a native form components.
              The date can <b>not</b> be manipulated through the user interface.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            defaultMonth
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Integer (1-12)</i>
              <br />
              optional (default: month of selected date if one is provided, otherwise the current month)
            </p>
            <p>
              When initially rendered the date picker will be display with the provided month..
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            defaultYear
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Integer</i>
              <br />
              optional (default: year of selected date if one is provided, otherwise the current year)
            </p>
            <p>
              When initially rendered the date picker will be display with the provided year.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            min
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Date</i>
              <br />
              optional
            </p>
            <p>
              Sets the minimum date a user can select.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            max
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Date</i>
              <br />
              optional
            </p>
            <p>
              Sets the maximum date a user can select.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            locale
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>String</i>
              <br />
              optional
            </p>
            <p>
              Date picker will be rendered according to this locale
              (By default it will be english calendar, check <a href="#/configuration">Configuration</a>).
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            showOtherMonthDate
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Boolean</i>
              <br />
              optional (default: true)
            </p>
            <p>
              This property can be used to show/hide the display of other month dates in date picker.
              Even if other month dates are displayed in date picker they will be disabled.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            renderDay
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              This function can be used to distinctly style some day(s).
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            onUpdate
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              The function will be called when user selects some day.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            onMonthUpdate
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Function</i>
              <br />
              optional
            </p>
            <p>
              The function will be called when user navigated to different month or year.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            readOnly
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Boolean</i>
              <br />
              optional (default: false)
            </p>
            <p>
              When set to true the date picker will be displayed as read only component.
              User can focus to read only date picker, change month but will not be able to select some day.
              Different styling can also be applied to read only date picker.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            disabled
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Boolean</i>
              <br />
              optional (default: false)
            </p>
            <p>
              When set to true the date picker will be displayed as disabled component.
              User can do no interaction with this component, it can not even be focused.
              Disabled date picker is styled differently.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            preventFocusStyleForTouchAndClick
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Boolean</i>
              <br />
              optional (default: true)
            </p>
            <p>
              Prevents the focus style being applied to the date picker in case the it becomes focused by a click or touch.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            todayStyle
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              The property can be used to add to / change the styling of current date.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            selectedDayStyle
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              The property can be used to add to / change the styling of the selected date.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            otherMonthDayStyle
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              The property can be used to add to / change the styling of other month day in date picker.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            weekendStyle
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Object</i>
              <br />
              optional
            </p>
            <p>
              The property can be used to add to/change the styling of weekend.
            </p>
          </td>
        </tr>

      </tbody></table>

      <p>
        Properties for handling various events(focus, mouse events, touch events, change in selectedDate, month or year):
        <span style={ {color: 'grey'} }>tabIndex, onFocus, onBlur, onKeyDown, onMouseDown, onMouseUp,
        onTouchStart, onTouchEnd, onTouchCancel, onUpdate, onMonthUpdate.</span><br />
      </p>

      <p>
        ... for adding attributes to specific coponents inside date picker:
        <span style={ {color: 'grey'} }>dayProps, navBarProps, prevMonthNavProps, prevMonthNavIconProps, nextMonthNavProps,
        nextMonthNavIconProps, monthLabelProps, dayLabelProps, weekHeaderProps, weekGridProps.</span><br />
      </p>

      <p>
        ... for adding class to date picker wrapper:
        <span style={ {color: 'grey'} }>className.</span><br />
      </p>

      <p>
        ... for adding styling to various parts of html structure of date picker:
        <span style={ {color: 'grey'} }> style, disabledStyle, readOnlyStyle, hoverStyle, activeStyle, focusStyle, disabledHoverStyle, navBarStyle,
        prevMonthNavStyle, prevMonthNavIconStyle, hoverPrevMonthNavStyle, activePrevMonthNavStyle, nextMonthNavStyle,
        nextMonthNavIconStyle, hoverNextMonthNavStyle, activeNextMonthNavStyle, weekHeaderStyle, monthLabelStyle,
        dayLabelStyle, disabledDayLabelStyle, weekendLabelStyle, dayStyle, disabledDayStyle, readOnlyDayStyle,
        activeDayStyle, focusDayStyle, disabledFocusDayStyle, todayStyle, selectedDayStyle, otherMonthDayStyle,
        weekendStyle.</span><br />
     </p>

      <h3>Internal HTML Structure</h3>

      <p>
        This should help developer to understand how the DatePicker is structured
        in order to use the API
      </p>

      <Code value={ htmlStructure } style={ {marginTop: 40} } />

      <h3>More Examples</h3>

      <h3>DatePicker with other month days hidden but weekends styled differently:</h3>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), 15) }
                  showOtherMonthDate={ false } />

      <Code value={ advanceCodeExample1 } style={ {marginTop: 40} } />

      <h3>Localization support in DatePicker:</h3>

      <p>Belle has inbuilt support for following locales: Arabic, French, Hebrew, Dutch, Chinese.
        Adding support for a new locale is very easy, check <a href="#/configuration">Configuration</a>.</p>

      <Select valueLink={ this.linkState('selectedLocale') }
            menuStyle={{
              height: 160,
              width: '25%',
              overflow: 'scroll',
            }}
            style={{
              width: '25%',
              marginBottom: 20,
            }}>
        <Option value="ar">Arabic</Option>
        <Option value="fr">French</Option>
        <Option value="he">Hebrew</Option>
        <Option value="nl">Dutch</Option>
        <Option value="zh-CN">Chinese</Option>
      </Select>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), 15) }
      locale={ this.state.selectedLocale }/>

      <Code value={ advanceCodeExample2 } style={ {marginTop: 40} } />

      <h3>DatePicker highlighting special day:</h3>

      <DatePicker renderDay={ this.renderDay } defaultMonth={ 12 }/>

      <Code value={ advanceCodeExample3 } style={ {marginTop: 40} } />

      <h3>Using renderDay to disable special days:</h3>

      <DatePicker renderDay={ this.disableDays }/>

      <Code value={ advanceCodeExample3 } style={ {marginTop: 40} } />

      <h3>Controlled DatePicker component with onMonthUpdate callBack and reset option implemented:</h3>

      <DatePicker onMonthUpdate={ this.onMonthUpdate }
                  defaultMonth={ this.state.selectedMonth }
                  defaultYear={ this.state.selectedYear }
                  valueLink={ this.linkState('selectedDate') }/>
      <div style={{
        display: 'inline-block',
        width: 200,
        marginLeft: 20,
        marginTop: 10,
      }}>
      <div>Date: { this.state.selectedDate ? this.state.selectedDate.getMonth() + '/' + this.state.selectedDate.getDate() + '/' + this.state.selectedDate.getFullYear() : '-'}</div>
      <div>Month: {this.state.selectedMonth}</div>
      <div>Year: {this.state.selectedYear}</div>
      <div><a onClick={ this.resetDate }
         style={{
           textDecoration: 'underline',
           cursor: 'pointer',
         }}>Reset Date</a></div>
      </div>

      <Code value={ advanceCodeExample6 } style={ {marginTop: 40} } />

      <h3>Read only DatePicker:</h3>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), 15) }
                  readOnly/>

      <Code value={ advanceCodeExample4 } style={ {marginTop: 40} } />

      <h3>Disabled DatePicker:</h3>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), 15) }
                  disabled/>

      <Code value={ advanceCodeExample5 } style={ {marginTop: 40} } />

      </div>

    );
  },

  renderDay(day) {
    if (day.getDate() === 25 && day.getMonth() === 11) {
      return (
        <div>
          <span style={ {color: '#FFDA46'} }>✵</span>
          <span style={ {color: 'red'} }>{ day.getDate() }</span>
        </div>
      );
    }

    return (
      day.getDate()
    );
  },

  disableDays(day) {
    console.log('day.getDate()', day.getDate());
    console.log(([10, 11, 12, 20, 21, 22, 23].indexOf(day.getDate()) > 0));
    if ([10, 11, 12, 20, 21, 22, 23].indexOf(day.getDate()) > 0) {
      return (
        <div onMouseDown={(event) => event.stopPropagation()}
             style={{color: '#C1BABA',
                     cursor: 'not-allowed',
                     width: 39,
                     height: 32,
                     boxSizing: 'border-box',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center'}}>
          {day.getDate()}
        </div>
      );
    }

    return (
      day.getDate()
    );
  },

  onMonthUpdate(month, year) {
    this.setState({ selectedMonth: month, selectedYear: year });
  },

  resetDate() {
    this.setState({ selectedDate: undefined });
  },

});
