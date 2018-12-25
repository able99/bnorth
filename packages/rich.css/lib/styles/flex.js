"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleFlexSubOrder = styleFlexSubOrder;
exports.styleFlexSubGrow = styleFlexSubGrow;
exports.styleFlexSubShrink = styleFlexSubShrink;
exports.styleFlexSubBasis = styleFlexSubBasis;

require("core-js/modules/es6.number.constructor");

var _compatibleFlex = _interopRequireDefault(require("../compatibles/compatibleFlex"));

/**
 * @module
 */

/**
 * 生成设置 flex 子元素 order 属性 的 style inline 对象，并实现浏览器兼容
 * @param {!(number|string)} val - order 值
 * @returns {object} style inline object
 */
function styleFlexSubOrder(val) {
  return (0, _compatibleFlex.default)({
    'order': val
  }, true);
}
/**
 * 生成设置 flex 子元素 grow 属性 的 style inline 对象，并实现浏览器兼容
 * @param {!(number|string)} val - grow 值
 * @returns {object} style inline object
 */


function styleFlexSubGrow(val) {
  return (0, _compatibleFlex.default)({
    'flex-grow': val
  }, true);
}
/**
 * 生成设置 flex 子元素 shrink 属性 的 style inline 对象，并实现浏览器兼容
 * @param {!(number|string)} val - shrink 值
 * @returns {object} style inline object
 */


function styleFlexSubShrink(val) {
  return (0, _compatibleFlex.default)({
    'flex-shrink': val
  }, true);
}
/**
 * 生成设置 flex 子元素 basis 属性 的 style inline 对象，并实现浏览器兼容
 * @param {!(number|string)} val - basis 值
 * @returns {object} style inline object
 */


function styleFlexSubBasis(val) {
  return (0, _compatibleFlex.default)({
    'flex-basis': String(Number(val).toFixed(2)) + '%'
  }, true);
}