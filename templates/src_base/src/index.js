// runtime
// --------------------
import "babel-polyfill";
// TODO: if fetch compatibility problem for target (npm i --save whatwg-fetch)
// import 'whatwg-fetch'; 


// css
// --------------------
// TODO: if use css lib of bnorth solution (npm i --save rich.css)
// import 'rich.css/css/base.css';
// import { cssBaseFont, cssFontSize, cssIconFont, cssColor } from 'rich.css';
// import './index.css';


// app
// ---------------------
import App from 'bnorth/lib/app/app';
import pluginData from 'bnorth/lib/plugins/data';
// import pluginBrowser from 'bnorth/lib/plugins/browser';
// import pluginFormat from 'bnorth/lib/plugins/format';
// import pluginNavigator from 'bnorth/lib/plugins/navigator';
// import pluginNetwork from 'bnorth/lib/plugins/network';
// import pluginRequest from 'bnorth/lib/plugins/request';
// import pluginStorage from 'bnorth/lib/plugins/storage';
// import pluginUser from 'bnorth/lib/plugins/user';
// import pluginUtils from 'bnorth/lib/plugins/utils';


// components
// ---------------------
// TODO: if use bnorth components of bnorth solution (npm i --save bnorth-components)
// import pluginNoticeMessage from 'bnorth-components/lib/plugins/noticeMessage';
// import pluginNoticeBlocking from 'bnorth-components/lib/plugins/noticeBlocking';
// import pluginNoticeLoading from 'bnorth-components/lib/plugins/noticeLoading';
// import pluginModal from 'bnorth-components/lib/plugins/modal';


// app
// ---------------------
let app = App.instance({
  plugin:{
    onConfig(app) {
      // TODO: modify bnorth and your app config
    },
    onImportStyles(app) {
      // TODO: config your font icon, if use ICon of bnorth components
      // TODO: import and config your css
    },
    onImportRoutes(app) {
      // config your routes
      return import(/* webpackChunkName: "routes" */ './routes').then(v=>{app.routes = v});
    },
    onHook(app) {
      // TODO: hook bnorth solution api
    },
  },
})


// other plugins
// ---------------------
app.use(pluginData);
// app.use(pluginBrowser);
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


// start
// ---------------------
app.start();
