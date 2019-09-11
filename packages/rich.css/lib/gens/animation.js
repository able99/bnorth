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
 * 动画
 * @module
 */

/**
 * 样式生成函数：动画
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncAnimation(_ref) {
  var transitionProperty = _ref.transitionProperty,
      transitionTime = _ref.transitionTime,
      animationTime = _ref.animationTime,
      animationTimingFunction = _ref.animationTimingFunction,
      animationCount = _ref.animationCount,
      animationDirection = _ref.animationDirection,
      animationPlayState = _ref.animationPlayState;
  return (0, _assign.default)(
  /**
   * 设置渐变动画影响的属性
   * @classname transition-property
   * @param {module:config~GenConfig#transitionProperty} property - 属性
   */
  (0, _utils.genClassObjects)('.transition-property', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(transitionProperty),
    styleObjectCompatible: _compatibleAnimation.default
  }),
  /**
   * 设置渐变动画的过度时间
   * @classname transition-duration
   * @param {module:config~GenConfig#transitionTime} time - 过度时间
   */
  (0, _utils.genClassObjects)('.transition-duration', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(transitionTime),
    styleObjectCompatible: _compatibleAnimation.default
  }),
  /**
   * 设置渐变动画的延迟开始的时间
   * @classname transition-delay
   * @param {module:config~GenConfig#transitionTime} time - 延迟时间
   */
  (0, _utils.genClassObjects)('.transition-delay', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(transitionTime),
    styleObjectCompatible: _compatibleAnimation.default
  }),
  /**
   * 设置渐变动画的过度函数
   * @classname transition-timing-function
   * @param {module:config~GenConfig#animationTimingFunction} func - 过度函数
   */
  (0, _utils.genClassObjects)('.transition-timing-function', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationTimingFunction),
    styleObjectCompatible: _compatibleAnimation.default
  }),
  /**
   * 设置帧动画的重复次数
   * @classname animation-iteration-count
   * @param {module:config~GenConfig#animationCount} times - 重复次数
   */
  (0, _utils.genClassObjects)('.animation-iteration-count', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationCount),
    styleObjectCompatible: _compatibleAnimation.default
  }),
  /**
   * 设置帧动画的重复执行时的执行方向
   * @classname animation-direction
   * @param {module:config~GenConfig#animationDirection} direction - 执行方向
   */
  (0, _utils.genClassObjects)('.animation-direction', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationDirection),
    styleObjectCompatible: _compatibleAnimation.default
  }),
  /**
   * 设置帧动画的播放状态
   * @classname animation-play-state
   * @param {module:config~GenConfig#animationPlayState} state - 播放状态
   */
  (0, _utils.genClassObjects)('.animation-play-state', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationPlayState),
    styleObjectCompatible: _compatibleAnimation.default
  }),
  /**
   * 设置帧动画的动画时间
   * @classname animation-duration
   * @param {module:config~GenConfig#animationTime} time - 动画时间
   */
  (0, _utils.genClassObjects)('.animation-duration', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationTime),
    styleObjectCompatible: _compatibleAnimation.default
  }),
  /**
   * 设置帧动画的延迟开始的时间
   * @classname animation-delay
   * @param {module:config~GenConfig#animationTime} time - 延迟时间
   */
  (0, _utils.genClassObjects)('.animation-delay', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(animationTime),
    styleObjectCompatible: _compatibleAnimation.default
  }));
}

var _default = genFuncAnimation;
exports.default = _default;