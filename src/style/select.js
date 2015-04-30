"use strict";

var selectStyle = {

  style: {
    padding: '7px 0 5px 0',
    position: 'relative',
    borderBottom: '1px #ccc solid',
    boxSizing: 'border-box',
    height: 34
  },

  focusStyle: {
    padding: '7px 0 5px 0',
    position: 'relative',
    borderBottom: '1px #53C7F2 solid',
    boxSizing: 'border-box',
    height: 34
  },

  hoverStyle: {
    padding: '7px 0 5px 0',
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
    padding: '6px 0',
    margin: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 10000,
    boxSizing: 'border-box',
    borderRadius: 2,
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
    borderTop: '1px solid #f2f2f2',
    top: 0
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
    top: 15,
    right: 8,
    borderTop: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  },

  caretUpStyle: {
    height: 0,
    width: 0,
    content: ' ',
    position: 'absolute',
    top: 15,
    right: 8,
    borderBottom: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  },

  entryStyle: {
    padding: 10,
    color: '#666'
  },

  entryHoverStyle: {
    padding: 10,
    background: '#F5F5F5',
    color: '#666'
  }

};

export default selectStyle;
