"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genButton = genButton;
exports.genSwitchStatus = genSwitchStatus;
exports.genInput = genInput;
exports.genState = genState;
exports.default = gen;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _shape = require("../styles/shape");

var _utils = require("../utils");

function genButton(_ref) {
  var textColors = _ref.textColors,
      stateOpacityDisabled = _ref.stateOpacityDisabled,
      stateOpacityActive = _ref.stateOpacityActive;
  var ret = {};
  ret['button:disabled, button[disabled], button.disabled'] = {
    'opacity': stateOpacityDisabled,
    'cursor': 'not-allowed',
    'pointer-events': 'none'
  };
  ret['.status:disabled, .status[disabled], .status.disabled'] = {
    'opacity': stateOpacityDisabled,
    'cursor': 'not-allowed',
    'pointer-events': 'none'
  };
  ret['button:active, button[active], button.active'] = {
    'opacity': stateOpacityActive
  };
  ret['.status:active, .status[active], .status.active'] = {
    'opacity': stateOpacityActive
  };
  ret['.button-active:not(.selected)'] = {
    'color': textColors.normal
  };
  ret['.button-underline'] = {
    color: 'red'
  };
  return ret;
}

function genSwitchStatus() {
  var ret = {};
  ret['.switch-status input + .status .on'] = {
    'display': 'none !important'
  };
  ret['.switch-status input + .status .off'] = {
    'display': 'inline-block !important'
  };
  ret['.switch-status input:checked + .status .on'] = {
    'display': 'inline-block !important'
  };
  ret['.switch-status input:checked + .status .off'] = {
    'display': 'none !important'
  };
  return ret;
}

function genInput(_ref2) {
  var utilColors = _ref2.utilColors,
      mainColors = _ref2.mainColors;
  var ret = {};
  ret['input:focus, textarea:focus, select:focus'] = {
    'outline': 0
  };
  ret['input.disabled, textarea.disabled, select.disabled, input[disabled], textarea[disabled], select[disabled], input[readonly], textarea[readonly], select[readonly], fieldset[disabled]'] = {
    'cursor': 'not-allowed'
  };
  ret['select'] = {
    'background': "url(".concat((0, _shape.triangleImage)(mainColors.primary), ") right 0.5em center no-repeat"),
    'background-size': '0.5em',
    'padding-left': '0.5em',
    'padding-right': '1em'
  };
  ret['select::-ms-expand'] = {
    'display': 'none'
  };
  return ret;
}

function genState(_ref3) {
  var stateOpacityDisabled = _ref3.stateOpacityDisabled,
      stateOpacityActive = _ref3.stateOpacityActive;
  var ret = {};
  ret[(0, _utils.getSelector)('state', 'disabled')] = {
    'opacity': stateOpacityDisabled
  };
  ret[(0, _utils.getSelector)('state', 'active')] = {
    'opacity': stateOpacityActive
  };
  return ret;
}

function gen(config) {
  return (0, _objectSpread2.default)({}, genButton(config), genSwitchStatus(config), genInput(config), genState(config));
}