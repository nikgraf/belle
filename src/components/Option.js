import React, {Component, PropTypes} from 'react';
import {omit} from '../utils/helpers';
import style from '../style/option';

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, [
    'style',
    'hoverStyle',
    'selectStyle',
    'disabledSelectStyle',
    'value',
    '_isDisplayedAsSelected',
  ]);
}

/**
 * Option component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Option extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties),
    };
  }

  static displayName = 'Option';

  static propTypes = {
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
  };

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
    let optionStyle;

    if (this.props._isDisplayedAsSelected) {
      optionStyle = {
        ...style.selectStyle,
        ...this.props.selectStyle,
      };
      if (this.context.isDisabled) {
        optionStyle = {
          ...optionStyle,
          ...style.disabledSelectStyle,
          ...this.props.disabledSelectStyle,
        };
      }
    } else {
      optionStyle = {
        ...style.style,
        ...this.props.style,
      };
      if (this.context.isHoveredValue === this.props.value) {
        optionStyle = {
          ...optionStyle,
          ...style.hoverStyle,
          ...this.props.hoverStyle,
        };
      }
    }

    return (
      <div data-belle-value={ this.props.value }
           style={ optionStyle }
           {...this.state.childProps}>
        { this.props.children }
      </div>
    );
  }
}
