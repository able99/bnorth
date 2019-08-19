"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

/**
 * @module
 */

/**
 * 页面 controller 的声明函数
 * @typedef PageControllerDefineFunction
 * @type {function}
 * @param {module:app.App} app - App 实例
 * @param {module:page.Page} page - 页面的实例
 * @returns {module:page~PageControllerDefine} 页面 controll 声明对象
 */

/**
 * 页面 controller 的声明对象
 * @typedef PageControllerDefine
 * @type {object}
 * @property {function} onXXX - 为页面实例注册 app 事件处理函数
 * @property {function} onPageXXX - 为页面实例注册页面事件处理函数
 * @property {function} onStateXXX - 为页面实例注册数据单元事件处理函数
 * @property {module:state~StateDefine} stateXXX - 为页面实例声明数据单元
 * @property {function} actionXXX - 为页面实例增加 action 函数
 * @property {*} xxx - 为页面实例增加属性或者方法
 */

/**
 * 页面的路由信息
 * @typedef PageRouteInfo
 * @type {object}
 * @property {string} _id - 页面 id
 * @property {string} _idPrev - 页面的前一页面的 id
 * @property {string} _idParent - 页面的父页面的 id
 * @property {string} pathName - 页面对应的路径字符串
 * @property {string} pageName - 页面的名称
 * @property {string} pagePathName - 页面的路径字符串的当前页面片段
 * @property {string[]} pageParams - 页面的路径字符串参数
 * @property {string} routeName - 路由的名称，路由名称上是包含参数定义的名称
 * @property {module:router~RouteDefine} routeDefine - 路由声明对象
 * @property {string[]} routeParams - 路由的配置参数
 * @property {object} state - 状态数据
 * @property {object} query - 查询字符串数据键值对
 * @property {string} hash - 锚点字符串
 * @property {object} params - 页面参数键值对
 * @property {boolean} isSubPage - 是否是子页面
 * @property {boolean} isActive - 是否是顶层活动页面
 * @property {component} subPages - 子页面集合
 * @property {component} popLayers - 页面所属的弹出层集合
 */

/**
 * 新的页面被添加
 * @event module:app.App#onPageAdd
 * @property {string} _id - 页面 id
 * @property {module:page.Page} page - 页面实例
 */

/**
 * 页面被移除完成
 * @event module:app.App#onPageRemove
 * @property {string} _id - 页面 id
 * @property {module:page.Page} page - 页面实例
 */

/**
 * 页面启动时事件
 * @event module:page.Page#onPageStart
 * @property {module:page.Page} page - 页面实例
 * @property {boolean} isActive - 是否是顶层页面
 */

/**
 * 页面成为活动页面时事件
 * @event module:page.Page#onPageActive
 * @property {module:page.Page} page - 页面实例
 * @property {boolean} onStart - 是否是页面启动过程中触发的
 */

/**
 * 页面成为非活动页面时事件
 * @event module:page.Page#onPageInactive
 * @property {module:page.Page} page - 页面实例
 * @property {boolean} onStop - 是否是页面注销流程中触发的
 */

/**
 * 页面注销时事件
 * @event module:page.Page#onPageStop
 * @property {module:page.Page} page - 页面实例
 */

/**
 * 页面 id，由 router 模块注入
 * @attribute _id
 * @memberof module:page.Page
 * @type {string} 
 */

/**
 * App 的实例，由 router 模块注入
 * @attribute app
 * @memberof module:page.Page
 * @type {module:app.App} 
 */

/**
 * 页面的路由信息，由 router 模块注入
 * @attribute route
 * @memberof module:page.Page
 * @type {module:page~PageRouteInfo} 
 */

/**
 * 页面组件，是由页面管理器管理的，是对应路由的 component 的父组件。管理页面的属性方法和事件，管理页面的生命周期，并向 component 注入页面相关属性。
 * @see {@link https://able99.github.io/cbnorth/page.html} bnorth 页面管理
 * @component
 * @exportdefault
 */
var Page =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Page, _React$Component);

  function Page() {
    (0, _classCallCheck2.default)(this, Page);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Page).apply(this, arguments));
  }

  (0, _createClass2.default)(Page, [{
    key: "getSubPage",

    /**
     * 通过子页面的名字获取当前页面的子页面实例
     * @param {string} - 子页面名称 
     * @returns {module:page.Page} 子页面实例
     */
    value: function getSubPage(subName) {
      var _id = this.props.subPages[subName] && this.props.subPages[subName].props._id;

      return _id && this.props.app.router.getPage(_id);
    }
    /**
     * 子页面获取父页面的实例
     * @returns {module:page.Page} 父页面实例
     */

  }, {
    key: "getParrentPage",
    value: function getParrentPage() {
      return this.app.getPage(this.props.route._idParent);
    }
    /**
     * 页面获取前一页面的实例
     * @returns {module:page.Page} 父页面实例
     */

  }, {
    key: "getPrevPage",
    value: function getPrevPage() {
      return this.app.getPage(this.props.route._idPrev);
    }
    /**
     * 动态建立页面 action 函数，*注：* 动态创建一般是在 render 中，渲染时会多次建立，有消耗，建议在 controller 中定义为好
     * @param {!function} - action 函数
     * @param {string?} - action 名称，为空则生成随机名称
     * @returns {function} 页面 action 函数
     */

  }, {
    key: "action",
    value: function action(func, name) {
      var _this = this;

      if (!name) name = "_".concat(++this._actionNum);

      var ret = function ret() {
        try {
          _this.app.log.debug('page action', _this._id, name);

          _this.app.event.emit(_this._id, 'onPageAction', _this._id, name);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return func.apply(_this, args);
        } catch (e) {
          _this.app.log.error('page action', name, e);

          _this.app.render.panic(e, {
            title: "action(".concat(name, ") error"),
            _id: _this._id
          });
        }
      };

      if (name) this["action".concat(name)] = ret;
      return ret;
    } // page private work
    // ---------------------------

    /*!
     * 处理页面键盘事件，在返回键时，返回上级历史
     */

  }, {
    key: "_handleKeyEvent",
    value: function _handleKeyEvent(e) {
      return e.keyCode === 27 && this.actionGoBack();
    }
    /*!
     * 处理页面 controller 的构建和初始化
     */

  }, {
    key: "_bindController",
    value: function _bindController() {
      var _this2 = this;

      var _this$props = this.props,
          app = _this$props.app,
          _this$props$route$rou = _this$props.route.routeDefine;
      _this$props$route$rou = _this$props$route$rou === void 0 ? {} : _this$props$route$rou;
      var component = _this$props$route$rou.component,
          controller = _this$props$route$rou.controller;
      var acontroller = controller || component.controller || {};
      var controllerObj = typeof acontroller === 'function' ? acontroller(app, this) : acontroller;
      this.options = controllerObj;
      if (!controllerObj.stateData) controllerObj.stateData = undefined;
      if (!controllerObj.actionGoBack) controllerObj.actionGoBack = function () {
        return app.router.back();
      };
      app.State.attachStates(app, this, this._id, this.options, function (k, v, state) {
        if (typeof v === 'string') return;
        app.event.on(_this2._id, 'onPageStart', function (page, isActive) {
          app.event.emit(_this2[k]._id, 'onStateStart', _this2[k]._id, isActive);
        }, _this2[k]._id);
        app.event.on(_this2._id, 'onPageActive', function (page, onStart) {
          app.event.emit(_this2[k]._id, 'onStateActive', _this2[k]._id, onStart);
        }, _this2[k]._id);
        app.event.on(_this2._id, 'onPageInactive', function (page, onStop) {
          app.event.emit(_this2[k]._id, 'onStateInactive', _this2[k]._id, onStop);
        }, _this2[k]._id);
        app.event.on(_this2._id, 'onPageStop', function (page) {
          app.event.emit(_this2[k]._id, 'onStateStop', _this2[k]._id);
        }, _this2[k]._id);
      });
      Object.entries(controllerObj).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        if (k.startsWith('state') || k.startsWith('_state')) {// state
        } else if (k === 'onPageAdd' || k === 'onPageRemove') {
          // app event
          app.event.on(app._id, k, v, _this2._id);
        } else if (k.startsWith('onPage')) {
          // page event
          app.event.on(_this2._id, k, v, _this2._id);
        } else if (k.startsWith('onState')) {
          // page state event
          var stateEvents = k.split('_');
          if (stateEvents[0] && _this2[stateEvents[1]]) app.event.on(_this2[stateEvents[1]]._id, stateEvents[0], v, _this2._id);
        } else if (k.startsWith('on')) {
          // app event
          app.event.on(app._id, k, v, _this2._id);
        } else if (k.startsWith('action')) {
          // action
          _this2[k] = _this2.action(v, k.slice(6));
        } else {
          // user props
          _this2[k] = v;
        }
      });
      this._controllerBinded = true;
      this.forceUpdate();
    }
  }, {
    key: "_pageInit",
    value: function _pageInit() {
      var _this3 = this;

      var _this$props2 = this.props,
          app = _this$props2.app,
          _id = _this$props2._id,
          isActive = _this$props2.route.isActive;
      if (app.router.transInBlank) this._bindController();
      this._offKeyEvent = app.keyboard.on(_id, 'keydown', function (e) {
        return _this3._handleKeyEvent(e);
      });
      app.event.emit(this._id, 'onPageStart', this, isActive);
      isActive && app.event.emit(this._id, 'onPageActive', this, true);
      isActive && app.event.emit(app._id, 'onActivePageChange', this._id);
    } // page life circle
    // ---------------------------

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
          app = _this$props3.app,
          _id = _this$props3._id,
          isSubPage = _this$props3.route.isSubPage;
      app.log.debug('page did mount', _id);
      app.event.emit(app._id, 'onPageAdd', _id, this);
      if (!app.router.transInBlank) this._bindController();
      if (!this._controllerBinded && (isSubPage || !app.router._transStatus)) this._pageInit();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props4 = this.props,
          app = _this$props4.app,
          _this$props4$route = _this$props4.route,
          _id = _this$props4$route._id,
          isSubPage = _this$props4$route.isSubPage,
          isActive = _this$props4$route.isActive;

      if (!this._controllerBinded && !isSubPage) {
        if (isActive === true || isActive === false) this._pageInit();
        return;
      }

      if (prevProps.route.isActive !== true && isActive === true) {
        app.event.emit(_id, 'onPageActive', this, false);
        app.event.emit(app._id, 'onActivePageChange', _id);
      }

      if (prevProps.route.isActive && isActive === false) {
        app.event.emit(_id, 'onPageInactive', this, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props5 = this.props,
          app = _this$props5.app,
          _id = _this$props5._id,
          isActive = _this$props5.route.isActive;
      app.log.debug('page will unmount', _id);
      isActive && app.event.emit(this._id, 'onPageInactive', this, true);
      app.event.emit(this._id, 'onPageStop', this);
      app.event.emit(app._id, 'onPageRemove', _id, this);
      this._offKeyEvent && this._offKeyEvent();
      app.event.off(_id);
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var app = this.props.app;
      app.log.debug('page did catch');
      app.render.panic(error, {
        title: 'page error catch',
        _id: this._id
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.route.isActive !== this.props.route.isActive && (nextProps.route.isActive === true || nextProps.route.isActive === false)) return true;
      if (this.props.route.isActive !== true && this.props.route.isActive !== false) return false;

      if (!this.props.app.utils.shallowEqual(this.props.route, nextProps.route, ['params', 'query', 'popLayers', 'subPages'])) {
        this.app.event.emit(this._id, 'onPageUpdate', this._id, 'route');
        return true;
      }

      if (this.app.State.checkStates(this, this.props.context, nextProps.context, this.options)) {
        this.app.event.emit(this._id, 'onPageUpdate', this._id, 'state');
        return true;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          app = _this$props6.app,
          _id = _this$props6._id,
          route = _this$props6.route,
          props = (0, _objectWithoutProperties2.default)(_this$props6, ["app", "_id", "route"]);
      var isActive = route.isActive,
          routeDefine = route.routeDefine,
          subPages = route.subPages,
          popLayers = route.popLayers;
      app.log.debug('page render', _id);
      this._actionNum = 0;
      var aprops = (0, _objectSpread2.default)({
        app: app,
        _id: _id,
        route: route,
        page: this
      }, this.options && app.State.getStates(this, this.options));
      return _react.default.createElement(Page.Frame, {
        id: _id,
        route: route
      }, this._controllerBinded && (!app.router.transOutBlank || isActive !== 'unmount') ? _react.default.createElement(routeDefine.component, (0, _extends2.default)({}, aprops, props), subPages) : null, this._controllerBinded && (!app.router.transOutBlank || isActive !== 'unmount' ? popLayers : null));
    }
  }, {
    key: "_id",
    // page interface
    // ---------------------

    /**
     * 页面 id
     * @type {string}
     */
    get: function get() {
      return this.props._id;
    }
    /**
     * app 实例
     * @type {module:app.App}
     */

  }, {
    key: "app",
    get: function get() {
      return this.props.app;
    }
    /**
     * 页面路由匹配信息
     * @type {module:page~PageRouteInfo}
     */

  }, {
    key: "route",
    get: function get() {
      return this.props.route;
    }
    /**
     * 页面框架的 dom 元素
     * @type {element}
     */

  }, {
    key: "frame",
    get: function get() {
      return _reactDom.default.findDOMNode(this);
    }
  }]);
  return Page;
}(_react.default.Component);

var _default = Page;
exports.default = _default;

Page.Frame = function (aprops) {
  var _id = aprops.id,
      route = aprops.route,
      children = aprops.children;
  var props = {
    'data-page': _id,
    'data-page-sub': route.isSubPage ? route.routeName : undefined,
    style: route.isSubPage ? {
      width: '100%',
      height: '100%'
    } : {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: 'white',
      'WebkitBackfaceVisibility': 'hidden',
      'MozBackfaceVisibility': 'hidden',
      'msBackfaceVisibility': 'hidden',
      'backfaceVisibility': 'hidden',
      'WebkitPerspective': 1000,
      'MozPerspective': 1000,
      'msPerspective': 1000,
      'perspective': 1000
    }
  };
  return _react.default.createElement("main", props, children);
};