'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseContainer = exports.ActionState = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.containerConnect = containerConnect;

var _reactRedux = require('react-redux');

var _bindActionCreators = require('../utils/bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _uuid = require('../utils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _getOptions = require('../utils/getOptions');

var _getOptions2 = _interopRequireDefault(_getOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// redux
// --------------------------------------------------------
/**
 * action 在bnorth 中分为数据型action 函数和动作型action 函数
 * 数据型action 函数需要返回一个对象，对象必须包含type 属性，作为reduxer 处理的分发标志
 * 动作型action 函数需要返回一个闭包函数，在分发时会直接运行
 * @function action
 * @example
 * **数据型action**
 * ```js
 * let action = ()=>{
 *   return {
 *     type: 'type',
 *     ......
 *   }
 * }
 * ```
 * **动作型action**
 * ```js
 * let action = (args)=>(app)=>{
 *   ......
 * }
 * ```
 */

/**
 * reduxer 是redux 数据仓库的处理器，处理数据型action 返回处理后的仓库数据，多个reduxer 可以将数据仓库分割管理
 * @function reduxer
 * @example
 * ```js
 * let redux = function( state, action ) {
 *   if(action.type==='type')
 *     ...... // 对state 数据进行操作
 *   return state;
 * }
 * ```
 */

/**
 * ActionState 是数据的管理器的基类，用来代替react state 和redux 的connect
 * 管理器的创建函数放在app.actionStates 中，比如页面数据管理器 data 等
 * 数据管理器被添加到container 的states 中，通过数据管理器操作数据，将引起container 对应的page 属性改变和页面刷新
 * 编写新的数据管理器
 * 1. 建立class
 * 1. 实现state 函数，该函数返回的数据将会被映射到props.state_{name}
 * 1. 实现states 函数，该返回对象，对象中的每个键值对的值将被逐一映射到 props.state_{name}_{key}
 * 1. 根据需要实现页面生命周期函数的回调函数
 * @class ActionState
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var ActionState = exports.ActionState = function () {
  (0, _createClass3.default)(ActionState, null, [{
    key: 'getClassName',
    value: function getClassName(claxx) {
      return claxx && (claxx.stateName || claxx.name);
    }
  }, {
    key: 'getInstance',
    value: function getInstance(claxx, uuid) {
      var className = ActionState.getClassName(claxx);
      var maps = ActionState.maps[className];
      return maps && maps[uuid];
    }
  }, {
    key: 'deleteInstance',
    value: function deleteInstance(claxx, uuid) {
      var className = ActionState.getClassName(claxx);
      var maps = ActionState.maps[className];

      delete maps[uuid];
    }
  }, {
    key: 'instance',
    value: function instance(claxx, app, uuid, options) {
      uuid = uuid || (0, _uuid2.default)();
      var className = ActionState.getClassName(claxx);

      if (!ActionState.maps[className]) ActionState.maps[className] = {};
      var instance = ActionState.maps[className][uuid] || new claxx(app, uuid, (0, _getOptions2.default)(options));
      instance.className = className;
      ActionState.maps[className][uuid] = instance;
      return instance;
    }
  }]);

  function ActionState(app, uuid) {
    (0, _classCallCheck3.default)(this, ActionState);

    this.name = '';
    this.app = app;
    this.uuid = uuid;
  }

  (0, _createClass3.default)(ActionState, [{
    key: 'trigger',
    value: function trigger(event) {
      var handler = this[event];
      if (!handler) return;
      var title = 'state event(' + event + '-' + this.className + '-' + this.name + ':';
      try {
        var _app;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_app = this.app).verbose.apply(_app, [title].concat(args));
        return handler.apply(this, args);
      } catch (e) {
        this.app.error('state handler', e);
        this.app.errorNotice(e);
      }
    }
  }, {
    key: 'state',
    get: function get() {
      return null;
    }
  }, {
    key: 'states',
    get: function get() {
      return null;
    }
  }]);
  return ActionState;
}();

// container
// --------------------------------------------------------
/**
 * 页面container 的基类，即页面的容器类，负责页面的逻辑部分<br />
 * @class BaseContainer
 */


ActionState.maps = {};

var BaseContainer = exports.BaseContainer = function () {
  (0, _createClass3.default)(BaseContainer, null, [{
    key: 'instance',


    /**
     * 建立或者获取container 的单实例
     * @method
     * @static
     * @param {App} app - instance of App class
     * @param {object} props - props for page component
     * @param {function} containerCreator - the container creator function
     * @param {string} name - container name
     * @callback cb
     */
    value: function instance(app, props, containerCreator, key, cb) {
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

              return v && (v.name = key + '~' + k);
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
     * 
     * @property {actionState[]} states - state 列表<br />
     * state 的建立
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
     * @property {string[]} reduxers - reduxer 映射列表，将redux 仓库中的对应名字的数据映射到页面props 中。
     */
    this.reducers = {};

    /**
     * @property {action[]} actions - action 函数列表<br />
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
     * app 事件 -  app 事件
     * 用户事件 - 通过app.trigger 函数发送的自定义事件
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
   * @param {...*} [args] - 事件参数 
   */


  (0, _createClass3.default)(BaseContainer, [{
    key: 'trigger',
    value: function trigger(event) {
      var handler = this.handlers[event];
      if (!handler) return false;
      var title = 'container handler(' + event + '-' + this.key + '):';
      try {
        var _app2;

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        (_app2 = app).verbose.apply(_app2, [title].concat(args));
        handler.apply(undefined, args);
      } catch (e) {
        app.error(title, e);
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

/**
 * container 生成函数，用户通过该函数，完成对container 的扩展与定制，实现业务逻辑
 * 
 * @function containerCreator
 * @param {App} app - instance of App class
 * @param {object} props - instance of App class
 * @param {BaseContainer} container - instance of App class
 * @example
 * ```js
 * export default function(app, props, container) {
 *   container.states.data = app.actionStates.data({});
 * }
 * ```
 */

/**
 * container 连接函数，负责通过container 生成器转换出高阶组件，实现页面的逻辑
 * @function containerConnect
 * @param {App} app - instance of App class
 * @param {function|array} containerCreator - container creator function<br />
 * **function**: 将函数视为container 生成函数
 * **array**: 如果参数为数组，数组中的元素会按顺序，作为[react-redux](https://github.com/reactjs/react-redux) 的connect 函数参数，使用redux 实现container
 * @param {string} name - container name, and for unity id
 * @return {BaseContainer} - container
 */


BaseContainer.maps = {};
function containerConnect(app, containerCreator, name) {
  if (Array.isArray(containerCreator)) return _reactRedux.connect.apply(undefined, (0, _toConsumableArray3.default)(containerCreator));

  var mapState = function mapState(state, props) {
    var container = BaseContainer.instance(app, props, containerCreator, name, function (container) {
      container.actions = (0, _bindActionCreators2.default)(container.actions, app.actionStore.dispatch);
    });

    var ret = {};
    if (!container) return ret;
    Object.entries(container.reducers || {}).forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
          key = _ref4[0],
          v = _ref4[1];

      if (v === true) ret["state_" + key] = state[v === true ? key : v];
    });
    Object.entries(container.states || {}).forEach(function (_ref5) {
      var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
          key = _ref6[0],
          v = _ref6[1];

      ret["state_" + key] = v.state;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(v.states || {})[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
              skey = _step$value[0],
              val = _step$value[1];

          ret['state_' + key + '_' + skey] = val;
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
    });
    return ret;
  };

  var mapDispatch = function mapDispatch(dispatch, props) {
    var container = BaseContainer.instance(app, props, containerCreator, name);
    if (!container) return { app: app };

    return {
      app: app,
      container: container,
      states: container.states,

      onWillStart: function onWillStart(page) {
        container.trigger('onWillStart', page);
      },
      onStart: function onStart(page) {
        container.trigger('onStart', page);
        Object.entries(container.states || {}).forEach(function (_ref7) {
          var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
              k = _ref8[0],
              v = _ref8[1];

          return k[0] !== '_' && v.trigger('onStart');
        });
      },
      onResume: function onResume(page) {
        container.trigger('onResume', page);
        Object.entries(container.states || {}).forEach(function (_ref9) {
          var _ref10 = (0, _slicedToArray3.default)(_ref9, 2),
              k = _ref10[0],
              v = _ref10[1];

          return k[0] !== '_' && v.trigger('onResume');
        });
      },
      onPause: function onPause(page) {
        container.trigger('onPause', page);
        Object.entries(container.states || {}).forEach(function (_ref11) {
          var _ref12 = (0, _slicedToArray3.default)(_ref11, 2),
              k = _ref12[0],
              v = _ref12[1];

          return k[0] !== '_' && v.trigger('onPause');
        });
      },
      onStop: function onStop(page) {
        container.clear(props, containerCreator);
        container.trigger('onStop', page);
        Object.entries(container.states || {}).forEach(function (_ref13) {
          var _ref14 = (0, _slicedToArray3.default)(_ref13, 2),
              k = _ref14[0],
              v = _ref14[1];

          return k[0] !== '_' && v.trigger('onStop');
        });
      }
    };
  };

  return (0, _reactRedux.connect)(mapState, mapDispatch);
}