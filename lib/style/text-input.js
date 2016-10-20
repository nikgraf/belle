'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var textInputStyle = {
  style: {
    /* normalize.css v3.0.1 */
    font: 'inherit',
    margin: 0,

    /* Reset the default borderRadius for Mobile Safari */
    borderRadius: 0,

    /* Belle TextInput style */
    overflow: 'hidden',
    resize: 'none',
    width: '100%',
    fontSize: 15,
    padding: '7px 0 5px 0',
    color: '#505050',
    border: '0 solid #fff',
    borderBottom: '1px solid #ccc',
    background: 'none',
    display: 'block',
    boxSizing: 'border-box',
    minHeight: '0px',

    /* animations */
    transition: 'border-bottom 0.2s',
    transitionTimingFunction: 'ease-out'
  },

  hoverStyle: {
    borderBottom: '1px solid #92D6EF'
  },

  focusStyle: {
    outline: 0, // to avoid default focus behaviour
    borderBottom: '1px solid #6EB8D4'
  },

  disabledStyle: {
    borderBottom: '1px dotted #9F9F9F',
    color: '#9F9F9F'
  },

  disabledHoverStyle: {
    borderBottom: '1px dotted #92D6EF',
    color: '#9F9F9F',
    cursor: 'not-allowed'
  }
};

exports.default = textInputStyle;