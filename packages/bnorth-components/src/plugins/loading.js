import React from 'react';
import ProgressBar from '../ProgressBar';


export default {
  // plugin 
  // --------------------------------
  _id: 'loading',

  onPluginMount(app) {
    app.loading = {
      count: 0,

      show: ({options={}, ...props}={})=>{
        console.log(11111111,app.loading.count);
        app.loading.count++;

        if(app.loading.count<=1){
          let _id = app.router.getViewId(options);
          options._id = _id;
          props.ref = e=>e&&(app.loading.ref = e);
          return app.loading._id = app.router.addView(<ProgressBar /> , props, options);
        }else{
          return app.loading.reset();
        }
      },

      close: force=>{
        console.log(2222222,app.loading.count);
        app.loading.count = force?0:Math.max(--app.loading.count,0);
        if(app.loading.count) { app.loading.full(); return }
        let {content, props={}, options={}} = app.router.getView(app.loading._id)||{};
        if(!content) { app.loading._id = undefined; app.loading.ref = undefined; return }

        props.isClose = true;
        props.onStop = ()=>{ 
          app.loading.ref = undefined; 
          app.router.removeView(app.loading._id); 
          app.loading._id = undefined; 
        }

        return app.router.addView(content, props, options);
      },

      reset: ()=>{
        if(!app.loading.ref) return;
        return app.loading.ref.reset();
      },

      full: ()=>{
        if(!app.loading.ref) return;
        return app.loading.ref.full();
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