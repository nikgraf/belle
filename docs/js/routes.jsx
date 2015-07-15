import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import Base from './Base';
import ComboBoxDocumentation from './ComboBoxDocumentation';
import ButtonDocumentation from './ButtonDocumentation';
import CardDocumentation from './CardDocumentation';
import ChoiceDocumentation from './ChoiceDocumentation';
import Configuration from './Configuration';
import GettingStarted from './GettingStarted';
import FuturePlans from './FuturePlans';
import Home from './Home';
import OptionDocumentation from './OptionDocumentation';
import Philosophy from './Philosophy';
import PlaceholderDocumentation from './PlaceholderDocumentation';
import RatingDocumentation from './RatingDocumentation';
import SelectDocumentation from './SelectDocumentation';
import SeparatorDocumentation from './SeparatorDocumentation';
import TextInputDocumentation from './TextInputDocumentation';
import ToggleDocumentation from './ToggleDocumentation';
import FormComponents from './FormComponents';
import WhyBelleGuide from './guides/WhyBelle';

const routes = (
  <Route name="app" path="/" handler={Base}>
    <Route name="getting-started" handler={GettingStarted}/>
    <Route name="component/button" handler={ButtonDocumentation}/>
    <Route name="component/card" handler={CardDocumentation}/>
    <Route name="component/choice" handler={ChoiceDocumentation}/>
    <Route name="component/combo-box" handler={ComboBoxDocumentation}/>
    <Route name="component/select" handler={SelectDocumentation}/>
    <Route name="component/option" handler={OptionDocumentation}/>
    <Route name="component/placeholder" handler={PlaceholderDocumentation}/>
    <Route name="component/rating" handler={RatingDocumentation}/>
    <Route name="component/separator" handler={SeparatorDocumentation}/>
    <Route name="component/text-input" handler={TextInputDocumentation}/>
    <Route name="component/toggle" handler={ToggleDocumentation}/>
    <Route name="guide/formComponents" handler={FormComponents}/>
    <Route name="configuration" handler={Configuration}/>
    <Route name="philosophy" handler={Philosophy}/>
    <Route name="future-work" handler={FuturePlans}/>
    <Route name="guide/why-belle" handler={WhyBelleGuide}/>

    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = routes;
