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

var _NoticePoplayer = function NoticePoplayer(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _NoticePoplayer),
      onClose = _BaseComponent.onClose,
      _onFinished = _BaseComponent.onFinished,
      frameFunc = _BaseComponent.frameFunc,
      _BaseComponent$params = _BaseComponent.params,
      params = _BaseComponent$params === void 0 ? {} : _BaseComponent$params,
      duration = _BaseComponent.duration,
      rewind = _BaseComponent.rewind,
      classNamePre = _BaseComponent.classNamePre,
      poplayer = _BaseComponent.poplayer,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["onClose", "onFinished", "frameFunc", "params", "duration", "rewind", "classNamePre", "poplayer"]);

  props.children = typeof props.children === 'function' ? props.children(poplayer) : props.children;
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

_NoticePoplayer.defaultProps = {};
_NoticePoplayer.defaultProps.frameFunc = _animationFrame.afPeekTop;
Object.defineProperty(_NoticePoplayer, "NoticePoplayer", {
  get: function get() {
    return _NoticePoplayer;
  },
  set: function set(val) {
    _NoticePoplayer = val;
  }
});
_NoticePoplayer.isBnorth = true;
_NoticePoplayer.defaultProps['b-precast'] = {
  'bp-title-bc-text-weight-': true,
  'bp-title-bc-text-size': 'lg'
};
var _default = _NoticePoplayer;
exports.default = _default;
var notice = {
  _id: 'notice',
  _onStart: function _onStart(app) {
    app.notice = {
      show: function show(message) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$timeout = _ref.timeout,
            timeout = _ref$timeout === void 0 ? 3000 : _ref$timeout,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            props = (0, _objectWithoutProperties2.default)(_ref, ["timeout", "options"]);

        message = app.utils.message2String(message);
        if (!message) return;
        app.notice._id = app.Poplayer.addPoplayer(_NoticePoplayer, (0, _objectSpread2.default)({
          children: message,
          onClose: function onClose() {
            return app.notice.close();
          }
        }, props), (0, _objectSpread2.default)({}, options, {
          _id: app.notice._id
        }));
        if (app.notice._timer) window.clearTimeout(app.notice._timer);
        app.notice._timer = window.setTimeout(function () {
          return app.notice.close();
        }, timeout);
        return app.notice._id;
      },
      close: function close() {
        if (app.notice._timer) {
          window.clearTimeout(app.notice._timer);
          app.notice._timer = undefined;
        }

        if (!app.notice._id) return;
        return app.Poplayer.addPoplayer(undefined, {
          rewind: true,
          onFinished: function onFinished() {
            app.Poplayer.removePoplayer(app.notice._id);
            app.notice._id = undefined;
          }
        }, {
          _id: app.notice._id
        });
      }
    };
    app.notice._oldNotice = app.render.notice;
    app.notice._oldError = app.render.error;

    app.render.notice = function () {
      var _app$notice;

      return (_app$notice = app.notice).show.apply(_app$notice, arguments);
    };

    app.render.error = function (message, props, options) {
      return app.notice.show(message, (0, _objectSpread2.default)({}, props, {
        'b-theme': 'alert'
      }), options);
    };
  },
  _onStop: function _onStop(app) {
    app.render.notice = app.notice._oldNotice;
    app.render.error = app.notice._oldError;
    delete app.notice;
  }
};
exports.notice = notice;