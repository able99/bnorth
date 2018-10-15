"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gen;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

var _utils = require("../utils");

var Cursors = {
  '-': 'default',
  'default': true,
  'auto': true,
  'pointer': true,
  'notallowed': 'not-allowed',
  'crosshair': true,
  'text': true,
  'wait': true,
  'help': true,
  'move': true,
  'nresize': 'n-resize',
  'sresize': 's-resize',
  'wresize': 'w-resize',
  'eresize': 'e-resize',
  'neresize': 'ne-resize',
  'nwresize': 'nw-resize',
  'seresize': 'se-resize',
  'swresize': 'sw-resize'
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