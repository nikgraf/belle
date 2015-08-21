import React from 'react';
import {DatePicker} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

const TODAY = new Date();

const basicCodeExample = `<DatePicker defaultValue={ new Date(` + TODAY.getFullYear() + `, ` + TODAY.getMonth() + `, ` + (TODAY.getDate() + 2) +  `) }/>`;

const htmlStructure = `<div tabIndex="0"
     style={ wrapperStyle }>
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

export default React.createClass({

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

      <h3>ComboBox with options with identifier, onUpdate callback & maxOptions set to 5</h3>

      <DatePicker defaultValue={ new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 2) }/>

      <Code value={ basicCodeExample } style={ {marginTop: 40} } />

      </div>

    );
  }
});
