import React, { Component, PropTypes } from 'react';
import unionClassNames from '../../utils/union-class-names';

/**
 * Card component with a light shadow.
 *
 * This component will apply any attribute to the div that has been provided as
 * property & is valid for a div.
 */
export default class Card extends Component {

  static displayName = 'Card';

  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.objectOf(PropTypes.string),
    className: PropTypes.string,
  };

  render() {
    return (
      <div
        {...this.childProps}
        className={ unionClassNames(this.props.theme.base, this.props.className) }
      >
        { this.props.children }
      </div>
    );
  }
}
