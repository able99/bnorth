import Config from '../app/config';
import User from './user';

let Netif = {};

Netif.handleStatus = function(status,resolve,reject){
  switch(status){
    case 401:
      User.toLogin(null, true);
      return true;
    default:
      return false;
  }
}

Netif.fetch = function(options={}){
  options.resource = options.resource || "/";

  return new Promise((resolve,reject)=>{
  	fetch((options.resource.indexOf("http")===0?"":Config.BaseApiUrl)+options.resource,{
  	  method: "get",
  	  headers: {
  	    "x-token": User.getToken(),
  	  },
  	}).then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        if(this.handleStatus(res.status,resolve,reject)){
          return;
        }
        return reject({code:res.status, message:res.statusText});
      }
    }).then(function(result) {
      resolve(result);
    });
  });
}

Netif.operate = function(options={}){
  options.resource = options.resource || "/";

  return new Promise((resolve,reject)=>{
    fetch((options.resource.indexOf("http")===0?"":Config.BaseApiUrl)+options.resource,{
      method: options.method||"put",
      headers: {
        "x-token": options.token||User.getToken(),
      },
    }).then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        if(this.handleStatus(res.status,resolve,reject)){
          return;
        }
        return reject({code:res.status, message:res.statusText});
      }
    }).then(function(result) {
      resolve(result);
    });
  });
}

import { ExtendNetif } from '../../extend/extend';
export default Object.assign(Netif,ExtendNetif||{});




