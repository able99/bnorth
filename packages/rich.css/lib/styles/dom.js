"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domCapitalize = domCapitalize;
exports.domGetDimensionValue = domGetDimensionValue;

var _style = _interopRequireDefault(require("dom-helpers/style"));

/**
 * @module
 */
function domCapitalize(string) {
  return "".concat(string.charAt(0).toUpperCase()).concat(string.slice(1));
}

var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function domGetDimensionValue(elem) {
  var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "height";
  var value = elem["offset".concat(domCapitalize(dimension))];
  var margins = MARGINS[dimension];
  return value + parseInt((0, _style.default)(elem, margins[0]), 10) + parseInt((0, _style.default)(elem, margins[1]), 10);
}