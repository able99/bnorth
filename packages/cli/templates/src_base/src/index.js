/* rich css */
// import '@bnorth/rich.css/css/normalize.css';
// import genCss from '@bnorth/rich.css';
// genCss();

import App from '@bnorth/core';
import routes from './routes';

let app = new App({
  plugin:{
    onAppStartConfig: ()=>{
      app.router.setRoutes(routes);
    },
  },
})

/* bnorth plugin */ 
// ...

/* component plugin */
// ...

app.start();
