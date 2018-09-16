"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gen;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _compatibleFlex = _interopRequireDefault(require("../compatibles/compatibleFlex"));

var Inlines = {
  'block': 'flex',
  'inline': 'flex-inline'
};
var Directions = {
  'h': 'row',
  'v': 'column',
  'hv': 'row-reverse',
  'vv': 'column-reverse'
};
var Justifis = {
  'start': 'flex-start',
  'center': 'center',
  'end': 'flex-end',
  'between': 'space-between',
  'around': 'space-around'
};
var Aligns = {
  'start': 'flex-start',
  'center': 'center',
  'end': 'flex-end',
  'baseline': 'baseline',
  'stretch': 'stretch'
};
var Wraps = {
  'wrap': 'wrap',
  'nowrap': 'nowrap',
  'reverse': 'reverse'
};
var BaseSelector = 'flex';
var BaseSelectorSub = 'flex-sub';

function gen() {
  var ret = {};
  Object.entries(Inlines).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return ret[(0, _utils.getSelector)(BaseSelector, 'display', k)] = (0, _compatibleFlex.default)((0, _utils.getStyleSet)('display', v));
  });
  Object.entries(Directions).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return ret[(0, _utils.getSelector)(BaseSelector, 'direction', k)] = (0, _compatibleFlex.default)((0, _utils.getStyleSet)('flex-direction', v));
  });
  Object.entries(Justifis).forEach(function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];

    return ret[(0, _utils.getSelector)(BaseSelector, 'justify', k)] = (0, _compatibleFlex.default)((0, _utils.getStyleSet)('justify-content', v));
  });
  Object.entries(Aligns).forEach(function (_ref7) {
    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
        k = _ref8[0],
        v = _ref8[1];

    return ret[(0, _utils.getSelector)(BaseSelector, 'align', k)] = (0, _compatibleFlex.default)((0, _utils.getStyleSet)('align-items', v));
  });
  Object.entries(Wraps).forEach(function (_ref9) {
    var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
        k = _ref10[0],
        v = _ref10[1];

    return ret[(0, _utils.getSelector)(BaseSelector, 'wrap', k)] = (0, _compatibleFlex.default)((0, _utils.getStyleSet)('flex-wrap', v));
  });
  Object.entries(Aligns).forEach(function (_ref11) {
    var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
        k = _ref12[0],
        v = _ref12[1];

    return ret[(0, _utils.getSelector)(BaseSelectorSub, 'align', k)] = (0, _compatibleFlex.default)((0, _utils.getStyleSet)('align-self', v));
  });
  ret[(0, _utils.getSelector)(BaseSelectorSub, 'flex-auto')] = (0, _compatibleFlex.default)({
    'flex': 'auto'
  });
  ret[(0, _utils.getSelector)(BaseSelectorSub, 'flex-none')] = (0, _compatibleFlex.default)({
    'flex': 'none'
  });
  ret[(0, _utils.getSelector)(BaseSelectorSub, 'flex-extend')] = (0, _compatibleFlex.default)({
    'flex': '1'
  });
  ret[(0, _utils.getSelector)(BaseSelectorSub, 'flex-grow')] = (0, _compatibleFlex.default)({
    'flex-grow': 1
  });
  ret[(0, _utils.getSelector)(BaseSelectorSub, 'flex-shrink')] = (0, _compatibleFlex.default)({
    'flex-shrink': 1
  });
  ret[(0, _utils.getSelector)(BaseSelector, 'overflow')] = {
    'position': 'relative',
    'width': '100%'
  };
  ret[(0, _utils.getSelector)(BaseSelector, 'overflow:before')] = {
    'content': '" "',
    'display': 'inline-bloc',
    'width': '100%',
    'height': '1px'
  };
  ret[(0, _utils.getSelector)(BaseSelector, 'flex-overflow .text-truncate-old')] = {
    'position': 'absolute',
    'width': '100%',
    'left': '0'
  };
  return ret;
}