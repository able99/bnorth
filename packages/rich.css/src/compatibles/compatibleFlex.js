import { addSelectorMulti, addSelectorPrefix, stylesToDom } from './utils';


export default function compatible(styles, dom) {
  styles = Array.isArray(styles)?styles:Object.entries(styles);
  let ret = {};

  styles.forEach(([k,v])=>{
    ret[k] = v;
    if(k==='display'){
      v.includes('inline')
        ?ret = addSelectorMulti(k, ret, '-webkit-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex')
        :ret = addSelectorMulti(k, ret, '-webkit-box', '-ms-flexbox', '-webkit-flex')
    }else if(k==='flex-direction'){
      ret['-webkit-flex-direction'] = ret[k];
      ret['-ms-flex-direction'] = v;
      ret['-webkit-box-orient'] = v.includes('column')?'vertical':'horizontal';
      ret['-webkit-box-direction'] = v.includes('reverse')?'reverse':'normal';
    }else if(k==='justify-content'){
      if(ret[k]==='start'||ret[k]==='end') ret[k] = `flex-${v}`;
      ret['-webkit-justify-content'] = ret[k];
      ret['-webkit-box-pack'] = v;
      ret['-ms-flex-pack'] = v;
    }else if(k==='align-items'){
      if(ret[k]==='start'||ret[k]==='end') ret[k] = `flex-${v}`;
      ret['-webkit-align-items'] = ret[k];
      ret['-webkit-box-align'] = v;
      ret['-ms-flex-align'] = v;
    }else if(k==='flex-wrap'){
      ret = addSelectorPrefix(k, v, ret, true, true);
    }else if(k==='align-self'){
      if(ret[k]==='start'||ret[k]==='end') ret[k] = `flex-${v}`;
      ret['-webkit-align-self'] = ret[k];
      ret['-ms-flex-item-align'] = v;
    }else if(k==='flex'){
      ret['-webkit-box-flex'] = v;
      ret = addSelectorPrefix(k, v, ret, true, true, false);
    }else if(k==='flex-grow'){
      ret['-webkit-box-flex'] = v;
      ret['-webkit-flex-grow'] = v;
      ret['-ms-flex-positive'] = v;
    }else if(k==='flex-shrink'){
      ret['-webkit-flex-shrink'] = v;
      ret['-ms-flex-negative'] = v;
    }else if(k==='order'){
      ret['-webkit-box-ordinal-group'] = v;
      ret = addSelectorPrefix(k, v, ret, true, true, true);
    }else if(k==='flex-basis'){
      ret = addSelectorPrefix(k, v, ret, true);
      //ret['width'] = v;
    }
  });

  return stylesToDom(ret, dom);
}