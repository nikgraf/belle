'use strict';

var toggleStyle = {

  style: {
    boxSizing: 'border-box',
    borderRadius: 28,
    height: 28,
    width: 60,
    WebkitUserSelect: 'none',
    position: 'relative'
  },

  focusStyle: {
    WebkitAnimation: 'belle-toggle-focus 2s',
    outline: 0 // avoid default focus behaviour
  },

  slider: {
    position: 'relative',
    // Calculated with 2 * the width of check/cross area
    width: 92,
    transition: 'left 0.15s ease-in-out'
  },

  sliderWrapper: {
    overflow: 'hidden',
    borderRadius: 28,
  },

  handle: {
    position: 'absolute',
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    borderRadius: 28,
    backgroundColor: 'rgb(238, 238, 238)',
    height: 28,
    width: 28,
    cursor: 'pointer',
    borderBottom: '1px solid rgb(189, 189, 189)',
    transition: 'left 0.15s ease-in-out'
  },

  check: {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: 28,
    // Calculated with the width of the whole toggle - half of the width from the handle
    //
    // This allows to have a round handle that is position exactly in on top of the
    // border between the check and cross areas.
    width: 46,
    lineHeight: 28 + 'px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#FFF',
    backgroundColor: '#AED75F',
    textIndent: -10
  },

  cross: {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: 28,
    // Calculated with the width of the whole toggle - half of the width from the handle
    //
    // This allows to have a round handle that is position exactly in on top of the
    // border between the check and cross areas.
    width: 46,
    lineHeight: 28 + 'px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#FFF',
    backgroundColor: '#C9D1D4',
    textIndent: 10
  }
};

export default toggleStyle;
