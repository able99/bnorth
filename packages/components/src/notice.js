import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import BaseComponent from './BaseComponent';
import Animation from './Animation';
import Panel from './Panel';
import { PanelIcon } from './Icon';


export let Notice = aprops=>{
  let {
    containerProps,
    onDoClose, onFinished, transitionProps, 
    contentProps, closeProps, close, 
    children, ...props
  } = BaseComponent(aprops, Notice);

  let classNamePreContainer = 'position-absolute offset-top-start offset-left-top width-full';
  let classNamePre = 'flex-display-block flex-align-center width-full';
  let classNamePreInner = 'padding-a-';
  let classNamePreContent = 'text-weight- text-size-lg flex-sub-flex-extend';
  let classNamePreClose = 'padding-h-sm padding-v-0 flex-sub-flex-none';

  return (
    <Panel className={classNamePreContainer} {...containerProps}>
      <Animation
        type="collapse" transitionProps={transitionProps} onFinished={onFinished} 
        b-style="solid" b-theme="mask" classNamePre={classNamePre} {...props}>
        <Panel classNamePre={classNamePreInner}>
          {children?<Panel classNamePre={classNamePreContent} {...contentProps}>{children}</Panel>:null}
          {close?<PanelIcon b-style="plain" b-theme="white" inline bc-cursor-pointer onClick={onDoClose} name="close" defaultName="x" {...closeProps}>{close===true?undefined:close}</PanelIcon>:null}
        </Panel>
      </Animation>
    </Panel>
  );
}




// export default {
//   _id: 'notice',

//   onPluginMount(app) {
//     app.notice = {
//       _timer: undefined,

//       show: (message, { timeout=3000, options={}, ...props}={})=>{
//         message = app.utils.message2String(message);
//         if(!message) return;

//         let _id = app.notice._id || app.router.genPopLayerId(options);
//         options._id = _id;
//         props.in = true;
//         props.onDoClose = ()=>app.notice.close();
//         props.children = message;

//         if(app.notice._timer) window.clearTimeout(app.notice._timer);
//         app.notice._timer = window.setTimeout(()=>app.notice.close(),timeout);

//         return app.notice._id = app.router.addPopLayer(<Container><Notification /></Container> , props, options);
//       },

//       close: ()=>{
//         if(app.notice._timer) { window.clearTimeout(app.notice._timer); app.notice._timer = undefined; }
//         if(!app.notice._id) return;
//         let {content, props={}, options={}} = app.router.getPopLayerInfo(app.notice._id)||{};
//         if(!content) { app.notice._id = undefined; return; }

//         props.in = false;
//         props.onTransitionFinished = ()=>{ 
//           app.router.removePopLayer(app.notice._id); 
//           app.notice._id = undefined; 
//         }

//         return app.router.addPopLayer(content, props, options);
//       },
//     };

//     app.notice._oldNotice = app.render.notice;
//     app.notice._oldErrorNotice = app.render.errorNotice;
//     app.render.notice = (message, options)=>app.notice.show(message, options);
//     app.render.error = (message, options={})=>app.notice.show(message, {...options, 'b-theme': options['b-theme']||'alert'});
//   },

//   onPluginUnmount(app) {
//     app.render.notice = app.notice._oldNotice;
//     app.render.error = app.notice._oldErrorNotice;
//     delete app.notice;
//   },
// }