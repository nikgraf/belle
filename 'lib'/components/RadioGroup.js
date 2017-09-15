'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var groupPropTypes = {
  onChange: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  defaultValue: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  style: _react.PropTypes.object
};

var RadioGroup = function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup(props) {
    _classCallCheck(this, RadioGroup);

    var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

    var value = void 0;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    }
    _this.state = {
      value: value
    };

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(RadioGroup, [{
    key: 'onChange',
    value: function onChange(e) {
      var lastValue = this.state.value;
      var value = e.target.value;

      this.setState({
        value: value
      });

      this.props.onChange(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var children = void 0;
      var inputs = this.props.children.reduce(function (data, item) {
        if (item && item.type !== undefined) {
          var props = item.props;
          data.push(_extends({
            disabled: false
          }, props));
        }
        return data;
      }, []);

      if (inputs && inputs.length > 0) {
        children = inputs.map(function (input, index) {
          return _react2.default.createElement(
            'div',
            { key: index, style: _this2.props.style,
              onMouseEnter: _this2.props.onMouseEnter,
              onMouseLeave: _this2.props.onMouseLeave },
            _react2.default.createElement(
              _Radio2.default,
              {
                disabled: input.disabled,
                value: input.value,
                onChange: _this2.onChange,
                checked: _this2.state.value === input.value
              },
              input.children
            )
          );
        });
      }

      return _react2.default.createElement(
        'div',
        null,
        children
      );
    }
  }]);

  return RadioGroup;
}(_react.Component);

RadioGroup.propTypes = groupPropTypes;
exports.default = RadioGroup;