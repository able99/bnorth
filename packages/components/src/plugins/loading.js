import React from 'react';
import Loading from '../Loading';


export default {
  // plugin 
  // --------------------------------
  _id: 'loading',

  onPluginMount(app) {
    app.loading = {
      count: 0, 
      timeoutPrgress: '20000',
      timeoutSet: '200',
      reset: (progress=0, cb, aprops, aoptions)=>{
        let {content, props={}, options={}} = app.router.getView(app.loading._id)||{};
        if(!content){
          app.loading._id = app.router.addView(
            <Loading timeout={app.loading.timeoutSet} isProgress progress={progress} />, 
            aprops, aoptions
          );
        }else{
          app.loading._id = app.router.addView(
            content, 
            {...props, ...aprops, progress, timeout: app.loading.timeoutSet}, 
            {...options, ...aoptions}
          );
        }

        setTimeout(()=>{
          let {content, props={}, options={}} = app.router.getView(app.loading._id)||{};
          if(content){
            props.progress = 100;
            props.timeout = app.loading.timeoutPrgress;
            app.loading._id = app.router.addView(content, props, options);
            cb&&cb();
          }
        }, app.loading.timeoutSet);

        return app.loading._id;
      },
      show: ({options, ...props}={})=>{
        app.loading.count++;
        return app.loading.reset(0, null, props, options);
      },
      close: force=>{
        app.loading.count = force?0:Math.max(--app.loading.count,0);
        return app.loading.reset(app.loading.count?10:100, ()=>{
          if(!app.loading.count) {
            app.router.removeView(app.loading._id); 
            app.loading._id = undefined; 
          }
        });
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