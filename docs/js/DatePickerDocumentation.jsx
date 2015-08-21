import React from 'react';
import {DatePicker} from 'belle';
import Code from './Code';
import {propertyNameStyle, propertyDescriptionStyle} from './style';

export default React.createClass({

  render() {
    return (<div>

      <h2 style={ {marginTop: 0, marginBottom: 40} }>DatePicker</h2>

      <DatePicker ref="calendar1" defaultValue={ new Date() }/>

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
              Behaves like the valueLink property of a native input-tag.
              ValueLink allows to enable two-way data binding between a state property and the value in
              the user interface.
            </p>
          </td>
        </tr>


      </table>

      <p>
        Any other property valid for an input element like
        <span style={ {color: 'grey'} }> placeholder, onFocus, onBlur…</span><br />
      </p>

      <h3>Internal HTML Structure</h3>

      </div>
    );
  }
});
