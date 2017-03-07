import React from 'react';
import Card from './Card';

/**
 * Card component with a light shadow.
 *
 * This component will apply any attribute to the div that has been provided as
 * property & is valid for a div.
 */
export default (props) => (
  <Card {...props} />
);




// card core
const themeCard = (Theme) => (props) => {
  return <Theme.Card {...props} />;
};

// card styled
import Card from 'belle-card-core';
const theme = {
  Card: styled.div`
    background: grey;
  `
}
export default themeCard(theme);

// app
import Card from 'belle-card'








// belle-datepicker-core
const createDatepicker = (Theme) => (props) => {
  return <Theme.Wrapper>
    <Theme.YearSelector />
    <Theme.MonthSelector onclick={(evt) => props.onMonthChange(evt)} />
  </Theme.Wrapper>;
};

// belle-datepicker
import DatePicker from 'belle-datepicker-core';
const theme = {
  Wrapper: styled.div`
    background: grey;
  `,
  YearSelector: styled.div`
    background: white;
  `,
  MonthSelector: styled.div`
    background: blue;
  `,
}
export default createDatepicker(theme);

// app
import DatePicker from 'belle-datepicker'
