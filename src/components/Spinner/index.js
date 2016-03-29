import React, { Component, PropTypes } from 'react';
import unionClassNames from 'union-class-names';

const animationDelay = (delay) => ({
  MozAnimationDelay: delay,
  WebkitAnimationDelay: delay,
  OAnimationDelay: delay,
  animationDelay: delay,
});

/**
 * Spinner component to be used as loading indicator.
 */
export default class Spinner extends Component {

  static displayName = 'Spinner';

  static propTypes = {
    characterProps: PropTypes.object,
    theme: PropTypes.objectOf(PropTypes.string).isRequired,
    className: PropTypes.string,
  };

  render() {
    const { className, theme, characterProps, ...childProps } = this.props; // eslint-disable-line no-use-before-define
    return (
      <span {...childProps} className={unionClassNames(theme.base, className)}>
        <span className={ theme.character } {...characterProps} >
          .
        </span>
        <span {...characterProps} className={ theme.character } {...animationDelay('400ms')}>
          .
        </span>
        <span {...characterProps} className={ theme.character } {...animationDelay('800ms')}>
          .
        </span>
      </span>
    );
  }
}
