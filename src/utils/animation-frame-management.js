// Inspired by https://gist.github.com/paulirish/1579671

import { canUseDOM } from 'exenv';

export let requestAnimationFrame;
export let cancelAnimationFrame;

let lastTime = 0;

if (canUseDOM) {
  requestAnimationFrame = window.requestAnimationFrame;
  cancelAnimationFrame = window.cancelAnimationFrame;

  const vendors = ['ms', 'moz', 'webkit', 'o'];
  for (let index = 0; index < vendors.length && !requestAnimationFrame; ++index) {
    requestAnimationFrame = window[vendors[index] + 'RequestAnimationFrame'];
    cancelAnimationFrame = window[vendors[index] + 'CancelAnimationFrame'] ||
      window[vendors[index] + 'CancelRequestAnimationFrame'];
  }
}

if (!requestAnimationFrame) {
  requestAnimationFrame = (callback) => {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!cancelAnimationFrame) {
  cancelAnimationFrame = (id) => {
    clearTimeout(id);
  };
}
