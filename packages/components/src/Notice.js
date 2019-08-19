import React from 'react';
import { afPeekTop } from '@bnorth/rich.css/lib/styles/animationFrame';
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import AnimationFrame from './AnimationFrame';
import { PanelIcon } from './Icon';


let NoticePopLayer = aprops=>{
  let { 
    onClose, onFinished, frameFunc, params={}, duration, rewind,
    classNamePre, poplayer, ...props 
  } = BaseComponent(aprops, NoticePopLayer);
  props.children = typeof(props.children)==='function'?props.children(poplayer):props.children;

  classNamePre = { 'position-absolute offset-top-start offset-left-top width-full padding-a-': true, ...classNamePre }

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

NoticePopLayer.defaultProps = {}
NoticePopLayer.defaultProps.frameFunc = afPeekTop;

Object.defineProperty(NoticePopLayer,"NoticePopLayer",{ get:function(){ return NoticePopLayer }, set:function(val){ NoticePopLayer = val }})
NoticePopLayer.isBnorth = true;
NoticePopLayer.defaultProps['b-precast'] = {
  'bp-title-bc-text-weight-': true,
  'bp-title-bc-text-size': 'lg',
};
export default NoticePopLayer;


export let notice = {
  _id: 'notice',

  onPluginMount(app) {
    app.notice = {
      show: (message, { timeout=3000, options={}, ...props}={})=>{
        message = app.utils.message2String(message);
        if(!message) return;

        app.notice._id = app.router.addPopLayer(NoticePopLayer, 
          {children: message, onClose: ()=>app.notice.close(), ...props}, 
          {...options, _id: app.notice._id}
        );

        if(app.notice._timer) window.clearTimeout(app.notice._timer);
        app.notice._timer = window.setTimeout(()=>app.notice.close(),timeout);

        return app.notice._id;
      },

      close: ()=>{
        if(app.notice._timer) { window.clearTimeout(app.notice._timer); app.notice._timer = undefined; }
        if(!app.notice._id) return;
        return app.router.addPopLayer(undefined, {
          rewind: true,
          onFinished: ()=>{ app.router.removePopLayer(app.notice._id); app.notice._id = undefined }
        },{
          _id: app.notice._id,
        });
      },
    };

    app.notice._oldNotice = app.render.notice;
    app.notice._oldError = app.render.error;
    app.render.notice = (...args)=>app.notice.show(...args);
    app.render.error = (message, props, options)=>app.notice.show(message, {...props, 'b-theme': 'alert'}, options);
  },

  onPluginUnmount(app) {
    app.render.notice = app.notice._oldNotice;
    app.render.error = app.notice._oldError;
    delete app.notice;
  },
}