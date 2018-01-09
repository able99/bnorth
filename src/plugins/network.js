/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import Url from 'url-parse';


let fetchTimeout = function(input, opts){
  return new Promise(function(resolve, reject){
    var timeoutId = setTimeout(function(){
      reject(new Error("fetch timeout"))
    }, opts.timeout||90000);
    fetch(input, opts).then(
      res=>{
        clearTimeout(timeoutId);
        resolve(res)
      },
      err=>{
        clearTimeout(timeoutId);
        reject(err)
      }
    )
  })
}


/**
 * 为app 提供网络访问的能力扩展
 * @class
 * @example
 * **使用**
 * app.network.xxx
 * **hook**
 * 参见Browser hook说明
 */
class Network {
  constructor(app) {
    this.app = app;
  }
  //==================
  // cache
  //==================
  clearCache(){
    this.app.storage&&this.app.storage.clear("^bnorth_netcache");
  }
  saveCache(item,data){
    this.app.storage&&this.app.storage.saveObj("bnorth_netcache_"+item,data);
  }
  getCache(item){
    return this.app.storage&&this.app.storage.getObj("bnorth_netcache_"+item);
  }
  getCacheFetchKey(options){
    return options.resource;
  }
  getCacheOperateKey(options){
    return options.resource;
  }

  //==================
  // format
  //==================
  formatFetchResult(result){
    return result;
  }
  formatOperateResult(result){
    return result;
  }

  //==================
  // error handle
  //==================
  handleStatus(status,isFetch,options){
    switch(status){
      case 401:
      this.app.user&&this.app.user.toLogin(null, true);
        return true;
      default:
        return false;
    }
  }
  handleResult(result,isFetch,options){
    return false;
  }

  //==================
  // param
  //==================
  //authorization
  paramAuthorization(options){
    if(options.noAuth)return {};
    return { 
      "authorization": (this.app.user&&this.app.user.getToken())||'',
    };
  }
  //header
  paramFetchHeader(options){
    return {};
  }
  paramOperateHeader(options){
    return {};
  }
  //url
  paramFetchUrl(options){
    let resource = typeof(options.resource)==='function'?options.resource():options.resource;
    resource = ((resource.indexOf("http")===0||resource.indexOf("//")===0)?'':(this.app.config.urls.base+this.app.config.urls.api))+resource;
    let uo = Url(resource,true);

    if(this.paramFetchMethod(options).toLowerCase()==='get'){
      Object.assign(uo.query, this.paramFetchBodyPre(options), options.query||{});
    }else{
      Object.assign(uo.query, options.query||{});
    }

    if(options.params){
      //todo
    }
    
    return uo.toString();
  }
  paramOperateUrl(options){
    let resource = typeof(options.resource)==='function'?options.resource():options.resource;
    resource = ((resource.indexOf("http")===0||resource.indexOf("//")===0)?'':(this.app.config.urls.base+this.app.config.urls.api))+resource;
    let uo = Url(resource,true);

    Object.assign(uo.query, options.query||{});

    if(options.params){
      //todo
    }

    return uo.toString();
  }
  //method
  paramFetchMethod(options){
    return options.method||"get";
  }
  paramOperateMethod(options){
    return options.method||"POST";
  }
  //body
  paramFetchBodyPre(options){
    return (typeof(options.data)==='function'?options.data():options.data)||{};
  }
  paramFetchBody(options){
    return JSON.stringify(this.paramFetchBodyPre(options));
  }
  paramOperateBodyPre(options){
    return (typeof(options.data)==='function'?options.data():options.data)||{}
  }
  paramOperateBody(options){
    return JSON.stringify(this.paramOperateBodyPre(options));
  }
  //contenttype
  paramFetchContentType(options){
    return {};
  }
  paramOperateContentType(options){
    return {
      "Content-Type": "application/json",
    }
  }

  //==================
  // main if
  //==================
  fetch(options={}){
    options.resource = options.resource||"";
    let fetchScope = {};
    let fetchUrl = this.paramFetchUrl(options);
    let fetchOption = {
      method: this.paramFetchMethod(options),
      headers: {
        ...this.paramAuthorization(options),
        ...this.paramFetchHeader(options),
        ...this.paramFetchContentType(options),
      },
      credentials: 'include',
    }
    if(fetchOption.method&&fetchOption.method.toString().toLowerCase()!=='get'){
      fetchOption.body = this.paramFetchBody(options);
    }

    return fetchTimeout(fetchUrl,fetchOption)
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
        if(fetchScope.res && (fetchScope.res.ok||(fetchScope.res.status>=200&&fetchScope.res.status<300))) {
          let handle = this.handleResult(result,true,options,fetchScope.res);
          if(handle) return Promise.reject(handle===true?null:handle);

          return result;
        }else{
          let handle = this.handleStatus(fetchScope.res.status,true,options,result,fetchScope.res);
          if(handle) return Promise.reject(handle===true?null:handle);

          return Promise.reject(Object.assign({code:fetchScope.res.status, message:fetchScope.res.statusText||this.app.config.strings.networkError},result));
        }
      },
      (error) => {
        if(!fetchScope.res) {
          error.message = this.app.config.strings.networkError;
          return Promise.reject(error);
        }

        let handle = this.handleStatus(fetchScope.res.status,true,options,null, fetchScope.res);
        if(handle) return Promise.reject(handle===true?null:handle);

        return Promise.reject({code:fetchScope.res.status, message:fetchScope.res.statusText||this.app.config.strings.networkError});
      }
    )
    .then(
      (result)=>{
        result = this.formatFetchResult(result);
        if(this.app.config.networkCache){this.saveCache(this.getCacheFetchKey(options),result)}
        return result;
      },
      (error)=>{
        if(this.app.config.networkCache){
          let cache = this.getCache(this.getCacheFetchKey(options));
          if(cache){ return Promise.resolve(cache); }
        }else{
          return Promise.reject(error);
        }
      }
    );
  }

  operate(options={}){
    options.resource = options.resource||"";
    let fetchScope = {};
    let fetchUrl = this.paramOperateUrl(options);
    let fetchOption = {
      method: this.paramOperateMethod(options),
      headers: {
        ...this.paramAuthorization(options),
        ...this.paramOperateHeader(options),
        ...(options.data && options.data instanceof FormData)?{}:this.paramOperateContentType(options),
      },
      credentials: 'include',
    }
    if(fetchOption.method&&fetchOption.method.toString().toLowerCase()!=='get'){
      let body = this.paramOperateBodyPre(options);
      fetchOption.body = (body instanceof FormData)?body:this.paramOperateBody(options);
    }

    return fetchTimeout(fetchUrl,fetchOption)
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
        if(fetchScope.res && (fetchScope.res.ok||(fetchScope.res.status>=200&&fetchScope.res.status<300))) {
          let handle = this.handleResult(result,false,options,fetchScope.res);
          if(handle) return Promise.reject(handle===true?null:handle);

          return result;
        }else{
          let handle = this.handleStatus(fetchScope.res.status,false,options,result, fetchScope.res);
          if(handle) return Promise.reject(handle===true?null:handle);

          return Promise.reject(Object.assign({code:fetchScope.res.status, message:fetchScope.res.statusText||this.app.config.strings.networkError},result));
        }
      },
      (error) => {
        if(!fetchScope.res) {
          error.message = this.app.config.strings.networkError;
          return Promise.reject(error);
        }
        
        let handle = this.handleStatus(fetchScope.res.status,false,options,null,fetchScope.res);
        if(handle) return Promise.reject(handle===true?null:handle);

        return Promise.reject({code:fetchScope.res.status, message:fetchScope.res.statusText||this.app.config.strings.networkError});
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
  }

}


export default {
  init(app) {
    app.Network = Network;
    app.network = new Network(app);
  }
}

