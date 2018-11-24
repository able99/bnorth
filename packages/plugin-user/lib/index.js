"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var User =
/*#__PURE__*/
function () {
  function User(app, _id) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2.default)(this, User);
    this.app = app;
    this._id = _id;
    this.options = (0, _objectSpread2.default)({}, User.options, options);
  } // storage
  // --------------------------


  (0, _createClass2.default)(User, [{
    key: "isLogin",
    value: function isLogin() {
      return Boolean(this.getToken());
    }
  }, {
    key: "getToken",
    value: function getToken() {
      var user = this.data();
      return user.token;
    }
  }, {
    key: "data",
    value: function data() {
      return this.app.storage && this.app.storage.getObj(this.options.userKey) || {};
    }
  }, {
    key: "update",
    value: function update(user) {
      var ret = this.app.storage && this.app.storage.setObj(this.options.userKey, user);
      this.app.event.emit(this.app._id, 'onUserUpdate', user);
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      var ret = this.app.storage && this.app.storage.remove(this.options.userKey);
      this.app.event.emit(this.app._id, 'onUserUpdate');
      return ret;
    } // // info
    // // --------------------------
    // _infoNetwork(data, options) {
    //   return this.app.request.request({
    //     isSubmit: false,
    //     data,
    //     ...options,
    //   });
    // }
    // _infoResult(result, data, options) {
    //   let user = result&&result.data?{...this.data(), ...result.data}:result.data;
    //   this.update(user);
    // }
    // info(data,options) {
    //   options = this.app.utils.getOptions(this.options.info, options);
    //   if(this._infoPrepare) [data, options] = this._infoPrepare(data, options);
    //   return this._infoNetwork(data, options).then(result=>{
    //     if(this._infoResultBefore) result = this._infoResultBefore(result, data, options);
    //     if(result) {
    //       this._infoResult(result, data, options);
    //       if(this._infoResultAfter) result = this._infoResultAfter(result, data, options);
    //       return result;
    //     }else{
    //       if(this._infoError) this._infoError(data, options);
    //       return;
    //     }
    //   })
    // }
    // login
    // --------------------------

  }, {
    key: "_loginNetwork",
    value: function _loginNetwork(data, options) {
      return this.app.request.request((0, _objectSpread2.default)({
        data: data
      }, options));
    }
  }, {
    key: "_loginResult",
    value: function _loginResult(result, data, options) {
      this.update(result && result.data);
    }
  }, {
    key: "_loginNavigator",
    value: function _loginNavigator(result, data, options) {
      this.app.router.restore();
    }
  }, {
    key: "login",
    value: function login(data, options) {
      var _this = this;

      options = this.app.utils.getOptions(this.options.login, options);

      if (this._loginPrepare) {
        var _this$_loginPrepare = this._loginPrepare(data, options);

        var _this$_loginPrepare2 = (0, _slicedToArray2.default)(_this$_loginPrepare, 2);

        data = _this$_loginPrepare2[0];
        options = _this$_loginPrepare2[1];
      }

      return this._loginNetwork(data, options).then(function (result) {
        if (_this._loginResultBefore) result = _this._loginResultBefore(result, data, options);

        if (result) {
          _this._loginResult(result, data, options);

          _this._loginNavigator(result, data, options);

          if (_this._loginResultAfter) result = _this._loginResultAfter(result, data, options);
          return result;
        } else {
          if (_this._loginError) _this._loginError(data, options);
          return;
        }
      });
    } // logout
    // --------------------------

  }, {
    key: "_logoutNetwork",
    value: function _logoutNetwork(data, options) {
      this.app.request.request((0, _objectSpread2.default)({
        data: data
      }, options));
      return Promise.resolve(true);
    }
  }, {
    key: "_logoutResult",
    value: function _logoutResult(result, data, options) {
      this.clear();
    }
  }, {
    key: "_logoutNavigator",
    value: function _logoutNavigator(result, data, options) {
      this.options.logoutToHomeOrLogin ? this.app.router.pushRoot() : this.app.router.pushLogin();
    }
  }, {
    key: "logout",
    value: function logout(data, options) {
      var _this2 = this;

      options = this.app.utils.getOptions(this.options.logout, options);

      if (this._logoutPrepare) {
        var _this$_logoutPrepare = this._logoutPrepare(data, options);

        var _this$_logoutPrepare2 = (0, _slicedToArray2.default)(_this$_logoutPrepare, 2);

        data = _this$_logoutPrepare2[0];
        options = _this$_logoutPrepare2[1];
      }

      this._logoutNetwork(data, options).then(function (result) {
        if (_this2._logoutResultBefore) result = _this2._logoutResultBefore(result, data, options);

        if (result) {
          _this2._logoutResult(result, data, options);

          _this2._logoutNavigator(result, data, options);

          if (_this2._logoutResultAfter) result = _this2._logoutResultAfter(result, data, options);
          return result;
        } else {
          if (_this2._logoutError) _this2._logoutError(data, options);
          return;
        }
      });
    } // navigator
    // --------------------------

  }, {
    key: "pushLogin",
    value: function pushLogin(confirm) {
      var _this3 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this.app.router.pushLogin) return;
      return confirm ? this.toLoginConfirm(function () {
        var _this3$app$router;

        return (_this3$app$router = _this3.app.router).pushLogin.apply(_this3$app$router, args);
      }, confirm) : this.app.router.pushLogin();
    }
  }, {
    key: "replaceLogin",
    value: function replaceLogin(confirm) {
      var _this4 = this;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (!this.app.router.replaceLogin) return;
      return confirm ? this.toLoginConfirm(function () {
        var _this4$app$router;

        return (_this4$app$router = _this4.app.router).replaceLogin.apply(_this4$app$router, args);
      }, confirm) : this.app.router.replaceLogin();
    }
  }, {
    key: "toLoginConfirm",
    value: function toLoginConfirm(cb, confirm) {
      if (confirm) {
        this.app.modal && this.app.modal.show('是否登录？', {
          role: 'prompt',
          onAction: function onAction(index) {
            index >= 1 && cb && cb();
          }
        });
      } else {
        cb && cb();
      }
    }
  }]);
  return User;
}();

User.options = {
  userKey: 'bnorth-keys-user',
  logoutToHomeOrLogin: true,
  info: {
    url: 'user',
    method: 'get'
  },
  login: {
    url: 'user',
    method: 'post'
  },
  logout: {
    url: 'user',
    method: 'delete'
  }
};

var _default = function _default(app) {
  return {
    _id: 'user',
    _dependencies: ['request', 'storage'],
    onPluginMount: function onPluginMount(app, plugin, options) {
      app.User = User;
      app.user = new User(app, plugin._id, options); // app.UserState = class Request extends app.Request {
      //   constructor(app, _id, options) {
      //     super(app, _id, options);
      //     app.event.on(app._id, 'onUserUpdate', user=>{this.update(user)}, this._id);
      //   }
      //   fetch(data, options) {
      //     return this.app.user.info(data, options);
      //   }
      //   data() {
      //     return this.app.user.data();
      //   }
      // }
    },
    onPluginUnmount: function onPluginUnmount(app) {
      delete app.User;
      delete app.user;
    },
    onRouteMatch: function onRouteMatch() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          route = _ref.route;

      if (route && route.checkLogin && !app.user.isLogin()) return function (app) {
        app.router.replaceLogin();
      };
    }
  };
};

exports.default = _default;