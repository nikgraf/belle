import React from 'react';
import routes from './routes';
import Router from 'react-router';
import initializeTheme from './theme/initialize';

// export for http://fb.me/react-devtools
window.React = React;

initializeTheme();

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('react'));
});
