import React, {Component} from 'react';
import {extend, omit} from 'underscore';
import style from '../style/placeholder';

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, ['style', 'disabledStyle', '_isDisabled']);
}

/**
 * Placeholder component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Placeholder extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties)
    };
  }

  /**
   * Update the childProps based on the updated properties passed to the
   * Placeholder.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    let computedStyle;
    if (this.props._isDisabled) {
      computedStyle = extend({}, style.disabledStyle, this.props.disabledStyle);
    } else {
      computedStyle = extend({}, style.style, this.props.style);
    }

    return (
      <div style={ computedStyle } {...this.state.childProps}>
        { this.props.children }
      </div>
    );
  }
}

Placeholder.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  style: React.PropTypes.object,
  disabledStyle: React.PropTypes.object,
  _isDisabled: React.PropTypes.bool
};

Placeholder.displayName = 'Belle Placeholder';

Placeholder.defaultProps = {
  _isDisabled: false
};
