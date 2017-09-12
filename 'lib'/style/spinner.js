'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var spinnerStyle = {
  style: {
    display: 'inline-block',
    fontSize: 15,
    textAlign: 'center'
  },

  characterStyle: {
    color: '#666',
    display: 'inline-block',
    WebkitAnimation: 'belle-spinner-pulse 2s infinite ease-in-out',
    OAnimation: 'belle-spinner-pulse 2s infinite ease-in-out',
    animation: 'belle-spinner-pulse 2s infinite ease-in-out'
  }
};

exports.default = spinnerStyle;