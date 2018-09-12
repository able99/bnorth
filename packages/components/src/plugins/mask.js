import React from 'react';
import Mask from '../Mask';


export default {
  // plugin 
  // --------------------------------
  _id: 'mask',

  onPluginMount(app) {
    app.mask = {
      show: ({options={}, ...props}={})=>{
        let _id = app.mask._id||app.router.getViewId(options);
        options._id = _id;
        options.isModal = true;
        return app.mask._id = app.router.addView(<Mask /> , props, options);
      },

      close: ()=>{
        let {content, props={}, options={}} = app.router.getView(app.mask._id)||{};
        if(!content) { app.mask._id = undefined; return }

        props.in = false;
        props.onExited = ()=>{ 
          app.router.removeView(app.mask._id); 
          app.mask._id = undefined; 
        }

        return app.router.addView(content, props, options);
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