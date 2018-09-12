"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComponentDisplayName = getComponentDisplayName;
exports.cloneStaticMethod = cloneStaticMethod;
exports.applyHocOptions = applyHocOptions;
exports.default = hocHelper;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function getComponentDisplayName(component) {
  var defaultName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hoc';
  return component.displayName || component.name || defaultName;
}

function cloneStaticMethod(from, to) {
  Object.entries(from).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return k !== 'propTypes' && (to[k] = v);
  });
}

function applyHocOptions(component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!component) return component;
  Object.entries(options).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    if (k === 'defaultProps') {
      component[k] = (0, _objectSpread2.default)({}, component[k], v);
    } else {
      component.prototype[k] = v;
    }
  });
}

function hocHelper(WrappedComponent, EnhancedComponent, options, enhancedName, defaultName) {
  cloneStaticMethod(WrappedComponent, EnhancedComponent);
  applyHocOptions(EnhancedComponent, options);
  EnhancedComponent.displayName = "".concat(enhancedName, "-").concat(getComponentDisplayName(WrappedComponent, defaultName));
  return EnhancedComponent;
}