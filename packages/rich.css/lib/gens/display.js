"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genDisplay = genDisplay;
exports.genVisibility = genVisibility;
exports.genOpacity = genOpacity;
exports.genOverflows = genOverflows;
exports.genScrollable = genScrollable;
exports.genPointerEvents = genPointerEvents;
exports.genFloat = genFloat;
exports.default = gen;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var Displays = {
  'inline': true,
  'inlineblock': 'inline-block',
  'none': true,
  'block': true
};
var Visibilitis = {
  'show': 'visible',
  'hide': 'hidden'
};
var Overflows = {
  'hidden': true,
  'scroll': true,
  'auto': true,
  'inherit': true,
  'visible': true
};
var PointerEvents = {
  'none': true,
  'all': true
};
var Floats = {
  'left': true,
  'right': true,
  'none': true
};

function genDisplay() {
  var ret = {};
  var selector = 'display';
  Object.entries(Displays).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(selector, v, {
      key: k
    });
  });
  return ret;
}

function genVisibility() {
  var ret = {};
  var selector = 'visibility';
  Object.entries(Visibilitis).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(selector, v, {
      key: k
    });
  });
  return ret;
}

function genOpacity() {
  var ret = {};
  var selector = 'opacity';
  Array(11).fill(0).map(function (v, i) {
    return i * 10;
  }).forEach(function (v) {
    return ret[(0, _utils.getSelector)(selector, v)] = (0, _utils.getStyleSet)(selector, (v / 100).toFixed(2));
  });
  return ret;
}

function genOverflows() {
  var ret = {};
  var selector = 'overflow';
  Object.entries(Overflows).forEach(function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];

    ret[(0, _utils.getSelector)(selector, 'a', k)] = (0, _utils.getStyleSet)(selector, v, {
      key: k
    });
    ret[(0, _utils.getSelector)(selector, 'x', k)] = (0, _utils.getStyleSet)("".concat(selector, "-x"), v, {
      key: k
    });
    ret[(0, _utils.getSelector)(selector, 'y', k)] = (0, _utils.getStyleSet)("".concat(selector, "-y"), v, {
      key: k
    });
  });
  return ret;
}

function genScrollable() {
  var ret = {};
  var selector = 'scrollable';
  ret[(0, _utils.getSelector)(selector, 'a-')] = {
    'max-width': '100%',
    'max-height': '100%',
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
    '-webkit-overflow-scrolling': 'touch'
  };
  ret[(0, _utils.getSelector)(selector, 'x-')] = {
    'max-width': '100%',
    'overflow-x': 'hidden',
    '-webkit-overflow-scrolling': 'touch'
  };
  ret[(0, _utils.getSelector)(selector, 'y-')] = {
    'max-height': '100%',
    'overflow-y': 'auto',
    '-webkit-overflow-scrolling': 'touch'
  };
  return ret;
}

function genPointerEvents() {
  var ret = {};
  var selector = 'pointer-events';
  Object.entries(PointerEvents).forEach(function (_ref7) {
    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
        k = _ref8[0],
        v = _ref8[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(selector, v, {
      key: k
    });
  });
  return ret;
}

function genFloat() {
  var ret = {};
  var selector = 'float';
  Object.entries(Floats).forEach(function (_ref9) {
    var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
        k = _ref10[0],
        v = _ref10[1];

    return ret[(0, _utils.getSelector)(selector, k)] = (0, _utils.getStyleSet)(selector, v, {
      key: k
    });
  });
  ret[(0, _utils.getSelector)('clear:before')] = {
    'content': "' '",
    'display': 'table'
  };
  ret[(0, _utils.getSelector)('clear:after')] = (0, _objectSpread2.default)({}, ret[(0, _utils.getSelector)('clear:before')], {
    'clear': 'both'
  });
  return ret;
}

function gen(config) {
  return (0, _objectSpread2.default)({}, genDisplay(config), genVisibility(config), genOpacity(config), genOverflows(config), genScrollable(config), genPointerEvents(config), genFloat(config));
}