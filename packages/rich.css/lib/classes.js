"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.regexp.split");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.array.find");

/**
 * @module
 */

/**
 * 将多种形式的 css class name 进行按循序组合，同类型的 class name 后面会覆盖前面的。
 * 
 * 同类型指的是 class name 名称相同，参数不同。
 * @exportdefault
 * @param  {...*} - class name 集合，可以为如下形式： 
 * 1. boolean|function：设置覆盖函数或者关闭覆盖，默认为开启状态
 * 1. string：class name 字符串，多个用空格分隔
 * 1. number：class name 数值型
 * 1. object：class name 对象，key 为 name，val 为 boolean 型，决定是否有效
 * 1. array：class name 数组，数组元素可以为以上任意类型
 * @returns {string} 组合后的 class names
 * @example
 * ```jsx
 * import classes from '@bnorth/rich.css/lib/classes';
 * 
 * export default props=>{
 *   return <div className={classes('text-size-lg', {'text-color-primary': props.isMain})} />
 * }
 * ```
 */
function classes() {
  var ret = [];

  var merge = function merge(arr) {
    return arr.filter(function (v, i, a) {
      var key = v.substr(0, v.lastIndexOf('-'));
      return !a.slice(i + 1).find(function (vv) {
        return vv.startsWith(key);
      });
    });
  };

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var _i = 0; _i < args.length; _i++) {
    var arg = args[_i];
    var type = (0, _typeof2.default)(arg);

    if (type === 'boolean') {
      merge = arg;
    } else if (type === 'function') {
      merge = arg;
    } else if (type === 'string') {
      merge ? ret = ret.concat(arg.trim().split(/\s+/)) : ret.push(arg);
    } else if (type === 'number') {
      ret.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      ret.push(classes.apply(void 0, (0, _toConsumableArray2.default)(arg)));
    } else if (type === 'object') {
      /* eslint-disable no-loop-func */
      Object.entries(arg).filter(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return v;
      }).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return ret.push(k);
      });
    }
  }

  if (merge) ret = merge(ret);
  return ret.join(' ');
}

var _default = classes;
exports.default = _default;