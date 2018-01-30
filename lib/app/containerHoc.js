'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = function (app, acontainer) {
  if (Array.isArray(acontainer)) return _reactRedux.connect.apply(undefined, (0, _toConsumableArray3.default)(acontainer));

  var mapState = function mapState(state, props) {
    var container = getContainer(app, props, acontainer, function (container) {
      Object.entries(container.actions).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return v.fname = k;
      });
      container.actions = (0, _redux.bindActionCreators)(container.actions, app.actionStore.dispatch);
    });

    var ret = {};
    if (!container) return ret;
    Object.entries(container.reducers || {}).forEach(function (_ref5) {
      var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
          key = _ref6[0],
          v = _ref6[1];

      if (v === true) ret["state_" + key] = state[v === true ? key : v];
    });
    Object.entries(container.states || {}).forEach(function (_ref7) {
      var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
          key = _ref8[0],
          v = _ref8[1];

      ret["state_" + key] = v.state;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(v.states || {})[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
              skey = _step2$value[0],
              val = _step2$value[1];

          ret['state_' + key + '_' + skey] = val;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });
    return ret;
  };

  var mapDispatch = function mapDispatch(dispatch, props) {
    var container = getContainer(app, props, acontainer);
    if (!container) return { app: app };

    return {
      app: app,
      container: container,
      states: container.states,

      onWillStart: function onWillStart(page) {
        if (container.handlers.onWillStart) container.handlers.onWillStart(app, page, container);
      },
      onStart: function onStart(page) {
        if (container.handlers.onStart) container.handlers.onStart(app, page, container);
        statesHandler(container.states, 'onStart');
      },
      onPause: function onPause(page) {
        if (container.handlers.onPause) container.handlers.onPause(app, page, container);
        statesHandler(container.states, 'onPause');
      },
      onResume: function onResume(page) {
        if (container.handlers.onResume) container.handlers.onResume(app, page, container);
        statesHandler(container.states, 'onResume');
      },
      onStop: function onStop(page) {
        delete acontainer[getContainerKey(app, props)];
        if (container.handlers.onStop) container.handlers.onStop(app, page, container);
        statesHandler(container.states, 'onStop');
      }
    };
  };

  return (0, _reactRedux.connect)(mapState, mapDispatch);
};

var _reactRedux = require('react-redux');

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * get container unique key, diff key diff params or querys
 * @function
 * @param {App} app - instance of App class
 * @param {object} props - props for component
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

function getContainerKey(app, props) {
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

/*!
 * creator or getter (if exist) of the container
 * @function
 * @param {App} app - instance of App class
 * @param {object} props - props for component
 * @param {function} container - the container function
 * @callback cb
 */
function getContainer(app, props, acontainer, cb) {
  if (!acontainer) return;
  var key = getContainerKey(app, props);
  var container = acontainer[key];

  if (!container) {
    container = {
      states: {
        data: app.actionStates.data && app.actionStates.data({}),
        _page: app.actionStates.data({ initData: {
            layers: []
          } })
      },
      reducers: {},
      actions: {},
      handlers: {}
    };

    if (acontainer !== true) {
      try {
        acontainer(app, props, container);
      } catch (e) {
        app.error(e);
        app.errorRender(e, 'container error');
      }
      acontainer[key] = container;
    }
    cb && cb(container);
  }

  return container;
}

/*!
 * utiles for states event handle
 * @function
 * @param {array} states - state list
 * @param {string} event - event
 */
function statesHandler(states, event) {
  Object.entries(states || {}).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    if (!key || key[0] === '_' && key[0] !== '_page') return;
    var func = val && val[event];
    if (func) func.apply(val);
  });
}

/*!
 * create container use container function
 * @function
 * @param {App} app - instance of App class
 * @param {function} container - container function
 */


/**
 * bnorth 中页面container 组件，页面的容器类，负责页面的逻辑部分
 * 实现container 函数后，由containerHoc 进行转换
 * @class container
 * @example
 * ```js
 * export default function(app, props, container) {
 *   container.states.data = app.actionStates.data({});
 *   container.actions.test = ()=>()=>{};
 *   container.handler.onStart = ()=>{};
 * }
 * ```
 */

/**
 * state 列表
 * @property {state[]} states
 */

/**
 * 数据仓库中数据映射列表，
 * 指定仓库中的reduxer名字的数据，会被映射到 页面Page props 中
 * @property {string[]} reduxers
 */

/**
 * action 函数列表
 * @property {action[]} actions
 */

/**
 * 事件处理函数列表
 * @property {function[]} handlers
 */

/**
 * container函数是页面组件的逻辑控制函数，为页面组件提供数据和actions 供页面组件调用
 * bnorth 会通过containerHoc 进行转换
 * **states**：
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
 * 编写新的数据管理器
 * 1. 建立class
 * 1. 实现state 函数，该函数返回的数据将会被映射到props.state_{name}
 * 1. 实现states 函数，该返回对象，对象中的每个键值对的值将被逐一映射到 props.state_{name}_{key}
 * 1. 根据需要实现页面生命周期函数的回调函数
 * 
 * **reduxers**：
 * reduxer 映射列表，reduxer是redux 的概念，redux 通过多个reduxer 将仓库分为不同部分，每个reduxer 有自己的名字。映射列表中的字符串即为redxuer 的名字列表。
 * 设置后，数据仓库中对应的数据，将被映射到页面page 的props 中。
 * **actions**：
 * 供页面调用的action 函数添加到模板的actions 中，action 是redux 的概念，符合 redux-trunk 标准。
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
 * **handlers**：
 * 与事件同名的处理函数添加到container 模板的handlers 中，事件触发时，该函数将会被调用。
 * 事件包括，app 触发的事件与组件的生命周期事件，包括：
 * onWillStart(page) - 页面将要启动时触发，参数page 为页面Page 实例
 * onStart(page) - 页面启动时触发，参数page 为页面Page 实例
 * onPause(page) - 页面失去焦点启动时触发，参数page 为页面Page 实例
 * onResume(page) - 页面获取焦点时触发，参数page 为页面Page 实例
 * onStop(page) - 页面关闭时触发，参数page 为页面Page 实例
 * @function contianerFunction
 * @param {App} app - App 的实例
 * @param {object} props - 页面的属性
 * @param {object} container - container模板，在此函数中，扩展该属性
 * @example
 * ```js
 * export default function(app, props, container) {
 *   container.states.data = app.actionStates.data({});
 * }
 * ```
 */
module.exports = exports['default'];