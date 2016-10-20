'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Belle internal component to wrap a DisabledDay in a DatePicker.
 *
 * This component exists to avoid binding functions in JSX.
 */
var DisabledDay = function (_Component) {
  _inherits(DisabledDay, _Component);

  function DisabledDay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DisabledDay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DisabledDay.__proto__ || Object.getPrototypeOf(DisabledDay)).call.apply(_ref, [this].concat(args))), _this), _this._onMouseEnter = function (event) {
      _this.props.onDayMouseEnter(_this.props.dateKey, event);
    }, _this._onMouseLeave = function (event) {
      _this.props.onDayMouseLeave(_this.props.dateKey, event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DisabledDay, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        _extends({
          style: this.props.style,
          onMouseEnter: this._onDayMouseEnter,
          onMouseLeave: this._onDayMouseLeave
        }, this.props.disabledDayProps),
        this.props.children
      );
    }
  }]);

  return DisabledDay;
}(_react.Component);

DisabledDay.displayName = 'DisabledDay';
DisabledDay.propTypes = {
  children: _react.PropTypes.node.isRequired,
  dateKey: _react.PropTypes.string.isRequired,
  onDayMouseEnter: _react.PropTypes.func.isRequired,
  onDayMouseLeave: _react.PropTypes.func.isRequired,
  style: _react.PropTypes.object.isRequired,
  disabledDayProps: _react.PropTypes.any
};
exports.default = DisabledDay;