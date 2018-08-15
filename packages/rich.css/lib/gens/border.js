"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gen;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _utils = require("../utils");

var _compatibleBorder = _interopRequireDefault(require("../compatibles/compatibleBorder"));

var Dimentions = {
  'h': ['left', 'right'],
  'v': ['top', 'bottom'],
  'left': true,
  'right': true,
  'top': true,
  'bottom': true
};
var RadiusDimentions = {
  '': '',
  'top': ['top-left', 'top-right'],
  'bottom': ['bottom-left', 'bottom-right'],
  'top-left': true,
  'top-right': true,
  'bottom-left': true,
  'bottom-right': true
};
var Styles = {
  '': 'solid',
  'solid': true,
  'none': true,
  'dotted': true,
  'dashed': true,
  'inherit': true
};

function gen(config) {
  var ret = {};
  var utilColors = config.utilColors,
      mainColors = config.mainColors;
  var colors = (0, _objectSpread2.default)({
    '': utilColors.border
  }, utilColors, mainColors);
  var widthSizes = (0, _utils.getSizeSet)('borderWidth', config);
  var radiusSizes = (0, _utils.getSizeSet)('borderRadius', config);
  var baseSelector = 'border';
  var func;
  func = 'set';
  Object.entries(colors).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        kk = _ref2[0],
        vv = _ref2[1];

    return ret[(0, _utils.getSelector)(baseSelector, func, kk)] = (0, _utils.getStyleSet)(baseSelector, "1px solid ".concat(vv));
  });
  func = 'color';
  Object.entries(colors).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        kk = _ref4[0],
        vv = _ref4[1];

    return ret[(0, _utils.getSelector)(baseSelector, func, kk)] = (0, _utils.getStyleSet)(baseSelector, vv, {
      ext: func
    });
  });
  func = 'style';
  Object.entries(Styles).forEach(function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
        kk = _ref6[0],
        vv = _ref6[1];

    return ret[(0, _utils.getSelector)(baseSelector, func, kk)] = (0, _utils.getStyleSet)(baseSelector, vv === true ? kk : vv, {
      ext: func
    });
  });
  func = 'width';
  Object.entries(widthSizes).forEach(function (_ref7) {
    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
        kk = _ref8[0],
        vv = _ref8[1];

    return ret[(0, _utils.getSelector)(baseSelector, func, kk.trim())] = (0, _utils.getStyleSet)(baseSelector, vv, {
      ext: func
    });
  });
  func = 'none';
  ret[(0, _utils.getSelector)(baseSelector, func)] = (0, _utils.getStyleSet)(baseSelector, 'none');
  func = 'set';
  Object.entries(Dimentions).forEach(function (_ref9) {
    var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
        k = _ref10[0],
        v = _ref10[1];

    Object.entries(colors).forEach(function (_ref11) {
      var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
          kk = _ref12[0],
          vv = _ref12[1];

      return ret[(0, _utils.getSelector)(baseSelector, func, k, kk)] = (0, _utils.getStyleSet)(baseSelector, "1px solid ".concat(vv), {
        mapKey: k,
        mapVal: v
      });
    });
  });
  func = 'color';
  Object.entries(Dimentions).forEach(function (_ref13) {
    var _ref14 = (0, _slicedToArray2.default)(_ref13, 2),
        k = _ref14[0],
        v = _ref14[1];

    Object.entries(colors).forEach(function (_ref15) {
      var _ref16 = (0, _slicedToArray2.default)(_ref15, 2),
          kk = _ref16[0],
          vv = _ref16[1];

      return ret[(0, _utils.getSelector)(baseSelector, func, k, kk)] = (0, _utils.getStyleSet)(baseSelector, vv, {
        mapKey: k,
        mapVal: v,
        ext: func
      });
    });
  });
  func = 'style';
  Object.entries(Dimentions).forEach(function (_ref17) {
    var _ref18 = (0, _slicedToArray2.default)(_ref17, 2),
        k = _ref18[0],
        v = _ref18[1];

    Object.entries(Styles).forEach(function (_ref19) {
      var _ref20 = (0, _slicedToArray2.default)(_ref19, 2),
          kk = _ref20[0],
          vv = _ref20[1];

      return ret[(0, _utils.getSelector)(baseSelector, func, k, kk)] = (0, _utils.getStyleSet)(baseSelector, vv, {
        mapKey: k,
        mapVal: v,
        ext: func
      });
    });
  });
  func = 'width';
  Object.entries(Dimentions).forEach(function (_ref21) {
    var _ref22 = (0, _slicedToArray2.default)(_ref21, 2),
        k = _ref22[0],
        v = _ref22[1];

    Object.entries(widthSizes).forEach(function (_ref23) {
      var _ref24 = (0, _slicedToArray2.default)(_ref23, 2),
          kk = _ref24[0],
          vv = _ref24[1];

      return ret[(0, _utils.getSelector)(baseSelector, func, k, kk.trim())] = (0, _utils.getStyleSet)(baseSelector, vv, {
        mapKey: k,
        mapVal: v,
        ext: func
      });
    });
  });
  func = 'none';
  Object.entries(Dimentions).forEach(function (_ref25) {
    var _ref26 = (0, _slicedToArray2.default)(_ref25, 2),
        k = _ref26[0],
        v = _ref26[1];

    ret[(0, _utils.getSelector)(baseSelector, func, k)] = (0, _utils.getStyleSet)(baseSelector, 'none', {
      mapKey: k,
      mapVal: v
    });
  });
  func = 'radius';
  Object.entries(RadiusDimentions).forEach(function (_ref27) {
    var _ref28 = (0, _slicedToArray2.default)(_ref27, 2),
        k = _ref28[0],
        v = _ref28[1];

    Object.entries(radiusSizes).forEach(function (_ref29) {
      var _ref30 = (0, _slicedToArray2.default)(_ref29, 2),
          kk = _ref30[0],
          vv = _ref30[1];

      return ret[(0, _utils.getSelector)(baseSelector, func, k, kk.trim())] = (0, _compatibleBorder.default)((0, _utils.getStyleSet)(baseSelector, vv, {
        mapKey: k,
        mapVal: v,
        ext: func
      }));
    });
  });
  return ret;
}

module.exports = exports["default"];