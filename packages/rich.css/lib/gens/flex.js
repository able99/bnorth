"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

var _compatibleFlex = _interopRequireDefault(require("../compatibles/compatibleFlex"));

function genFuncFlex(_ref) {
  var flexDisplay = _ref.flexDisplay,
      flexDirection = _ref.flexDirection,
      flexJustify = _ref.flexJustify,
      flexAlign = _ref.flexAlign,
      flexWrap = _ref.flexWrap,
      flexSubFlex = _ref.flexSubFlex;
  return Object.assign((0, _utils.genClassObjects)('.flex-display', {
    styleKey: 'display',
    styleValueSet: (0, _utils.getStyleValueSet)(flexDisplay),
    styleObjectCompatible: _compatibleFlex.default
  }), (0, _utils.genClassObjects)('.flex-direction', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(flexDirection),
    styleObjectCompatible: _compatibleFlex.default
  }), (0, _utils.genClassObjects)('.flex-justify', {
    styleKey: 'justify-content',
    styleValueSet: (0, _utils.getStyleValueSet)(flexJustify),
    styleObjectCompatible: _compatibleFlex.default
  }), (0, _utils.genClassObjects)('.flex-align', {
    styleKey: 'align-items',
    styleValueSet: (0, _utils.getStyleValueSet)(flexAlign),
    styleObjectCompatible: _compatibleFlex.default
  }), (0, _utils.genClassObjects)('.flex-wrap', {
    styleKey: true,
    styleValueSet: (0, _utils.getStyleValueSet)(flexWrap),
    styleObjectCompatible: _compatibleFlex.default
  }), (0, _utils.genClassObjects)('.flex-sub-align', {
    styleKey: 'align-self',
    styleValueSet: (0, _utils.getStyleValueSet)(flexAlign),
    styleObjectCompatible: _compatibleFlex.default
  }), (0, _utils.genClassObjects)('.flex-sub-flex', {
    styleKey: 'flex',
    styleValueSet: (0, _utils.getStyleValueSet)(flexSubFlex),
    styleObjectCompatible: _compatibleFlex.default
  }), (0, _utils.genClassObjects)('.flex-sub-flex-extend', {
    styleKey: 'flex-grow',
    styleValueMap: '1',
    styleObjectCompatible: _compatibleFlex.default
  }), (0, _utils.genClassObjects)('.flex-sub-flex-shrink', {
    styleKey: 'flex-shrink',
    styleValueMap: '1',
    styleObjectCompatible: _compatibleFlex.default
  }), (0, _utils.genClassObjects)('.flex-overflow', {
    styleObjectMap: {
      'position': 'relative',
      'width': '100%'
    }
  }), (0, _utils.genClassObjects)('.flex-overflow:before', {
    styleObjectMap: {
      'content': '" "',
      'display': 'inline-bloc',
      'width': '100%',
      'height': '1px'
    }
  }), (0, _utils.genClassObjects)('.flex-overflow .text-truncate-old', {
    styleObjectMap: {
      'position': 'absolute',
      'width': '100%',
      'left': '0'
    }
  }));
}

var _default = genFuncFlex;
exports.default = _default;