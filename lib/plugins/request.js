'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _container = require('../app/container');

var _getOptions = require('../utils/getOptions');

var _getOptions2 = _interopRequireDefault(_getOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// action state 
// -----------------------------
/**
 * 网络请求管理器的构造参数
 * @class ActionStateRequestOptions
 * @property {object|array} [defaultData={}] - 默认数据 
 * @property {object|array} [initData={}] - 初始化数据 
 * @property {boolean} [trackState=falae] - 是否显示
 * @property {boolean} [updateOnStart=falae] - 是否在container 启动时更新数据
 * @property {boolean} [updateOnResume=falae] - 是否在container 获取焦点时更新数据
 * @property {boolean} [clearOnStop=true] - 是否在container 停止时，清除数据管理器
 */
/**
 * 当获取请求数据时触发
 * @callback onWillUpdate
 * @param {ActionStateRequestOptions} options - 本次请求的配置信息
 * @return {boolean} - 返回false 终止本次请求
 */
/** 
 * 数据将要改变时触发
 * @callback onWillChange
 * @param {object|array} result - 请求结果
 * @return {object|array} - 如果返回则替换为返回的数据 
 */
/**
 * 数据修改后触发
 * @callback onDidChange
 * @param {object|array} result - 请求结果
 */
/**
 * @callback onChangeError
 * @param {Error|string} error - 错误信息
 * @param {object|array} result - 请求结果
 */

/**
 * 提供网络请求与网络请求数据的管理
 * @class
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var ActionStateRequest = function (_ActionState) {
  (0, _inherits3.default)(ActionStateRequest, _ActionState);

  /**
   * 
   * @param {App} app - App 单实例
   * @param {string} uuid - 唯一id
   * @param {ActionStateRequestOptions} options - 请求参数
   */
  function ActionStateRequest(app, uuid, options) {
    (0, _classCallCheck3.default)(this, ActionStateRequest);

    /**
     * @property {ActionStateRequestOptions} options - 请求的参数
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ActionStateRequest.__proto__ || Object.getPrototypeOf(ActionStateRequest)).call(this, app, uuid));

    _this.options = options;
    _this.options.defaultData = _this.options.defaultData || {};
    _this.options.initData = _this.options.initData || _this.options.defaultData;
    _this.options.trackState = Boolean(_this.options.trackState);
    _this.options.noticeChangeError = _this.options.noticeChangeError !== false;
    return _this;
  }

  // interface
  // -------------------------
  /**
   * @property {*} data - 返回请求的数据
   * @readonly
   */


  (0, _createClass3.default)(ActionStateRequest, [{
    key: 'update',


    /**
     * @method
     * @param {ActionStateRequestOptions} [options] - 本次请求的参数，为空使用创建时的参数
     * @param {boolean} [append=false] - 是否是追加数据还是替换之前数据 
     */
    value: function update() {
      var aoptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var options = Object.assign({}, (0, _getOptions2.default)(this.options), (0, _getOptions2.default)(aoptions), append === true || append === false ? { append: append } : {});
      if (this.options.onWillUpdate && this.options.onWillUpdate(options) === false) return;
      this.app.actions.requestFetch(this, options);
    }

    /**
     * 用户设置数据，模拟请求返回的数据
     * @method
     * @param {*} data - 数据
     * @param {boolean} [append=false] - 是否是追加数据还是替换之前数据 
     */

  }, {
    key: 'set',
    value: function set(data, append) {
      app.actions.requestFetchSuccess(this.uuid, data || {}, this.options.initData, append !== undefined ? append : this.options.append, this.options.appendField);
    }

    /**
     * 清除网络数据管理器
     * @method
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.app.actions._requestFetchClear(this.uuid);
      delete ActionStateRequest.maps[this.uuid];
    }

    // state
    /*!
     * return network state data
     * @method
     */

  }, {
    key: '_getState',
    value: function _getState() {
      var state = this.app.getState('request', {});
      return state.fetchResult && state.fetchResult[this.uuid] || {};
    }

    /**
     * 返回请求是否成功完成
     * @method
     * @return {boolean} - 是否成功完成
     */

  }, {
    key: 'getReady',
    value: function getReady() {
      var state = this._getState();
      return state.fetching === false && !state.invalid;
    }

    /**
     * 返回请求的错误信息
     * @method
     * @return {Error|string} - 错误信息或者null
     */

  }, {
    key: 'getError',
    value: function getError() {
      var state = this._getState();
      return state.error;
    }

    // event
    //----------------------------------
    /*!
     * triiger on container start
     * @callback
     */

  }, {
    key: 'onStart',
    value: function onStart() {
      //bnorth use
      if (!this.options.updateOnStart) return;
      this.update();
    }

    /*!
     * triiger on container start
     * @callback
     */

  }, {
    key: 'onResume',
    value: function onResume() {
      //bnorth use
      if (!this.options.updateOnResume) return;
      this.update();
    }

    /*!
     * triiger on container start
     * @callback
     */

  }, {
    key: 'onStop',
    value: function onStop() {
      //bnorth use
      if (this.options.clearOnStop === false) return;
      this.clear();
    }

    /*!
     * triiger on container start
     * @callback
     */

  }, {
    key: 'onFetching',
    value: function onFetching() {
      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var blocking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (blocking) {
        this.app.actions.noticeBlocking(show);
      } else {
        this.app.actions.noticeLoading(show);
      }
    }

    /*!
     * triiger on container start
     * @callback
     * @param {*} result - network data
     * @return {*} - return changed data overrided
     */

  }, {
    key: 'onWillChange',
    value: function onWillChange(result) {
      return this.options.onWillChange && this.options.onWillChange(result);
    }

    /*!
     * triiger on container start
     * @callback
     * @param {*} result - network data
     */

  }, {
    key: 'onDidChange',
    value: function onDidChange(result) {
      return this.options.onDidChange && this.options.onDidChange(result);
    }

    /*!
     * triiger on network error
     * @callback
     * @param {Error|string} error - error info
     * @param {*} result - network data
     */

  }, {
    key: 'onChangeError',
    value: function onChangeError(error, result) {
      this.app.error(error);
      if (this.options.onChangeError && this.options.onChangeError(error, result)) ;
      this.app.actions.noticeMessage(error, { cTheme: 'alert' });
    }
  }, {
    key: 'data',
    get: function get() {
      var state = this.app.getState('request', {});
      return state.fetchResult && state.fetchResult[this.uuid] && state.fetchResult[this.uuid].result || this.options.initData;
    }

    /*!
     * @property {*} state - return data for container state data
     * @readonly
     * @override
     */

  }, {
    key: 'state',
    get: function get() {
      return this.data;
    }

    /*!
     * @property {object} state - return data for container state object
     * @readonly
     * @override
     */

  }, {
    key: 'states',
    get: function get() {
      return !this.options.trackState ? null : {
        state: this._getState()
      };
    }
  }]);
  return ActionStateRequest;
}(_container.ActionState);

// plugin
// ------------------------------------------------------
/**
 * **plugin** name: request dependence: network
 * 提供网络请求与网络请求数据的管理
 * @class
 * @example
 * **使用**
 * // containerCreator 创建
 * container.states.order = app.actionStates.request({resource: 'order', data:{id: 1}});
 * // containerCreator 使用
 * container.states.order.update()
 * // page - 请求数据
 * this.props.state_order
 * // page - 请求状态数据
 * this.props.state_order_state
 */

ActionStateRequest.stateName = 'request';
var RequestFetchFetching = 'RequestFetchFetching';
var RequestFetchInvalid = 'RequestFetchInvalid';
var RequestFetchFetchSuccess = 'RequestFetchFetchSuccess';
var RequestFetchFetchFail = 'RequestFetchFetchFail';
/**
 * 发起获取型请求
 * @method app.actions.requestFetch
 * @param {*} request 
 * @param {*} options 
 */
var requestFetch = function requestFetch(request, options) {
  return function (app) {
    app.actions.requestFetching(request.uuid);
    request.trigger('onFetching', true, options.blocking);

    app.network.fetch(options).then(function (result) {
      request.trigger('onFetching', false, options.blocking);
      var ret = request.trigger('onWillChange', result);
      if (ret) result = ret;
      if (ret === false) return;
      app.actions.requestFetchSuccess(request.uuid, result, options.initData, options.append, options.appendField);
      request.trigger('onDidChange', result);
    }, function (error) {
      request.trigger('onFetching', false, options.blocking);
      app.actions.requestFetchFail(request.uuid, error);
      request.trigger('onChangeError', error);
    }).catch(function (error) {
      request.trigger('onFetching', false, options.blocking);
      app.errorNotice(error);
    });
  };
};
var requestFetching = function requestFetching(uuid) {
  return {
    type: RequestFetchFetching,
    uuid: uuid
  };
};
var requestFetchInvalid = function requestFetchInvalid(uuid) {
  return {
    type: RequestFetchInvalid,
    uuid: uuid
  };
};
var requestFetchSuccess = function requestFetchSuccess(uuid, result, initData, append, appendField) {
  return {
    type: RequestFetchFetchSuccess,
    uuid: uuid,
    result: result,
    initData: initData,
    append: append,
    appendField: appendField
  };
};
var requestFetchFail = function requestFetchFail(uuid, error) {
  return {
    type: RequestFetchFetchFail,
    uuid: uuid,
    error: error
  };
};
var _requestFetchClear = function _requestFetchClear(uuid) {
  return function (app) {
    var state = app.getState('request', {});
    delete state.fetchResult[uuid];
  };
};

/**
 * 发起提交型请求
 * @method app.actions.requestSubmit
 * @param {*} options 
 */
var requestSubmit = function requestSubmit(options) {
  return function (app) {
    if (options.blocking !== false) app.actions.noticeBlocking();

    app.network.operate(options).then(function (result) {
      if (options.blocking !== false) app.actions.noticeBlocking(false);
      if (typeof options.success === "function") {
        options.success(result);
      };
    }, function (error) {
      app.error(error);
      if (options.blocking !== false) app.actions.noticeBlocking(false);
      if (typeof options.error === "function") {
        error = options.error(error) || error;
      };
      if (error && options.notice !== false) app.actions.noticeMessage(error, { cTheme: 'alert' });
    }).catch(function (error) {
      app.error(error);
      if (options.blocking !== false) app.actions.noticeBlocking(false);
      if (options.notice !== false) app.actions.noticeMessage(error, { cTheme: 'alert' });
    });
  };
};

/*!
 * reduxer for request
 * @function reduxerRequestFetch
 */
function reduxerRequestFetch() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { uuid: null, resource: null, fetchResult: {} };
  var action = arguments[1];

  switch (action.type) {
    case RequestFetchFetching:
      return Object.assign({}, state, {
        uuid: action.uuid,
        fetchResult: Object.assign({}, state.fetchResult, (0, _defineProperty3.default)({}, action.uuid, Object.assign({}, state.fetchResult[action.uuid], {
          fetching: true
        })))
      });
    case RequestFetchInvalid:
      return Object.assign({}, state, {
        uuid: action.uuid,
        fetchResult: Object.assign({}, state.fetchResult, (0, _defineProperty3.default)({}, action.uuid, Object.assign({}, state.fetchResult[action.uuid], {
          invalid: true
        })))
      });
    case RequestFetchFetchSuccess:
      var data = state.fetchResult[action.uuid] && state.fetchResult[action.uuid].result || action.initData;
      if (action.append && action.appendField && data) {
        if (Array.isArray(data)) {
          data = Array.concat(data, action.result);
        } else {
          var fileds = Array.isArray(action.appendField) ? action.appendField : typeof action.appendField === 'string' ? [action.appendField] : ['data'];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = fileds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var field = _step.value;

              action.result[field] = Array.concat(data[field] || [], action.result[field] || []);
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

          data = Object.assign({}, data, action.result);
        }
      } else {
        data = action.result;
      }

      return Object.assign({}, state, {
        uuid: action.uuid,
        fetchResult: Object.assign({}, state.fetchResult, (0, _defineProperty3.default)({}, action.uuid, Object.assign({}, state.fetchResult[action.uuid], {
          invalid: false,
          fetching: false,
          result: data
        })))
      });
    case RequestFetchFetchFail:
      return Object.assign({}, state, {
        uuid: action.uuid,
        fetchResult: Object.assign({}, state.fetchResult, (0, _defineProperty3.default)({}, action.uuid, Object.assign({}, state.fetchResult[action.uuid], {
          fetching: false,
          error: action.error
        })))
      });

    default:
      return state;
  }
}

exports.default = {
  name: 'request',
  dependence: 'network',

  init: function init(app) {
    app.actionStates.request = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var uuid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      return _container.ActionState.instance(ActionStateRequest, app, uuid, options);
    };
  },
  onCreateStoreBefore: function onCreateStoreBefore(app) {
    Object.assign(app.actions, {
      requestFetch: requestFetch,
      requestFetching: requestFetching,
      requestFetchSuccess: requestFetchSuccess,
      requestFetchFail: requestFetchFail,
      requestFetchInvalid: requestFetchInvalid,
      _requestFetchClear: _requestFetchClear,
      requestSubmit: requestSubmit
    });

    app.reduxers.request = reduxerRequestFetch;
  }
};
module.exports = exports['default'];