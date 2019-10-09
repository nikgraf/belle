import React from 'react';

/**
 * Returns true if the object contain the given key.
 *
 * @param {object} obj - object to be inspected
 * @param {string} key - name of the property
 */
export function has(obj, key) {
  return obj !== undefined && obj !== null && Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Return a copy of the object, filtered to omit the blacklisted keys (or array of keys).
 *
 * @param {object} obj - object the returned object is based on
 * @param {string|string[]} fields - the key or list of keys of the property to omit
 */
export function omit(obj, fields) {
  if (obj) {
    const result = {};
    for (const key in obj) {
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
export function filter(iterable, predicate, context) {
  if (iterable) {
    const result = [];
    iterable.forEach((obj) => {
      if (predicate && predicate.call(context, obj)) {
        result.push(obj);
      }
    });
    return result;
  }

  return undefined;
}

/**
 * Returns true if the provided object is an iterable, except for strings for which it will return false.
 *
 * @param {object} obj - object to be inspected
 */
export function isArrayLike(obj) {
  if (Array.isArray(obj)) return true;
  if (typeof obj === 'string') return false;
  const length = obj.length;
  return typeof length === 'number' && length >= 0;
}

/**
 * Returns all the names of the object's own properties. This will not include properties inherited through prototypes.
 *
 * @param {object} obj - object to be used
 */
export function keys(obj) {
  const objKeys = [];
  for (const key in obj) if (has(obj, key)) objKeys.push(key);
  return objKeys;
}

/**
 * Returns a new array of values by mapping each value in list through a transformation function (predicate).
 *
 * @param {array} iterable - source iterable
 * @param {function} predicate - function returning the transformed array entry
 */
export function map(iterable, predicate) {
  if (iterable) {
    const result = [];
    iterable.forEach((elm, index) => {
      if (predicate) {
        result[index] = predicate(elm, index);
      }
    });
    return result;
  }

  return undefined;
}

/**
 * Returns a new object by mapping each property in an object through a transformation function (predicate).
 *
 * @param {object} obj - object to be based upon
 * @param {function} predicate - function to transform the property
 */
export function mapObject(obj, predicate) {
  if (obj) {
    const result = [];
    const objKeys = keys(obj);
    objKeys.forEach((key, index) => {
      if (predicate) {
        result[index] = predicate(obj[key], key);
      }
    });
    return result;
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
export function find(iterable, predicate, context) {
  if (iterable) {
    let result;
    for (let index = 0; index < iterable.length; index++) {
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
export function reverse(iterable) {
  if (iterable) {
    const result = [];
    for (let index = iterable.length - 1; index >= 0; index--) {
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
export function shift(iterable, positions) {
  if (iterable) {
    if (positions && positions > 0) {
      const result = [];
      const arrayLength = iterable.length;
      for (let index = 0; index < iterable.length; index++) {
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
export function isEmpty(obj) {
  return !obj ||
    (Array.isArray(obj) && obj.length === 0) ||
    (Object.keys(obj).length === 0);
}

/**
 * Returns the index of the first value that passes a truth test (predicate), or undefined if
 * no value passes the test. Only works for iterable objects e.g. arrays.
 *
 * @param {array} iterable - the iterable object to be searched
 * @param {function} predicate - function returning true in case of a positive match
 * @param {object} [context] - context for the predicate function call
 */
export function findIndex(iterable, predicate, context) {
  if (iterable) {
    let result;
    for (let index = 0; index < iterable.length; index++) {
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
export function first(iterable) {
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
export function last(iterable) {
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
export function size(iterable) {
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
export function some(iterable, predicate, context) {
  if (iterable) {
    let result;
    for (let index = 0; index < iterable.length; index++) {
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
export function union(...arrs) {
  if (arrs) {
    const result = [];
    arrs.forEach((arr) => {
      if (arr) {
        arr.forEach((obj) => {
          if (result.indexOf(obj) < 0) {
            result.push(obj);
          }
        });
      }
    });
    return result;
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
    element.forEach((obj) => {
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
export function flatten(...arrays) {
  if (arrays) {
    const result = [];
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
export function filterReactChildren(children, predicate) {
  if (children) {
    const result = [];
    React.Children.forEach(children, (entry) => {
      if (predicate && predicate.call(this, entry)) {
        result.push(entry);
      }
    });
    return result;
  }

  return undefined;
}

/**
 * Looks through a collection of React children elements, filtering them according to the predicate passed.
 *
 * @param {Array/Object} children - collection of >=1 react elements
 */
export function getArrayForReactChildren(children) {
  if (children) {
    const result = [];
    React.Children.forEach(children, (entry) => {
      result.push(entry);
    });
    return result;
  }

  return undefined;
}

export function flattenReactChildren(children) {
  if (!isEmpty(children)) {
    if (Array.isArray(children)) {
      return flatten(children);
    }

    return getArrayForReactChildren(children);
  }

  return undefined;
}

export function uniqueId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
