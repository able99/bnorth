import { getSelector, getStyleSet, getSizeSet } from '../utils';


const Types = ['margin', 'padding']

const Dimentions = {
  'a':  '',
  'h': ['left', 'right'],
  'v': ['top', 'bottom'],
  'left': true,
  'right': true,
  'top': true,
  'bottom': true,
}


export default function gen(config) {
  let ret = {};
  let sizes = getSizeSet('spacing', config);

  Types.forEach(v=>{
    Object.entries(Dimentions).forEach(([kk,vv])=>{
      Object.entries(sizes).forEach(([kkk,vvv])=>{
        ret[getSelector(v, kk, kkk.trim())] = getStyleSet(v, vvv, {mapKey: kk, mapVal:vv});
      })
    })
  })

  return ret;
}