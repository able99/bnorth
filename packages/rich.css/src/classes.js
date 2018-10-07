export default function classes(...args) {
  let ret = [];
  let merge = function(arr) {
    return arr.filter((v,i,a)=>{
      let key = v.substr(0, v.lastIndexOf('-')); 
      return !a.slice(i+1).find(vv=>{
        return vv.startsWith(key);
      });
    })
  };  

  for(let arg of args) {
    let type = typeof arg;
    if(type==='boolean') {
      merge = arg;
    }else if(type==='function') {
      merge = arg;
    }else if(type==='string') {
      merge?(ret = ret.concat(arg.trim().split(/\s+/))):(ret.push(arg));
    }else if(type==='number') {
      ret.push(arg);
    }else if(Array.isArray(arg) && arg.length) {
      ret.push(classes(...arg));
    }else if(type==='object'){
      Object.entries(arg).filter(([k,v])=>v).forEach(([k,v])=>ret.push(k));
    }
  }

  if(merge) ret = merge(ret);
  return ret.join(' ');
}
