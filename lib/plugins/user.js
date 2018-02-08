'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _md = require('../utils/md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 用户信息与鉴权
 * @class
 */
var User = function () {
  /**
   * @constructor
   * @param {APp} app - App 单实例
   */
  function User(app) {
    (0, _classCallCheck3.default)(this, User);

    this.app = app;
  }

  // user state
  // ---------------------------------
  /**
   * 更新用户信息与登录状态
   * @method
   */


  (0, _createClass3.default)(User, [{
    key: 'update',
    value: function update() {
      this.state().update();
    }

    /**
     * 是否已登录
     * @method
     * @return {boolean} - 是否登录 
     */

  }, {
    key: 'isLogin',
    value: function isLogin() {
      var user = this.load();
      return Boolean(user && user.token);
    }

    /**
     * 获取或更新用户信息成功的处理函数，信息追加的方式保存到用户缓存中
     * @method
     * @param {*} result - 用户信息
     */

  }, {
    key: '_stateSuccess',
    value: function _stateSuccess(result) {
      this.save(Object.assign(this.load(), result || {}));
    }

    /**
     * 获取或更新用户信息失败的处理函数
     * @method
     * @param {Error|string} error - 错误信息
     */

  }, {
    key: '_stateError',
    value: function _stateError(error) {}

    /**
     * 获取用户信息的网络接口地址
     * @method
     * @return {string} - 接口地址
     */

  }, {
    key: '_getInfoUrl',
    value: function _getInfoUrl() {
      var authUrl = this.app.config.login.urls['info'];;
      return this.app.config.urls.base + this.app.config.urls.api + authUrl;
    }

    /**
     * 返回用户信息请求的ActionState，uuid 为user，可添加到container states 中，获取与跟踪用户信息数据
     * @method
     * @return {ActionStateRequest} - request state
     */

  }, {
    key: 'state',
    value: function state() {
      var _this = this;

      return this.app.actionStates.request && this.app.actionStates.request({
        updateOnStart: true,
        clearOnStop: false,
        resource: this._getInfoUrl(),
        onWillUpdate: function onWillUpdate() {
          return _this.isLogin();
        },
        onWillChange: function onWillChange(result) {
          _this._stateSuccess(result);
        },
        onChangeError: function onChangeError(error) {
          _this._stateError(error);
        }
      }, "user");
    }

    // user info
    // --------------------------------
    /**
     * 返回缓存的用户token
     * @method
     * @return {string} - token
     */

  }, {
    key: 'getToken',
    value: function getToken() {
      var user = this.load();
      return user ? user.token : "";
    }

    /**
     * 返回缓存用户信息
     * @method
     * @return {object} - 用户信息
     */

  }, {
    key: 'load',
    value: function load() {
      return this.app.storage && this.app.storage.getObj(this.app.config.keys.user) || {};
    }

    /**
     * 替换缓存的用户信息
     * @method
     * @param {object} user - 用户信息 
     */

  }, {
    key: 'save',
    value: function save(user) {
      return this.app.storage && this.app.storage.setObj(this.app.config.keys.user, user);
    }

    /**
     * 清除缓存的用户信息
     * @method
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.state().clear();
      return this.app.storage && this.app.storage.remove(this.app.config.keys.user);
    }

    // user login
    // ---------------------------

  }, {
    key: '_getLoginUrl',
    value: function _getLoginUrl(data, options) {
      if (typeof options === 'string') return options;

      var _ref = options || {},
          _ref$type = _ref.type,
          type = _ref$type === undefined ? this.app.config.login.types[0].type : _ref$type;

      var authUrl = this.app.config.login.urls[type];
      return this.app.config.urls.base + this.app.config.urls.api + authUrl;
    }
  }, {
    key: '_getLoginMethod',
    value: function _getLoginMethod(data, options) {
      return 'post';
    }
  }, {
    key: '_getPasswordCrypto',
    value: function _getPasswordCrypto(password) {
      return (0, _md2.default)(password);
    }
  }, {
    key: '_getLoginData',
    value: function _getLoginData(data, options) {
      var _this2 = this;

      var _ref2 = options || {},
          fields = _ref2.fields,
          _ref2$data = _ref2.data,
          adata = _ref2$data === undefined ? {} : _ref2$data;

      var ret = {};

      if (fields) {
        fields.forEach(function (v) {
          ret[v.type] = v.crypto ? _this2._getPasswordCrypto(data[v.type]) : data[v.type];
        });
      } else {
        ret = data;
      }

      return Object.assign(ret, adata || {});
    }
  }, {
    key: '_loginBefore',
    value: function _loginBefore(data, options) {
      return [data, options];
    }
  }, {
    key: '_loginRequest',
    value: function _loginRequest(data, options) {
      var _this3 = this;

      var _ref3 = options || {},
          type = _ref3.type,
          fields = _ref3.fields,
          success = _ref3.success,
          adata = _ref3.data,
          params = (0, _objectWithoutProperties3.default)(_ref3, ['type', 'fields', 'success', 'data']);

      this.app.actions.requestSubmit && this.app.actions.requestSubmit((0, _extends3.default)({
        resource: this._getLoginUrl(data, options),
        method: this._getLoginMethod(data, options),
        data: this._getLoginData(data, options),
        noAuth: true,
        success: function success(result) {
          _this3._loginSuccess(result, options);
        }
      }, params));
    }
  }, {
    key: '_loginSuccess',
    value: function _loginSuccess(result, options) {
      var _ref4 = options || {},
          success = _ref4.success;

      if (success && success(result, options)) return;
      this.app.trigger('onUserUpdate', result);
      result = this._loginAfter(result, options) || result;
      this._loginNavigate(result, options);
    }
  }, {
    key: '_loginAfter',
    value: function _loginAfter(result, options) {
      this.save(result);
    }
  }, {
    key: '_loginNavigate',
    value: function _loginNavigate(result, options) {
      this.app.navigator && this.app.navigator.recall();
    }
    /**
     * 用户登录
     * @method
     * @param {object} data - 登录的参数 
     * @param {object} options -  登录的配置
     */

  }, {
    key: 'login',
    value: function login(data, options) {
      this._loginRequest.apply(this, (0, _toConsumableArray3.default)(this._loginBefore(data, options)));
    }

    // user logout
    //===========

  }, {
    key: '_getLogoutUrl',
    value: function _getLogoutUrl(data, options) {
      var url = this.app.config.login.urls['logout'] || '';
      return url.indexOf('http') >= 0 ? url : this.app.config.urls.base + this.app.config.urls.api + url;
    }
  }, {
    key: '_getLogoutMethod',
    value: function _getLogoutMethod(data, options) {
      return this.app.config.login.logoutMethod || 'DELETE';
    }
  }, {
    key: '_getLogoutData',
    value: function _getLogoutData(data, options) {
      return data || this.app.config.login.logoutData || {};
    }
  }, {
    key: '_logoutNetwork',
    value: function _logoutNetwork(data, options) {
      this.app.actions.requestSubmit && this.app.actions.requestSubmit((0, _extends3.default)({
        resource: this._getLogoutUrl(data, options),
        method: this._getLogoutMethod(data, options),
        data: this._getLogoutData(data, options)
      }, options || {}));
    }
  }, {
    key: '_logoutAfter',
    value: function _logoutAfter(data, options) {
      this.clear();
    }
  }, {
    key: '_logoutNavigate',
    value: function _logoutNavigate(data, options) {
      if (this.app.navigator) {
        this.app.config.login.logoutToLoginOrHome ? this.app.navigator.goLogin() : this.app.navigator.goHome();
      }
    }

    /**
     * 用户登出
     * @method
     * @param {object} data - 登出参数
     * @param {object} options - 参数 
     */

  }, {
    key: 'logout',
    value: function logout(data, options) {
      this._logoutNetwork(data, options);
      this._logoutAfter(data, options);
      this.app.trigger('onUserUpdate', {});
      this._logoutNavigate(data, options);
    }
  }]);
  return User;
}();

/**
 * **plugin** name: user dependence: request, navigator, storage event: onUserUpdate handle: onNavigating
 * 用户信息与鉴权的能力扩展
 * @class userPlugin
 * @property {class} app.User - User 类
 * @property {User} app.user - User 类实例
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

exports.default = {
  name: 'user',
  dependence: ['request', 'navigator', 'storage'],

  init: function init(app) {
    app.User = User;
    app.user = new User(app);
  },
  onNavigating: function onNavigating(app, nextState) {
    if (nextState.routes.find(function (v) {
      return v.checkLogin;
    }) && !app.user.isLogin()) {
      return typeof app.config.paths.Login === 'string' ? app.config.paths.Login : app.config.paths.Login.path;
    }
  }
};
module.exports = exports['default'];