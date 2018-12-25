"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shadow = shadow;

/**
 * @module
 */

/**
 * 生成设置阴影的 style inline 对象
 * @param {string} [color='#888888'] - css 颜色值
 * @param {object=} options - 阴影参数对象
 * 
 * 1. h：水平阴影的位置，允许负值， 默认值为 `0`
 * 1. v：垂直阴影的位置，允许负值， 默认值为 `1px`
 * 1. blur：模糊距离，默认值为 `3px`
 * 1. spread：阴影的尺寸，默认值为 `0`
 * 1. inset：将外部阴影改为内部阴影，默认是外部
 * 
 * @returns {object} style inline object
 * @example
 * ```jsx
 * import { shadow } from '@bnorth/rich.css/lib/styles/shadow';
 * export default props=>{
 *   return <div style={shadow('black', {blur: '10px'})} />
 * }
 * ```
 */
function shadow() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#888888';

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$h = _ref.h,
      h = _ref$h === void 0 ? 0 : _ref$h,
      _ref$v = _ref.v,
      v = _ref$v === void 0 ? '1px' : _ref$v,
      _ref$blur = _ref.blur,
      blur = _ref$blur === void 0 ? '3px' : _ref$blur,
      _ref$spread = _ref.spread,
      spread = _ref$spread === void 0 ? 0 : _ref$spread,
      _ref$inset = _ref.inset,
      inset = _ref$inset === void 0 ? false : _ref$inset;

  return {
    boxShadow: "".concat(color, " ").concat(h, " ").concat(v, " ").concat(blur ? blur : '', " ").concat(spread ? spread : '').concat(inset ? ' inset' : '')
  };
}