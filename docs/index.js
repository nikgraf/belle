import React from 'react';
import ReactDOM from 'react-dom';
import routes from './components/routes';
import { Router, hashHistory } from 'react-router';

// export for http://fb.me/react-devtools
window.React = React;

const rootComponent = <Router history={ hashHistory } children={ routes } />;

ReactDOM.render(rootComponent, document.getElementById('react'));
