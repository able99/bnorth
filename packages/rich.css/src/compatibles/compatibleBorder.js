import { addSelectorPrefix, stylesToDom } from './utils';


export default function compatible(styles, dom) {
  styles = Array.isArray(styles)?styles:Object.entries(styles);
  let ret = {};

  styles.forEach(([k,v])=>{
    ret[k] = v;
    if(k.indexOf('radius')){
      ret = addSelectorPrefix(k, v, ret, dom, false, true, true);
    }
  });
  
  return stylesToDom(ret, dom);
}