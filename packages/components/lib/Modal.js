"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _this = void 0;

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
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["type", "rewind", "onClose", "onFinished", "containerProps", "headerProps", "title", "close", "bodyProps", "footerProps", "buttons", "classNamePre", "stylePre", "children"]);

  buttons = buttons[type] || [];
  children = typeof children === 'function' ? children(_this) : children;
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
  pluginName: 'modal',
  pluginDependence: [],
  onPluginMount: function onPluginMount(app) {
    app.modal = {
      show: function show(Content) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            onAction = _ref.onAction,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            props = (0, _objectWithoutProperties2.default)(_ref, ["onAction", "options"]);

        var isNew = true;

        if (options._id) {
          var _ref2 = app.router.getPopLayerInfo(options._id) || {},
              prevContent = _ref2.content,
              _ref2$props = _ref2.props,
              prevProps = _ref2$props === void 0 ? {} : _ref2$props,
              _ref2$options = _ref2.options,
              prevOptions = _ref2$options === void 0 ? {} : _ref2$options;

          Content = Content || prevContent;
          if (!Content) return;
          if (prevContent) isNew = false;
          props = (0, _objectSpread2.default)({}, prevProps, props);
          options = (0, _objectSpread2.default)({}, prevOptions, options);
        }

        if (isNew) {
          if (!options.hasOwnProperty('_idPage')) options._idPage = app.router.getPage()._id;
          if (!options.hasOwnProperty('isModal')) options.isModal = true;
          options._id = app.router.genPopLayerId(options);

          options.onAdd = function (_id) {
            return app.keyboard.on(options._id, 'keydown', function (e) {
              return e.keyCode === 27 && app.modal.close(options._id);
            });
          };

          options.onRemove = function (_id) {
            return app.keyboard.off(options._id, 'keydown', function (e) {
              return e.keyCode === 27 && app.modal.close(options._id);
            });
          };

          props.rewind = false;

          props.onClose = function (index) {
            return app.modal.close(options._id, index);
          };
        }

        if (onAction) options.onAction = onAction;
        var content = typeof Content === 'function' ? function (props) {
          return _react.default.createElement(_Modal, props.props, _react.default.createElement(Content, props));
        } : _react.default.createElement(_Modal, null, Content);

        if (isNew) {
          window.setTimeout(function () {
            return app.router.addPopLayer(content, props, options);
          }, 0);
          return app.router.addPopLayer(_react.default.createElement(_Modal, null), {}, options);
        } else {
          return app.router.addPopLayer(content, props, options);
        }
      },
      close: function close(_id, index) {
        var _ref3 = app.router.getPopLayerInfo(_id) || {},
            _ref3$options = _ref3.options;

        _ref3$options = _ref3$options === void 0 ? {} : _ref3$options;
        var onAction = _ref3$options.onAction;
        if (onAction && onAction(index, _id) === false) return;
        return app.modal.remove(_id);
      },
      remove: function remove(_id) {
        if (!_id) return;

        var _ref4 = app.router.getPopLayerInfo(_id) || {},
            content = _ref4.content,
            props = _ref4.props,
            options = _ref4.options;

        if (!content) return;
        props.rewind = true;

        props.onFinished = function () {
          app.router.removePopLayer(_id);
          app.context.clear(_id);
        };

        return app.router.addPopLayer(content, props, options);
      }
    };
    app.modal._modalShow = app.render.modalShow;
    app.modal._modalClose = app.render.modalClose;

    app.render.modalShow = function (content, options) {
      return app.modal.show(content, options);
    };

    app.render.modalClose = function (_id) {
      return app.modal.close(_id);
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    app.render.modalShow = app.modal._modalShow;
    app.render.modalClose = app.modal._modalClose;
    delete app.modal;
  }
};
exports.modal = modal;