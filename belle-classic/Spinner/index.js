import React, { Component, PropTypes } from 'react';
import CoreSpinner from '../../src/components/Spinner';
import defaultTheme from './defaultTheme.css';

export default class Spinner extends Component {
  static displayName = 'Spinner';

  static propTypes = {
    theme: PropTypes.objectOf(PropTypes.string),
  };

  render() {
    const { theme, ...otherProps } = this.props;

    return (
      <CoreSpinner
        theme={ !!theme ? theme : defaultTheme }
        { ...otherProps }
      />
    );
  }
}
