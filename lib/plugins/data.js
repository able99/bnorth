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

var _jspath = require('../utils/jspath');

var _jspath2 = _interopRequireDefault(_jspath);

var _getOptions = require('../utils/getOptions');

var _getOptions2 = _interopRequireDefault(_getOptions);

var _validator = require('../utils/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ActionState
// --------------------------------------
/**
 * data 数据管理器的构造参数
 * @class ActionStateDataOptions
 * @property {object|array} [defaultData={}] - 默认数据 
 * @property {object|array} [initData={}] - 初始化数据 
 * @property {object.<string, Rule>} [rules] - 规则键值对
 * @property {string|string[]} [checkOnInputKeys] - 在update 时需要校验的字段列表
 * @property {object|array} [checkErrorMessage] - 检验错误时的提示信息
 * @property {boolean} [noticeChangeError=falae] - 是否检验错误时，显示错误信息
 * @property {boolean} [clearOnStop=true] - 是否在container 停止时，清除数据管理器
 */
/** 
 * 数据将要改变时触发
 * @callback onWillChange
 * @param {object|array} originData - 原始数据
 * @param {object|array} changeData - 更厚的数据
 * @param {string|string[]} key - 需要检验的字段 
 * @return {object|array} - 如果返回则替换为返回的数据 
 */
/**
 * 数据修改后触发
 * @callback onDidChange
 * @param {object|array} originData - 原始数据
 * @param {object|array} changeData - 更厚的数据
 * @param {string|string[]} key - 需要检验的字段 
 */

/**
 * 页面数据的管理与校验
 * @class
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var ActionStateData = function (_ActionState) {
  (0, _inherits3.default)(ActionStateData, _ActionState);

  /**
   * @constructor
   * @param {App} app - App 的单实例
   * @param {string} uuid - 数据管理器的唯一id
   * @param {ActionStateDataOptions} [options] - 参数对象<br />
   */
  function ActionStateData(app, uuid, options) {
    (0, _classCallCheck3.default)(this, ActionStateData);

    /**
     * @property {ActionStateDataOptions} options - 数据管理器配置参数
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ActionStateData.__proto__ || Object.getPrototypeOf(ActionStateData)).call(this, app, uuid));

    _this.options = options;
    _this.options.defaultData = _this.options.defaultData || {};
    _this.options.initData = _this.options.initData || _this.options.defaultData;
    return _this;
  }

  // interface
  // -------------------------
  /**
   * @property {*} data - 管理的数据
   * @readonly
   */


  (0, _createClass3.default)(ActionStateData, [{
    key: 'init',


    /**
     * 初始化所管理的数据
     * @method 
     * @param {*} [data] - 如果设置该参数，则初始化为该数据，否则初始化为起始数据 
     * @param {boolean} [merge=false] - 是否合并之前数据，默认不合并
     */
    value: function init(data) {
      var merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      try {
        var originData = this.data;
        data = data || this.options.defaultData;
        var changeData = merge ? Object.assign({}, this.options.initData, data) : data;

        changeData = this.trigger('onWillChange', changeData, originData) || changeData || this.options.defaultData;
        this.app.actions._dataInit(this.uuid, changeData);
        this.trigger('onDidChange', changeData, originData);
      } catch (e) {
        this.app.errorNotice(e);
      }
    }

    /**
     * 修改管理的数据
     * @method
     * @param {object|array} data - 更新的数据
     * @param {string[]} [key] - 需要校验的字段名 
     * @param {boolean} [merge=true] - 是否合并之前的数据
     */

  }, {
    key: 'update',
    value: function update(data) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      try {
        var originData = this.data;
        var changeData = data || this.options.defaultData;

        changeData = this.trigger('onWillChange', changeData, originData, key) || changeData || this.options.defaultData;
        var invalidate = key && this.checkChangeItem(key, changeData);
        this.app.actions._dataUpdate(this.uuid, invalidate ? originData : changeData, merge, this.options.initData);
        if (!invalidate) this.trigger('onDidChange', changeData, originData, key);
        return true;
      } catch (e) {
        this.app.errorNotice(e);
        return false;
      }
    }

    /**
     * 使用jspath 格式获取数据中的内容
     * @method
     * @param {string} key - 键名或jspath 字符串
     */

  }, {
    key: 'getValue',
    value: function getValue(key) {
      return _jspath2.default.getValue(this.data, key);
    }

    /**
     * 使用jspath 格式设置数据中的内容
     * @method
     * @param {string} key - 键名或jspath 字符串
     * @param {*} value - 数据
     */

  }, {
    key: 'setValue',
    value: function setValue(key, value) {
      if (!key) return false;
      var originData = this.data;
      var changeData = _jspath2.default.setValue(Object.assign({}, originData), key, value);

      return this.update(changeData, key);
    }

    /**
     * 清除数据和当前对象
     * @method
     * @param {boolean} onlyData - 仅仅清除数据
     */

  }, {
    key: 'clear',
    value: function clear(onlyData) {
      this.app.actions._dataClear(this.uuid);
      ActionStateData.deleteInstance[this.uuid];
    }

    // validate
    // ----------------------
    /**
     * 根据设置的规则进行校验
     * @method
     * @param {string|string[]} [keys] - 要检查的字段名列表，默认检查全部字段
     * @return {boolean} - true: 校验出问题
     */

  }, {
    key: 'validate',
    value: function validate(keys) {
      var _this2 = this;

      if (!this.options.rules) return false;

      var rules = {};
      if (Array.isArray(keys)) {
        keys.forEach(function (v) {
          rules[v] = _this2.options.rules[v];
        });
      } else if (typeof keys === 'string') {
        rules[keys] = this.options.rules[keys];
      } else {
        rules = this.options.rules;
      }

      return (0, _validator.checkObject)(this.data, rules, { checkErrorMessage: this.options.checkErrorMessage });
    }

    /**
     * 根据规则校验指定字段
     * @method
     * @param {string} key - 字段名
     * @param {*} data - 数据
     */

  }, {
    key: 'checkChangeItem',
    value: function checkChangeItem(key, data) {
      if (!key || !this.options.rules || !this.options.checkOnInputKeys || this.options.checkOnInputKeys.indexOf(key) < 0) return false;
      var ret = (0, _validator.checkObjectItem)(data, key, this.options.rules[key], { checkErrorMessage: this.options.checkErrorMessage });

      if (ret) {
        if (this.options.noticeChangeError) this.trigger('onChangeError', ret, key);
        return ret;
      } else {
        return null;
      }
    }

    // event
    //----------------------------------
    /*!
     * 页面终止时触发
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
     * 数据将要改变时触发
     * @callback
     * @param {object|array} originData - 原始数据
     * @param {object|array} changeData - 更厚的数据
     * @param {string|string[]} key - 需要检验的字段 
     * @return {object|array} - 如果返回则替换为返回的数据 
     */

  }, {
    key: 'onWillChange',
    value: function onWillChange(originData, changeData, key) {
      return this.options.onWillChange && this.options.onWillChange(originData, changeData, key);
    }

    /*!
     * 数据修改后触发
     * @callback
     * @param {object|array} originData - 原始数据
     * @param {object|array} changeData - 更厚的数据
     * @param {string|string[]} key - 需要检验的字段 
     */

  }, {
    key: 'onDidChange',
    value: function onDidChange(originData, changeData, key) {
      return this.options.onDidChange && this.options.onDidChange(originData, changeData, key);
    }

    /*!
     * 数据校验错误时触发
     * @callback
     * @param {Error|string} message - 错误信息
     * @param {string} field - 错误字段名
     */

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

    /*!
     * @property {*} state - return data for container state
     * @override
     */

  }, {
    key: 'state',
    get: function get() {
      return this.data;
    }
  }]);
  return ActionStateData;
}(_container.ActionState);

// plugin
// ------------------------------------
/**
 * **plugin** name: data dependence: none
 * 页面数据管理器插件，扩展app 的action state 类型，提供页面数据的管理与校验
 * @class dataPlugin
 * @example
 * **使用**
 * // containerCreator
 * container.states.data = app.actionStates.data({});
 * // page - 使用数据
 * this.props.state_data
 * // page - 修改数据
 * this.props.states.data.setValue('x',xxx);
 */

ActionStateData.stateName = 'data';
var DataInit = 'DataInit';
/**
 * 数据初始化
 * @method app.actions._dataInit
 * @param {string} uuid - 数据的uuid
 * @param {object} data - 初始化为该对象
 */
function _dataInit(uuid, data) {
  return {
    type: DataInit,
    uuid: uuid,
    data: data
  };
}

var DataUpdate = 'DataUpdate';
/**
 * 数据更新
 * @method app.actions._dataUpdate
 * @param {string} uuid - 数据的uuid 
 * @param {object} data - 要更新的数据
 * @param {boolean} merge - 更新是否为合并操作
 * @param {object} initData - 在合并操作时，如果原数据为空，采用该初始数据
 */
function _dataUpdate(uuid, data, merge, initData) {
  return {
    type: DataUpdate,
    uuid: uuid,
    data: data,
    merge: merge,
    initData: initData
  };
}

/**
 * @method
 * @param {string} uuid - 数据的uuid
 */
var _dataClear = function _dataClear(uuid) {
  return function (app) {
    var state = app.getState('data', {});
    delete state.datas[uuid];
  };
};

/*!
 * reduxer for action state data
 * @function 
 */
function reduxerData() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { uuid: null, datas: {} };
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
        data = action.data;
      }
      return Object.assign({}, state, {
        uuid: action.uuid,
        datas: Object.assign({}, state.datas, (0, _defineProperty3.default)({}, action.uuid, data))
      });

    default:
      return state;
  }
}

exports.default = {
  name: 'data',

  init: function init(app) {
    /**
     * @method app.actionStates.data
     * @param {ActionStateDataOptions|function} options - 参数，参见ActionStateData 的构造函数
     * @param {string} [uuid=uuid()] - 指定uuid
     */
    app.actionStates.data = function (options, uuid) {
      return _container.ActionState.instance(ActionStateData, app, uuid, options);
    };
  },
  onCreateStoreBefore: function onCreateStoreBefore(app) {
    Object.assign(app.actions, {
      _dataInit: _dataInit,
      _dataUpdate: _dataUpdate,
      _dataClear: _dataClear
    });

    app.reduxers.data = reduxerData;
  }
};
module.exports = exports['default'];