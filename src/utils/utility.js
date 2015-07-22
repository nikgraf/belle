export function has(obj, key) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
}

export function omit(obj, keys) {
  if(obj) {
    let result = {};
    for(let key in obj) {
      if (obj.hasOwnProperty(key) && (!keys || keys.indexOf(key) < 0)) {
        result[key] = obj[key];
      }
    }
    return result;
  }
}

export function filter(iterable, predicate, context) {
  if(iterable) {
    let result = [];
    iterable.forEach(function(obj) {
      if(predicate && predicate.call(context, obj)) {
        result.push(obj);
      }
    });
    return result;
  }
}

export function map(iterable, predicate, context) {
  if(iterable) {
    let result = [];
    iterable.forEach(function(obj, index) {
      if(predicate) {
        result[index] = predicate.call(context, obj);
      }
    });
    return result;
  }
}



//extend, find, first, isEmpty, findIndex, last, size, some, uniqueId, union