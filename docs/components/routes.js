import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Base from './Base';
import ComboBoxDocumentation from './components/ComboBoxDocumentation';
import DatePickerDocumentation from './components/DatePickerDocumentation';
import ButtonDocumentation from './components/ButtonDocumentation';
import CardDocumentation from './components/CardDocumentation';
import ChoiceDocumentation from './components/ChoiceDocumentation';
import Configuration from './Configuration';
import GettingStarted from './GettingStarted';
import About from './About';
import Home from './Home';
import OptionDocumentation from './components/OptionDocumentation';
import Philosophy from './Philosophy';
import PlaceholderDocumentation from './components/PlaceholderDocumentation';
import RatingDocumentation from './components/RatingDocumentation';
import SelectDocumentation from './components/SelectDocumentation';
import SeparatorDocumentation from './components/SeparatorDocumentation';
import SpinnerDocumentation from './components/SpinnerDocumentation';
import TextInputDocumentation from './components/TextInputDocumentation';
import ToggleDocumentation from './components/ToggleDocumentation';
import FormComponents from './FormComponents';
import IntroducingBelleGuide from './guides/IntroducingBelle';

const routes = (
  <Route path="/" component={Base}>
    <Route path="getting-started" component={GettingStarted}/>
    <Route path="component/button" component={ButtonDocumentation}/>
    <Route path="component/card" component={CardDocumentation}/>
    <Route path="component/choice" component={ChoiceDocumentation}/>
    <Route path="component/combo-box" component={ComboBoxDocumentation}/>
    <Route path="component/date-picker" component={DatePickerDocumentation}/>
    <Route path="component/select" component={SelectDocumentation}/>
    <Route path="component/option" component={OptionDocumentation}/>
    <Route path="component/placeholder" component={PlaceholderDocumentation}/>
    <Route path="component/rating" component={RatingDocumentation}/>
    <Route path="component/separator" component={SeparatorDocumentation}/>
    <Route path="component/spinner" component={SpinnerDocumentation}/>
    <Route path="component/text-input" component={TextInputDocumentation}/>
    <Route path="component/toggle" component={ToggleDocumentation}/>
    <Route path="guide/form-components" component={FormComponents}/>
    <Route path="configuration" component={Configuration}/>
    <Route path="philosophy" component={Philosophy}/>
    <Route path="about" component={About}/>
    <Route path="guide/introducing-belle" component={IntroducingBelleGuide}/>
    <IndexRoute component={Home}/>
  </Route>
);

module.exports = routes;
