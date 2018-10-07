"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = classes;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.regexp.split");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.array.find");

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