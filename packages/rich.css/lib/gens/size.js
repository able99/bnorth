"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gen;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var Keys = ['width', 'height', 'min-width', 'min-height', 'max-width', 'max-height'];
var Values = {
  'auto': 'auto',
  'full': '100%',
  'half': '50%',
  ' 0': '0',
  ' 1': 1,
  ' 2': 2,
  '1em': '1em',
  '0em25': '0.25em',
  '0em5': '0.5em',
  '2em0': '2em'
};

function gen(config) {
  var ret = {};
  ret[(0, _utils.getSelector)('square-full')] = {
    'width': '100%',
    'height': '100%'
  };
  Keys.forEach(function (v) {
    Object.entries(Values).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          kk = _ref2[0],
          vv = _ref2[1];

      ret[(0, _utils.getSelector)(v, kk.trim())] = (0, _utils.getStyleSet)(v, vv);
    });
  });
  return ret;
}