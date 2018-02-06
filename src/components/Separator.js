import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { separatorStyle } from '../style';
import { omit } from '../utils';

const separatorPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
};

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, Object.keys(separatorPropTypes));
}

/**
 * Separator component.
 *
 * This component should be used together with Belle's Select.
 */
export class Separator extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties),
    };
  }

  static displayName = 'Separator';

  static propTypes = separatorPropTypes;

  /**
   * Update the childProperties based on the updated properties passed to the
   * Separator.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    const computedStyle = {
      ...separatorStyle.style,
      ...this.props.style,
    };

    return (
      <div style={ computedStyle } {...this.state.childProps}>
        { this.props.children }
      </div>
    );
  }
}
