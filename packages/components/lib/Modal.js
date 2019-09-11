"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.modal = exports.default = void 0;

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

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireWildcard(require("./Panel"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _Icon = require("./Icon");

var _Button = _interopRequireDefault(require("./Button"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var _Modal = function Modal(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Modal),
      type = _BaseComponent.type,
      rewind = _BaseComponent.rewind,
      onClose = _BaseComponent.onClose,
      onFinished = _BaseComponent.onFinished,
      onAction = _BaseComponent.onAction,
      containerProps = _BaseComponent.containerProps,
      headerProps = _BaseComponent.headerProps,
      title = _BaseComponent.title,
      close = _BaseComponent.close,
      bodyProps = _BaseComponent.bodyProps,
      footerProps = _BaseComponent.footerProps,
      buttons = _BaseComponent.buttons,
      classNamePre = _BaseComponent.classNamePre,
      stylePre = _BaseComponent.stylePre,
      children = _BaseComponent.children,
      app = _BaseComponent.app,
      _id = _BaseComponent._id,
      poplayer = _BaseComponent.poplayer,
      info = _BaseComponent.info,
      states = _BaseComponent.states,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["type", "rewind", "onClose", "onFinished", "onAction", "containerProps", "headerProps", "title", "close", "bodyProps", "footerProps", "buttons", "classNamePre", "stylePre", "children", "app", "_id", "poplayer", "info", "states"]);

  buttons = buttons[type] || [];
  children = typeof children === 'function' ? children(_objectSpread({}, props, {
    app: app,
    _id: _id,
    poplayer: poplayer,
    info: info,
    states: states
  })) : children;
  classNamePre = _objectSpread({
    'position-relative backface-hidden overflow-a-hidden': true,
    'square-full': type === 'popup',
    'border-radius-': type !== 'popup' && type !== 'document'
  }, classNamePre);
  stylePre = _objectSpread({
    width: type !== 'popup' ? '80%' : undefined
  }, stylePre);
  var classNamePreContainer = {
    'flex-display-block': type !== 'document',
    'flex-justify-center': type !== 'document',
    'flex-align-center': type !== 'document'
  };
  children = _react.default.createElement(_Panel.default, (0, _extends2.default)({
    onClick: function onClick(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    btn: false,
    "b-style": "white",
    stylePre: type !== 'document' && stylePre,
    classNamePre: type !== 'document' && classNamePre
  }, props), type === 'document' ? children : null, type !== 'document' && (title || close) ? _react.default.createElement(_Icon.PanelIcon, (0, _extends2.default)({
    "bp-title-bc-flex-sub-flex-extend": true,
    "bp-title-bc-text-align-center": !close,
    name: close === true ? "close:x" : close,
    "bp-icon-onClick": onClose,
    "b-icon-bc-padding-a": "xs",
    "bc-border-set-bottom-": Boolean(children || buttons.length),
    "bc-width-full": true,
    "bc-padding-a-": true,
    position: "right"
  }, headerProps), title) : null, type !== 'document' && children ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-padding-a-": true,
    "bc-border-set-bottom-": Boolean(buttons.length)
  }, bodyProps), children) : null, type !== 'document' && buttons.length ? _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
    ctype: "justify"
  }, footerProps), buttons.map(function (v, i) {
    return _react.default.createElement(_Panel.default, (0, _extends2.default)({
      key: i,
      component: _Button.default,
      className: "bg-none- border-none-top- border-none-bottom- border-none-right-",
      "bc-border-set-left-": Boolean(i),
      "bc-border-none-left-": !Boolean(i),
      onClick: function onClick(e) {
        e.stopPropagation();
        onClose && onClose(i);
      }
    }, v));
  })) : null);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: _Backdrop.default,
    duration: 100,
    rewind: rewind,
    btn: false,
    onClick: onClose,
    onFinished: onFinished,
    classNamePre: classNamePreContainer
  }, containerProps), children);
};

_Modal.defaultProps = {};
_Modal.defaultProps.buttons = {
  alert: [{
    children: '确定'
  }],
  prompt: [{
    children: '取消'
  }, {
    children: '确定'
  }]
};
(0, _defineProperty2.default)(_Modal, "Modal", {
  get: function get() {
    return _Modal;
  },
  set: function set(val) {
    _Modal = val;
  }
});
_Modal.isBnorth = true;
_Modal.defaultProps['b-precast'] = {
  'bp-header-bp-title-bc-text-weight': 'bold'
};
var _default = _Modal;
exports.default = _default;
var modal = {
  _id: 'modal',
  _onStart: function _onStart(app) {
    app.modal = {
      show: function show(content, props) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return options._id = app.Poplayer.addPoplayer(_Modal, _objectSpread({
          children: content,
          onClose: function onClose(index) {
            return app.modal.close(options._id, index);
          }
        }, props), _objectSpread({
          _idPage: app.Page.getPage()._id,
          isModal: true,
          _onStart: function _onStart(app, _id, poplayer) {
            window.history.pushState(null, null, window.location.href);

            poplayer._state_func = function (e) {
              app.modal.close(_id);
              poplayer.popstate = true;
            };

            window.addEventListener('popstate', poplayer._state_func);
          },
          _onStop: function _onStop(app, _id, poplayer) {
            if (!poplayer.popstate) window.history.back();
            window.removeEventListener('popstate', poplayer._state_func);
          }
        }, options));
      },
      close: function close(_id, index) {
        var _ref = app.Poplayer.getPoplayerInfo(_id) || {},
            _ref$props = _ref.props;

        _ref$props = _ref$props === void 0 ? {} : _ref$props;
        var onAction = _ref$props.onAction;
        if (onAction && onAction(index, _id) === false) return;
        return app.modal.remove(_id);
      },
      remove: function remove(_id) {
        return _id && app.Poplayer.addPoplayer(null, {
          rewind: true,
          onFinished: function onFinished() {
            return app.Poplayer.removePoplayer(_id);
          }
        }, {
          _id: _id
        });
      }
    };
    app.modal._modalShow = app.render.modalShow;
    app.modal._modalClose = app.render.modalClose;

    app.render.modalShow = function () {
      var _app$modal;

      return (_app$modal = app.modal).show.apply(_app$modal, arguments);
    };

    app.render.modalClose = function () {
      var _app$modal2;

      return (_app$modal2 = app.modal).close.apply(_app$modal2, arguments);
    };
  },
  _onStop: function _onStop(app) {
    app.render.modalShow = app.modal._modalShow;
    app.render.modalClose = app.modal._modalClose;
    delete app.modal;
  }
};
exports.modal = modal;