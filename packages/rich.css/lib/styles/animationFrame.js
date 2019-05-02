"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animationFrame;
exports.afSpin = afSpin;
exports.afFlyoutLeft = afFlyoutLeft;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _animation = require("./animation");

/**
 * @module
 */
function animationFrame(el, work) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!el || !work) return;
  var time = new Date().getTime();
  var start = 0;
  var stop = false;

  function run() {
    var ret = work(el, start++, time, options);
    if (!stop && ret) window.requestAnimationFrame(run);
  }

  ;
  if (options.first) run();
  return [function () {
    stop = true;
  }, function (reset) {
    stop = false;

    if (reset) {
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