'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actionArea = require('../style/actionArea');

var _actionArea2 = _interopRequireDefault(_actionArea);

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var actionAreaPropTypes = {
  activeStyle: _react.PropTypes.object,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  hoverStyle: _react.PropTypes.object,
  onTouchStart: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onTouchCancel: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,

  // TODO investigate how we solve mouseUp in other compents (like the right click edgecase)
  onMouseUp: _react.PropTypes.func,
  onUpdate: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  style: _react.PropTypes.object
};

function sanitizeChildProps(properties) {
  return (0, _helpers.omit)(properties, Object.keys(actionAreaPropTypes));
}

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

var ActionArea = function (_Component) {
  _inherits(ActionArea, _Component);

  function ActionArea(properties) {
    _classCallCheck(this, ActionArea);

    var _this = _possibleConstructorReturn(this, (ActionArea.__proto__ || Object.getPrototypeOf(ActionArea)).call(this, properties));

    _this.state = {
      // Note: On touch devices mouseEnter is fired while mouseLeave is not.
      // This would result in a hover effect that keeps active until another
      // element is focused on. This would result in the same behaviour as using
      // the :hover pseudo class. To prevent it from happening activating the
      // hover state is prevented when a touch event has been triggered before.
      // source: http://stackoverflow.com/a/22444532/837709
      isIgnoringHover: false,
      isActive: false,
      isHovered: false
    };

    _this._onMouseEnter = function (event) {
      if (!_this.state.isIgnoringHover) {
        _this.setState({
          isHovered: true,
          isIgnoringHover: false
        });
      }

      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    };

    _this._onMouseLeave = function (event) {
      _this.setState({
        isHovered: false
      });

      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    };

    _this._onMouseDown = function (event) {
      if (event.button === 0) {
        _this.setState({
          isActive: true
        });
      }

      if (_this.props.onMouseDown) {
        _this.props.onMouseDown(event);
      }
    };

    _this._onMouseUp = function (event) {
      if (event.button === 0) {
        _this.setState({
          isActive: false
        });
      }

      if (_this.props.onMouseUp) {
        _this.props.onMouseUp(event);
      }
    };

    _this._onTouchStart = function (event) {
      if (event.touches.length === 1) {
        _this.setState({
          isActive: true,
          isIgnoringHover: true
        });
      }

      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(event);
      }
    };

    _this._onTouchEnd = function () {
      _this.setState({
        isActive: false,
        isIgnoringHover: true
      });

      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(event);
      }
    };

    _this._onTouchCancel = function () {
      _this.setState({
        isActive: false,
        isIgnoringHover: true
      });

      if (_this.props.onTouchCancel) {
        _this.props.onTouchCancel(event);
      }
    };

    _this._onClick = function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }

      if (_this.props.onUpdate) {
        _this.props.onUpdate({});
      }
    };

    _this.childProps = sanitizeChildProps(properties);
    return _this;
  }

  _createClass(ActionArea, [{
    key: 'componentWillReceiveProps',


    /**
     * Update the childProps based on the updated properties passed to the card.
     */
    value: function componentWillReceiveProps(properties) {
      this.childProps = sanitizeChildProps(properties);
    }

    /**
     * As soon as the mouse enters the component the isHovered state is activated.
     *
     * The state isHovered is not set to true in case onMouseEnter was triggered
     * by a touch event.
     */


    /**
     * Deactivate the isHovered state.
     */


    /**
     * Activates the active state in case the main mouse button was pressed.
     */


    /**
     * Triggers onUpdate in case the mouse button was pressed on this element.
     *
     * In addition the active state is deactivated.
     */


    /**
     * Updates the button to be active and makes sure the next onMouseEnter is
     * ignored.
     */


    /**
     * Triggers onUpdate in case the touch event started on this element and makes
     * sure the next onMouseEnter is ignored.
     */


    /**
     * Updates the button to be release and makes sure the next onMouseEnter is
     * ignored.
     */

  }, {
    key: 'render',
    value: function render() {
      var style = _extends({}, _actionArea2.default.style, this.props.style);
      if (this.state.isHovered) {
        style = _extends({}, style, _actionArea2.default.hoverStyle, this.props.hoverStyle);
      }

      if (this.state.isActive) {
        style = _extends({}, style, _actionArea2.default.activeStyle, this.props.activeStyle);
      }

      return _react2.default.createElement(
        'div',
        _extends({
          role: 'button'
        }, this.childProps, {
          onMouseDown: this._onMouseDown,
          onMouseUp: this._onMouseUp,
          onMouseEnter: this._onMouseEnter,
          onMouseLeave: this._onMouseLeave,
          onTouchStart: this._onTouchStart,
          onTouchEnd: this._onTouchEnd,
          onTouchCancel: this._onTouchCancel,
          onClick: this._onClick,
          style: style
        }),
        this.props.children
      );
    }
  }]);

  return ActionArea;
}(_react.Component);

ActionArea.displayName = 'ActionArea';
ActionArea.propTypes = actionAreaPropTypes;
exports.default = ActionArea;