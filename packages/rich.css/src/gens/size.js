/**
 * 尺寸
 * @module
 */
import { getStyleValueSet, genClassObjects } from '../utils';


/**
 * 样式生成函数：尺寸
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncSize({ directionSize, size }) {
  return Object.assign(
    /**
     * 设置宽度与高度全部铺满 100%
     * @classname square-full
     */
    genClassObjects('.square-full', {
      styleObjectMap: {
        'width': '100%',
        'height': '100%',
      }
    }),
    /**
     * 设置尺寸
     * @classname |
     * @param {module:config~GenConfig#directionSize} direction - 尺寸位置比如：宽，高等
     * @param {module:config~gen#size} size - 尺寸
     */
    genClassObjects('.', {
      styleKeySet: getStyleValueSet(directionSize),
      styleValueSet: getStyleValueSet(size),
    }), 
  );
}


export default genFuncSize;