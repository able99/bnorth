/**
 * @module
 */

/**
 * 将多种形式的 css class name 进行按循序组合，同类型的 class name 后面会覆盖前面的。
 * 
 * 同类型指的是 class name 名称相同，参数不同。
 * @exportdefault
 * @param  {...*} - class name 集合，可以为如下形式： 
 * 1. boolean|function：设置覆盖函数或者关闭覆盖，默认为开启状态
 * 1. string：class name 字符串，多个用空格分隔
 * 1. number：class name 数值型
 * 1. object：class name 对象，key 为 name，val 为 boolean 型，决定是否有效
 * 1. array：class name 数组，数组元素可以为以上任意类型
 * @returns {string} 组合后的 class names
 * @example
 * ```jsx
 * import classes from '@bnorth/rich.css/lib/classes';
 * 
 * export default props=>{
 *   return <div className={classes('text-size-lg', {'text-color-primary': props.isMain})} />
 * }
 * ```
 */
function classes(...args) {
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
      /* eslint-disable no-loop-func */
      Object.entries(arg).filter(([k,v])=>v).forEach(([k,v])=>ret.push(k));
    }
  }

  if(merge) ret = merge(ret);
  return ret.join(' ');
}

export default classes;
