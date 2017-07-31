import { render } from 'react-dom'
import { AppLifeCycle, Config, Utils, ComponentConfig,Apis, createAppRouter } from './bnorth';

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
  Config.Url.base = 'http://xxx/';
  Config.Url.api = 'xxx';
  
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

