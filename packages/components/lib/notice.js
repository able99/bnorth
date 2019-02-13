"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Notification = exports.Container = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _BaseComponent5 = _interopRequireDefault(require("./BaseComponent"));

var _AnimationCollapse = _interopRequireDefault(require("./AnimationCollapse"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = _interopRequireDefault(require("./Icon"));

var Container = function Container(aprops) {
  var _BaseComponent = (0, _BaseComponent5.default)(aprops, Container),
      _BaseComponent$compon = _BaseComponent.component,
      Component = _BaseComponent$compon === void 0 ? _Panel.default : _BaseComponent$compon,
      className = _BaseComponent.className,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["component", "className"]);

  var classStr = 'position-absolute offset-top-start offset-left-top width-full';
  return _react.default.createElement(Component, {
    className: (0, _classes.default)(classStr, className)
  });
};

exports.Container = Container;

var Notification = function Notification(aprops) {
  var _BaseComponent2 = (0, _BaseComponent5.default)(aprops, Notification),
      onDoClose = _BaseComponent2.onDoClose,
      _BaseComponent2$trans = _BaseComponent2.transition,
      Transition = _BaseComponent2$trans === void 0 ? _AnimationCollapse.default : _BaseComponent2$trans,
      transitionProps = _BaseComponent2.transitionProps,
      onTransitionFinished = _BaseComponent2.onTransitionFinished,
      titleProps = _BaseComponent2.titleProps,
      hasClose = _BaseComponent2.hasClose,
      closeProps = _BaseComponent2.closeProps,
      iconProps = _BaseComponent2.iconProps,
      _BaseComponent2$compo = _BaseComponent2.component,
      component = _BaseComponent2$compo === void 0 ? _Panel.default : _BaseComponent2$compo,
      className = _BaseComponent2.className,
      children = _BaseComponent2.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["onDoClose", "transition", "transitionProps", "onTransitionFinished", "titleProps", "hasClose", "closeProps", "iconProps", "component", "className", "children"]);

  var classStr = 'flex-display-block flex-align-center width-full';
  return _react.default.createElement(Transition, (0, _extends2.default)({
    component: component,
    "b-style": "solid",
    "b-theme": "mask",
    transitionProps: transitionProps,
    onTransitionFinished: onTransitionFinished,
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement("div", {
    className: "padding-a-"
  }, _react.default.createElement(Notification._Title, titleProps, children), _react.default.createElement(Notification._Close, (0, _extends2.default)({
    onDoClose: onDoClose
  }, closeProps), hasClose)));
};

exports.Notification = Notification;

Notification._Title = function (aprops) {
  var _BaseComponent3 = (0, _BaseComponent5.default)(aprops, Notification._Title),
      _BaseComponent3$compo = _BaseComponent3.component,
      Component = _BaseComponent3$compo === void 0 ? _Panel.default : _BaseComponent3$compo,
      className = _BaseComponent3.className,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["component", "className"]);

  var classStr = 'text-weight- text-size-lg flex-sub-flex-extend';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props));
};

Notification._Close = function (aprops) {
  var _BaseComponent4 = (0, _BaseComponent5.default)(aprops, Notification._Close),
      hasClose = _BaseComponent4.hasClose,
      onDoClose = _BaseComponent4.onDoClose,
      iconProps = _BaseComponent4.iconProps,
      _BaseComponent4$compo = _BaseComponent4.component,
      Component = _BaseComponent4$compo === void 0 ? _Button.default : _BaseComponent4$compo,
      className = _BaseComponent4.className,
      children = _BaseComponent4.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["hasClose", "onDoClose", "iconProps", "component", "className", "children"]);

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

        var _id = app.notice._id || app.router.genPopLayerId(options);

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
        return app.notice._id = app.router.addPopLayer(_react.default.createElement(Container, null, _react.default.createElement(Notification, null)), props, options);
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

        props.onTransitionFinished = function () {
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
exports.default = _default;