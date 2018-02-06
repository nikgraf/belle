/* global jest, describe, it, expect*/

import { unionClassNames } from '../utils';

describe('unionClassNames', () => {
  it('should add a class to existing ones', () => {
    expect(unionClassNames('first button', 'last')).toBe('first button last');
  });

  it('should not add a class in case it is a duplicate', () => {
    expect(unionClassNames('first button', 'button')).toBe('first button');
  });

  it('should ignore undefined values', () => {
    expect(unionClassNames(undefined, undefined)).toBe('');
    expect(unionClassNames(undefined, 'button')).toBe('button');
    expect(unionClassNames('first', undefined)).toBe('first');
  });

  it('should work with names which contain the new class', () => {
    expect(unionClassNames('first button-first', 'button')).toBe('first button-first button');
  });
});
