import moment from 'moment';
import React from 'react';

const Format = {};

Format.money = function(val,defaultValue="0.00"){
  return !isNaN(val)?Number(val).toFixed(2):defaultValue;
}
Format.checkMoney = function(val){
  val = String(val);
  while(val&&(isNaN(val)||val.split(".")[0].length>7)){
  	val = val.slice(0,-1);
  }
  
  let vals = val.split(".");
  if(vals.length>=2&&vals[1].length>2){
  	vals[1] = vals[1].slice(0,2);
  	val = vals.join(".");
  }

  return val;
}

Format.checkString = function(val,max=32,min=0){
  val = String(val);
  val = val.length>max?val.slice(0,max):val;

  return val;
}

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