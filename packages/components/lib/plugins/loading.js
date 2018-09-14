"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _ProgressBar = _interopRequireDefault(require("../ProgressBar"));

var _default = {
  // plugin 
  // --------------------------------
  _id: 'loading',
  onPluginMount: function onPluginMount(app) {
    app.loading = {
      count: 0,
      show: function show() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            props = (0, _objectWithoutProperties2.default)(_ref, ["options"]);

        app.loading.count++;

        if (app.loading.count <= 1) {
          var _id = app.router.getViewId(options);

          options._id = _id;

          props.ref = function (e) {
            return e && (app.loading.ref = e);
          };

          return app.loading._id = app.router.addView(_react.default.createElement(_ProgressBar.default, null), props, options);
        } else {
          return app.loading.reset();
        }
      },
      close: function close(force) {
        app.loading.count = force ? 0 : Math.max(--app.loading.count, 0);

        if (app.loading.count) {
          app.loading.full();
          return;
        }

        var _ref2 = app.router.getView(app.loading._id) || {},
            content = _ref2.content,
            _ref2$props = _ref2.props,
            props = _ref2$props === void 0 ? {} : _ref2$props,
            _ref2$options = _ref2.options,
            options = _ref2$options === void 0 ? {} : _ref2$options;

        if (!content) {
          app.loading._id = undefined;
          app.loading.ref = undefined;
          return;
        }

        props.isClose = true;

        props.onStop = function () {
          app.loading.ref = undefined;
          app.router.removeView(app.loading._id);
          app.loading._id = undefined;
        };

        return app.router.addView(content, props, options);
      },
      reset: function reset() {
        if (!app.loading.ref) return;
        return app.loading.ref.reset();
      },
      full: function full() {
        if (!app.loading.ref) return;
        return app.loading.ref.full();
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