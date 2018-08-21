"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Mask = _interopRequireDefault(require("../Mask"));

var _default = {
  // plugin 
  // --------------------------------
  pluginName: 'mask',
  pluginDependence: [],
  onPluginMount: function onPluginMount(app) {
    app.mask = {
      show: function show() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var $id = app.mask.$id || app.router.getViewId(options);
        options.$id = $id;
        options.$isModal = true;
        return app.mask.$id = app.router.addView(_react.default.createElement(_Mask.default, null), options);
      },
      close: function close() {
        var _ref = app.router.getView(app.mask.$id) || {},
            content = _ref.content,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;

        if (!content) {
          app.mask.$id = undefined;
          return;
        }

        options.in = false;

        options.onExited = function () {
          app.router.removeView(app.mask.$id);
          app.mask.$id = undefined;
        };

        return app.router.addView(content, options);
      }
    };
    app.mask._oldMask = app.render.mask;

    app.render.mask = function (show, options) {
      return show ? app.mask.show(options) : app.mask.close();
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    app.render.mask = app.mask._oldMask;
    delete app.mask;
  }
};
exports.default = _default;
module.exports = exports["default"];