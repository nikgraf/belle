/*global jest, describe, it, expect*/

jest.dontMock('../lib/utils/utility');

const utility = require('../lib/utils/utility');

describe('utility has method', () => {

  const obj = {test: true};

  it('should return true if object has the field', () => {
    expect(utility.has(obj, 'test')).toBeTruthy();
  });

  it('should return false if object does not have the field', () => {
    expect(utility.has(obj, 'rest')).toBeFalsy();
  });

  it('should not break if object is undefined or null', () => {
    expect(utility.has(undefined, 'rest')).toBeFalsy();
    expect(utility.has(null, 'rest')).toBeFalsy();
    expect(utility.has({}, 'rest')).toBeFalsy();
  });

  it('should not break if field passed is undefined or null', () => {
    expect(utility.has(obj, undefined)).toBeFalsy();
    expect(utility.has(obj, null)).toBeFalsy();
  });
});

describe('utility omit method', () => {

  const obj = {test1: 123, test2: 'abc', test3: (function(){}), test4: undefined};

  it('should return new object with keys omitted', () => {
    const keys = ['test1', 'test2'];
    const newObj = utility.omit(obj, keys);
    expect(utility.has(newObj, 'test1')).toBeFalsy();
    expect(utility.has(newObj, 'test2')).toBeFalsy();
    expect(utility.has(newObj, 'test3')).toBeTruthy();
    expect(utility.has(newObj, 'test4')).toBeTruthy();
  });

  it('should not break if object is undefined or null', () => {
    let obj = undefined;
    let newObj;
    const keys = ['test1', 'test2'];
    newObj = utility.omit(obj, keys);
    expect(newObj).toBeFalsy();
    obj = null;
    newObj = utility.omit(obj, keys);
    expect(newObj).toBeFalsy();
  });

  it('should not break if keys is undefined or null or has length 0', () => {
    let newObj;
    let keys = undefined;
    newObj = utility.omit(obj, keys);
    expect(utility.has(newObj, 'test1')).toBeTruthy();
    expect(utility.has(newObj, 'test2')).toBeTruthy();
    expect(utility.has(newObj, 'test3')).toBeTruthy();
    expect(utility.has(newObj, 'test4')).toBeTruthy();
    keys = null;
    newObj = utility.omit(obj, keys);
    expect(utility.has(newObj, 'test1')).toBeTruthy();
    expect(utility.has(newObj, 'test2')).toBeTruthy();
    expect(utility.has(newObj, 'test3')).toBeTruthy();
    expect(utility.has(newObj, 'test4')).toBeTruthy();
    keys = [];
    newObj = utility.omit(obj, keys);
    expect(utility.has(newObj, 'test1')).toBeTruthy();
    expect(utility.has(newObj, 'test2')).toBeTruthy();
    expect(utility.has(newObj, 'test3')).toBeTruthy();
    expect(utility.has(newObj, 'test4')).toBeTruthy();
  });

  it('should not change original object', () => {
    const keys = ['test1', 'test2'];
    utility.omit(obj, keys);
    expect(utility.has(obj, 'test1')).toBeTruthy();
    expect(utility.has(obj, 'test2')).toBeTruthy();
    expect(utility.has(obj, 'test3')).toBeTruthy();
    expect(utility.has(obj, 'test4')).toBeTruthy();
  });
});


describe('utility filter method', () => {

  const arr = [123, 'abc', (function(){}), undefined];
  const predicate = function(obj) {
    return obj !== 123;
  };

  it('should filter out objects from iterable as per predicate', () => {
    const filteredArr = utility.filter(arr, predicate);
    expect(filteredArr.length).toBe(3);
    expect(filteredArr.indexOf(123)).toBeLessThan(0);
  });

  it('should not alter original array', () => {
    const filteredArr = utility.filter(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr.indexOf(123)).toBe(0);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr = undefined;
    let filteredArr = utility.filter(arr, predicate);
    expect(filteredArr).toBeFalsy();
    arr = null;
    filteredArr = utility.filter(arr, predicate);
    expect(filteredArr).toBeFalsy();
    arr = [];
    filteredArr = utility.filter(arr, predicate);
    expect(filteredArr.length).toBe(0);
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate = undefined;
    let filteredArr = utility.filter(arr, predicate);
    expect(filteredArr.length).toBe(0);
    predicate = null;
    filteredArr = utility.filter(arr, predicate);
    expect(filteredArr.length).toBe(0);
  });

});


describe('utility map method', () => {

  const arr = [5, 10, 50, 100];
  const predicate = function(obj) {
    return obj/5;
  };

  it('should map to an output array as per predicate', () => {
    const mapArr = utility.map(arr, predicate);
    expect(mapArr.length).toBe(4);
    expect(mapArr[0]).toBe(1);
  });

  it('should not alter original array', () => {
    utility.map(arr, predicate);
    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(5);
  });

  it('should not break if array is undefined or null or has length 0', () => {
    let arr = undefined;
    let mapArr = utility.map(arr, predicate);
    expect(mapArr).toBeFalsy();
    arr = null;
    mapArr = utility.map(arr, predicate);
    expect(mapArr).toBeFalsy();
    arr = [];
    mapArr = utility.map(arr, predicate);
    expect(mapArr.length).toBe(0);
  });

  it('should not break if predicate is undefined or null', () => {
    let predicate = undefined;
    let mapArr = utility.map(arr, predicate);
    expect(mapArr.length).toBe(0);
    predicate = null;
    mapArr = utility.filter(arr, predicate);
    expect(mapArr.length).toBe(0);
  });

});
