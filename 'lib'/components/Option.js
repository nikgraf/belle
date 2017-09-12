'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('../utils/helpers');

var _option = require('../style/option');

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var optionPropTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  style: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  selectStyle: _react.PropTypes.object,
  disabledSelectStyle: _react.PropTypes.object,
  _isDisplayedAsSelected: _react.PropTypes.bool,
  value: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number]).isRequired,
  identifier: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number])
};

/**
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return (0, _helpers.omit)(properties, Object.keys(optionPropTypes));
}

/**
 * Option component.
 *
 * This component should be used together with Belle's Select.
 */

var Option = function (_Component) {
  _inherits(Option, _Component);

  function Option(properties) {
    _classCallCheck(this, Option);

    var _this = _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, properties));

    _this.state = {
      childProps: sanitizeChildProps(properties)
    };
    return _this;
  }

  _createClass(Option, [{
    key: 'componentWillReceiveProps',


    /**
     * Update the childProps based on the updated properties passed to the
     * Option.
     */
    value: function componentWillReceiveProps(properties) {
      this.setState({ childProps: sanitizeChildProps(properties) });
    }
  }, {
    key: 'render',
    value: function render() {
      var optionStyle = void 0;

      if (this.props._isDisplayedAsSelected) {
        optionStyle = _extends({}, _option2.default.selectStyle, this.props.selectStyle);
        if (this.context.isDisabled) {
          optionStyle = _extends({}, optionStyle, _option2.default.disabledSelectStyle, this.props.disabledSelectStyle);
        }
      } else {
        optionStyle = _extends({}, _option2.default.style, this.props.style);
        if (this.context.isHoveredValue === this.props.value) {
          optionStyle = _extends({}, optionStyle, _option2.default.hoverStyle, this.props.hoverStyle);
        }
      }

      return _react2.default.createElement(
        'div',
        _extends({
          style: optionStyle
        }, this.state.childProps),
        this.props.children
      );
    }
  }]);

  return Option;
}(_react.Component);

Option.displayName = 'Option';
Option.propTypes = optionPropTypes;
Option.contextTypes = {
  isDisabled: _react.PropTypes.bool.isRequired,
  isHoveredValue: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number])
};
Option.defaultProps = {
  _isDisplayedAsSelected: false
};
exports.default = Option;