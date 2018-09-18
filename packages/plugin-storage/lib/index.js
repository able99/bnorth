"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

/**
 * 存储能力
 * @class
 */
var Storage =
/*#__PURE__*/
function () {
  function Storage(app, _id, options, isSession) {
    (0, _classCallCheck2.default)(this, Storage);
    this.app = app;
    this._id = _id;
    this.options = options;
    this.storage = isSession ? window.sessionStorage : window.localStorage;
  }
  /**
   * 保存对象
   * @method
   * @param {string} item - 名称
   * @param {object|array} data - 数据
   */


  (0, _createClass2.default)(Storage, [{
    key: "setObj",
    value: function setObj(item, data) {
      this.storage.setItem(item, JSON.stringify(data));
    }
    /**
     * 获取保存的对象
     * @method
     * @param {string} item - 名称
     */

  }, {
    key: "getObj",
    value: function getObj(item) {
      var val = this.storage.getItem(item);

      try {
        return JSON.parse(this.storage.getItem(item));
      } catch (e) {
        return;
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
  }, {
    key: "getObjPath",
    value: function getObjPath(item, path) {
      return this.app.utils.pathGet(this.getObj(item), path);
    }
  }, {
    key: "setObjPath",
    value: function setObjPath(item, path, val) {
      var data = this.app.utils.pathGet(this.getObj(item), path);
      if (!data) return;
      if (!this.app.utils.pathSet(this.app.utils.pathSet(data, path, val))) return;
      this.setObj(item, data);
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
          if (new RegExp(reg).test(item)) this.removeItem(item);
        }
      } else {
        this.storage.clear();
      }
    }
  }]);
  return Storage;
}();

var _default = {
  _id: 'storage',
  onPluginMount: function onPluginMount(app, plugin, options) {
    app.Storage = Storage;
    app.storage = new app.Storage(app, plugin._id, options);
    app.storageSession = new app.Storage(app, plugin._id, options, true);
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.Storage;
    delete app.storage;
    delete app.storageSession;
  }
};
exports.default = _default;