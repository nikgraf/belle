import React, {Component} from 'react';
import cardStyle from '../style/card';

/**
 * Card component with a light shadow.
 *
 * This component will apply any attribute to the div that has been provided as
 * property & is valid for a div.
 */
export default class Card extends Component {

  constructor(properties) {
    super(properties);
    const { style, ...childProps } = properties;
    this.childProps = childProps;
  }

  static displayName = 'Card';

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    style: React.PropTypes.object,
    test: React.PropTypes.object
  };

  /**
   * Update the childProps based on the updated properties passed to the card.
   */
  componentWillReceiveProps(properties) {
    const { style, ...childProps } = properties;
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
