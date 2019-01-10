/**
 * 位置
 * @module
 */
import { getStyleValueSet, genClassObjects } from '../utils';
import compatibleAnimation from '../compatibles/compatibleAnimation';


/**
 * 样式生成函数：位置
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncPosition({ position, directionOffsetAll, directionOffset }) {
  return Object.assign(
    /**
     * 设置定位类型
     * @classname position
     * @param {module:config~GenConfig#position} position - 定位类型
     */
    genClassObjects('.position', {
      styleKey: 'position',
      styleValueSet: getStyleValueSet(position),
    }), 
    /**
     * 设置指定方向的偏移量为0
     * @classname offset
     * @classnameext start
     * @param {module:config~GenConfig#directionOffsetAll} offset - 偏移的方向 
     */
    genClassObjects('.offset', {
      selectorExt: 'start',
      styleKeySet: directionOffsetAll,
      styleValueMap: ()=>'0',
    }),
    /**
     * 设置指定方向的偏移量为中心，50%
     * @classname offset
     * @classnameext center
     * @param {module:config~GenConfig#directionOffset} offset - 偏移的方向 
     */
    genClassObjects('.offset', {
      selectorExt: 'center',
      styleKey: ' ',
      styleKeySet: directionOffset,
      styleValueMap: ()=>'50%',
    }),
    /**
     * 设置指定方向的偏移量为 100%
     * @classname offset
     * @classnameext end
     * @param {module:config~GenConfig#directionOffset} offset - 偏移的方向 
     */
    genClassObjects('.offset', {
      selectorExt: 'end',
      styleKey: ' ',
      styleKeySet: directionOffset,
      styleValueMap: ()=>'100%',
    }),
    /**
     * 设置元素偏移到父元素中心
     * @classname translate-center-a
     */
    genClassObjects('.translate-center', {
      selectorExt: 'a',
      styleKey: 'transform',
      styleValueMap: ()=>'translate3d(-50%, -50%, 0)',
      styleObjectCompatible: compatibleAnimation,
    }),
    /**
     * 设置元素 X 轴方向偏移到父元素中心
     * @classname translate-center-x
     */
    genClassObjects('.translate-center', {
      selectorExt: 'x',
      styleKey: 'transform',
      styleValueMap: ()=>'translate3d(-50%, 0, 0)',
      styleObjectCompatible: compatibleAnimation,
    }),
    /**
     * 设置元素 Y 轴方向偏移到父元素中心
     * @classname translate-center-y
     */
    genClassObjects('.translate-center', {
      selectorExt: 'y',
      styleKey: 'transform',
      styleValueMap: ()=>'translate3d(0, -50%, 0)',
      styleObjectCompatible: compatibleAnimation,
    }),
  );
}


export default genFuncPosition;