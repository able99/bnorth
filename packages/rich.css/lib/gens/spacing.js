"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gen;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var Types = ['margin', 'padding'];
var Dimentions = {
  'a': '',
  'h': ['left', 'right'],
  'v': ['top', 'bottom'],
  'left': true,
  'right': true,
  'top': true,
  'bottom': true
};

function gen(config) {
  var ret = {};
  var sizes = (0, _utils.getSizeSet)('spacing', config);
  Types.forEach(function (v) {
    Object.entries(Dimentions).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          kk = _ref2[0],
          vv = _ref2[1];

      Object.entries(sizes).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            kkk = _ref4[0],
            vvv = _ref4[1];

        ret[(0, _utils.getSelector)(v, kk, kkk.trim())] = (0, _utils.getStyleSet)(v, vvv, {
          mapKey: kk,
          mapVal: vv
        });
      });
    });
  });
  return ret;
}