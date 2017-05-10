import { Config, Apis } from '../';

export default {
  handleStatus(status,resolve,reject){
    switch(status){
      case 401:
        Apis.User.toLogin(null, true);
        return new Promise(()=>{});
      default:
        return false;
    }
  },

  fetch(options={}){
    options.resource = options.resource || "/";

    return new Promise((resolve,reject)=>{
      let url = options.resource.indexOf("http")===0?"":(Config.BaseUrl+Config.ApiUrl);
      url += options.resource;
    	fetch(url,{
    	  method: "get",
    	  headers: {
    	    "authorization": Apis.User.getToken(),
    	  },
    	}).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          let handle = this.handleStatus(res.status,resolve,reject);
          if(handle)return handle;

          return reject({code:res.status, message:res.statusText});
        }
      }).then(function(result) {
        resolve(result);
      });
    });
  },

  operate(options={}){
    options.resource = options.resource || "/";

    return new Promise((resolve,reject)=>{
      let url = options.resource.indexOf("http")===0?"":(Config.BaseUrl+Config.ApiUrl);
      url += options.resource;
      fetch(url,{
        method: options.method||"POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": options.token||Apis.User.getToken(),
        },
        body: JSON.stringify(options.data), 
      }).then((res)=>{
        if (res.ok) {
          return res.json();
        } else {
          let handle = this.handleStatus(res.status,resolve,reject);
          if(handle)return handle;

          return reject({code:res.status, message:res.statusText});
        }
      }).then((result)=>{
        resolve(result);
      });
    });
  },

}



