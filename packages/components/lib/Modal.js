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

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _AnimationFade = _interopRequireDefault(require("./AnimationFade"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _this = void 0;

var Modal = function Modal(aprops) {
  var _parseProps = (0, _props.default)(aprops),
      role = _parseProps.role,
      handleAction = _parseProps.handleAction,
      _parseProps$in = _parseProps.in,
      isIn = _parseProps$in === void 0 ? true : _parseProps$in,
      onTransitionFinished = _parseProps.onTransitionFinished,
      containerProps = _parseProps.containerProps,
      headerProps = _parseProps.headerProps,
      title = _parseProps.title,
      titleProps = _parseProps.titleProps,
      hasTitleClose = _parseProps.hasTitleClose,
      titleCloseProps = _parseProps.titleCloseProps,
      titleCloseIconProps = _parseProps.titleCloseIconProps,
      bodyProps = _parseProps.bodyProps,
      footerProps = _parseProps.footerProps,
      footerButtonProps = _parseProps.footerButtonProps,
      footButtonGetStyle = _parseProps.footButtonGetStyle,
      footButtonGetClassName = _parseProps.footButtonGetClassName,
      footButtonGetProps = _parseProps.footButtonGetProps,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? "div" : _parseProps$component,
      style = _parseProps.style,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["role", "handleAction", "in", "onTransitionFinished", "containerProps", "headerProps", "title", "titleProps", "hasTitleClose", "titleCloseProps", "titleCloseIconProps", "bodyProps", "footerProps", "footerButtonProps", "footButtonGetStyle", "footButtonGetClassName", "footButtonGetProps", "component", "style", "className", "children"]);

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
    className: (0, _classes.default)(classStr, classSet, className)
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
    itemProps: footerButtonProps,
    itemGetStyle: footButtonGetStyle,
    itemGetClassName: footButtonGetClassName,
    itemGetProps: footButtonGetProps,
    role: role,
    handleAction: handleAction
  }, footerProps))));
};

Modal._Container = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops),
      role = _parseProps2.role,
      handleAction = _parseProps2.handleAction,
      _parseProps2$mask = _parseProps2.mask,
      mask = _parseProps2$mask === void 0 ? true : _parseProps2$mask,
      _parseProps2$transiti = _parseProps2.transition,
      Transition = _parseProps2$transiti === void 0 ? _AnimationFade.default : _parseProps2$transiti,
      isIn = _parseProps2.in,
      onTransitionFinished = _parseProps2.onTransitionFinished,
      _parseProps2$componen = _parseProps2.component,
      component = _parseProps2$componen === void 0 ? _Backdrop.default : _parseProps2$componen,
      className = _parseProps2.className,
      children = _parseProps2.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["role", "handleAction", "mask", "transition", "in", "onTransitionFinished", "component", "className", "children"]);

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
    className: (0, _classes.default)(classSet, className)
  }, props), children);
};

Modal._Header = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops),
      handleAction = _parseProps3.handleAction,
      title = _parseProps3.title,
      titleProps = _parseProps3.titleProps,
      hasTitleClose = _parseProps3.hasTitleClose,
      titleCloseProps = _parseProps3.titleCloseProps,
      titleCloseIconProps = _parseProps3.titleCloseIconProps,
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? 'div' : _parseProps3$componen,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["handleAction", "title", "titleProps", "hasTitleClose", "titleCloseProps", "titleCloseIconProps", "component", "className"]);

  var classStr = 'width-full padding-a- border-set-bottom- flex-display-block flex-justify-between flex-align-center';
  return title || hasTitleClose ? _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement(Modal._HeaderTitle, (0, _extends2.default)({
    hasTitleClose: hasTitleClose
  }, titleProps), title), !hasTitleClose ? null : _react.default.createElement(Modal._HeaderTitleClose, (0, _extends2.default)({
    handleAction: handleAction,
    titleCloseIconProps: titleCloseIconProps
  }, titleCloseProps), hasTitleClose)) : null;
};

Modal._HeaderTitle = function (aprops) {
  var _parseProps4 = (0, _props.default)(aprops),
      hasTitleClose = _parseProps4.hasTitleClose,
      _parseProps4$componen = _parseProps4.component,
      Component = _parseProps4$componen === void 0 ? 'div' : _parseProps4$componen,
      className = _parseProps4.className,
      children = _parseProps4.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["hasTitleClose", "component", "className", "children"]);

  var classStr = 'flex-sub-flex-grow text-weight-bold text-size-lg';
  var classSet = {
    'text-align-center': !hasTitleClose
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, classSet, className)
  }, props), children);
};

Modal._HeaderTitleClose = function (aprops) {
  var _parseProps5 = (0, _props.default)(aprops),
      handleAction = _parseProps5.handleAction,
      titleCloseIconProps = _parseProps5.titleCloseIconProps,
      _parseProps5$componen = _parseProps5.component,
      Component = _parseProps5$componen === void 0 ? _Button.default : _parseProps5$componen,
      className = _parseProps5.className,
      children = _parseProps5.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps5, ["handleAction", "titleCloseIconProps", "component", "className", "children"]);

  var classStr = 'padding-h-sm padding-v-0';
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-style": "plain",
    onClick: function onClick() {
      return handleAction && handleAction();
    },
    className: (0, _classes.default)(classStr, className)
  }, props), children === true ? _react.default.createElement(Modal._HeaderTitleCloseIcon, titleCloseIconProps) : children);
};

Modal._HeaderTitleCloseIcon = function (aprops) {
  var _parseProps6 = (0, _props.default)(aprops),
      title = _parseProps6.title,
      _parseProps6$componen = _parseProps6.component,
      Component = _parseProps6$componen === void 0 ? _Icon.default : _parseProps6$componen,
      props = (0, _objectWithoutProperties2.default)(_parseProps6, ["title", "component"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    name: "close",
    nameDefault: "x"
  }, props));
};

Modal._Body = function (aprops) {
  var _parseProps7 = (0, _props.default)(aprops),
      _parseProps7$componen = _parseProps7.component,
      Component = _parseProps7$componen === void 0 ? 'div' : _parseProps7$componen,
      className = _parseProps7.className,
      children = _parseProps7.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps7, ["component", "className", "children"]);

  children = typeof children === 'function' ? children(_this) : children;
  if (!children) return null;
  var classStr = 'padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props), children);
};

Modal._Footer = function (aprops) {
  var _parseProps8 = (0, _props.default)(aprops),
      role = _parseProps8.role,
      handleAction = _parseProps8.handleAction,
      _parseProps8$footerBu = _parseProps8.footerButtons,
      footerButtons = _parseProps8$footerBu === void 0 ? Modal._footerButtons[aprops.role] || [] : _parseProps8$footerBu,
      _parseProps8$itemProp = _parseProps8.itemProps,
      itemProps = _parseProps8$itemProp === void 0 ? {} : _parseProps8$itemProp,
      _parseProps8$itemGetC = _parseProps8.itemGetClassName,
      itemGetClassName = _parseProps8$itemGetC === void 0 ? Modal._Footer.itemGetClassName : _parseProps8$itemGetC,
      _parseProps8$itemGetS = _parseProps8.itemGetStyle,
      itemGetStyle = _parseProps8$itemGetS === void 0 ? Modal._Footer.itemGetStyle : _parseProps8$itemGetS,
      _parseProps8$itemGetP = _parseProps8.itemGetProps,
      itemGetProps = _parseProps8$itemGetP === void 0 ? Modal._Footer.itemGetProps : _parseProps8$itemGetP,
      _parseProps8$componen = _parseProps8.component,
      Component = _parseProps8$componen === void 0 ? _Button.default.Group : _parseProps8$componen,
      _parseProps8$componen2 = _parseProps8.componentItem,
      componentItem = _parseProps8$componen2 === void 0 ? _Button.default : _parseProps8$componen2,
      className = _parseProps8.className,
      children = _parseProps8.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps8, ["role", "handleAction", "footerButtons", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "componentItem", "className", "children"]);

  if (!footerButtons.length) return null;
  var classStr = 'border-set-top-';
  itemProps.className = (0, _classes.default)(itemProps.className, 'border-set-left-');
  return _react.default.createElement(Component, (0, _extends2.default)({
    type: "justify",
    containerProps: aprops,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _classes.default)(classStr, className)
  }, props), footerButtons.map(function (v, i) {
    return _react.default.createElement("componentItem", {
      key: i
    }, v);
  }));
};

Modal._Footer.itemGetProps = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      handleAction = _ref.handleAction;

  var subPropsEach = arguments.length > 3 ? arguments[3] : undefined;
  var subProps = arguments.length > 4 ? arguments[4] : undefined;
  return {
    'b-style': 'plain',
    onClick: function onClick() {
      return handleAction && handleAction(i);
    }
  };
};

Modal._footerButtons = {
  alert: ['确定'],
  prompt: ['取消', '确定']
};
var _default = Modal;
exports.default = _default;