import React from 'react';
import Loading from '../Loading';


export default {
  // plugin 
  // --------------------------------
  _id: 'loading',

  onPluginMount(app) {
    app.loading = {
      count: 0,
      _interval: 200,
      _timerout: 10000,
      _progress: 0,
      _timer: null,
      _timerClose: null,
      _handleInterval:()=>{
        app.loading._progress += /*Math.random()**/(100/(app.loading._timerout/app.loading._interval));
        app.loading.update();
        if(app.loading._progress>=100) {
          app.loading._progress = 0;
          // clearInterval(app.loading._timer);
          // app.loading._timer = null;
        }
      },
      update: (progress=app.loading._progress, aprops, aoptions)=>{
        app.loading._progress = progress;
        if(!app.loading._timer&&app.loading._timerout) app.loading._timer = setInterval(()=>app.loading._handleInterval(), app.loading._interval);

        let {content, props={}, options={}} = app.router.getView(app.loading._id)||{};
        if(!content){
          return app.loading._id = app.router.addView(<Loading timeout={app.loading._interval} isProgress progress={app.loading._progress} /> , aprops, aoptions);
        }else{
          props.progress = app.loading._progress;
          return app.router.addView(content, props, options);
        }
      },
      show: ({options:{timeout=10000, ...options}={}, ...props}={})=>{
        if(app.loading._timerClose) {
          clearTimeout(app.loading._timerClose);
          app.loading._timerClose = null;
        } 
        app.loading._timerout = timeout;
        app.loading.count++;
        return app.loading.update(0, props, options);
      },

      close: force=>{
        app.loading.count = force?0:Math.max(--app.loading.count,0);
        let ret = app.loading.full();
        if(!app.loading.count&&!app.loading._timerClose){
          clearInterval(app.loading._timer);
          app.loading._timer = null;
          setTimeout(()=>{
            app.router.removeView(app.loading._id); 
            app.loading._id = undefined; 
          }, app.loading._interval);
        }
        return ret;
      },

      reset: ()=>{
        return app.loading.update(0);
      },

      full: ()=>{
        return app.loading.update(100);
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