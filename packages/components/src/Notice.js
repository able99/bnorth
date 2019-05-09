import React from 'react';
import { afPeekTop } from '@bnorth/rich.css/lib/styles/animationFrame';
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import AnimationFrame from './AnimationFrame';
import { PanelIcon } from './Icon';


let Notice = aprops=>{
  let { 
    onClose, onFinished, frameFunc, params={}, duration, rewind,
    classNamePre, ...props 
  } = BaseComponent(aprops, Notice);

  classNamePre = {
    'position-absolute offset-top-start offset-left-top width-full padding-a-': true,
    ...classNamePre,
  }

  return (
    <AnimationFrame play rewind={rewind} frameFunc={frameFunc} params={params} onFinished={()=>rewind&&onFinished&&onFinished()}>
      <Panel 
        bp-title-bc-flex-sub-flex-extend
        name="close:x" bp-icon-onClick={onClose} b-icon-bc-padding-a="xs"
        position="right" b-style="solid" b-theme="mask" 
        component={PanelIcon} classNamePre={classNamePre} {...props} />
    </AnimationFrame>
  );
}

Notice.defaultProps = {}
Notice.defaultProps.frameFunc = afPeekTop;

Object.defineProperty(Notice,"Notice",{ get:function(){ return Notice }, set:function(val){ Notice = val }})
Notice.isBnorth = true;
Notice.defaultProps['b-precast'] = {
  'bp-title-bc-text-weight-': true,
  'bp-title-bc-text-size': 'lg',
};
export default Notice;


export let notice = {
  _id: 'notice',

  onPluginMount(app) {
    app.notice = {
      _timer: undefined,

      show: (message, { timeout=3000, options={}, ...props}={})=>{
        message = app.utils.message2String(message);
        if(!message) return;

        options._id = app.notice._id || app.router.genPopLayerId(options);
        props.rewind = false;
        props.onClose = ()=>app.notice.close();
        props.children = message;

        if(app.notice._timer) window.clearTimeout(app.notice._timer);
        app.notice._timer = window.setTimeout(()=>app.notice.close(),timeout);

        return app.notice._id = app.router.addPopLayer(<Notice /> , props, options);
      },

      close: ()=>{
        if(app.notice._timer) { window.clearTimeout(app.notice._timer); app.notice._timer = undefined; }
        if(!app.notice._id) return;
        let {content, props={}, options={}} = app.router.getPopLayerInfo(app.notice._id)||{};
        if(!content) { app.notice._id = undefined; return; }

        props.rewind = true;
        props.onFinished = ()=>{ 
          app.router.removePopLayer(app.notice._id); 
          app.notice._id = undefined; 
        }

        return app.router.addPopLayer(content, props, options);
      },
    };

    app.notice._oldNotice = app.render.notice;
    app.notice._oldErrorNotice = app.render.errorNotice;
    app.render.notice = (message, options)=>app.notice.show(message, options);
    app.render.error = (message, options={})=>app.notice.show(message, {...options, 'b-theme': options['b-theme']||'alert'});
  },

  onPluginUnmount(app) {
    app.render.notice = app.notice._oldNotice;
    app.render.error = app.notice._oldErrorNotice;
    delete app.notice;
  },
}