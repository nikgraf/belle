'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelAnimationFrame = exports.requestAnimationFrame = undefined;

var _exenv = require('exenv');

var requestAnimationFrame = exports.requestAnimationFrame = void 0; // Inspired by https://gist.github.com/paulirish/1579671

var cancelAnimationFrame = exports.cancelAnimationFrame = void 0;

var lastTime = 0;

if (_exenv.canUseDOM) {
  exports.requestAnimationFrame = requestAnimationFrame = window.requestAnimationFrame;
  exports.cancelAnimationFrame = cancelAnimationFrame = window.cancelAnimationFrame;

  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var index = 0; index < vendors.length && !requestAnimationFrame; ++index) {
    exports.requestAnimationFrame = requestAnimationFrame = window[vendors[index] + 'RequestAnimationFrame'];
    exports.cancelAnimationFrame = cancelAnimationFrame = window[vendors[index] + 'CancelAnimationFrame'] || window[vendors[index] + 'CancelRequestAnimationFrame'];
  }
}

if (!requestAnimationFrame) {
  exports.requestAnimationFrame = requestAnimationFrame = function requestAnimationFrame(callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!cancelAnimationFrame) {
  exports.cancelAnimationFrame = cancelAnimationFrame = function cancelAnimationFrame(id) {
    clearTimeout(id);
  };
}