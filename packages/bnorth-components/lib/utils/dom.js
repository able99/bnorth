"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domOffset = domOffset;
exports.domCapitalize = domCapitalize;
exports.domTriggerBrowserReflow = domTriggerBrowserReflow;
exports.domGetDimensionValue = domGetDimensionValue;
exports.domGetScrollDimensionValue = domGetScrollDimensionValue;
exports.domTouchEventNameMaps = exports.domIsMouse = exports.domIsTouch = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

var _style = _interopRequireDefault(require("dom-helpers/style"));

var _offset = _interopRequireDefault(require("dom-helpers/query/offset"));

function domOffset(node) {
  node = _reactDom.default.findDOMNode(node);
  return (0, _offset.default)(node);
}

var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};
var domIsTouch = 'ontouchstart' in document;
exports.domIsTouch = domIsTouch;
var domIsMouse = 'onmousedown' in document;
exports.domIsMouse = domIsMouse;
var domTouchEventNameMaps = domIsTouch ? {
  down: 'touchstart',
  move: 'touchmove',
  up: 'touchend',
  cancel: 'touchcancel'
} : domIsMouse ? {
  down: 'mousedown',
  move: 'mousemove',
  up: 'mouseup',
  cancel: 'mouseout'
} : {};
exports.domTouchEventNameMaps = domTouchEventNameMaps;

function domCapitalize(string) {
  return "".concat(string.charAt(0).toUpperCase()).concat(string.slice(1));
}

function domTriggerBrowserReflow(node) {
  // reading a dimension prop will cause the browser to recalculate,
  // which will let our animations work
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}

function domGetDimensionValue(elem) {
  var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "height";
  elem = _reactDom.default.findDOMNode(elem);
  var value = elem["offset".concat(domCapitalize(dimension))];
  var margins = MARGINS[dimension];
  return value + parseInt((0, _style.default)(elem, margins[0]), 10) + parseInt((0, _style.default)(elem, margins[1]), 10);
}

function domGetScrollDimensionValue(elem) {
  var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "height";
  return "".concat(_reactDom.default.findDOMNode(elem)["scroll".concat(domCapitalize(dimension))], "px");
}