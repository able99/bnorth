"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = classes;
exports.mutex = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/web.dom.iterable");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

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

  var addItem = function addItem(item) {
    var type = Array.isArray(item) ? 'array' : (0, _typeof2.default)(item);

    if (type === 'string' || type === 'number') {
      String(item).split(/\s/).forEach(function (v) {
        return ret.push(v);
      });
    } else if (type === 'array' && item.length) {
      ret.push(item.forEach(function (v) {
        return addItem(v);
      }));
    } else if (type === 'object') {
      Object.entries(item).filter(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return v;
      }).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return String(k).split(/\s/).forEach(function (vv) {
          return ret.push(vv);
        });
      });
      /* eslint-disable no-loop-func */
    }
  };

  var merge = function merge(items) {
    items.reverse().forEach(function (v, i, a) {
      if (!v) return;
      var index = v.lastIndexOf('-');
      var key = v.substr(0, index > 0 ? index : v.length);

      for (var ii = i + 1; ii < a.length; ii++) {
        if (!a[ii]) continue;

        if (a[ii].startsWith(key)) {
          a[ii] = null;
          continue;
        }

        ;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = mutex[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var vvv = _step.value;

            if (vvv.includes(key) && (a[ii].startsWith(vvv[0]) || a[ii].startsWith(vvv[1]))) {
              a[ii] = null;
              continue;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        ;
      }
    });
    return items.filter(function (v) {
      return v;
    }).reverse();
  };

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var _i = 0; _i < args.length; _i++) {
    var arg = args[_i];
    addItem(arg);
  }

  return merge(ret).join(' ');
}

var mutex = [['bg-none', 'bg-color'], ['border-set-a', 'border-none-a'], ['border-set-left', 'border-none-left'], ['border-set-right', 'border-none-right'], ['border-set-top', 'border-none-top'], ['border-set-bottom', 'border-none-bottom']];
exports.mutex = mutex;