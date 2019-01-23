"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFunctions = addFunctions;
exports.default = parseProps;

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
 * 为样式函数集合增加样式函数
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
 * @global
 * @name BaseComponent
 */

/**
 * 设置样式类
 * 
 * - 当属性值为 true 时，将当前属性名，去掉 bc- 前缀，追加到组件的样式类属性中
 * - 当属性值为数字或字符串时，将去掉 bc- 前缀的属性名和属性值用 - 连接后，追加到组件的样式类属性中
 * - 当属性值不为真时，没有任何作用
 * 
 * @attribute BaseComponent.bc-xxx
 * @type {boolean|string|number} 
 * @example
 * ```jsx
 * <Panel bc-text-size="lg" bc-text-weight-={true} className="text-color-primary" /> // className: 'text-color-primary text-size-lg text-weight-'
 * ```
 */

/**
 * 设置组件的样式对象，将属性名去掉 bs- 前缀，和属性值，追加到组件的样式对象中
 * 
 * @attribute BaseComponent.bs-xxx
 * @type {number|string} 
 * @example
 * ```jsx
 * <Panel bs-width="50%" style={{height: '50%'}} /> // style: { widht: 50%, height: 50% }
 * ```
 */

/**
 * 执行样式函数，并将结果设置到组件的样式对象。将属性名去掉 bs- 前缀作为函数名称，从样式函数集合中获取函数，将属性值(为数组时，作为展开参数)作为参数，执行并将结果追加到组件的样式对象中
 * 
 * @attribute BaseComponent.bf-xxx
 * @type {number|string|array} 
   * @example
   * ```jsx
   * import { backgroundImage } from '@bnorth/rich.css/lib/styles/background';
   * import { addFunctions } from '@bnorth/components/lib/utils/props';
   * addFunctions({ backgroundImage });
   * 
   * export default props=>{
   *   return <Panel bf-background={'bg.jpg'} /> // style: {backgroundImage: url(bg.jpg)}
   * }
   * ```
 */

/**
 * 其他 react 标准属性，比如：
 * 
 * - className：样式类 
 * - style：样式对象，注意 react 使用样式对象，而不是样式字符串
 * - children：子元素
 * - onXXX：事件
 * - xxx：其他 react 属性和 dom 属性
 * @attribute BaseComponent.xxx
 */

/**
 * 设置映射组件
 * 
 * bnorth 组件，一般情况下都只是设置组件的样式和属性，或者设置默认的映射组件，而功能是由映射组件去完成。可以通过修改该属性，修改默认的映射组件。
 * 比如 Button 组件的默认映射组件为 button，可以修改为 a 元素
 * @attribute BaseComponent.component
 * @type {element|component}
 */

/**
 * 设置映射组件的映射组件，
 * 当映射组件设置的映射组件为 bnorth 组件，而不是元素时，还可以通过该属性，设置映射组件的映射组件，方便二次包装组件
 * @attribute BaseComponent.componentPanel
 * @type {element|component}
 */

/**
 * 其他映射组件可以设置的属性
 * @attribute BaseComponent.xxx
 */

/**
 * 设置组件通用的默认属性，当设置为回调函数时，参数是组件当前属性，返回值是属性，可覆盖当前属性
 * @member BaseComponent.props
 * @type {function|object}
 * @static
 */