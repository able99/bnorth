import { addSelectorPrefix, stylesToDom } from './utils';


export default function compatible(styles, dom) {
  styles = Array.isArray(styles)?styles:Object.entries(styles);
  let ret = {};

  styles.forEach(([k,v])=>{
    ret[k] = v;
    if(k.indexOf('transform')===0||k.indexOf('transition')===0||k.indexOf('animation')===0){
      ret = addSelectorPrefix(k, v, ret, dom, true, true, true);
    }
  });
  
  return stylesToDom(ret, dom);
}
