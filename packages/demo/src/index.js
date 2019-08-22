import App from '@bnorth/core';
import initStyle from './style';
import initPlugins from './plugins';
import routes from './routes';

let app = new App({
  logEvents: true,
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


// console.log(require('@bnorth/rich.css/lib/classes').default(
//   'border-none-a-',
//   'border-set-a-alert',
//   'border-set-a-alert',
//   'border-set-a-alert',
//   'border-set-a-alert',
//   'border-none-left-'
// ));