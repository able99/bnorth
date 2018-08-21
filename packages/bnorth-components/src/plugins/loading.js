import React from 'react';
import ProgressBar from '../ProgressBar';


export default {
  // plugin 
  // --------------------------------
  pluginName: 'loading',
  pluginDependence: [],

  onPluginMount(app) {
    app.loading = {
      count: 0,
      show: (options={})=>{
        app.loading.count++;

        if(!app.loading.ref){
          let $id = app.router.getViewId(options);
          options.$id = $id;
          options.ref = e=>e&&(app.loading.ref = e);
          return app.loading.$id = app.router.addView(<ProgressBar /> , options);
        }else{
          return app.loading.reset();
        }
      },
      reset: ()=>{
        if(!app.loading.ref) return;
        return app.loading.ref.reset();
      },
      full: ()=>{
        if(!app.loading.ref) return;
        return app.loading.ref.full();
      },
      close: force=>{
        app.loading.count = force?0:Math.max(--app.loading.count,0);
        if(app.loading.count) {
          app.loading.full();
          return;
        }

        let {content, options={}} = app.router.getView(app.loading.$id)||{};
        if(!content) {
          app.loading.$id = undefined;
          app.loading.ref = undefined; 
          return;
        }

        options.isClose = true;
        options.onStop = ()=>{ 
          app.loading.ref = undefined; 
          app.router.removeView(app.loading.$id); 
          app.loading.$id = undefined; 
        }

        return app.router.addView(content, options);
      },
    };

    app.loading._oldRenderLoading = app.render.loading;
    app.render.loading = (show, options)=>show?app.loading.show(options):app.loading.close();
  },

  onPluginUnmount(app) {
    app.render.loading = app.loading._oldRenderLoading;
    delete app.loading;
  },
}