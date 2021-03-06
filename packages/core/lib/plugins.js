"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

require("core-js/modules/es6.array.find-index");

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

require("core-js/modules/es6.array.find");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

/**
 * @module
 */

/**
 * 插件的声明函数
 * @typedef PluginDefineFunction
 * @type {function}
 * @param {module:app.App} app - App 实例
 * @param {...*} args - 插件的参数 
 * @returns {module:plugins~PluginDefine} 插件的声明对象
 */

/**
 * 插件的声明对象
 * @typedef PluginDefine
 * @type {object}
 * @property {string?} _id - 插件名称
 * @property {(string|string[])?} _dependencies - 依赖的插件列表
 * @property {function?} onXXX - app 或者 当前插件的事件处理函数
 * @property {module:state~StateDefine?} stateXXX - 声明的数据单元
 * @property {*?} xxx - 声明的属性或者方法
 */

/**
 * 插件的实例对象
 * @typedef PluginInstance
 * @type {object}
 * @property {string} _id - 插件实例的 id，声明的 id 或者安装时生成的唯一运行 id
 * @property {module:state.State} stateXXX - 插件的数据单元实例
 * @property {*} xxx - 插件的属性或者方法
 */

/**
 * 新的插件已经被添加
 * @event module:app.App#onPluginAdd
 * @property {module:plugins~PluginInstance} plugin - 插件的实例
 */

/**
 * 插件已经被移除
 * @event module:app.App#onPluginRemove
 * @property {string} _id - 插件的 id
 */

/**
 * 插件即将安装
 * @event module:plugins~PluginInstance#onPluginMount
 * @property {module:app.App} app - App 实例
 * @property {module:plugins~PluginInstance} plugin - 插件的实例
 */

/**
 * 插件移除完成
 * @event module:plugins~PluginInstance#onPluginUnmount
 * @property {module:app.App} app - App 实例
 * @property {module:plugins~PluginInstance} plugin - 插件的实例
 */

/**
 * App 插件管理模块，提供 App 通过插件的扩展的能力
 * @see {@link https://able99.github.io/cbnorth/plugin.html} bnorth 插件机制
 * @exportdefault
 */
var Plugins =
/*#__PURE__*/
function () {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  function Plugins(app) {
    (0, _classCallCheck2.default)(this, Plugins);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */

    this._id = app._id + '.plugins';
    this._plugins = [];
  }
  /**
   * 通过插件 id 获取插件
   * @param {string} - 插件 id，默认为 App 插件
   * @returns {module:plugins~PluginInstance} 插件实例
   */


  (0, _createClass2.default)(Plugins, [{
    key: "getPlugin",
    value: function getPlugin() {
      var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.app._id;

      return this._plugins.find(function (v) {
        return v._id === _id;
      });
    }
  }, {
    key: "getPlugins",
    value: function getPlugins() {
      return this._plugins;
    }
    /**
     * 安装插件
     * @param {module:plugins~PluginDefine|module:plugins~PluginDefineFunction} - 插件声明对象 
     * @param  {...*} - 插件的参数 
     */

  }, {
    key: "add",
    value: function add(plugin) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!plugin) return;
      var instance = {};
      if (plugin instanceof Function) plugin = plugin(this.app, instance, options);

      if (!plugin._id) {
        this.app.render.critical('no id plugin');
        return;
      }

      if (!plugin._dependencies) plugin._dependencies = [];

      if (this._plugins.find(function (v) {
        return v._id === plugin._id;
      })) {
        this.app.render.critical(plugin._id, {
          title: 'plugin dup'
        });
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var dependence = _step.value;

          if (!_this._plugins.find(function (v) {
            return v._id === dependence;
          })) {
            _this.app.render.critical("no dependence plugin: ".concat(plugin._id, " - ").concat(dependence), {
              title: 'plugin nodeps'
            });

            return {
              v: void 0
            };
          }
        };

        for (var _iterator = (0, _getIterator2.default)((0, _isArray.default)(plugin._dependencies) ? plugin._dependencies : [plugin._dependencies]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if ((0, _typeof2.default)(_ret) === "object") return _ret.v;
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

      var app = this.app;
      instance._id = plugin._id;
      instance.options = options;

      this._plugins.push(instance);

      instance._states = (0, _entries.default)(plugin).filter(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return k.startsWith('state') || k.startsWith('_state');
      });
      app.State.attachStates(instance, instance._states);
      (0, _entries.default)(plugin).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        if (k.startsWith('on')) {
          var $ = k.indexOf('$');
          var eid = $ > 0 ? k.slice($ + 1) : null;
          k = $ > 0 ? k.slice(0, $) : k;
          app.event.on(eid, k, app.event.createHandler(k, v, instance).bind(instance), instance._id);
        } else if (k.startsWith('_on')) {
          instance[k] = app.event.createHandler(k, v, instance).bind(instance);
        } else if (k.startsWith('action')) {
          instance[k] = app.event.createAction(k.slice(6), v, instance).bind(instance);
        } else {
          !k.startsWith('state') && !k.startsWith('_state') && (instance[k] = v);
        }
      });
      app.event.emit(null, 'onPluginStart', instance._id);
      instance._onStart && instance._onStart(app, instance, options);
    }
    /**
     * 移除插件
     * @param {string} - 插件实例 id
     */

  }, {
    key: "remove",
    value: function remove(_id) {
      this.app.event.emit(null, 'onPluginStart', _id);

      var index = this._plugins.findIndex(function (v) {
        return v._id === _id;
      });

      if (index < 0) return;
      var plugin = this._plugins[index];
      plugin._onStop && plugin._onStop(this.app, plugin, plugin.options);
      this.app.event.off(_id);

      this._plugins.splice(index, 1);
    }
  }]);
  return Plugins;
}();

var _default = Plugins;
exports.default = _default;