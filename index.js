import { render } from 'react-dom'
import { AppLifeCycle, Config, Utils, ComponentConfig,Apis, createAppRouter } from './/bnorth';

//========================
// hook
//========================


//==============================
// App Life Cycle
//==============================


//========================
// main
//========================
function mainPre() {
  let Config = {
  };
  return Promise.resolve(Config);
}

function mainConfig(result) {
  // config
  Config.Url.base = 'http://app.ys.yinqisen.cn/';
  Config.Url.api = '';
  Config.Url.auth = 'public/user/login';

  Config.Images.default = require("./res/default.png");
  Config.Keys.finderHistory = "FosunFinnerHistory";

  ComponentConfig.hideNavBar = Utils.Webview.parseUrl().query.app === '1';

  String.prototype.rot13 = function(){ //v1.0
    return this.replace(/[a-zA-Z]/g, function(c){
      return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  };
  let token = (Utils.Webview.parseUrl().query.t||'').rot13();
  if(token){
    let user = Apis.User.load() || {};
    user.token = token;
    Apis.User.save({data:user});
  }

  return Promise.resolve(Config);
}

function mainStyle() {
  require('./style/style');
  return Promise.resolve();
}

function mainRouter() {
  let router = require('./router').default;
  return Promise.resolve(router);
}

function mainRender(router) {
  Apis.Log.log('==========start============');
  Apis.Log.log(Config);
  Apis.Log.log(router);
  Apis.Log.log('===========================');
  let rootElement = document.getElementById('root');
  render(createAppRouter(router),rootElement);
}

function mainError(error) {
  let rootElement = document.getElementById('root');
  rootElement.innerText = error;
}

function main() {
  mainPre()
  .then((result)=>{
    return mainConfig(result);
  })
  .then((result)=>{
    return mainStyle(result);
  })
  .then((result)=>{
    return mainRouter(result);
  })
  .then((result)=>{
    return mainRender(result);
  })
  .catch((error)=>{
    mainError(error);
  })
}
main();

