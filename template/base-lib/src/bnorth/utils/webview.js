import Url from 'url';

class Webview {
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

  //navi
  getHref(){
    return window.location.href;
  };
  go(url,params){
    url = Url.format({
      pathname: url,
      query: params,
    })
    window.location.href = url;
  };
  replace(url,params){
    url = Url.format({
      pathname: url,
      query: params,
    })
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