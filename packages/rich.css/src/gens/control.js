/**
 * 控件样式与状态
 * @module
 */
import { genClassObjects } from '../utils';
import { triangleImage } from '../styles/shape'


/**
 * 样式生成函数：控件样式与状态
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncControl({textColors, mainColors, stateDisabled, stateActive}) {
  return Object.assign(
    /**
     * 支持点击状态
     * @classname clickable
     */
    genClassObjects('.clickable:disabled, .clickable[disabled], .clickable.disabled', {
      styleObjectMap: {
        'cursor': 'not-allowed',
        'pointer-events': 'none',
        ...typeof(stateDisabled)==='string'?{'background-color':stateDisabled, 'border-color':stateDisabled}:{opacity:stateDisabled},
      },
    }), 
    genClassObjects('.clickable:active, .clickable[active], .clickable.active', {
      styleObjectMap: typeof(stateActive)==='string'?{'background-color':stateActive, 'border-color':stateActive}:{opacity:stateActive},
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
    genClassObjects('.check-status input + .check-status-inner .check-status-checked', {
      styleObjectMap: {
        'display': 'none !important',
      },
    }), 
    genClassObjects('.check-status input + .check-status-inner .check-status-unchecked', {
      styleObjectMap: {
        'display': 'inline-block !important',
      },
    }), 
    genClassObjects('.check-status input:checked + .check-status-inner .check-status-checked', {
      styleObjectMap: {
        'display': 'inline-block !important',
      },
    }), 
    genClassObjects('.check-status input:checked + .check-status-inner .check-status-unchecked', {
      styleObjectMap: {
        'display': 'none !important',
      },
    }), 


    genClassObjects('input:focus, textarea:focus, select:focus', {
      styleObjectMap: {
        'outline': 0,
      },
    }), 
    genClassObjects('input.disabled, textarea.disabled, select.disabled, input[disabled], textarea[disabled], select[disabled], input[readonly], textarea[readonly], select[readonly], fieldset[disabled]', {
      styleObjectMap: {
        'cursor': 'not-allowed',
      },
    }), 
    genClassObjects('select', {
      styleObjectMap: {
        'background': `url(${triangleImage(mainColors.primary)}) right 0.5em center no-repeat`,
        'background-size': '0.5em',
        'padding-left': '0.5em',
        'padding-right': '1em',
      },
    }), 
    genClassObjects('select::-ms-expand', {
      styleObjectMap: {
        'display': 'none',
      },
    }), 

    genClassObjects('.status-disabled', {
      styleObjectMap: typeof(stateDisabled)==='string'?{'background-color':stateDisabled, 'border-color':stateDisabled}:{opacity:stateDisabled},
    }), 
    genClassObjects('.status-active', {
      styleObjectMap: typeof(stateActive)==='string'?{'background-color':stateActive, 'border-color':stateActive}:{opacity:stateActive},
    }), 
  );
}


export default genFuncControl;





// import { getSelector } from '../utils';


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