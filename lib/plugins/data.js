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

exports.reducerData = reducerData;

var _jspath = require('../utils/jspath');

var _jspath2 = _interopRequireDefault(_jspath);

var _uuid = require('../utils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _getOptions = require('../utils/getOptions');

var _getOptions2 = _interopRequireDefault(_getOptions);

var _validator = require('../utils/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// actions
//==================
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var DataInit = 'DataInit';
function _dataInit(uuid, data) {
  return {
    type: DataInit,
    uuid: uuid,
    data: data
  };
}
var DataUpdate = 'DataUpdate';
function _dataUpdate(uuid, data, merge, initData) {
  return {
    type: DataUpdate,
    uuid: uuid,
    data: data,
    merge: merge,
    initData: initData
  };
}
var _dataClear = function _dataClear(uuid) {
  return function (app) {
    var state = app.getState('data', {});
    delete state.datas[uuid];
  };
};

// action state class
//==================
/**
 * 为app 扩展state 类型，提供页面数据的管理
 * @class
 * @example
 * **使用**
 * // container
 * container.states.data = app.actionStates.data({});
 * // page - 使用数据
 * this.props.state_data
 * // page - 修改数据
 * this.props.states.data.setValue('x',xxx);
 * **hook**
 * 参见Browser hook说明
 */

var ActionStateData = function () {
  function ActionStateData(app, uuid, options) {
    (0, _classCallCheck3.default)(this, ActionStateData);

    this.app = app;
    this.uuid = uuid;
    this.options = options;
    this.options.defaultData = this.options.defaultData || {};
    this.options.initData = this.options.initData || this.options.defaultData;

    ActionStateData.maps[uuid] = this;
  }

  // interface
  // -------------------------


  (0, _createClass3.default)(ActionStateData, [{
    key: 'init',
    value: function init(data) {
      var merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      try {
        var originData = this.data;
        data = data || this.options.defaultData;
        var changeData = merge ? Object.assign({}, this.options.initData, data) : data;

        changeData = this.onWillChange(changeData, originData) || changeData || this.options.defaultData;
        this.app.actions._dataInit(this.uuid, changeData);
        this.onDidChange(changeData, originData);
      } catch (e) {
        this.app.errorNotice(e);
      }
    }
  }, {
    key: 'update',
    value: function update(data) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      try {
        var originData = this.data;
        var changeData = data || this.options.defaultData;

        changeData = this.onWillChange(changeData, originData, key) || changeData || this.options.defaultData;
        var invalidate = key && this.checkChangeItem(key, changeData);
        this.app.actions._dataUpdate(this.uuid, invalidate ? originData : changeData, merge, this.options.initData);
        if (!invalidate) this.onDidChange(changeData, originData, key);
        return true;
      } catch (e) {
        this.app.errorNotice(e);
        return false;
      }
    }
  }, {
    key: 'getValue',
    value: function getValue(key) {
      return _jspath2.default.getValue(this.data, key);
    }
  }, {
    key: 'setValue',
    value: function setValue(key, value) {
      if (!key) return false;
      var originData = this.data;
      var changeData = _jspath2.default.setValue(Object.assign({}, originData), key, value);

      return this.update(changeData, key);
    }
  }, {
    key: 'clear',
    value: function clear(onlyData) {
      this.app.actions._dataClear(this.uuid);
      delete ActionStateData.maps[this.uuid];
    }

    // validate
    // ----------------------

  }, {
    key: 'validate',
    value: function validate(keys) {
      var _this = this;

      if (!this.options.rules) return false;

      var rules = {};
      if (Array.isArray(keys)) {
        keys.forEach(function (v) {
          rules[v] = _this.options.rules[v];
        });
      } else if (typeof keys === 'string') {
        rules[keys] = this.options.rules[keys];
      } else {
        rules = this.options.rules;
      }

      return (0, _validator.checkObject)(this.data, rules, { checkErrorMessage: this.options.checkErrorMessage });
    }
  }, {
    key: 'checkChangeItem',
    value: function checkChangeItem(key, data) {
      if (!key || !this.options.rules || !this.options.checkOnInputKeys || this.options.checkOnInputKeys.indexOf(key) < 0) return false;
      var ret = (0, _validator.checkObjectItem)(data, key, this.options.rules[key], { checkErrorMessage: this.options.checkErrorMessage });

      if (ret) {
        if (this.options.noticeChangeError) this.onChangeError(ret, key);
        return ret;
      } else {
        return null;
      }
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
    key: 'onWillChange',
    value: function onWillChange(originData, changeData, key) {
      return this.options.onWillChange && this.options.onWillChange(originData, changeData, key);
    }
  }, {
    key: 'onDidChange',
    value: function onDidChange(originData, changeData, key) {
      return this.options.onDidChange && this.options.onDidChange(originData, changeData, key);
    }
  }, {
    key: 'onChangeError',
    value: function onChangeError(message, field) {
      if (this.options.noticeChangeError) this.app.errorNotice(message);
    }
  }, {
    key: 'data',
    get: function get() {
      var state = this.app.getState('data', {});
      return state.datas && state.datas[this.uuid] || this.options.initData;
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
      return null;
    }
  }]);
  return ActionStateData;
}();

// reducer
//==================


ActionStateData.maps = {};
function reducerData() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    uuid: null,
    datas: {}
  };
  var action = arguments[1];

  switch (action.type) {
    case DataInit:
      return Object.assign({}, state, {
        uuid: action.uuid,
        datas: Object.assign({}, state.datas, (0, _defineProperty3.default)({}, action.uuid, Array.isArray(action.data) ? Array.from(action.data) : action.data))
      });

    case DataUpdate:
      var data = null;
      if (action.merge) {
        if (Array.isArray(action.data)) {
          data = Array.from(state.datas[action.uuid] || action.initData);
          data = data.concat(action.data);
        } else {
          data = Object.assign({}, state.datas[action.uuid] || action.initData, action.data);
        }
      } else {
        data = Array.from(action.data);
      }
      return Object.assign({}, state, {
        uuid: action.uuid,
        datas: Object.assign({}, state.datas, (0, _defineProperty3.default)({}, action.uuid, data))
      });

    default:
      return state;
  }
}

//==================
// export
//==================
exports.default = {
  init: function init(app) {
    app.actionStates.data = function (options, uuid) {
      if (typeof options === 'string') uuid = options;
      uuid = uuid || (0, _uuid2.default)();
      if (ActionStateData.maps[uuid]) return ActionStateData.maps[uuid];
      return new ActionStateData(app, uuid, (0, _getOptions2.default)(options));
    };
  },
  onCreateStoreBefore: function onCreateStoreBefore(app) {
    Object.assign(app.actions, {
      _dataInit: _dataInit,
      _dataUpdate: _dataUpdate,
      _dataClear: _dataClear
    });

    app.reducers.data = reducerData;
  }
};