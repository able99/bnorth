import "babel-polyfill";
// import 'whatwg-fetch';
import App from 'bnorth/lib/base/app';
// import 'rich.css/css/base.css';
// import { cssBaseFont, cssFontSize, cssIconFont, cssColor } from 'rich.css';
// import './index.css';
// import pluginNoticeMessage from 'bnorth-components/lib/plugins/noticeMessage';
// import pluginNoticeBlocking from 'bnorth-components/lib/plugins/noticeBlocking';
// import pluginNoticeLoading from 'bnorth-components/lib/plugins/noticeLoading';
// import pluginModal from 'bnorth-components/lib/plugins/modal';
// import pluginBrowser from 'bnorth/lib/plugins/browser';
// import pluginData from 'bnorth/lib/plugins/data';
// import pluginFormat from 'bnorth/lib/plugins/format';
// import pluginNavigator from 'bnorth/lib/plugins/navigator';
// import pluginNetwork from 'bnorth/lib/plugins/network';
// import pluginRequest from 'bnorth/lib/plugins/request';
// import pluginStorage from 'bnorth/lib/plugins/storage';
// import pluginUser from 'bnorth/lib/plugins/user';
// import pluginUtils from 'bnorth/lib/plugins/utils';


// hook
//========================
function hook(app) {
  
}
  

// font
// =======================
function configFont(app) {
 
}

// css
// ==========================
function configStyle(app) {
  
}

// config 
// ==========================
function config(app) {
  
}

// routes
// ==========================
function routes(app) {
  return import(/* webpackChunkName: "routes" */ './routes').then(v=>{app.routes = v});
}

// app
// ==========================
let app = App.instance({
  plugin:{
    onConfig(app) {
      config(app);
    },
    onImportStyles(app) {
      configFont(app);
      configStyle(app);
    },
    onImportRoutes(app) {
      return routes(app);
    },
    onHook(app) {
      hook(app);
    },
  },
})

// app.use(pluginBrowser);
// app.use(pluginData);
// app.use(pluginFormat);
// app.use(pluginNavigator);
// app.use(pluginNetwork);
// app.use(pluginRequest);
// app.use(pluginStorage);
// app.use(pluginUser);
// app.use(pluginUtils);

// app.use(pluginNoticeMessage);
// app.use(pluginNoticeBlocking);
// app.use(pluginNoticeLoading);
// app.use(pluginModal);


app.start();
