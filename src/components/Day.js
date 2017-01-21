import React, { Component, PropTypes } from 'react';

/**
 * Belle internal component to wrap a Day in a DatePicker.
 *
 * This component exists to avoid binding functions in JSX.
 */
export default class Day extends Component {

  static displayName = 'Day';

  static propTypes = {
    children: PropTypes.node.isRequired,
    dateKey: PropTypes.string.isRequired,
    onDayMouseEnter: PropTypes.func.isRequired,
    onDayMouseLeave: PropTypes.func.isRequired,
    onDayMouseDown: PropTypes.func.isRequired,
    onDayMouseUp: PropTypes.func.isRequired,
    onDayTouchStart: PropTypes.func.isRequired,
    onDayTouchEnd: PropTypes.func.isRequired,
    onDayTouchCancel: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
    dayProps: PropTypes.any,
    selected: PropTypes.bool.isRequired,
  };

  _onMouseEnter = (event) => {
    this.props.onDayMouseEnter(this.props.dateKey, event);
  };

  _onMouseLeave = (event) => {
    this.props.onDayMouseLeave(this.props.dateKey, event);
  };

  _onMouseDown = (event) => {
    this.props.onDayMouseDown(this.props.dateKey, event);
  };

  _onMouseUp = (event) => {
    this.props.onDayMouseUp(this.props.dateKey, event);
  };

  _onTouchStart = (event) => {
    this.props.onDayTouchStart(this.props.dateKey, event);
  };

  _onTouchEnd = (event) => {
    this.props.onDayTouchEnd(this.props.dateKey, event);
  };

  _onTouchCancel = (event) => {
    this.props.onDayTouchCancel(this.props.dateKey, event);
  };

  render() {
    return (
      <span
        onMouseEnter={ this._onMouseEnter }
        onMouseLeave={ this._onMouseLeave }
        onMouseDown={ this._onMouseDown }
        onMouseUp={ this._onMouseUp }
        onTouchStart={ this._onTouchStart }
        onTouchEnd={ this._onTouchEnd }
        onTouchCancel={ this._onTouchCancel }
        aria-selected={ this.props.selected }
        style={ this.props.style }
        role="gridcell"
        {...this.props.dayProps}
      >
        { this.props.children }
      </span>
    );
  }
}
