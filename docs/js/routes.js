"use strict";

import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import Base from './Base';
import ButtonDocumentation from './ButtonDocumentation';
import CardDocumentation from './CardDocumentation';
import TextInputDocumentation from './TextInputDocumentation';

var routes = (
  <Route name="app" path="/" handler={Base}>
    <Route name="component/button" handler={ButtonDocumentation}/>
    <Route name="component/text-input" handler={TextInputDocumentation}/>
    <Route name="component/card" handler={CardDocumentation}/>

    <DefaultRoute handler={ButtonDocumentation}/>
  </Route>
);

module.exports = routes;
