import { getSelector, getStyleSet } from '../utils';


const Keys = ['width', 'height', 'min-width', 'min-height', 'max-width', 'max-height'];
const Values = {
  'auto': 'auto',
  'full': '100%',
  'half': '50%',
  ' 0': '0',
  ' 1': 1,
  ' 2': 2,
  '1em': '1em',
  '0em25': '0.25em',
  '0em5': '0.5em',
  '2em0': '2em',
}


export default function gen(config) {
  let ret = {};

  ret[getSelector('square-full')] = {
    'width': '100%',
    'height': '100%',
  }

  Keys.forEach(v=>{
    Object.entries(Values).forEach(([kk,vv])=>{
      ret[getSelector(v, kk.trim())] = getStyleSet(v, vv);
    });
  });

  return ret;
}