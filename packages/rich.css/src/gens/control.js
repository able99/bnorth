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
function genFuncControl({textColors, mainColors, stateOpacityDisabled, stateOpacityActive}) {
  return Object.assign(
    genClassObjects('button:disabled, button[disabled], button.disabled', {
      styleObjectMap: {
        'opacity': stateOpacityDisabled,
        'cursor': 'not-allowed',
        'pointer-events': 'none',
      },
    }), 
    genClassObjects('.status-:disabled, .status-[disabled], .status-.disabled', {
      styleObjectMap: {
        'opacity': stateOpacityDisabled,
        'cursor': 'not-allowed',
        'pointer-events': 'none',
      },
    }), 
    genClassObjects('button:active, button[active], button.active', {
      styleObjectMap: {
        'opacity': stateOpacityActive,
      },
    }), 
    genClassObjects('.status-:active, .status-[active], .status-.active', {
      styleObjectMap: {
        'opacity': stateOpacityActive,
      },
    }), 
    genClassObjects('.button-active:not(.selected)', {
      styleObjectMap: {
        'color': textColors.normal,
      },
    }), 

    genClassObjects('.switch-status input + .status- .on-', {
      styleObjectMap: {
        'display': 'none !important',
      },
    }), 
    genClassObjects('.switch-status input + .status- .off-', {
      styleObjectMap: {
        'display': 'inline-block !important',
      },
    }), 
    genClassObjects('.switch-status input:checked + .status- .on-', {
      styleObjectMap: {
        'display': 'inline-block !important',
      },
    }), 
    genClassObjects('.switch-status input:checked + .status- .off-', {
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
      styleObjectMap: {
        'opacity': stateOpacityDisabled,
      },
    }), 
    genClassObjects('.status-active', {
      styleObjectMap: {
        'opacity': stateOpacityActive,
      },
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