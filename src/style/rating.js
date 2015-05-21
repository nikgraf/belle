"use strict";

var style = {

  ratingStyle: {
    color: '#F5A71B',
    width: '40%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden'
  },

  ratingHolderStyle: {
    fontSize: 32,
    color: '#e3e3e3',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block'
  },

  ratingStyleDisabled: {
    cursor: 'not-allowed',
    opacity: 0.6
  },

  ratingStyleEnabled: {
    cursor: 'pointer'
  },

  ratingStyleBefore: {
    content: '"\\2605\\2605\\2605\\2605\\2605"'
  },

  ratingStyleHover: {
    textShadow: '1px 1px 1px black'
  },

  ratingHolderStyleBefore: {
    content: '"\\2605\\2605\\2605\\2605\\2605"'
  }
};

export default style;
