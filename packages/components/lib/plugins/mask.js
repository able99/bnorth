"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Mask = _interopRequireDefault(require("../Mask"));

var _default = {
  // plugin 
  // --------------------------------
  _id: 'mask',
  onPluginMount: function onPluginMount(app) {
    app.mask = {
      show: function show() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            props = (0, _objectWithoutProperties2.default)(_ref, ["options"]);

        var _id = app.mask._id || app.router.getViewId(options);

        options._id = _id;
        options.isModal = true;
        return app.mask._id = app.router.addView(_react.default.createElement(_Mask.default, null), props, options);
      },
      close: function close() {
        var _ref2 = app.router.getView(app.mask._id) || {},
            content = _ref2.content,
            _ref2$props = _ref2.props,
            props = _ref2$props === void 0 ? {} : _ref2$props,
            _ref2$options = _ref2.options,
            options = _ref2$options === void 0 ? {} : _ref2$options;

        if (!content) {
          app.mask._id = undefined;
          return;
        }

        props.in = false;

        props.onExited = function () {
          app.router.removeView(app.mask._id);
          app.mask._id = undefined;
        };

        return app.router.addView(content, props, options);
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