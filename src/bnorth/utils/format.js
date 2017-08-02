import moment from 'moment';
import React from 'react';

const Format = {};

let is = {};
is.not = {};
function not(func) {
  return function(...args) {
    return !func(...args);
  };
}
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
for (let key in Format.is) {
  let func = Format.is[key];
  if (key !== 'not') {
    Format.is.not[key] = not(func);
  }
}
Format.is = is;
window.is = Format.is;

Format.checkErrorMessage = 'error';
Format.doCheck = function(arule, val, checkInput) {
  let rule = null;
  let params = [];
  let message = Format.checkErrorMessage;
  if(typeof(arule)==='object'){
    if(arule.rule) rule = arule.rule;
    if(arule.params) params = arule.params;
    if(arule.message) message = arule.message;
  }else if(typeof(arule)==='string'){
    rule = arule;
  }

  if(!rule) return null;
  let checker = null;

  switch(typeof(rule)){
    case 'function':
      checker = rule;
      break;
    case 'string':
      if(rule[0]==='!'){
        checker = Format.is.not[rule.slice(1)];
      }else{
        checker = Format.is[rule];
      }
      break;
    default:
      return null;
  }
 
  return !checker(val, checkInput, ...params)?message:false;
}
Format.checkItem =function(key, rules, obj, checkInput) {
  if(!key||!rules) return false;
  let val = obj&&obj[key];

  if(Array.isArray(rules)){
    for(let rule of rules){
      let res = Format.doCheck(rule,val,checkInput);
      if(res) return res;
    }
    return false;
  }else{
    return Format.doCheck(rules,val,checkInput);
  }
}

Format.check = function(rules, obj, options) {
  options = options || {};
  let keys = [];
  let messages = [];

  for(let key of Object.keys(rules)){
    let rule = rules[key];
    let res = Format.checkItem(key,rule,obj);
    if(res) {
      keys.push(key);
      messages.push(res);
      if(!options.goOnError)break;
    }
  }

  return keys.length?[messages[messages.length-1],keys,messages]:false;
}

Format.checkObj = function(obj, checker=Format.checkVal, ...args){
  if(!Object.keys(obj).length) return false;

  for(let key in obj){
    if(!checker(obj[key],...args)) return false;
  }
  return true;
}

Format.checkEmpty = function(val){
  return val !== null && val !== undefined && val !== "";
}
Format.checkVal = function(val){
  return Boolean(val);
}
Format.checkString = function(val,max=Number.MAX_VALUE,min=1){
  return typeof(val)==='string' && val.length>=min && val.length<max;
}

Format.money = function(val,defaultValue="0.00"){
  return !isNaN(val)?Number(val).toFixed(2):defaultValue;
}
// Format.checkMoney = function(val){
//   val = String(val);
//   while(val&&(isNaN(val)||val.split(".")[0].length>7)){
//   	val = val.slice(0,-1);
//   }
  
//   let vals = val.split(".");
//   if(vals.length>=2&&vals[1].length>2){
//   	vals[1] = vals[1].slice(0,2);
//   	val = vals.join(".");
//   }

//   return val;
// }

// Format.checkString = function(val,max=32,min=0){
//   val = String(val);
//   val = val.length>max?val.slice(0,max):val;

//   return val;
// }

moment.locale('zh_CN');
Format.time = function(val, format="YYYY-MM-DD HH:mm:ss"){
   return format?moment(val).format(format):moment(val).fromNow();
}

Format.out = function(key,out, num=1000){
  return out.filter((v,i)=>{
    return out.length-i <= num;
  }).map((v,i)=>{
    return num===1?<span key={key}>{v.message}</span>:<li key={key+i}>{v.message}</li>
  });
}

Format.size = function(size){
  if(size>1024*1024*1024){
    return (size/1024/1024/1024).toFixed(2)+"G";
  }else if(size>1024*1024){
    return (size/1024/1024).toFixed(2)+"M";
  }else if(size>1024){
    return (size/1024).toFixed(2)+"K";
  }else{
    return (size?size:0)+"B";
  }
}

export default Format;