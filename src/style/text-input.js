"use strict";

var textInputStyle = {

  defaultStyle: {
    /* normalize.css v3.0.1 */
    font: 'inherit',
    margin: 0,

    /* Belle TextInput style */
    overflow: 'hidden',
    resize: 'none',
    width: '100%',
    fontSize: 14,
    paddingBottom: 5,
    paddingTop: 7,
    color: '#505050',
    border: '0 #fff solid',
    borderBottom: '1px #ccc solid',
    background: 'none',
    display: 'block',
    boxSizing: 'border-box'
  },

  defaultHoverStyle: {
    borderBottom: '1px #92D6EF solid'
  },

  defaultFocusStyle: {
    outline: 0, // to avoid default focus behaviour
    borderBottom: '1px #53C7F2 solid'
  }

};

export default textInputStyle;
