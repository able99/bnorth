"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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
  (0, _createClass2.default)(Page, [{
    key: "getSubPage",

    /**
     * 通过子页面的名字获取当前页面的子页面实例
     * @param {string} - 子页面名称 
     * @returns {module:page.Page} 子页面实例
     */
    value: function getSubPage(subName) {
      var _id = this.props.subPages[subName] && this.props.subPages[subName].props._id;

      return _id && this.props.app.info.getPage(_id);
    }
    /**
     * 子页面获取父页面的实例
     * @returns {module:page.Page} 父页面实例
     */

  }, {
    key: "getParrentPage",
    value: function getParrentPage() {
      return this.app.getPage(this.props.info._idParent);
    }
    /**
     * 页面获取前一页面的实例
     * @returns {module:page.Page} 父页面实例
     */

  }, {
    key: "getPrevPage",
    value: function getPrevPage() {
      return this.app.getPage(this.props.info._idPrev);
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
      var _this2 = this;

      if (!name) name = "_".concat(++this._actionNum);

      var ret = function ret() {
        try {
          _this2.app.log.debug('page action', _this2._id, name);

          _this2.app.event.emit(_this2._id, 'onPageAction', _this2._id, name);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return func.apply(_this2, args);
        } catch (e) {
          _this2.app.log.error('page action', name, e);

          _this2.app.render.panic(e, {
            title: "action(".concat(name, ") error"),
            _id: _this2._id
          });
        }
      };

      if (name) this["action".concat(name)] = ret;
      return ret;
    } // page private work
    // ---------------------------

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
  }, {
    key: "status",
    get: function get() {
      return this.props.status;
    }
    /**
     * 页面框架的 dom 元素
     * @type {element}
     */

  }, {
    key: "dom",
    get: function get() {
      return _reactDom.default.findDOMNode(this);
    }
  }, {
    key: "active",
    get: function get() {
      return this.props.status === 'normal';
    }
  }], [{
    key: "getPage",
    // page manager
    // ---------------------

    /**
     * 页面集合
     */

    /**
     * 获取页面实例
     * @param {(string|number)?} - 获取参数
     * 
     * 1. string：获取指定 id 的页面
     * 1. number：获取指定序号的页面
     * 1. 空：获取顶层页面
     * 
     * @returns {module:page.Page} 页面实例
     */
    value: function getPage(_id) {
      if (typeof _id === 'string') {
        return Page.pages[_id];
      } else if (typeof _id === 'number') {
        var pageinfo = Page.app.router.getPageInfos()[_id];

        return Page.pages[pageinfo && pageinfo._id];
      } else if (_id === undefined) {
        var infos = Page.app.router.getPageInfos();
        var _pageinfo = infos[infos.length - 1];
        return _pageinfo && Page.pages[_pageinfo._id];
      }
    }
  }]);

  function Page(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Page);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Page).call(this, props));
    Page.pages[_this._id] = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this));
    var _this$props$routeDefi = _this.props.routeDefine;
    _this$props$routeDefi = _this$props$routeDefi === void 0 ? {} : _this$props$routeDefi;
    var component = _this$props$routeDefi.component,
        controller = _this$props$routeDefi.controller;
    controller = controller || component.controller || {};
    _this.options = typeof controller === 'function' ? controller(Page.app, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))) : controller;
    if (!_this.options.stateData) _this.options.stateData = undefined;
    if (!_this.options.actionGoBack) _this.options.actionGoBack = function () {
      return Page.app.router.back();
    };
    Page.app.State.attachStates(Page.app, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), _this._id, _this.options, function (k, v, state) {
      if (typeof v === 'string') return;
      Page.app.event.on(_this._id, 'onPageStart', function (page, isActive) {
        Page.app.event.emit(_this[k]._id, 'onStateStart', _this[k]._id, isActive);
      }, _this[k]._id);
      Page.app.event.on(_this._id, 'onPageActive', function (page, onStart) {
        Page.app.event.emit(_this[k]._id, 'onStateActive', _this[k]._id, onStart);
      }, _this[k]._id);
      Page.app.event.on(_this._id, 'onPageInactive', function (page, onStop) {
        Page.app.event.emit(_this[k]._id, 'onStateInactive', _this[k]._id, onStop);
      }, _this[k]._id);
      Page.app.event.on(_this._id, 'onPageStop', function (page) {
        Page.app.event.emit(_this[k]._id, 'onStateStop', _this[k]._id);
      }, _this[k]._id);
    });
    Object.entries(_this.options).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      if (k.startsWith('state') || k.startsWith('_state')) {// state
      } else if (k === 'onPageAdd' || k === 'onPageRemove') {
        // app event
        Page.app.event.on(Page.app._id, k, v, _this._id);
      } else if (k.startsWith('onPage')) {
        // page event
        Page.app.event.on(_this._id, k, v, _this._id);
      } else if (k.startsWith('onState')) {
        // page state event
        var stateEvents = k.split('_');
        if (stateEvents[0] && _this[stateEvents[1]]) Page.app.event.on(_this[stateEvents[1]]._id, stateEvents[0], v, _this._id);
      } else if (k.startsWith('on')) {
        // app event
        Page.app.event.on(Page.app._id, k, v, _this._id);
      } else if (k.startsWith('action')) {
        // action
        _this[k] = _this.action(v, k.slice(6));
      } else {
        // user props
        _this[k] = v;
      }
    });
    return _this;
  } // page life circle
  // ---------------------------


  (0, _createClass2.default)(Page, [{
    key: "_pageStart",
    value: function _pageStart() {
      if (this._started) return;
      var _id = this.props._id;
      var active = this.active;
      Page.app.event.emit(_id, 'onPageStart', this, active);
      active && Page.app.event.emit(_id, 'onPageActive', this, true);
      active && Page.app.event.emit(Page.app._id, 'onActivePageChange', _id);
      this._started = true;
    }
  }, {
    key: "_pageActive",
    value: function _pageActive() {
      var _id = this.props._id;
      Page.app.event.emit(_id, 'onPageActive', this, false);
      Page.app.event.emit(Page.app._id, 'onActivePageChange', _id);
    }
  }, {
    key: "_pageInactive",
    value: function _pageInactive() {
      var _id = this.props._id;
      Page.app.event.emit(_id, 'onPageInactive', this, false);
    }
  }, {
    key: "_pageStop",
    value: function _pageStop() {
      var _id = this.props._id;
      var active = this.active;
      active && Page.app.event.emit(_id, 'onPageInactive', this, true);
      Page.app.event.emit(this._id, 'onPageStop', this);
      Page.app.event.emit(Page.app._id, 'onPageRemove', _id, this);
      delete Page.pages[_id];
      Page.app.event.off(_id);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          _id = _this$props._id,
          isSubPage = _this$props.isSubPage,
          status = _this$props.status;
      Page.app.log.debug('page did mount', _id);
      Page.app.event.emit(Page.app._id, 'onPageAdd', _id, this);
      if (isSubPage || status === 'normal' || status === 'background') this._pageStart();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var status = this.props.status;
      if (!this._started && (status === 'normal' || status === 'background')) this._pageStart();
      if (prevProps.status !== 'normal' && status === 'normal') this._pageActive();
      if (prevProps.staus === 'normal' && status !== 'normal') this._pageInactive();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _id = this.props._id;
      Page.app.log.debug('page will unmount', _id);

      this._pageStop();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.status !== nextProps.status) return true;
      if (!Page.app.utils.shallowEqual(this.props.routeDefine, nextProps.routeDefine)) return true;
      if (!Page.app.utils.shallowEqual(this.props.params, nextProps.params)) return true;
      if (!Page.app.utils.shallowEqual(this.props.query, nextProps.query)) return true;
      if (Page.app.State.checkStates(this, this.props.context, nextProps.context, this.options)) return true;
      return false;
    }
  }, {
    key: "_showStatus",
    value: function _showStatus() {
      return this.props.status === 'normal' || this.props.status === 'pushout';
    }
  }, {
    key: "_frameProps",
    value: function _frameProps() {
      var _this$props2 = this.props,
          _id = _this$props2._id,
          isSubPage = _this$props2.isSubPage,
          routeName = _this$props2.routeName;
      return {
        'data-page': _id,
        'data-page-sub': isSubPage ? routeName : undefined,
        style: isSubPage ? {
          width: '100%',
          height: '100%'
        } : {
          display: this._showStatus() ? 'block' : 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: 'white'
        }
      };
    }
  }, {
    key: "_contentProps",
    value: function _contentProps() {
      var _id = this.props._id;
      return (0, _objectSpread2.default)({
        app: Page.app,
        page: this,
        _id: _id,
        route: this.props,
        info: this.props
      }, this.options && Page.app.State.getStates(this, this.options));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          _id = _this$props3._id,
          Component = _this$props3.routeDefine.component,
          children = _this$props3.children;
      Page.app.log.debug('page render', _id);
      this._actionNum = 0;
      return _react.default.createElement("main", this._frameProps(), _react.default.createElement(Component, this._contentProps(), children));
    }
  }]);
  return Page;
}(_react.default.Component);

(0, _defineProperty2.default)(Page, "pages", {});
var _default = Page;
exports.default = _default;