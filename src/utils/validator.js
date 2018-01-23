import jspath from 'jspath'


let is = {};
is.required = function(n,checkInput,checkO){
  if(checkInput)return true;
  if(n===undefined||n===null) return false;
  if(typeof(n)==='string'&&!n.length) return false;
  if(checkO&&Number(n)===0) return false;
  return true;
}
is.number = function(n,checkInput){
  return !isNaN(n) || (checkInput&&(n==='.'||n==='0'||n==='0.'));
}
is.positive = function(n,checkInput) {
  return is.number(n) && Number(n) > 0;
};


export function check(val, arule, options={}, checkErrorMessage) {
  if(!arule) return null;
  let message = options.checkErrorMessage||checkErrorMessage||'error';
  let rule;
  let params = [];
  let checker = null;
  let ret;

  if(typeof(arule)==='object'){
    if(arule.rule) rule = arule.rule;
    if(arule.params) params = arule.params;
    if(arule.message) message = arule.message;
  }else if(typeof(arule)==='string'){
    rule = arule;
  }else if(typeof(arule)==='function'){
    rule = arule(val);
  }
  if(rule===undefined) return null;

  let getNot = false;
  if(rule===true||rule===false) {
    ret = rule;
  }else if(typeof(rule)==='function'){
    ret = !rule(val, options.input, ...params);
  }else if(typeof(rule)==='string') {
    if(rule[0]==='!'){
      rule = rule.slice(1);
    }
    let splits = rule.split('|');
    if(splits.length>1){
      rule = splits[0];
      params = [...params, splits.slice(1)];
    }
    checker = is[rule];
    if(!checker) return null;
    ret = !checker(val, options.input, ...params);
  }else{
    return null;
  }

  if(getNot)ret=!ret;
  return ret?message:null;
}

export function checkObjectItem(obj={}, key, rules, options={}) {
  if(!key||!rules) return false;
  let val = jspath.apply(`.${key}[0]`,obj);

  if(Array.isArray(rules)){
    for(let rule of rules){
      let ret = check(val,rule,options);
      if(ret) return ret;
    }
    return false;
  }else{
    return check(val, rules, options);
  }
}

export function checkObject(obj, rules={}, options={}, rets={}) {
  if(!obj||typeof(obj)!=='object') return;
  let message = '';

  for(let [key, rule] of Object.entries(rules)) {
    message = checkObjectItem(obj, key, rule);
    if(message) {
      rets[key] = message;
      if(!options.bail) break;
    }
  }

  return message;
}