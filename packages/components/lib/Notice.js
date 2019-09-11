"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.notice = exports.default = void 0;

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _animationFrame = require("@bnorth/rich.css/lib/styles/animationFrame");

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _AnimationFrame = _interopRequireDefault(require("./AnimationFrame"));

var _Icon = require("./Icon");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

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
  classNamePre = _objectSpread({
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
(0, _defineProperty2.default)(_NoticePoplayer, "NoticePoplayer", {
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
        app.notice._id = app.Poplayer.addPoplayer(_NoticePoplayer, _objectSpread({
          children: message,
          onClose: function onClose() {
            return app.notice.close();
          }
        }, props), _objectSpread({}, options, {
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
      return app.notice.show(message, _objectSpread({}, props, {
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