"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _utils = require("../utils");

/**
 * 显示方式
 * @module
 */

/**
 * 样式生成函数：显示方式
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncDisplay(_ref) {
  var directionAxis = _ref.directionAxis,
      display = _ref.display,
      visibility = _ref.visibility,
      opacity = _ref.opacity,
      pointerEvents = _ref.pointerEvents,
      overflow = _ref.overflow,
      float = _ref.float;
  return (0, _assign.default)(
  /**
   * 设置显示方式
   * @classname display
   * @param {module:config~GenConfig#display} display - 显示方式
   */
  (0, _utils.genClassObjects)('.display', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(display)
  }),
  /**
   * 设置可见方式
   * @classname visibility
   * @param {module:config~GenConfig#visibility} visibility - 可见方式
   */
  (0, _utils.genClassObjects)('.visibility', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(visibility)
  }),
  /**
   * 设置透明度
   * @classname opacity
   * @param {module:config~GenConfig#opacity} opacity - 透明度
   */
  (0, _utils.genClassObjects)('.opacity', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(opacity),
    styleValueMap: function styleValueMap(val) {
      return (val / 100).toFixed(2);
    }
  }),
  /**
   * 设置滚动，各个方向可以分别设置，需要加上开关
   * @classname scrollable
   * @param {module:config~GenConfig#directionAxis} direction - 坐标轴方向
   * @param {module:config~gen#StyleSwitcher} switcher - 样式开关
   */
  (0, _utils.genClassObjects)('.scrollable', {
    selectorExt: '-',
    styleKeySet: (0, _utils.getStyleValueSet)(directionAxis),
    styleObjectMap: function styleObjectMap(styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue) {
      return {
        'max-width': styleKeySetKey !== 'y' ? '100%' : undefined,
        'max-height': styleKeySetKey !== 'x' ? '100%' : undefined,
        'overflow-x': styleKeySetKey !== 'y' ? 'auto' : 'hidden',
        'overflow-y': styleKeySetKey !== 'x' ? 'auto' : 'hidden',
        '-webkit-overflow-scrolling': 'touch'
      };
    }
  }),
  /**
   * 设置溢出处理方式
   * @classname overflow
   * @param {module:config~GenConfig#directionAxis} direction - 坐标轴方向
   * @param {module:config~GenConfig#overflow} overflow - 处理方式
   */
  (0, _utils.genClassObjects)('.overflow', {
    styleKey: true,
    styleKeySet: (0, _utils.getStyleValueSet)(directionAxis),
    styleValueSet: (0, _utils.getStyleValueSet)(overflow)
  }),
  /**
   * 设置事件响应目标
   * @classname pointer-events
   * @param {module:config~GenConfig#pointerEvents} event - 事件响应目标
   */
  (0, _utils.genClassObjects)('.pointer-events', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(pointerEvents)
  }),
  /**
   * 设置浮动方式
   * @classname float
   * @param {module:config~GenConfig#float} float - 浮动方向
   */
  (0, _utils.genClassObjects)('.float', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(float)
  }),
  /**
   * 清除全部风向浮动
   * @classname clear
   */
  (0, _utils.genClassObjects)('.clear:before', {
    styleObjectMap: {
      'content': "' '",
      'display': 'table'
    }
  }), (0, _utils.genClassObjects)('.clear:after', {
    styleObjectMap: {
      'content': "' '",
      'display': 'table',
      'clear': 'both'
    }
  }));
}

var _default = genFuncDisplay;
exports.default = _default;