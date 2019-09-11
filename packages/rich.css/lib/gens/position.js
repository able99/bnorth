"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _utils = require("../utils");

var _compatibleAnimation = _interopRequireDefault(require("../compatibles/compatibleAnimation"));

/**
 * 位置
 * @module
 */

/**
 * 样式生成函数：位置
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncPosition(_ref) {
  var position = _ref.position,
      directionOffsetAll = _ref.directionOffsetAll,
      directionOffset = _ref.directionOffset;
  return (0, _assign.default)(
  /**
   * 设置定位类型
   * @classname position
   * @param {module:config~GenConfig#position} position - 定位类型
   */
  (0, _utils.genClassObjects)('.position', {
    styleKey: 'position',
    styleValueSet: (0, _utils.getStyleValueSet)(position)
  }),
  /**
   * 设置指定方向的偏移量为0
   * @classname offset
   * @classnameext start
   * @param {module:config~GenConfig#directionOffsetAll} offset - 偏移的方向 
   */
  (0, _utils.genClassObjects)('.offset', {
    selectorExt: 'start',
    styleKeySet: directionOffsetAll,
    styleValueMap: function styleValueMap() {
      return '0';
    }
  }),
  /**
   * 设置指定方向的偏移量为中心，50%
   * @classname offset
   * @classnameext center
   * @param {module:config~GenConfig#directionOffset} offset - 偏移的方向 
   */
  (0, _utils.genClassObjects)('.offset', {
    selectorExt: 'center',
    styleKey: ' ',
    styleKeySet: directionOffset,
    styleValueMap: function styleValueMap() {
      return '50%';
    }
  }),
  /**
   * 设置指定方向的偏移量为 100%
   * @classname offset
   * @classnameext end
   * @param {module:config~GenConfig#directionOffset} offset - 偏移的方向 
   */
  (0, _utils.genClassObjects)('.offset', {
    selectorExt: 'end',
    styleKey: ' ',
    styleKeySet: directionOffset,
    styleValueMap: function styleValueMap() {
      return '100%';
    }
  }),
  /**
   * 设置元素偏移到父元素中心
   * @classname translate-center-a
   */
  (0, _utils.genClassObjects)('.translate-center', {
    selectorExt: 'a',
    styleKey: 'transform',
    styleValueMap: function styleValueMap() {
      return 'translate3d(-50%, -50%, 0)';
    },
    styleObjectCompatible: _compatibleAnimation.default
  }),
  /**
   * 设置元素 X 轴方向偏移到父元素中心
   * @classname translate-center-x
   */
  (0, _utils.genClassObjects)('.translate-center', {
    selectorExt: 'x',
    styleKey: 'transform',
    styleValueMap: function styleValueMap() {
      return 'translate3d(-50%, 0, 0)';
    },
    styleObjectCompatible: _compatibleAnimation.default
  }),
  /**
   * 设置元素 Y 轴方向偏移到父元素中心
   * @classname translate-center-y
   */
  (0, _utils.genClassObjects)('.translate-center', {
    selectorExt: 'y',
    styleKey: 'transform',
    styleValueMap: function styleValueMap() {
      return 'translate3d(0, -50%, 0)';
    },
    styleObjectCompatible: _compatibleAnimation.default
  }));
}

var _default = genFuncPosition;
exports.default = _default;