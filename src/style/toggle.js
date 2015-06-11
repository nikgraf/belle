'use strict';

import {extend} from "underscore";

const toggleWidth = 60;
const toggleHeight = 30;

const handleHeight = toggleHeight;
const handleWidth = toggleHeight;
const handleMargin = 2;

const optionHeight = toggleHeight;
const optionWidth = toggleWidth - handleWidth / 2;

const sliderWidth = 2 * optionWidth;

const sliderAnimationSpeed = '0.35s';

var toggleStyle = {

  sliderOffset: -(optionWidth - handleWidth / 2),

  toggle: {
    display: 'inline-block',
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: toggleHeight,
    overflow: 'hidden',
    height: toggleHeight,
    width: toggleWidth,
    WebkitUserSelect: 'none',
    backgroundColor: '#E6E6E6',
    cursor: 'pointer',
    boxShadow:  '0 0 0 1px #E6E6E6, inset 0 0 0 1px #E6E6E6',
    transition: 'all ' + sliderAnimationSpeed + ' ease-in-out'

  },

  toggleActive: {
    background: '#38D774',
    boxShadow:  '0 0 0 1px #38D774, inset 0 0 0 1px #38D774',
    transition: 'all ' + sliderAnimationSpeed + ' ease-in-out'
  },

  slider: {
    position: 'relative',
    zIndex: 3,
    width: sliderWidth,
    transition: 'transform ' + sliderAnimationSpeed + ' cubic-bezier(0.35, 0.84, 0.51, 1.19)'
  },

  handle: {
    position: 'absolute',
    top: handleMargin,
    left: '50%',
    zIndex: 5,
    transform: 'translateX(-50%)',
    boxSizing: 'border-box',
    borderRadius: '100%',
    backgroundColor: 'white',
    height: handleHeight - handleMargin * 2,
    width: handleWidth - handleMargin * 2,
    border: '1px solid #E6E6E6',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.1)'
  },

  option: {
    position: 'relative',
    zIndex: 2,
    display: 'inline-block',
    boxSizing: 'border-box',
    height: optionHeight,
    width: optionWidth,
    fontSize: 11,
    letterSpacing: '0.05em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: optionHeight + 'px',
    textAlign: 'center',
    color: '#FFF',
    boxShadow: 'inset 0 0 2px rgba(0,0,0, 0.05)',
    transition: 'opacity ' + sliderAnimationSpeed + ' ease-in-out'
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
    boxShadow: '0 0 5px 0 rgba(140, 175, 80, .4)'
  },

  background: {
    background: 'white',
    position: 'absolute',
    borderRadius: 20,
    width: '100%',
    height: '100%',
    zIndex: 1,
    top: '50%',
    left: '50%',
    boxShadow: 'inset 0 0 0 1px #E6E6E6',
    transform: 'translate3d(-50%, -50%, 0)',
    transition: 'all ' + sliderAnimationSpeed + ' ease-in-out'
  },

  backgroundActive: {
    width: '0%',
    height: '0%',
    transition: 'all 0.2s'
  }
};

toggleStyle['check'] = extend( {}, toggleStyle.option, {
  // backgroundColor: '#AED75F',
  borderRadius: '20px 0 0 20px',
  textIndent: -10
});

toggleStyle['cross'] = extend( {}, toggleStyle.option, {
  // backgroundColor: '#C9D1D4',
  borderRadius: '0 20px 20px 0',
  textIndent: 10,
  color: '#e6e6e6'
});

export default toggleStyle;
