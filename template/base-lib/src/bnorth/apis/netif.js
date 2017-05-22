import { Config, Apis } from '../';

export default {
  //==================
  // cache
  //==================
  clearCache(){
    Apis.Storage.clear("^bnorth_netcache");
  },
  saveCache(item,data){
    Apis.Storage.saveItem("bnorth_netcache_"+item,data);
  },
  getCache(item){
    return Apis.Storage.getItem("bnorth_netcache_"+item);
  },
  getCacheFetchKey(options){
    return options.resource;
  },
  getCacheOperateKey(options){
    return options.resource;
  },

  //==================
  // error handle
  //==================
  handleStatus(status){
    switch(status){
      case 401:
        Apis.User.toLogin(null, true);
        return true;
      default:
        return false;
    }
  },
  handleResult(result,isFetch){
    return false;
  },

  //==================
  // param
  //==================
  paramAuthorization(options){
    return { 
      "authorization": Apis.User.getToken()||'',
    };
  },
  paramFetchUrl(options){
    let url = options.resource.indexOf("http")===0?"":(Config.BaseUrl+Config.ApiUrl);
    return url += options.resource;
  },
  paramOperateUrl(options){
    return this.paramFetchUrl(options);
  },
  paramFetchMethod(options){
    return "get";
  },
  paramOperateMethod(options){
    return options.method||"POST";
  },
  paramFetchBody(options){
    return null;
  },
  paramOperateBody(options){
    return JSON.stringify(options.data);
  },
  paramFetchContentType(options){
    return {};
  },
  paramOperateContentType(options){
    return {
      "Content-Type": "application/json",
    }
  },
  paramFetchHeader(options){
    return {};
  },
  paramOperateHeader(options){
    return {};
  },

  //==================
  // main if
  //==================
  fetch(options={}){
    options.resource = options.resource || "/";

    if(Config.NetCache){
      let cache = this.getCache(this.getCacheFetchKey(options));
      if(cache){ return Promise.resolve(cache); }
    }else{
      return fetch(
        this.paramFetchUrl(options),
        {
          method: this.paramFetchMethod(options),
          headers: {
            ...this.paramAuthorization(options),
            ...this.paramFetchHeader(options),
            ...this.paramFetchContentType(options),
          },
          body: this.paramFetchBody(options),
        }
      )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          let handle = this.handleStatus(res.status);
          if(handle) return Promise.reject(null);

          return Promise.reject({code:res.status, message:res.statusText||Config.StrNetCommonError});
        }
      })
      .then(
        (result)=>{
          let handle = this.handleResult(result,true);
          if(handle) return Promise.reject(null);

          if(Config.NetCache){this.saveCache(this.getCacheFetchKey(options),result)}
          return result;
        },
      );
    }
  },

  operate(options={}){
    options.resource = options.resource || "/";
    
    return fetch(
      this.paramOperateUrl(options),
      {
        method: this.paramOperateMethod(options),
        headers: {
          ...this.paramAuthorization(options),
          ...this.paramOperateHeader(options),
          ...this.paramOperateContentType(options),
        },
        body: this.paramOperateBody(options), 
      }
    )
    .then((res)=>{
      if (res.ok) {
        return res.json();
      } else {
        let handle = this.handleStatus(res.status);
        if(handle) return Promise.reject(null);

        return Promise.reject({code:res.status, message:res.statusText||Config.StrNetCommonError});
      }
    })
    .then(
      (result)=>{
        let handle = this.handleResult(result,false);
        if(handle) return Promise.reject(null);

        return result;
      },
    );
  },

}




