'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unionClassNames;

var _helpers = require('../utils/helpers');

/**
 * Returns a string containing all classes without duplicates.
 *
 * @param existingClassNames {String} - one or multiple classes
 * @param additionalClassNames {String} - one or multiple classes
 *
 * @example
 * // returns 'style-id-23 button buy-button'
 * unionClassNames('style-id-23 button', 'button buy-button')
 *
 * Originally inspired by https://github.com/rackt/react-autocomplete/blob/master/lib/union-class-names.js
 */
function unionClassNames(existingClassNames, additionalClassNames) {
  if (!existingClassNames && !additionalClassNames) return '';
  if (!existingClassNames) return additionalClassNames;
  if (!additionalClassNames) return existingClassNames;
  return (0, _helpers.union)(existingClassNames.split(' '), additionalClassNames.split(' ')).join(' ');
}