'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _md = require('../utils/md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 用户登录与登出操作参数
 * @class UserLoginLogoutOptions
 * @property {ActionStateRequestOptions|NetworkOptions} [requestOption] - 直接传递到request api 参数
 */

/**
 * 用户信息与鉴权
 * @class
 */
var User = function () {
  /**
   * @constructor
   * @param {App} app - App 单实例
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
      return Boolean(this.getToken());
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
      this.app.trigger('onUserUpdate', result);
    }

    /**
     * 获取或更新用户信息失败的处理函数
     * @method
     * @param {Error|string} error - 错误信息
     */

  }, {
    key: '_stateError',
    value: function _stateError(error) {}
  }, {
    key: 'stateName',
    value: function stateName() {
      return 'user';
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

      return this.app.actionStates.request && this.app.actionStates.request((0, _extends3.default)({
        updateOnStart: true,
        clearOnStop: false,
        resource: this.app.config.login.urls['info']
      }, this.app.infoOptions, {
        onWillUpdate: function onWillUpdate() {
          return _this.isLogin();
        },
        onWillChange: function onWillChange(result) {
          _this._stateSuccess(result);
        },
        onChangeError: function onChangeError(error) {
          _this._stateError(error);
        }
      }), this.stateName());
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
    /**
     * 数据加密
     * @method
     * @param {*} value - 要加密的数据
     * @param {*} crypto - 加密方法
     * @param {object} data - 登录数据
     * @param {UserLoginLogoutOptions} options - 参数 
     */

  }, {
    key: '_getCrypto',
    value: function _getCrypto(value, crypto, data, options) {
      return (0, _md2.default)(value);
    }

    /**
     * 返回用户登录数据
     * @method
     * @param {object} data - 登录数据
     * @param {UserLoginLogoutOptions} options - 参数 
     * @return {object} - 登录数据
     */

  }, {
    key: '_getLoginData',
    value: function _getLoginData(data, options) {
      var _this2 = this;

      var _ref = options || {},
          fields = _ref.fields,
          _ref$data = _ref.data,
          adata = _ref$data === undefined ? {} : _ref$data;

      var ret = {};

      if (fields) {
        fields.forEach(function (v) {
          ret[v.type] = v.crypto ? _this2._getCrypto(data[v.type], v.crypto, data, options) : data[v.type];
        });
      } else {
        ret = data;
      }

      return Object.assign(ret, adata || {});
    }

    /**
     * 用户登录之前的操作，可对参数进行修改
     * @method
     * @param {object} data - 登录数据
     * @param {UserLoginLogoutOptions} options - 参数 
     * @return {array} - 返回参数列表
     */

  }, {
    key: '_loginBefore',
    value: function _loginBefore(data, options) {
      return [data, options];
    }

    /**
     * 用户登录接口请求
     * @method
     * @param {object} data - 登录数据
     * @param {UserLoginLogoutOptions} options - 参数 
     */

  }, {
    key: '_loginRequest',
    value: function _loginRequest(data, options) {
      var _this3 = this;

      this.app.actions.request && this.app.actions.request((0, _extends3.default)({
        resource: this.app.config.login.urls[options && options.type || 'login'],
        noAuth: true
      }, this.app.config.login.loginOptions, options && options.requestOptions || {}, {
        data: this._getLoginData(data, options),
        onSuccess: function onSuccess(result) {
          _this3._loginSuccess(result, options);
        }
      }));
    }

    /**
     * 用户登录成功的处理函数
     * @method
     * @param {object} data - 登录数据
     * @param {UserLoginLogoutOptions} options - 参数 
     */

  }, {
    key: '_loginSuccess',
    value: function _loginSuccess(result, options) {
      if (options && options.onSuccess && options.onSuccess(result, options)) return;
      this.app.trigger('onUserUpdate', result);
      result = this._loginAfter(result, options) || result;
      this._loginNavigate(result, options);
    }

    /**
     * 用户登录成功后的操作，保存用户信息
     * @method
     * @param {object} data - 登录数据
     * @param {UserLoginLogoutOptions} options - 参数 
     */

  }, {
    key: '_loginAfter',
    value: function _loginAfter(result, options) {
      this.save(result);
    }

    /**
     * 用户登录成功的跳转操作
     * @method
     * @param {object} data - 登录数据
     * @param {UserLoginLogoutOptions} options - 参数 
     */

  }, {
    key: '_loginNavigate',
    value: function _loginNavigate(result, options) {
      this.app.navigator && this.app.navigator.recall();
    }

    /**
     * 用户登录
     * @method
     * @param {object} data - 登录数据
     * @param {UserLoginLogoutOptions} options - 参数 
     */

  }, {
    key: 'login',
    value: function login(data, options) {
      this._loginRequest.apply(this, (0, _toConsumableArray3.default)(this._loginBefore(data, options)));
    }

    /**
     * 用来显示确实是否登录的操作，默认直接确认了，如果需要显示确认框，需要覆盖该函数，并在用户选择确认时，触发回调函数
     * @method
     * @param {function} cb - 确认时回调函数
     */

  }, {
    key: 'toLoginPrompt',
    value: function toLoginPrompt(cb) {
      cb();
    }

    /**
     * 跳转到登录页面
     * @method
     * @param {boolean} [isForce=true] - 是否直接调转登录，还是弹出确认框
     * @param {boolean} [isReplace=true] - 是否替换当前页面
     */

  }, {
    key: 'toLogin',
    value: function toLogin() {
      var _this4 = this;

      var isForce = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var isReplace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (isForce) {
        this.app.navigator.goLogin(isReplace);
      } else {
        toLoginPrompt(function () {
          return _this4.app.navigator.goLogin(isReplace);
        });
      }
    }

    // user logout
    //===========
    /**
     * 获取登出数据
     * @method
     * @param {object} data - 登出数据
     * @param {UserLoginLogoutOptions} options - 参数 
     */

  }, {
    key: '_getLogoutData',
    value: function _getLogoutData(data, options) {
      return {};
    }

    /**
     * 登出的接口调用
     * @method
     * @param {object} data - 登出数据
     * @param {UserLoginLogoutOptions} options - 参数 
     */

  }, {
    key: '_logoutNetwork',
    value: function _logoutNetwork(data, options) {
      this.app.actions.request && this.app.actions.request((0, _extends3.default)({
        resource: this.app.config.login.urls['logout']
      }, this.app.config.logoutOptions, options && options.requestOptions || {}, {
        data: this._getLogoutData(data, options)
      }));
    }

    /**
     * 登出后操作，清理用户信息等
     * @method
     * @param {object} data - 登出数据
     * @param {UserLoginLogoutOptions} options - 参数 
     */

  }, {
    key: '_logoutAfter',
    value: function _logoutAfter(data, options) {
      this.clear();
    }

    /**
     * 登出后的跳转操作
     * @method
     * @param {object} data - 登出数据
     * @param {UserLoginLogoutOptions} options - 参数 
     */

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
     * @param {object} data - 登出数据
     * @param {UserLoginLogoutOptions} options - 参数 
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
 * **plugin** name: user dependence: request, navigator, storage event: onUserUpdate({*}user) handle: onNavigating
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
    if (app.config.paths.Login !== nextState.location.pathname && nextState.routes.find(function (v) {
      return v.checkLogin;
    }) && !app.user.isLogin()) {
      return typeof app.config.paths.Login === 'string' ? app.config.paths.Login : app.config.paths.Login.path;
    }
  }
};
module.exports = exports['default'];