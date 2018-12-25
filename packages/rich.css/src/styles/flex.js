/**
 * @module
 */
import compatibleFlex from '../compatibles/compatibleFlex';


/**
 * 生成设置 flex 子元素 order 属性 的 style inline 对象，并实现浏览器兼容
 * @param {!(number|string)} val - order 值
 * @returns {object} style inline object
 */
export function styleFlexSubOrder(val) {
  return compatibleFlex({
    'order': val,
  }, true);
}

/**
 * 生成设置 flex 子元素 grow 属性 的 style inline 对象，并实现浏览器兼容
 * @param {!(number|string)} val - grow 值
 * @returns {object} style inline object
 */
export function styleFlexSubGrow(val) {
  return compatibleFlex({
    'flex-grow': val,
  }, true);
}

/**
 * 生成设置 flex 子元素 shrink 属性 的 style inline 对象，并实现浏览器兼容
 * @param {!(number|string)} val - shrink 值
 * @returns {object} style inline object
 */
export function styleFlexSubShrink(val) {
  return compatibleFlex({
    'flex-shrink': val,
  }, true);
}

/**
 * 生成设置 flex 子元素 basis 属性 的 style inline 对象，并实现浏览器兼容
 * @param {!(number|string)} val - basis 值
 * @returns {object} style inline object
 */
export function styleFlexSubBasis(val) {
  return compatibleFlex({
    'flex-basis': String(Number(val).toFixed(2)) + '%',
  }, true);
}