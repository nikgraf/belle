import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { spinnerStyle } from '../style';

const animationDelay = (delay) => ({
  MozAnimationDelay: delay,
  WebkitAnimationDelay: delay,
  OAnimationDelay: delay,
  animationDelay: delay,
});

/**
 * Spinner component to be used as loading indicator.
 */
export class Spinner extends Component {

  static displayName = 'Spinner';

  static propTypes = {
    characterProps: PropTypes.object,
    characterStyle: PropTypes.object,
    style: PropTypes.object,
  };

  render() {
    const { style, characterProps, characterStyle, ...childProps } = this.props;
    const computedCharStyle = { ...spinnerStyle.characterStyle, ...characterStyle };
    return (
      <span {...childProps} style={{ ...spinnerStyle.style, ...style }}>
        <span {...characterProps} style={ computedCharStyle }>
          .
        </span>
        <span {...characterProps} style={{ ...computedCharStyle, ...animationDelay('400ms') }}>
          .
        </span>
        <span {...characterProps} style={{ ...computedCharStyle, ...animationDelay('800ms') }}>
          .
        </span>
      </span>
    );
  }
}
