"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

/**
 * 为app 提供存储的能力扩展
 * **插件** 该类为插件类扩展了App 的能力
 * app.Storage: 该类的原型
 * app.storage: 该类的实例，针对localStorage
 * app.sessionStorage: 该类的实例，针对sessionStorage
 * @class
 */
var Storage = function () {
  function Storage(app, isSession) {
    (0, _classCallCheck3.default)(this, Storage);

    this.storage = isSession ? window.sessionStorage : window.localStorage;
  }

  /**
   * 保存对象
   * @method
   * @param {string} item - 名称
   * @param {object|array} data - 数据
   */


  (0, _createClass3.default)(Storage, [{
    key: "setObj",
    value: function setObj(item, data) {
      this.storage.setItem(item, JSON.stringify(data));
    }

    /**
     * 获取保存的对象
     * @method
     * @param {string} item - 名称
     * @param {boolean} [removeFalse] - 是否去除无效数据
     */

  }, {
    key: "getObj",
    value: function getObj(item, removeFalse) {
      var val = this.storage.getItem(item);
      try {
        var obj = JSON.parse(this.storage.getItem(item));
        if (!removeFalse) return obj;
        for (var key in obj) {
          if (!obj[key]) delete obj[key];
        }
        return obj;
      } catch (e) {
        return val;
      }
    }

    /**
     * 保存字符串
     * @method
     * @param {string} item - 名称
     * @param {*} data - 数据，非字符串数据，将自动进行toString 操作
     */

  }, {
    key: "set",
    value: function set(item, data) {
      this.storage.setItem(item, data);
    }

    /**
     * 获取保存的字符串
     * @method
     * @param {string} item - 名称
     */

  }, {
    key: "get",
    value: function get(item) {
      var val = this.storage.getItem(item);
      return val;
    }

    /**
     * 清除指定保存的数据
     * @method
     * @param {string} item - 名称
     */

  }, {
    key: "remove",
    value: function remove(item) {
      this.storage.removeItem(item);
    }

    /**
     * 清除全部数据
     * @method
     * @param {string} reg - 设置后，清除符合正则表达式名臣的全部数据
     */

  }, {
    key: "clear",
    value: function clear(reg) {
      if (reg) {
        for (var item in this.storage) {
          if (new RegExp(reg).test(item)) {
            this.removeItem(item);
          }
        }
      } else {
        this.storage.clear();
      }
    }
  }]);
  return Storage;
}();

exports.default = {
  init: function init(app) {
    app.Storage = Storage;
    app.storage = new Storage(app);
    app.sessionStorage = new Storage(app, true);
  }
};
module.exports = exports["default"];