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

  ratingWrapperStyle: {
    fontSize: 32,
    color: '#e3e3e3',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block'
  },

  disabledStyle: {
    cursor: 'not-allowed',
    opacity: 0.6
  },

  enabledStyle: {
    cursor: 'pointer'
  },

  highlightedStyle: {
    textShadow: '1px 1px 1px black'
  },

  //TODO: should we have a focus style of our own and not using browser default.
  focusStyle: {
    //'textShadow': '1px 1px 1px #0099CC'
    'textShadow': 'none'
    //'outline': 0
  }

};

export default style;
