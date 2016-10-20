'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Belle internal component to wrap an Option in a Select.
 *
 * This component exists to avoid binding functions in JSX.
 */
var SelectItem = function (_Component) {
  _inherits(SelectItem, _Component);

  function SelectItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectItem.__proto__ || Object.getPrototypeOf(SelectItem)).call.apply(_ref, [this].concat(args))), _this), _this._onClick = function () {
      _this.props.onItemClick(_this.props.index);
    }, _this._onTouchStart = function (event) {
      _this.props.onItemTouchStart(event, _this.props.index);
    }, _this._onTouchMove = function () {
      _this.props.onItemTouchMove();
    }, _this._onTouchEnd = function (event) {
      _this.props.onItemTouchEnd(event, _this.props.index);
    }, _this._onTouchCancel = function () {
      _this.props.onItemTouchCancel();
    }, _this._onMouseEnter = function () {
      _this.props.onItemMouseEnter(_this.props.index);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectItem, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'li',
        {
          onClick: this._onClick,
          onTouchStart: this._onTouchStart,
          onTouchMove: this._onTouchMove,
          onTouchEnd: this._onTouchEnd,
          onTouchCancel: this._onTouchCancel,
          onMouseEnter: this._onMouseEnter,
          role: 'option',
          'aria-selected': this.props.isHovered
        },
        this.props.children
      );
    }
  }]);

  return SelectItem;
}(_react.Component);

SelectItem.displayName = 'SelectItem';
SelectItem.propTypes = {
  children: _react.PropTypes.node.isRequired,
  isHovered: _react.PropTypes.bool.isRequired,
  index: _react.PropTypes.number.isRequired,
  onItemClick: _react.PropTypes.func.isRequired,
  onItemTouchStart: _react.PropTypes.func.isRequired,
  onItemTouchMove: _react.PropTypes.func.isRequired,
  onItemTouchEnd: _react.PropTypes.func.isRequired,
  onItemTouchCancel: _react.PropTypes.func.isRequired,
  onItemMouseEnter: _react.PropTypes.func.isRequired
};
exports.default = SelectItem;