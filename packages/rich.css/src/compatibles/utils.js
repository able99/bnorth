export function getDomSelector(selector) {
  return selector
  .split('-').filter(v=>v)
  .map((v,i)=>(i||v.startsWith('webkit')||v.startsWith('moz'))?(v[0].toUpperCase()+v.substr(1)):v)
  .join('');
}

export function addSelectorPrefix(k, v, obj={}, webkit, moz, ms, oz) {
  obj[k] = v;
  if(webkit) obj['-webkit-'+k] = v;
  if(moz) obj['-moz-'+k] = v;
  if(ms) obj['-ms-'+k] = v;
  if(oz) obj['-oz-'+k] = v;
  return obj;
}

export function addSelectorMulti(k, ret, ...args) {
  args.forEach((v,i)=>{
    ret[k+' '.repeat(i+1)] = v;
  })
  return ret;
}

export function stylesToDom(styles, dom) {
  if(!dom) return styles;
  let ret = {};
  Object.entries(styles).forEach(([k,v])=>{
    ret[getDomSelector(k)] = v;
  })
  return ret;
}