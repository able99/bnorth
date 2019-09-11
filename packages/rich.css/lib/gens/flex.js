"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _utils = require("../utils");

var _compatibleFlex = _interopRequireDefault(require("../compatibles/compatibleFlex"));

/**
 * 弹性布局
 * @module
 */

/**
 * 样式生成函数：弹性布局
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncFlex(_ref) {
  var flexDisplay = _ref.flexDisplay,
      flexDirection = _ref.flexDirection,
      flexJustify = _ref.flexJustify,
      flexAlign = _ref.flexAlign,
      flexWrap = _ref.flexWrap,
      flexSubFlex = _ref.flexSubFlex;
  return (0, _assign.default)(
  /**
   * 设置弹性布局显示方式
   * @classname flex-display
   * @param {module:config~GenConfig#flexDisplay} display - 显示方式
   */
  (0, _utils.genClassObjects)('.flex-display', {
    styleKey: 'display',
    styleValueSet: (0, _utils.getStyleValueSet)(flexDisplay),
    styleObjectCompatible: _compatibleFlex.default
  }),
  /**
   * 设置弹性布局方向
   * @classname flex-direction
   * @param {module:config~GenConfig#flexDirection} direction - 弹性布局方向
   */
  (0, _utils.genClassObjects)('.flex-direction', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(flexDirection),
    styleObjectCompatible: _compatibleFlex.default
  }),
  /**
   * 设置主轴对齐方式
   * @classname flex-justify
   * @param {module:config~GenConfig#flexJustify} justify - 主轴对齐方式
   */
  (0, _utils.genClassObjects)('.flex-justify', {
    styleKey: 'justify-content',
    styleValueSet: (0, _utils.getStyleValueSet)(flexJustify),
    styleObjectCompatible: _compatibleFlex.default
  }),
  /**
   * 设置侧轴对齐方式
   * @classname flex-align
   * @param {module:config~GenConfig#flexAlign} align - 侧轴对齐方式
   */
  (0, _utils.genClassObjects)('.flex-align', {
    styleKey: 'align-items',
    styleValueSet: (0, _utils.getStyleValueSet)(flexAlign),
    styleObjectCompatible: _compatibleFlex.default
  }),
  /**
   * 设置主轴堆叠方式和方向
   * @classname flex-wrap
   * @param {module:config~GenConfig#flexWrap} wrap - 主轴堆叠方式和方向
   */
  (0, _utils.genClassObjects)('.flex-wrap', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(flexWrap),
    styleObjectCompatible: _compatibleFlex.default
  }),
  /**
   * 设置子元素在侧轴对齐方式
   * @classname flex-sub-align
   * @param {module:config~GenConfig#flexAlign} align - 侧轴对齐方式
   */
  (0, _utils.genClassObjects)('.flex-sub-align', {
    styleKey: 'align-self',
    styleValueSet: (0, _utils.getStyleValueSet)(flexAlign),
    styleObjectCompatible: _compatibleFlex.default
  }),
  /**
   * 设置子元素的弹性方式
   * @classname flex-sub-flex
   * @param {module:config~GenConfig#flexSubFlex} flex - 弹性方式
   */
  (0, _utils.genClassObjects)('.flex-sub-flex', {
    styleKey: 'flex',
    styleValueSet: (0, _utils.getStyleValueSet)(flexSubFlex),
    styleObjectCompatible: _compatibleFlex.default
  }),
  /**
   * 设置子元素的弹性放大，权重为 1
   * @classname flex-sub-flex-grow
   */
  (0, _utils.genClassObjects)('.flex-sub-flex-grow', {
    styleKey: 'flex-grow',
    styleValueMap: '1',
    styleObjectCompatible: _compatibleFlex.default
  }),
  /**
   * 设置子元素的弹性缩小，权重为 1
   * @classname flex-sub-flex-shrink
   */
  (0, _utils.genClassObjects)('.flex-sub-flex-shrink', {
    styleKey: 'flex-shrink',
    styleValueMap: '1',
    styleObjectCompatible: _compatibleFlex.default
  }), (0, _utils.genClassObjects)('.flex-overflow', {
    styleObjectMap: {
      'position': 'relative',
      'width': '100%'
    }
  }), (0, _utils.genClassObjects)('.flex-overflow:before', {
    styleObjectMap: {
      'content': '" "',
      'display': 'inline-bloc',
      'width': '100%',
      'height': '1px'
    }
  }), (0, _utils.genClassObjects)('.flex-overflow .text-truncate-', {
    styleObjectMap: {
      'position': 'absolute',
      'width': '100%',
      'left': '0'
    }
  }));
}

var _default = genFuncFlex;
exports.default = _default;