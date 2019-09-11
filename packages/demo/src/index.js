import App from '@bnorth/core';
import initStyle from './style';
import initPlugins from './plugins';
import routes from './routes';

let app = new App({
  // logEvents: true,
  plugin:{
    onAppStartConfig: ()=>{
      app.router.setRoutes(routes);
    },
    stateCommonProps: {},
  },
})

initStyle(app);
initPlugins(app);
app.start();

