import React from 'react';
import ReactDOM from 'react-dom';
import routes from './components/routes';
import { Router, hashHistory } from 'react-router';
import initializeTheme from './theme/initialize';

// export for http://fb.me/react-devtools
window.React = React;

initializeTheme();
const rootComponent = <Router history={ hashHistory } children={ routes } />;

ReactDOM.render(rootComponent, document.getElementById('react'));
