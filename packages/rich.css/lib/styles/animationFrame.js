"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = animationFrame;
exports.afSpin = afSpin;
exports.afFlyoutLeft = afFlyoutLeft;
exports.afPeekTop = afPeekTop;
exports.afZoom = afZoom;
exports.afFade = afFade;
exports.afBottom = afBottom;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _animation = require("./animation");

var _dom = require("./dom");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

function animationFrame(el, work) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var cb = arguments.length > 3 ? arguments[3] : undefined;
  if (!el || !work) return;
  var time = new Date().getTime();
  var start = 0;
  var stop = false;

  function run() {
    var ret = !stop && work(el, start++, time, options);

    if (!stop) {
      window.requestAnimationFrame(run);
    } else if (cb) {
      cb();
    }

    if (!ret) stop = true;
  }

  ;
  if (options.autoStart) run();
  return [function () {
    stop = true;
  }, function (aoptions) {
    stop = false;
    options = _objectSpread({}, options, {}, aoptions);

    if (options.reset) {
      start = 0;
      time = new Date().getTime();
    }

    run();
  }];
}

function afSpin(el, start, time, options) {
  var obj = (0, _animation.transform)('rotate', start * 3 % 360 + 'deg');
  (0, _entries.default)(obj).forEach(function (_ref) {
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
  (0, _entries.default)(obj).forEach(function (_ref4) {
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
  var ret = true;
  var total = (0, _dom.domGetDimensionValue)(el);
  var diff = new Date().getTime() - time;
  var top = diff * total / duration;

  if (top >= total) {
    top = total;
    ret = false;
  }

  var obj = (0, _animation.transform)('translateY', '-' + (!rewind ? total - top : top) + 'px');
  (0, _entries.default)(obj).forEach(function (_ref7) {
    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
        k = _ref8[0],
        v = _ref8[1];

    el.style[k] = v;
  });
  return ret;
}

function afZoom(el, start, time, _ref9) {
  var duration = _ref9.duration,
      rewind = _ref9.rewind;
  var diff = new Date().getTime() - time;
  var scale = diff / duration + 0.3;
  if (scale > 1) scale = 1;
  var obj = (0, _animation.transform)('scale', !rewind ? scale : 1 - scale);
  (0, _entries.default)(obj).forEach(function (_ref10) {
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
  (0, _entries.default)(obj).forEach(function (_ref14) {
    var _ref15 = (0, _slicedToArray2.default)(_ref14, 2),
        k = _ref15[0],
        v = _ref15[1];

    el.style[k] = v;
  });
  return percent < 100;
}