export function classObjectsToString(styles) {
  return (Array.isArray(styles)?styles:Object.entries(styles||{}))
  .map(([k,v])=>{
    let lines = (Array.isArray(v)?v:Object.entries(v||{}))
    .map(([kk,vv])=>`  ${kk}: ${vv};`)
    .join('\n');
    return `${k} {\n${lines}\n}`;
  })
  .join('\n\n');
}

export function getStyleValueSetDefault(styleValueSet) {
  if(!styleValueSet) return;
  return styleValueSet[Object.keys(styleValueSet)[0]];
}

function getStyleValue(value, key, unit='px') {
  value = value===true?key:value;
  return typeof(value)==='number'?(value+unit):String(value).trim();
}

export function getStyleValueSet(set) {
  if(!set) return {};
  let unit = set['_unit'];

  return (Array.isArray(set)?set.map(v=>[v,v]):Object.entries(set)).reduce((v1,[k,v])=>{
    if(k==='_base') {
      let isString = typeof(v)==='string';
      let base = Number(v)||0;
      let min =  Number(set['_min'])||0;
      let minCount =  Number(set['_minCount'])||3;
      let max =  Number(set['_max'])||100;
      let maxCount =  Number(set['_maxCount'])||3;

      v1['-'] = getStyleValue(isString?String(base):base, null, unit);
      for(let i=minCount-1; i>=0; i--) {
        let value = Math.round(base - (base-min)/minCount*(i+1));
        v1[i?('x'.repeat(i)+'s'):'sm'] = getStyleValue(isString?String(value):value, null, unit);
      }
      for(let i=0; i<maxCount; i++) {
        let value = Math.round(base + (max-base)/maxCount*(i+1));
        v1[i?('x'.repeat(i)+'l'):'lg'] = getStyleValue(isString?String(value):value, null, unit);
      }
    }else if(k==='_multiple' && Array.isArray(v)){
      let base = set['_base'];
      let isString = typeof(base)==='string';
      base = Number(base)||0;
      (base||base===0) && v.forEach(vv=>{
        let value = base*Number(vv);
        v1[vv+'x'] = getStyleValue(isString?String(value):value, null, unit);
      })
    }if(k==='_from') {
      let from = Number(v)||0;
      let to =  Number(set['_to'])||0;
      let step =  Number(set['_step'])||1;

      for(let i = from; i<=to; i+=step) {
        v1[' '+i] = i;
      }
    }else if(k && k[0]!=='_'){
      v1[k] = getStyleValue(v, k, unit);
    }

    return v1;
  }, {})
}

function concatCssKeys(isSelector, ...args) {
  return args.reduce((v1,v2)=>{
    if(v2!==0&&!v2) return v1;
    return String(v1 + (v1&&v2!=='-'&&(!isSelector||(v1[0]==='.'&&v1.length>1))?'-':'') + String(v2).trim());
  }, '');
}

export function genClassObjects(selector, {selectorExt, styleKey, styleKeySet, styleKeyExt, styleValueSet, styleValueMap, styleObjectMap, styleObjectCompatible}={}) {
  let classObject = {};
  if(styleKey===true) styleKey = selector[0]==='.'?selector.slice(1):selector;
  if(!styleValueSet) styleValueSet = {'':''}
  if(!styleKeySet) styleKeySet = {'':''}
  
  Object.entries(styleKeySet).forEach(([styleKeySetKey, styleKeySetValue])=>{
    Object.entries(styleValueSet).forEach(([styleValueSetKey, styleValueSetValue])=>{
      let styleObject = {};

      if(styleObjectMap&&typeof(styleObjectMap)==='function') {
        styleObject = styleObjectMap(styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue);
      }else if(styleObjectMap) {
        styleObject = {...styleObjectMap};
      }else{
        let styleKeySetValues = Array.isArray(styleKeySetValue)?styleKeySetValue:[styleKeySetValue];

        styleKeySetValues.forEach(styleKeySetValue=>{
          styleKeySetValue = styleKeySetValue===true?styleKeySetKey:styleKeySetValue;
          let styleValue = styleValueMap?(typeof(styleValueMap)==='function'?styleValueMap(styleValueSetValue):styleValueMap):styleValueSetValue;
          styleObject[concatCssKeys(false, styleKey, styleKeySetValue, styleKeyExt)] = styleValue;
        });
      }

      classObject[concatCssKeys(true, selector, styleKeySetKey, styleValueSetKey, selectorExt )] = styleObjectCompatible?styleObjectCompatible(styleObject):styleObject;
    });
  });

  return classObject;
}