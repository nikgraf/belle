import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { placeholderStyle } from '../../style';
import { omit } from '../../utils';

const placeholderPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  _isDisabled: PropTypes.bool,
};

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, Object.keys(placeholderPropTypes));
}

/**
 * Placeholder component.
 *
 * This component should be used together with Belle's Select.
 */
export class Placeholder extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties),
    };
  }

  static displayName = 'Placeholder';

  static propTypes = placeholderPropTypes;

  static defaultProps = {
    _isDisabled: false,
  };

  /**
   * Update the childProps based on the updated properties passed to the
   * Placeholder.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    let computedStyle = {
      ...placeholderStyle.style,
      ...this.props.style,
    };
    if (this.props._isDisabled) {
      computedStyle = {
        ...computedStyle,
        ...placeholderStyle.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    return (
      <div style={ computedStyle } {...this.state.childProps}>
        { this.props.children }
      </div>
    );
  }
}
