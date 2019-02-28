"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Modal = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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
      role = _BaseComponent.role,
      handleAction = _BaseComponent.handleAction,
      onFinished = _BaseComponent.onFinished,
      containerProps = _BaseComponent.containerProps,
      headerProps = _BaseComponent.headerProps,
      title = _BaseComponent.title,
      close = _BaseComponent.close,
      bodyProps = _BaseComponent.bodyProps,
      footerProps = _BaseComponent.footerProps,
      buttons = _BaseComponent.buttons,
      children = _BaseComponent.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["role", "handleAction", "onFinished", "containerProps", "headerProps", "title", "close", "bodyProps", "footerProps", "buttons", "children"]);

  buttons = buttons[role] || [];
  children = typeof children === 'function' ? children(_this) : children;
  var classNamePre = {
    'position-relative backface-hidden overflow-a-hidden': true,
    'square-full': role === 'popup',
    'border-radius-': role !== 'popup' && role !== 'document'
  };
  var stylePre = {
    width: role !== 'popup' ? '80%' : undefined
  };
  var classNamePreContainer = {
    'flex-display-block': role !== 'document',
    'flex-justify-center': role !== 'document',
    'flex-align-center': role !== 'document'
  };
  children = _react.default.createElement(_Panel.default, (0, _extends2.default)({
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    "b-style": "white",
    stylePre: role !== 'document' && stylePre,
    classNamePre: role !== 'document' && classNamePre
  }, props), role === 'document' ? children : null, role !== 'document' && (title || close) ? _react.default.createElement(_Icon.PanelIcon, (0, _extends2.default)({
    "bp-title-bc-flex-sub-flex-extend": true,
    "bp-title-bc-text-weight-bold": true,
    "bp-title-bc-text-size-lg": true,
    "bp-title-bc-text-align-center": !close,
    name: close === true ? "close:x" : close,
    "bp-icon-onClick": handleAction,
    "b-icon-bc-padding-a-xs": true,
    "bc-border-set-bottom-": Boolean(children || buttons.length),
    "bc-width-full": true,
    "bc-padding-a-": true,
    position: "right"
  }, headerProps), title) : null, role !== 'document' && children ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-padding-a-": true,
    "bc-border-set-bottom-": Boolean(buttons.length)
  }, bodyProps), children) : null, role !== 'document' && buttons.length ? _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
    type: "justify"
  }, footerProps), buttons.map(function (v, i) {
    return _react.default.createElement(_Panel.default, (0, _extends2.default)({
      key: i,
      component: _Button.default,
      "b-style": "plain",
      "bc-border-none-left-": Boolean(i),
      "bc-border-set-left-": Boolean(i),
      onClick: function onClick() {
        return handleAction && handleAction(i);
      }
    }, v));
  })) : null);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    componentTransform: _Backdrop.default,
    handleAction: handleAction,
    onFinished: onFinished,
    classNamePre: classNamePreContainer
  }, containerProps), children);
};

exports.Modal = _Modal;
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
    exports.Modal = _Modal = val;
  }
});
var _default = {
  pluginName: 'modal',
  pluginDependence: [],
  onPluginMount: function onPluginMount(app) {
    app.modal = {
      _createContent: function _createContent(_id, Content, state) {
        return typeof Content === 'function' ? app.context.consumerHoc(function () {
          return _react.default.createElement(Content, {
            modalId: _id,
            modalClose: function modalClose() {
              return app.modal.close(_id);
            },
            modalStateData: state && state.data(),
            modalStateDataExt: state && state.extData(),
            modalState: state
          });
        }) : Content;
      },
      show: function show(Content) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            onAction = _ref.onAction,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            state = _ref.state,
            props = (0, _objectWithoutProperties2.default)(_ref, ["onAction", "options", "state"]);

        if (!Content) return;

        var _id = app.router.genPopLayerId(options);

        state = state && app.State.createState(app, state === true ? undefined : state, 'state', _id);
        options._id = _id;
        options.isModal = true;

        options.onAdd = function (_id) {
          return app.keyboard.on(_id, 'keydown', function (e) {
            return e.keyCode === 27 && app.modal.close(_id);
          });
        };

        options.onRemove = function (_id) {
          return app.keyboard.off(_id, 'keydown', function (e) {
            return e.keyCode === 27 && app.modal.close(_id);
          });
        };

        props.in = true;

        props.handleAction = function (index) {
          return (!onAction || onAction(index, state, function () {
            return app.modal.close(_id);
          }, _id) !== false) && app.modal.close(_id);
        };

        props.children = app.modal._createContent(_id, Content, state);
        return app.router.addPopLayer(_react.default.createElement(_Modal, null), props, options);
      },
      update: function update(_id, Content) {
        var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref2$options = _ref2.options,
            options = _ref2$options === void 0 ? {} : _ref2$options,
            state = _ref2.state,
            props = (0, _objectWithoutProperties2.default)(_ref2, ["options", "state"]);

        if (!_id) return;

        var _ref3 = app.router.getPopLayerInfo(_id) || {},
            content = _ref3.content,
            _ref3$prevProps = _ref3.prevProps,
            prevProps = _ref3$prevProps === void 0 ? {} : _ref3$prevProps,
            _ref3$options = _ref3.options,
            prevOptions = _ref3$options === void 0 ? {} : _ref3$options;

        if (!content) return;
        props = (0, _objectSpread2.default)({}, prevProps, props, {
          children: app.modal._createContent(_id, Content, state)
        });
        options = (0, _objectSpread2.default)({}, prevOptions, options);
        return app.router.addPopLayer(content, props, options);
      },
      close: function close(_id) {
        if (!_id) return;

        var _ref4 = app.router.getPopLayerInfo(_id) || {},
            content = _ref4.content,
            props = _ref4.props,
            options = _ref4.options;

        if (!content) return;
        props.in = false;

        props.onTransitionFinished = function () {
          app.router.removePopLayer(_id);
          app.context.clear(_id);
        };

        return app.router.addPopLayer(content, props, options);
      }
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.modal;
  }
};
exports.default = _default;