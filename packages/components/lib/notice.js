"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Notification = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _AnimationCollapse = _interopRequireDefault(require("./AnimationCollapse"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = _interopRequireDefault(require("./Icon"));

var Notification = function Notification(aprops) {
  var _parseProps = (0, _props.default)(aprops, Notification.props),
      onDoClose = _parseProps.onDoClose,
      _parseProps$transitio = _parseProps.transition,
      Transition = _parseProps$transitio === void 0 ? _AnimationCollapse.default : _parseProps$transitio,
      transitionProps = _parseProps.transitionProps,
      onTransitionFinished = _parseProps.onTransitionFinished,
      titleProps = _parseProps.titleProps,
      hasClose = _parseProps.hasClose,
      closeProps = _parseProps.closeProps,
      iconProps = _parseProps.iconProps,
      _parseProps$component = _parseProps.component,
      component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["onDoClose", "transition", "transitionProps", "onTransitionFinished", "titleProps", "hasClose", "closeProps", "iconProps", "component", "className", "children"]);

  var classStr = 'flex-display-block flex-align-center padding-a- position-absolute offset-top-start offset-left-top width-full';
  return _react.default.createElement(Transition, (0, _extends2.default)({
    component: component,
    "b-style": "solid",
    "b-theme": "mask",
    transitionProps: transitionProps,
    onTransitionFinished: onTransitionFinished,
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement(Notification._Title, titleProps, children), _react.default.createElement(Notification._Close, (0, _extends2.default)({
    onDoClose: onDoClose
  }, closeProps), hasClose));
};

exports.Notification = Notification;

Notification._Title = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, Notification._Title.props),
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["component", "className"]);

  var classStr = 'text-weight- text-size-lg flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Notification._Close = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops, Notification._Close.props),
      hasClose = _parseProps3.hasClose,
      onDoClose = _parseProps3.onDoClose,
      iconProps = _parseProps3.iconProps,
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Button.default : _parseProps3$componen,
      className = _parseProps3.className,
      children = _parseProps3.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["hasClose", "onDoClose", "iconProps", "component", "className", "children"]);

  if (!children) return null;
  children = children === true ? _react.default.createElement(_Icon.default, (0, _extends2.default)({
    name: "close",
    defaultName: "x"
  }, iconProps)) : children;
  var classStr = 'padding-h-sm padding-v-0 flex-sub-flex-none';
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-style": "plain",
    "b-theme": "white",
    onClick: onDoClose,
    className: (0, _classes.default)(classStr, className)
  }, props), children);
};

var _default = {
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

        var _id = app.notice._id || app.router.getViewId(options);

        options._id = _id;
        props.in = true;

        props.onDoClose = function () {
          return app.notice.close();
        };

        props.children = message;
        if (app.notice._timer) window.clearTimeout(app.notice._timer);
        app.notice._timer = window.setTimeout(function () {
          return app.notice.close();
        }, timeout);
        return app.notice._id = app.router.addView(_react.default.createElement(Notification, null), props, options);
      },
      close: function close() {
        if (app.notice._timer) {
          window.clearTimeout(app.notice._timer);
          app.notice._timer = undefined;
        }

        if (!app.notice._id) return;

        var _ref2 = app.router.getView(app.notice._id) || {},
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

        props.onTransitionFinished = function () {
          app.router.removeView(app.notice._id);
          app.notice._id = undefined;
        };

        return app.router.addView(content, props, options);
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
exports.default = _default;