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
    border: '1px solid #999',
    overflow: 'hidden',
    height: toggleHeight + 2,
    width: toggleWidth + 2,
    WebkitUserSelect: 'none'
  },

  slider: {
    position: 'relative',
    width: sliderWidth,
    transition: 'left .25s ease-in-out'
  },

  handle: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    boxSizing: 'border-box',
    borderRadius: handleHeight,
    border: '1px solid #999',
    backgroundColor: '#eee',
    height: handleHeight,
    width: handleWidth,
    cursor: 'pointer'
  },

  option: {
    display: 'inline-block',
    boxSizing: 'border-box',
    height: optionHeight,
    width: optionWidth,
    cursor: 'pointer'
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

  toggleFocus: {
    boxShadow: '0 0 5px 0 rgba(0,0,255, .4)'
  },
};

toggleStyle['check'] = extend( {}, toggleStyle.option, {
  backgroundColor: '#00ff00',
  borderRadius: '20px 0 0 20px'
});

toggleStyle['cross'] = extend( {}, toggleStyle.option, {
  borderRadius: '0 20px 20px 0',
  backgroundColor: '#ff0000',
  textAlign: 'right'
});

export default toggleStyle;