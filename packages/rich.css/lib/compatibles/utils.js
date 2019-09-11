"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.getDomSelector = getDomSelector;
exports.addSelectorPrefix = addSelectorPrefix;
exports.addSelectorMulti = addSelectorMulti;
exports.stylesToDom = stylesToDom;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.regexp.split");

function getDomSelector(selector) {
  return selector.split('-').filter(function (v) {
    return v;
  }).map(function (v, i) {
    return i || v.startsWith('webkit') || v.startsWith('moz') ? v[0].toUpperCase() + v.substr(1) : v;
  }).join('');
}

function addSelectorPrefix(k, v) {
  var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var webkit = arguments.length > 3 ? arguments[3] : undefined;
  var moz = arguments.length > 4 ? arguments[4] : undefined;
  var ms = arguments.length > 5 ? arguments[5] : undefined;
  var oz = arguments.length > 6 ? arguments[6] : undefined;
  obj[k] = v;
  if (webkit) obj['-webkit-' + k] = v;
  if (moz) obj['-moz-' + k] = v;
  if (ms) obj['-ms-' + k] = v;
  if (oz) obj['-oz-' + k] = v;
  return obj;
}

function addSelectorMulti(k, ret) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  args.forEach(function (v, i) {
    ret[k + ' '.repeat(i + 1)] = v;
  });
  return ret;
}

function stylesToDom(styles, dom) {
  if (!dom) return styles;
  var ret = {};
  (0, _entries.default)(styles).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    ret[getDomSelector(k)] = v;
  });
  return ret;
}