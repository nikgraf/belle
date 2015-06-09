"use strict";

/* jslint node: true */

import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import Base from './Base';
import ButtonDocumentation from './ButtonDocumentation';
import CardDocumentation from './CardDocumentation';
import Configuration from './Configuration';
import GettingStarted from './GettingStarted';
import FuturePlans from './FuturePlans';
import OptionDocumentation from './OptionDocumentation';
import Philosophy from './Philosophy';
import PlaceholderDocumentation from './PlaceholderDocumentation';
import RatingDocumentation from './RatingDocumentation';
import SelectDocumentation from './SelectDocumentation';
import SeparatorDocumentation from './SeparatorDocumentation';
import TextInputDocumentation from './TextInputDocumentation';

const routes = (
  <Route name="app" path="/" handler={Base}>
    <Route name="getting-started" handler={GettingStarted}/>
    <Route name="component/button" handler={ButtonDocumentation}/>
    <Route name="component/card" handler={CardDocumentation}/>
    <Route name="component/select" handler={SelectDocumentation}/>
    <Route name="component/option" handler={OptionDocumentation}/>
    <Route name="component/placeholder" handler={PlaceholderDocumentation}/>
    <Route name="component/rating" handler={RatingDocumentation}/>
    <Route name="component/separator" handler={SeparatorDocumentation}/>
    <Route name="component/text-input" handler={TextInputDocumentation}/>
    <Route name="configuration" handler={Configuration}/>
    <Route name="philosophy" handler={Philosophy}/>
    <Route name="future-work" handler={FuturePlans}/>

    <DefaultRoute handler={GettingStarted}/>
  </Route>
);

module.exports = routes;
