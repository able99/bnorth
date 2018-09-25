/* polyfill */
// import "babel-polyfill";

/* rich css */
import '@bnorth/rich.css/css/normalize.css';
import genCss from '@bnorth/rich.css';
import App from '@bnorth/core';
import routes from './routes';
import Icon from '@bnorth/components/lib/Icon';
import icoSvg from '../res/default.ico.svg';
Icon.appendSvgIcons(icoSvg);
Icon.appendMap('icon-heart', 'heart');
let app = new App({
  plugin:{
    onAppStarting: async ()=>{
      genCss();
    },

    onAppStartConfig: ()=>{
      app.router.setRoutes(routes);
    },

    stateCommonProps: {},
    stateComponentProps: {},
    stateComponentSwitchs: {initialization: []},
  },
})

app.plugins.add(require('@bnorth/components/lib/plugins/notice').default);
app.plugins.add(require('@bnorth/components/lib/plugins/mask').default);
app.plugins.add(require('@bnorth/components/lib/plugins/modal').default);
app.plugins.add(require('@bnorth/components/lib/plugins/loading').default);
// app.plugins.add(require('@bnorth/plugin-network').default);
// app.plugins.add(require('@bnorth/plugin-request').default);
// app.plugins.add(require('@bnorth/plugin-validate').default);



app.start();
