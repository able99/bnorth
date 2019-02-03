"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.find");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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
    this._idNum = 0;
    this._plugins = [];
  }

  (0, _createClass2.default)(Plugins, [{
    key: "_checkPlugin",
    value: function _checkPlugin(plugin) {
      var _this = this;

      this.app.log.debug('plugin check');
      if (!plugin) return;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (plugin instanceof Function) plugin = plugin.apply(void 0, [this.app].concat(args));
      plugin._id = '>' + (plugin._id ? plugin._id : 'anonymous' + ++this._idNum);
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
            return v._id.slice(1) === dependence;
          })) {
            _this.app.render.critical("no dependence plugin: ".concat(plugin._id, " - ").concat(dependence), {
              title: 'plugin nodeps'
            });

            return {
              v: void 0
            };
          }
        };

        for (var _iterator = (Array.isArray(plugin._dependencies) ? plugin._dependencies : [plugin._dependencies])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

      return plugin;
    }
    /**
     * 通过插件 id 获取插件
     * @param {string} - 插件 id，默认为 App 插件
     * @returns {module:plugins~PluginInstance} 插件实例
     */

  }, {
    key: "getPluginById",
    value: function getPluginById(_id) {
      var _this2 = this;

      return this._plugins.find(function (v) {
        return v._id === '>' + (_id || _this2.app._id);
      });
    }
    /**
     * 通过插件运行 id 获取插件
     * @param {string} - 插件运行 id
     * @returns {module:plugins~PluginInstance} 插件实例
     */

  }, {
    key: "getPluginByInstanceId",
    value: function getPluginByInstanceId(_id) {
      return this._plugins.find(function (v) {
        return v._id === _id;
      });
    }
    /**
     * 安装插件
     * @param {module:plugins~PluginDefine|module:plugins~PluginDefineFunction} - 插件声明对象 
     * @param  {...*} - 插件的参数 
     */

  }, {
    key: "add",
    value: function add(plugin) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      plugin = this._checkPlugin.apply(this, [plugin].concat(args));
      if (!plugin) return;
      var app = this.app;
      var _id = plugin._id;
      app.log.debug('plugin add', plugin._id);

      this._plugins.push(plugin);

      Object.entries(plugin).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        if (k === 'onPluginAdd' || k === 'onPluginRemove') {
          app.event.on(app._id, k, v, _id);
        } else if (k.startsWith('onPlugin')) {
          app.event.on(_id, k, v, _id);
        } else if (k.startsWith('on')) {
          app.event.on(app._id, k, v, _id);
        } else if (k.startsWith('state')) {
          plugin[k] = app.State.createState(app, v, k, _id);

          if (!plugin[k]) {
            app.render.panic(v, {
              title: 'no state'
            });
            return;
          }

          if (typeof v === 'string') return;
          var _idState = plugin[k]._id;
          app.event.on(_id, 'onPluginMount', function (app) {
            app.event.emit(_idState, 'onStateStart', _idState, false);
          }, _idState);
          app.event.on(_id, 'onPluginUnmount', function (app) {
            app.event.emit(_idState, 'onStateStop', _idState);
          }, _idState);
        } else {
          plugin[k] = v;
        }
      });
      app.event.emit(_id, 'onPluginMount', app, plugin);
      app.event.emit(app._id, 'onPluginAdd', plugin);
    }
    /**
     * 移除插件
     * @param {string} - 插件实例 id
     */

  }, {
    key: "remove",
    value: function remove(_id) {
      this.app.log.debug('plugin remove', _id);

      var index = this._plugins.findIndex(function (v) {
        return v._id === _id;
      });

      if (index < 0) return;
      var plugin = this._plugins[index];
      this.app.event.emit(plugin._id._id, 'onPluginUnmount', this.app, plugin);
      this.app.event.off(_id);

      this._plugins.splice(index, 1);

      this.app.event.emit(this.app._id, 'onPluginRemove', _id);
    }
  }]);
  return Plugins;
}();

var _default = Plugins;
exports.default = _default;