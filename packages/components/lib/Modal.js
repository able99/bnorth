"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modal = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireWildcard(require("./Panel"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _Icon = require("./Icon");

var _Button = _interopRequireDefault(require("./Button"));

var _Modal = function Modal(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Modal),
      type = _BaseComponent.type,
      rewind = _BaseComponent.rewind,
      onClose = _BaseComponent.onClose,
      onFinished = _BaseComponent.onFinished,
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
      poplayer = _BaseComponent.poplayer,
      info = _BaseComponent.info,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["type", "rewind", "onClose", "onFinished", "containerProps", "headerProps", "title", "close", "bodyProps", "footerProps", "buttons", "classNamePre", "stylePre", "children", "app", "poplayer", "info"]);

  buttons = buttons[type] || [];
  children = typeof children === 'function' ? children((0, _objectSpread2.default)({}, props, {
    app: app,
    poplayer: poplayer,
    info: info
  })) : children;
  classNamePre = (0, _objectSpread2.default)({
    'position-relative backface-hidden overflow-a-hidden': true,
    'square-full': type === 'popup',
    'border-radius-': type !== 'popup' && type !== 'document'
  }, classNamePre);
  stylePre = (0, _objectSpread2.default)({
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
Object.defineProperty(_Modal, "Modal", {
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
        return options._id = app.Poplayer.addPoplayer(_Modal, (0, _objectSpread2.default)({
          children: content,
          onClose: function onClose(index) {
            return app.modal.close(options._id, index);
          }
        }, props), (0, _objectSpread2.default)({
          _idPage: app.Page.getPage()._id,
          isModal: true
        }, options)); // todo keyboard
      },
      close: function close(_id, index) {
        // todo action
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