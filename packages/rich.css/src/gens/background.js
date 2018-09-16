import { getSelector, getStyleSet } from '../utils';


export function genBgColor({utilColors, mainColors, opacityColors}) {
  let ret = {};
  let colors = { ...utilColors, ...mainColors, ...opacityColors };
  let func = 'color';
  let selector = `bg-${func}`;
  let styleSelector = `background-${func}`;
  Object.entries(colors).forEach(([k,v])=>(ret[getSelector(selector, k)] = getStyleSet(styleSelector, v)));
  return ret;
}

export function genBgNone() {
  let ret = {};
  ret[getSelector('bg', 'none-')] = {
    'background': 'none',
  };
  return ret;
}

export default function gen(config) {
  return {
    ...genBgColor(config), 
    ...genBgNone(config),
  };
}
