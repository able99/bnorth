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
        '/:name?': require('./pages/home').default,
      });
    },
  },
})

app.plugins.add(require('@bnorth/plugin-network').default);
app.plugins.add(require('@bnorth/plugin-request').default, {request: app.network.fetch.bind(app.network)});
app.plugins.add({
  _id: 'docs',
  stateDocs: {
    state: app.Request, initialization: [], 
    url: './docs.json',
    onStateUpdating: data=>{
      data.doclets&&data.doclets.unshift({
        "kind": "module",
        "name": "#global",
        "longname": "module:#global",
        "isGlobal": true,
      });
      return data;
    }
  },
  onAppStarted: ()=>{
    let plugin = app.plugins.getByName('docs');
    plugin.stateDocs.fetch();
  },
});


app.start();
