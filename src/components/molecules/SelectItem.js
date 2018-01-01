import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Belle internal component to wrap an Option in a Select.
 *
 * This component exists to avoid binding functions in JSX.
 */
export class SelectItem extends Component {

  static displayName = 'SelectItem';

  static propTypes = {
    children: PropTypes.node.isRequired,
    isHovered: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onItemTouchStart: PropTypes.func.isRequired,
    onItemTouchMove: PropTypes.func.isRequired,
    onItemTouchEnd: PropTypes.func.isRequired,
    onItemTouchCancel: PropTypes.func.isRequired,
    onItemMouseEnter: PropTypes.func.isRequired,
  };

  _onClick = () => {
    this.props.onItemClick(this.props.index);
  };

  _onTouchStart = (event) => {
    this.props.onItemTouchStart(event, this.props.index);
  };

  _onTouchMove = () => {
    this.props.onItemTouchMove();
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

  render() {
    return (
      <li
        onMouseDown={ this._onClick }
        onTouchStart={ this._onTouchStart }
        onTouchMove={ this._onTouchMove }
        onTouchEnd={ this._onTouchEnd }
        onTouchCancel={ this._onTouchCancel }
        onMouseEnter={ this._onMouseEnter }
        role="option"
        aria-selected={ this.props.isHovered }
      >
        { this.props.children }
      </li>
    );
  }
}
