/**
 * 光标样式
 * @module
 */
import { getStyleValueSet, genClassObjects } from '../utils';


/**
 * 样式生成函数：光标样式
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncCursor({cursor}) {
  /**
   * 设置光标样式
   * @classname border-set
   * @param {module:config~GenConfig#cursor} cursor - 光标样式
   */
  return genClassObjects('.cursor', {
    styleKey: true,
    styleValueSet: getStyleValueSet(cursor),
  });
}


export default genFuncCursor;