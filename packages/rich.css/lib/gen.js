"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.getCssConfig = getCssConfig;
exports.setCssConfig = setCssConfig;
exports.createStyleElement = createStyleElement;
exports.getStyleElement = getStyleElement;
exports.writeStyles = writeStyles;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _config = _interopRequireDefault(require("./config"));

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 样式开关，实际上 - 符号，放在样式结尾。与默认值意义不同，有些默认值也是 - 结尾
 * @typedef StyleSwitcher
 * @type {string}
 */

/**
 * 样式表的描述对象
 * @typedef ClassObjects
 * @type {object}
 */

/**
 * 样式生成函数
 * @typedef GenFunc
 * @type {function}
 * @param {module:config~GenConfig} config - 配置对象
 * @returns {module:gen~ClassObjects}
 */

/**
 * 读取配置
 * @returns {module:config~GenConfig} 配置对象
 */
function getCssConfig() {
  return window.richCssConfig ? window.richCssConfig : _config.default;
}
/**
 * 修改配置
 * @param {module:config~GenConfig} - 配置对象，只替换对象包含的属性
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

  var ret = _objectSpread({}, getCssConfig(), {}, config);

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
  var html = (0, _utils.classObjectsToString)(styles);
  append ? styleElement.innerHTML += html : styleElement.innerHTML = html;
}
/**
 * 根据传入的 gen 函数集合，生成 css dom 对象，并写入 dom header
 * @static
 * @param {string} - 写入 header 的 id
 * @param  {...module:gen~GenFunc} - gen 函数集合
 * @example
 * ```js
 * import cssGen from '@bnorth/rich.css/lib/gen';
 * import genFuncText from '@bnorth/rich.css/lib/gens/text';
 * cssGen('richcss', genFuncText);
 * ```
 */


function gen() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'richcss';
  var config = getCssConfig();
  var styleElement = getStyleElement(name);

  for (var _len = arguments.length, gens = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    gens[_key - 1] = arguments[_key];
  }

  var classObjects = _assign.default.apply(Object, [{}].concat((0, _toConsumableArray2.default)(gens.map(function (v) {
    return v(config);
  }))));

  writeStyles(classObjects, styleElement, true);
}

var _default = gen;
exports.default = _default;