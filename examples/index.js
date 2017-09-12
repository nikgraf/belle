import React from 'react';
import ReactDOM from 'react-dom';
import { style } from 'belle';
import { config } from 'belle';
import { extend } from 'underscore';
import ButtonPlayground from './components/ButtonPlayground';
import CardPlayground from './components/CardPlayground';
import SelectPlayground from './components/SelectPlayground';
import SpinnerPlayground from './components/SpinnerPlayground';
import TextInputPlayground from './components/TextInputPlayground';
import RatingPlayground from './components/RatingPlayground';
import ComboBoxPlayground from './components/ComboBoxPlayground';
import TogglePlayground from './components/TogglePlayground';
import RadioPlayground from './components/RadioPlayground';
import DatePickerPlayground from './components/DatePickerPlayground';

// TODO create a button to switch between those stylings for testing purposes
if (true) { // eslint-disable-line no-constant-condition
  config.button.preventFocusStyleForTouchAndClick = false;
  style.button.focusStyle = {
    boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
    outline: 0,
  };
  style.button.primaryFocusStyle = {
    boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
    outline: 0,
  };

  config.rating.preventFocusStyleForTouchAndClick = false;
  style.rating.focusStyle = {
    boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
    outline: 0,
    borderRadius: 3,
  };

  config.toggle.preventFocusStyleForTouchAndClick = false;
  style.toggle.focusStyle = {
    boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
    outline: 0,
  };

  config.datePicker.preventFocusStyleForTouchAndClick = false;
  style.datePicker.focusStyle = {
    boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
    outline: 0,
  };

  config.select.shouldPositionOptions = false;
} else {
  style.button.style = {
    boxSizing: 'border-box',
    borderRadius: 2,
    cursor: 'pointer',
    padding: '8px 12px 6px 12px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    background: 'red',
    border: '1px solid #EFEFEF',
    borderBottomColor: '#D0D0D0',
    color: 'brown',
    verticalAlign: 'bottom',
    lineHeight: '26px',
  };

  style.card.style = extend(style.card.style, {
    border: '1px solid black',
  });

  style.textInput.style = extend(style.textInput.style, {
    color: 'blue',
  });
}

// export for http://fb.me/react-devtools
window.React = React;

const App = () => (
  <div style={{ margin: '0 auto', width: 300 }}>
    <h1>Belle Playground</h1>

    <SpinnerPlayground />

    <DatePickerPlayground />

    <TogglePlayground />

    <RadioPlayground />

    <SelectPlayground />

    <ButtonPlayground />

    <TextInputPlayground />

    <CardPlayground />

    <RatingPlayground />

    <ComboBoxPlayground />
  </div>
);

ReactDOM.render(<App />, document.getElementById('react'));
