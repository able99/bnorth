"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

/**
 * @module
 */
function genFuncSpacing(_ref) {
  var directionEdge = _ref.directionEdge,
      spacing = _ref.spacing;
  var styleValueSet = (0, _utils.getStyleValueSet)(spacing);
  return Object.assign((0, _utils.genClassObjects)('.margin', {
    styleKey: true,
    styleKeySet: directionEdge,
    styleValueSet: styleValueSet
  }), (0, _utils.genClassObjects)('.padding', {
    styleKey: true,
    styleKeySet: directionEdge,
    styleValueSet: styleValueSet
  }));
}

var _default = genFuncSpacing;
exports.default = _default;