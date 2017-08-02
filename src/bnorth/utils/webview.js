import Url from 'url-parse';

class Webview {
  constructor() {
    //ua
    let myUA = window.navigator.userAgent.toLowerCase();
    this.isMobile = /(?:micromessenger|mobile|iphone|ipod|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/.test(myUA);
    this.isiOS = /(?:iphone)/.test(myUA);
    this.isAndroid = /(?:android)/.test(myUA);
    this.isWeChat = /(?:micromessenger)/.test(myUA);
  };

  //title
  get title(){
    return top.document.title;
  };

  set title(str){
    top.document.title = str;

    // var $iframe = $("<iframe style='display:none;' src='" + BASE_PATH+ "resources/domain/" + BASE_DOMAIN + "/image/favicon.png'></iframe>");  
    // $iframe.on('load',function() {    
    //   setTimeout(function() {      
    //     $iframe.off('load').remove();    
    //   }, 0);  
    // }).appendTo($body);
  };

  //url
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

    url = typeof(url)==='object'?url:Url(url,true);
    query = query||{};

    for (let key in query) {
      url.query[key] = query[key];
    }
    
    return url.toString();
  };

  //navi
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
      url = url.pathname||'/';
    }
    
    url = this.formatUrl(url,params);
    window.location.replace(url);
  };
  back(step=1){
    window.history.go(-step);
  };
}

export default new Webview();