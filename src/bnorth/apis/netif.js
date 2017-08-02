import Url from 'url-parse';
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
  // format
  //==================
  formatFetchResult(result){
    return result;
  },
  formatOperateResult(result){
    return result;
  },

  //==================
  // error handle
  //==================
  handleStatus(status,isFetch,options){
    switch(status){
      case 401:
        Apis.User.toLogin(null, true);
        return true;
      default:
        return false;
    }
  },
  handleResult(result,isFetch,options){
    return false;
  },

  //==================
  // param
  //==================
  paramAuthorization(options){
    if(options.noAuth)return {};
    return { 
      "authorization": Apis.User.getToken()||'',
    };
  },
  paramFetchUrl(options){
    let url = ((options.resource.indexOf("http")===0||options.resource.indexOf("//")===0)?"":(Config.Url.base+Config.Url.api))+options.resource;
    let uo = Url(url,true);
    if(this.paramFetchMethod().toLowerCase()==='get'){
      Object.assign(uo.query, options.data||{}, options.query||{});
    }else{
      Object.assign(uo.query, options.query||{});
    }
    
    return uo.toString();
  },
  paramOperateUrl(options){
    let url = ((options.resource.indexOf("http")===0||options.resource.indexOf("//")===0)?"":(Config.Url.base+Config.Url.api))+options.resource;
    let uo = Url(url,true);
    Object.assign(uo.query, options.query||{});
    return uo.toString();
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

    let fetchScope = {};
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
    .then(
      (res) => {
        fetchScope.res = res;
        return res.json();
      },
      (error) => {
        return Promise.reject(error);
      }
    )
    .then(
      (result) => {
        if(fetchScope.res.ok) {
          let handle = this.handleResult(result,true,options,result);
          if(handle) return Promise.reject(handle===true?null:handle);

          return result;
        }else{
          let handle = this.handleStatus(fetchScope.res.status,true,options,result);
          if(handle) return Promise.reject(handle===true?null:handle);

          return Promise.reject(Object.assign({code:fetchScope.res.status, message:fetchScope.res.statusText||Config.Str.netCommonError},result));
        }
      },
      (error) => {
        if(!fetchScope.res) {
          error.message = Config.Str.netCommonError;
          return Promise.reject(error);
        }

        let handle = this.handleStatus(fetchScope.res.status,true,options,null);
        if(handle) return Promise.reject(handle===true?null:handle);

        return Promise.reject({code:fetchScope.res.status, message:fetchScope.res.statusText||Config.Str.netCommonError});
      }
    )
    .then(
      (result)=>{
        result = this.formatFetchResult(result);
        if(Config.NetCache){this.saveCache(this.getCacheFetchKey(options),result)}
        return result;
      },
      (error)=>{
        if(Config.NetCache){
          let cache = this.getCache(this.getCacheFetchKey(options));
          if(cache){ return Promise.resolve(cache); }
        }else{
          return Promise.reject(error);
        }
      }
    );
  },

  operate(options={}){
    options.resource = options.resource || "/";
    
    let fetchScope = {};
    return fetch(
      this.paramOperateUrl(options),
      {
        method: this.paramOperateMethod(options),
        headers: {
          ...this.paramAuthorization(options),
          ...this.paramOperateHeader(options),
          ...(options.data && options.data instanceof FormData)?{}:this.paramOperateContentType(options),
        },
        body: (options.data && options.data instanceof FormData)?options.data:this.paramOperateBody(options), 
      }
    )
    .then(
      (res) => {
        fetchScope.res = res;
        return res.json();
      },
      (error) => {
        return Promise.reject(error);
      }
    )
    .then(
      (result) => {
        if(fetchScope.res.ok) {
          let handle = this.handleResult(result,false,options,result);
          if(handle) return Promise.reject(handle===true?null:handle);

          return result;
        }else{
          let handle = this.handleStatus(fetchScope.res.status,false,options,result);
          if(handle) return Promise.reject(handle===true?null:handle);

          return Promise.reject(Object.assign({code:fetchScope.res.status, message:fetchScope.res.statusText||Config.Str.netCommonError},result));
        }
      },
      (error) => {
        if(!fetchScope.res) {
          error.message = Config.Str.netCommonError;
          return Promise.reject(error);
        }
        
        let handle = this.handleStatus(fetchScope.res.status,false,options,null);
        if(handle) return Promise.reject(handle===true?null:handle);

        return Promise.reject({code:fetchScope.res.status, message:fetchScope.res.statusText||Config.Str.netCommonError});
      }
    )
    .then(
      (result) => {
        return this.formatFetchResult(result);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },

}




