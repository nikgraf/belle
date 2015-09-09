import React from 'react';
import routes from './components/routes';
import Router from 'react-router';
import initializeTheme from './theme/initialize';

import belle from 'belle';


// export for http://fb.me/react-devtools
window.React = React;

initializeTheme();

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('react'));
});
