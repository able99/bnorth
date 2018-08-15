"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compatible;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("./utils");

function compatible(styles, dom) {
  styles = Array.isArray(styles) ? styles : Object.entries(styles);
  var ret = {};
  styles.forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    ret[k] = v;

    if (k.indexOf('radius')) {
      ret = (0, _utils.addSelectorPrefix)(k, v, ret, dom, false, true, true);
    }
  });
  return (0, _utils.stylesToDom)(ret, dom);
}

module.exports = exports["default"];