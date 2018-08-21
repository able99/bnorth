import React from 'react';
import Mask from '../Mask';


export default {
  // plugin 
  // --------------------------------
  pluginName: 'mask',
  pluginDependence: [],

  onPluginMount(app) {
    app.mask = {
      show: (options={})=>{
        let $id = app.mask.$id || app.router.getViewId(options);
        options.$id = $id;
        options.$isModal = true;
        return app.mask.$id = app.router.addView(<Mask /> , options);
      },
      close: ()=>{
        let {content, options={}} = app.router.getView(app.mask.$id)||{};
        if(!content) {
          app.mask.$id = undefined;
          return;
        }

        options.in = false;
        options.onExited = ()=>{ 
          app.router.removeView(app.mask.$id); 
          app.mask.$id = undefined; 
        }

        return app.router.addView(content, options);
      },
    };

    app.mask._oldMask = app.render.mask;
    app.render.mask = (show, options)=>show?app.mask.show(options):app.mask.close();
  },

  onPluginUnmount(app) {
    app.render.mask = app.mask._oldMask;
    delete app.mask;
  },
}