"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genIconFont = genIconFont;
exports.genIconClass = genIconClass;
exports.default = gen;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.string.repeat");

require("core-js/modules/web.dom.iterable");

var _utils = require("../utils");

function genIconFont(_ref) {
  var iconFonts = _ref.iconFonts,
      iconClassName = _ref.iconClassName;
  if (!iconFonts || !iconClassName) return;
  if (typeof iconFonts === 'string') iconFonts = [{
    src: iconFonts
  }];
  if (!Array.isArray(iconFonts)) iconFonts = [iconFonts];
  var ret = {};
  iconFonts.forEach(function (v, i) {
    ret["@font-face".concat(' '.repeat(i))] = {
      'font-family': v.family || 'font',
      'font-weight': v.weight || 'normal',
      'font-style': v.style || 'normal',
      'src': v.src
    };
  });
  var familys = iconFonts.reduce(function (v1, v2) {
    return v1 + (v2.family || 'font') + ', ';
  }, '') + 'sans-serif';
  ret[(0, _utils.getSelector)(iconClassName)] = {
    'font-family': familys
  };
  return ret;
}

function genIconClass(_ref2) {
  var _ref2$iconClassName = _ref2.iconClassName,
      iconClassName = _ref2$iconClassName === void 0 ? 'icon-' : _ref2$iconClassName;
  if (!iconClassName) return;
  var ret = {};
  ret[(0, _utils.getSelector)(iconClassName + ':before')] = {
    'content': 'attr(data-icon-name)'
  };
  ret[(0, _utils.getSelector)(iconClassName + '.button')] = {
    'font-size': 'inherit'
  };
  return ret;
}

function gen(config) {
  return (0, _objectSpread2.default)({}, genIconFont(config), genIconClass(config));
}