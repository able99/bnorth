"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animationFrame;
exports.afSpin = afSpin;
exports.afFlyoutLeft = afFlyoutLeft;
exports.afPeekTop = afPeekTop;
exports.afZoom = afZoom;
exports.afFade = afFade;
exports.afBottom = afBottom;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _animation = require("./animation");

var _dom = require("./dom");

/**
 * @module
 */
function animationFrame(el, work) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var cb = arguments.length > 3 ? arguments[3] : undefined;
  if (!el || !work) return;
  var time = new Date().getTime();
  var start = 0;
  var stop = false;

  function run() {
    var ret = work(el, start++, time, options);

    if (!stop && ret) {
      window.requestAnimationFrame(run);
    } else if (cb) {
      cb();
    }
  }

  ;
  if (options.autoStart) run();
  return [function () {
    stop = true;
  }, function (aoptions) {
    stop = false;
    options = (0, _objectSpread2.default)({}, options, aoptions);

    if (options.reset) {
      start = 0;
      time = new Date().getTime();
    }

    run();
  }];
}

function afSpin(el, start, time, options) {
  var obj = (0, _animation.transform)('rotate', start * 3 % 360 + 'deg');
  Object.entries(obj).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    el.style[k] = v;
  });
  return true;
}

function afFlyoutLeft(el, start, time, _ref3) {
  var duration = _ref3.duration;
  var diff = new Date().getTime() - time;
  var percent = diff * 100 / duration;
  var obj = (0, _animation.transform)('translateX', percent + '%');
  Object.entries(obj).forEach(function (_ref4) {
    var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
        k = _ref5[0],
        v = _ref5[1];

    el.style[k] = v;
  });
  return percent < 100;
}

function afPeekTop(el, start, time, _ref6) {
  var duration = _ref6.duration,
      rewind = _ref6.rewind;
  var total = (0, _dom.domGetDimensionValue)(el);
  var diff = new Date().getTime() - time;
  var top = diff * total / duration;
  if (top > total) top = total;
  var obj = (0, _animation.transform)('translateY', '-' + (!rewind ? total - top : top) + 'px');
  Object.entries(obj).forEach(function (_ref7) {
    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
        k = _ref8[0],
        v = _ref8[1];

    el.style[k] = v;
  });
  return top <= total;
}

function afZoom(el, start, time, _ref9) {
  var duration = _ref9.duration,
      rewind = _ref9.rewind;
  var diff = new Date().getTime() - time;
  var scale = diff / duration + 0.3;
  if (scale > 1) scale = 1;
  var obj = (0, _animation.transform)('scale', !rewind ? scale : 1 - scale);
  Object.entries(obj).forEach(function (_ref10) {
    var _ref11 = (0, _slicedToArray2.default)(_ref10, 2),
        k = _ref11[0],
        v = _ref11[1];

    el.style[k] = v;
  });
  return scale < 1;
}

function afFade(el, start, time, _ref12) {
  var duration = _ref12.duration,
      rewind = _ref12.rewind;
  var diff = new Date().getTime() - time;
  var scale = diff / duration;
  if (scale > 1) scale = 1;
  el.style.opacity = !rewind ? scale : 1 - scale;
  return scale < 1;
}

function afBottom(el, start, time, _ref13) {
  var duration = _ref13.duration,
      rewind = _ref13.rewind;
  var diff = new Date().getTime() - time;
  var percent = diff * 100 / duration;
  if (percent > 100) percent = 100;
  var obj = (0, _animation.transform)('translateY', (!rewind ? 100 - percent : percent) + '%');
  Object.entries(obj).forEach(function (_ref14) {
    var _ref15 = (0, _slicedToArray2.default)(_ref14, 2),
        k = _ref15[0],
        v = _ref15[1];

    el.style[k] = v;
  });
  return percent < 100;
}