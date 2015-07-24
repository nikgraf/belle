/*global jest, describe, it, expect*/

jest.dontMock('../lib/utils/helpers');

const helpers = require('../lib/utils/helpers');

describe('helpers has method', () => {
  const obj = {test: true};

  it('should return true if object has the field', () => {
    expect(helpers.has(obj, 'test')).toBeTruthy();
  });

  it('should return false if object does not have the field', () => {
    expect(helpers.has(obj, 'rest')).toBeFalsy();
  });

  it('should not break if object is undefined or null', () => {
    expect(helpers.has(undefined, 'rest')).toBeFalsy();
    expect(helpers.has(null, 'rest')).toBeFalsy();
    expect(helpers.has({}, 'rest')).toBeFalsy();
  });

  it('should not break if field passed is undefined or null', () => {
    expect(helpers.has(obj, undefined)).toBeFalsy();
    expect(helpers.has(obj, null)).toBeFalsy();
  });
});

describe('helpers omit method', () => {
  const obj = {test1: 123, test2: 'abc', test3: () => {}, test4: undefined};

  it('should return new object with keys omitted', () => {
    const keys = ['test1', 'test2'];
    const newObj = helpers.omit(obj, keys);
    expect(helpers.has(newObj, 'test1')).toBeFalsy();
    expect(helpers.has(newObj, 'test2')).toBeFalsy();
    expect(helpers.has(newObj, 'test3')).toBeTruthy();
    expect(helpers.has(newObj, 'test4')).toBeTruthy();
  });

  it('should not break if object is undefined or null', () => {
    let obj2;
    let newObj;
    const keys = ['test1', 'test2'];
    newObj = helpers.omit(obj2, keys);
    expect(newObj).toBeFalsy();
    obj2 = null;
    newObj = helpers.omit(obj2, keys);
    expect(newObj).toBeFalsy();
  });

  it('should not break if keys is undefined or null or has length 0', () => {
    let newObj;
    let keys;
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

  it('should not change original object', () => {
    const keys = ['test1', 'test2'];
    helpers.omit(obj, keys);
    expect(helpers.has(obj, 'test1')).toBeTruthy();
    expect(helpers.has(obj, 'test2')).toBeTruthy();
    expect(helpers.has(obj, 'test3')).toBeTruthy();
    expect(helpers.has(obj, 'test4')).toBeTruthy();
  });
});


describe('helpers each method', () => {
  let count = 0;
  const arr = [123, 'abc', () => {}, undefined];
  const obj = 123;
  const predicate = () => {
    return count++;
  };

  it('should execute predicate for each element of array', () => {
    count = 0;
    helpers.each(arr, predicate);
    expect(count).toBe(4);
  });

  it('should execute predicate if parameter passed is not array but simple object', () => {
    count = 0;
    helpers.each(obj, predicate);
    expect(count).toBe(1);
  });

  it('should not alter original array', () => {
    helpers.each(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr.indexOf(123)).toBe(0);
  });
});

describe('helpers isArrayLike method', () => {
  it('should return true for array', () => {
    expect(helpers.isArrayLike([123, 'abc', () => {}, undefined])).toBeTruthy();
  });

  it('should return false for non-arrays', () => {
    expect(helpers.isArrayLike(123)).toBeFalsy();
    expect(helpers.isArrayLike('abc')).toBeFalsy();
  });
});

describe('helpers filter method', () => {
  const arr = [123, 'abc', () => {}, undefined];
  const predicate = (object) => {
    return object !== 123;
  };

  it('should filter out objects from iterable as per predicate', () => {
    const filteredArr = helpers.filter(arr, predicate);
    expect(filteredArr.length).toBe(3);
    expect(filteredArr.indexOf(123)).toBeLessThan(0);
  });

  it('should not alter original array', () => {
    helpers.filter(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr.indexOf(123)).toBe(0);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr2;
    let filteredArr = helpers.filter(arr2, predicate);
    expect(filteredArr).toBeFalsy();
    arr2 = null;
    filteredArr = helpers.filter(arr2, predicate);
    expect(filteredArr).toBeFalsy();
    arr2 = [];
    filteredArr = helpers.filter(arr2, predicate);
    expect(filteredArr.length).toBe(0);
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate2;
    let filteredArr = helpers.filter(arr, predicate2);
    expect(filteredArr.length).toBe(0);
    predicate2 = null;
    filteredArr = helpers.filter(arr, predicate2);
    expect(filteredArr.length).toBe(0);
  });
});


describe('helpers map method for arrays', () => {
  const arr = [5, 10, 50, 100];
  const predicate = (obj) => {
    return obj / 5;
  };

  it('should map to an output array as per predicate', () => {
    const mapArr = helpers.map(arr, predicate);
    expect(mapArr.length).toBe(4);
    expect(mapArr[0]).toBe(1);
  });

  it('should not alter original array', () => {
    helpers.map(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(5);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr2;
    let mapArr = helpers.map(arr2, predicate);
    expect(mapArr).toBeFalsy();
    arr2 = null;
    mapArr = helpers.map(arr2, predicate);
    expect(mapArr).toBeFalsy();
    arr2 = [];
    mapArr = helpers.map(arr2, predicate);
    expect(mapArr.length).toBe(0);
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate2;
    let mapArr = helpers.map(arr, predicate2);
    expect(mapArr.length).toBe(0);
    predicate2 = null;
    mapArr = helpers.filter(arr, predicate2);
    expect(mapArr.length).toBe(0);
  });
});

describe('helpers map method for object', () => {
  const obj = {five: 5, ten: 10, fifty: 50, hundred: 100};
  const predicate = (value) => {
    return value / 5;
  };
  const objIdTest = {50: 5, 100: 10, 500: 50, 1000: 100};
  const predicateIdTest = (value, id) => {
    return id / value;
  };

  it('should map to an output array as per predicate', () => {
    const resultObj = helpers.map(obj, predicate);
    expect(resultObj[0]).toBe(1);
    expect(resultObj[1]).toBe(2);
    expect(resultObj[2]).toBe(10);
    expect(resultObj[3]).toBe(20);
  });

  it('should pass second parameter value to predicate', () => {
    const resultObj = helpers.map(objIdTest, predicateIdTest);
    expect(resultObj[0]).toBe(10);
    expect(resultObj[1]).toBe(10);
    expect(resultObj[2]).toBe(10);
    expect(resultObj[3]).toBe(10);
  });
});

describe('helpers find method', () => {
  const arr = [123, 'abc', () => {}, undefined];
  const obj = 100;
  const predicate = (object) => {
    return typeof object === 'number';
  };

  it('should find first numeric value in array', () => {
    const resultObj = helpers.find(arr, predicate);
    expect(resultObj).toBe(123);
  });

  it('should execute predicate test if parameter passed is not an array but simple object', () => {
    const resultObj = helpers.find(obj, predicate);
    expect(resultObj).toBe(100);
  });

  it('should not alter original array', () => {
    helpers.find(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(123);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr2;
    let resultObj = helpers.find(arr2, predicate);
    expect(resultObj).toBeFalsy();
    arr2 = null;
    resultObj = helpers.find(arr2, predicate);
    expect(resultObj).toBeFalsy();
    arr2 = [];
    resultObj = helpers.find(arr2, predicate);
    expect(resultObj).toBeFalsy();
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate2;
    let resultObj = helpers.find(arr, predicate2);
    expect(resultObj).toBeFalsy();
    predicate2 = null;
    resultObj = helpers.find(arr, predicate2);
    expect(resultObj).toBeFalsy();
  });
});

describe('helpers isEmpty method', () => {
  it('should return false for non-empty array', () => {
    expect(helpers.isEmpty([1, 2, 3])).toBeFalsy();
  });

  it('should return true for empty array', () => {
    expect(helpers.isEmpty([])).toBeTruthy();
    expect(helpers.isEmpty(null)).toBeTruthy();
    expect(helpers.isEmpty(undefined)).toBeTruthy();
  });
});

describe('helpers findIndex method', () => {
  const arr = [123, 'abc', () => {}, undefined];
  const obj = 100;
  const predicate = (object) => {
    return typeof object === 'number';
  };

  it('should find index of first numeric value in array', () => {
    const index = helpers.findIndex(arr, predicate);
    expect(index).toBe(0);
  });

  it('should execute predicate test if parameter passed is not an array but simple object', () => {
    const resultObj = helpers.findIndex(obj, predicate);
    expect(resultObj).toBe(0);
  });

  it('should not alter original array', () => {
    helpers.findIndex(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(123);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let obj2;
    let resultObj = helpers.findIndex(obj2, predicate);
    expect(resultObj).toBeFalsy();
    obj2 = null;
    resultObj = helpers.findIndex(obj2, predicate);
    expect(resultObj).toBeFalsy();
    obj2 = [];
    resultObj = helpers.findIndex(obj2, predicate);
    expect(resultObj).toBeFalsy();
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate2;
    let resultObj = helpers.findIndex(arr, predicate2);
    expect(resultObj).toBeFalsy();
    predicate2 = null;
    resultObj = helpers.findIndex(arr, predicate);
    expect(resultObj).toBeFalsy();
  });

  it('should return undefined in case the entry could not be found', () => {
    const customPredicate = (resultObj) => {
      return resultObj === 567;
    };
    const index = helpers.findIndex(arr, customPredicate);
    expect(index).toBeUndefined();
  });
});

describe('helpers first method', () => {
  it('should find first element of an array', () => {
    expect(helpers.first([1, 2, 3])).toBe(1);
    expect(helpers.first([null, 1, 2, 3, null])).toBe(null);
    expect(helpers.first([undefined, 1, 2, 3])).toBe(undefined);
  });

  it('should work for non-array value and return the value itself', () => {
    expect(helpers.first('abc')).toBe('abc');
  });

  it('should not break for empty array', () => {
    expect(helpers.first(undefined)).toBeFalsy();
    expect(helpers.first(null)).toBeFalsy();
    expect(helpers.first([])).toBeFalsy();
  });
});

describe('helpers last method', () => {
  it('should find last element of an array', () => {
    expect(helpers.last([1, 2, 3])).toBe(3);
    expect(helpers.last([1, 2, 3, null])).toBe(null);
    expect(helpers.last([1, 2, 3, undefined])).toBe(undefined);
  });

  it('should not break for empty array', () => {
    expect(helpers.last(undefined)).toBeFalsy();
    expect(helpers.last(null)).toBeFalsy();
    expect(helpers.last([])).toBeFalsy();
  });

  it('should work for non-array value and return the value itself', () => {
    expect(helpers.last('abc')).toBe('abc');
  });
});

describe('helpers size method', () => {
  it('should return size of an array', () => {
    expect(helpers.size([1, 2, 3])).toBe(3);
  });

  it('should return 0 for non-array argument', () => {
    expect(helpers.size('abc')).toBe(1);
  });

  it('should not break for empty array', () => {
    expect(helpers.size(undefined)).toBe(0);
    expect(helpers.size(null)).toBe(0);
    expect(helpers.size([])).toBe(0);
  });
});

describe('helpers some method', () => {
  const arr = [123, 'abc', () => {}, undefined];
  const predicate = (obj) => {
    return typeof obj === 'number';
  };

  it('should return true is predicate is true for some element', () => {
    const result = helpers.some(arr, predicate);
    expect(result).toBe(true);
  });

  it('should work well if argument is not array but simple object', () => {
    const result = helpers.some(100, predicate);
    expect(result).toBe(true);
  });

  it('should not alter original array', () => {
    helpers.some(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(123);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr1;
    let obj = helpers.some(arr1, predicate);
    expect(obj).toBeFalsy();
    arr1 = null;
    obj = helpers.some(arr1, predicate);
    expect(obj).toBeFalsy();
    arr1 = [];
    obj = helpers.some(arr1, predicate);
    expect(obj).toBeFalsy();
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate2;
    let obj = helpers.some(arr, predicate2);
    expect(obj).toBeFalsy();
    predicate2 = null;
    obj = helpers.some(arr, predicate2);
    expect(obj).toBeFalsy();
  });
});

describe('helpers union method', () => {
  const arr1 = [123, 456, 789];
  const arr2 = ['abc', 'def', 'ghi'];
  const arr3 = [true, false];

  it('should return union of arrays', () => {
    const resultArr = helpers.union(arr1, arr2, arr3);
    expect(resultArr.length).toBe(8);
  });

  it('should not alter original arrays', () => {
    helpers.union(arr1, arr2);
    expect(arr1.length).toBe(3);
    expect(arr2.length).toBe(3);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    helpers.union(undefined, null, []);
    expect(helpers.size([])).toBe(0);
  });
});

describe('helpers extend method', () => {
  const obj1 = {};
  const obj2 = {a: 1, b: 2, c: 3};
  const obj3 = {a: 10, 1: 'abc', 2: undefined, 3: null};

  it('should add (key, value) of objects passed to first object', () => {
    const resultObj = helpers.extend(obj1, obj2);
    expect(resultObj).toBe(obj1);
    expect(resultObj.a).toBe(1);
    expect(resultObj.b).toBe(2);
  });

  it('should override existing value', () => {
    const resultObj = helpers.extend(obj1, obj2, obj3);
    expect(resultObj.a).toBe(10);
  });

  it('should not alter objects other than the first one', () => {
    helpers.extend(obj1, obj2, obj3);
    expect(obj2.a).toBe(1);
  });
});

describe('helpers uniqueId method', () => {
  it('should return unique value each time', () => {
    const id1 = helpers.uniqueId('abc');
    const id2 = helpers.uniqueId('abc');
    expect(id1 === id2).toBeFalsy();
  });

  it('should use prefix for building id', () => {
    const id1 = helpers.uniqueId('abc');
    expect(id1.indexOf('abc')).toBeGreaterThan(-1);
  });

  it('should not break if prefix is null', () => {
    const id1 = helpers.uniqueId();
    expect(id1).toBeTruthy();
  });
});

describe('helpers flatten method', () => {
  const arr1 = [123, 456, 789];
  const arr2 = ['abc', 'def', 'ghi'];
  const arr3 = [true, false, 123];
  const arr4 = [true, false, ['lmn', 'opq', [98, 45]]];

  it('should return all elements from all arrays', () => {
    const resultArr = helpers.flatten(arr1, arr2, arr3);
    expect(resultArr.length).toBe(9);
  });

  it('should not remove duplicates', () => {
    const resultArr = helpers.flatten(arr1, arr3);
    expect(resultArr[0]).toBe(123);
    expect(resultArr[5]).toBe(123);
  });

  it('should not alter original arrays', () => {
    helpers.flatten(arr1, arr2);
    expect(arr1.length).toBe(3);
    expect(arr2.length).toBe(3);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    helpers.flatten(undefined, null, []);
    expect(helpers.size([])).toBe(0);
  });

  it('should be able to flatten to any level', () => {
    const result = helpers.flatten(arr1, arr4);
    expect(helpers.size(result)).toBe(9);
  });
});
