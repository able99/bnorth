"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

var _compatibleAnimation = _interopRequireDefault(require("../compatibles/compatibleAnimation"));

function genFuncPosition(_ref) {
  var position = _ref.position,
      directionOffsetAll = _ref.directionOffsetAll,
      directionOffset = _ref.directionOffset;
  return Object.assign((0, _utils.genClassObjects)('.position', {
    styleKey: 'position',
    styleValueSet: (0, _utils.getStyleValueSet)(position)
  }), (0, _utils.genClassObjects)('.offset', {
    selectorExt: 'start',
    styleKeySet: directionOffsetAll,
    styleValueMap: function styleValueMap() {
      return '0';
    }
  }), (0, _utils.genClassObjects)('.offset', {
    selectorExt: 'center',
    styleKey: ' ',
    styleKeySet: directionOffset,
    styleValueMap: function styleValueMap() {
      return '50%';
    }
  }), (0, _utils.genClassObjects)('.offset', {
    selectorExt: 'end',
    styleKey: ' ',
    styleKeySet: directionOffset,
    styleValueMap: function styleValueMap() {
      return '100%';
    }
  }), (0, _utils.genClassObjects)('.translate-center', {
    selectorExt: 'a',
    styleKey: 'transform',
    styleValueMap: function styleValueMap() {
      return 'translate3d(-50%, -50%, 0)';
    },
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.translate-center', {
    selectorExt: 'x',
    styleKey: 'transform',
    styleValueMap: function styleValueMap() {
      return 'translate3d(-50%, 0, 0)';
    },
    styleObjectCompatible: _compatibleAnimation.default
  }), (0, _utils.genClassObjects)('.translate-center', {
    selectorExt: 'y',
    styleKey: 'transform',
    styleValueMap: function styleValueMap() {
      return 'translate3d(0, -50%, 0)';
    },
    styleObjectCompatible: _compatibleAnimation.default
  }));
}

var _default = genFuncPosition;
exports.default = _default;