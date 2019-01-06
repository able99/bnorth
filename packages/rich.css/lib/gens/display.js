"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

function genFuncDisplay(_ref) {
  var directionAxis = _ref.directionAxis,
      display = _ref.display,
      visibility = _ref.visibility,
      opacity = _ref.opacity,
      pointerEvents = _ref.pointerEvents,
      overflow = _ref.overflow,
      float = _ref.float;
  return Object.assign((0, _utils.genClassObjects)('.display', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(display)
  }), (0, _utils.genClassObjects)('.visibility', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(visibility)
  }), (0, _utils.genClassObjects)('.opacity', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(opacity),
    styleValueMap: function styleValueMap(val) {
      return (val / 100).toFixed(2);
    }
  }), (0, _utils.genClassObjects)('.scrollable', {
    selectorExt: '-',
    styleKeySet: (0, _utils.getStyleValueSet)(directionAxis),
    styleObjectMap: function styleObjectMap(styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue) {
      return {
        'max-width': styleKeySetKey !== 'y' ? '100%' : undefined,
        'max-height': styleKeySetKey !== 'x' ? '100%' : undefined,
        'overflow-x': styleKeySetKey !== 'y' ? 'auto' : 'hidden',
        'overflow-y': styleKeySetKey !== 'x' ? 'auto' : 'hidden',
        '-webkit-overflow-scrolling': 'touch'
      };
    }
  }), (0, _utils.genClassObjects)('.overflow', {
    styleKey: true,
    styleKeySet: (0, _utils.getStyleValueSet)(directionAxis),
    styleValueSet: (0, _utils.getStyleValueSet)(overflow)
  }), (0, _utils.genClassObjects)('.pointer-events', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(pointerEvents)
  }), (0, _utils.genClassObjects)('.float', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(float)
  }), (0, _utils.genClassObjects)('.clear:before', {
    styleObjectMap: {
      'content': "' '",
      'display': 'table'
    }
  }), (0, _utils.genClassObjects)('.clear:after', {
    styleObjectMap: {
      'content': "' '",
      'display': 'table',
      'clear': 'both'
    }
  }));
}

var _default = genFuncDisplay;
exports.default = _default;