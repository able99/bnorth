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
 * 为app 提供用户信息与鉴权的能力扩展
 * @class
 * @example
 * **使用**
 * app.user.xxx
 * **hook**
 * 参见Browser hook说明
 */
var User = function () {
  function User(app) {
    (0, _classCallCheck3.default)(this, User);

    this.app = app;
    this._userUpdateListeners = new Set();
  }

  //===========
  // user state


  (0, _createClass3.default)(User, [{
    key: 'stateSuccess',
    value: function stateSuccess(result) {
      var user = this.storageLoad();
      this.storageSave(Object.assign(user || {}, result || {}));
    }
  }, {
    key: 'stateError',
    value: function stateError(error) {}
  }, {
    key: 'getInfoUrl',
    value: function getInfoUrl() {
      var authUrl = this.app.config.login.urls['info'];;
      return this.app.config.urls.base + this.app.config.urls.api + authUrl;
    }
  }, {
    key: 'state',
    value: function state() {
      var _this = this;

      return this.app.actionStates.request && this.app.actionStates.request({
        updateOnStart: true,
        resource: this.getInfoUrl(),
        onWillUpdate: function onWillUpdate() {
          return _this.isLogin();
        },
        onWillChange: function onWillChange(result) {
          _this.stateSuccess(result);
        },
        onChangeError: function onChangeError(error) {
          _this.stateError(error);
        }
      }, "user");
    }

    //===========
    // user storage

  }, {
    key: 'storageLoad',
    value: function storageLoad() {
      return this.app.storage && this.app.storage.getObj(this.app.config.keys.user);
    }
  }, {
    key: 'storageSave',
    value: function storageSave(user) {
      return this.app.storage && this.app.storage.setObj(this.app.config.keys.user, user);
    }
  }, {
    key: 'storageClear',
    value: function storageClear() {
      return this.app.storage && this.app.storage.remove(this.app.config.keys.user);
    }

    //===========
    // user info

  }, {
    key: 'getToken',
    value: function getToken() {
      var user = this.storageLoad();
      return user ? user.token : "";
    }
  }, {
    key: 'load',
    value: function load() {
      return this.storageLoad() || {};
    }
  }, {
    key: 'save',
    value: function save(user) {
      return this.storageSave(user);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.state().clear();
      this.storageClear();
    }

    //===========
    // user handle

  }, {
    key: 'onUserUpdate',
    value: function onUserUpdate(user) {
      if (!user) return {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._userUpdateListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var listener = _step.value;

          listener(user);
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
    }
  }, {
    key: 'addListener',
    value: function addListener(listener) {
      this._userUpdateListeners.add(listener);
    }
  }, {
    key: 'removeListener',
    value: function removeListener(listener) {
      this._userUpdateListeners.remove(listener);
    }

    //===========
    // user login

  }, {
    key: 'getLoginUrl',
    value: function getLoginUrl(data, options) {
      if (typeof options === 'string') return options;

      var _ref = options || {},
          _ref$type = _ref.type,
          type = _ref$type === undefined ? this.app.config.login.types[0].type : _ref$type;

      var authUrl = this.app.config.login.urls[type];
      return this.app.config.urls.base + this.app.config.urls.api + authUrl;
    }
  }, {
    key: 'getLoginMethod',
    value: function getLoginMethod(data, options) {
      return 'post';
    }
  }, {
    key: 'getLoginData',
    value: function getLoginData(data, options) {
      var _this2 = this;

      var _ref2 = options || {},
          fields = _ref2.fields,
          _ref2$data = _ref2.data,
          adata = _ref2$data === undefined ? {} : _ref2$data;

      var ret = {};

      if (fields) {
        fields.forEach(function (v) {
          ret[v.type] = v.crypto ? _this2.getPasswordCrypto(data[v.type]) : data[v.type];
        });
      } else {
        ret = data;
      }

      return Object.assign(ret, adata || {});
    }
  }, {
    key: 'loginBefore',
    value: function loginBefore(data, options) {
      return [data, options];
    }
  }, {
    key: 'loginRequest',
    value: function loginRequest(data, options) {
      var _this3 = this;

      var _ref3 = options || {},
          type = _ref3.type,
          fields = _ref3.fields,
          _success = _ref3.success,
          adata = _ref3.data,
          params = (0, _objectWithoutProperties3.default)(_ref3, ['type', 'fields', 'success', 'data']);

      this.app.actions.requestSubmit((0, _extends3.default)({
        resource: this.getLoginUrl(data, options),
        method: this.getLoginMethod(data, options),
        data: this.getLoginData(data, options),
        noAuth: true,
        success: function success(result) {
          if (_success && _success(result, options)) return;
          _this3.onUserUpdate(result);
          result = _this3.loginAfter(result, options) || result;
          _this3.loginNavigate(result, options);
        }
      }, params));
    }
  }, {
    key: 'loginSuccess',
    value: function loginSuccess(result, options) {
      var _ref4 = options || {},
          success = _ref4.success;

      if (success && success(result, options)) return;
      this.onUserUpdate(result);
      result = this.loginAfter(result, options) || result;
      this.loginNavigate(result, options);
    }
  }, {
    key: 'loginAfter',
    value: function loginAfter(result, options) {
      this.save(result);
    }
  }, {
    key: 'loginNavigate',
    value: function loginNavigate(result, options) {
      this.app.navigator && this.app.navigator.recall();
    }
  }, {
    key: 'login',
    value: function login(data, options) {
      this.loginRequest.apply(this, (0, _toConsumableArray3.default)(this.loginBefore(data, options)));
    }

    //===========
    // user logout

  }, {
    key: 'getLogoutUrl',
    value: function getLogoutUrl(data, options) {
      var url = this.app.config.login.urls['logout'] || '';
      return url.indexOf('http') >= 0 ? url : this.app.config.urls.base + this.app.config.urls.api + url;
    }
  }, {
    key: 'getLogoutMethod',
    value: function getLogoutMethod(data, options) {
      return this.app.config.login.logoutMethod || 'DELETE';
    }
  }, {
    key: 'getLogoutData',
    value: function getLogoutData(data, options) {
      return data || this.app.config.login.logoutData || {};
    }
  }, {
    key: 'getPasswordCrypto',
    value: function getPasswordCrypto(password) {
      return (0, _md2.default)(password);
    }
  }, {
    key: 'logoutNetwork',
    value: function logoutNetwork(data, options) {
      this.app.actions.requestSubmit((0, _extends3.default)({
        resource: this.getLogoutUrl(data, options),
        method: this.getLogoutMethod(data, options),
        data: this.getLogoutData(data, options)
      }, options || {}));
    }
  }, {
    key: 'logoutAfter',
    value: function logoutAfter(data, options) {
      this.clear();
    }
  }, {
    key: 'logoutNavigate',
    value: function logoutNavigate(data, options) {
      if (this.app.navigator) {
        this.app.config.login.logoutToLoginOrHome ? this.app.navigator.goLogin() : this.app.navigator.goHome();
      }
    }
  }, {
    key: 'logout',
    value: function logout(data, options) {
      this.logoutNetwork(data, options);
      this.logoutAfter(data, options);
      this.onUserUpdate(null);
      this.logoutNavigate(data, options);
    }

    //===========
    // user op

  }, {
    key: 'update',
    value: function update() {
      this.state().update();
    }
  }, {
    key: 'isLogin',
    value: function isLogin() {
      var user = this.load();
      return Boolean(user && user.token);
    }
  }, {
    key: 'getId',
    value: function getId() {
      var user = this.load();
      return user && user._id;
    }
  }, {
    key: 'isAdmin',
    value: function isAdmin() {
      var user = this.load();
      return user && user._role_id;
    }
  }, {
    key: 'checkLogin',
    value: function checkLogin() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var ret = this.isLogin();
      if (!ret) this.toLogin(force, replace);
      return ret;
    }
  }, {
    key: 'toLogin',
    value: function toLogin() {
      var _this4 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (force) {
        this.app.navigator && this.app.navigator.goLogin(replace);
      } else {
        this.app.actions.noticeModal({
          closeBtn: false,
          content: "请登录后操作",
          role: "confirm",
          onAction: function onAction(confirm) {
            if (confirm) {
              _this4.app.navigator && _this4.app.navigator.goLogin(replace);
            }
          }
        });
      }
    }
  }]);
  return User;
}(); /**
      * bnorth solution
      * @copyright (c) 2016 able99
      * @author able99 (8846755@qq.com)
      * @license MIT
      */

exports.default = {
  init: function init(app) {
    app.User = User;
    app.user = new User(app);
  }
};
module.exports = exports['default'];