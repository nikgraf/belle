/* @flow */

import React, { Component, PropTypes } from 'react';
import CoreButton from '../../src/components/Button';
import defaultTheme from './defaultTheme.css';

/**
 * Button component
 */
export default class Button extends Component {

  static displayName = 'Button';

  static propTypes = {
    theme: PropTypes.objectOf(PropTypes.string),
    primary: PropTypes.bool,
  };

  static defaultProps = {
    primary: false,
  };

  render() {
    const { theme, primary, ...otherProps } = this.props;
    let newTheme;
    if (theme) {
      newTheme = theme;
    } else if (primary) {
      newTheme = defaultTheme;
    } else {
      newTheme = defaultTheme;
    }

    return (
      <CoreButton
        theme={ newTheme }
        { ...otherProps }
      />
    );
  }
}
