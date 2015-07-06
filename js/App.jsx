import React from 'react';
import routes from './routes';
import Router from 'react-router';

// export for http://fb.me/react-devtools
window.React = React;

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('react'));
});
