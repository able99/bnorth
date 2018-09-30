"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  domCapitalize: true,
  domTriggerBrowserReflow: true,
  domIsTouch: true,
  domIsMouse: true,
  domTouchEventNameMaps: true,
  domFindNode: true,
  domFindContainer: true,
  domFindScrollContainer: true,
  domOffset: true,
  domGetDimensionValue: true,
  domGetScrollDimensionValue: true,
  chainedFuncs: true
};
exports.domCapitalize = domCapitalize;
exports.domTriggerBrowserReflow = domTriggerBrowserReflow;
exports.domFindNode = domFindNode;
exports.domFindContainer = domFindContainer;
exports.domFindScrollContainer = domFindScrollContainer;
exports.domOffset = domOffset;
exports.domGetDimensionValue = domGetDimensionValue;
exports.domGetScrollDimensionValue = domGetScrollDimensionValue;
exports.chainedFuncs = chainedFuncs;
exports.domTouchEventNameMaps = exports.domIsMouse = exports.domIsTouch = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

var _style = _interopRequireDefault(require("dom-helpers/style"));

var _offset = _interopRequireDefault(require("dom-helpers/query/offset"));

var _events = require("dom-helpers/events/");

Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _events[key];
    }
  });
});
var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
}; // util
// -------------------

function domCapitalize(string) {
  return "".concat(string.charAt(0).toUpperCase()).concat(string.slice(1));
}

function domTriggerBrowserReflow(node) {
  // reading a dimension prop will cause the browser to recalculate,
  // which will let our animations work
  node.offsetHeight; // eslint-disable-line no-unused-expressions
} // env
// -------------------


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
} : {}; // dom find
// -------------------

exports.domTouchEventNameMaps = domTouchEventNameMaps;

function domFindNode(node) {
  return _reactDom.default.findDOMNode(node);
}

function domFindContainer(node, container) {
  var el = domFindNode(node);
  if (!el) return document.body;

  while (el = el.parentElement) {
    if (el === document.body) return el;
    if (el.getAttribute('data-container-page')) return el;
    if (container === true && el.getAttribute('data-container') === 'true') return el;
    if (container && el.getAttribute('data-container') === container) return el;
  }

  return document.body;
}

function domFindScrollContainer(node, container, horizontal) {
  if (container) return _reactDom.default.findDOMNode(container);
  node = _reactDom.default.findDOMNode(node);

  while (node.parentNode) {
    node = node.parentNode;
    if (node === document.body) return node;
    var style = window.getComputedStyle(node);
    var overflow = (horizontal ? style.getPropertyValue('overflow-x') : style.getPropertyValue('overflow-y')) || style.getPropertyValue('overflow');
    if (overflow === 'auto' || overflow === 'scroll') return node;
  }

  return document.body;
} // dom offset
// -------------------


function domOffset(node) {
  return (0, _offset.default)(domFindNode(node));
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
} // event
// -------------------


function chainedFuncs() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f) {
    return f;
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) {
      return f;
    }

    return function chainedFunction() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      f.apply(this, args);
    };
  }, null);
} // on, off, filter, listen
// node, eventName, handler, capture