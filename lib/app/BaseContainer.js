'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

/**
 * 页面container 的基类，即页面的容器类，负责页面的逻辑部分<br />
 * 编写新的数据管理器
 * 1. 建立class
 * 1. 实现state 函数，该函数返回的数据将会被映射到props.state_{name}
 * 1. 实现states 函数，该返回对象，对象中的每个键值对的值将被逐一映射到 props.state_{name}_{key}
 * 1. 根据需要实现页面生命周期函数的回调函数
 * @class BaseContainer
 */
var BaseContainer = function () {
  (0, _createClass3.default)(BaseContainer, null, [{
    key: 'getContainerKey',

    /**
     * get container unique key, diff key diff params or querys
     * @method
     * @static
     * @param {App} app - instance of App class
     * @param {object} props - props for component
     */
    value: function getContainerKey(app, props) {
      var key = 'ck';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = props.routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var route = _step.value;

          if (route.path) {
            key += '-' + route.path;
          }
          if (route === props.route) {
            break;
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

      return key;
    }

    /**
     * creator or getter (if exist) of the container
     * @method
     * @static
     * @param {App} app - instance of App class
     * @param {object} props - props for page component
     * @param {function} containerCreator - the container creator function
     * @callback cb
     */

  }, {
    key: 'getContainer',
    value: function getContainer(app, props, containerCreator, cb) {
      var key = BaseContainer.getContainerKey(app, props);
      var container = BaseContainer.maps[key];

      if (!container) {
        container = new BaseContainer(key);
        if (typeof containerCreator === 'function') {
          try {
            containerCreator(app, props, container);
            Object.entries(container.states || {}).forEach(function (_ref) {
              var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                  k = _ref2[0],
                  v = _ref2[1];

              return v && (v.name = k);
            });
          } catch (e) {
            app.error(e);
            app.errorRender(e, 'container error');
          }
          BaseContainer.maps[key] = container;
        }
        cb && cb(container);
      }

      return container;
    }

    /**
     * container 是工厂创建模式，不能直接实例化，而是设计containerCreator ，并设为route 的container 参数，之后app 会通过containerConnect，创建并连接到page
     * @constructor
     * ```js
     * export default function(app, props, container) {
     *   container.states.data = app.actionStates.data({});
     *   container.actions.test = ()=>()=>{};
     *   container.handler.onStart = ()=>{};
     * }
     * ```
     */

  }]);

  function BaseContainer(key, name) {
    (0, _classCallCheck3.default)(this, BaseContainer);

    /**
     * @property {string} key - container unique key
     */
    this.key = key;

    /**
     * @property {string} name - container display name, ues key as name if no name param
     */
    this.name = name;

    /**
     * 
     * @property {state[]} states - state 列表<br />
     * state 是bnroth 的概念，是数据的管理器，每个管理器有自己的名字。bnorth 提供了一些数据管理器，并将管理器的创建函数放在app.actionStates 中，比如页面数据管理器 data 等。
     * state 的建立，用数据管理器创建函数建立好，并添加到states中
     * ```js
     * container.states.data = app.actionStates.data({});
     * ```
     * state 的数据访问
     * ```js
     * this.props.state_data
     * ```
     * state 管理器的访问
     * ```js
     * this.props.states.data      // 在页面Page 中
     * container.props.states.data // 在页面container function 中
     * ```
     */
    this.states = {
      data: app.actionStates.data && app.actionStates.data({}),
      _page: app.actionStates.data({ initData: {
          layers: []
        } })
    };

    /**
     * @property {string[]} reduxers - reduxer 映射列表，reduxer是redux 的概念，redux 通过多个reduxer 将仓库分为不同部分，每个reduxer 有自己的名字。映射列表中的字符串即为redxuer 的名字列表。 设置后，数据仓库中对应的数据，将被映射到页面page 的props 中。
     */
    this.reducers = {};

    /**
     * @property {action[]} actions - action 函数列表， action 是供页面调用的action 函数，是redux 的概念，符合 redux-trunk 标准。<br />
     * 定义
     * ```js
     * container.actions.test = (args)=>()=>{
     *   ...
     * };
     * ```
     * 页面Page 中使用
     * ```js
     * this.props.container.actions.test(args)
     * ```
     */
    this.actions = {};

    /**
     * @property {function[]} handlers - 事件处理函数列表，事件包括:<br />
     * app事件 -  除启动事件外的其他事件
     * 用户自定义事件 - 并通过app.trigger 函数发送的事件
     * onWillStart(page) - 页面将要启动时触发，参数page 为页面Page 实例
     * onStart(page) - 页面启动时触发，参数page 为页面Page 实例
     * onPause(page) - 页面失去焦点启动时触发，参数page 为页面Page 实例
     * onResume(page) - 页面获取焦点时触发，参数page 为页面Page 实例
     * onStop(page) - 页面关闭时触发，参数page 为页面Page 实例
     */
    this.handlers = {};
  }

  /**
   * 触发container 事件处理
   * @method
   * @param {string} event  - 事件名称
   * @param {...any} [args] - 事件参数 
   */


  (0, _createClass3.default)(BaseContainer, [{
    key: 'trigger',
    value: function trigger(event) {
      var handler = this.handlers[event];
      if (!handler) return false;
      var title = 'container handler(' + event + '-' + (this.name || '') + '):';
      try {
        var _app;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_app = app).verbose.apply(_app, [title].concat(args));
        handler.apply(undefined, args);
      } catch (e) {
        this.error(title, e);
        app.errorNotice(e);
      }
    }

    /**
     * 清除container
     * @method
     */

  }, {
    key: 'clear',
    value: function clear() {
      delete BaseContainer.maps[this.key];
    }
  }]);
  return BaseContainer;
}();

BaseContainer.maps = {};
exports.default = BaseContainer;
module.exports = exports['default'];