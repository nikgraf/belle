/*global jest, describe, it, expect*/

jest.dontMock('../lib/utils/utility');

const utility = require('../lib/utils/utility');

describe('utility has method', () => {

  const obj = {test: true};

  it('should return true if object has the field', () => {
    expect(utility.has(obj, 'test')).toBeTruthy();
  });

  it('should return false if object does not have the field', () => {
    const obj = {test: true};
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
