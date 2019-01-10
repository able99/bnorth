/**
 * 基本样式
 * @module
 */
import { getStyleValueSet, getStyleValueSetDefault, genClassObjects } from '../utils';
import compatibleAnimation from '../compatibles/compatibleAnimation';


/**
 * 样式生成函数：基本样式
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncBase({ textColors, utilColors, textSize, hMapTextSize, textFontFamily, textWeight, bodyBackground, lineHeight, transitionTime }) {
  textSize = getStyleValueSet(textSize);
  textWeight = getStyleValueSet(textWeight);
  lineHeight = getStyleValueSet(lineHeight);

  return Object.assign(
    genClassObjects('html', {
      styleObjectMap: {
        'font-size': getStyleValueSetDefault(textSize),
      },
    }), 
    genClassObjects('body', {
      styleObjectMap: {
        'font-size':  getStyleValueSetDefault(textSize),
        'color':       textColors.normal,
        'font-family': getStyleValueSetDefault(textFontFamily),
        'font-weight': getStyleValueSetDefault(textWeight),
        'line-height': getStyleValueSetDefault(lineHeight),
        'background':  bodyBackground,
      },
    }), 
    genClassObjects('h', {
      styleValueSet: getStyleValueSet(hMapTextSize),
      styleObjectMap: (styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue)=>{
        return {
          'font-weight': textWeight.bold,
          'font-size': textSize[styleValueSetValue],
        }
      }
    }),
    genClassObjects('strong', {
      styleObjectMap: {
        'font-weight': textWeight.bold,
      },
    }), 
    genClassObjects('hr', {
      styleObjectMap: {
        'border':  `1px solid ${utilColors.border}`,
        'border-width': '1 0 0',
        'clear': 'both',
        'height': 0,
      },
    }), 
    /**
     * 设置渐变动画，时间可变，属性固定为全部，渐变函数固定为 ease-out
     * @classname transition-set
     * @param {module:config~GenConfig#transitionTime} time - 过度时间
     */
    genClassObjects('.transition-set', {
      styleKey: 'transition',
      styleValueSet: getStyleValueSet(transitionTime),
      styleValueMap: val=>`${val} ease-out`,
      styleObjectCompatible: compatibleAnimation,
    }), 
    /**
     * 设置行高
     * @classname line-height
     * @param {module:config~GenConfig#lineHeight} lineHeight - 行高
     */
    genClassObjects('.line-height', {
      styleKey: true,
      styleValueSet: lineHeight, 
    }), 
    /**
     * 设置不显示轮廓
     * @classname outline-none-
     */
    genClassObjects('.outline-none-', {
      styleObjectMap: {
        'outline': 'none',
      },
    }), 
    /**
     * 设置不显示特殊元素的浏览器默认样式
     * @classname appearance-none-
     */
    genClassObjects('.appearance-none-', {
      styleObjectMap: {
        'appearance': 'none',
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
      },
    }), 
    /**
     * 设置元素旋转时不显示背面
     * @classname backface-hidden-
     */
    genClassObjects('.backface-hidden-', {
      styleObjectMap: {
        'backface-visibility': 'hidden',
      },
    }), 
    /**
     * 设置强制使用硬件加速绘制
     * @classname force-hardware-acceleration-
     */
    genClassObjects('.force-hardware-acceleration-', {
      styleObjectMap: {
        'transform': 'translateZ(0)',
        'backface-visibility': 'hidden',
        'perspective': '1000',
      },
      styleObjectCompatible: compatibleAnimation,
    }), 
    /**
     * 设置文字反锯齿
     * @classname font-smoothing-antialiased-
     */
    genClassObjects('.font-smoothing-antialiased-', {
      styleObjectMap: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      },
    }), 
  );
}


export default genFuncBase;