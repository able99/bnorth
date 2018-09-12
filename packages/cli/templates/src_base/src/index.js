/* rich css */
// import 'rich.css/css/normalize.css';
// import genCss from 'rich.css';
// genCss();

import App from 'bnorth';
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
