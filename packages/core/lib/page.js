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

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

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
    key: "_isStatusActive",
    value: function _isStatusActive(status) {
      return status === 'normal';
    }
  }, {
    key: "_isStatusStart",
    value: function _isStatusStart(status) {
      return status === 'normal' || status === 'background';
    }
    /**
     * 通过子页面的名字获取当前页面的子页面实例
     * @param {string} - 子页面名称 
     * @returns {module:page.Page} 子页面实例
     */

  }, {
    key: "getSubPage",
    value: function getSubPage(subName) {
      return Page.getPage(this.props.subPageInfos[subName] && this.props.subPageInfos[subName]._id);
    }
    /**
     * 子页面获取父页面的实例
     * @returns {module:page.Page} 父页面实例
     */

  }, {
    key: "getParrentPage",
    value: function getParrentPage() {
      return Page.getPage(this.props._idParent);
    }
    /**
     * 页面获取前一页面的实例
     * @returns {module:page.Page} 父页面实例
     */

  }, {
    key: "getPrevPage",
    value: function getPrevPage() {
      return this.app.getPage(this.props._idPrev);
    } // page life
    // ---------------------------

  }, {
    key: "_pageInit",
    value: function () {
      var _pageInit2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var _this2 = this;

        var _this$props$routeDefi, component, controller, lazy, options;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props$routeDefi = this.props.routeDefine;
                _this$props$routeDefi = _this$props$routeDefi === void 0 ? {} : _this$props$routeDefi;
                component = _this$props$routeDefi.component, controller = _this$props$routeDefi.controller, lazy = _this$props$routeDefi.lazy;

                if (!lazy) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return component();

              case 6:
                component = _context.sent;

              case 7:
                controller = controller || component.controller || {};
                options = typeof controller === 'function' ? controller(Page.app, this) : controller;
                if (!options.stateData) options.stateData = undefined;
                if (!options.actionGoBack) options.actionGoBack = Page.app.event.createHandler('actionGoBack', function () {
                  return Page.app.router.back();
                }, this);
                this._states = (0, _entries.default)(options).filter(function (_ref) {
                  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
                      k = _ref2[0],
                      v = _ref2[1];

                  return k.startsWith('state') || k.startsWith('_state');
                });
                Page.app.State.attachStates(this, this._states);
                (0, _entries.default)(options).forEach(function (_ref3) {
                  var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
                      k = _ref4[0],
                      v = _ref4[1];

                  if (k.startsWith('on')) {
                    var $ = k.indexOf('$');
                    var eid = $ > 0 ? k.slice($ + 1) : null;
                    k = $ > 0 ? k.slice(0, $) : k;
                    Page.app.event.on(eid, k, Page.app.event.createHandler(k, v, _this2), _this2._id).bind(_this2);
                  } else if (k.startsWith('_on')) {
                    _this2[k] = Page.app.event.createHandler(k, v, _this2).bind(_this2);
                  } else if (k.startsWith('action')) {
                    _this2[k] = Page.app.event.createAction(k, v, _this2).bind(_this2);
                  } else {
                    !k.startsWith('state') && !k.startsWith('_state') && (_this2[k] = v);
                  }
                });

                if (lazy) {
                  this.props.routeDefine.component = component;
                  this.props.routeDefine.lazy = false;
                  this.forceUpdate();
                }

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _pageInit() {
        return _pageInit2.apply(this, arguments);
      }

      return _pageInit;
    }()
  }, {
    key: "_pageStart",
    value: function _pageStart() {
      if (this._started) return;
      var _id = this.props._id;
      var active = this.active;
      Page.app.event.emit(Page.app._id, 'onPageStart', _id, active);
      this._onStart && this._onStart(Page.app, this, active);
      active && Page.app.event.emit(Page.app._id, 'onPageActive', _id, true);
      active && this._onActive && this._onActive(Page.app, this, true);
      this._started = true;
    }
  }, {
    key: "_pageActive",
    value: function _pageActive() {
      Page.app.event.emit(Page.app._id, 'onPageActive', this._id, true);
      this._onActive && this._onActive(Page.app, this, false);
    }
  }, {
    key: "_pageInactive",
    value: function _pageInactive() {
      this._onInactive && this._onInactive(Page.app, this, false);
    }
  }, {
    key: "_pageStop",
    value: function _pageStop() {
      var active = this.props.isInactive; // active&&this._onInactive&&this._onInactive(Page.app, this, true);

      Page.app.event.emit(Page.app._id, 'onPageStop', this._id, active);
      active && this._onStop && this._onStop(Page.app, this, active);
      Page.app.State.detachStates(this, this._states);
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
      return this._isStatusActive(this.status);
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
    Page.pages[_this._id] = (0, _assertThisInitialized2.default)(_this);

    _this._pageInit();

    return _this;
  }

  (0, _createClass2.default)(Page, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.routeDefine.lazy) return;
      var _this$props = this.props,
          isSubPage = _this$props.isSubPage,
          isSubRoute = _this$props.isSubRoute,
          status = _this$props.status;
      if (isSubPage || isSubRoute || status === 'normal' || status === 'background') this._pageStart();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.routeDefine.lazy) return;
      var status = this.props.status;
      if (!this._started && (status === 'normal' || status === 'background')) this._pageStart();
      if (prevProps.status !== 'pushin' && prevProps.status !== 'normal' && status === 'normal') this._pageActive();
      if (prevProps.status === 'normal' && status !== 'normal') this._pageInactive();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.props.routeDefine.lazy) this._pageStop();
      var _id = this._id;
      Page.app.event.off(_id);
      delete Page.pages[_id];
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.routeDefine.lazy) return false;
      if (this.props.status !== nextProps.status) return true;
      if (!Page.app.utils.shallowEqual(this.props.routeDefine, nextProps.routeDefine)) return true;
      if (!Page.app.utils.shallowEqual(this.props.params, nextProps.params)) return true;
      if (!Page.app.utils.shallowEqual(this.props.query, nextProps.query)) return true;
      if (Page.app.State.checkStates(this, this.props.context, nextProps.context, this._states)) return true;
      if (this.props.subRoutePageInfo && !nextProps.subRoutePageInfo || !this.props.subRoutePageInfo && nextProps.subRoutePageInfo) return true;
      if (this.props.subRoutePageInfo && nextProps.subRoutePageInfo && this.props.subRoutePageInfo._id !== nextProps.subRoutePageInfo._id) return true;
      return false;
    } // page render
    // ---------------------

  }, {
    key: "_showStatus",
    value: function _showStatus() {
      var status = this.status;
      return status !== 'waitting' && status !== 'background';
    }
  }, {
    key: "_showContentStatus",
    value: function _showContentStatus() {
      return !['pushin', 'popin'].includes(this.status);
    }
  }, {
    key: "_frameProps",
    value: function _frameProps() {
      var _this$props2 = this.props,
          _id = _this$props2._id,
          isSubPage = _this$props2.isSubPage,
          isSubRoute = _this$props2.isSubRoute,
          routeName = _this$props2.routeName;
      return {
        'data-page': _id,
        'data-page-sub': isSubPage || isSubRoute ? routeName : undefined,
        style: isSubPage || isSubRoute ? {
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
      return _objectSpread({
        app: Page.app,
        page: this,
        _id: _id,
        route: this.props,
        info: this.props
      }, Page.app.State.getStates(this, this._states));
    }
  }, {
    key: "_loadingContent",
    value: function _loadingContent() {
      return _react.default.createElement("div", {
        style: {
          marginTop: 48,
          textAlign: 'center'
        }
      }, "...");
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          _id = _this$props3._id,
          _this$props3$routeDef = _this$props3.routeDefine,
          Component = _this$props3$routeDef.component,
          lazy = _this$props3$routeDef.lazy,
          children = _this$props3.children;

      var frameProps = this._frameProps();

      if (lazy) return _react.default.createElement("main", frameProps, this._loadingContent());

      var contentProps = this._contentProps();

      Page.app.event.emit(Page.app._id, 'onPageRender', _id, contentProps);
      return _react.default.createElement("main", frameProps, this._showContentStatus() ? _react.default.createElement(Component, contentProps, children) : null);
    }
  }]);
  return Page;
}(_react.default.Component);

exports.default = Page;
Page.pages = {};