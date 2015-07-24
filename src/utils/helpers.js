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
 * @param {string[]} fields - the list of keys of the property to omit
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
}

/**
 * The function will execute predicate for each object in iterable object passed. Its different from javascript forEach in ways:
 * 1. In case obj is undefined / null it will not break.
 * 2. In case obj is not iterable it will consider obj as single element array and iterate over it
 *    (unlike underscore it will not iterate over each field of the object).
 *
 * @param {object|array} obj - object to be iterated
 * @param {function} predicate - function to be called for each element in the object
 */
export function each(obj, predicate) {
  if (obj) {
    if (isArrayLike(obj)) {
      obj.forEach((elm, index) => {
        predicate.call(null, elm, index);
      });
    } else {
      predicate.call(null, obj);
    }
  }
}

/**
 * Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).
 * In case the parameter passed is not iterable, it will treat that object as array of single object.
 *
 * @param {array} obj - the object to be filtered
 * @param {function} predicate - function executed to check if some element should be filtered.
 */
export function filter(obj, predicate) {
  if (obj) {
    const result = [];
    each(obj, (elm) => {
      if (predicate && predicate.call(null, elm)) {
        result.push(elm);
      }
    });
    return result;
  }
}

/**
 * Returns true if the provided object is iterable, except for strings for which it will return false.
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
 * Returns all the names of the object's own properties (this will not include properties inherited through prototypes).
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
 * In case the parameter passed is not iterable, it will treat that object as array of single object.
 *
 * @param {object|array} obj - object to be based upon
 * @param {function} predicate - function returning the a new version of the entry
 */
export function map(obj, predicate) {
  if (obj) {
    const result = [];
    each(obj, (elm, index) => {
      if (predicate) {
        result[index] = predicate.call(null, elm);
      }
    });
    return result;
  }
}

/**
 * Returns a new array of values by mapping each field in ab object through a transformation function (predicate).
 * The specific use-case for this method was inject-style module.
 *
 * @param {object} obj - object to be based upon
 * @param {function} predicate - function returning the a new version of the entry
 */
export function mapObject(obj, predicate) {
  if (obj) {
    const result = [];
    const objKeys = keys(obj);
    objKeys.forEach( (key, index) => {
      if (predicate) {
        result[index] = predicate.call(null, obj[key], key);
      }
    });
    return result;
  }
}

/**
 * Returns the first value that passes a truth test (predicate), or undefined if no value passes the test.
 * In case the parameter passed is not iterable, it will treat that object as array of single object.
 *
 * @param {object/array} obj - the object to be searched
 * @param {function} predicate - function returning true in case of a positive match
 */
export function find(obj, predicate) {
  if (obj) {
    let result;
    if (isArrayLike(obj)) {
      for (let index = 0; index < obj.length; index++) {
        if (predicate && predicate.call(null, obj[index])) {
          result = obj[index];
          break;
        }
      }
    } else {
      result = predicate && predicate.call(null, obj) ? obj : undefined;
    }
    return result;
  }
}

/**
 * Returns true if object contains no values (no enumerable own-properties).
 *
 * @param {array} iterable - an iterable object
 */
export function isEmpty(iterable) {
  return !iterable || iterable.length === 0;
}

/**
 * Returns the index of the first value that passes a truth test (predicate), or undefined if
 * no value passes the test.
 * In case the parameter passed is not iterable the function will execute predicate for it considering it to be a single element array.
 *
 * @param {object/array} obj - the object to be searched
 * @param {function} predicate - function returning true in case of a positive match
 */
export function findIndex(obj, predicate) {
  if (obj) {
    let result;
    if (isArrayLike(obj)) {
      for (let index = 0; index < obj.length; index++) {
        if (predicate && predicate.call(null, obj[index])) {
          result = index;
          break;
        }
      }
    } else {
      result = predicate && predicate.call(null, obj) ? 0 : undefined;
    }
    return result;
  }
}

/**
 * Returns the first element of an iterable object.
 * In case a single object is passed as parameter the function will return the object as is.
 *
 * @param {object/array} obj - the object to be searched
 */
export function first(obj) {
  if (obj) {
    if (isArrayLike(obj)) {
      if (obj.length > 0) {
        return obj[0];
      }
    } else {
      return obj;
    }
  }
}

/**
 * Returns the last element of an iterable object.
 * In case a single object is passed as parameter the function will return the object as is.
 *
 * @param {object/array} obj - object to be searched.
 */
export function last(obj) {
  if (obj) {
    if (isArrayLike(obj)) {
      if (obj.length > 0) {
        return obj[obj.length - 1];
      }
    } else {
      return obj;
    }
  }
}

/**
 * Return the number of values in the list.
 * For non-iterable objects it will return 1.
 *
 * @param {object/array} obj
 */
export function size(obj) {
  if (obj) {
    if (isArrayLike(obj)) {
      return obj.length;
    }
    return 1;
  }
  return 0;
}

/**
 * Returns true if any of the values in the list pass the predicate truth test.
 * In case the parameter passed is not iterable the function will execute predicate for it considering it to be a single element array.
 *
 * @param {object/array} obj - object object to be searched
 * @param {function} predicate - function returning true in case of a positive match
 */
export function some(obj, predicate) {
  if (obj) {
    let result = false;
    if (isArrayLike(obj)) {
      for (let index = 0; index < obj.length; index++) {
        if (predicate && predicate.call(null, obj[index])) {
          result = true;
          break;
        }
      }
    } else {
      result = predicate && predicate.call(null, obj) ? true : false;
    }
    return result;
  }
}

/**
 * Returns the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.
 *
 * @param {...array} arrs - >=1 objects to be merged.
 */
export function union(...arrs) {
  if (arrs) {
    const result = [];
    arrs.forEach((arr) => {
      if (arr) {
        each(arr, (obj) => {
          if (result.indexOf(obj) < 0) {
            result.push(obj);
          }
        });
      }
    });
    return result;
  }
}

let idCounter = 0;

/**
 * Generate a globally-unique id.
 *
 * @param {string} [prefix] - if prefix is passed, the id will be appended to it.
 */
export function uniqueId(prefix) {
  const id = ++idCounter + '';
  return prefix ? prefix + id : id;
}

/**
 * Copy all of the properties in the source objects over to the destination object, and return the destination object. It's in-order, so the last source will override properties of the same name in previous arguments.
 *
 * @param {object} obj1 - object to be extended
 * @param {...object} objs - at least one but optionally more objects an be provided
 */
export function extend(obj1, ...objs) {
  if (obj1 && objs) {
    objs.forEach((obj) => {
      if (obj) {
        each(keys(obj), (key) => {
          if (obj.hasOwnProperty(key)) {
            obj1[key] = obj[key];
          }
        });
      }
    });
  }
  return obj1;
}

/**
 * Recursive function for flattening an iterable.
 *
 * @param {object} output - base object to be updated
 * @param {object} element - input object to be merged into the output
 */
function flattenInternal(output, element) {
  if (element) {
    each(element, (obj) => {
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
}
