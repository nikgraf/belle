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
import Philosophy from './Philosophy';
import TextInputDocumentation from './TextInputDocumentation';

const routes = (
  <Route name="app" path="/" handler={Base}>
    <Route name="getting-started" handler={GettingStarted}/>
    <Route name="component/button" handler={ButtonDocumentation}/>
    <Route name="component/text-input" handler={TextInputDocumentation}/>
    <Route name="component/card" handler={CardDocumentation}/>
    <Route name="configuration" handler={Configuration}/>
    <Route name="philosophy" handler={Philosophy}/>
    <Route name="future-work" handler={FuturePlans}/>

    <DefaultRoute handler={GettingStarted}/>
  </Route>
);

module.exports = routes;
