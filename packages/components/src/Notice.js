import React from 'react';
import { afPeekTop } from '@bnorth/rich.css/lib/styles/animationFrame';
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import AnimationFrame from './AnimationFrame';
import { PanelIcon } from './Icon';


let NoticePoplayer = aprops=>{
  let { 
    onClose, onFinished, frameFunc, params={}, duration, rewind,
    classNamePre, poplayer, ...props 
  } = BaseComponent(aprops, NoticePoplayer);
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

NoticePoplayer.defaultProps = {}
NoticePoplayer.defaultProps.frameFunc = afPeekTop;

Object.defineProperty(NoticePoplayer,"NoticePoplayer",{ get:function(){ return NoticePoplayer }, set:function(val){ NoticePoplayer = val }})
NoticePoplayer.isBnorth = true;
NoticePoplayer.defaultProps['b-precast'] = {
  'bp-title-bc-text-weight-': true,
  'bp-title-bc-text-size': 'lg',
};
export default NoticePoplayer;


export let notice = {
  _id: 'notice',

  _onStart(app) {
    app.notice = {
      show: (message, { timeout=3000, options={}, ...props}={})=>{
        message = app.utils.message2String(message);
        if(!message) return;

        app.notice._id = app.Poplayer.addPoplayer(NoticePoplayer, 
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
        return app.Poplayer.addPoplayer(undefined, {
          rewind: true,
          onFinished: ()=>{ app.Poplayer.removePoplayer(app.notice._id); app.notice._id = undefined }
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

  _onStop(app) {
    app.render.notice = app.notice._oldNotice;
    app.render.error = app.notice._oldError;
    delete app.notice;
  },
}