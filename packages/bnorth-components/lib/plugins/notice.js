"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Notification = _interopRequireDefault(require("../Notification"));

var _default = {
  // plugin 
  // --------------------------------
  pluginName: 'notice',
  pluginDependence: [],
  onPluginMount: function onPluginMount(app) {
    app.notice = {
      show: function show(message) {
        var aoptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        message = app.utils.message2String(message);
        if (!message) return;
        var _aoptions$timeout = aoptions.timeout,
            timeout = _aoptions$timeout === void 0 ? 3000 : _aoptions$timeout,
            options = (0, _objectWithoutProperties2.default)(aoptions, ["timeout"]);
        var $id = app.notice.$id || app.router.getViewId(options);
        options.$id = $id;
        options.in = true;

        options.onClose = function () {
          return app.notice.close();
        };

        options.children = message;
        if (app.notice._timer) window.clearTimeout(app.notice._timer);
        app.notice._timer = window.setTimeout(function () {
          return app.notice.close();
        }, timeout);
        return app.notice.$id = app.router.addView(_react.default.createElement(_Notification.default, null), options);
      },
      close: function close() {
        if (app.notice._timer) {
          window.clearTimeout(app.notice._timer);
          app.notice._timer = undefined;
        }

        if (!app.notice.$id) return;

        var _ref = app.router.getView(app.notice.$id) || {},
            content = _ref.content,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;

        if (!content) {
          app.notice.$id = undefined;
          return;
        }

        options.in = false;

        options.onExited = function () {
          app.router.removeView(app.notice.$id);
          app.notice.$id = undefined;
        };

        return app.router.addView(content, options);
      }
    };
    app.notice._oldNotice = app.render.notice;
    app.notice._oldErrorNotice = app.render.errorNotice;

    app.render.notice = function (message, options) {
      return app.notice.show(message, options);
    };

    app.render.error = function (message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return app.notice.show(message, (0, _objectSpread2.default)({}, options, {
        cTheme: options.cTheme || 'alert'
      }));
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    app.render.notice = app.notice._oldNotice;
    app.render.error = app.notice._oldErrorNotice;
    delete app.notice;
  }
};
exports.default = _default;
module.exports = exports["default"];