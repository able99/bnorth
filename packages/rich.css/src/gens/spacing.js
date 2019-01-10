/**
 * 边距
 * @module
 */
import { getStyleValueSet, genClassObjects } from '../utils';


/**
 * 样式生成函数：边距
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncSpacing({ directionEdge, spacing }) {
  let styleValueSet =  getStyleValueSet(spacing);

  return Object.assign(
    /**
     * 设置外边距
     * @classname margin
     * @param {module:config~GenConfig#directionEdge} edge - 位置
     * @param {module:config~gen#spacing} spacing - 边距
     */
    genClassObjects('.margin', {
      styleKey: true,
      styleKeySet: directionEdge,
      styleValueSet,
    }), 
    /**
     * 设置内边距
     * @classname padding
     * @param {module:config~GenConfig#directionEdge} edge - 位置
     * @param {module:config~gen#spacing} spacing - 样式开关
     */
    genClassObjects('.padding', {
      styleKey: true,
      styleKeySet: directionEdge,
      styleValueSet,
    }), 
  );
}


export default genFuncSpacing;