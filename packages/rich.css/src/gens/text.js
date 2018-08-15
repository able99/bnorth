import { getSelector, getStyleSet, getSizeSet } from '../utils';


const Styles = {
  '': 'normal',
  'italic': true,
  'oblique': true,
  'inherit': true,
}

const Decorations = {
  '': 'none',
  'underline': true,
  'overline': true,
  'line-through': true,
  'blink': true,
  'inherit': true,
}

const Aligns = {
  'left': true,
  'center': true,
  'right': true,
  'justify': true,
}

const VerticalAligns = {
  'baseline': true,
  'sub': true,
  'super': true,
  'top': true,
  'text-top': true,
  'middle': true,
  'bottom': true,
  'text-bottom': true,
  'inherit': true,
}

const WhiteSpaces = {
  '': 'normal',
  'normal': true,
  'inherit': true,
  'pre': true,
  'nowrap': true,
  'pre-wrap': true,
  'pre-line': true,
}

const baseSelector = 'text';
const baseStyleSelector = 'font';


export function genTextSizes(config) {
  let ret = {};
  let sizes = getSizeSet('font', config);
  let func = 'size'
  let selector = `${baseSelector}-${func}`;
  let styleSelector = `${baseStyleSelector}-${func}`;
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k.trim())] = getStyleSet(styleSelector, v)));
  return ret;
}

export function genTextWeights(config) {
  let ret = {};
  let sizes = getSizeSet('fontWeight', config);
  let func = 'weight'
  let selector = `${baseSelector}-${func}`;
  let styleSelector = `${baseStyleSelector}-${func}`;
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(styleSelector, v)));
  return ret;
}

export function genTextColors({utilColors, mainColors, textColors}) {
  let ret = {};
  let func = 'color'
  let colors = { '': textColors.normal, ...utilColors, ...mainColors, ...textColors };
  let selector = `${baseSelector}-${func}`;
  Object.entries(colors).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(func, v)));
  return ret;
}

export function genTextStyles() {
  let ret = {};
  let func = 'style'
  let selector = `${baseSelector}-${func}`;
  let styleSelector = `${baseStyleSelector}-${func}`;
  Object.entries(Styles).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(styleSelector, v, {key: k})));
  return ret;
}

export function genTextDecorations() {
  let ret = {};
  let func = 'decoration'
  let selector = `${baseSelector}-${func}`;
  Object.entries(Decorations).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(selector, v, {key: k})));
  return ret;
}

export function genTextAligns() {
  let ret = {};
  let func = 'align'
  let selector = `${baseSelector}-${func}`;
  Object.entries(Aligns).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(selector, v, {key: k})));
  return ret;
}

export function genTextVerticalAligns() {
  let ret = {};
  let func = 'vertical-align'
  let selector = `${baseSelector}-${func}`;
  Object.entries(VerticalAligns).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(func, v, {key: k})));
  return ret;
}

export function genTextWhiteSpaces() {
  let ret = {};
  let func = 'white-space'
  let selector = `${baseSelector}-${func}`;
  Object.entries(WhiteSpaces).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(func, v, {key: k})));
  return ret;
}

export function genLineHeight(config) {
  let ret = {};
  let sizes = getSizeSet('lineHeight', config);
  let selector = 'line-height';
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k.trim())] = getStyleSet(selector, v)));
  return ret;
}

export function genFamily({fontFamilys}) {
  let ret = {};
  let func = 'family'
  let selector = `${baseSelector}-${func}`;
  Object.entries(fontFamilys).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet('font-family', v)));
  return ret;
}

export function genTruncate({textTruncateSet, lineHeightSizeBase}) {
  let ret = {};
  let func = 'truncate'
  let selector = `${baseSelector}-${func}`;

  (textTruncateSet||[]).forEach(v=>{
    if(Number(v)===1){
      ret[getSelector(selector)] = {
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      }
    }else{
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
    }
  })

  return ret;
}


export default function gen(config) {
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