import React, { Component, PropTypes } from 'react';

/**
 * Belle internal component to wrap an Option in a ComboBox.
 *
 * This component exists to avoid binding functions in JSX.
 */
export default class ComboBoxItem extends Component {

  static displayName = 'ComboBoxItem';

  static propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onItemTouchStart: PropTypes.func.isRequired,
    onItemTouchEnd: PropTypes.func.isRequired,
    onItemTouchCancel: PropTypes.func.isRequired,
    onItemMouseEnter: PropTypes.func.isRequired,
    onItemMouseLeave: PropTypes.func.isRequired,
  };

  _onClick = () => {
    this.props.onItemClick(this.props.index);
  };

  _onTouchStart = (event) => {
    this.props.onItemTouchStart(event, this.props.index);
  };

  _onTouchEnd = (event) => {
    this.props.onItemTouchEnd(event, this.props.index);
  };

  _onTouchCancel = () => {
    this.props.onItemTouchCancel();
  };

  _onMouseEnter = () => {
    this.props.onItemMouseEnter(this.props.index);
  };

  _onMouseLeave = () => {
    this.props.onItemMouseLeave();
  };

  _onMouseDown = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <li
        onClick={ this._onClick }
        onMouseEnter={ () => this._onMouseEnter }
        onMouseLeave={ this._onMouseLeave }
        onMouseDown={ this._onMouseDown }
        onTouchStart={ this._onTouchStart }
        onTouchEnd={ this._onTouchEnd }
        onTouchCancel={ this._onTouchCancel }
        role="option"
      >
        { this.props.children }
      </li>
    );
  }
}
