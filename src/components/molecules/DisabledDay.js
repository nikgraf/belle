import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Belle internal component to wrap a DisabledDay in a DatePicker.
 *
 * This component exists to avoid binding functions in JSX.
 */
export class DisabledDay extends Component {

  static displayName = 'DisabledDay';

  static propTypes = {
    children: PropTypes.node.isRequired,
    dateKey: PropTypes.string.isRequired,
    onDayMouseEnter: PropTypes.func.isRequired,
    onDayMouseLeave: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
    disabledDayProps: PropTypes.any,
  };

  _onMouseEnter = (event) => {
    this.props.onDayMouseEnter(this.props.dateKey, event);
  };

  _onMouseLeave = (event) => {
    this.props.onDayMouseLeave(this.props.dateKey, event);
  };

  render() {
    return (
      <span
        style={ this.props.style }
        onMouseEnter={ this._onDayMouseEnter }
        onMouseLeave={ this._onDayMouseLeave }
        {...this.props.disabledDayProps}
      >
        { this.props.children }
      </span>
    );
  }
}
