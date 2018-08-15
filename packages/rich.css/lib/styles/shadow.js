"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shadow = shadow;

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