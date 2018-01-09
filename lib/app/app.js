'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _appPlugin = require('./appPlugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var _instance = null;

/**
 * 应用程序的主入口类
 * 使用单例模式，保证只有一个应用实例，建立后通过start 函数启动应用
 * @class App
 * @example
 * ```js
 * let app = App.instance({});
 * app.start();
 * ```
 */
/**
 * @property {object} config app 配置类，参见[config](/#/?name=%2Fbase%2Fconfig)
 */

var App = function () {
  // constructor
  //--------------------
  /**
   * App 为单例模式，不要直接构造，使用instance 函数构造与获取
   * @constructor
   * @param {object} options - 参数
   * @example
   * ```js
   * options = {
   *   config       // 配置参数，参见config 模块
   *   startEvents  // 启动阶段各个回调函数名称数组，建议不要修改该参数，比如丢失了onRender 事件，将无法显示
   *   plugin       // 插件，参见插件
   *   domIdRoot    // html中react 根元素名称，默认 `root`
   *   domIdWaiting // html中等待react加载的元素名称，默认 `waiting`
   *   middlewares  // redux 中间件数组，默认为空
   *   status       // redux store 中的起始数据，默认为空
   * }
   * 
   * let app = App.instance(options);
   * ```
   */
  function App(options) {
    (0, _classCallCheck3.default)(this, App);

    if (!_instance) {
      this.options = options || {};
      this.config = Object.assign(_config2.default, this.options.config || null);
      this._startEvents = options.startEvents || ['onConfigBefore', 'onConfig', 'onImportStyles', 'onImportStylesAfter', 'onCreateStoreBefore', 'onCreateStore', 'onCreateStoreAfter', 'onImportRoutes', 'onImportRoutesAfter', 'onHook', 'onRender'];

      this.stateError = false;
      this._plugins = [];
      this.routes = null;
      this.actions = {};
      this.actionStates = {};
      this.reducers = {};
      this.pages = [];

      this.use(_appPlugin.appPluginBefore);
      this.options.plugin && this.use(this.options.plugin);
    }

    _instance = this;
    window.app = _instance;
    return _instance;
  }
  /*!
   * 单例模式
   * @param {*} args 
   */


  (0, _createClass3.default)(App, [{
    key: 'removeWaiting',


    /**
     * 移除react 加载动画
     * @method 
     */
    value: function removeWaiting() {
      this.domWaiting && this.domWaiting.remove();
    }

    // plugins 
    //--------------------
    /**
     * 添加插件到应用中，插件需要符合标准
     * @method
     * @param {!plugin} plugin 
     */

  }, {
    key: 'use',
    value: function use(plugin) {
      this._plugins.push(plugin);
      plugin.init && plugin.init(this);
    }
    /**
     * 移除指定插件
     * @method
     * @param {!string} name - 要移除插件的名称 
     */

  }, {
    key: 'unuse',
    value: function unuse(name) {
      var _this = this;

      this._plugins.filter(v.name === name).forEach(function (v) {
        _this._plugins.remove(v);
      });
    }
    /**
     * 触发app 指定事件
     * @method
     * @param {!string} event 事件名称
     * @param {...*} [args] 事件参数
     */

  }, {
    key: 'trigger',
    value: function trigger(event) {
      var ret = void 0;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _v = _step.value;

          try {
            ret = _v[event] && _v[event].apply(_v, [this].concat(args));
            if (ret) {
              return ret;
            }
          } catch (e) {
            this.error(e);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return ret;
    }

    // start
    //--------------------
    /**
     * 应用程序启动
     * @method start
     */

  }, {
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, event, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _v2;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.use(_appPlugin.appPluginAfter);
                _context.prev = 1;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 5;
                _iterator2 = this._startEvents[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context.next = 43;
                  break;
                }

                event = _step2.value;
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context.prev = 12;
                _iterator3 = this._plugins[Symbol.iterator]();

              case 14:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context.next = 26;
                  break;
                }

                _v2 = _step3.value;
                _context.t0 = _v2[event];

                if (!_context.t0) {
                  _context.next = 21;
                  break;
                }

                _context.next = 20;
                return _v2[event](this);

              case 20:
                _context.t0 = _context.sent;

              case 21:
                if (!_context.t0) {
                  _context.next = 23;
                  break;
                }

                return _context.abrupt('continue', 23);

              case 23:
                _iteratorNormalCompletion3 = true;
                _context.next = 14;
                break;

              case 26:
                _context.next = 32;
                break;

              case 28:
                _context.prev = 28;
                _context.t1 = _context['catch'](12);
                _didIteratorError3 = true;
                _iteratorError3 = _context.t1;

              case 32:
                _context.prev = 32;
                _context.prev = 33;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 35:
                _context.prev = 35;

                if (!_didIteratorError3) {
                  _context.next = 38;
                  break;
                }

                throw _iteratorError3;

              case 38:
                return _context.finish(35);

              case 39:
                return _context.finish(32);

              case 40:
                _iteratorNormalCompletion2 = true;
                _context.next = 7;
                break;

              case 43:
                _context.next = 49;
                break;

              case 45:
                _context.prev = 45;
                _context.t2 = _context['catch'](5);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t2;

              case 49:
                _context.prev = 49;
                _context.prev = 50;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 52:
                _context.prev = 52;

                if (!_didIteratorError2) {
                  _context.next = 55;
                  break;
                }

                throw _iteratorError2;

              case 55:
                return _context.finish(52);

              case 56:
                return _context.finish(49);

              case 57:
                _context.next = 64;
                break;

              case 59:
                _context.prev = 59;
                _context.t3 = _context['catch'](1);

                this.error(_context.t3);
                this.errorRender(_context.t3);
                return _context.abrupt('return', _context.t3);

              case 64:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 59], [5, 45, 49, 57], [12, 28, 32, 40], [33,, 35, 39], [50,, 52, 56]]);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()

    // interface
    //--------------------
    /**
     * 打印日志-普通级别
     * @method
     * @param {...*} args 
     */

  }, {
    key: 'log',
    value: function log() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.trigger.apply(this, ['onLog', null, false].concat(args));
    }
    /**
     * 打印日志-调试级别
     * @method
     * @param {...*} args 
     */

  }, {
    key: 'debug',
    value: function debug() {
      if (!this.config.debug) return;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.trigger.apply(this, ['onLog', null, false].concat(args));
    }
    /**
     * 打印日志-冗余级别
     * @method
     * @param {...*} args 
     */

  }, {
    key: 'verbose',
    value: function verbose() {
      if (!this.config.verbose) return;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.trigger.apply(this, ['onLog', null, false].concat(args));
    }
    /**
     * 打印日志-错误级别
     * @method
     * @param {...*} args 
     */

  }, {
    key: 'error',
    value: function error() {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.trigger.apply(this, ['onLog', 'error', true].concat(args));
    }
    /**
     * 将错误通过页面渲染方式显示，整个应用将停止，仅显示错误
     * @method
     * @param {...*} args 
     */

  }, {
    key: 'errorRender',
    value: function errorRender() {
      if (this.stateError) return;

      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      this.trigger.apply(this, ['onRenderMessage'].concat(args));
      this.stateError = true;
    }
    /**
     * 将错误通过notice方式显示
     * @method
     * @param {...*} args 
     */

  }, {
    key: 'errorNotice',
    value: function errorNotice() {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this.trigger.apply(this, ['onNoticeMessage'].concat(args));
    }
  }, {
    key: 'domRoot',


    // dom
    //--------------------
    /**
     * @property {element} [domRoot=root] root元素
     */
    get: function get() {
      return document.getElementById(this.options.domIdRoot || 'root');
    }

    /**
     * @property {element} [domWaiting=waiting] waiting元素
     */

  }, {
    key: 'domWaiting',
    get: function get() {
      return document.getElementById(this.options.domIdWaiting || 'waiting');
    }
  }], [{
    key: 'instance',
    value: function instance() {
      if (_instance) return _instance;

      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return new (Function.prototype.bind.apply(App, [null].concat(args)))();
    }
  }]);
  return App;
}();

/**
 * 添加到app 中，扩展app 的功能
 * 插件主要实现各个回调函数，在函数中对app进行扩展或者实现特定功能
 * 回调函数可能是初始化函数，启动阶段的各个函数或者由app 或者其他插件trigger 的事件
 * @class plugin
 * @example
 * ```js
 * let plugin = {
 *   name: 'xxx',
 *   init(app) {
 *     ... // 在插件添加时执行初始化，比如修改app 的属性，比如添加actions
 *   },
 *   xxx(app) {
 *     ... // 在app 各个startEvents 事件中，或者trigger 的特定事件时执行，同上
 *   }
 * }
 * ```
 */

/**
 * @property {string} name - 插件名称，同名称插件不能同时使用
 */

/**
 * 插件被初始化时，在此初始化插件，修改app内容，扩展app功能，比如actions等
 * @callback init
 * @param {App} app - 应用程序App的实例
 */

/**
 * 启动阶段的回调函数，按顺序如下
 * 1. onConfigBefore - 配置阶段之前，该阶段可以从网络获取配置信息
 * 1. onConfig - 配置阶段，该阶段可以修改app.config 的默认配置和增加应用程序级别的配置
 * 1. onImportStyles - css加载阶段
 * 1. onImportStylesAfter - css加载完成，该阶段可以修改css 样式
 * 1. onCreateStoreBefore - 建立redux store之前
 * 1. onCreateStore - 建立redux store
 * 1. onCreateStoreAfter - redux store建立完成，该阶段可以添加新的action
 * 1. onImportRoutes - 加载路由表
 * 1. onImportRoutesAfter - 路由表加载结束，该阶段可以修改paths 信息
 * 1. onHook - hook阶段，该阶段可以修改app中各个类的默认行为
 * 1. onRender - 启动结束，开始渲染
 * 
 * 函数支持async异步处理，在该阶段没有处理完之前，下一阶段函数不会调用
 * ```js
 * onImportRoutes(app) {
 *   return import('./routes/xxx').then(v=>{app.routes = v});
 * }
 * ```
 * @callback XXX
 * @param {App} app - 应用程序App的实例
 */

/**
 * 启动后进入应用运行阶段
 * 应用将要启动阶段
 * @callback onAppWillStart
 */

/**
 * 应用已启动
 * @callback onAppStart
 */

/**
 * 应用已停止
 * @callback onAppStop
 */

/**
 * 应用暂停，应用切换到后台时触发，仅混合开发时有效
 * @callback onAppResume
 */

/**
 * 应用暂停，应用从后台返回时时触发，仅混合开发时有效
 * @callback onAppPause
 */

/**
 * 页面组件render错误时触发
 * @callback onErrorPageRender
 * @param {Error} error - error
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 导航到新的页面时触发
 * @callback onNavigated
 * @param {object} props - 页面路由信息，参见[react-router3 router-render函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 导航出错时触发，比如无法匹配的导航路径等问题
 * @callback onErrorNavigator
 * @param {object} nextState - 页面路由信息，参见[react-router3 route-onEnter函数]()
 * @param {function} replace - 调用后可重定向路径的函数，参见[react-router3 route-onEnter函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 需要打印日志时触发
 * @callback onLog
 * @param {...*} args - 需要打印的参数列表
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当页面上需要render信息，并终止应用时触发
 * @callback onRenderMessage
 * @param {...*} args - 需要打印的参数列表
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当需要已notice方式显示信息时触发
 * @callback onNoticeMessage
 * @param {...*} args - 需要打印的参数列表
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */


exports.default = App;
module.exports = exports['default'];