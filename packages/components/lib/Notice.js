"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notice = exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Animation = _interopRequireDefault(require("./Animation"));

var _Icon = require("./Icon");

var _Notice = function Notice(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Notice),
      containerProps = _BaseComponent.containerProps,
      onClickClose = _BaseComponent.onClickClose,
      onFinished = _BaseComponent.onFinished,
      transitionProps = _BaseComponent.transitionProps,
      animationProps = _BaseComponent.animationProps,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["containerProps", "onClickClose", "onFinished", "transitionProps", "animationProps"]);

  var classNamePreContainer = 'position-absolute offset-top-start offset-left-top width-full';
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    className: classNamePreContainer
  }, containerProps), _react.default.createElement(_Animation.default, (0, _extends2.default)({
    type: "collapse",
    "bc-width-full": true,
    onFinished: onFinished,
    transitionProps: transitionProps
  }, animationProps), _react.default.createElement(_Icon.PanelIcon, (0, _extends2.default)({
    "bp-title-bc-flex-sub-flex-extend": true,
    name: "close:x",
    "bp-icon-onClick": onClickClose,
    "b-icon-bc-padding-a-xs": true,
    "bc-width-full": true,
    "bc-padding-a-": true,
    position: "right",
    "b-style": "solid",
    "b-theme": "mask"
  }, props))));
};

_Notice.defaultProps = {};
_Notice.defaultProps['b-precast'] = {
  'bp-title-bc-text-weight-': true,
  'bp-title-bc-text-size': 'lg'
};
Object.defineProperty(_Notice, "Notice", {
  get: function get() {
    return _Notice;
  },
  set: function set(val) {
    _Notice = val;
  }
});
var _default = _Notice;
exports.default = _default;
var notice = {
  _id: 'notice',
  onPluginMount: function onPluginMount(app) {
    app.notice = {
      _timer: undefined,
      show: function show(message) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$timeout = _ref.timeout,
            timeout = _ref$timeout === void 0 ? 3000 : _ref$timeout,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            props = (0, _objectWithoutProperties2.default)(_ref, ["timeout", "options"]);

        message = app.utils.message2String(message);
        if (!message) return;

        var _id = app.notice._id || app.router.genPopLayerId(options);

        options._id = _id;
        props.in = true;

        props.onClickClose = function () {
          return app.notice.close();
        };

        props.children = message;
        if (app.notice._timer) window.clearTimeout(app.notice._timer);
        app.notice._timer = window.setTimeout(function () {
          return app.notice.close();
        }, timeout);
        return app.notice._id = app.router.addPopLayer(_react.default.createElement(_Notice, null), props, options);
      },
      close: function close() {
        if (app.notice._timer) {
          window.clearTimeout(app.notice._timer);
          app.notice._timer = undefined;
        }

        if (!app.notice._id) return;

        var _ref2 = app.router.getPopLayerInfo(app.notice._id) || {},
            content = _ref2.content,
            _ref2$props = _ref2.props,
            props = _ref2$props === void 0 ? {} : _ref2$props,
            _ref2$options = _ref2.options,
            options = _ref2$options === void 0 ? {} : _ref2$options;

        if (!content) {
          app.notice._id = undefined;
          return;
        }

        props.in = false;

        props.onFinished = function () {
          app.router.removePopLayer(app.notice._id);
          app.notice._id = undefined;
        };

        return app.router.addPopLayer(content, props, options);
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
        'b-theme': options['b-theme'] || 'alert'
      }));
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    app.render.notice = app.notice._oldNotice;
    app.render.error = app.notice._oldErrorNotice;
    delete app.notice;
  }
};
exports.notice = notice;