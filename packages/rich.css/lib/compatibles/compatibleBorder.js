"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = compatible;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _utils = require("./utils");

function compatible(styles, dom) {
  styles = (0, _isArray.default)(styles) ? styles : (0, _entries.default)(styles);
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