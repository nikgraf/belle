'use strict';

var _unionClassNames = require('../utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('unionClassNames', function () {
  it('should add a class to existing ones', function () {
    expect((0, _unionClassNames2.default)('first button', 'last')).toBe('first button last');
  });

  it('should not add a class in case it is a duplicate', function () {
    expect((0, _unionClassNames2.default)('first button', 'button')).toBe('first button');
  });

  it('should ignore undefined values', function () {
    expect((0, _unionClassNames2.default)(undefined, undefined)).toBe('');
    expect((0, _unionClassNames2.default)(undefined, 'button')).toBe('button');
    expect((0, _unionClassNames2.default)('first', undefined)).toBe('first');
  });

  it('should work with names which contain the new class', function () {
    expect((0, _unionClassNames2.default)('first button-first', 'button')).toBe('first button-first button');
  });
}); /* global jest, describe, it, expect*/