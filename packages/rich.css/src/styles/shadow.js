/**
 * @module
 */

/**
 * 生成设置阴影的 style inline 对象
 * @param {string} [color='#888888'] - css 颜色值
 * @param {object=} options - 阴影参数对象
 * 
 * 1. h：水平阴影的位置，允许负值， 默认值为 `0`
 * 1. v：垂直阴影的位置，允许负值， 默认值为 `1px`
 * 1. blur：模糊距离，默认值为 `3px`
 * 1. spread：阴影的尺寸，默认值为 `0`
 * 1. inset：将外部阴影改为内部阴影，默认是外部
 * 
 * @returns {object} style inline object
 * @example
 * ```jsx
 * import { shadow } from '@bnorth/rich.css/lib/styles/shadow';
 * export default props=>{
 *   return <div style={shadow('black', {blur: '10px'})} />
 * }
 * ```
 */
export function shadow(color='#888888', { h=0, v='1px', blur='3px', spread=0, inset=false, }={}) {
  return {
    boxShadow: `${color} ${h} ${v} ${blur?blur:''} ${spread?spread:''}${inset?' inset':''}`,
  }
}
