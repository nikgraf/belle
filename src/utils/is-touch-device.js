import { canUseDOM as exenvCanUseDOM } from 'exenv';

const isTouchDevice = exenvCanUseDOM && ('ontouchstart' in window
    || navigator.maxTouchPoints);       // works on IE10/11 and Surface
// reference: http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886

export default isTouchDevice;
