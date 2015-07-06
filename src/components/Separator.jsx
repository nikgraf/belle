import React, {Component} from 'react';
import {extend, omit} from 'underscore';
import style from '../style/separator';

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProperties(properties) {
  return omit(properties, ['style']);
}

/**
 * Separator component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Separator extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProperties: sanitizeChildProperties(properties)
    };
  }

  /**
   * Update the childProperties based on the updated properties passed to the
   * Separator.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProperties: sanitizeChildProperties(properties) });
  }

  render() {
    const computedStyle = extend({}, style.style, this.props.style);

    return (
      <div style={ computedStyle } {...this.state.childProperties}>
        { this.props.children }
      </div>
    );
  }
}

Separator.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  style: React.PropTypes.object
};

Separator.displayName = 'Belle Separator';
