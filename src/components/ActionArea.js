import React, {Component, PropTypes} from 'react';
import actionAreaStyle from '../style/actionArea';

/**
 * ActionArea
 */
export default class ActionArea extends Component {

  constructor(properties) {
    super(properties);
    const { style, ...childProps } = properties;
    this.childProps = childProps;
  }

  static displayName = 'ActionArea';

  static propTypes = {
    activeStyle: React.PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    hoverStyle: React.PropTypes.object,
    onTouchStart: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchCancel: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,

    // TODO investigate how we solve mouseUp in other compents (like the right click edgecase)
    onMouseUp: React.PropTypes.func,
    style: React.PropTypes.object,
  };

  state = {
    isActive: false,
    isHovered: false,
  }

  /**
   * Update the childProps based on the updated properties passed to the card.
   */
  componentWillReceiveProps(properties) {
    const { style, ...childProps } = properties;
    this.childProps = childProps;
  }

  /**
   * TODO
   */
  _onMouseEnter(event) {
    this.setState({
      isHovered: true,
    });

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  }

  /**
   * TODO
   */
  _onMouseLeave(event) {
    this.setState({
      isHovered: false,
    });

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  }

  /**
   * TODO
   */
  _onMouseDown(event) {
    if (event.button === 0) {
      this.setState({
        isActive: true,
      });
    }

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  }

  /**
   * TODO
   */
  _onMouseUp(event) {
    if (event.button === 0) {
      this.setState({
        isActive: false,
      });
    }

    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  }

  /**
   * TODO
   */
  _onTouchStart(event) {
    if (event.touches.length === 1) {
      this._increaseMonthYear();
      this.setState({
        isActive: true,
      });
    }

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  }

  /**
   * TODO
   */
  _onTouchEnd() {
    this.setState({
      isActive: false,
    });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  /**
   * TODO
   */
  _onTouchCancel() {
    this.setState({
      isActive: false,
    });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  }

  render() {
    let style = { ...actionAreaStyle.style, ...this.props.style };
    if (this.state.isHovered) {
      style = {
        ...style,
        ...actionAreaStyle.hoverStyle,
        ...this.props.hoverStyle,
      };
    }

    if (this.state.isActive) {
      style = {
        ...style,
        ...actionAreaStyle.activeStyle,
        ...this.props.activeStyle,
      };
    }

    return (
      <div {...this.childProps}
           onMouseDown={ ::this._onMouseDown }
           onMouseUp={ ::this._onMouseUp }
           onMouseEnter={ ::this._onMouseEnter }
           onMouseLeave={ ::this._onMouseLeave }
           onTouchStart={ ::this._onTouchStart }
           onTouchEnd={ ::this._onTouchEnd }
           onTouchCancel={ ::this._onTouchCancel }
           style={ style }>
        { this.props.children }
      </div>
    );
  }
}
