import React from 'react';
import Notification from '../Notification';


export default {
  // plugin 
  // --------------------------------
  pluginName: 'notice',
  pluginDependence: [],

  onPluginMount(app) {
    app.notice = {
      show: (message, aoptions={})=>{
        message = app.utils.message2String(message);
        if(!message) return;
        let { timeout=3000, ...options } = aoptions;

        let $id = app.notice.$id || app.router.getViewId(options);
        options.$id = $id;
        options.in = true;
        options.onClose = ()=>app.notice.close();
        options.children = message;

        if(app.notice._timer) window.clearTimeout(app.notice._timer);
        app.notice._timer = window.setTimeout(()=>app.notice.close(),timeout);

        return app.notice.$id = app.router.addView(<Notification /> , options);
      },
      close: ()=>{
        if(app.notice._timer) { window.clearTimeout(app.notice._timer); app.notice._timer = undefined; }
        if(!app.notice.$id) return;

        
        let {content, options={}} = app.router.getView(app.notice.$id)||{};
        if(!content) {
          app.notice.$id = undefined;
          return;
        }

        options.in = false;
        options.onExited = ()=>{ 
          app.router.removeView(app.notice.$id); 
          app.notice.$id = undefined; 
        }

        return app.router.addView(content, options);
      },
    };

    app.notice._oldNotice = app.render.notice;
    app.notice._oldErrorNotice = app.render.errorNotice;
    app.render.notice = (message, options)=>app.notice.show(message, options);
    app.render.error = (message, options={})=>app.notice.show(message, {...options, cTheme: options.cTheme||'alert'});
  },

  onPluginUnmount(app) {
    app.render.notice = app.notice._oldNotice;
    app.render.error = app.notice._oldErrorNotice;
    delete app.notice;
  },
}