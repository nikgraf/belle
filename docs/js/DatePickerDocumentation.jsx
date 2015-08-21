import React from 'react/addons';
import {DatePicker} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

const TODAY = new Date();

const basicCodeExample = `<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + (TODAY.getDate() + 2) + `) }/>`;

const htmlStructure = `<div style={ wrapperStyle }>
  <div>
    <div style={ navBarStyle }>
      <div style={ prevMonthStyle }></div>
      <div style={ monthLblStyle }></div>
      <div style={ nextMonthStyle }></div>
    </div>
    <div style={ weekStyle }>
      <div style={ dayStyle }></div>
      <div style={ dayStyle }></div>
      <div style={ dayStyle }></div>
      <div style={ dayStyle }></div>
      <div style={ dayStyle }></div>
      <div style={ dayStyle }></div>
      <div style={ dayStyle }></div>
    </div>
  </div>
</div>`;

const advanceCodeExample1 = `<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + (TODAY.getDate() + 2) + `) }
        showOtherMonthDate={ false } styleWeekend={ true }/>`;

const advanceCodeExample2 = `<DatePicker readOnly={ true } renderDay={ this.renderDay } month={ 12 }/>`;

const advanceCodeExample3 = `<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + (TODAY.getDate() + 2) + `) }
        locale="ar"/>`;

const advanceCodeExample4 = `<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + (TODAY.getDate() + 2) + `) }
        readOnly/>`;

const advanceCodeExample5 = `<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + (TODAY.getDate() + 2) + `) }
        disabled/>`;

const advanceCodeExample6 = `<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + (TODAY.getDate() + 2) + `) }
        disabled/>`;

const renderDayFunction = `renderDay(day) {
    if (day.getDate() === 25 && day.getMonth() === 11) {
      return (
        <div>
          🎁{ day.getDate() }
        </div>
      );
    }
    return (
      day.getDate()
    );
  }
`;

export default React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      selectedMonth: TODAY.getMonth() + 1,
      selectedDate: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 2)
    };
  },

  render() {
    return (<div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>DatePicker</h2>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 2) }/>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      <h3>Properties</h3>

      <table>

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
            month
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Integer (1-12)</i>
              <br />
              optional (default: current month)
            </p>
            <p>
              The date picker will be displayed for this month (though month can be changed by user).
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            year
          </td>
        </tr>
        <tr>
          <td style={ propertyDescriptionStyle }>
            <p>
              <i>Integer</i>
              <br />
              optional (default: current year)
            </p>
            <p>
              The date picker will be displayed for this year (though year can be changed by user).
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
              This locale will be used to style date picker.
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
              This property can be used to show/ hide this display of other month dates in date picker.
              Even if other month dates are displayed in date picker they will be disabled.
            </p>
          </td>
        </tr>

        <tr>
          <td style={ propertyNameStyle }>
            styleWeekend
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
              If this property is set to true weekend be styles distinctly.
              Weekend for date picker will be provided in locale data and will be by default Sunday.
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
            onMonthChange
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
              The function will be called when user navigated to different month.
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
              Prevents the focus style being applied in case the date picker becomes focused by a click or touch.
              (This will be applicable to only the wrapper and navigation buttons for previous and next months).
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
              The property can be used to add more to the styling of current date.
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
              The property can be used to add more to the styling of the selected date.
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
              The property can be used to add more to the styling of other month day lying in date picker.
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
              The property can be used to add more to the styling of weekend.
            </p>
          </td>
        </tr>

      </table>

      <p>
        Properties for handling various events(focus, mouse events, touch events):
        <span style={ {color: 'grey'} }> tabIndex, onFocus, onBlur, onKeyDown, onDayFocus, onDayBlur, onDayKeyDown,
          onDayMouseDown, onDayMouseUp, onDayTouchStart, onDayTouchEnd, </span><br />
      </p>

      <p>
        ... for adding classes to various parts of html structure of date picker:
        <span style={ {color: 'grey'} }> wrapperClassName, navBarClassName, prevMonthClassName, nextMonthClassName, monthLblClassName,
          dayLblClassName, weekClassName, dayClassName</span><br />
      </p>

      <p>
        ... for adding styling to various parts of html structure of date picker:
        <span style={ {color: 'grey'} }> wrapperStyle, disabledWrapperStyle, readOnlyWrapperStyle, hoverWrapperStyle, activeWrapperStyle,
          focusWrapperStyle, disabledHoverWrapperStyle, navBarStyle, disabledNavBarStyle, readOnlyNavBarStyle, hoverNavBarStyle,
          so on for prevMonth, nextMonth, monthLbl, weekHeader, dayLbl, week and day</span><br />
      </p>

      <h3>Internal HTML Structure</h3>

      <p>
        This should help developer to understand how the DatePicker is structured
        in order to use the API
      </p>

      <Code value={ htmlStructure } style={ {marginTop: 40} } />

      <h3>More Examples</h3>

      <h3>DatePicker with other month days hidden but weekends styled differently:</h3>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 2) }
        showOtherMonthDate={ false } styleWeekend={ true }/>

      <Code value={ advanceCodeExample1 } style={ {marginTop: 40} } />

      <h3>DatePicker highlighting special day:</h3>

      <DatePicker renderDay={ this.renderDay } month={ 12 }/>

      <Code value={ advanceCodeExample2 } style={ {marginTop: 40} } />

      <Code value={ renderDayFunction } style={ {marginTop: 40} } />

      <h3>Localization support in DatePicker, arabic locale:</h3>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 2) }
        locale="ar"/>

      <Code value={ advanceCodeExample3 } style={ {marginTop: 40} } />

      <h3>Read only DatePicker:</h3>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 2) }
        readOnly/>

      <Code value={ advanceCodeExample4 } style={ {marginTop: 40} } />

      <h3>Disabled DatePicker:</h3>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 2) }
                  disabled/>

      <Code value={ advanceCodeExample5 } style={ {marginTop: 40} } />

      <h3>DatePicker with onUpdate and onMonthChange callBacks and resetValue method used:</h3>

      <DatePicker ref="datePicker"
                  onMonthChange={ this.onMonthChange }
                  month={ this.state.selectedMonth }
                  valueLink={ this.linkState('selectedDate') }
                  onUpdate = { (date) => {console.log('Date Updated...', date); } }/>
      <div style={ {display: 'inline-block',
                    width: 200,
                    marginLeft: 20} }>
      <span style={ {display: 'block'} }>Date: { this.state.selectedDate ? this.state.selectedDate.getMonth() + '/' + this.state.selectedDate.getDate() + '/' + this.state.selectedDate.getFullYear() : '-'}</span>
      <span style={ {display: 'block'} }>Month: {this.state.selectedMonth}</span>
      <span style={ {display: 'block'} }><a onClick={ this.resetDate }
         style={ {
         textDecoration: 'underline',
         cursor: 'pointer'
        } }>Reset Date</a></span>
      </div>

      <Code value={ advanceCodeExample5 } style={ {marginTop: 40} } />

      </div>

    );
  },

  renderDay(day) {
    if (day.getDate() === 25 && day.getMonth() === 11) {
      return (
        <div>
          🎁{ day.getDate() }
        </div>
      );
    }
    return (
      day.getDate()
    );
  },

  onMonthChange(month) {
    this.setState({ selectedMonth: month });
  },

  resetDate() {
    this.setState({ selectedDate: undefined });
    this.refs.datePicker.resetValue();
  }

});
