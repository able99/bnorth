"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.object.assign");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * @module
 */

/**
 * App 工具模块，提供一些工具函数
 * @exportdefault
 */
var Utils =
/*#__PURE__*/
function () {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  function Utils(app) {
    (0, _classCallCheck2.default)(this, Utils);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */

    this._id = app._id + '.utils';
  }
  /**
   * 合并由对象或者函数组成的参数集合
   * @param  {...(object|function)} - 参数集合 
   * @returns {object} 组合后的参数对象
   */


  (0, _createClass2.default)(Utils, [{
    key: "getOptions",
    value: function getOptions() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return Object.assign.apply(Object, [{}].concat((0, _toConsumableArray2.default)(args.filter(function (v) {
        return v;
      }).map(function (v) {
        return typeof v === 'function' ? v() : v;
      }))));
    }
  }, {
    key: "_checkPath",
    value: function _checkPath(path) {
      if (path[0] !== '.' && path[0] !== '[') path = '.' + path;
      return path;
    }
    /**
     * 以 json path 的方式对对象进行赋值
     * @param {!object} - 需要赋值的对象
     * @param {!string} -  json path 
     * @param {*} - 需要设置的值
     * @returns {object} 赋值后的对象
     * @example
     * ```js
     * let obj = {a: {b:1}}
     * app.utils.pathSet(obj, '.a.b', 2); // {a: {b:2}}
     * ```
     */

  }, {
    key: "pathSet",
    value: function pathSet(data, path, val) {
      path = this._checkPath(path);
      if (!path) return false;
      /* eslint-disable no-eval*/

      try {
        eval("data".concat(path, "=val"));
      } catch (e) {
        return false;
      }

      return true;
    }
    /**
     * 以 json path 的方式读取对象中指定的数据
     * @param {!object} - 需要读取的对象
     * @param {!string} -  json path 
     * @returns {*} 读取的值
     */

  }, {
    key: "pathGet",
    value: function pathGet(data, path) {
      path = this._checkPath(path);
      if (!path) return false;
      /* eslint-disable no-eval*/

      try {
        return eval("data".concat(path));
      } catch (e) {
        return;
      }
    }
    /**
     * 将 error 实例，字符串，包含 message 字段的对象，安全转换为错误信息字符串
     * @param {(Error|string|{message:string})} - 错误数据
     * @returns {stirng} 错误信息 
     */

  }, {
    key: "message2String",
    value: function message2String(message) {
      if (message instanceof Error) {
        return message.message;
      } else if ((0, _typeof2.default)(message) === 'object') {
        return message.message || '';
      } else if (typeof message === 'string') {
        return message;
      } else {
        return String(message);
      }
    } // object op
    // --------------------------

    /**
     * 对象复制或者深度复制
     * @param {array|object} - 要复制的对象 
     * @param {boolean} - 是否深度复制，暂未实现
     * @returns {array|object} 复制后的新对象 
     */

  }, {
    key: "objectCopy",
    value: function objectCopy(obj, deep) {
      // :TODO depp copy
      if (!obj) return obj;
      return Array.isArray(obj) ? (0, _toConsumableArray2.default)(obj) : (0, _typeof2.default)(obj) === 'object' ? (0, _objectSpread2.default)({}, obj) : obj;
    }
    /**
     * 用指定的追加方式进行数据连接
     * @param {*} - 原数据
     * @param {*} - 新数据 
     * @param {*} - 追加方式，包括：
     * 
     * 1. 原对象是数组，
     *     - append 为真，返回 追加新数据的新数组，
     *     - append 不为真，返回新数据组成的新数组
     * 1. 原对象是对象，
     *     - append 是字符串，用 json get 方式读取原数据和新数据，然后用 append 参数为 true，递归调用一次数据连接后，用json set 方式设置到由原数据和新数据合并的数据上
     *     - append 为 true 或者没有设置，进行对象合并
     *     - append 为其他值时，返回新数据组成的新数据
     * 1. 其他类型
     *     - append 为真，原数据与新数据进行加号操作
     *     - append 不为真，返回新数据
     * @returns {*} 连接后的数据 
     */

  }, {
    key: "objectUpdate",
    value: function objectUpdate(obj, data, append) {
      if (Array.isArray(data)) {
        data = (0, _toConsumableArray2.default)(append && obj ? obj : []).concat((0, _toConsumableArray2.default)(data));
      } else if ((0, _typeof2.default)(data) === 'object') {
        if (typeof append === 'string') {
          var appendObj = this.app.utils.pathGet(obj, append);
          var appendData = this.app.utils.pathGet(data, append);
          var appends = this.app.utils.objectUpdate(appendObj, appendData, true);
          data = (0, _objectSpread2.default)({}, obj, data);
          this.app.utils.pathSet(data, append, appends);
        } else if (append === true || append === undefined) {
          data = (0, _objectSpread2.default)({}, obj, data);
        } else {
          data = (0, _objectSpread2.default)({}, data);
        }
      } else {
        data = append ? obj + data : data;
      }

      return data;
    }
    /**
     * 删除对象中的指定数据，如果为数组，按序号删除，如果为对象，按 key 删除
     * @param {(object|array)} - 待处理的对象 
     * @param {(string|number)} - key 值或者序号
     * @returns {(object|array)} 处理后的对象
     */

  }, {
    key: "objectDelete",
    value: function objectDelete(obj, _id) {
      if (!obj) return;

      if (Array.isArray(obj)) {
        obj.splice(_id, 1);
        obj = (0, _toConsumableArray2.default)(obj);
      } else {
        delete obj[_id];
        obj = (0, _objectSpread2.default)({}, obj);
      }

      return obj;
    } // compare
    // --------------------------

    /**
     * 对两个对象进行浅层比较
     * @param {object} - 对象1 
     * @param {object} - 对象2
     * @param {string[]} - 需要递归一次浅层比较的属性 
     * @returns {boolean} 是否相等
     */

  }, {
    key: "shallowEqual",
    value: function shallowEqual(objA, objB) {
      var checkEqualProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (objA === objB) return true;
      if ((0, _typeof2.default)(objA) !== 'object' || objA === null || (0, _typeof2.default)(objB) !== 'object' || objB === null) return false;
      var keysA = Object.keys(objA);
      var keysB = Object.keys(objB);
      if (keysA.length !== keysB.length) return false;

      for (var _i = 0; _i < keysA.length; _i++) {
        var key = keysA[_i];

        if (!objB.hasOwnProperty(key) || (checkEqualProps.includes(key) ? !this.shallowEqual(objA[key], objB[key]) : objA[key] !== objB[key])) {
          // console.log("shallowEqual: ",key);
          return false;
        }
      }

      return true;
    } // string
    // -------------------------

    /**
     * 将字符串首字母大写
     * @param {!string} - 要转换的字符串
     * @returns {string} 转换后的字符串 
     * @example
     * ```js
     * app.utils.captilaze('abc'); // 'Abc' 
     * ```
     */

  }, {
    key: "captilaze",
    value: function captilaze(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }]);
  return Utils;
}();

var _default = Utils;
exports.default = _default;