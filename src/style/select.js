"use strict";

var selectStyle = {

  style: {
    padding: 10,
    position: 'relative',
    borderBottom: '1px #ccc solid',
    boxSizing: 'border-box'
  },

  focusedStyle: {
    padding: 10,
    position: 'relative',
    borderBottom: '1px #53C7F2 solid',
    boxSizing: 'border-box',
  },

  hoverStyle: {
    padding: 10,
    position: 'relative',
    borderBottom: '1px #92D6EF solid',
    boxSizing: 'border-box'
  },

  wrapperStyle: {
    position: 'relative'
  },

  optionsAreaStyle: {
    display: 'block',
    listStyleType: 'none',
    background: '#FFF',
    padding: 0,
    margin: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 10000,
    boxSizing: 'border-box'
  },

  nativeSelectStyle: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: 1
  },

  caretDownStyle: {
    height: 0,
    width: 0,
    content: ' ',
    position: 'absolute',
    top: 20,
    right: 10,
    borderTop: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  },

  caretUpStyle: {
    height: 0,
    width: 0,
    content: ' ',
    position: 'absolute',
    top: 20,
    right: 10,
    borderBottom: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  },

  entryStyle: {
    padding: 10
  },

  entryHoverStyle: {
    padding: 10,
    background: '#DDD'
  }

};

export default selectStyle;
