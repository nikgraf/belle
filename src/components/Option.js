import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { optionStyle } from '../style';
import { omit } from '../utils';

const optionPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
  hoverStyle: PropTypes.object,
  selectStyle: PropTypes.object,
  disabledSelectStyle: PropTypes.object,
  _isDisplayedAsSelected: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  identifier: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
};

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, Object.keys(optionPropTypes));
}

/**
 * Option component.
 *
 * This component should be used together with Belle's Select.
 */
export class Option extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties),
    };
  }

  static displayName = 'Option';

  static propTypes = optionPropTypes;

  static contextTypes = {
    isDisabled: PropTypes.bool.isRequired,
    isHoveredValue: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    _isDisplayedAsSelected: false,
  };

  /**
   * Update the childProps based on the updated properties passed to the
   * Option.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    let innerOptionStyle;

    if (this.props._isDisplayedAsSelected) {
      innerOptionStyle = {
        ...optionStyle.selectStyle,
        ...this.props.selectStyle,
      };
      if (this.context.isDisabled) {
        innerOptionStyle = {
          ...optionStyle,
          ...optionStyle.disabledSelectStyle,
          ...this.props.disabledSelectStyle,
        };
      }
    } else {
      innerOptionStyle = {
        ...optionStyle.style,
        ...this.props.style,
      };
      if (this.context.isHoveredValue === this.props.value) {
        innerOptionStyle = {
          ...optionStyle,
          ...optionStyle.hoverStyle,
          ...this.props.hoverStyle,
        };
      }
    }

    return (
      <div
        style={ innerOptionStyle }
        {...this.state.childProps}
      >
        { this.props.children }
      </div>
    );
  }
}
