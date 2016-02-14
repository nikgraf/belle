/* global jest, describe, it, expect*/

jest.dontMock('../utils/date-helpers');

const dateHelpers = require('../utils/date-helpers');

describe('helpers getDateKey method', () => {
  it('should return an iso string', () => {
    expect(dateHelpers.getDateKey(2012, 10, 1)).toBe('2012-10-1');
    expect(dateHelpers.getDateKey(2200, 1, 31)).toBe('2200-1-31');
    expect(dateHelpers.getDateKey(2016, 12, 12)).toBe('2016-12-12');
  });

  it('should parse a datekey (iso string) properly to a date', () => {
    expect(dateHelpers.getDateForDateKey('1912-10-1').getTime()).toBe(new Date(1912, 9, 1).getTime());
    expect(dateHelpers.getDateForDateKey('2018-1-12').getTime()).toBe(new Date(2018, 0, 12).getTime());
    expect(dateHelpers.getDateForDateKey('2112-12-12').getTime()).toBe(new Date(2112, 11, 12).getTime());
  });
});
