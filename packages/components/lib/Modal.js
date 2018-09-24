"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

var _AnimationFade = _interopRequireDefault(require("./AnimationFade"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _this = void 0;

var Modal = function Modal(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      role = _genCommonProps.role,
      handleAction = _genCommonProps.handleAction,
      _genCommonProps$in = _genCommonProps.in,
      isIn = _genCommonProps$in === void 0 ? true : _genCommonProps$in,
      onTransitionFinished = _genCommonProps.onTransitionFinished,
      containerProps = _genCommonProps.containerProps,
      headerProps = _genCommonProps.headerProps,
      title = _genCommonProps.title,
      titleProps = _genCommonProps.titleProps,
      hasTitleClose = _genCommonProps.hasTitleClose,
      titleCloseProps = _genCommonProps.titleCloseProps,
      titleCloseIconProps = _genCommonProps.titleCloseIconProps,
      bodyProps = _genCommonProps.bodyProps,
      footerProps = _genCommonProps.footerProps,
      footerButtonProps = _genCommonProps.footerButtonProps,
      footButtonGetStyle = _genCommonProps.footButtonGetStyle,
      footButtonGetClassName = _genCommonProps.footButtonGetClassName,
      footButtonGetProps = _genCommonProps.footButtonGetProps,
      _genCommonProps$compo = _genCommonProps.component,
      Component = _genCommonProps$compo === void 0 ? "div" : _genCommonProps$compo,
      style = _genCommonProps.style,
      className = _genCommonProps.className,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["role", "handleAction", "in", "onTransitionFinished", "containerProps", "headerProps", "title", "titleProps", "hasTitleClose", "titleCloseProps", "titleCloseIconProps", "bodyProps", "footerProps", "footerButtonProps", "footButtonGetStyle", "footButtonGetClassName", "footButtonGetProps", "component", "style", "className", "children"]);

  children = typeof children === 'function' ? children(_this) : children;
  var classStr = 'position-relative backface-hidden overflow-a-hidden bg-color-white';
  var classSet = {
    'square-full': role === 'popup',
    'border-radius-': role !== 'popup' && role !== 'document'
  };
  var styleSet = (0, _objectSpread2.default)({
    width: role !== 'popup' ? '80%' : undefined
  }, style || {});
  return _react.default.createElement(Modal._Container, (0, _extends2.default)({
    handleAction: handleAction,
    in: isIn,
    onTransitionFinished: onTransitionFinished,
    role: role
  }, containerProps), role === 'document' ? children : _react.default.createElement(Component, (0, _extends2.default)({
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: styleSet,
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), _react.default.createElement(Modal._Header, (0, _extends2.default)({
    title: title,
    titleProps: titleProps,
    hasTitleClose: hasTitleClose,
    titleCloseProps: titleCloseProps,
    titleCloseIconProps: titleCloseIconProps,
    role: role,
    handleAction: handleAction
  }, headerProps)), _react.default.createElement(Modal._Body, (0, _extends2.default)({
    role: role
  }, bodyProps), children), _react.default.createElement(Modal._Footer, (0, _extends2.default)({
    footerButtonProps: footerButtonProps,
    footButtonGetStyle: footButtonGetStyle,
    footButtonGetClassName: footButtonGetClassName,
    footButtonGetProps: footButtonGetProps,
    role: role,
    handleAction: handleAction
  }, footerProps))));
};

Modal._Container = function (aprops) {
  var _genCommonProps2 = (0, _props.genCommonProps)(aprops),
      role = _genCommonProps2.role,
      handleAction = _genCommonProps2.handleAction,
      _genCommonProps2$mask = _genCommonProps2.mask,
      mask = _genCommonProps2$mask === void 0 ? true : _genCommonProps2$mask,
      _genCommonProps2$tran = _genCommonProps2.transition,
      Transition = _genCommonProps2$tran === void 0 ? _AnimationFade.default : _genCommonProps2$tran,
      isIn = _genCommonProps2.in,
      onTransitionFinished = _genCommonProps2.onTransitionFinished,
      _genCommonProps2$comp = _genCommonProps2.component,
      component = _genCommonProps2$comp === void 0 ? _Backdrop.default : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      children = _genCommonProps2.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["role", "handleAction", "mask", "transition", "in", "onTransitionFinished", "component", "className", "children"]);

  var classSet = {
    'flex-display-block': role !== 'document',
    'flex-justify-center': role !== 'document',
    'flex-align-center': role !== 'document'
  };
  return _react.default.createElement(Transition, (0, _extends2.default)({
    onClick: function onClick() {
      return handleAction && handleAction();
    },
    in: isIn,
    onTransitionFinished: onTransitionFinished,
    component: component,
    mask: mask,
    className: (0, _props.cxm)(classSet, className)
  }, props), children);
};

Modal._Header = function (aprops) {
  var _genCommonProps3 = (0, _props.genCommonProps)(aprops),
      handleAction = _genCommonProps3.handleAction,
      title = _genCommonProps3.title,
      titleProps = _genCommonProps3.titleProps,
      hasTitleClose = _genCommonProps3.hasTitleClose,
      titleCloseProps = _genCommonProps3.titleCloseProps,
      titleCloseIconProps = _genCommonProps3.titleCloseIconProps,
      _genCommonProps3$comp = _genCommonProps3.component,
      Component = _genCommonProps3$comp === void 0 ? 'div' : _genCommonProps3$comp,
      className = _genCommonProps3.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["handleAction", "title", "titleProps", "hasTitleClose", "titleCloseProps", "titleCloseIconProps", "component", "className"]);

  var classStr = 'width-full padding-a- border-set-bottom- flex-display-block flex-justify-between flex-align-center';
  return title || hasTitleClose ? _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props), _react.default.createElement(Modal._HeaderTitle, (0, _extends2.default)({
    hasTitleClose: hasTitleClose
  }, titleProps), title), !hasTitleClose ? null : _react.default.createElement(Modal._HeaderTitleClose, (0, _extends2.default)({
    handleAction: handleAction,
    titleCloseIconProps: titleCloseIconProps
  }, titleCloseProps), hasTitleClose)) : null;
};

Modal._HeaderTitle = function (aprops) {
  var _genCommonProps4 = (0, _props.genCommonProps)(aprops),
      hasTitleClose = _genCommonProps4.hasTitleClose,
      _genCommonProps4$comp = _genCommonProps4.component,
      Component = _genCommonProps4$comp === void 0 ? 'div' : _genCommonProps4$comp,
      className = _genCommonProps4.className,
      children = _genCommonProps4.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps4, ["hasTitleClose", "component", "className", "children"]);

  var classStr = 'flex-sub-flex-grow text-weight-bold text-size-lg';
  var classSet = {
    'text-align-center': !hasTitleClose
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, classSet, className)
  }, props), children);
};

Modal._HeaderTitleClose = function (aprops) {
  var _genCommonProps5 = (0, _props.genCommonProps)(aprops),
      handleAction = _genCommonProps5.handleAction,
      titleCloseIconProps = _genCommonProps5.titleCloseIconProps,
      _genCommonProps5$comp = _genCommonProps5.component,
      Component = _genCommonProps5$comp === void 0 ? _Button.default : _genCommonProps5$comp,
      className = _genCommonProps5.className,
      children = _genCommonProps5.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps5, ["handleAction", "titleCloseIconProps", "component", "className", "children"]);

  var classStr = 'padding-a-xs';
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-style": "plain",
    onClick: function onClick() {
      return handleAction && handleAction();
    },
    className: (0, _props.cxm)(classStr, className)
  }, props), children === true ? _react.default.createElement(Modal._HeaderTitleCloseIcon, titleCloseIconProps) : children);
};

Modal._HeaderTitleCloseIcon = function (aprops) {
  var _genCommonProps6 = (0, _props.genCommonProps)(aprops),
      title = _genCommonProps6.title,
      _genCommonProps6$comp = _genCommonProps6.component,
      Component = _genCommonProps6$comp === void 0 ? _Icon.default : _genCommonProps6$comp,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps6, ["title", "component"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    name: "close",
    nameDefault: "x"
  }, props));
};

Modal._Body = function (aprops) {
  var _genCommonProps7 = (0, _props.genCommonProps)(aprops),
      _genCommonProps7$comp = _genCommonProps7.component,
      Component = _genCommonProps7$comp === void 0 ? 'div' : _genCommonProps7$comp,
      className = _genCommonProps7.className,
      children = _genCommonProps7.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps7, ["component", "className", "children"]);

  children = typeof children === 'function' ? children(_this) : children;
  if (!children) return null;
  var classStr = 'padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props), children);
};

Modal._Footer = function (aprops) {
  var _genCommonProps8 = (0, _props.genCommonProps)(aprops),
      role = _genCommonProps8.role,
      handleAction = _genCommonProps8.handleAction,
      _genCommonProps8$foot = _genCommonProps8.footerButtons,
      footerButtons = _genCommonProps8$foot === void 0 ? Modal._footerButtons[aprops.role] || [] : _genCommonProps8$foot,
      footerButtonProps = _genCommonProps8.footerButtonProps,
      _genCommonProps8$foot2 = _genCommonProps8.footButtonGetClassName,
      footButtonGetClassName = _genCommonProps8$foot2 === void 0 ? Modal._Footer._footButtonGetClassName : _genCommonProps8$foot2,
      _genCommonProps8$foot3 = _genCommonProps8.footButtonGetStyle,
      footButtonGetStyle = _genCommonProps8$foot3 === void 0 ? Modal._Footer._footButtonGetStyle : _genCommonProps8$foot3,
      _genCommonProps8$foot4 = _genCommonProps8.footButtonGetProps,
      footButtonGetProps = _genCommonProps8$foot4 === void 0 ? Modal._Footer._footButtonGetProps : _genCommonProps8$foot4,
      _genCommonProps8$comp = _genCommonProps8.component,
      Component = _genCommonProps8$comp === void 0 ? 'div' : _genCommonProps8$comp,
      className = _genCommonProps8.className,
      children = _genCommonProps8.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps8, ["role", "handleAction", "footerButtons", "footerButtonProps", "footButtonGetClassName", "footButtonGetStyle", "footButtonGetProps", "component", "className", "children"]);

  if (!footerButtons.length) return null;
  var classStr = 'border-set-top- overflow-a-hidden flex-display-block flex-align-center';
  var buttonProps = {
    className: 'flex-sub-flex-extend'
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _props.cxm)(classStr, className)
  }, props), footerButtons.map(function (v, i, a) {
    return _react.default.createElement(_Button.default, (0, _extends2.default)({
      key: i,
      "b-style": "plain",
      onClick: function onClick() {
        return handleAction && handleAction(i);
      }
    }, (0, _props.getSubComponentProps)(i, a.length, aprops, buttonProps, footerButtonProps, footButtonGetClassName, footButtonGetStyle, footButtonGetProps)), v);
  }));
};

Modal._Footer.footButtonGetClassName = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      stacked = _ref.stacked,
      justify = _ref.justify,
      separator = _ref.separator;

  var subPropsEach = arguments.length > 3 ? arguments[3] : undefined;
  var subProps = arguments.length > 4 ? arguments[4] : undefined;
  return {
    'border-set-left-': i
  };
};

Modal._footerButtons = {
  alert: ['确定'],
  prompt: ['取消', '确定']
};
var _default = Modal;
exports.default = _default;