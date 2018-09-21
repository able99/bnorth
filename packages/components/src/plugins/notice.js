import React from 'react';
import Notification from '../Notification';


export default {
  _id: 'notice',

  onPluginMount(app) {
    app.notice = {
      _timer: undefined,

      show: (message, { timeout=3000, options={}, ...props}={})=>{
        message = app.utils.message2String(message);
        if(!message) return;

        let _id = app.notice._id || app.router.getViewId(options);
        options._id = _id;
        props.in = true;
        props.onClose = ()=>app.notice.close();
        props.children = message;

        if(app.notice._timer) window.clearTimeout(app.notice._timer);
        app.notice._timer = window.setTimeout(()=>app.notice.close(),timeout);

        return app.notice._id = app.router.addView(<Notification /> , props, options);
      },

      close: ()=>{
        if(app.notice._timer) { window.clearTimeout(app.notice._timer); app.notice._timer = undefined; }
        if(!app.notice._id) return;
        let {content, props={}, options={}} = app.router.getView(app.notice._id)||{};
        if(!content) { app.notice._id = undefined; return; }

        props.in = false;
        props.onTransitionFinished = ()=>{ 
          app.router.removeView(app.notice._id); 
          app.notice._id = undefined; 
        }

        return app.router.addView(content, props, options);
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