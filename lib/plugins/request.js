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

exports.reducerRequestFetch = reducerRequestFetch;

var _uuid = require('../utils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _getOptions = require('../utils/getOptions');

var _getOptions2 = _interopRequireDefault(_getOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// actions 
//==================
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var RequestFetchFetching = 'RequestFetchFetching';
var RequestFetchInvalid = 'RequestFetchInvalid';
var RequestFetchFetchSuccess = 'RequestFetchFetchSuccess';
var RequestFetchFetchFail = 'RequestFetchFetchFail';
var requestFetch = function requestFetch(request, options) {
  return function (app) {
    if (!app.network) {
      request.onChangeError('no network plugin');return;
    }

    app.actions.requestFetching(request.uuid);
    request.onFetching(true, options.blocking);

    app.network.fetch(options).then(function (result) {
      request.onFetching(false, options.blocking);
      var ret = request.onWillChange(result);
      if (ret) result = ret;
      if (ret === false) return;
      app.actions.requestFetchSuccess(request.uuid, result, options.initData, options.append, options.appendField);
      request.onDidChange(result);
    }, function (error) {
      request.onFetching(false, options.blocking);
      app.actions.requestFetchFail(request.uuid, error);
      request.onChangeError(error);
    }).catch(function (error) {
      request.onFetching(false, options.blocking);
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

// action state class
//==================
/**
 * 为app 扩展state 类型，提供网络请求与网络请求数据的管理
 * **插件** 该类为插件类扩展了App 的能力
 * app.actionStates.request: states 的工厂函数
 * @class
 * @example
 * **使用**
 * // container
 * container.states.data = app.actionStates.data({});
 * container.states.xxx = app.actionStates.request({
 *   resource: 'xxx',
 * });
 * // page - 使用数据
 * this.props.state_xxx
 */

var ActionStateRequest = function () {
  function ActionStateRequest(app, uuid, options) {
    (0, _classCallCheck3.default)(this, ActionStateRequest);

    this.app = app;
    this.uuid = uuid;
    this.options = options;
    this.options.defaultData = this.options.defaultData || {};
    this.options.initData = this.options.initData || this.options.defaultData;
    this.options.trackState = Boolean(this.options.trackState);
    this.options.noticeChangeError = this.options.noticeChangeError !== false;

    ActionStateRequest.maps[uuid] = this;
  }

  // interface
  // -------------------------


  (0, _createClass3.default)(ActionStateRequest, [{
    key: 'update',
    value: function update() {
      var aoptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var options = Object.assign({}, (0, _getOptions2.default)(this.options), (0, _getOptions2.default)(aoptions), append === true || append === false ? { append: append } : {});
      if (this.options.onWillUpdate && this.options.onWillUpdate(options) === false) return;
      this.app.actions.requestFetch(this, options);
    }
  }, {
    key: 'set',
    value: function set(data) {
      app.actions.requestFetchSuccess(this.uuid, data || {}, this.options.initData, this.options.append, this.options.appendField);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.app.actions._requestFetchClear(this.uuid);
      delete ActionStateRequest.maps[this.uuid];
    }

    // state

  }, {
    key: '_getState',
    value: function _getState() {
      var state = this.app.getState('request', {});
      return state.fetchResult && state.fetchResult[this.uuid] || {};
    }
  }, {
    key: 'getReady',
    value: function getReady() {
      var state = this._getState();
      return state.fetching === false && !state.invalid;
    }
  }, {
    key: 'getError',
    value: function getError() {
      var state = this._getState();
      return state.error;
    }

    // event
    //----------------------------------

  }, {
    key: 'onStart',
    value: function onStart() {
      //bnorth use
      if (!this.options.updateOnStart) return;
      this.update();
    }
  }, {
    key: 'onResume',
    value: function onResume() {
      //bnorth use
      if (!this.options.updateOnResume) return;
      this.update();
    }
  }, {
    key: 'onStop',
    value: function onStop() {
      //bnorth use
      if (this.options.clearOnStop === false) return;
      this.clear();
    }
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
  }, {
    key: 'onWillChange',
    value: function onWillChange(result) {
      return this.options.onWillChange && this.options.onWillChange(result);
    }
  }, {
    key: 'onDidChange',
    value: function onDidChange(result) {
      return this.options.onDidChange && this.options.onDidChange(result);
    }
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
  }, {
    key: 'state',
    get: function get() {
      //bnorth use
      return this.data;
    }
  }, {
    key: 'states',
    get: function get() {
      //bnorth use
      return {
        state: this._getState()
      };
    }
  }]);
  return ActionStateRequest;
}();

// reducer 
//==================


ActionStateRequest.maps = {};
function reducerRequestFetch() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    uuid: null,
    resource: null,
    fetchResult: {}
  };
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

// export
//==================
exports.default = {
  init: function init(app) {
    app.actionStates.request = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var uuid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (typeof options === 'string') uuid = options;
      uuid = uuid || (0, _uuid2.default)();
      if (uuid && ActionStateRequest.maps[uuid]) return ActionStateRequest.maps[uuid];
      return new ActionStateRequest(app, uuid, (0, _getOptions2.default)(options));
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

    app.reducers.request = reducerRequestFetch;
  }
};