"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  domCapitalize: true,
  domTriggerBrowserReflow: true,
  domIsTouch: true,
  domIsMouse: true,
  domPassiveSupported: true,
  domFindNode: true,
  domFindDock: true,
  domFindScrollDock: true,
  domCreatePortal: true,
  domOffset: true,
  domGetDimensionValue: true,
  domGetScrollDimensionValue: true,
  chainedFuncs: true
};
exports.domCapitalize = domCapitalize;
exports.domTriggerBrowserReflow = domTriggerBrowserReflow;
exports.domPassiveSupported = domPassiveSupported;
exports.domFindNode = domFindNode;
exports.domFindDock = domFindDock;
exports.domFindScrollDock = domFindScrollDock;
exports.domCreatePortal = domCreatePortal;
exports.domOffset = domOffset;
exports.domGetDimensionValue = domGetDimensionValue;
exports.domGetScrollDimensionValue = domGetScrollDimensionValue;
exports.chainedFuncs = chainedFuncs;
exports.default = BaseComponent;
exports.domIsMouse = exports.domIsTouch = void 0;

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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
 * 基础组件以及一些工具函数
 * @module
 */
// util
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


var domIsTouch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
/**
 * 是否支持鼠标
 * @type {boolean}
 */

exports.domIsTouch = domIsTouch;
var domIsMouse = !domIsTouch;
/**
 * 是否支持 passive event listener
 */

exports.domIsMouse = domIsMouse;

function domPassiveSupported() {
  var result = false;

  try {
    var options = Object.defineProperty({}, "passive", {
      get: function get() {
        result = true;
      }
    });
    window.addEventListener("test", null, options);
  } catch (err) {}

  return result;
} // dom find
// -------------------

/**
 * 返回组件对应的元素
 * @param {element|component} - 组件
 * @returns {element} 对应的元素
 */


function domFindNode(node) {
  return _reactDom.default.findDOMNode(node);
}
/**
 * 查找组件或元素的 container，查找模式：
 * 
 * 1. 如果父元素为 body 则返回 body
 * 1. 如果父元素是 page 则返回页面元素
 * 1. 返回具有参数 dock 指定的，具有 data-dock 响应名称属性的元素
 * @param {element|component} - 组件或元素
 * @param {true|string} - 查找模式
 * @returns {element} 所在的 dock
 */


function domFindDock(node, dockParam) {
  var el = domFindNode(node);
  if (!el) return document.body;
  if (dockParam === 'parent') return el.parentElement;

  while (el = el.parentElement) {
    if (el === document.body) return el;
    if (el.getAttribute('data-page')) return el;
    if (dockParam === true && el.getAttribute('data-dock') === 'true') return el;
    if (dockParam && el.getAttribute('data-dock') === dockParam) return el;
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


function domFindScrollDock(node, dock, horizontal) {
  if (dock) return _reactDom.default.findDOMNode(dock);
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


function domCreatePortal(component, dock) {
  return _reactDom.default.createPortal(component, dock || document.body);
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


function domOffset(node, dock) {
  node = domFindNode(node);
  return dock ? (0, _position.default)(node, dock) : (0, _offset.default)(node);
}

var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

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


/**
 * 虚拟组件基类，不可被直接使用，为组件提供通用的属性
 * 默认属性
 * @component
 * @exportdefault
 * @name BaseComponent
 */
function BaseComponent(props) {
  props = (0, _objectSpread2.default)({}, typeof props['b-precast'] === 'function' ? props['b-precast'](props) : props['b-precast'], typeof props['b-dynamic'] === 'function' ? props['b-dynamic'](props) : props['b-dynamic'], props);
  delete props['b-precast'];
  delete props['b-dynamic'];
  Object.entries(props).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    if (k.startsWith('bp-')) {
      delete props[k];
      k = k.slice(3);
      var index = k.indexOf('-');
      if (index < 0) return;
      var objName = k.slice(0, index);
      var propName = k.slice(index + 1);
      if (!objName || !propName) return;
      objName += 'Props';
      props[objName] = (0, _objectSpread2.default)({}, props[objName]);
      props[objName][propName] = v;
    }
  });
  return props;
}
/**
 * 样式函数映射集合
 */


BaseComponent.styleFunctions = {};
/**
 * 其他 react 标准属性，比如：
 * 
 * - className：样式类 
 * - style：样式对象，注意 react 使用样式对象，而不是样式字符串
 * - children：子元素
 * - onXXX：事件
 * - xxx：其他 react 属性和 dom 属性
 * @attribute BaseComponent.xxx
 */

/**
 * 设置映射组件
 * 
 * bnorth 组件，一般情况下都只是设置组件的样式和属性，或者设置默认的映射组件，而功能是由映射组件去完成。可以通过修改该属性，修改默认的映射组件。
 * 比如 Button 组件的默认映射组件为 button，可以修改为 a 元素
 * @attribute BaseComponent.component
 * @type {element|component}
 */

/**
 * 设置映射组件的映射组件，
 * 当映射组件设置的映射组件为 bnorth 组件，而不是元素时，还可以通过该属性，设置映射组件的映射组件，方便二次包装组件
 * @attribute BaseComponent.componentPanel
 * @type {element|component}
 */

/**
 * 其他映射组件可以设置的属性
 * @attribute BaseComponent.xxx
 */

/**
 * 设置组件通用的默认属性，当设置为回调函数时，参数是组件当前属性，返回值是属性，可覆盖当前属性
 * @member BaseComponent.props
 * @type {function|object}
 * @static
 */