"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _props = require("./utils/props");

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _AnimationFade = _interopRequireDefault(require("./AnimationFade"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _this = void 0;

var Modal = function Modal(aprops) {
  var _genCommonProps = (0, _props.genCommonProps)(aprops),
      handleAction = _genCommonProps.handleAction,
      _genCommonProps$in = _genCommonProps.in,
      isIn = _genCommonProps$in === void 0 ? true : _genCommonProps$in,
      onExited = _genCommonProps.onExited,
      role = _genCommonProps.role,
      title = _genCommonProps.title,
      titleClose = _genCommonProps.titleClose,
      headerProps = _genCommonProps.headerProps,
      headerTitleProps = _genCommonProps.headerTitleProps,
      headerCloseProps = _genCommonProps.headerCloseProps,
      bodyProps = _genCommonProps.bodyProps,
      footerProps = _genCommonProps.footerProps,
      footerButtonsProps = _genCommonProps.footerButtonsProps,
      containerProps = _genCommonProps.containerProps,
      style = _genCommonProps.style,
      className = _genCommonProps.className,
      children = _genCommonProps.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps, ["handleAction", "in", "onExited", "role", "title", "titleClose", "headerProps", "headerTitleProps", "headerCloseProps", "bodyProps", "footerProps", "footerButtonsProps", "containerProps", "style", "className", "children"]);

  var classSet = {
    'position-relative': true,
    'backface-hidden': true,
    'overflow-hidden': true,
    'square-full': role === 'popup',
    'bg-color-white': !(0, _props.hascx)(className, 'bg-color'),
    'border-radius': role !== 'popup' && role !== 'document' && !(0, _props.hascx)(className, 'border-radius')
  };
  var styleSet = (0, _objectSpread2.default)({
    width: role !== 'popup' ? '80%' : undefined
  }, style || {});
  return _react.default.createElement(Modal.Container, aprops, role === 'document' ? children : _react.default.createElement("div", (0, _extends2.default)({
    style: styleSet,
    className: (0, _props.cx)(classSet, className),
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, props), _react.default.createElement(Modal.Header, aprops), _react.default.createElement(Modal.Body, aprops), _react.default.createElement(Modal.Footer, aprops)));
};

Modal.Container = function (aprops) {
  var role = aprops.role,
      handleAction = aprops.handleAction,
      _aprops$in = aprops.in,
      isIn = _aprops$in === void 0 ? true : _aprops$in,
      onExited = aprops.onExited,
      containerProps = aprops.containerProps,
      children = aprops.children;

  var _genCommonProps2 = (0, _props.genCommonProps)(containerProps),
      _genCommonProps2$comp = _genCommonProps2.component,
      component = _genCommonProps2$comp === void 0 ? _Backdrop.default : _genCommonProps2$comp,
      className = _genCommonProps2.className,
      _genCommonProps2$mask = _genCommonProps2.mask,
      mask = _genCommonProps2$mask === void 0 ? true : _genCommonProps2$mask,
      timeout = _genCommonProps2.timeout,
      _genCommonProps2$Tran = _genCommonProps2.Transition,
      Transition = _genCommonProps2$Tran === void 0 ? _AnimationFade.default : _genCommonProps2$Tran,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps2, ["component", "className", "mask", "timeout", "Transition"]);

  var classSet = {
    'border-none': !className.startsWith('border'),
    'flex-display-flex': role !== 'document',
    'flex-justify-center': role !== 'document',
    'flex-align-center': role !== 'document'
  };
  return _react.default.createElement(Transition, (0, _extends2.default)({
    onClick: function onClick() {
      return handleAction && handleAction();
    },
    in: isIn,
    timeout: timeout,
    onExited: onExited,
    component: component,
    mask: mask,
    className: (0, _props.cx)(classSet, className)
  }, props), children);
};

Modal.Header = function (aprops) {
  var title = aprops.title,
      titleClose = aprops.titleClose,
      _aprops$headerProps = aprops.headerProps,
      headerProps = _aprops$headerProps === void 0 ? {} : _aprops$headerProps;

  var _genCommonProps3 = (0, _props.genCommonProps)(headerProps),
      className = _genCommonProps3.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps3, ["className"]);

  var classSet = {
    'width-full': true,
    'padding': true,
    'border-set-bottom': !(0, _props.hascx)(className, 'border'),
    'flex-display-flex': true,
    'flex-justify-between': true,
    'flex-align-center': true
  };
  return title || titleClose ? _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), _react.default.createElement(Modal.HeaderTitle, aprops), _react.default.createElement(Modal.HeaderClose, aprops)) : null;
};

Modal.HeaderTitle = function (aprops) {
  var title = aprops.title,
      hasClose = aprops.hasClose,
      headerTitleProps = aprops.headerTitleProps;

  var _genCommonProps4 = (0, _props.genCommonProps)(headerTitleProps),
      className = _genCommonProps4.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps4, ["className"]);

  var classSet = {
    'text-align-center': !hasClose && !className.startsWith('text-align'),
    'flex-sub-flex-grow': true
  };
  return _react.default.createElement("big", (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), _react.default.createElement("strong", null, title));
};

Modal.HeaderClose = function (aprops) {
  var _aprops$titleClose = aprops.titleClose,
      titleClose = _aprops$titleClose === void 0 ? null : _aprops$titleClose,
      headerCloseProps = aprops.headerCloseProps,
      handleAction = aprops.handleAction;

  var _genCommonProps5 = (0, _props.genCommonProps)(headerCloseProps),
      className = _genCommonProps5.className,
      _genCommonProps5$cSty = _genCommonProps5.cStyle,
      cStyle = _genCommonProps5$cSty === void 0 ? 'plain' : _genCommonProps5$cSty,
      _genCommonProps5$name = _genCommonProps5.name,
      name = _genCommonProps5$name === void 0 ? 'close' : _genCommonProps5$name,
      children = _genCommonProps5.children,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps5, ["className", "cStyle", "name", "children"]);

  var classSet = {
    'padding-xs': !className.startsWith('padding')
  };
  return titleClose === true ? _react.default.createElement(_Button.default, (0, _extends2.default)({
    onClick: function onClick() {
      return handleAction && handleAction();
    },
    cStyle: cStyle,
    className: (0, _props.cx)(classSet, className)
  }, props), name ? _react.default.createElement(_Icon.default, {
    name: _Icon.default.getName(name, 'x')
  }) : null, children) : titleClose;
};

Modal.Body = function (aprops) {
  var _aprops$bodyProps = aprops.bodyProps,
      bodyProps = _aprops$bodyProps === void 0 ? {} : _aprops$bodyProps,
      children = aprops.children;

  var _genCommonProps6 = (0, _props.genCommonProps)(bodyProps),
      className = _genCommonProps6.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps6, ["className"]);

  children = typeof children === 'function' ? children(_this) : children;
  var classSet = {
    'padding': !(0, _props.hascx)(className, 'padding')
  };
  return _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), children);
};

Modal.Footer = function (aprops) {
  var footerProps = aprops.footerProps;

  var _genCommonProps7 = (0, _props.genCommonProps)(footerProps),
      className = _genCommonProps7.className,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps7, ["className"]);

  var classSet = {
    'flex-display-flex': true,
    'border-set-top': true
  };
  return _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _props.cx)(classSet, className)
  }, props), _react.default.createElement(Modal.FooterButtons, aprops));
};

Modal.FooterButtons = function (aprops) {
  var role = aprops.role,
      footerButtonProps = aprops.footerButtonProps,
      handleAction = aprops.handleAction;

  var _genCommonProps8 = (0, _props.genCommonProps)(footerButtonProps),
      className = _genCommonProps8.className,
      style = _genCommonProps8.style,
      _genCommonProps8$cSty = _genCommonProps8.cStyle,
      cStyle = _genCommonProps8$cSty === void 0 ? 'plain' : _genCommonProps8$cSty,
      cTheme = _genCommonProps8.cTheme,
      cSize = _genCommonProps8.cSize,
      _genCommonProps8$butt = _genCommonProps8.buttons,
      buttons = _genCommonProps8$butt === void 0 ? {
    alert: ['确定'],
    prompt: ['取消', '确定']
  }[role] : _genCommonProps8$butt,
      _genCommonProps8$item = _genCommonProps8.itemClassSet,
      itemClassSet = _genCommonProps8$item === void 0 ? function (i, length, v, props, data) {
    var ret = {
      'flex-sub-flex-grow': true
    };
    i <= length - 1 && (ret['border-right-border'] = true);
    return ret;
  } : _genCommonProps8$item,
      _genCommonProps8$item2 = _genCommonProps8.itemStyleSet,
      itemStyleSet = _genCommonProps8$item2 === void 0 ? function (i, length, v, props, data) {
    var ret = {};
    return ret;
  } : _genCommonProps8$item2,
      _genCommonProps8$item3 = _genCommonProps8.itemProps,
      itemProps = _genCommonProps8$item3 === void 0 ? function (i, length, v, props, data) {
    var ret = {};
    i >= length - 1 && (ret[cTheme] = 'primary');
    return ret;
  } : _genCommonProps8$item3,
      props = (0, _objectWithoutProperties2.default)(_genCommonProps8, ["className", "style", "cStyle", "cTheme", "cSize", "buttons", "itemClassSet", "itemStyleSet", "itemProps"]);

  if (!buttons || !buttons.length) return null;
  return _react.default.createElement(_react.default.Fragment, null, buttons.map(function (v, i, arr) {
    return _react.default.createElement(_Button.default, (0, _extends2.default)({
      key: 'footer-button' + i,
      cStyle: "plain",
      onClick: function onClick() {
        return handleAction && handleAction(i);
      },
      className: (0, _props.cx)(className, itemClassSet(i, arr.length, v, props)),
      style: (0, _objectSpread2.default)({}, style, itemStyleSet(i, arr.length, v, props))
    }, (0, _objectSpread2.default)({
      cStyle: cStyle,
      cSize: cSize,
      cTheme: cTheme
    }, props, itemProps(i, arr.length, v, props))), (0, _typeof2.default)(v) === 'object' ? v.title : v);
  }));
};

var _default = Modal;
exports.default = _default;