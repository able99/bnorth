import React from 'react';
import BaseComponent from './BaseComponent';
import Animation from './Animation';
import Panel from './Panel';
import { PanelIcon } from './Icon';


export let Notice = aprops=>{
  let {
    containerProps,
    onDoClose, onFinished, transitionProps, animationProps,
    ...props
  } = BaseComponent(aprops, Notice);

  let classNamePreContainer = 'position-absolute offset-top-start offset-left-top width-full';

  return (
    <Panel className={classNamePreContainer} {...containerProps}>
      <Animation type="collapse" bc-width-full onFinished={onFinished} transitionProps={transitionProps} {...animationProps}>
        <PanelIcon 
          bp-title-bc-flex-sub-flex-extend bp-title-bc-text-weight- bp-title-bc-text-size-lg
          name="close:x" bp-icon-onClick={onDoClose} b-icon-bc-padding-a-xs
          bc-width-full bc-padding-a- position="right" b-style="solid" b-theme="mask" {...props} />
      </Animation>
    </Panel>
  );
}

Notice.defaultProps = {}

Object.defineProperty(Notice,"Notice",{ get:function(){ return Notice }, set:function(val){ Notice = val }})




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