/**
 * 背景
 * @module
 */
import { genClassObjects } from '../utils';


/**
 * 样式生成函数：背景
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncBackground({utilColors, mainColors, opacityColors}) {
  return Object.assign(
    /**
     * 设置背景颜色
     * @classname bg-color
     * @param {module:config~GenConfig#utilColors|module:config~GenConfig#mainColors|module:config~GenConfig#opacityColors} color - 颜色
     */
    genClassObjects('.bg-color', {
      styleKey: 'background-color',
      styleValueSet: { ...utilColors, ...mainColors, ...opacityColors },
    }), 
    /**
     * 设置无背景
     * @classname bg-none
     */
    genClassObjects('.bg-none', {
      styleObjectMap: {
        'background': 'none',
      },
    }), 
  );
}


export default genFuncBackground;