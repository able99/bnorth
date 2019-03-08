/**
 * 边框样式
 * @module
 */
import { getStyleValueSet, genClassObjects } from '../utils';
import compatibleBorder from '../compatibles/compatibleBorder';


/**
 * 样式生成函数：边框
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncBorder({ utilColors, mainColors, directionEdge, directionCorner, borderStyle, borderWidth, borderRadius }) {
  let colors = {'-': utilColors.border, ...utilColors, ...mainColors};

  return Object.assign(
    /**
     * 设置边框，可指定边框位置和颜色，实线样式和 1 像素宽度固定
     * @classname border-set
     * @param {module:config~GenConfig#directionEdge} edge - 位置
     * @param {module:config~GenConfig#utilColors|module:config~GenConfig#mainColors} [color=utilColors.border] - 颜色
     */
    genClassObjects('.border-set', {
      styleKey: 'border',
      styleKeySet: directionEdge,
      styleValueSet: colors,
      styleValueMap: val=>`1px solid ${val}`,
    }), 
    /**
     * 设置边框的颜色
     * @classname border-color
     * @param {module:config~GenConfig#directionEdge} edge - 位置
     * @param {module:config~GenConfig#utilColors|module:config~GenConfig#mainColors} [color=utilColors.border] - 颜色
     */
    genClassObjects('.border-color', {
      styleKey: 'border',
      styleKeyExt: 'color',
      styleKeySet: directionEdge,
      styleValueSet: colors,
    }), 
    /**
     * 设置边框的风格
     * @classname border-style
     * @param {module:config~GenConfig#directionEdge} edge - 位置
     * @param {module:config~GenConfig#borderStyle} style - 样式
     */
    genClassObjects('.border-style', {
      styleKey: 'border',
      styleKeyExt: 'style',
      styleKeySet: directionEdge,
      styleValueSet: getStyleValueSet(borderStyle),
    }),
    /**
     * 设置边框的宽度
     * @classname border-width
     * @param {module:config~GenConfig#directionEdge} edge - 位置
     * @param {module:config~GenConfig#borderWidth} width - 宽度
     */
    genClassObjects('.border-width', {
      styleKey: 'border',
      styleKeyExt: 'width',
      styleKeySet: directionEdge,
      styleValueSet: getStyleValueSet(borderWidth),
    }),
    /**
     * 设置无边框，因各个方向可以同时设置，需要设置开关
     * @classname border-none
     * @param {module:config~GenConfig#directionEdge} edge - 位置
     * @param {module:config~gen#StyleSwitcher} switcher - 样式开关
     */
    genClassObjects('.border-none', {
      selectorExt: '-',
      styleKey: 'border',
      styleKeySet: directionEdge,
      styleValueMap: ()=>'none',
    }),
    /**
     * 设置边框圆角
     * @classname border-radius
     * @param {module:config~GenConfig#directionCorner} edge - 圆角位置
     * @param {module:config~GenConfig#borderRadius} width - 圆角半径
     */
    genClassObjects('.border-radius', {
      styleKey: 'border',
      styleKeyExt: 'radius',
      styleKeySet: directionCorner,
      styleValueSet: getStyleValueSet(borderRadius),
      styleObjectCompatible: compatibleBorder,
    }),
  );
}


export default genFuncBorder;