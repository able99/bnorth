import Url from 'url';

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

  parseUrl(url=""){
    url = url || this.url();

    let indexQuery = url.indexOf("?");
    let indexHash = url.indexOf("#");
    if(indexQuery>indexHash){
      let base  = url.substr(indexHash);
      let query = url.substr(indexQuery);
      let hash  = url.substring(indexHash,indexQuery);
      url = base+query+hash;
    }
    
    let ret = Url.parse(url)||{};
    if(!ret.query)ret.query={};
    return ret;
  };

  formatUrl(url, query){
    if(!url)return "";
    return typeof(url)==='object'?Url.formatUrl():url;
  };

  //navi
  go(url){
    window.location.href = this.formatUrl(url);
  };
  replace(url){
    url = this.formatUrl(url);

    if(window.history.replaceState){
      window.history.replaceState(null, window.document.title, url);
      window.location.reload();
    }else{
      window.location.href = url;
    }
  };
  back(step=1){
    window.history.go(-step);
  };
}

export default new Webview();