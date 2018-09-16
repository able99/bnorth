"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gen;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var Cursors = {
  '-': 'default',
  'default': true,
  'auto': true,
  'pointer': true,
  'not-allowed': true,
  'crosshair': true,
  'text': true,
  'wait': true,
  'help': true,
  'move': true,
  'n-resize': true,
  's-resize': true,
  'w-resize': true,
  'e-resize': true,
  'ne-resize': true,
  'nw-resize': true,
  'se-resize': true,
  'sw-resize': true
};

function gen() {
  var ret = {};
  var baseSelector = 'cursor';
  Object.entries(Cursors).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return ret[(0, _utils.getSelector)(baseSelector, k)] = (0, _utils.getStyleSet)(baseSelector, v, {
      key: k
    });
  });
  return ret;
}