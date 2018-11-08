import { getSelector, getStyleSet, getSizeSet } from '../utils';
import compatibleBorder from '../compatibles/compatibleBorder';


const Dimentions = {
  'a': '',
  'h': ['left', 'right'],
  'v': ['top', 'bottom'],
  'left': true,
  'right': true,
  'top': true,
  'bottom': true,
}

const RadiusDimentions = {
  '':  '',
  'top': ['top-left', 'top-right'],
  'bottom': ['bottom-left', 'bottom-right'],
  'top-left': true,
  'top-right': true,
  'bottom-left': true,
  'bottom-right': true,
}

const Styles = {
  '': 'solid',
  'solid': true,
  'none': true,
  'dotted': true,
  'dashed': true,
  'inherit': true,
}


export default function gen(config) {
  let ret = {};
  let { utilColors, mainColors } = config;
  let colors = {'-': utilColors.border, ...utilColors, ...mainColors};
  let widthSizes = getSizeSet('borderWidth', config);
  let radiusSizes = getSizeSet('borderRadius', config);
  let baseSelector = 'border';
  let func;

  func = 'set';
  Object.entries(colors).forEach(([kk,vv])=>(ret[getSelector(baseSelector, func, kk)] = getStyleSet(baseSelector, `1px solid ${vv}`)))
  
  func = 'color';
  Object.entries(colors).forEach(([kk,vv])=>(ret[getSelector(baseSelector, func, kk)] = getStyleSet(baseSelector, vv, { ext: func })))

  func = 'style';
  Object.entries(Styles).forEach(([kk,vv])=>(ret[getSelector(baseSelector, func, kk)] = getStyleSet(baseSelector, vv, { key: kk, ext: func, })))

  func = 'width';
  Object.entries(widthSizes).forEach(([kk,vv])=>(ret[getSelector(baseSelector, func, kk.trim())] = getStyleSet(baseSelector, vv, { ext: func })))

  func = 'set';
  Object.entries(Dimentions).forEach(([k,v])=>{
    Object.entries(colors).forEach(([kk,vv])=>(ret[getSelector(baseSelector, func, k, kk)] = getStyleSet(baseSelector, `1px solid ${vv}`, {
      mapKey: k, mapVal: v,
    })))
  })

  func = 'color';
  Object.entries(Dimentions).forEach(([k,v])=>{
    Object.entries(colors).forEach(([kk,vv])=>(ret[getSelector(baseSelector, func, k, kk)] = getStyleSet(baseSelector, vv, {
      mapKey: k, mapVal: v, ext: func,
    })))
  })

  func = 'style';
  Object.entries(Dimentions).forEach(([k,v])=>{
    Object.entries(Styles).forEach(([kk,vv])=>(ret[getSelector(baseSelector, func, k, kk)] = getStyleSet(baseSelector, vv, {
      mapKey: k, mapVal: v, ext: func, key: kk,
    })))
  })

  func = 'width';
  Object.entries(Dimentions).forEach(([k,v])=>{
    Object.entries(widthSizes).forEach(([kk,vv])=>(ret[getSelector(baseSelector, func, k, kk.trim())] = getStyleSet(baseSelector, vv, {
      mapKey: k, mapVal: v, ext: func,
    })))
  })

  func = 'none';
  Object.entries(Dimentions).forEach(([k,v])=>{
    ret[getSelector(baseSelector, func, k, '-')] = getStyleSet(baseSelector, 'none', {
      mapKey: k, mapVal: v,
    })
  })

  
  func = 'radius';
  Object.entries(RadiusDimentions).forEach(([k,v])=>{
    Object.entries(radiusSizes).forEach(([kk,vv])=>(ret[getSelector(baseSelector, func, k, kk.trim())] = compatibleBorder(getStyleSet(baseSelector, vv, {
      mapKey: k, mapVal: v, ext: func,
    }))))
  })


  return ret;
}