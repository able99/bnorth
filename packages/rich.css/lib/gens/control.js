"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _utils = require("../utils");

var _shape = require("../styles/shape");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 样式生成函数：控件样式与状态
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncControl(_ref) {
  var textColors = _ref.textColors,
      mainColors = _ref.mainColors,
      stateDisabled = _ref.stateDisabled,
      stateActive = _ref.stateActive;
  return (0, _assign.default)(
  /**
   * 支持点击状态
   * @classname btn
   */
  (0, _utils.genClassObjects)('.btn:disabled, .btn[disabled], .btn.disabled', {
    styleObjectMap: _objectSpread({
      'cursor': 'not-allowed',
      'pointer-events': 'none'
    }, typeof stateDisabled === 'string' ? {
      'background-color': stateDisabled,
      'border-color': stateDisabled
    } : {
      opacity: stateDisabled
    })
  }), (0, _utils.genClassObjects)('.btn:active, .btn[active], .btn.active', {
    styleObjectMap: typeof stateActive === 'string' ? {
      'background-color': stateActive,
      'border-color': stateActive
    } : {
      opacity: stateActive
    }
  }),
  /**
   * 支持基于 input check 状态的双态
   * @classname check-status
   */

  /**
   * 基于 input check 状态的双态的容器
   * @classname check-status-inner
   */

  /**
   * 基于 input check 状态的双态的选中状态
   * @classname check-status-checked
   */

  /**
   * 基于 input check 状态的双态的未选中状态
   * @classname check-status-unchecked
   */
  (0, _utils.genClassObjects)('.check-status input + .check-status-inner .check-status-checked', {
    styleObjectMap: {
      'display': 'none !important'
    }
  }), (0, _utils.genClassObjects)('.check-status input + .check-status-inner .check-status-unchecked', {
    styleObjectMap: {
      'display': 'inline-block !important'
    }
  }), (0, _utils.genClassObjects)('.check-status input:checked + .check-status-inner .check-status-checked', {
    styleObjectMap: {
      'display': 'inline-block !important'
    }
  }), (0, _utils.genClassObjects)('.check-status input:checked + .check-status-inner .check-status-unchecked', {
    styleObjectMap: {
      'display': 'none !important'
    }
  }), (0, _utils.genClassObjects)('input:focus, textarea:focus, select:focus', {
    styleObjectMap: {
      'outline': 0
    }
  }), (0, _utils.genClassObjects)('input.disabled, textarea.disabled, select.disabled, input[disabled], textarea[disabled], select[disabled], input[readonly], textarea[readonly], select[readonly], fieldset[disabled]', {
    styleObjectMap: {
      'cursor': 'not-allowed'
    }
  }), (0, _utils.genClassObjects)('select', {
    styleObjectMap: {
      'background': "url(".concat((0, _shape.triangleImage)(mainColors.primary), ") right 0.5em center no-repeat"),
      'background-size': '0.5em',
      'padding-left': '0.5em',
      'padding-right': '1em'
    }
  }), (0, _utils.genClassObjects)('select::-ms-expand', {
    styleObjectMap: {
      'display': 'none'
    }
  }), (0, _utils.genClassObjects)('.status-disabled', {
    styleObjectMap: typeof stateDisabled === 'string' ? {
      'background-color': stateDisabled,
      'border-color': stateDisabled
    } : {
      opacity: stateDisabled
    }
  }), (0, _utils.genClassObjects)('.status-active', {
    styleObjectMap: typeof stateActive === 'string' ? {
      'background-color': stateActive,
      'border-color': stateActive
    } : {
      opacity: stateActive
    }
  }));
}

var _default = genFuncControl; // import { getSelector } from '../utils';
// export function genIconFont({iconFonts, iconClassName}) {
//   if(!iconFonts||!iconClassName) return;
//   if(typeof iconFonts === 'string') iconFonts = [{src: iconFonts}];
//   if(!Array.isArray(iconFonts)) iconFonts = [iconFonts];
//   let ret = {};
//   iconFonts.forEach((v,i)=>{
//     ret[`@font-face${' '.repeat(i)}`] = {
//       'font-family': v.family||'font',
//       'font-weight': v.weight||'normal',
//       'font-style': v.style||'normal',
//       'src': v.src,
//     }
//   });
//   let familys = iconFonts.reduce((v1, v2)=>{
//     return v1 + (v2.family||'font') + ', ';
//   },'') + 'sans-serif';
//   ret[getSelector(iconClassName)] = {
//     'font-family': familys,
//   }
//   return ret;
// }
// export function genIconClass({iconClassName='icon-'}) {
//   if(!iconClassName) return;
//   let ret = {};
//   ret[getSelector(iconClassName+':before')] = {
//     'content': 'attr(data-icon-name)',
//   }
//   ret[getSelector(iconClassName+'.button')] = {
//     'font-size': 'inherit',
//   }
//   return ret;
// }
// export default function gen(config) {
//   return {
//     ...genIconFont(config), 
//     ...genIconClass(config),
//   };
// }

exports.default = _default;