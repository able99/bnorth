"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFunctions = addFunctions;
exports.default = parseProps;
exports.functions = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("core-js/modules/es6.object.assign");

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var functions = {};
exports.functions = functions;

function addFunctions(args) {
  return Object.assign(functions, args);
}

function parseProps(aprops, aaprops) {
  var _aprops = (0, _objectSpread2.default)({}, typeof aaprops === 'function' ? aaprops(aprops) : aaprops, aprops),
      active = _aprops.active,
      selected = _aprops.selected,
      disabled = _aprops.disabled,
      className = _aprops.className,
      style = _aprops.style,
      refWrap = _aprops.refWrap,
      props = (0, _objectWithoutProperties2.default)(_aprops, ["active", "selected", "disabled", "className", "style", "refWrap"]);

  var classSet = {};
  var styleSet = {};
  Object.entries(props).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    if (k.startsWith('bs-')) {
      delete props[k];
      if (!v) return;
      var name = k.slice(3);
      styleSet[name] = v;
    } else if (k.startsWith('bc-')) {
      delete props[k];
      if (!v) return;

      var _name = k.slice(3);

      classSet[_name + (v === true ? '' : '-' + v)] = true;
    } else if (k.startsWith('bf-')) {
      delete props[k];
      if (!v) return;

      var _name2 = k.slice(3);

      _name2 = functions[_name2];
      if (!_name2) return;
      Object.assign(styleSet, Array.isArray(v) ? _name2.apply(void 0, (0, _toConsumableArray2.default)(v)) : _name2(v));
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