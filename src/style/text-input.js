"use strict";

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
    fontSize: 14,
    padding: '7px 0 5px 0',
    color: '#505050',
    border: '0 #fff solid',
    borderBottom: '1px #ccc solid',
    background: 'none',
    display: 'block',
    boxSizing: 'border-box'
  },

  hoverStyle: {
    borderBottom: '1px #92D6EF solid'
  },

  focusStyle: {
    outline: 0, // to avoid default focus behaviour
    borderBottom: '1px #53C7F2 solid'
  }

};

export default textInputStyle;
