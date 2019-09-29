"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

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

      return _assign.default.apply(Object, [{}].concat((0, _toConsumableArray2.default)(args.filter(function (v) {
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
      if (!message) return '';

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
      return (0, _isArray.default)(obj) ? (0, _toConsumableArray2.default)(obj) : (0, _typeof2.default)(obj) === 'object' ? _objectSpread({}, obj) : obj;
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
      if ((0, _isArray.default)(data)) {
        data = [].concat((0, _toConsumableArray2.default)(append && obj ? obj : []), (0, _toConsumableArray2.default)(data));
      } else if ((0, _typeof2.default)(data) === 'object') {
        if (typeof append === 'string') {
          var appendObj = this.app.utils.pathGet(obj, append);
          var appendData = this.app.utils.pathGet(data, append);
          var appends = this.app.utils.objectUpdate(appendObj, appendData, true);
          data = _objectSpread({}, obj, {}, data);
          this.app.utils.pathSet(data, append, appends);
        } else if (append === true || append === undefined) {
          data = _objectSpread({}, obj, {}, data);
        } else {
          data = _objectSpread({}, data);
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

      if ((0, _isArray.default)(obj)) {
        obj.splice(_id, 1);
        obj = (0, _toConsumableArray2.default)(obj);
      } else {
        delete obj[_id];
        obj = _objectSpread({}, obj);
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
      if (objA === objB) return true;
      if ((0, _typeof2.default)(objA) !== 'object' || objA === null || (0, _typeof2.default)(objB) !== 'object' || objB === null) return false;
      var keysA = (0, _keys.default)(objA);
      var keysB = (0, _keys.default)(objB);
      if (keysA.length !== keysB.length) return false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)(keysA), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;
          if (objA[key] !== objB[key]) return false;
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

      return true;
    }
  }, {
    key: "diff",
    value: function diff(objA, objB) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          recursion = _ref.recursion,
          include = _ref.include,
          exclude = _ref.exclude;

      if (objA === objB) return;
      if ((0, _typeof2.default)(objA) !== 'object' || objA === null || (0, _typeof2.default)(objB) !== 'object' || objB === null) return 'null';
      var keysA = (0, _keys.default)(objA);
      var keysB = (0, _keys.default)(objB);
      if (keysA.length !== keysB.length) return 'length';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator2.default)(keysA), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;
          if (include && !include.includes(key)) continue;
          if (exclude && exclude.includes(key)) continue;
          if (!objB.hasOwnProperty(key)) return key;

          if (recursion && recursion.includes(key)) {
            if (this.diff(objA[key], objB[key])) return key;
          } else {
            if (objA[key] !== objB[key]) return key;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } // blob

    /**
     * base64 data to blob
     * @param {!string} - base64 资源字符串
     * @returns {blob} 
     */

  }, {
    key: "dataURLtoBlob",
    value: function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(',');
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1].replace(/\s/g, ''));
      var n = bstr.length;
      var u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new Blob([u8arr], {
        type: mime
      });
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
  }, {
    key: "addMacroTask",
    value: function addMacroTask(func) {
      window.requestAnimationFrame(func);
    }
  }, {
    key: "addMicroTask",
    value: function addMicroTask(func) {
      _promise.default.resolve().then(func);
    }
  }]);
  return Utils;
}();

var _default = Utils;
exports.default = _default;