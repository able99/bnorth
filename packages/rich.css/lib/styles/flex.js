"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleFlexSubOrder = styleFlexSubOrder;
exports.styleFlexSubGrow = styleFlexSubGrow;
exports.styleFlexSubShrink = styleFlexSubShrink;
exports.styleFlexSubBasis = styleFlexSubBasis;

var _compatibleFlex = _interopRequireDefault(require("../compatibles/compatibleFlex"));

function styleFlexSubOrder(val) {
  return (0, _compatibleFlex.default)({
    'order': val
  }, true);
}

function styleFlexSubGrow(val) {
  return (0, _compatibleFlex.default)({
    'flex-grow': val
  }, true);
}

function styleFlexSubShrink(val) {
  return (0, _compatibleFlex.default)({
    'flex-shrink': val
  }, true);
}

function styleFlexSubBasis(val) {
  return (0, _compatibleFlex.default)({
    'flex-basis': String(Number(val).toFixed(2)) + '%'
  }, true);
}