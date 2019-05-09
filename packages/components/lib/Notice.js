"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notice = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _animationFrame = require("@bnorth/rich.css/lib/styles/animationFrame");

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _AnimationFrame = _interopRequireDefault(require("./AnimationFrame"));

var _Icon = require("./Icon");

var _Notice = function Notice(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Notice),
      onClose = _BaseComponent.onClose,
      _onFinished = _BaseComponent.onFinished,
      frameFunc = _BaseComponent.frameFunc,
      _BaseComponent$params = _BaseComponent.params,
      params = _BaseComponent$params === void 0 ? {} : _BaseComponent$params,
      duration = _BaseComponent.duration,
      rewind = _BaseComponent.rewind,
      classNamePre = _BaseComponent.classNamePre,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["onClose", "onFinished", "frameFunc", "params", "duration", "rewind", "classNamePre"]);

  classNamePre = (0, _objectSpread2.default)({
    'position-absolute offset-top-start offset-left-top width-full padding-a-': true
  }, classNamePre);
  return _react.default.createElement(_AnimationFrame.default, {
    play: true,
    rewind: rewind,
    frameFunc: frameFunc,
    params: params,
    onFinished: function onFinished() {
      return rewind && _onFinished && _onFinished();
    }
  }, _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bp-title-bc-flex-sub-flex-extend": true,
    name: "close:x",
    "bp-icon-onClick": onClose,
    "b-icon-bc-padding-a": "xs",
    position: "right",
    "b-style": "solid",
    "b-theme": "mask",
    component: _Icon.PanelIcon,
    classNamePre: classNamePre
  }, props)));
};

_Notice.defaultProps = {};
_Notice.defaultProps.frameFunc = _animationFrame.afPeekTop;
Object.defineProperty(_Notice, "Notice", {
  get: function get() {
    return _Notice;
  },
  set: function set(val) {
    _Notice = val;
  }
});
_Notice.isBnorth = true;
_Notice.defaultProps['b-precast'] = {
  'bp-title-bc-text-weight-': true,
  'bp-title-bc-text-size': 'lg'
};
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
        options._id = app.notice._id || app.router.genPopLayerId(options);
        props.rewind = false;

        props.onClose = function () {
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

        props.rewind = true;

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