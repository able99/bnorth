"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compatible;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

var _utils = require("./utils");

function compatible(styles, dom) {
  styles = Array.isArray(styles) ? styles : Object.entries(styles);
  var ret = {};
  styles.forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    ret[k] = v;

    if (k.indexOf('transform') === 0 || k.indexOf('transition') === 0 || k.indexOf('animation') === 0) {
      ret = (0, _utils.addSelectorPrefix)(k, v, ret, dom, true, true, true);
    }
  });
  return (0, _utils.stylesToDom)(ret, dom);
}