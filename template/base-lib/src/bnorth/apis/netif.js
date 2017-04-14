import Config from '../app/config';
import User from './user';

let Netif = {};

Netif.handleStatus = function(status, resource){
  switch(status){
    case 401:
      User.toLogin(null, true);
      return true;
    default:
      return false;
  }
}

Netif.fetch = function(resource,cbSuccess,cbError){
	fetch((resource.indexOf("http")===0?"":Config.ApiUrl)+resource,{
	  method: "get",
	  headers: {
	    "x-token": User.getToken(),
	  },
	}).then(function(res) {
    if (res.ok) {
      return res.json();
    } else {
      if(this.handleStatus(res.status,resource)){
        return;
      }
      Promise.reject({code:res.status, message:res.statusText});
      //throw {code:res.status, message:res.statusText};
    }
  }).then(function(result) {
    cbSuccess(result);
  }).catch(function(error){
    cbError(error);
  });
}

import { ExtendNetif } from '../../extend/extend';
export default Object.assign(Netif,ExtendNetif||{});