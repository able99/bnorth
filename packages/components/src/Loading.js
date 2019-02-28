import React from 'react';
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import Loader from './Loader';


export let Loading = aprops=>{
  let { progress, height, ...props } = BaseComponent(aprops, Loading);

  let classNamePre = 'position-absolute offset-left-start offset-top-start offset-right-start width-full';

  return <Panel component={Loader} type="line" isProgress progress={progress} classNamePre={classNamePre} bs-height={height} {...props} />
}

Loading.defaultProps = {}
Loading.defaultProps.height = 3;

Object.defineProperty(Loading,"Loading",{ get:function(){ return Loading }, set:function(val){ Loading = val }})




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
        let {content, props={}, options={}} = app.router.getPopLayerInfo(app.loading._id)||{};
        if(!content){
          app.loading._id = app.router.addPopLayer(
            <Loading timeout={app.loading.timeoutSet} isProgress progress={progress} />, 
            aprops, aoptions
          );
        }else{
          app.loading._id = app.router.addPopLayer(
            content, 
            {...props, ...aprops, progress, timeout: app.loading.timeoutSet}, 
            {...options, ...aoptions}
          );
        }

        setTimeout(()=>{
          let {content, props={}, options={}} = app.router.getPopLayerInfo(app.loading._id)||{};
          if(content){
            props.progress = 100;
            props.timeout = app.loading.timeoutPrgress;
            app.loading._id = app.router.addPopLayer(content, props, options);
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
            app.router.removePopLayer(app.loading._id); 
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