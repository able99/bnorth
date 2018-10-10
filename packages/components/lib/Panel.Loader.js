"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Loader = _interopRequireDefault(require("./Loader"));

/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
_Panel.default.Loader = function (aprops) {
  var _parseProps = (0, _props.default)(aprops, _Panel.default.Loader.props),
      _parseProps$position = _parseProps.position,
      position = _parseProps$position === void 0 ? 'left' : _parseProps$position,
      isProgress = _parseProps.isProgress,
      progress = _parseProps.progress,
      titleProps = _parseProps.titleProps,
      loaderProps = _parseProps.loaderProps,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      componentPanel = _parseProps.componentPanel,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["position", "isProgress", "progress", "titleProps", "loaderProps", "component", "componentPanel", "className", "children"]);

  var classStr = 'flex-display-block flex-justify-center flex-align-center';
  var classSet = position === 'top' || position === 'bottom' ? 'flex-direction-v' : '';
  var ctitle = children ? _react.default.createElement(_Panel.default.Loader._Title, (0, _extends2.default)({
    position: position
  }, titleProps), children) : null;
  var cloader = position ? _react.default.createElement(_Panel.default.Loader._Loader, (0, _extends2.default)({
    isProgress: isProgress,
    progress: progress
  }, loaderProps)) : null;
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props), position === 'right' || position === 'bottom' ? ctitle : null, cloader, position === 'left' || position === 'top' ? ctitle : null);
};

_Panel.default.Loader._Loader = _Loader.default;

_Panel.default.Loader._Title = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, _Panel.default.Loader._Title.props),
      position = _parseProps2.position,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["position", "component", "componentPanel", "className"]);

  var classStr = 'text-truncate position-relative';
  var classSet = position === 'top' || position === 'bottom' ? 'text-align-center' : '';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

var _default = _Panel.default;
exports.default = _default;