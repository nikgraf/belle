'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateTextareaHeight;

var _exenv = require('exenv');

// our height calculation logic is not compatible with jsdom
var isNodeTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';
var canUseDOM = _exenv.canUseDOM && !isNodeTest;

var hiddenTextarea = void 0;
var computedStyleCache = {};

// !important is used here to avoid side-effects from global set CSS.
var hiddenTextareaStyle = '\n  min-height:none !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';

var stylesToCopy = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

/**
 * Returns an object containing the computed style and the combined vertical
 * padding size, combined vertical border size and box-sizing value.
 *
 * This style is returned as string to be applied as attribute of an element.
 */
function calculateStyling(node) {
  var reactId = node.getAttribute('data-reactid');

  // calculate the computed style only once it's not in the cache
  if (!computedStyleCache[reactId]) {
    // In order to work with legacy browsers the second paramter for pseudoClass
    // has to be provided http://caniuse.com/#feat=getcomputedstyle
    var computedStyle = window.getComputedStyle(node, null);

    var boxSizing = computedStyle.getPropertyValue('box-sizing') || computedStyle.getPropertyValue('-moz-box-sizing') || computedStyle.getPropertyValue('-webkit-box-sizing');

    var verticalPaddingSize = 0;
    verticalPaddingSize = parseFloat(computedStyle.getPropertyValue('padding-bottom')) + parseFloat(computedStyle.getPropertyValue('padding-top'));

    var verticalBorderSize = 0;
    verticalBorderSize = parseFloat(computedStyle.getPropertyValue('border-bottom-width')) + parseFloat(computedStyle.getPropertyValue('border-top-width'));

    var sizingStyle = stylesToCopy.map(function (styleName) {
      return styleName + ':' + computedStyle.getPropertyValue(styleName) + '  !important';
    }).join(';');

    // store the style, vertical padding size, vertical border size and
    // boxSizing inside the cache
    computedStyleCache[reactId] = {
      style: sizingStyle,
      verticalPaddingSize: verticalPaddingSize,
      verticalBorderSize: verticalBorderSize,
      boxSizing: boxSizing
    };
  }

  return computedStyleCache[reactId];
}

/**
 * Returns an object containing height of the textare as if all the content
 * would be visible. The minHeight & maxHeight are in the object as well and are
 * based on minRows & maxRows.
 *
 * In order to improve the performance a hidden textarea is added to the DOM
 * and used for further caluculations. In addition the styling of each textarea
 * is cached to improve performance.
 */
function calculateTextareaHeight(textareaElement) {
  var textareaValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  var minRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var maxRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var minHeight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var maxHeight = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  // Regarding textareaValue: IE will return a height of 0 in case the textare is empty.
  // To prevent reducing the size to 0 we simply use a dummy text.
  if (!canUseDOM) {
    return 0;
  }

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
    hiddenTextarea.setAttribute('class', 'belle-input-helper');
  }

  var _calculateStyling = calculateStyling(textareaElement),
      style = _calculateStyling.style,
      verticalPaddingSize = _calculateStyling.verticalPaddingSize,
      verticalBorderSize = _calculateStyling.verticalBorderSize,
      boxSizing = _calculateStyling.boxSizing;

  hiddenTextarea.setAttribute('style', style + ';' + hiddenTextareaStyle);
  hiddenTextarea.value = textareaValue;

  var calculatedMinHeight = void 0;
  var calculatedMaxHeight = void 0;
  var height = hiddenTextarea.scrollHeight;

  // for a textarea with border-box, the border width has to be added while
  // for content-box it's necessary to subtract the padding
  if (boxSizing === 'border-box') {
    // border-box: content + padding + border
    height = height + verticalBorderSize;
  } else if (boxSizing === 'content-box') {
    // content-box: content
    height = height - verticalPaddingSize;
  }

  if (minRows !== null && minHeight === null || maxRows !== null && maxHeight === null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = '-';
    var singleRowHeight = hiddenTextarea.scrollHeight - verticalPaddingSize;

    if (minRows !== null && minHeight === null) {
      calculatedMinHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        calculatedMinHeight = calculatedMinHeight + verticalPaddingSize + verticalBorderSize;
      }
    }

    if (maxRows !== null && maxHeight === null) {
      calculatedMaxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        calculatedMaxHeight = calculatedMaxHeight + verticalPaddingSize + verticalBorderSize;
      }
    }
  }

  var finalMinHeight = minHeight || calculatedMinHeight;
  if (finalMinHeight) {
    height = Math.max(finalMinHeight, height);
  }

  var finalMaxHeight = maxHeight || calculatedMaxHeight;
  if (finalMaxHeight) {
    height = Math.min(finalMaxHeight, height);
  }

  return height;
}