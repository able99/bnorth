import '@bnorth/rich.css/css/normalize.css';
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
      });
    },
  },
})


app.start();
