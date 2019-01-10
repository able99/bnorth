/**
 * 弹性布局
 * @module
 */
import { getStyleValueSet, genClassObjects } from '../utils';
import compatibleFlex from '../compatibles/compatibleFlex';


/**
 * 样式生成函数：弹性布局
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncFlex({flexDisplay, flexDirection, flexJustify, flexAlign, flexWrap, flexSubFlex}) {
  return Object.assign(
    /**
     * 设置弹性布局显示方式
     * @classname flex-display
     * @param {module:config~GenConfig#flexDisplay} display - 显示方式
     */
    genClassObjects('.flex-display', {
      styleKey: 'display',
      styleValueSet: getStyleValueSet(flexDisplay),
      styleObjectCompatible: compatibleFlex,
    }), 
    /**
     * 设置弹性布局方向
     * @classname flex-direction
     * @param {module:config~GenConfig#flexDirection} direction - 弹性布局方向
     */
    genClassObjects('.flex-direction', {
      styleKey: true,
      styleValueSet: getStyleValueSet(flexDirection),
      styleObjectCompatible: compatibleFlex,
    }), 
    /**
     * 设置主轴对齐方式
     * @classname flex-justify
     * @param {module:config~GenConfig#flexJustify} justify - 主轴对齐方式
     */
    genClassObjects('.flex-justify', {
      styleKey: 'justify-content',
      styleValueSet: getStyleValueSet(flexJustify),
      styleObjectCompatible: compatibleFlex,
    }), 
    /**
     * 设置侧轴对齐方式
     * @classname flex-align
     * @param {module:config~GenConfig#flexAlign} align - 侧轴对齐方式
     */
    genClassObjects('.flex-align', {
      styleKey: 'align-items',
      styleValueSet: getStyleValueSet(flexAlign),
      styleObjectCompatible: compatibleFlex,
    }), 
    /**
     * 设置主轴堆叠方式和方向
     * @classname flex-wrap
     * @param {module:config~GenConfig#flexWrap} wrap - 主轴堆叠方式和方向
     */
    genClassObjects('.flex-wrap', {
      styleKey: true,
      styleValueSet: getStyleValueSet(flexWrap),
      styleObjectCompatible: compatibleFlex,
    }), 
    /**
     * 设置子元素在侧轴对齐方式
     * @classname flex-sub-align
     * @param {module:config~GenConfig#flexAlign} align - 侧轴对齐方式
     */
    genClassObjects('.flex-sub-align', {
      styleKey: 'align-self',
      styleValueSet: getStyleValueSet(flexAlign),
      styleObjectCompatible: compatibleFlex,
    }), 
    /**
     * 设置子元素的弹性方式
     * @classname flex-sub-flex
     * @param {module:config~GenConfig#flexSubFlex} flex - 弹性方式
     */
    genClassObjects('.flex-sub-flex', {
      styleKey: 'flex',
      styleValueSet: getStyleValueSet(flexSubFlex),
      styleObjectCompatible: compatibleFlex,
    }), 
    /**
     * 设置子元素的弹性放大，权重为 1
     * @classname flex-sub-flex-grow
     */
    genClassObjects('.flex-sub-flex-grow', {
      styleKey: 'flex-grow',
      styleValueMap: '1',
      styleObjectCompatible: compatibleFlex,
    }), 
    /**
     * 设置子元素的弹性缩小，权重为 1
     * @classname flex-sub-flex-shrink
     */
    genClassObjects('.flex-sub-flex-shrink', {
      styleKey: 'flex-shrink',
      styleValueMap: '1',
      styleObjectCompatible: compatibleFlex,
    }), 
    genClassObjects('.flex-overflow', {
      styleObjectMap: {
        'position': 'relative',
        'width': '100%',
      },
    }), 
    genClassObjects('.flex-overflow:before', {
      styleObjectMap: {
        'content': '" "',
        'display': 'inline-bloc',
        'width': '100%',
        'height': '1px',
      },
    }), 
    genClassObjects('.flex-overflow .text-truncate-', {
      styleObjectMap: {
        'position': 'absolute',
        'width': '100%',
        'left': '0',
      },
    }), 
  );
}


export default genFuncFlex;