/**
 * @module
 */
import { getSelector, getStyleSet, getSizeSet } from '../utils';


const Styles = {
  '-': 'normal',
  'italic': true,
  'oblique': true,
  'inherit': true,
}

const Decorations = {
  '-': 'none',
  'underline': true,
  'overline': true,
  'linethrough': 'line-through',
  'blink': true,
  'inherit': true,
}

const Aligns = {
  '-': 'left',
  'left': true,
  'center': true,
  'right': true,
  'justify': true,
}

const VerticalAligns = {
  '-': 'baseline',
  'baseline': true,
  'sub': true,
  'super': true,
  'top': true,
  'text-top': true,
  'middle': true,
  'bottom': true,
  'textbottom': 'text-bottom',
  'inherit': true,
}

const WhiteSpaces = {
  '-': 'normal',
  'normal': true,
  'inherit': true,
  'pre': true,
  'nowrap': true,
  'prewrap': 'pre-wrap',
  'preline': 'pre-line',
}

const baseSelector = 'text';
const baseStyleSelector = 'font';


/**
 * 设置文本字体尺寸
 * @classname text-size
 * @param {font=} size - 字体尺寸
 * @example
 * ```jsx
 * <div className="text-size-lg">
 * ```
 */
export function genTextSizes(config) {
  let ret = {};
  let sizes = getSizeSet('font', config);
  let func = 'size'
  let selector = `${baseSelector}-${func}`;
  let styleSelector = `${baseStyleSelector}-${func}`;
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k.trim())] = getStyleSet(styleSelector, v)));
  return ret;
}

/**
 * 设置文本字体粗度
 * @classname text-weight
 * @param {fontWeight=} size - 字体粗度
 */
function genTextWeights(config) {
  let ret = {};
  let sizes = getSizeSet('fontWeight', config);
  let func = 'weight'
  let selector = `${baseSelector}-${func}`;
  let styleSelector = `${baseStyleSelector}-${func}`;
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(styleSelector, v)));
  return ret;
}

function genTextColors({utilColors, mainColors, textColors}) {
  let ret = {};
  let func = 'color'
  let colors = { '-': textColors.normal, ...utilColors, ...mainColors, ...textColors };
  let selector = `${baseSelector}-${func}`;
  Object.entries(colors).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(func, v)));
  return ret;
}

function genTextStyles() {
  let ret = {};
  let func = 'style'
  let selector = `${baseSelector}-${func}`;
  let styleSelector = `${baseStyleSelector}-${func}`;
  Object.entries(Styles).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(styleSelector, v, {key: k})));
  return ret;
}

function genTextDecorations() {
  let ret = {};
  let func = 'decoration'
  let selector = `${baseSelector}-${func}`;
  Object.entries(Decorations).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(selector, v, {key: k})));
  return ret;
}

function genTextAligns() {
  let ret = {};
  let func = 'align'
  let selector = `${baseSelector}-${func}`;
  Object.entries(Aligns).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(selector, v, {key: k})));
  return ret;
}

function genTextVerticalAligns() {
  let ret = {};
  let func = 'vertical-align'
  let selector = `${baseSelector}-${func}`;
  Object.entries(VerticalAligns).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(func, v, {key: k})));
  return ret;
}

function genTextWhiteSpaces() {
  let ret = {};
  let func = 'white-space'
  let selector = `${baseSelector}-${func}`;
  Object.entries(WhiteSpaces).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(func, v, {key: k})));
  return ret;
}

function genLineHeight(config) {
  let ret = {};
  let sizes = getSizeSet('lineHeight', config);
  let selector = 'line-height';
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k.trim())] = getStyleSet(selector, v)));
  return ret;
}

function genFamily({fontFamilys}) {
  let ret = {};
  let func = 'family'
  let selector = `${baseSelector}-${func}`;
  Object.entries(fontFamilys).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet('font-family', v)));
  return ret;
}

function genTruncate({textTruncateSet, lineHeightSizeBase}) {
  let ret = {};
  let func = 'truncate'
  let selector = `${baseSelector}-${func}`;

  ret[getSelector(selector, '-')] = {
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  };

  (textTruncateSet||[]).forEach(v=>{
    ret[getSelector(selector, v)] = {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': v,
      'line-height': lineHeightSizeBase,
      'max-height': (lineHeightSizeBase*v).toFixed(1)+'em',
    }
    ret[getSelector(selector, v, 'placeholder')] = {
      ...ret[getSelector(selector, v)],
      'min-height': ret[getSelector(selector, v)]['max-height'],
    }
  })

  return ret;
}

/**
 * 生成 文字相关 class names
 * @exportdefault
 * @param {ClassNamesConfig} - class names 生成配置对象
 * @returns {object} class names 中间对象，由 cssGen 调用
 */
function genFunctionText(config) {
  return {
    ...genTextSizes(config), 
    ...genTextWeights(config), 
    ...genTextColors(config),
    ...genTextStyles(config),
    ...genTextDecorations(config),
    ...genTextAligns(config),
    ...genTextVerticalAligns(config),
    ...genTextWhiteSpaces(config),
    ...genLineHeight(config),
    ...genFamily(config),
    ...genTruncate(config),
  };
}

export default genFunctionText;