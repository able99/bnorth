import App from '@bnorth/core';
import initStyle from './style';
import initPlugins from './plugins';
import routes from './routes';

let app = new App({
  plugin:{
    onAppStartConfig: ()=>{
      app.router.setRoutes(routes);
    },
    stateCommonProps: {},
  },
})

initStyle(app);
initPlugins(app);

app.network.options.getRequestHeaders = function(app) {
  if(this.url.endsWith('login')) return {};
  let user = app.storage.getObj('user');
  return { 'Authorization': (user&&user.token) };
}
app.network.options.handleResponse = function(app, result) {
  if(!result.data) throw new Error('网络连接错误');
  if(result.data.code===3||result.data.code===5) { 
    app.router.replace('/login/login');
    throw new Error() ;
  }else if(result.data.code) {
    throw new Error(result.data.msg);
  }else {
    return result;
  }
};

app.start();
