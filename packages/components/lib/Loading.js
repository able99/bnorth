"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Loading = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Loader = _interopRequireDefault(require("./Loader"));

var _Loading = function Loading(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Loading),
      progress = _BaseComponent.progress,
      height = _BaseComponent.height,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["progress", "height"]);

  var classNamePre = 'position-absolute offset-left-start offset-top-start offset-right-start width-full';
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: _Loader.default,
    type: "line",
    isProgress: true,
    progress: progress,
    classNamePre: classNamePre,
    "bs-height": height
  }, props));
};

exports.Loading = _Loading;
_Loading.defaultProps = {};
_Loading.defaultProps.height = 3;
Object.defineProperty(_Loading, "Loading", {
  get: function get() {
    return _Loading;
  },
  set: function set(val) {
    exports.Loading = _Loading = val;
  }
});
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

        var _ref = app.router.getPopLayerInfo(app.loading._id) || {},
            content = _ref.content,
            _ref$props = _ref.props,
            props = _ref$props === void 0 ? {} : _ref$props,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;

        if (!content) {
          app.loading._id = app.router.addPopLayer(_react.default.createElement(_Loading, {
            timeout: app.loading.timeoutSet,
            isProgress: true,
            progress: progress
          }), aprops, aoptions);
        } else {
          app.loading._id = app.router.addPopLayer(content, (0, _objectSpread2.default)({}, props, aprops, {
            progress: progress,
            timeout: app.loading.timeoutSet
          }), (0, _objectSpread2.default)({}, options, aoptions));
        }

        setTimeout(function () {
          var _ref2 = app.router.getPopLayerInfo(app.loading._id) || {},
              content = _ref2.content,
              _ref2$props = _ref2.props,
              props = _ref2$props === void 0 ? {} : _ref2$props,
              _ref2$options = _ref2.options,
              options = _ref2$options === void 0 ? {} : _ref2$options;

          if (content) {
            props.progress = 100;
            props.timeout = app.loading.timeoutPrgress;
            app.loading._id = app.router.addPopLayer(content, props, options);
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
            app.router.removePopLayer(app.loading._id);
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