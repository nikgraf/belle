'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.has = has;
exports.omit = omit;
exports.filter = filter;
exports.isArrayLike = isArrayLike;
exports.keys = keys;
exports.map = map;
exports.mapObject = mapObject;
exports.find = find;
exports.reverse = reverse;
exports.shift = shift;
exports.isEmpty = isEmpty;
exports.findIndex = findIndex;
exports.first = first;
exports.last = last;
exports.size = size;
exports.some = some;
exports.union = union;
exports.flatten = flatten;
exports.filterReactChildren = filterReactChildren;
exports.getArrayForReactChildren = getArrayForReactChildren;
exports.flattenReactChildren = flattenReactChildren;
exports.uniqueId = uniqueId;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns true if the object contain the given key.
 *
 * @param {object} obj - object to be inspected
 * @param {string} key - name of the property
 */
function has(obj, key) {
  return obj !== undefined && obj !== null && Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Return a copy of the object, filtered to omit the blacklisted keys (or array of keys).
 *
 * @param {object} obj - object the returned object is based on
 * @param {string|string[]} fields - the key or list of keys of the property to omit
 */
function omit(obj, fields) {
  if (obj) {
    var result = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && (!fields || fields.indexOf(key) < 0)) {
        result[key] = obj[key];
      }
    }

    return result;
  }

  return undefined;
}

/**
 * Looks through each value in the list, returning an array of all the values
 * that pass a truth test (predicate).
 *
 * @param {array} iterable - the iterable object to be filtered
 * @param {function} predicate - function returning true when provided with an entry as argument
 * @param {object} [context] - context for the predicate function call
 */
function filter(iterable, predicate, context) {
  if (iterable) {
    var _ret = function () {
      var result = [];
      iterable.forEach(function (obj) {
        if (predicate && predicate.call(context, obj)) {
          result.push(obj);
        }
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  return undefined;
}

/**
 * Returns true if the provided object is an iterable, except for strings for which it will return false.
 *
 * @param {object} obj - object to be inspected
 */
function isArrayLike(obj) {
  if (Array.isArray(obj)) return true;
  if (typeof obj === 'string') return false;
  var length = obj.length;
  return typeof length === 'number' && length >= 0;
}

/**
 * Returns all the names of the object's own properties. This will not include properties inherited through prototypes.
 *
 * @param {object} obj - object to be used
 */
function keys(obj) {
  var objKeys = [];
  for (var key in obj) {
    if (has(obj, key)) objKeys.push(key);
  }return objKeys;
}

/**
 * Returns a new array of values by mapping each value in list through a transformation function (predicate).
 *
 * @param {array} iterable - source iterable
 * @param {function} predicate - function returning the transformed array entry
 */
function map(iterable, predicate) {
  if (iterable) {
    var _ret2 = function () {
      var result = [];
      iterable.forEach(function (elm, index) {
        if (predicate) {
          result[index] = predicate(elm, index);
        }
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  }

  return undefined;
}

/**
 * Returns a new object by mapping each property in an object through a transformation function (predicate).
 *
 * @param {object} obj - object to be based upon
 * @param {function} predicate - function to transform the property
 */
function mapObject(obj, predicate) {
  if (obj) {
    var _ret3 = function () {
      var result = [];
      var objKeys = keys(obj);
      objKeys.forEach(function (key, index) {
        if (predicate) {
          result[index] = predicate(obj[key], key);
        }
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
  }

  return undefined;
}

/**
 * Returns the first value that passes a truth test (predicate), or undefined if
 * no value passes the test. Only works for iterable objects e.g. arrays.
 *
 * @param {array} iterable - the iterable object to be searched
 * @param {function} predicate - function returning true in case of a positive match
 * @param {object} [context] - context for the predicate function call
 */
function find(iterable, predicate, context) {
  if (iterable) {
    var result = void 0;
    for (var index = 0; index < iterable.length; index++) {
      if (predicate && predicate.call(context, iterable[index])) {
        result = iterable[index];
        break;
      }
    }

    return result;
  }

  return undefined;
}

/**
 * Reverse the array passed to it.
 * @param {array} iterable - the array to be reversed.
 */
function reverse(iterable) {
  if (iterable) {
    var result = [];
    for (var index = iterable.length - 1; index >= 0; index--) {
      result.push(iterable[index]);
    }

    return result;
  }

  return undefined;
}

/**
 * Shifts given array by given number of positions.
 * @param {array} iterable - the array to be shifted.
 * @param {array} positions - number of positions shifting is needed.
 */
function shift(iterable, positions) {
  if (iterable) {
    if (positions && positions > 0) {
      var result = [];
      var arrayLength = iterable.length;
      for (var index = 0; index < iterable.length; index++) {
        result.push(iterable[(index + positions) % arrayLength]);
      }

      return result;
    }

    return iterable;
  }

  return undefined;
}

/**
 * Returns true if object contains no values (no enumerable own-properties).
 *
 * @param {Object} obj - an object
 */
function isEmpty(obj) {
  return !obj || Array.isArray(obj) && obj.length === 0 || Object.keys(obj).length === 0;
}

/**
 * Returns the index of the first value that passes a truth test (predicate), or undefined if
 * no value passes the test. Only works for iterable objects e.g. arrays.
 *
 * @param {array} iterable - the iterable object to be searched
 * @param {function} predicate - function returning true in case of a positive match
 * @param {object} [context] - context for the predicate function call
 */
function findIndex(iterable, predicate, context) {
  if (iterable) {
    var result = void 0;
    for (var index = 0; index < iterable.length; index++) {
      if (predicate && predicate.call(context, iterable[index])) {
        result = index;
        break;
      }
    }

    return result;
  }

  return undefined;
}

/**
 * Returns the first element of an iterable object.
 *
 * @param {array} iterable - must be an iterable object
 */
function first(iterable) {
  if (iterable && iterable.length > 0) {
    return iterable[0];
  }

  return undefined;
}

/**
 * Returns the last element of an iterable object.
 *
 * @param {array} iterable - must be an iterable object
 */
function last(iterable) {
  if (iterable && iterable.length > 0) {
    return iterable[iterable.length - 1];
  }

  return undefined;
}

/**
 * Return the number of values in the list.
 *
 * @param {array} iterable - must be an iterable object
 */
function size(iterable) {
  if (iterable) {
    return iterable.length;
  }

  return 0;
}

/**
 * Returns true if any of the values in the list pass the predicate truth test.
 *
 * @param {array} iterable - iterable object to be searched
 * @param {function} predicate - function returning true in case of a positive match
 * @param {object} [context] - context for the predicate function call
 */
function some(iterable, predicate, context) {
  if (iterable) {
    var result = void 0;
    for (var index = 0; index < iterable.length; index++) {
      if (predicate && predicate.call(context, iterable[index])) {
        result = true;
        break;
      }
    }

    return result;
  }

  return undefined;
}

/**
 * Returns the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.
 *
 * @param {...array} arrs - at least two iterable objects must be provide
 */
function union() {
  for (var _len = arguments.length, arrs = Array(_len), _key = 0; _key < _len; _key++) {
    arrs[_key] = arguments[_key];
  }

  if (arrs) {
    var _ret4 = function () {
      var result = [];
      arrs.forEach(function (arr) {
        if (arr) {
          arr.forEach(function (obj) {
            if (result.indexOf(obj) < 0) {
              result.push(obj);
            }
          });
        }
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
  }

  return undefined;
}

/**
 * Recursive function for flattening an iterable.
 *
 * @param {object} output - base object to be updated
 * @param {object} element - input object to be merged into the output
 */
function flattenInternal(output, element) {
  if (element) {
    element.forEach(function (obj) {
      if (Array.isArray(obj)) {
        flattenInternal(output, obj);
      } else {
        output.push(obj);
      }
    });
  }
}

/**
 * Flattens a nested array (the nesting can be to any depth).
 *
 * @param {...array} arrays - at least one array must be provided
 */
function flatten() {
  for (var _len2 = arguments.length, arrays = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    arrays[_key2] = arguments[_key2];
  }

  if (arrays) {
    var result = [];
    flattenInternal(result, arrays);
    return result;
  }

  return undefined;
}

/**
 * Looks through a collection of React children elements, filtering them according to the predicate passed.
 *
 * @param {Array/Object} children - colleciton of >=1 react elements
 * @param {function} predicate - function returning true when provided with an entry as argument
 */
function filterReactChildren(children, predicate) {
  var _this = this;

  if (children) {
    var _ret5 = function () {
      var result = [];
      _react2.default.Children.forEach(children, function (entry) {
        if (predicate && predicate.call(_this, entry)) {
          result.push(entry);
        }
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
  }

  return undefined;
}

/**
 * Looks through a collection of React children elements, filtering them according to the predicate passed.
 *
 * @param {Array/Object} children - collection of >=1 react elements
 */
function getArrayForReactChildren(children) {
  if (children) {
    var _ret6 = function () {
      var result = [];
      _react2.default.Children.forEach(children, function (entry) {
        result.push(entry);
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object") return _ret6.v;
  }

  return undefined;
}

function flattenReactChildren(children) {
  if (!isEmpty(children)) {
    if (Array.isArray(children)) {
      return flatten(children);
    }

    return getArrayForReactChildren(children);
  }

  return undefined;
}

function uniqueId() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}