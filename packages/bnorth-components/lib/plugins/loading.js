"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ProgressBar = _interopRequireDefault(require("../ProgressBar"));

var _default = {
  // plugin 
  // --------------------------------
  pluginName: 'loading',
  pluginDependence: [],
  onPluginMount: function onPluginMount(app) {
    app.loading = {
      count: 0,
      show: function show() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        app.loading.count++;

        if (!app.loading.ref) {
          var $id = app.router.getViewId(options);
          options.$id = $id;

          options.ref = function (e) {
            return e && (app.loading.ref = e);
          };

          return app.loading.$id = app.router.addView(_react.default.createElement(_ProgressBar.default, null), options);
        } else {
          return app.loading.reset();
        }
      },
      reset: function reset() {
        if (!app.loading.ref) return;
        return app.loading.ref.reset();
      },
      full: function full() {
        if (!app.loading.ref) return;
        return app.loading.ref.full();
      },
      close: function close(force) {
        app.loading.count = force ? 0 : Math.max(--app.loading.count, 0);

        if (app.loading.count) {
          app.loading.full();
          return;
        }

        var _ref = app.router.getView(app.loading.$id) || {},
            content = _ref.content,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;

        if (!content) {
          app.loading.$id = undefined;
          app.loading.ref = undefined;
          return;
        }

        options.isClose = true;

        options.onStop = function () {
          app.loading.ref = undefined;
          app.router.removeView(app.loading.$id);
          app.loading.$id = undefined;
        };

        return app.router.addView(content, options);
      }
    };
    app.loading._oldRenderLoading = app.render.loading;

    app.render.loading = function (show, options) {
      return show ? app.loading.show(options) : app.loading.close();
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    app.render.loading = app.loading._oldRenderLoading;
    delete app.loading;
  }
};
exports.default = _default;
module.exports = exports["default"];