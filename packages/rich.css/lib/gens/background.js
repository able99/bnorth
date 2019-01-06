"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

function genFuncBackground(_ref) {
  var utilColors = _ref.utilColors,
      mainColors = _ref.mainColors,
      opacityColors = _ref.opacityColors;
  return Object.assign((0, _utils.genClassObjects)('.bg-color', {
    styleKey: 'background-color',
    styleValueSet: (0, _objectSpread2.default)({}, utilColors, mainColors, opacityColors)
  }), (0, _utils.genClassObjects)('.bg-none-', {
    styleObjectMap: {
      'background': 'none'
    }
  }));
}

var _default = genFuncBackground;
exports.default = _default;