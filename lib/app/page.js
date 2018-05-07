'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uuid = require('../utils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _browser = require('../utils/browser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 页面Page 组件的超类，页面element 组件会被pageHoc 函数给超类化
 * 多页面时页面嵌套层次关系如下：
 * 路由层次
 * ```js
 * root
 *   A
 *     B
 * ```
 * 实际显示
 * ```js
 * <div data-wrap="root">
 *   <div>{root}</div>
 *   <div data-wrap="A">
 *     <div>{A}</div>
 *     <div data-wrap="B">
 *       {B}
 *     </div>
 *   </div>
 * </div>
 * ```
 * @class Page
 * @property {App} app - App 实例
 * @property {container} props.container - page 对应的container
 * @property {object} props.state_xxx - container 中states 映射到props 上的数据
 * @property {object} props.params - 页面参数对象，对应path-info 形式的参数
 * @property {location} props.location - 当前路径信息
 * @property {Route} props.route - 当前路由信息
 * @property {Route[]} props.routes - 当前路径对应的全部路由
 * @property {router} props.router - router
 */
exports.default = function (app, Wrapper) {
  return function (_Wrapper) {
    (0, _inherits3.default)(_class, _Wrapper);

    // life circle
    // ---------------------------
    function _class(props) {
      (0, _classCallCheck3.default)(this, _class);

      var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.app = app;
      _this._active = false;
      _this._focus = false;
      return _this;
    }

    (0, _createClass3.default)(_class, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        app.addPage(this);
        if (this.props.onWillStart) this.props.onWillStart(this);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillMount', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillMount', this).call(this);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.onStart) this.props.onStart(this);
        this._registerKeyboard();
        this.checkActive(true, false);
        this.checkFocus();
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this).call(this);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        this.checkActive();
        this.checkFocus();

        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidUpdate', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidUpdate', this).call(this);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._ungegisterKeyboard();
        this.checkActive(true, true, false);
        //this.checkFocus(false, true, false);

        if (this.props.onStop) this.props.onStop(this);
        var ret = (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this).call(this);

        app.removePage(this);
        return ret;
      }
    }, {
      key: 'componentDidPause',
      value: function componentDidPause() {
        if (this.props.onPause) this.props.onPause(this);
        this.checkFocus(true, false);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidPause', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidPause', this).call(this);
      }
    }, {
      key: 'componentDidResume',
      value: function componentDidResume() {
        this.getSubs().indexOf(this.getPageChildPath()) < 0 && (0, _browser.setBrowserTitle)(this.props.route.title || app.config.browser.title);
        if (this.props.onResume) this.props.onResume(this);
        this.checkFocus(false, true);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidResume', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidResume', this).call(this);
      }
    }, {
      key: 'componentDidCatch',
      value: function componentDidCatch(error, info) {
        return app.trigger('onErrorPageRender', error);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidCatch', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidCatch', this).call(this, error, info);
      }

      // render
      // ---------------------

    }, {
      key: 'render',
      value: function render() {
        app.verbose('page render(' + this.getDisplayName() + '):', this);

        if (this.props.state__page && this.props.state__page.ready === false) {
          return _react2.default.createElement(app._WaittingComponent, null);
        }

        var ret = void 0;
        try {
          ret = (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'render', this).call(this);
        } catch (e) {
          return app.trigger('onErrorPageRender', e);
        }
        ret = _react2.default.cloneElement(ret, Object.assign({
          'data-bnorth-page': this.getDisplayName(),
          'data-blur': !this.isActive()
        }, ret.props));

        return _react2.default.createElement(
          'div',
          { 'data-bnorth-page-wrap': this.getDisplayName(), style: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%' } },
          ret,
          !this.isAppPage() ? this.getLayers() : null,
          this.getChildren(),
          this.isAppPage() ? this.getLayers() : null
        );
      }

      // info
      // --------------------------

      /**
       * 返回page 的display 名称
       * @method
       */

    }, {
      key: 'getDisplayName',
      value: function getDisplayName() {
        return Wrapper.displayName || Wrapper.name;
      }

      // active focus
      // --------------------------

    }, {
      key: 'isActive',
      value: function isActive() {
        if (this.getSubs().indexOf(this.getPageChildPath()) >= 0) {
          return !Boolean(this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children);
        } else {
          return !Boolean(this.props.children);
        }
      }
    }, {
      key: 'checkActive',
      value: function checkActive() {
        var emitPositive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var emitNegative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var val = arguments[2];

        var oldVal = this._active;
        this._active = val !== undefined ? val : this.isActive();
        if (this._active !== oldVal) {
          if (this._active && emitPositive) this.componentDidResume();;
          if (!this._active && emitNegative) this.componentDidPause();;
        }
      }
    }, {
      key: 'isFocus',
      value: function isFocus() {
        return this.isActive() && !this.isContainerPage() && this.getFocusLayerIndex() === null;
      }
    }, {
      key: 'checkFocus',
      value: function checkFocus() {
        var emitPositive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var emitNegative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var val = arguments[2];

        var oldVal = this._focus;
        this._focus = val !== undefined ? val : this.isFocus();
      }
    }, {
      key: '_handleKeyUp',
      value: function _handleKeyUp(e) {
        if (!this.isActive() || !this.isFocus()) return;
        if (this.componentHandleKeyUp && this.componentHandleKeyUp(e)) return;
        if (e.keyCode === 27) app.navigator.back();
      }
    }, {
      key: '_registerKeyboard',
      value: function _registerKeyboard() {
        var _this2 = this;

        if (this._onDocumentKeydownListener) return;
        this._onDocumentKeydownListener = function (e) {
          return _this2._handleKeyUp(e);
        };
        window.document.addEventListener('keyup', this._onDocumentKeydownListener);
      }
    }, {
      key: '_ungegisterKeyboard',
      value: function _ungegisterKeyboard() {
        this._onDocumentKeydownListener && window.document.removeEventListener('keyup', this._onDocumentKeydownListener);
        this._onDocumentKeydownListener = null;
      }

      // sub page
      // ----------------------

    }, {
      key: 'getChildren',
      value: function getChildren() {
        if (this.getSubs().indexOf(this.getPageChildPath()) >= 0) {
          return this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children;
        } else {
          return !this.isSubPage() && this.props.children;
        }
      }

      /**
       * 返回是否是App 根组件
       * @method 
       */

    }, {
      key: 'isAppPage',
      value: function isAppPage() {
        return this.props.routes[0] === this.props.route;
      }

      /**
       * 返回是否是容器页面
       * @method
       * @return {boolean}
       */

    }, {
      key: 'isContainerPage',
      value: function isContainerPage() {
        return (this.props.route.childRoutes || []).find(function (v) {
          return v.components;
        });
      }

      /**
       * 返回是否是子页面
       * @method
       * @return {boolean}
       */

    }, {
      key: 'isSubPage',
      value: function isSubPage() {
        return Boolean(this.props.route.components);
      }

      /**
       * 返回容器页面的子页面列表
       * @method
       * @return {array} - 子页面的名称数组
       */

    }, {
      key: 'getSubs',
      value: function getSubs() {
        return (this.props.route.childRoutes || []).filter(function (v) {
          return v.components;
        }).map(function (v) {
          return v.path;
        });
      }

      /**
       * 返回当前页面的全路径
       * @method
       * @return {string}
       */

    }, {
      key: 'getPageFullPath',
      value: function getPageFullPath() {
        var routes = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.props.routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var route = _step.value;

            if (!route.path) continue;
            routes.push(route.path === "/" ? "" : route.path);
            if (route === this.props.route) break;
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

        var pathname = routes.join("/");
        for (var key in this.props.router.params) {
          var re = new RegExp(":" + key, "g");
          pathname = pathname.replace(re, this.props.router.params[key]);
        }
        return pathname;
      }

      /**
       * 容器组件返回当前页面中的子页面的路径
       * @method
       * @return {string}
       */

    }, {
      key: 'getPageChildPath',
      value: function getPageChildPath() {
        var ret = null;
        for (var i = 0; i < this.props.routes.length; i++) {
          var route = this.props.routes[i];
          if (!route.path) continue;
          if (route === this.props.route) {
            ret = this.props.routes[i + 1];
            break;
          }
        }
        return ret ? ret.path : null;
      }

      /**
       * 返回其父页面的路径
       * @method
       * @return {string}
       */

    }, {
      key: 'getPageParentPath',
      value: function getPageParentPath() {
        var ret = null;
        for (var i = 0; i < this.props.routes.length; i++) {
          var route = this.props.routes[i];
          if (!route.path) continue;
          if (route === this.props.route) break;
          ret = route.path;
        }
        return ret;
      }

      // layer
      // --------------------------

    }, {
      key: 'getFocusLayerIndex',
      value: function getFocusLayerIndex() {
        var layers = this.props.state__page.layers || [];
        return layers.reverse().reduce(function (v1, v2, i) {
          return v1 !== null ? v1 : v2.focus ? i : null;
        }, null);
      }
    }, {
      key: 'getLayers',
      value: function getLayers() {
        var layers = this.props.state__page.layers || [];
        var foucsIndex = this.isActive() && this.getFocusLayerIndex();
        layers = layers.map(function (v, i) {
          return (0, _react.cloneElement)(v.element, {
            focus: i === foucsIndex
          });
        });
        return layers;
      }
    }, {
      key: 'addLayer',
      value: function addLayer(element, focus) {
        var _this3 = this;

        var uuidstr = (0, _uuid2.default)(8, 16);
        this.props.container.states._page.update({
          layers: [].concat((0, _toConsumableArray3.default)(this.props.state__page.layers), [{ uuid: uuidstr, element: element, focus: focus }])
        });

        window.setTimeout(function () {
          return _this3.checkFocus();
        }, 50);
        return uuidstr;
      }
    }, {
      key: 'updateLayer',
      value: function updateLayer(element, uuid) {
        this.props.container.states._page.update({
          layers: this.props.state__page.layers.map(function (v) {
            return v.uuid !== uuid ? v : { element: element, uuid: uuid };
          })
        });
      }
    }, {
      key: 'removeLayer',
      value: function removeLayer(uuid) {
        var _this4 = this;

        this.props.container.states._page.update({
          layers: this.props.state__page.layers.filter(function (v) {
            return v.uuid !== uuid;
          })
        });

        window.setTimeout(function () {
          return _this4.checkFocus();
        }, 50);
      }
    }]);
    return _class;
  }(Wrapper);
};

/**
 * @function pageHoc
 * @param {!App} app - App 的实例
 * @param {!element} element - 进行页面化转换的react 有状态组件 
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

module.exports = exports['default'];