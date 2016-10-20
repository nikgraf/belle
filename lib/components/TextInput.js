'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _calculateTextareaHeight = require('../utils/calculate-textarea-height');

var _calculateTextareaHeight2 = _interopRequireDefault(_calculateTextareaHeight);

var _injectStyle = require('../utils/inject-style');

var _unionClassNames = require('../utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _helpers = require('../utils/helpers');

var _textInput = require('../style/text-input');

var _textInput2 = _interopRequireDefault(_textInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var newLineRegex = /[\r\n]/g;

var textInputPropTypes = {
  className: _react.PropTypes.string,
  minHeight: _react.PropTypes.number,
  maxHeight: _react.PropTypes.number,
  minRows: _react.PropTypes.number,
  maxRows: _react.PropTypes.number,
  style: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  focusStyle: _react.PropTypes.object,
  allowNewLine: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  disabledStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,
  onUpdate: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  value: _react.PropTypes.string,
  defaultValue: _react.PropTypes.string,
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.string.isRequired,
    requestChange: _react.PropTypes.func.isRequired
  })
};

/**
 * Returns an object with properties that are relevant for the TextInput's textarea.
 *
 * As the height of the textarea needs to be calculated valueLink can not be
 * passed down to the textarea, but made available through this component.
 */
function sanitizeChildProps(properties) {
  var childProps = (0, _helpers.omit)(properties, Object.keys(textInputPropTypes));
  if (_typeof(properties.valueLink) === 'object') {
    childProps.value = properties.valueLink.value;
  }

  return childProps;
}

/**
 * Update hover & focus style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing hoverStyle & focusStyle
 */
function updatePseudoClassStyle(styleId, properties) {
  var hoverStyle = _extends({}, _textInput2.default.hoverStyle, properties.hoverStyle);
  var focusStyle = _extends({}, _textInput2.default.focusStyle, properties.focusStyle);
  var disabledHoverStyle = _extends({}, _textInput2.default.disabledHoverStyle, properties.disabledHoverStyle);

  var styles = [{
    id: styleId,
    style: hoverStyle,
    pseudoClass: 'hover'
  }, {
    id: styleId,
    style: focusStyle,
    pseudoClass: 'focus'
  }, {
    id: styleId,
    style: disabledHoverStyle,
    pseudoClass: 'hover',
    disabled: true
  }];
  (0, _injectStyle.injectStyles)(styles);
}

/**
 * TextInput component with great UX like autogrowing & handling states
 *
 * Note on styling: Right now this component doen't allow to change style after
 * initialisation.
 *
 * Note on resizing:
 * If you fill a textarea only with spaces and the cursor reaches the right end
 * it won't break the line. This leads to unexpected behaviour for the automatic
 * resizing.
 *
 * This component was highly inspired by the great work from these guys
 * - Andrey Popp: https://github.com/andreypopp/react-textarea-autosize
 * - Eugene: https://gist.github.com/eugene1g/5dbaa7d35d0c7d5c2c56
 */

var TextInput = function (_Component) {
  _inherits(TextInput, _Component);

  function TextInput(properties) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, properties));

    _this._onKeyDown = function (event) {
      if (!_this.props.allowNewLine && event.key === 'Enter') {
        event.preventDefault();
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(event);
      }
    };

    _this._onChange = function (event) {
      var value = event.target.value;

      if (!_this.props.allowNewLine && value.match(newLineRegex) !== null) {
        value = value.replace(newLineRegex, ' ');
      }

      if ((0, _helpers.has)(_this.props, 'valueLink')) {
        _this.props.valueLink.requestChange(value);
      } else if ((0, _helpers.has)(_this.props, 'defaultValue')) {
        _this.setState({
          inputValue: value
        });
      }

      if (_this.props.onUpdate) {
        _this.props.onUpdate({ value: value });
      }

      _this._triggerResize(value);
    };

    var inputValue = void 0;

    if ((0, _helpers.has)(properties, 'valueLink')) {
      inputValue = properties.valueLink.value;
    } else if ((0, _helpers.has)(properties, 'value')) {
      inputValue = properties.value;
    } else if ((0, _helpers.has)(properties, 'defaultValue')) {
      inputValue = properties.defaultValue;
    }

    _this.state = {
      height: 'auto',
      inputValue: inputValue
    };
    _this.textareaProps = sanitizeChildProps(properties);
    return _this;
  }

  _createClass(TextInput, [{
    key: 'componentWillMount',


    /**
     * Generates the style-id & inject the focus & hover style.
     */
    value: function componentWillMount() {
      var id = (0, _helpers.uniqueId)();
      this._styleId = 'style-id' + id;
      updatePseudoClassStyle(this._styleId, this.props);
    }

    /**
     * Right after the component go injected into the DOM it should be resized.
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._triggerResize(this.state.inputValue);
    }

    /**
     * Update the properties passed to the textarea and resize as with the new
     * properties the height might have changed.
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var _this2 = this;

      // Makes sure we have inputValue available when triggering a resize.
      var newState = {
        inputValue: this.state.inputValue
      };
      if ((0, _helpers.has)(properties, 'valueLink')) {
        newState.inputValue = properties.valueLink.value;
      } else if ((0, _helpers.has)(properties, 'value')) {
        newState.inputValue = properties.value;
      }

      this.textareaProps = sanitizeChildProps(properties);
      (0, _injectStyle.removeStyle)(this._styleId);
      updatePseudoClassStyle(this._styleId, properties);
      this.setState(newState, function () {
        return _this2._triggerResize(newState.inputValue);
      });
    }

    /**
     * Remove a component's associated styles whenever it gets removed from the DOM.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeStyle)(this._styleId);
    }

    /**
     * Prevent any newline (except allowNewLine is active) and pass the event to
     * the onKeyDown property.
     *
     * This is an optimization to avoid adding a newline char & removing it right
     * away in the onUpdate callback.
     */


    /**
     * Update the height and calls the provided change callback for onUpdate
     * or valueLink.
     *
     * In addition newline characters are replaced by spaces in the textarea value
     * in case allowNewLine is set to false and newLine characters could be found.
     */

  }, {
    key: '_triggerResize',


    /**
     * Calculate the height and store the new height in the state to trigger a render.
     */
    value: function _triggerResize(textareaValue) {
      var height = (0, _calculateTextareaHeight2.default)(_reactDom2.default.findDOMNode(this), textareaValue, this.props.minRows, this.props.maxRows, this.props.minHeight, this.props.maxHeight);
      this.setState({ height: height });
    }
  }, {
    key: 'render',
    value: function render() {
      var textareaStyle = _extends({}, _textInput2.default.style, this.props.style);

      if (this.props.disabled) {
        textareaStyle = _extends({}, textareaStyle, _textInput2.default.disabledStyle, this.props.disabledStyle);
      }

      textareaStyle.height = this.state.height;
      return _react2.default.createElement('textarea', _extends({
        style: textareaStyle,
        value: this.state.inputValue,
        className: (0, _unionClassNames2.default)(this.props.className, this._styleId),
        onChange: this._onChange,
        onKeyDown: this._onKeyDown,
        disabled: this.props.disabled
      }, this.textareaProps));
    }
  }]);

  return TextInput;
}(_react.Component);

TextInput.displayName = 'TextInput';
TextInput.propTypes = textInputPropTypes;
TextInput.defaultProps = {
  allowNewLine: false,
  disabled: false
};
exports.default = TextInput;