/* polyfill */
// import "babel-polyfill";

/* rich css */
// import 'rich.css/css/normalize.css';
// import genCss from 'rich.css';

import App from 'bnorth';
import routes from './routes';

/* bnorth plugin */ 
// import pluginNetwork from 'bnorth-plugins/lib/network';
// import pluginRequest from 'bnorth-plugins/lib/request';
// import pluginValidate from 'bnorth-plugins/lib/validate';

/* component plugin */
// import pluginNotice from 'bnorth-components/lib/plugins/notice'
// import pluginModal from 'bnorth-components/lib/plugins/modal'
// import pluginLoading from 'bnorth-components/lib/plugins/loading'
// import pluginMask from 'bnorth-components/lib/plugins/mask'

let app = new App({
  plugin:{
    onAppStarting: async ()=>{
      /* rich css */
      // genCss();
    },

    onAppStartConfig: ()=>{
      app.router.setRoutes(routes);
    },
  },
})

/* bnorth plugin */ 
// app.plugins.add(pluginNetwork);
// app.plugins.add(pluginRequest);
// app.plugins.add(pluginValidate);

/* component plugin */
// app.plugins.add(pluginNotice);
// app.plugins.add(pluginModal);
// app.plugins.add(pluginLoading);
// app.plugins.add(pluginMask);

app.start();
