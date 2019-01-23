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
  domFindNode: true,
  domFindContainer: true,
  domFindScrollContainer: true,
  domCreatePortal: true,
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
exports.domCreatePortal = domCreatePortal;
exports.domOffset = domOffset;
exports.domGetDimensionValue = domGetDimensionValue;
exports.domGetScrollDimensionValue = domGetScrollDimensionValue;
exports.chainedFuncs = chainedFuncs;
exports.domIsMouse = exports.domIsTouch = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

var _style = _interopRequireDefault(require("dom-helpers/style"));

var _offset = _interopRequireDefault(require("dom-helpers/query/offset"));

var _position = _interopRequireDefault(require("dom-helpers/query/position"));

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

/**
 * dom 操作工具集
 * @module
 */
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

/**
 * 是否支持 touch
 * @type {boolean}
 */


var domIsTouch = 'ontouchstart' in document;
/**
 * 是否支持鼠标
 * @type {boolean}
 */

exports.domIsTouch = domIsTouch;
var domIsMouse = 'onmousedown' in document; // dom find
// -------------------

/**
 * 返回组件对应的元素
 * @param {element|component} - 组件
 * @returns {element} 对应的元素
 */

exports.domIsMouse = domIsMouse;

function domFindNode(node) {
  return _reactDom.default.findDOMNode(node);
}
/**
 * 查找组件或元素的 container，查找模式：
 * 
 * 1. 如果父元素为 body 则返回 body
 * 1. 如果父元素是 page 则返回页面元素
 * 1. 返回具有参数 container 指定的，具有 data-container 响应名称属性的元素
 * @param {element|component} - 组件或元素
 * @param {true|string} - 查找模式
 * @returns {element} 所在的 container
 */


function domFindContainer(node, container) {
  var el = domFindNode(node);
  if (!el) return document.body;

  while (el = el.parentElement) {
    if (el === document.body) return el;
    if (el.getAttribute('data-page')) return el;
    if (container === true && el.getAttribute('data-container') === 'true') return el;
    if (container && el.getAttribute('data-container') === container) return el;
  }

  return document.body;
}
/**
 * 查找组件或者元素的可滚动父元素
 * @param {element|component} - 组件或元素
 * @param {element|component} - 如果为真，直接作为结果返回
 * @param {boolean} - 是否是横向滚动 
 * @returns {element} 滚动父元素
 */


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
} // dom portal
// -------------------

/**
 * 将组建以 portal 方式，render 到制定元素
 * @param {component} - 将 render 的组件 
 * @param {element} - render 到的元素
 */


function domCreatePortal(component, container) {
  return _reactDom.default.createPortal(component, container || document.body);
} // dom offset
// -------------------

/**
 * @typedef ElementOffset
 * @type {object}
 * @param {number} x - 坐标 x
 * @param {number} y - 坐标 y
 * @param {number} width - 宽度
 * @param {number} height - 高度
 */

/**
 * 返回组件或者元素的坐标和尺寸
 * @param {component|element} - 目标元素或组件 
 * @param {element} - 相对于该元素的相对坐标，为空时是相对于浏览器的绝对坐标 
 * @returns {module:utils/dom~ElementOffset} - x,y 坐标，width,height 尺寸
 */


function domOffset(node, container) {
  node = domFindNode(node);
  return container ? (0, _position.default)(node, container) : (0, _offset.default)(node);
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

/**
 * 将函数串联起来，返回一个函数，调用时将串行调用所包含的全部函数
 * @param  {...function} 全部函数
 * @returns {function} 串联后的函数 
 */


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

    if (!acc) {
      return f;
    }

    return function chainedFunction() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      f.apply(this, args);
    };
  }, undefined);
} // on, off, filter, listen
// node, eventName, handler, capture