"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _Loading = _interopRequireDefault(require("../Loading"));

var _default = {
  // plugin 
  // --------------------------------
  _id: 'loading',
  onPluginMount: function onPluginMount(app) {
    app.loading = {
      count: 0,
      timeoutPrgress: '20000',
      timeoutSet: '200',
      reset: function reset() {
        var progress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var cb = arguments.length > 1 ? arguments[1] : undefined;
        var aprops = arguments.length > 2 ? arguments[2] : undefined;
        var aoptions = arguments.length > 3 ? arguments[3] : undefined;

        var _ref = app.router.getView(app.loading._id) || {},
            content = _ref.content,
            _ref$props = _ref.props,
            props = _ref$props === void 0 ? {} : _ref$props,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;

        if (!content) {
          app.loading._id = app.router.addView(_react.default.createElement(_Loading.default, {
            timeout: app.loading.timeoutSet,
            isProgress: true,
            progress: progress
          }), aprops, aoptions);
        } else {
          app.loading._id = app.router.addView(content, (0, _objectSpread2.default)({}, props, aprops, {
            progress: progress,
            timeout: app.loading.timeoutSet
          }), (0, _objectSpread2.default)({}, options, aoptions));
        }

        setTimeout(function () {
          var _ref2 = app.router.getView(app.loading._id) || {},
              content = _ref2.content,
              _ref2$props = _ref2.props,
              props = _ref2$props === void 0 ? {} : _ref2$props,
              _ref2$options = _ref2.options,
              options = _ref2$options === void 0 ? {} : _ref2$options;

          if (content) {
            props.progress = 100;
            props.timeout = app.loading.timeoutPrgress;
            app.loading._id = app.router.addView(content, props, options);
            cb && cb();
          }
        }, app.loading.timeoutSet);
        return app.loading._id;
      },
      show: function show() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            options = _ref3.options,
            props = (0, _objectWithoutProperties2.default)(_ref3, ["options"]);

        app.loading.count++;
        return app.loading.reset(0, null, props, options);
      },
      close: function close(force) {
        app.loading.count = force ? 0 : Math.max(--app.loading.count, 0);
        return app.loading.reset(app.loading.count ? 10 : 100, function () {
          if (!app.loading.count) {
            app.router.removeView(app.loading._id);
            app.loading._id = undefined;
          }
        });
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