export function has(obj, key) {
  return obj !== null && Object.prototype.hasOwnProperty.call(obj, key);
}

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

export function filter(iterable, predicate, context) {
  if (iterable) {
    const result = [];
    iterable.forEach(function(obj) {
      if (predicate && predicate.call(context, obj)) {
        result.push(obj);
      }
    });
    return result;
  }
}

function isArrayLike(obj) {
  const length = obj.length;
  return typeof length === 'number' && length >= 0;
}

function keys(obj) {
  const objKeys = [];
  for (const key in obj) if (has(obj, key)) objKeys.push(key);
  return objKeys;
}

// For both arrays and object - returns array
export function map(obj, predicate, context) {
  if (obj) {
    const result = [];
    const objKeys = !isArrayLike(obj) && keys(obj);
    const length = (objKeys || obj).length;
    for (let index = 0; index < length; index++) {
      const currentKey = objKeys ? objKeys[index] : index;
      if (predicate) {
        result[index] = predicate.call(context, obj[currentKey], currentKey);
      }
    }
    return result;
  }
}

// The function will search only in array(iterable object) and not in plain js object and will return first match
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
}

// Only for arrays (iterable object)
export function isEmpty(iterable) {
  return !iterable || iterable.length === 0;
}

// The function will search only in array(iterable object) and not in plain js object and will return index for first match
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
}

// Only for arrays (iterable object)
export function first(iterable) {
  if (iterable && iterable.length > 0) {
    return iterable[0];
  }
}

// Only for arrays (iterable object)
export function last(iterable) {
  if (iterable && iterable.length > 0) {
    return iterable[iterable.length - 1];
  }
}

// Only for arrays (iterable object)
export function size(iterable) {
  if (iterable) {
    return iterable.length;
  }
  return 0;
}

// Only for arrays (iterable object)
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
}

// Only for arrays (iterable object)
export function union(...arrs) {
  if (arrs) {
    const result = [];
    arrs.forEach(function(arr) {
      if (arr) {
        arr.forEach(function(obj) {
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
export function uniqueId(prefix) {
  const id = ++idCounter + '';
  return prefix ? prefix + id : id;
}

export function extend(obj1, ...objs) {
  if (obj1 && objs) {
    objs.forEach(function(obj) {
      if (obj) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            obj1[key] = obj[key];
          }
        }
      }
    });
  }
  return obj1;
}

function flattenInternal(output, element) {
  if (element) {
    element.forEach(function(obj) {
      if (Array.isArray(obj)) {
        flattenInternal(output, obj);
      } else {
        output.push(obj);
      }
    });
  }
}

// Works only for arrays
export function flatten(...arrays) {
  if (arrays) {
    const result = [];
    flattenInternal(result, arrays);
    return result;
  }
}

