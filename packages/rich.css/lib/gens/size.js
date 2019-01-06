"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

function genFuncSize(_ref) {
  var directionSize = _ref.directionSize,
      size = _ref.size;
  return Object.assign((0, _utils.genClassObjects)('.square-full', {
    styleObjectMap: {
      'width': '100%',
      'height': '100%'
    }
  }), (0, _utils.genClassObjects)('.', {
    styleKeySet: (0, _utils.getStyleValueSet)(directionSize),
    styleValueSet: (0, _utils.getStyleValueSet)(size)
  }));
}

var _default = genFuncSize;
exports.default = _default;