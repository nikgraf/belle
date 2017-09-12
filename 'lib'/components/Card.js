'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('../style/card');

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


/**
 * Card component with a light shadow.
 *
 * This component will apply any attribute to the div that has been provided as
 * property & is valid for a div.
 */
var Card = function (_Component) {
  _inherits(Card, _Component);

  function Card(properties) {
    _classCallCheck(this, Card);

    var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, properties));

    var style = properties.style,
        childProps = _objectWithoutProperties(properties, ['style']); // eslint-disable-line no-unused-vars


    _this.childProps = childProps;
    return _this;
  }

  _createClass(Card, [{
    key: 'componentWillReceiveProps',


    /**
     * Update the childProps based on the updated properties passed to the card.
     */
    value: function componentWillReceiveProps(properties) {
      var style = properties.style,
          childProps = _objectWithoutProperties(properties, ['style']); // eslint-disable-line no-unused-vars


      this.childProps = childProps;
    }
  }, {
    key: 'render',
    value: function render() {
      var divStyle = _extends({}, _card2.default.style, this.props.style);

      return _react2.default.createElement(
        'div',
        _extends({}, this.childProps, { style: divStyle }),
        this.props.children
      );
    }
  }]);

  return Card;
}(_react.Component);

Card.displayName = 'Card';
Card.propTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  style: _react.PropTypes.object
};
exports.default = Card;