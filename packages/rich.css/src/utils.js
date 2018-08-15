export function stylesToString(styles) {
  return (Array.isArray(styles)?styles:Object.entries(styles||{}))
  .map(([k,v])=>{
    let lines = (Array.isArray(v)?v:Object.entries(v||{}))
    .map(([kk,vv])=>`  ${kk}: ${vv};`)
    .join('\n');
    return `${k} {\n${lines}\n}`;
  })
  .join('\n\n');
}

export function getSizeSet(name, config) {
  let ret = {};
  if(!name||!config) return ret;

  let base = config[`${name}SizeBase`];
  let min = config[`${name}SizeMin`];
  let minCalc = config[`${name}SizeMinCalc`];
  let max = config[`${name}SizeMax`];
  let maxCalc = config[`${name}SizeMaxCalc`];
  let sizes = config[`${name}SizeSet`]||[];

  if(base!==undefined)ret[''] = base;
  for(let i=minCalc-1; i>=0; i--) {
    ret[i?('x'.repeat(i)+'s'):'sm'] = Math.round(base - (base-min)/minCalc*(i+1));
  }
  for(let i=0; i<maxCalc; i++) {
    ret[i?('x'.repeat(i)+'l'):'lg'] = Math.round(base + (max-base)/maxCalc*(i+1));
  }
  if(Array.isArray(sizes)) {
    for(let size of sizes) {
      if(Array.isArray(size)){
        ret[size[0]] = getStyleValue(size[1]);
      }else{
        let pre = typeof(size)==='number'?' ':'';
        let ext = typeof(size)==='string'&&!isNaN(size)?'x':'';
        let ratio = (typeof(size)==='string'&&!isNaN(size)&&base)||1;
        ret[pre+size+ext] = getStyleValue(size*ratio);
      }
    }
  }else if(typeof sizes === 'object'){
    Object.entries(sizes).forEach(([k,v])=>ret[k] = getStyleValue(v));
  }
  
  
  return ret;
}


export function getSelector(...args) {
  let ret = '.';
  for(let arg of args) {
    if(arg!==0&&!arg) continue;
    ret += `${ret!=='.'?'-':''}${arg}`;
  }
  return ret;
}

export function getStyleKey(...args) {
  let ret = '';
  for(let arg of args) {
    if(arg!==0&&!arg) continue;
    ret += `${ret?'-':''}${arg}`;
  }
  return ret;
}

export function getStyleValue(val, param) {
  let ret = val===true?param:val;
  return typeof(ret)==='number'?(ret+'px'):ret;
}

export function getStyleSet(pre, val, {key, mapKey, mapVal, ext, showMapKey}={}) {
  let ret = {};

  if(Array.isArray(mapVal)) {
    mapVal.forEach(v=>ret[getStyleKey(pre, v, showMapKey?key:'', ext)] = getStyleValue(val, key));
  }else{
    ret[getStyleKey(pre, mapKey, showMapKey?key:'', ext)] = getStyleValue(val, key);
  }
  
  return ret;
}