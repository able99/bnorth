import Url from 'url-parse';
import { getBrowserTitle, setBrowserTitle } from '../utils/browser';


class Browser {
  constructor(app) {
    this.app = app;
    this.uaInit();
  };

  //ua
  //------------------------------
  get ua() {
    return window.navigator.userAgent;
  }

  uaInit() {
    let ua = this.ua.toLowerCase();
    this.isMobile  = /(?:micromessenger|mobile|iphone|ipod|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/.test(ua);
    this.isiOS     = /(?:iphone)/.test(ua);
    this.isAndroid = /(?:android)/.test(ua);
    this.isWeChat  = /(?:micromessenger)/.test(ua);
    this.isAliPay  = /alipayclient/.test(ua);
  }

  //title
  //------------------------------
  get title(){
    return getBrowserTitle();
  };

  set title(str){
    return setBrowserTitle(str);
  };

  //ico
  //------------------------------
  set icon(url) {
    var ico = document.createElement('link');
    ico.setAttribute("rel", "shortcut icon")
    ico.setAttribute("href", url)
    document.getElementsByTagName("head")[0].appendChild(ico);
  }

  //url
  //------------------------------
  url(){
    return window.location.href;
  };

  parseUrl(url){
    url = url || this.url();
    return Url(url,true);
  };

  formatUrl(url, query=null){
    if(!url)return "/";
    if(!query && typeof(url)==='string') return url;

    url = (url instanceof Url)?url:Url(typeof(url)==='object'?url.pathname:url,true);
    query = query||{};

    for (let key in query) {
      url.query[key] = query[key];
    }
    
    return url.toString();
  };

  //parser
  //------------------------------
  queryParse(...args) {
    return Url.qs.parse(...args);
  }

  queryStringify(...args) {
    return Url.qs.stringify(...args);
  }

  //navi
  //------------------------------
  push(url,params){
    if(typeof(url)==='object'){
      params = Object.assign({},url.state||{},url.query||{});
      url = url.pathname||'/';
    }

    window.location.href = this.formatUrl(url,params);
  };
  replace(url,params){
    if(typeof(url)==='object'){
      params = Object.assign({},url.state||{},url.query||{});
      url.pathname = url.pathname||'/';
    }
    
    url = this.formatUrl(url,params);
    window.location.replace(url);
  };
  back(step=1){
    window.history.go(-step);
  };
  reload(delay) {
    window.location.reload();
  }

  //jsload
  //------------------------------
  loadjs(filename, nocache){
    return new Promise((resolve,reject)=>{
      if(!filename){
        reject("js filename error");
      }
      let version = nocache===false?'':(nocache||Math.ceil((new Date()).getTime()/(1000*60)))

      var fileref=document.createElement('script')
      fileref.setAttribute("type","text/javascript")
      fileref.setAttribute("src", `${filename}${filename.indexOf('?')?'?':'&'}version=${version}`)
      fileref.onload = ()=>{resolve()};
      fileref.onerror = (error)=>{reject(error)};
      document.getElementsByTagName("head")[0].appendChild(fileref);  
    });
  }
}

export default {
  init(app) {
    app.Browser = Browser;
    app.browser = new Browser(app);
  }
}
