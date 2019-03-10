"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = _interopRequireDefault(require("./utils"));

var _log = _interopRequireDefault(require("./log"));

var _event = _interopRequireDefault(require("./event"));

var _plugins = _interopRequireDefault(require("./plugins"));

var _state = _interopRequireDefault(require("./state"));

var _page = _interopRequireDefault(require("./page"));

var _poplayer = _interopRequireDefault(require("./poplayer"));

var _router = _interopRequireDefault(require("./router"));

var _context2 = _interopRequireDefault(require("./context"));

var _render = _interopRequireDefault(require("./render"));

var _keyboard = _interopRequireDefault(require("./keyboard"));

/**
 * @module
 */

/**
 * App 构建参数
 * @typedef AppOptions
 * @type {object}
 * @property {string} [id='^app'] - 配置 app id
 * @property {class?} Utils - 替换默认的app utils 模块
 * @property {class?} Event - 替换默认的app Event 模块
 * @property {class?} Plugins - 替换默认的app Plugins 模块
 * @property {class?} Keyboard - 替换默认的app Keyboard 模块
 * @property {class?} Context - 替换默认的app Context 模块
 * @property {class?} Router - 替换默认的app Router 模块
 * @property {class?} Render - 替换默认的app Render 模块
 * @property {class?} State - 替换默认的app 数据单元类
 * @property {class?} Page - 替换默认的app 页面组件
 * @property {class?} PopLayer - 替换默认的app 弹出层组件
 * @property {string?} rootId - react 渲染到的跟元素的 css 选择字符串
 * @property {module:plugins~PluginDefine?} plugin - app 插件，是 app 的第一个插件
 */

/**
 * 应用启动前事件
 * @event module:app.App#onAppStarting
 */

/**
 * 启动后首先进入配置阶段
 * @event module:app.App#onAppStartConfig
 */

/**
 * 路由初始化阶段事件
 * @event module:app.App#onAppStartRouter
 */

/**
 * 数据管理器初始化阶段
 * @event module:app.App#onAppStartContext
 */

/**
 * 定制阶段事件，一般在该事件里处理定制
 * @event module:app.App#onAppStartCustom
 */

/**
 * 进行 dom render 阶段
 * @event module:app.App#onAppStartRender
 */

/**
 * 应用启动完成
 * @event module:app.App#onAppStarted
 */

/**
 * web 应用的主类，其他模块和插件的功能都会挂在在该的实例上。用户需要实例化，并调用 start 方法启动应用。
 * start 方法首先会加载各个模块，然后按照 _startEvents 属性定义的顺序触发事件，各个模块和插件在事件驱动下运行。
 * @exportdefault
 * @example
 * ```js
 * import App from '@bnorth/core';
 * let app = new App();
 * app.start();
 * ```
 */
var App =
/*#__PURE__*/
function () {
  /**
   * 应用构建函数，完成对参数的配置，模块的加载
   * @param {module:app~AppOptions} - 配置参数 
   */
  function App() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, App);

    /**
     * 启动事件列表，app.start 过程，将依次被触发，可以在调用 app.start 前修改
     * @type {string[]}
     */
    this._startEvents = ['onAppStarting', 'onAppStartConfig', 'onAppStartRouter', 'onAppStartContext', 'onAppStartHack', 'onAppStartRender', 'onAppStarted'];
    /**
     * 应用 id
     * @type {string}
     */

    this._id = options._id || '^app';
    /**
     * app 构建参数
     * @type {module:app~AppOptions}
     */

    this.options = options;
    /**
     * State 数据状态的类
     * @type {module:state.State}
     */

    this.State = this.options.State || _state.default;
    /**
     * Page 单个页面的组件
     * @type {module:page.Page}
     */

    this.Page = this.options.Page || _page.default;
    /**
     * Page 弹出层组件
     * @type {module:poplayer.PopLayer}
     */

    this.PopLayer = this.options.PopLayer || _poplayer.default;
    /**
     * Utils 模块类，实现一些常用的工具函数
     * @type {class}
     */

    this.Utils = this.options.Utiles || _utils.default;
    /**
     * Utils 的实例
     * @type {module:utils.Utils}
     */

    this.utils = new this.Utils(this, options);
    /**
     * Log 模块类，负责日志管理
     * @type {class}
     */

    this.Log = this.options.Log || _log.default;
    /**
     * Log 的实例
     * @type {module:log.Log}
     */

    this.log = new this.Log(this, options);
    /**
     * Event 模块，负责事件的管理
     * @type {class}
     */

    this.Event = this.options.Event || _event.default;
    /**
     * Event 的实例
     * @type {module:event.Event}
     */

    this.event = new this.Event(this, options);
    /**
     * Plugins 模块，负责插件的管理
     * @type {class}
     */

    this.Plugins = this.options.Plugins || _plugins.default;
    /**
     * Plugins 的实例
     * @type {module:plugins.Plugins}
     */

    this.plugins = new this.Plugins(this, options);
    /**
     * Keyboard 模块，负责键盘事件的管理
     * @type {class}
     */

    this.Keyboard = this.options.Keyboard || _keyboard.default;
    /**
     * Keyboard 的实例
     * @type {module:keyboard.Keyboard}
     */

    this.keyboard = new this.Keyboard(this, options);
    /**
     * Context 模块，负责数据流管理
     * @type {class}
     */

    this.Context = this.options.Context || _context2.default;
    /**
     * Context 的实例
     * @type {module.context.Context}
     */

    this.context = new this.Context(this, options);
    /**
     * Router 模块，负责页面管理
     * @type {class}
     */

    this.Router = this.options.Router || _router.default;
    /**
     * Router 的实例
     * @type {module:router.Router}
     */

    this.router = new this.Router(this, options);
    /**
     * Render 模块，提供实际 dom 渲染功能
     * @type {class}
     */

    this.Render = this.options.Render || _render.default;
    /**
     * Render 的实例
     * @type {module:render.Render}
     */

    this.render = new this.Render(this, options);

    if (this.options.plugin) {
      this.options.plugin._id = this._id;
      this.plugins.add(this.options.plugin);
    }
    /**
     * 将 App 实例设置到 window.app 
     * @global
     * @mount window.app
     * @type {module:app.App}
     */


    window.app = this;
  }
  /**
   * 启动 app，根据配置，触发一系列的启动事件，最终完成应用启动
   * @async
   */


  (0, _createClass2.default)(App, [{
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.log.info('app start');
                _context.prev = 1;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = this._startEvents[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 15;
                  break;
                }

                v = _step.value;
                _context.next = 11;
                return this.event.emit(this._id, v, this);

              case 11:
                this.event.delete(v, this._id);

              case 12:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 15:
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 21:
                _context.prev = 21;
                _context.prev = 22;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 24:
                _context.prev = 24;

                if (!_didIteratorError) {
                  _context.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context.finish(24);

              case 28:
                return _context.finish(21);

              case 29:
                _context.next = 36;
                break;

              case 31:
                _context.prev = 31;
                _context.t1 = _context["catch"](1);
                this.log.error('app start', _context.t1);
                this.render.critical(_context.t1, {
                  title: 'app start error'
                });
                return _context.abrupt("return", _context.t1);

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 31], [5, 17, 21, 29], [22,, 24, 28]]);
      }));

      return function start() {
        return _start.apply(this, arguments);
      };
    }()
  }]);
  return App;
}();

var _default = App;
exports.default = _default;