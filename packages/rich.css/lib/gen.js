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
exports.default = cssGen;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _config = _interopRequireDefault(require("./config"));

var _utils = require("./utils");

function getCssConfig() {
  return window.richCssConfig ? window.richCssConfig : _config.default;
}

function setCssConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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

function cssGen() {
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