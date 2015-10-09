import React from 'react';
import ReactDOM from 'react-dom';
import routes from './components/routes';
import Router from 'react-router';
import initializeTheme from './theme/initialize';
import { createHistory } from 'history';

// export for http://fb.me/react-devtools
window.React = React;

initializeTheme();

const history = createHistory();
const rootComponent = <Router history={history} children={routes} />;

ReactDOM.render(rootComponent, document.getElementById('react'));
