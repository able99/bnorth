"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFunctions = addFunctions;
exports.default = parseProps;
exports.functions = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("core-js/modules/es6.object.assign");

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var functions = {};
exports.functions = functions;

function addFunctions(args) {
  return Object.assign(functions, args);
}

function parseProps(aprops) {
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
    className: (0, _classes.default)(classSet, className),
    style: (0, _objectSpread2.default)({}, styleSet, style),
    selected: selected,
    active: active,
    disabled: disabled,
    ref: refWrap
  });
}