"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transiton = transiton;
exports.animation = animation;
exports.transform = transform;
exports.transforms = transforms;

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _compatibleAnimation = _interopRequireDefault(require("../compatibles/compatibleAnimation"));

/**
 * @module
 */

/**
 * 生成 transition 过度动画属性的 style inline 对象
 * @param {string} [duration='300ms'] - 动画持续时间
 * @param {object=} options - 动画参数对象
 * 
 * 1. property：规定应用过渡的 CSS 属性的名称，默认值为 `all`
 * 1. delay：规定过渡效果何时开始
 * 1. timeFunction： 规定过渡效果的时间曲线，参见 css transition-timing-function
 * 
 * @returns {object} style inline object
 */
function transiton() {
  var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '300ms';

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$property = _ref.property,
      property = _ref$property === void 0 ? 'all' : _ref$property,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? '0s' : _ref$delay,
      _ref$timeFunction = _ref.timeFunction,
      timeFunction = _ref$timeFunction === void 0 ? 'ease-in-out' : _ref$timeFunction;

  return (0, _compatibleAnimation.default)({
    'transition': "".concat(property, " ").concat(isNaN(duration) ? duration : "".concat(duration, "ms"), " ").concat(timeFunction, " ").concat(delay)
  }, true);
}
/**
 * 生成 animation 帧动画属性的 style inline 对象
 * @param {string} name - 规定 @keyframes 动画的名称
 * @param {string} [duration='1s'] - 规定动画完成一个周期所花费的秒或毫秒
 * @param {object=} options - 动画参数对象
 * 
 * 1. delay：规定过渡效果何时开始，默认值 `0s`
 * 1. count：规定动画被播放的次数，默认值 `infinite`
 * 1. direction：规定动画是否在下一周期逆向地播放
 * 1. playState：规定动画是否正在运行或暂停
 * 1. timeFunction： 规定过渡效果的时间曲线，参见 css transition-timing-function，默认值 `ease-in-out`
 * 
 * @returns {object} style inline object
 */


function animation(name) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1s';

  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$delay = _ref2.delay,
      delay = _ref2$delay === void 0 ? '0s' : _ref2$delay,
      _ref2$count = _ref2.count,
      count = _ref2$count === void 0 ? 'infinite' : _ref2$count,
      _ref2$timeFunction = _ref2.timeFunction,
      timeFunction = _ref2$timeFunction === void 0 ? 'ease-in-out' : _ref2$timeFunction,
      direction = _ref2.direction,
      playState = _ref2.playState;

  var ret = {
    'animation': "".concat(name, " ").concat(duration, " ").concat(timeFunction, " ").concat(delay, " ").concat(count)
  };
  if (direction) ret['animation-direction'] = direction;
  if (playState) ret['animation-play-state'] = playState;
  return (0, _compatibleAnimation.default)(ret, true);
}
/**
 * 生成 transform 应用 2D 或 3D 转换(包括旋转、缩放、移动或倾斜) 的 style inline 对象
 * 
 * 转换函数包括：
 * 
 * 1. none	定义不进行转换。
 * 1. matrix(n,n,n,n,n,n)	定义 2D 转换，使用六个值的矩阵
 * 1. matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)	定义 3D 转换，使用 16 个值的 4x4 矩阵。	
 * 1. translate(x,y)	定义 2D 转换
 * 1. translate3d(x,y,z)	定义 3D 转换。	
 * 1. translateX(x)	定义转换，只是用 X 轴的值
 * 1. translateY(y)	定义转换，只是用 Y 轴的值
 * 1. translateZ(z)	定义 3D 转换，只是用 Z 轴的值。	
 * 1. scale(x,y)	定义 2D 缩放转换
 * 1. scale3d(x,y,z)	定义 3D 缩放转换。	
 * 1. scaleX(x)	通过设置 X 轴的值来定义缩放转换
 * 1. scaleY(y)	通过设置 Y 轴的值来定义缩放转换
 * 1. scaleZ(z)	通过设置 Z 轴的值来定义 3D 缩放转换。	
 * 1. rotate(angle)	定义 2D 旋转，在参数中规定角度
 * 1. rotate3d(x,y,z,angle)	定义 3D 旋转。	
 * 1. rotateX(angle)	定义沿着 X 轴的 3D 旋转
 * 1. rotateY(angle)	定义沿着 Y 轴的 3D 旋转
 * 1. rotateZ(angle)	定义沿着 Z 轴的 3D 旋转
 * 1. skew(x-angle,y-angle)	定义沿着 X 和 Y 轴的 2D 倾斜转换
 * 1. skewX(angle)	定义沿着 X 轴的 2D 倾斜转换
 * 1. skewY(angle)	定义沿着 Y 轴的 2D 倾斜转换
 * 1. perspective(n)	为 3D 转换元素定义透视视图。
 * 
 * @param {string} name - 转换的名称
 * @param {...*} - 转换的参数
 * 
 * @returns {object} style inline object
 */


function transform(name) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  params = params.reduce(function (v1, v2, i) {
    return "".concat(v1).concat(i > 0 ? ',' : '').concat(v2);
  }, '');
  return (0, _compatibleAnimation.default)({
    transform: "".concat(name, "(").concat(params, ")")
  }, true);
}
/**
 * transform 的批量版本
 * @param {object} - 转换的名称
 * @returns {object} style inline object
 */


function transforms(param) {
  var ret = {};
  Object.entries(param).forEach(function (v) {
    return (0, _compatibleAnimation.default)({
      'transform': " ".concat(v[0], "(").concat(v[1], ")")
    });
  }, true);
  return ret;
}