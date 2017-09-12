'use strict';

/* global jest, describe, it, expect*/

jest.dontMock('../utils/helpers');

var helpers = require('../utils/helpers');

describe('helpers has method', function () {
  var obj = { test: true };

  it('should return true if object has the field', function () {
    expect(helpers.has(obj, 'test')).toBeTruthy();
  });

  it('should return false if object does not have the field', function () {
    expect(helpers.has(obj, 'rest')).toBeFalsy();
  });

  it('should not break if object is undefined or null', function () {
    expect(helpers.has(undefined, 'rest')).toBeFalsy();
    expect(helpers.has(null, 'rest')).toBeFalsy();
    expect(helpers.has({}, 'rest')).toBeFalsy();
  });

  it('should not break if field passed is undefined or null', function () {
    expect(helpers.has(obj, undefined)).toBeFalsy();
    expect(helpers.has(obj, null)).toBeFalsy();
  });
});

describe('helpers omit method', function () {
  var obj = { test1: 123, test2: 'abc', test3: function test3() {
      return {};
    }, test4: undefined };

  it('should return new object with keys omitted', function () {
    var keys = ['test1', 'test2'];
    var newObj = helpers.omit(obj, keys);
    expect(helpers.has(newObj, 'test1')).toBeFalsy();
    expect(helpers.has(newObj, 'test2')).toBeFalsy();
    expect(helpers.has(newObj, 'test3')).toBeTruthy();
    expect(helpers.has(newObj, 'test4')).toBeTruthy();
  });

  it('should not break if object is undefined or null', function () {
    var obj2 = undefined;
    var newObj = void 0;
    var keys = ['test1', 'test2'];
    newObj = helpers.omit(obj2, keys);
    expect(newObj).toBeFalsy();
    obj2 = null;
    newObj = helpers.omit(obj2, keys);
    expect(newObj).toBeFalsy();
  });

  it('should not break if keys is undefined or null or has length 0', function () {
    var newObj = void 0;
    var keys = void 0;
    newObj = helpers.omit(obj, keys);
    expect(helpers.has(newObj, 'test1')).toBeTruthy();
    expect(helpers.has(newObj, 'test2')).toBeTruthy();
    expect(helpers.has(newObj, 'test3')).toBeTruthy();
    expect(helpers.has(newObj, 'test4')).toBeTruthy();
    keys = null;
    newObj = helpers.omit(obj, keys);
    expect(helpers.has(newObj, 'test1')).toBeTruthy();
    expect(helpers.has(newObj, 'test2')).toBeTruthy();
    expect(helpers.has(newObj, 'test3')).toBeTruthy();
    expect(helpers.has(newObj, 'test4')).toBeTruthy();
    keys = [];
    newObj = helpers.omit(obj, keys);
    expect(helpers.has(newObj, 'test1')).toBeTruthy();
    expect(helpers.has(newObj, 'test2')).toBeTruthy();
    expect(helpers.has(newObj, 'test3')).toBeTruthy();
    expect(helpers.has(newObj, 'test4')).toBeTruthy();
  });

  it('should not change original object', function () {
    var keys = ['test1', 'test2'];
    helpers.omit(obj, keys);
    expect(helpers.has(obj, 'test1')).toBeTruthy();
    expect(helpers.has(obj, 'test2')).toBeTruthy();
    expect(helpers.has(obj, 'test3')).toBeTruthy();
    expect(helpers.has(obj, 'test4')).toBeTruthy();
  });
});

describe('helpers isArrayLike method', function () {
  it('should return true for array', function () {
    expect(helpers.isArrayLike([123, 'abc', function () {
      return {};
    }, undefined])).toBeTruthy();
  });

  it('should return false for non-arrays', function () {
    expect(helpers.isArrayLike(123)).toBeFalsy();
    expect(helpers.isArrayLike('abc')).toBeFalsy();
  });
});

describe('helpers keys method', function () {
  it('should return all keys in an object', function () {
    var keys = helpers.keys({ a: 1, b: 2, c: 3 });
    expect(keys.length).toBe(3);
    expect(keys.indexOf('a')).toBeGreaterThan(-1);
    expect(keys.indexOf('toString')).toBeLessThan(0);
  });

  it('should should not break for undefined/ null objects', function () {
    expect(helpers.keys(undefined).length).toBe(0);
    expect(helpers.keys(null).length).toBe(0);
    expect(helpers.keys({}).length).toBe(0);
  });
});

describe('helpers filter method', function () {
  var arr = [123, 'abc', function () {
    return undefined;
  }, undefined];
  var predicate = function predicate(object) {
    return object !== 123;
  };

  it('should filter out objects from iterable as per predicate', function () {
    var filteredArr = helpers.filter(arr, predicate);
    expect(filteredArr.length).toBe(3);
    expect(filteredArr.indexOf(123)).toBeLessThan(0);
  });

  it('should not alter original array', function () {
    helpers.filter(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr.indexOf(123)).toBe(0);
  });

  it('should not break if array is undefined or null or has length 0', function () {
    var arr2 = void 0;
    var filteredArr = helpers.filter(arr2, predicate);
    expect(filteredArr).toBeFalsy();
    arr2 = null;
    filteredArr = helpers.filter(arr2, predicate);
    expect(filteredArr).toBeFalsy();
    arr2 = [];
    filteredArr = helpers.filter(arr2, predicate);
    expect(filteredArr.length).toBe(0);
  });

  it('should not break if predicate is undefined or null', function () {
    var predicate2 = undefined;
    var filteredArr = helpers.filter(arr, predicate2);
    expect(filteredArr.length).toBe(0);
    predicate2 = null;
    filteredArr = helpers.filter(arr, predicate2);
    expect(filteredArr.length).toBe(0);
  });
});

describe('helpers map method for arrays', function () {
  var arr = [5, 10, 50, 100];
  var predicate = function predicate(obj) {
    return obj / 5;
  };

  it('should map to an output array as per predicate', function () {
    var mapArr = helpers.map(arr, predicate);
    expect(mapArr.length).toBe(4);
    expect(mapArr[0]).toBe(1);
  });

  it('should not alter original array', function () {
    helpers.map(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(5);
  });

  it('should not break if array is undefined or null or has length 0', function () {
    var arr2 = void 0;
    var mapArr = helpers.map(arr2, predicate);
    expect(mapArr).toBeFalsy();
    arr2 = null;
    mapArr = helpers.map(arr2, predicate);
    expect(mapArr).toBeFalsy();
    arr2 = [];
    mapArr = helpers.map(arr2, predicate);
    expect(mapArr.length).toBe(0);
  });

  it('should not break if predicate is undefined or null', function () {
    var predicate2 = undefined;
    var mapArr = helpers.map(arr, predicate2);
    expect(mapArr.length).toBe(0);
    predicate2 = null;
    mapArr = helpers.filter(arr, predicate2);
    expect(mapArr.length).toBe(0);
  });
});

describe('helpers mapObject method', function () {
  var obj = { five: 5, ten: 10, fifty: 50, hundred: 100 };
  var predicate = function predicate(value) {
    return value / 5;
  };

  var objIdTest = { 50: 5, 100: 10, 500: 50, 1000: 100 };
  var predicateIdTest = function predicateIdTest(value, id) {
    return id / value;
  };

  it('should map to an output array as per predicate', function () {
    var resultObj = helpers.mapObject(obj, predicate);
    expect(resultObj[0]).toBe(1);
    expect(resultObj[1]).toBe(2);
    expect(resultObj[2]).toBe(10);
    expect(resultObj[3]).toBe(20);
  });

  it('should pass second parameter value to predicate', function () {
    var resultObj = helpers.mapObject(objIdTest, predicateIdTest);
    expect(resultObj[0]).toBe(10);
    expect(resultObj[1]).toBe(10);
    expect(resultObj[2]).toBe(10);
    expect(resultObj[3]).toBe(10);
  });
});

describe('helpers find method', function () {
  var arr = [123, 'abc', function () {
    return undefined;
  }, undefined];
  var predicate = function predicate(object) {
    return typeof object === 'number';
  };

  it('should find first numeric value in array', function () {
    var resultObj = helpers.find(arr, predicate);
    expect(resultObj).toBe(123);
  });

  it('should not alter original array', function () {
    helpers.find(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(123);
  });

  it('should not break if array is undefined or null or has length 0', function () {
    var arr2 = void 0;
    var resultObj = helpers.find(arr2, predicate);
    expect(resultObj).toBeFalsy();
    arr2 = null;
    resultObj = helpers.find(arr2, predicate);
    expect(resultObj).toBeFalsy();
    arr2 = [];
    resultObj = helpers.find(arr2, predicate);
    expect(resultObj).toBeFalsy();
  });

  it('should not break if predicate is undefined or null', function () {
    var predicate2 = undefined;
    var resultObj = helpers.find(arr, predicate2);
    expect(resultObj).toBeFalsy();
    predicate2 = null;
    resultObj = helpers.find(arr, predicate2);
    expect(resultObj).toBeFalsy();
  });
});

describe('helpers isEmpty method', function () {
  it('should return false for non-empty array', function () {
    expect(helpers.isEmpty([1, 2, 3])).toBeFalsy();
  });

  it('should return true for empty array', function () {
    expect(helpers.isEmpty([])).toBeTruthy();
    expect(helpers.isEmpty(null)).toBeTruthy();
    expect(helpers.isEmpty(undefined)).toBeTruthy();
  });
});

describe('helpers findIndex method', function () {
  var arr = [123, 'abc', function () {
    return undefined;
  }, undefined];
  var predicate = function predicate(object) {
    return typeof object === 'number';
  };

  it('should find index of first numeric value in array', function () {
    var index = helpers.findIndex(arr, predicate);
    expect(index).toBe(0);
  });

  it('should not alter original array', function () {
    helpers.findIndex(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(123);
  });

  it('should not break if array is undefined or null or has length 0', function () {
    var obj2 = void 0;
    var resultObj = helpers.findIndex(obj2, predicate);
    expect(resultObj).toBeFalsy();
    obj2 = null;
    resultObj = helpers.findIndex(obj2, predicate);
    expect(resultObj).toBeFalsy();
    obj2 = [];
    resultObj = helpers.findIndex(obj2, predicate);
    expect(resultObj).toBeFalsy();
  });

  it('should not break if predicate is undefined or null', function () {
    var predicate2 = undefined;
    var resultObj = helpers.findIndex(arr, predicate2);
    expect(resultObj).toBeFalsy();
    predicate2 = null;
    resultObj = helpers.findIndex(arr, predicate);
    expect(resultObj).toBeFalsy();
  });

  it('should return undefined in case the entry could not be found', function () {
    var customPredicate = function customPredicate(resultObj) {
      return resultObj === 567;
    };

    var index = helpers.findIndex(arr, customPredicate);
    expect(index).toBeUndefined();
  });
});

describe('helpers first method', function () {
  it('should find first element of an array', function () {
    expect(helpers.first([1, 2, 3])).toBe(1);
    expect(helpers.first([null, 1, 2, 3, null])).toBe(null);
    expect(helpers.first([undefined, 1, 2, 3])).toBe(undefined);
  });

  it('should not break for empty array', function () {
    expect(helpers.first(undefined)).toBeFalsy();
    expect(helpers.first(null)).toBeFalsy();
    expect(helpers.first([])).toBeFalsy();
  });
});

describe('helpers last method', function () {
  it('should find last element of an array', function () {
    expect(helpers.last([1, 2, 3])).toBe(3);
    expect(helpers.last([1, 2, 3, null])).toBe(null);
    expect(helpers.last([1, 2, 3, undefined])).toBe(undefined);
  });

  it('should not break for empty array', function () {
    expect(helpers.last(undefined)).toBeFalsy();
    expect(helpers.last(null)).toBeFalsy();
    expect(helpers.last([])).toBeFalsy();
  });
});

describe('helpers size method', function () {
  it('should return size of an array', function () {
    expect(helpers.size([1, 2, 3])).toBe(3);
  });

  it('should return string length for strings', function () {
    expect(helpers.size('abc')).toBe(3);
  });

  it('should not break for empty array', function () {
    expect(helpers.size(undefined)).toBe(0);
    expect(helpers.size(null)).toBe(0);
    expect(helpers.size([])).toBe(0);
  });
});

describe('helpers some method', function () {
  var arr = [123, 'abc', function () {
    return undefined;
  }, undefined];
  var predicate = function predicate(obj) {
    return typeof obj === 'number';
  };

  it('should return true is predicate is true for some element', function () {
    var result = helpers.some(arr, predicate);
    expect(result).toBe(true);
  });

  it('should not alter original array', function () {
    helpers.some(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(123);
  });

  it('should not break if array is undefined or null or has length 0', function () {
    var arr1 = void 0;
    var obj = helpers.some(arr1, predicate);
    expect(obj).toBeFalsy();
    arr1 = null;
    obj = helpers.some(arr1, predicate);
    expect(obj).toBeFalsy();
    arr1 = [];
    obj = helpers.some(arr1, predicate);
    expect(obj).toBeFalsy();
  });

  it('should not break if predicate is undefined or null', function () {
    var predicate2 = undefined;
    var obj = helpers.some(arr, predicate2);
    expect(obj).toBeFalsy();
    predicate2 = null;
    obj = helpers.some(arr, predicate2);
    expect(obj).toBeFalsy();
  });
});

describe('helpers union method', function () {
  var arr1 = [123, 456, 789];
  var arr2 = ['abc', 'def', 'ghi'];
  var arr3 = [true, false];

  it('should return union of arrays', function () {
    var resultArr = helpers.union(arr1, arr2, arr3);
    expect(resultArr.length).toBe(8);
  });

  it('should not alter original arrays', function () {
    helpers.union(arr1, arr2);
    expect(arr1.length).toBe(3);
    expect(arr2.length).toBe(3);
  });

  it('should not break if array is undefined or null or has length 0', function () {
    helpers.union(undefined, null, []);
    expect(helpers.size([])).toBe(0);
  });
});

describe('helpers flatten method', function () {
  var arr1 = [123, 456, 789];
  var arr2 = ['abc', 'def', 'ghi'];
  var arr3 = [true, false, 123];
  var arr4 = [true, false, ['lmn', 'opq', [98, 45]]];

  it('should return all elements from all arrays', function () {
    var resultArr = helpers.flatten(arr1, arr2, arr3);
    expect(resultArr.length).toBe(9);
  });

  it('should not remove duplicates', function () {
    var resultArr = helpers.flatten(arr1, arr3);
    expect(resultArr[0]).toBe(123);
    expect(resultArr[5]).toBe(123);
  });

  it('should not alter original arrays', function () {
    helpers.flatten(arr1, arr2);
    expect(arr1.length).toBe(3);
    expect(arr2.length).toBe(3);
  });

  it('should not break if array is undefined or null or has length 0', function () {
    helpers.flatten(undefined, null, []);
    expect(helpers.size([])).toBe(0);
  });

  it('should be able to flatten to any level', function () {
    var result = helpers.flatten(arr1, arr4);
    expect(helpers.size(result)).toBe(9);
  });
});