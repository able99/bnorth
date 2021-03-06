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
export default function classes(...args) {
  let ret = [];
  
  let addItem = item=>{
    let type = Array.isArray(item)?'array':(typeof item);
    if(type==='string'||type==='number') {
      String(item).split(/\s/).forEach(v=>ret.push(v));
    }else if(type==='array'&&item.length) {
      ret.push(item.forEach(v=>addItem(v)));
    }else if(type==='object'){
      Object.entries(item).filter(([k,v])=>v).forEach(([k,v])=>String(k).split(/\s/).forEach(vv=>ret.push(vv))); /* eslint-disable no-loop-func */
    }
  }
  
  let merge = function(items) {
    items.reverse().forEach((v,i,a)=>{
      if(!v) return;
      let index = v.lastIndexOf('-');
      let key = v.substr(0, index>0?index:v.length); 
      for(let ii=i+1; ii<a.length; ii++) {
        if(!a[ii]) continue;
        if(a[ii].startsWith(key)) {a[ii] = null; continue};
        for(let vvv of mutex) if(vvv.includes(key)&&(a[ii].startsWith(vvv[0])||a[ii].startsWith(vvv[1]))) {a[ii] = null; continue};
      }
    })
    return items.filter(v=>v).reverse();
  };  

  for(let arg of args) addItem(arg);
  return merge(ret).join(' ');
}


export let mutex = [
  ['bg-none', 'bg-color'],
  ['border-set-a', 'border-none-a'],
  ['border-set-left', 'border-none-left'],
  ['border-set-right', 'border-none-right'],
  ['border-set-top', 'border-none-top'],
  ['border-set-bottom', 'border-none-bottom'],
];
