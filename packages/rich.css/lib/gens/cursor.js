"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

/**
 * 光标样式
 * @module
 */

/**
 * 样式生成函数：光标样式
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncCursor(_ref) {
  var cursor = _ref.cursor;

  /**
   * 设置光标样式
   * @classname border-set
   * @param {module:config~GenConfig#cursor} cursor - 光标样式
   */
  return (0, _utils.genClassObjects)('.cursor', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(cursor)
  });
}

var _default = genFuncCursor;
exports.default = _default;