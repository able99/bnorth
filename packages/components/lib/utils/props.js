"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cx = cx;
exports.cxm = cxm;
exports.mergeClassName = mergeClassName;
exports.genCommonProps = genCommonProps;
exports.functions = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _flex = require("@bnorth/rich.css/lib/styles/flex");

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var functions = {
  styleFlexSubGrow: _flex.styleFlexSubGrow,
  styleFlexSubShrink: _flex.styleFlexSubShrink,
  styleFlexSubBasis: _flex.styleFlexSubBasis,
  styleFlexSubOrder: _flex.styleFlexSubOrder,
  transform: _animation.transform
};
exports.functions = functions;

function cx() {
  return _classnames.default.apply(void 0, arguments);
}

;

function cxm() {
  return mergeClassName(cx.apply(void 0, arguments));
}

function mergeClassName(className) {
  var classNames = className.split(/\s/);
  return classNames.filter(function (v, i, a) {
    var key = v.substr(0, v.lastIndexOf('-'));
    return !a.slice(i + 1).find(function (vv) {
      return vv.startsWith(key);
    });
  }).join(' ');
}

function genCommonProps(aprops) {
  var _ref = aprops || {},
      active = _ref.active,
      selected = _ref.selected,
      disabled = _ref.disabled,
      className = _ref.className,
      style = _ref.style,
      refWrap = _ref.refWrap,
      props = (0, _objectWithoutProperties2.default)(_ref, ["active", "selected", "disabled", "className", "style", "refWrap"]);

  var classSet = {};
  var styleSet = {};
  Object.entries(props).forEach(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
        k = _ref3[0],
        v = _ref3[1];

    if (k.startsWith('bs-')) {
      var name = k.slice(3);
      styleSet[name] = v;
      delete props[k];
    } else if (k.startsWith('bc-')) {
      var _name = k.slice(3);

      classSet[_name + (v === true ? '' : '-' + v)] = true;
      delete props[k];
    } else if (k.startsWith('bf-')) {
      var _name2 = k.slice(3);

      if (functions[_name2]) styleSet = (0, _objectSpread2.default)({}, styleSet, functions[_name2].apply(functions, (0, _toConsumableArray2.default)(Array.isArray(v) ? v : [v])));
      delete props[k];
    }
  });
  if (active) classSet['active'] = true;
  if (selected) classSet['selected'] = true;
  if (disabled) classSet['disabled'] = true;
  return (0, _objectSpread2.default)({}, props, {
    className: cx(classSet, className),
    style: (0, _objectSpread2.default)({}, styleSet, style),
    selected: selected,
    active: active,
    disabled: disabled,
    ref: refWrap
  });
}