import React, {Component, PropTypes} from 'react';
import actionAreaStyle from '../style/actionArea';

/**
 * ActionArea
 *
 * The purpose of this component is to provide a button like behaviour for a
 * click like interaction within other components. Button can't be used in such
 * cases as it always will have it's own focus which is not desired in
 * components like DatePicker e.g. next month button.
 *
 * Note: Use the ActionArea's onUpdate instead of onClick as otherwise on iOS9
 * the ActionArea will trigger onFocus for it's parent with a set tabindex.
 */
export default class ActionArea extends Component {

  constructor(properties) {
    super(properties);
    const { style, ...childProps } = properties;
    this.childProps = childProps;
  }

  static displayName = 'ActionArea';

  static propTypes = {
    activeStyle: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    hoverStyle: PropTypes.object,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchCancel: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,

    // TODO investigate how we solve mouseUp in other compents (like the right click edgecase)
    onMouseUp: PropTypes.func,
    onUpdate: PropTypes.func,
    style: PropTypes.object,
  };

  state = {
    // Note: On touch devices mouseEnter is fired while mouseLeave is not.
    // This would result in a hover effect that keeps active until another
    // element is focused on. This would result in the same behaviour as using
    // the :hover pseudo class. To prevent it from happening activating the
    // hover state is prevented when a touch event has been triggered before.
    // source: http://stackoverflow.com/a/22444532/837709
    isIgnoringHover: false,
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
   * As soon as the mouse enters the component the isHovered state is activated.
   *
   * The state isHovered is not set to true in case onMouseEnter was triggered
   * by a touch event.
   */
  _onMouseEnter(event) {
    if (!this.state.isIgnoringHover) {
      this.setState({
        isHovered: true,
        isIgnoringHover: false,
      });
    }

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  }

  /**
   * Deactivate the isHovered state.
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
   * Activates the active state in case the main mouse button was pressed.
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
   * Triggers onUpdate in case the mouse button was pressed on this element.
   *
   * In addition the active state is deactivated.
   */
  _onMouseUp(event) {
    const isActive = this.state.isActive;
    if (event.button === 0) {
      this.setState({
        isActive: false,
      });
    }

    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }

    if (event.button === 0 && isActive && this.props.onUpdate) {
      this.props.onUpdate({});
    }
  }

  /**
   * Updates the button to be active and makes sure the next onMouseEnter is
   * ignored.
   */
  _onTouchStart(event) {
    if (event.touches.length === 1) {
      this.setState({
        isActive: true,
        isIgnoringHover: true,
      });
    }

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  }

  /**
   * Triggers onUpdate in case the touch event started on this element and makes
   * sure the next onMouseEnter is ignored.
   */
  _onTouchEnd() {
    const isActive = this.state.isActive;

    this.setState({
      isActive: false,
      isIgnoringHover: true,
    });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }

    if (isActive && this.props.onUpdate) {
      this.props.onUpdate({});
    }
  }

  /**
   * Updates the button to be release and makes sure the next onMouseEnter is
   * ignored.
   */
  _onTouchCancel() {
    this.setState({
      isActive: false,
      isIgnoringHover: true,
    });

    if (this.props.onTouchCancel) {
      this.props.onTouchCancel(event);
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
