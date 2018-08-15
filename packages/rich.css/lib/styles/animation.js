"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transiton = transiton;
exports.animation = animation;
exports.transform = transform;
exports.transforms = transforms;

var _compatibleAnimation = _interopRequireDefault(require("../compatibles/compatibleAnimation"));

function transiton() {
  var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '300ms';

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$property = _ref.property,
      property = _ref$property === void 0 ? 'all' : _ref$property,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? '0s' : _ref$delay,
      _ref$timeFunction = _ref.timeFunction,
      timeFunction = _ref$timeFunction === void 0 ? 'ease-in-out' : _ref$timeFunction;

  return (0, _compatibleAnimation.default)({
    'transition': "".concat(property, " ").concat(isNaN(duration) ? duration : "".concat(duration, "ms"), " ").concat(timeFunction, " ").concat(delay)
  }, true);
}

function animation(name) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1s';

  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$property = _ref2.property,
      property = _ref2$property === void 0 ? 'transform' : _ref2$property,
      _ref2$delay = _ref2.delay,
      delay = _ref2$delay === void 0 ? '0s' : _ref2$delay,
      _ref2$count = _ref2.count,
      count = _ref2$count === void 0 ? 'infinite' : _ref2$count,
      _ref2$timeFunction = _ref2.timeFunction,
      timeFunction = _ref2$timeFunction === void 0 ? 'ease-in-out' : _ref2$timeFunction,
      direction = _ref2.direction,
      playState = _ref2.playState;

  var ret = {
    'animation': "".concat(name, " ").concat(duration, " ").concat(timeFunction, " ").concat(delay, " ").concat(count)
  };
  if (direction) ret['animation-direction'] = direction;
  if (playState) ret['animation-play-state'] = playState;
  return (0, _compatibleAnimation.default)(ret, true);
}

function transform(name) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  params = params.reduce(function (v1, v2, i) {
    return "".concat(v1).concat(i > 0 ? ',' : '').concat(v2);
  }, '');
  return (0, _compatibleAnimation.default)({
    transform: "".concat(name, "(").concat(params, ")")
  }, true);
}

function transforms(param) {
  var ret = {};
  Object.entries(param).forEach(function (v) {
    return (0, _compatibleAnimation.default)({
      'transform': " ".concat(v[0], "(").concat(v[1], ")")
    });
  }, true);
  return ret;
}