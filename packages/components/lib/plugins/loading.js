"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Loading = _interopRequireDefault(require("../Loading"));

var _default = {
  // plugin 
  // --------------------------------
  _id: 'loading',
  onPluginMount: function onPluginMount(app) {
    app.loading = {
      count: 0,
      _interval: 200,
      _timerout: 10000,
      _progress: 0,
      _timer: null,
      _timerClose: null,
      _handleInterval: function _handleInterval() {
        app.loading._progress +=
        /*Math.random()**/
        100 / (app.loading._timerout / app.loading._interval);
        app.loading.update();

        if (app.loading._progress >= 100) {
          app.loading._progress = 0; // clearInterval(app.loading._timer);
          // app.loading._timer = null;
        }
      },
      update: function update() {
        var progress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : app.loading._progress;
        var aprops = arguments.length > 1 ? arguments[1] : undefined;
        var aoptions = arguments.length > 2 ? arguments[2] : undefined;
        app.loading._progress = progress;
        if (!app.loading._timer && app.loading._timerout) app.loading._timer = setInterval(function () {
          return app.loading._handleInterval();
        }, app.loading._interval);

        var _ref = app.router.getView(app.loading._id) || {},
            content = _ref.content,
            _ref$props = _ref.props,
            props = _ref$props === void 0 ? {} : _ref$props,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;

        if (!content) {
          return app.loading._id = app.router.addView(_react.default.createElement(_Loading.default, {
            timeout: app.loading._interval,
            isProgress: true,
            progress: app.loading._progress
          }), aprops, aoptions);
        } else {
          props.progress = app.loading._progress;
          return app.router.addView(content, props, options);
        }
      },
      show: function show() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$options = _ref2.options;

        _ref2$options = _ref2$options === void 0 ? {} : _ref2$options;
        var _ref2$options$timeout = _ref2$options.timeout,
            timeout = _ref2$options$timeout === void 0 ? 10000 : _ref2$options$timeout,
            options = (0, _objectWithoutProperties2.default)(_ref2$options, ["timeout"]),
            props = (0, _objectWithoutProperties2.default)(_ref2, ["options"]);

        if (app.loading._timerClose) {
          clearTimeout(app.loading._timerClose);
          app.loading._timerClose = null;
        }

        app.loading._timerout = timeout;
        app.loading.count++;
        return app.loading.update(0, props, options);
      },
      close: function close(force) {
        app.loading.count = force ? 0 : Math.max(--app.loading.count, 0);
        var ret = app.loading.full();

        if (!app.loading.count && !app.loading._timerClose) {
          clearInterval(app.loading._timer);
          app.loading._timer = null;
          setTimeout(function () {
            app.router.removeView(app.loading._id);
            app.loading._id = undefined;
          }, app.loading._interval);
        }

        return ret;
      },
      reset: function reset() {
        return app.loading.update(0);
      },
      full: function full() {
        return app.loading.update(100);
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