"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

/**
 * 尺寸
 * @module
 */

/**
 * 样式生成函数：尺寸
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncSize(_ref) {
  var directionSize = _ref.directionSize,
      size = _ref.size;
  return Object.assign(
  /**
   * 设置宽度与高度全部铺满 100%
   * @classname square-full
   */
  (0, _utils.genClassObjects)('.square-full', {
    styleObjectMap: {
      'width': '100%',
      'height': '100%'
    }
  }),
  /**
   * 设置尺寸
   * @classname |
   * @param {module:config~GenConfig#directionSize} direction - 尺寸位置比如：宽，高等
   * @param {module:config~gen#size} size - 尺寸
   */
  (0, _utils.genClassObjects)('.', {
    styleKeySet: (0, _utils.getStyleValueSet)(directionSize),
    styleValueSet: (0, _utils.getStyleValueSet)(size)
  }));
}

var _default = genFuncSize;
exports.default = _default;