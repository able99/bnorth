/**
 * 文本样式
 * @module
 */
import { getStyleValueSet, getStyleValueSetDefault, genClassObjects } from '../utils';


/**
 * 样式生成函数：文本
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncText({utilColors, mainColors, textColors, textFontFamily, textSize, textWeight, textStyle, textDecoration, textAlign, textVerticalAligns, textWhiteSpaces, lineHeight, textTruncate}) {
  lineHeight = getStyleValueSet(lineHeight);

  return Object.assign(
    /**
     * 设置文本尺寸
     * @classname text-size
     * @param {module:config~GenConfig#textSize} size - 文本尺寸
     */
    genClassObjects('.text-size', {
      styleKey: 'font-size',
      styleValueSet: getStyleValueSet(textSize), 
    }), 
    /**
     * 设置文本粗度
     * @classname text-weight
     * @param {module:config~GenConfig#textWeight} weight - 文本粗度
     */
    genClassObjects('.text-weight', {
      styleKey: 'font-weight',
      styleValueSet: getStyleValueSet(textWeight), 
    }), 
    /**
     * 设置文本样色
     * @classname text-color
     * @param {module:config~GenConfig#utilColors|module:config~GenConfig#mainColors|module:config~GenConfig#textColors} [color=textColors.normal] - 文本粗度
     */
    genClassObjects('.text-color', {
      styleKey: 'color',
      styleValueSet: { '-': textColors.normal, ...utilColors, ...mainColors, ...textColors },
    }), 
    /**
     * 设置文本样式
     * @classname text-style
     * @param {module:config~GenConfig#textStyle} style - 文本样式
     */
    genClassObjects('.text-style', {
      styleKey: 'font-style',
      styleValueSet: getStyleValueSet(textStyle), 
    }), 
    /**
     * 设置文本装饰
     * @classname text-decoration
     * @param {module:config~GenConfig#textDecoration} style - 文本装饰
     */
    genClassObjects('.text-decoration', {
      styleKey: true,
      styleValueSet: getStyleValueSet(textDecoration), 
    }), 
    /**
     * 设置对齐方式
     * @classname text-align
     * @param {module:config~GenConfig#textAlign} align - 对齐方式
     */
    genClassObjects('.text-align', {
      styleKey: true,
      styleValueSet: getStyleValueSet(textAlign), 
    }), 
    /**
     * 设置垂直对齐方式
     * @classname text-vertical-align
     * @param {module:config~GenConfig#textVerticalAligns} verticalAlign - 垂直对齐方式
     */
    genClassObjects('.text-vertical-align', {
      styleKey: 'vertical-align',
      styleValueSet: getStyleValueSet(textVerticalAligns), 
    }), 
    /**
     * 设置空白样式
     * @classname text-white-space
     * @param {module:config~GenConfig#textWhiteSpaces} whiteSpaces - 空白样式
     */
    genClassObjects('.text-white-space', {
      styleKey: 'white-space',
      styleValueSet: getStyleValueSet(textWhiteSpaces), 
    }), 
    /**
     * 设置文本字体
     * @classname text-family
     * @param {module:config~GenConfig#textFontFamily} family - 字体
     */
    genClassObjects('.text-family', {
      styleKey: 'font-family',
      styleValueSet: textFontFamily,
    }), 
    /**
     * 设置文本溢出时省略显示
     * @classname text-truncate-
     */
    genClassObjects('.text-truncate', {
      selectorExt: '-',
      styleObjectMap: {
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      }
    }),
    /**
     * 设置文本溢出时省略显示，line-clamp 方式，可设置行数，但是 ie 不兼容
     * @classname text-decoration
     * @param {module:config~GenConfig#textTruncate} line - 文本行数
     * @param {module:config~gen#StyleSwitcher} switcher - 样式开关
     */
    genClassObjects('.text-truncate', {
      selectorExt: '-',
      styleValueSet: getStyleValueSet(textTruncate),
      styleObjectMap: (styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue)=>({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': styleValueSetValue,
        'line-height': getStyleValueSetDefault(lineHeight),
        'max-height': (Number(getStyleValueSetDefault(lineHeight))*Number(styleValueSetValue)).toFixed(1)+'em',
      })
    }),
    /**
     * 设置文本溢出时省略显示，不足设置行数时，保留行高度
     * @classname text-truncate
     * @classnameext placeholder
     * @param {module:config~GenConfig#textTruncate} line - 文本行数
     * @param {module:config~gen#StyleSwitcher} switcher - 样式开关
     */
    genClassObjects('.text-truncate', {
      selectorExt: 'placeholder-',
      styleValueSet: getStyleValueSet(textTruncate),
      styleObjectMap: (styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue)=>({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': styleValueSetValue,
        'line-height': getStyleValueSetDefault(lineHeight),
        'max-height': (Number(getStyleValueSetDefault(lineHeight))*Number(styleValueSetValue)).toFixed(1)+'em',
        'min-height': (Number(getStyleValueSetDefault(lineHeight))*Number(styleValueSetValue)).toFixed(1)+'em',
      })
    }),
  );
}


export default genFuncText;