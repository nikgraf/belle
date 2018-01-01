import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import React, { Component } from 'react';
import { cardStyle } from '../style';

/**
 * Card component with a light shadow.
 *
 * This component will apply any attribute to the div that has been provided as
 * property & is valid for a div.
 */
export class Card extends Component {

  constructor(properties) {
    super(properties);
    const { style, ...childProps } = properties; // eslint-disable-line no-unused-vars
    this.childProps = childProps;
  }

  static displayName = 'Card';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    style: PropTypes.object,
  };

  /**
   * Update the childProps based on the updated properties passed to the card.
   */
  componentWillReceiveProps(properties) {
    const { style, ...childProps } = properties; // eslint-disable-line no-unused-vars
    this.childProps = childProps;
  }

  render() {
    const divStyle = { ...cardStyle.style, ...this.props.style };

    return (
      <div {...this.childProps} style={ divStyle }>
        { this.props.children }
      </div>
    );
  }
}
