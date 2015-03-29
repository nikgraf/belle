"use strict";

/* jslint browser: true */

import React from 'react';
import routes from './routes';
import Router, {Handler} from 'react-router';

// export for http://fb.me/react-devtools
window.React = React;

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('react'));
});
