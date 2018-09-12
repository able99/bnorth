/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import Url from 'url-parse';


class Browser {
  constructor(app, _id, options) {
    this.app = app;
    this._id = id;
    this.options = options;
    this._uaInit();
  };

  //ua
  //------------------------------
  get userAgent() {
    return window.navigator.userAgent;
  }

  _uaInit() {
    let ua = this.userAgent.toLowerCase();
    this.isMobile  = /(?:micromessenger|mobile|iphone|ipod|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/.test(ua);
    this.isiOS     = /(?:iphone)/.test(ua);
    this.isAndroid = /(?:android)/.test(ua);
    this.isWeChat  = /(?:micromessenger)/.test(ua);
    this.isAliPay  = /alipayclient/.test(ua);
  }

  //title
  //------------------------------
  get title(){
    return window.top.document.title;
  };

  set title(str){
    return window.top.document.title = title;
  };


  //ico
  //------------------------------
  get icon() {
    let el = document.querySelector('link[rel="shortcut icon"]');
    return el && el.getAttribute('href');
  }

  set icon(url) {
    let ico = document.createElement('link');
    ico.setAttribute("rel", "shortcut icon")
    ico.setAttribute("href", url)
    document.getElementsByTagName("head")[0].appendChild(ico);
  }

  //url
  //------------------------------
  get url(){
    return window.location.href;
  };

  urlParse(url){
    url = url || this.url;
    return Url(url,true);
  };

  urlFormat(url, query=null){
    if(!url)return "/";
    if(!query && typeof(url)==='string') return url;

    query = typeof(url)==='object' && !(url instanceof Url)?{...url.query,...query}:query;
    url = (url instanceof Url)?url:Url(typeof(url)==='object'?url.pathname:url,true);
    url.query = { ...url.query, ...query };
    
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

  // navi
  //------------------------------
  push(url, query){
    window.location.href = this.urlFormat(url,query);
  };
  
  replace(url,query){
    window.location.replace(this.urlFormat(url,query));
  };

  back(step=1){
    window.history.go(-step);
  };

  reload(delay) {
    delay?setTimeout(()=>window.location.reload(),delay):window.location.reload();
  }

  pushState(url, state, title) {
    window.history.pushState(state,title,url)
  }

  replaceState(url, state, title) {
    window.history.replaceState(state,title,url)
  }

  // cookie
  //------------------------------
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*86400000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
  }

  getCookie(cname) {
    let ret = '';
    document.cookie.split(';').filter(v=>v&&v.indexOf('=')>=0).forEach(v=>{
      let vs = v.split('=');
      if(vs[0].trim()===cname) ret = vs[1];
    })
    return ret;
  }

  clearCookie(name) { 
    if(name){this.setCookie(name, "", -1); return;}

    var keys = document.cookie.match(/[^ =;]+(?=\=)/g).forEach(v=>{
      this.clearCookie(v); 
    })
  } 

  //jsload
  //------------------------------
  loadjs(filename, nocache){
    return new Promise((resolve,reject)=>{
      if(!filename) reject("js filename error");
      
      let version = nocache===false?'':(nocache||Math.ceil((new Date()).getTime()/(1000*60)))
      var fileref=document.createElement('script');
      fileref.setAttribute("type","text/javascript")
      fileref.setAttribute("src", `${filename}${filename.indexOf('?')?'?':'&'}version=${version}`)
      fileref.onload = ()=>{resolve()};
      fileref.onerror = (error)=>{reject(error)};
      document.getElementsByTagName("head")[0].appendChild(fileref);  
    });
  }
}


export default {
  _id: 'browser',

  onPluginMount(app, plugin, options={}) {
    app.Browser = Browser;
    app.browser = new Browser(app, plugin._id, options);
  },

  onPluginUnmount(app) {
    delete app.Browser;
    delete app.browser;
  },
}
