/**
 * @module
 */
import { getStyleValueSet, genClassObjects } from '../utils';
import compatibleBorder from '../compatibles/compatibleBorder';


/**
 * 生成边框相关样式表
 * @exportdefault
 * @param {ClassNamesConfig} - class names 生成配置对象
 * @returns {object} class names 中间对象，由 cssGen 调用
 */
function genFuncBorder({ utilColors, mainColors, directionEdge, directionCorner, borderStyle, borderWidth, borderRadius }) {
  let colors = {'-': utilColors.border, ...utilColors, ...mainColors};

  return Object.assign(
    /**
     * 设置边框
     * @classname border-set
     * @param {string} edge - 边框的位置
     * @param {string=} color - 边框的颜色
     * @example
     * ```jsx
     * <div className="border-set-a-">
     * ```
     */
    genClassObjects('.border-set', {
      styleKey: 'border',
      styleKeySet: directionEdge,
      styleValueSet: colors,
      styleValueMap: val=>`1px solid ${val}`,
    }), 
    genClassObjects('.border-color', {
      styleKey: 'border',
      styleKeyExt: 'color',
      styleKeySet: directionEdge,
      styleValueSet: colors,
    }), 
    genClassObjects('.border-style', {
      styleKey: 'border',
      styleKeyExt: 'style',
      styleKeySet: directionEdge,
      styleValueSet: getStyleValueSet(borderStyle),
    }),
    genClassObjects('.border-width', {
      styleKey: 'border',
      styleKeyExt: 'width',
      styleKeySet: directionEdge,
      styleValueSet: getStyleValueSet(borderWidth),
    }),
    genClassObjects('.border-none', {
      selectorExt: '-',
      styleKey: 'border',
      styleKeySet: directionEdge,
      styleValueMap: ()=>'none',
    }),
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