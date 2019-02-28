"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _utils = require("../utils");

var _shape = require("../styles/shape");

/**
 * 控件样式与状态
 * @module
 */

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
      stateOpacityDisabled = _ref.stateOpacityDisabled,
      stateOpacityActive = _ref.stateOpacityActive;
  return Object.assign(
  /**
   * 支持点击状态
   * @classname btn
   */
  (0, _utils.genClassObjects)('.btn:disabled, .btn[disabled], .btn.disabled', {
    styleObjectMap: {
      'opacity': stateOpacityDisabled,
      'cursor': 'not-allowed',
      'pointer-events': 'none'
    }
  }), (0, _utils.genClassObjects)('.btn:active, .btn[active], .btn.active', {
    styleObjectMap: {
      'opacity': stateOpacityActive
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
    styleObjectMap: {
      'opacity': stateOpacityDisabled
    }
  }), (0, _utils.genClassObjects)('.status-active', {
    styleObjectMap: {
      'opacity': stateOpacityActive
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