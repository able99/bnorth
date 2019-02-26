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

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _Panel = _interopRequireWildcard(require("./Panel"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = require("./Icon");

var _this = void 0;

var Modal = function Modal(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, Modal),
      role = _BaseComponent.role,
      handleAction = _BaseComponent.handleAction,
      _BaseComponent$in = _BaseComponent.in,
      isIn = _BaseComponent$in === void 0 ? true : _BaseComponent$in,
      onFinished = _BaseComponent.onFinished,
      containerProps = _BaseComponent.containerProps,
      headerProps = _BaseComponent.headerProps,
      title = _BaseComponent.title,
      titleProps = _BaseComponent.titleProps,
      close = _BaseComponent.close,
      closeProps = _BaseComponent.closeProps,
      bodyProps = _BaseComponent.bodyProps,
      footerProps = _BaseComponent.footerProps,
      _BaseComponent$button = _BaseComponent.buttons,
      buttons = _BaseComponent$button === void 0 ? Modal.buttons[aprops.role] || [] : _BaseComponent$button,
      children = _BaseComponent.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["role", "handleAction", "in", "onFinished", "containerProps", "headerProps", "title", "titleProps", "close", "closeProps", "bodyProps", "footerProps", "buttons", "children"]);

  children = typeof children === 'function' ? children(_this) : children;
  var classNamePre = {
    'position-relative backface-hidden overflow-a-hidden bg-color-white': true,
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
  var classNamePreHeader = 'width-full padding-a- border-set-bottom- flex-display-block flex-justify-between flex-align-center';
  var classNamePreTitle = {
    'flex-sub-flex-grow text-weight-bold text-size-lg': true,
    'text-align-center': !close
  };
  var classNamePreFooter = {
    'border-set-top-': children
  };
  children = _react.default.createElement(_Panel.default, (0, _extends2.default)({
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    stylePre: role !== 'document' && stylePre,
    classNamePre: role !== 'document' && classNamePre
  }, props), role === 'document' ? children : null, role !== 'document' && (title || close) ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    classNamePre: classNamePreHeader
  }, headerProps), title ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    classNamePre: classNamePreTitle
  }, titleProps), title) : null, close ? _react.default.createElement(_Icon.PanelIcon, (0, _extends2.default)({
    inline: true,
    "bc-cursor-pointer": true,
    onClick: handleAction,
    name: "close",
    defaultName: "x"
  }, closeProps), close === true ? undefined : close) : null) : null, role !== 'document' && children ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-padding-a-": true
  }, bodyProps), children) : null, role !== 'document' && buttons.length ? _react.default.createElement(_Panel.PanelContainer, (0, _extends2.default)({
    type: "justify",
    noOverlap: true,
    classNamePre: classNamePreFooter
  }, footerProps), buttons.map(function (v, i) {
    return _react.default.createElement(_Panel.default, (0, _extends2.default)({
      component: _Button.default,
      key: i,
      "b-style": "hollow",
      "bc-bg-none-": true,
      onClick: function onClick() {
        return handleAction && handleAction(i);
      }
    }, v));
  })) : null);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    componentTransform: _Backdrop.default,
    handleAction: handleAction,
    in: isIn,
    onFinished: onFinished,
    classNamePre: classNamePreContainer
  }, containerProps), children);
};

exports.Modal = Modal;
Modal.buttons = {
  alert: [{
    children: '确定'
  }],
  prompt: [{
    children: '取消'
  }, {
    children: '确定'
  }]
};
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
        return app.router.addPopLayer(_react.default.createElement(Modal, null), props, options);
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