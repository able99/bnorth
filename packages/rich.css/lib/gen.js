"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCssConfig = getCssConfig;
exports.setCssConfig = setCssConfig;
exports.createStyleElement = createStyleElement;
exports.getStyleElement = getStyleElement;
exports.writeStyles = writeStyles;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _config = _interopRequireDefault(require("./config"));

var _utils = require("./utils");

/**
 * @module
 */

/**
 * 读取配置
 * @returns {GenConfig} 配置对象
 */
function getCssConfig() {
  return window.richCssConfig ? window.richCssConfig : _config.default;
}
/**
 * 修改配置
 * @param {GenConfig} - 配置对象，只替换对象包含的属性
 * @example
 * ```js
 * import { getCssConfig, setCssConfig } from '@bnorth/rich.css/lib/gen';
 * let { textColors } = getCssConfig();
 * textColors.normal = '#222222';
 * setCssConfig({textColors});
 * ```
 */


function setCssConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ret = (0, _objectSpread2.default)({}, getCssConfig(), config);
  return window.richCssConfig = ret;
}

function createStyleElement(name) {
  var styleElement = document.createElement('style');
  styleElement.setAttribute('data-name', name);
  document.head.appendChild(styleElement);
  return styleElement;
}

function getStyleElement(name) {
  var styleElement = document.head.querySelector("style[data-name=".concat(name, "]"));
  return styleElement || createStyleElement(name);
}

function writeStyles(styles, styleElement, append) {
  if (!styles || !styleElement) return;
  var html = (0, _utils.stylesToString)(styles);
  append ? styleElement.innerHTML += html : styleElement.innerHTML = html;
}
/**
 * 根据传入的 gen 函数集合，生成 css dom 对象，并写入 dom header
 * @static
 * @param {string} - 写入 header 的 id
 * @param  {...function} - gen 函数集合
 * @example
 * ```js
 * import cssGen from '@bnorth/rich.css/lib/gen';
 * import genText from '@bnorth/rich.css/lib/gens/text';
 * cssGen('richcss', genText);
 * ```
 */


function gen() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'richcss';
  var config = getCssConfig();
  var styleElement = getStyleElement(name);

  for (var _len = arguments.length, gens = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    gens[_key - 1] = arguments[_key];
  }

  return gens.forEach(function (v) {
    return writeStyles(v(config), styleElement, true);
  });
}

var _default = gen;
exports.default = _default;