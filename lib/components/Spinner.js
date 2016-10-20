'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _spinner = require('../style/spinner');

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var animationDelay = function animationDelay(delay) {
  return {
    MozAnimationDelay: delay,
    WebkitAnimationDelay: delay,
    OAnimationDelay: delay,
    animationDelay: delay
  };
};

/**
 * Spinner component to be used as loading indicator.
 */

var Spinner = function (_Component) {
  _inherits(Spinner, _Component);

  function Spinner() {
    _classCallCheck(this, Spinner);

    return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).apply(this, arguments));
  }

  _createClass(Spinner, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var style = _props.style;
      var characterProps = _props.characterProps;
      var characterStyle = _props.characterStyle;

      var childProps = _objectWithoutProperties(_props, ['style', 'characterProps', 'characterStyle']);

      var computedCharStyle = _extends({}, _spinner2.default.characterStyle, characterStyle);
      return _react2.default.createElement(
        'span',
        _extends({}, childProps, { style: _extends({}, _spinner2.default.style, style) }),
        _react2.default.createElement(
          'span',
          _extends({}, characterProps, { style: computedCharStyle }),
          '.'
        ),
        _react2.default.createElement(
          'span',
          _extends({}, characterProps, { style: _extends({}, computedCharStyle, animationDelay('400ms')) }),
          '.'
        ),
        _react2.default.createElement(
          'span',
          _extends({}, characterProps, { style: _extends({}, computedCharStyle, animationDelay('800ms')) }),
          '.'
        )
      );
    }
  }]);

  return Spinner;
}(_react.Component);

Spinner.displayName = 'Spinner';
Spinner.propTypes = {
  characterProps: _react.PropTypes.object,
  characterStyle: _react.PropTypes.object,
  style: _react.PropTypes.object
};
exports.default = Spinner;