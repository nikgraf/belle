'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _radio = require('../style/radio');

var _radio2 = _interopRequireDefault(_radio);

var _radio3 = require('../config/radio');

var _radio4 = _interopRequireDefault(_radio3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var radioPropTypes = {
  onChange: _react.PropTypes.func,
  defaultChecked: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  inputStyle: _react.PropTypes.object,
  textStyle: _react.PropTypes.object,
  inputDefaultStyle: _react.PropTypes.object,
  wrapperStyle: _react.PropTypes.object,
  wrapperRadioStyle: _react.PropTypes.object,
  disabledStyle: _react.PropTypes.object,
  wrapperCheckedRadioStyle: _react.PropTypes.object,
  inputStyleChecked: _react.PropTypes.object
};

var Radio = function (_Component) {
  _inherits(Radio, _Component);

  function Radio(properties) {
    _classCallCheck(this, Radio);

    var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, properties));

    _this.state = {
      checked: properties.defaultChecked === true
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(Radio, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.checked !== this.state.checked) {
        this.setState({ checked: nextProps.checked });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ checked: event.target.checked });
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          value = _props.value,
          onFocus = _props.onFocus,
          onBlur = _props.onBlur;


      var wrapperStyle = _extends({}, _radio2.default.style, this.props.style);

      var wrapperRadioStyle = _extends({}, _radio2.default.wrapperRadioStyle, this.props.wrapperRadioStyle);

      var inputStyle = _extends({}, _radio2.default.inputStyle, this.props.inputStyle);

      var textStyle = _extends({}, _radio2.default.textStyle, this.props.textStyle);

      var inputDefaultStyle = _extends({}, _radio2.default.inputDefaultStyle, this.props.inputDefaultStyle);

      if (this.props._isDisabled) {
        inputStyle = _extends({}, inputStyle, _radio2.default.disabledStyle, this.props.disabledStyle);
      }

      if (this.state.checked && !this.props._isDisabled) {
        wrapperRadioStyle = _extends({}, wrapperRadioStyle, _radio2.default.wrapperCheckedRadioStyle, this.props.wrapperCheckedRadioStyle);
        inputStyle = _extends({}, inputStyle, _radio2.default.inputStyleChecked, this.props.inputStyleChecked);
      }

      return _react2.default.createElement(
        'label',
        { style: wrapperStyle },
        _react2.default.createElement(
          'span',
          { style: wrapperRadioStyle },
          _react2.default.createElement('input', {
            ref: 'input',
            type: 'radio',
            name: name,
            value: value,
            onChange: this.handleChange,
            style: inputDefaultStyle,
            checked: this.state.checked
          }),
          _react2.default.createElement('span', { style: inputStyle })
        ),
        this.props.children !== undefined ? _react2.default.createElement(
          'span',
          { style: textStyle },
          this.props.children
        ) : null
      );
    }
  }]);

  return Radio;
}(_react.Component);

Radio.displayName = 'Radio';
Radio.propTypes = radioPropTypes;
exports.default = Radio;