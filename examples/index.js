import React from 'react';
import ReactDOM from 'react-dom';
import CardPlayground from './components/CardPlayground';

// import ButtonPlayground from './components/ButtonPlayground';
// import SelectPlayground from './components/SelectPlayground';
// import SpinnerPlayground from './components/SpinnerPlayground';
// import TextInputPlayground from './components/TextInputPlayground';
// import RatingPlayground from './components/RatingPlayground';
// import ComboBoxPlayground from './components/ComboBoxPlayground';
// import TogglePlayground from './components/TogglePlayground';
// import DatePickerPlayground from './components/DatePickerPlayground';

// export for http://fb.me/react-devtools
window.React = React;

const App = () => (
  <div style={{ margin: '0 auto', width: 300 }}>
    <h1>Belle Playground</h1>
    <CardPlayground />
  </div>
);

ReactDOM.render(<App />, document.getElementById('react'));

// <SpinnerPlayground />
// <DatePickerPlayground />
// <TogglePlayground />
// <SelectPlayground />
// <ButtonPlayground />
// <TextInputPlayground />
// <RatingPlayground />
// <ComboBoxPlayground />
