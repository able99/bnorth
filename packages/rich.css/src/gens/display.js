/**
 * 显示方式
 * @module
 */
import { getStyleValueSet, genClassObjects } from '../utils';


/**
 * 样式生成函数：显示方式
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncDisplay({directionAxis, display, visibility, opacity, pointerEvents, overflow, float}) {
  return Object.assign(
    /**
     * 设置显示方式
     * @classname display
     * @param {module:config~GenConfig#display} display - 显示方式
     */
    genClassObjects('.display', {
      styleKey: true,
      styleValueSet: getStyleValueSet(display),
    }), 
    /**
     * 设置可见方式
     * @classname visibility
     * @param {module:config~GenConfig#visibility} visibility - 可见方式
     */
    genClassObjects('.visibility', {
      styleKey: true,
      styleValueSet: getStyleValueSet(visibility),
    }), 
    /**
     * 设置透明度
     * @classname opacity
     * @param {module:config~GenConfig#opacity} opacity - 透明度
     */
    genClassObjects('.opacity', {
      styleKey: true,
      styleValueSet: getStyleValueSet(opacity),
      styleValueMap: val=>(val/100).toFixed(2),
    }), 
    /**
     * 设置滚动
     * @classname scrollable
     * @param {module:config~GenConfig#directionAxis} direction - 坐标轴方向
     * @param {module:config~gen#StyleSwitcher} switcher - 样式开关
     */
    genClassObjects('.scrollable', {
      selectorExt: '-',
      styleKeySet: getStyleValueSet(directionAxis),
      styleObjectMap: (styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue)=>({
        'max-width': styleKeySetKey!=='y'?'100%':undefined,
        'max-height': styleKeySetKey!=='x'?'100%':undefined,
        'overflow-x': styleKeySetKey!=='y'?'auto':'hidden',
        'overflow-y': styleKeySetKey!=='x'?'auto':'hidden',
        '-webkit-overflow-scrolling': 'touch',
      })
    }),
    /**
     * 设置溢出处理方式
     * @classname overflow
     * @param {module:config~GenConfig#directionAxis} direction - 坐标轴方向
     * @param {module:config~GenConfig#overflow} overflow - 处理方式
     */
    genClassObjects('.overflow', {
      styleKey: true,
      styleKeySet: getStyleValueSet(directionAxis),
      styleValueSet: getStyleValueSet(overflow),
    }), 
    /**
     * 设置事件响应目标
     * @classname pointer-events
     * @param {module:config~GenConfig#pointerEvents} event - 事件响应目标
     */
    genClassObjects('.pointer-events', {
      styleKey: true,
      styleValueSet: getStyleValueSet(pointerEvents),
    }), 
    /**
     * 设置浮动方式
     * @classname float
     * @param {module:config~GenConfig#float} float - 浮动方向
     */
    genClassObjects('.float', {
      styleKey: true,
      styleValueSet: getStyleValueSet(float),
    }), 
    /**
     * 清除全部风向浮动
     * @classname clear
     */
    genClassObjects('.clear:before', {
      styleObjectMap: {
        'content': "' '",
        'display': 'table',
      }
    }),
    genClassObjects('.clear:after', {
      styleObjectMap: {
        'content': "' '",
        'display': 'table',
        'clear': 'both',
      }
    }),
  );
}


export default genFuncDisplay;