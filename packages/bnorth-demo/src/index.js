/* polyfill */
// import "babel-polyfill";

/* rich css */
import 'rich.css/css/normalize.css';
import genCss from 'rich.css';
import App from 'bnorth-core';
import routes from './routes';


let app = new App({
  plugin:{
    onAppStarting: async ()=>{
      genCss();
    },

    onAppStartConfig: ()=>{
      app.router.setRoutes(routes);
    },

    stateData: {},
  },
})

app.plugins.add(require('bnorth-components/lib/plugins/notice'));
app.plugins.add(require('bnorth-components/lib/plugins/mask'));
app.plugins.add(require('bnorth-components/lib/plugins/modal'));
app.plugins.add(require('bnorth-components/lib/plugins/loading'));
app.plugins.add(require('bnorth-plugin-network'));
app.plugins.add(require('bnorth-plugin-request'));



app.start();
