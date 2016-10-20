'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectStyles = injectStyles;
exports.removeStyle = removeStyle;
exports.removeAllStyles = removeAllStyles;

exports.default = function (styleId, style, pseudoClass, disabled) {
  injectStyleTag();
  updateStore(styleId, style, pseudoClass, disabled);
  updateStyling();
};

var _helpers = require('../utils/helpers');

var _CSSPropertyOperations = require('react/lib/CSSPropertyOperations');

var _CSSPropertyOperations2 = _interopRequireDefault(_CSSPropertyOperations);

var _exenv = require('exenv');

var _animations = require('../style/animations');

var _animations2 = _interopRequireDefault(_animations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleElement = void 0;
var styleStorage = {};

/**
 * Injects the provided style into the styleStore.
 */
function injectStyleTag() {
  if (!styleElement && _exenv.canUseDOM) {
    styleElement = document.createElement('style');
    document.body.appendChild(styleElement);
    styleElement.setAttribute('class', 'belle-style');
  }
}

/**
 * Injects the provided style into the styleStore.
 */
function updateStore(styleId, style, pseudoClass, disabled) {
  styleStorage[styleId] = styleStorage[styleId] || {};
  if (disabled) {
    styleStorage[styleId].disabledPseudoClasses = styleStorage[styleId].disabledPseudoClasses || {};
    styleStorage[styleId].disabledPseudoClasses[pseudoClass] = style;
  } else {
    styleStorage[styleId].pseudoClasses = styleStorage[styleId].pseudoClasses || {};
    styleStorage[styleId].pseudoClasses[pseudoClass] = style;
  }
}

/**
 * Constructs all the stored styles & injects them to the DOM.
 */
function createMarkupOnPseudoClass(pseudoClasses, id, disabled) {
  return (0, _helpers.mapObject)(pseudoClasses, function (style, pseudoClass) {
    if (style && Object.keys(style).length > 0) {
      var styleString = _CSSPropertyOperations2.default.createMarkupForStyles(style);
      var styleWithImportant = styleString.replace(/;/g, ' !important;');

      return disabled ? '.' + id + '[disabled]:' + pseudoClass + ' {' + styleWithImportant + '}' : '.' + id + ':' + pseudoClass + ' {' + styleWithImportant + '}';
    }

    return undefined;
  });
}

function updateStyling() {
  var styles = (0, _helpers.mapObject)(styleStorage, function (storageEntry, id) {
    var pseudoClassesArray = [];

    if (storageEntry.pseudoClasses) {
      pseudoClassesArray.push(createMarkupOnPseudoClass(storageEntry.pseudoClasses, id, false));
    }

    if (storageEntry.disabledPseudoClasses) {
      pseudoClassesArray.push(createMarkupOnPseudoClass(storageEntry.disabledPseudoClasses, id, true));
    }

    return pseudoClassesArray;
  });
  if (styleElement) {
    styleElement.innerHTML = (0, _helpers.flatten)([_animations2.default, styles]).join(' ');
  }
}

/**
 * Injects a style tag and adds multiple passed styles.
 *
 * By using this function someone can make sure the DOM is updated only once.
 *
 * @example
 * ```
 * const styles = [
 *   {
 *     id: 'style-0.0.2',
 *     style: { color: '#F00' },
 *     pseudoClass: 'hover'
 *   }
 * ];
 * injectStyles(styles);
 * ```
 */
function injectStyles(styles) {
  injectStyleTag();
  styles.forEach(function (style) {
    updateStore(style.id, style.style, style.pseudoClass, style.disabled);
  });
  updateStyling();
}

/**
 * Removes all pseudoClass styles based on the provided styleId.
 */
function removeStyle(styleId) {
  delete styleStorage[styleId];
  updateStyling();
}

/**
 * Removes all pseudoClass styles based on all provided styleIds.
 */
function removeAllStyles(styleIds) {
  styleIds.forEach(function (styleId) {
    delete styleStorage[styleId];
  });
  updateStyling();
}

/**
 * Injects a style tag and adds the passed style for the provided pseudoClass.
 */