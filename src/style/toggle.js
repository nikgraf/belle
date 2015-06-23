'use strict';

import {extend} from "underscore";

const toggleWidth = 60;
const toggleHeight = 28;

const optionHeight = toggleHeight;
const optionWidth = toggleWidth - toggleHeight / 2;

const sliderWidth = 2 * optionWidth;

var toggleStyle = {

  sliderOffset: (optionWidth - toggleHeight / 2),

  toggle: {
    boxSizing: 'border-box',
    borderRadius: toggleHeight,
    height: toggleHeight,
    width: toggleWidth,
    WebkitUserSelect: 'none',
    position: 'relative'
  },

  slider: {
    position: 'relative',
    width: sliderWidth,
    transition: 'left 0.15s ease-in-out'
  },

  sliderWrapper: {
    overflow: 'hidden',
    borderRadius: toggleHeight,
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

  checkbox: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: 1
  },

  check: {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: optionHeight,
    width: optionWidth,
    lineHeight: optionHeight + 'px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#FFF',
    backgroundColor: '#AED75F',
    textIndent: -10
  },

  cross: {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: optionHeight,
    width: optionWidth,
    lineHeight: optionHeight + 'px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#FFF',
    backgroundColor: '#C9D1D4',
    textIndent: 10
  }
};

export default toggleStyle;
