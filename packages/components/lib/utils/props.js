"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFunctions = addFunctions;
exports.default = parseProps;
exports.BaseComponent = BaseComponent;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("core-js/modules/es6.object.assign");

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

/**
 * @module
 */
var functions = {};
/**
 * 增加基类组件 bf-style-function 属性的函数集合
 * @param {object} - 函数集合的名称和函数的键值对 
 * @returns {object} 函数集合
 */

function addFunctions(args) {
  return Object.assign(functions, args);
}

function parseProps(aprops, aaprops) {
  var _aprops = (0, _objectSpread2.default)({}, typeof aaprops === 'function' ? aaprops(aprops) : aaprops, aprops),
      active = _aprops.active,
      selected = _aprops.selected,
      disabled = _aprops.disabled,
      className = _aprops.className,
      style = _aprops.style,
      refWrap = _aprops.refWrap,
      props = (0, _objectWithoutProperties2.default)(_aprops, ["active", "selected", "disabled", "className", "style", "refWrap"]);

  var classSet = {};
  var styleSet = {};
  Object.entries(props).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    if (k.startsWith('bs-')) {
      delete props[k];
      if (!v) return;
      var name = k.slice(3);
      styleSet[name] = v;
    } else if (k.startsWith('bc-')) {
      delete props[k];
      if (!v) return;

      var _name = k.slice(3);

      classSet[_name + (v === true ? '' : '-' + v)] = true;
    } else if (k.startsWith('bf-')) {
      delete props[k];
      if (!v) return;

      var _name2 = k.slice(3);

      _name2 = functions[_name2];
      if (!_name2) return;
      Object.assign(styleSet, Array.isArray(v) ? _name2.apply(void 0, (0, _toConsumableArray2.default)(v)) : _name2(v));
    }
  });
  if (active) classSet['active'] = true;
  if (selected) classSet['selected'] = true;
  if (disabled) classSet['disabled'] = true;
  return (0, _objectSpread2.default)({}, props, {
    className: (0, _classes.default)(classSet, className),
    style: (0, _objectSpread2.default)({}, styleSet, style),
    selected: selected,
    active: active,
    disabled: disabled,
    ref: refWrap
  });
}
/**
 * 虚拟组件基类，不可被直接使用，为组件提供通用的属性
 * 默认属性
 * @component
 * @static
 * @name BaseComponent
 */


function BaseComponent() {}

BaseComponent.defaultProps = {
  /**
   * 设置 class name
   * 
   * - 当属性值为 true 时，将当前属性名，去掉 bc- 前缀，追加到 className 组件属性中
   * - 当属性值为数字或字符串时，将去掉 bc- 前缀的属性名和属性值用 - 连接，追加到 className 组件属性中
   * - 当属性值不为真时，没有任何作用
   * @type {boolean|string|number} 
   * @example
   * ```jsx
   * <Panel bc-text-size="lg" />
   * ```
   */
  'bc-[classname]': '',

  /**
   * 设置 style，将属性名去掉 bs- 前缀，和属性值，追加到组件的 style 属性对象中
   * @type {*} 
   * @example
   * ```jsx
   * <Panel bs-width="50%" />
   * ```
   */
  'bs-[style]': '',

  /**
   * 设置 style 函数，将属性名去掉 bs- 前缀作为名称，从 bf-style-function 属性的函数集合中获取函数，将属性值(为数组时，作为展开参数)作为参数，执行并将结果追加到组件的 style 属性对象中
   * @type {string|array} 
   * @example
   * ```jsx
   * import { backgroundImage } from '@bnorth/rich.css/lib/styles/background';
   * import { addFunctions } from '@bnorth/components/lib/utils/props';
   * addFunctions({ backgroundImage });
   * 
   * export default props=>{
   *   return <Panel bf-background={[]} />
   * }
   * ```
   */
  'bf-[style-function]': ''
};