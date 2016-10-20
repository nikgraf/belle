'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _isComponentOfType = require('../utils/is-component-of-type.js');

var _isComponentOfType2 = _interopRequireDefault(_isComponentOfType);

var _helpers = require('../utils/helpers');

var _Option = require('../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _Separator = require('../components/Separator');

var _Separator2 = _interopRequireDefault(_Separator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the index of the entry with a certain value from the component's
 * children.
 *
 * The index search includes separator & option components.
 */
var findIndexOfSelectedOption = function findIndexOfSelectedOption(component) {
  var filterFunction = function filterFunction(child) {
    return (0, _isComponentOfType2.default)(_Option2.default, child) || (0, _isComponentOfType2.default)(_Separator2.default, child);
  };
  return (0, _helpers.findIndex)((0, _helpers.filterReactChildren)(component.props.children, filterFunction), function (element) {
    return element.props.value === component.state.selectedValue;
  });
};

var selectConfig = {

  shouldPositionOptions: true,

  /**
   * Repositions to the menu to position the focusedOption right on top
   * of the selected one.
   *
   * @param selectComponent {object} - the Select component itself accessible with `this`
   */
  positionOptions: function positionOptions(selectComponent) {
    var menuNode = _reactDom2.default.findDOMNode(selectComponent.refs.menu);
    var menuStyle = window.getComputedStyle(menuNode, null);
    var menuWidth = parseFloat(menuStyle.getPropertyValue('width'));

    // In case of a placeholder no option is focused on initially
    var optionIndex = void 0;
    if (selectComponent.state.selectedValue) {
      optionIndex = findIndexOfSelectedOption(selectComponent);
    } else {
      optionIndex = 0;
    }

    var option = menuNode.childNodes[optionIndex];

    var menuHeight = parseFloat(menuStyle.getPropertyValue('height'));
    var menuTopBorderWidth = parseFloat(menuStyle.getPropertyValue('border-top-width'));

    // In order to work with legacy browsers the second paramter for pseudoClass
    // has to be provided http://caniuse.com/#feat=getcomputedstyle
    var optionStyle = window.getComputedStyle(option.childNodes[0], null);
    var optionPaddingTop = parseFloat(optionStyle.getPropertyValue('padding-top'));
    var optionPaddingLeft = parseFloat(optionStyle.getPropertyValue('padding-top'));

    var selectedOptionWrapperNode = _reactDom2.default.findDOMNode(selectComponent.refs.selectedOptionWrapper);
    var selectedOptionWrapperStyle = window.getComputedStyle(selectedOptionWrapperNode, null);
    var selectedOptionWrapperPaddingTop = parseFloat(selectedOptionWrapperStyle.getPropertyValue('padding-top'));

    var newTop = option.offsetTop + optionPaddingTop - selectedOptionWrapperPaddingTop + menuTopBorderWidth;
    var newLeft = option.offsetLeft + optionPaddingLeft;

    // Top positioning
    if (menuHeight < menuNode.scrollHeight) {
      if (newTop + menuHeight > menuNode.scrollHeight) {
        // In case scrolling is not enough the box needs to be moved more to
        // the top to match the same position.
        var maxScrollTop = menuNode.scrollHeight - menuHeight;
        menuNode.scrollTop = maxScrollTop;
        menuNode.style.top = '-' + (newTop - maxScrollTop) + 'px';
      } else {
        // In case it's the first entry scrolling is not used to respect the
        // menu's paddingTop.
        if (optionIndex === 0) {
          menuNode.scrollTop = 0;
          menuNode.style.top = '-' + newTop + 'px';
        } else {
          menuNode.scrollTop = newTop;
        }
      }
    } else {
      menuNode.style.top = '-' + newTop + 'px';
    }

    // Left positioning
    menuNode.style.left = '-' + newLeft + 'px';

    // Increasing the width
    //
    // Pro:
    // - It gives a option in the menu the same width
    // as in the selectedOptionWrapper.
    // - There is space to keep the text of the option on the exact same pixel
    // when opening. The menu is symetric in relation to the
    // selectedOptionWrapper.
    //
    // Con:
    // - Adding the padding could cause issue with design as it gets wider than
    // the original field.
    menuNode.style.width = menuWidth + newLeft * 2 + 'px';
  }
};

exports.default = selectConfig;