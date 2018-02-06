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
 * **关于render**
 * 1. page render 时，将子组件修改为与自己同级，保证互相不影响，因此页面page 的元素应该是绝对定位到左上角的，可使用bnorth-components 的View 组件
 * 1. render 错误时会触发onErrorPageRender 事件
 * 
 * 路由层次
 * ```js
 * root
 *   A
 *     B
 * ```
 * 实际显示
 * ```js
 * <div data-title="root-wrap">
 *   <div>{root}</div>
 *   <div data-title="A-wrap">
 *     <div>{A}</div>
 *     <div>{B}</div>
 *   </div>
 * </div>
 * ```
 * @class Page
 * @property {App} app - App 实例
 * @property {container} props.container - page 对应的container
 * @property {object} props.state_xxx - container 中states 映射到props 上的数据
 * @property {object} props.params - 页面参数信息-[参考react-router 3](https://github.com/ReactTraining/react-router/tree/v3/docs)
 * @property {object} props.location - 页面地址信息-[参考react-router 3](https://github.com/ReactTraining/react-router/tree/v3/docs)
 * @property {object} props.route - 当前页面对应的路由-[参考react-router 3](https://github.com/ReactTraining/react-router/tree/v3/docs)
 * @property {object} props.routes - 该页面路由列表-[参考react-router 3](https://github.com/ReactTraining/react-router/tree/v3/docs)
 * @property {object} props.router - router实例-[参考react-router 3](https://github.com/ReactTraining/react-router/tree/v3/docs)
 */
exports.default = function (app, Wrapper) {
  return function (_Wrapper) {
    (0, _inherits3.default)(_class, _Wrapper);

    function _class(props) {
      (0, _classCallCheck3.default)(this, _class);

      var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.app = app;
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
        if (this.checkFocusChange()) {
          this.componentDidResume();
        }
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this).call(this);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.checkFocusChange()) {
          if (this.isFocus()) {
            this.componentDidResume();
          } else {
            this.componentDidPause();
          }
        }

        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidUpdate', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidUpdate', this).call(this);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.componentDidPause();

        if (this.props.onStop) this.props.onStop(this);
        var ret = (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this).call(this);

        app.removePage(this);
        return ret;
      }
    }, {
      key: 'componentDidPause',
      value: function componentDidPause() {
        if (this.props.onPause) this.props.onPause(this);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidPause', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidPause', this).call(this);
      }
    }, {
      key: 'componentDidResume',
      value: function componentDidResume() {
        (0, _browser.setBrowserTitle)(this.props.route.title || app.config.browser.title);
        if (this.props.onResume) this.props.onResume(this);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidResume', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidResume', this).call(this);
      }
    }, {
      key: 'componentDidBackKey',
      value: function componentDidBackKey() {
        if (this.props.onBackKey) this.props.onBackKey(this);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidBackKey', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidBackKey', this).call(this);
      }
    }, {
      key: 'componentDidCatch',
      value: function componentDidCatch(error, info) {
        return app.trigger('onErrorPageRender', error);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidCatch', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidCatch', this).call(this, error, info);
      }
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
          'data-blur': !this.isFocus()
        }, ret.props));

        return _react2.default.createElement(
          'div',
          { 'data-bnorth-wrap': this.getDisplayName(), style: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%' } },
          ret,
          this.props.state__page && !this.isAppPage() ? this.props.state__page.layers.map(function (v) {
            return v.element;
          }) : null,
          this.getSubs().indexOf(this.getPageChildPath()) >= 0 && this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children,
          this.getSubs().indexOf(this.getPageChildPath()) < 0 && !this.isSubPage() && this.props.children,
          this.props.state__page && this.isAppPage() ? this.props.state__page.layers.map(function (v) {
            return v.element;
          }) : null
        );
      }

      /**
       * 返回page 的display 名称
       * @method
       */

    }, {
      key: 'getDisplayName',
      value: function getDisplayName() {
        return Wrapper.displayName || Wrapper.name;
      }
      /*!
       * 返回是否是App 根组件
       * @method 
       */

    }, {
      key: 'isAppPage',
      value: function isAppPage() {
        return this.props.routes[0] === this.props.route;
      }
    }, {
      key: 'checkFocusChange',
      value: function checkFocusChange() {
        var oldFocus = this._focus;
        this._focus = this.isFocus();
        return this._focus !== oldFocus;
      }

      /**
       * 返回是否页面在顶层
       * @method
       * @return {boolean} 
       */

    }, {
      key: 'isFocus',
      value: function isFocus() {
        if (this.getSubs().hasOwnProperty(this.getPageChildPath())) {
          return !Boolean(this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children);
        } else {
          return !Boolean(this.props.children);
        }
      }

      /**
       * 返回是否是容器组件
       * @method
       * @return {boolean}
       */

    }, {
      key: 'isContainer',
      value: function isContainer() {
        return (this.props.route.childRoutes || []).find(function (v) {
          return v.components;
        });
      }

      /**
       * 容器组件返回其子组件列表
       * @method
       * @return {array} - 子组件的名称数组
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
       * 是否是子组件
       * @method
       * @return {boolean}
       */

    }, {
      key: 'isSubPage',
      value: function isSubPage() {
        return Boolean(this.props.route.components);
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
       * 容器组件返回当前显示中的子组件路径
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
       * 子组件返回其容器组件的路径
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
    }, {
      key: 'addLayer',
      value: function addLayer(element) {
        var uuidstr = (0, _uuid2.default)(8, 16);
        this.props.container.states._page.update({
          layers: [].concat((0, _toConsumableArray3.default)(this.props.state__page.layers), [{ uuid: uuidstr, element: element }])
        });

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
        this.props.container.states._page.update({
          layers: this.props.state__page.layers.filter(function (v) {
            return v.uuid !== uuid;
          })
        });
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