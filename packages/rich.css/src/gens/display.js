import { getSelector, getStyleSet } from '../utils';


const Displays = {
  'inline': true,
  'inlineblock': 'inline-block',
  'none': true,
  'block': true,
}

const Visibilitis = {
  'show': 'visible',
  'hide': 'hidden',
}

const Overflows = {
  'hidden': true,
  'scroll': true,
  'auto': true,
  'inherit': true,
  'visible': true,
}

const PointerEvents = {
  'none': true,
  'all': true,
}

const Floats = {
  'left': true,
  'right': true,
  'none': true,
}


export function genDisplay() {
  let ret = {};
  let selector = 'display';
  Object.entries(Displays).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(selector, v, {key: k})));
  return ret;
}

export function genVisibility() {
  let ret = {};
  let selector = 'visibility';
  Object.entries(Visibilitis).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(selector, v, {key: k})));
  return ret;
}

export function genOpacity() {
  let ret = {};
  let selector = 'opacity';
  Array(11).fill(0).map((v,i)=>i*10).forEach(v=>(ret[getSelector(selector, v)] = getStyleSet(selector, (v/100).toFixed(2))));
  return ret;
}

export function genOverflows() {
  let ret = {};
  let selector = 'overflow';
  Object.entries(Overflows).forEach(([k,v])=>{
    ret[getSelector(selector, 'a',k)] = getStyleSet(selector, v, { key: k });
    ret[getSelector(selector, 'x', k)] = getStyleSet(`${selector}-x`, v, { key: k });
    ret[getSelector(selector, 'y', k)] = getStyleSet(`${selector}-y`, v, { key: k });
  });
  return ret;
}

export function genScrollable() {
  let ret = {};
  let selector = 'scrollable';
  ret[getSelector(selector, 'a')] = {
    'max-width': '100%',
    'max-height': '100%',
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
    '-webkit-overflow-scrolling': 'touch',
  };
  ret[getSelector(selector, 'x')] = {
    'max-width': '100%',
    'overflow-x': 'hidden',
    '-webkit-overflow-scrolling': 'touch',
  };
  ret[getSelector(selector, 'y')] = {
    'max-height': '100%',
    'overflow-y': 'auto',
    '-webkit-overflow-scrolling': 'touch',
  };
  return ret;
}

export function genPointerEvents() {
  let ret = {};
  let selector = 'pointer-events';
  Object.entries(PointerEvents).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(selector, v, {key: k})));
  return ret;
}

export function genFloat() {
  let ret = {};
  let selector = 'float';
  Object.entries(Floats).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(selector, v, {key: k})));

  ret[getSelector('clear:before')] = {
    'content': "' '",
    'display': 'table',
  }
  ret[getSelector('clear:after')] = {
    ...ret[getSelector('clear:before')],
    'clear': 'both',
  }
 
  return ret;
}


export default function gen(config) {
  return {
    ...genDisplay(config), 
    ...genVisibility(config),
    ...genOpacity(config),
    ...genOverflows(config),
    ...genScrollable(config),
    ...genPointerEvents(config),
    ...genFloat(config),
  };
}