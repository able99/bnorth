import '@bnorth/rich.css/css/normalize.css';
import './index.css';
import genCss from '@bnorth/rich.css';
import App from '@bnorth/core';


let app = new App({
  plugin:{
    onAppStarting: async ()=>{
      genCss();
    },
    onAppStartConfig: ()=>{
      app.router.setRoutes({
        '/': require('./pages/home').default,
        'global': require('./pages/doc').default,
        'module:name': require('./pages/doc').default,
        'type:name': require('./pages/doc').default,
      });
    },
  },
})

app.plugins.add(require('@bnorth/plugin-network').default);
app.plugins.add(require('@bnorth/plugin-request').default, {request: app.network.fetch.bind(app.network)});

app.start();
