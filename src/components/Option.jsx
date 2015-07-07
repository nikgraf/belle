import React, {Component} from 'react';
import {extend, omit} from 'underscore';
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
    '_isHovered',
    '_isDisplayedAsSelected',
    '_isDisabled'
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
      childProps: sanitizeChildProps(properties)
    };
  }

  /**
   * Update the childProps based on the updated properties passed to the
   * Option.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    const defaultStyle = extend({}, style.style, this.props.style);
    const hoverStyle = extend({}, style.hoverStyle, this.props.hoverStyle);
    const selectStyle = extend({}, style.selectStyle, this.props.selectStyle);
    const disabledSelectStyle = extend({}, style.disabledSelectStyle, this.props.disabledSelectStyle);

    let styleToDisplay;
    if (this.props._isDisplayedAsSelected) {
      if (this.props._isDisabled) {
        styleToDisplay = disabledSelectStyle;
      } else {
        styleToDisplay = selectStyle;
      }
    } else if (this.props._isHovered) {
      styleToDisplay = hoverStyle;
    } else {
      styleToDisplay = defaultStyle;
    }

    return (
      <div data-belle-value={ this.props.value }
           style={ styleToDisplay }
           {...this.state.childProps}>
        { this.props.children }
      </div>
    );
  }
}

Option.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  style: React.PropTypes.object,
  hoverStyle: React.PropTypes.object,
  selectStyle: React.PropTypes.object,
  disabledSelectStyle: React.PropTypes.object,
  _isDisabled: React.PropTypes.bool,
  _isHovered: React.PropTypes.bool,
  _isDisplayedAsSelected: React.PropTypes.bool,
  value: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired
};

Option.displayName = 'Belle Option';

Option.defaultProps = {
  _isHovered: false,
  _isDisplayedAsSelected: false,
  _isDisabled: false
};
