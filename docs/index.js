import React from 'react';
import routes from './components/routes';
import Router from 'react-router';
import initializeTheme from './theme/initialize';
import { createHistory } from 'history';

// export for http://fb.me/react-devtools
window.React = React;

initializeTheme();

const history = createHistory();
const rootComponent = <Router history={history} children={routes} />;

React.render(rootComponent, document.getElementById('react'));
