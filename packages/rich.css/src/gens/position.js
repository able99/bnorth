import { getSelector, getStyleSet } from '../utils';
import compatibleAnimation from '../compatibles/compatibleAnimation';

const Positions = {
  'initial': true,
  'relative': true,
  'absolute': true,
  'fixed': true,
}

const Offsets = {
  'left': true,
  'right': true,
  'top': true,
  'bottom': true,
}


export function genPosition() {
  let ret = {};
  let selector = 'position';
  Object.entries(Positions).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(selector, v, {key: k})));
  return ret;
}

export function genOffset() {
  let ret = {};
  let selector = 'offset';
  let func;

  func = 'start';
  Object.entries(Offsets).forEach(([k,v])=>(ret[getSelector(selector, k, func)] = getStyleSet(k, 0)));
  func = 'center'
  Object.entries(Offsets).forEach(([k,v])=>(ret[getSelector(selector, k, func)] = getStyleSet(k, '50%')));
  func = 'end'
  Object.entries(Offsets).forEach(([k,v])=>(ret[getSelector(selector, k, func)] = getStyleSet(k, '100%')));
  return ret;
}

export function genTranslate() {
  let ret = {};
  let selector = 'translate';
  let func = 'center';

  ret[getSelector(selector, func, 'a')] = compatibleAnimation({
    'transform': 'translate3d(-50%, -50%, 0)',
  });
  ret[getSelector(selector, func, 'x')] = compatibleAnimation({
    'transform': 'translate3d(-50%, 0, 0)',
  });
  ret[getSelector(selector, func, 'y')] = compatibleAnimation({
    'transform': 'translate3d(0, -50%, 0)',
  });
  
  return ret;
}


export default function gen(config) {
  return {
    ...genPosition(config), 
    ...genOffset(config), 
    ...genTranslate(config), 
  };
}