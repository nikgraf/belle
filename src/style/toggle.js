'use strict';

import {extend} from "underscore";

const toggleWidth = 60;
const toggleHeight = 30;

const handleHeight = toggleHeight;
const handleWidth = toggleHeight;

const optionHeight = toggleHeight;
const optionWidth = toggleWidth - handleWidth / 2;

const sliderWidth = 2 * optionWidth;

var toggleStyle = {

  sliderOffset: -(optionWidth - handleWidth / 2),

  toggle: {
    boxSizing: 'border-box',
    borderRadius: toggleHeight,
    overflow: 'hidden',
    height: toggleHeight,
    width: toggleWidth,
    WebkitUserSelect: 'none'
  },

  slider: {
    position: 'relative',
    width: sliderWidth,
    transition: 'left .25s ease-in-out'
  },

  handle: {
    position: 'absolute',
    top: 3,
    left: '50%',
    zIndex: 5,
    transform: 'translateX(-50%)',
    boxSizing: 'border-box',
    borderRadius: handleHeight,
    backgroundColor: 'rgb(238, 238, 238)',
    height: handleHeight - 6,
    width: handleWidth - 6,
    cursor: 'pointer',
    borderBottom: '1px solid rgb(189, 189, 189)'
  },

  option: {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: optionHeight,
    width: optionWidth,
    lineHeight: optionHeight + 'px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#FFF',
    boxShadow: 'inset 0 0 2px rgba(0,0,0, 0.05)',
    transition: 'opacity .25s ease-in-out'
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
  }
};

toggleStyle['check'] = extend( {}, toggleStyle.option, {
  backgroundColor: '#AED75F',
  borderRadius: '20px 0 0 20px',
  textIndent: -10
});

toggleStyle['cross'] = extend( {}, toggleStyle.option, {
  borderRadius: '0 20px 20px 0',
  backgroundColor: '#C9D1D4',
  textIndent: 10
});

export default toggleStyle;
