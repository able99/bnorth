"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

function genFuncCursor(_ref) {
  var cursor = _ref.cursor;
  return (0, _utils.genClassObjects)('.cursor', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(cursor)
  });
}

var _default = genFuncCursor;
exports.default = _default;