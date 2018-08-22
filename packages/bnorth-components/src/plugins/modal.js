import React from 'react';
import Modal from '../Modal';


export default {
  // plugin 
  // --------------------------------
  pluginName: 'modal',
  pluginDependence: [],

  onPluginMount(app) {
    app.modal = {
      _createContent: ($id, Content)=>(typeof Content==='function'?app.context.consumerHoc(()=>(
        <Content 
          modalRef={$id}
          modalClose={()=>app.modal.close($id)}
          modalStateData={app.context.stateData($id)||{}} 
          modalStateUpdate={state=>app.context.stateUpdate($id, state)} />
      )):Content),

      show: (Content, { onAction, options={}, ...props}={})=>{
        if(!Content) return;

        let _id = app.router.getViewId(options);
        options._id = _id;
        options.isModal = true, 
        options.onAdd = $id=>app.keyboard.on($id, 'keydown', e=>e.keyCode===27&&app.modal.close($id)),
        options.onRemove = $id=>app.keyboard.off($id, 'keydown', e=>e.keyCode===27&&app.modal.close($id)),
        props.in = true;
        props.handleAction = index=>(!onAction || onAction( index, app.context.stateData($id)||{}, ()=>app.modal.close(_id), _id)!==false) && app.modal.close(_id);
        props.children = app.modal._createContent(_id, Content);

        return app.router.addView(<Modal /> , props, options);
      },
      update: ($id, Content, aoptions)=>{
        if(!$id) return;
        let {content, options={}} = app.router.getView($id)||{};
        if(!content) return;

        options = {
          ...options,
          ...aoptions,
          children: app.modal._createContent($id, Content),
        }

        return app.router.addView(content, options);
      },
      close: $id=>{
        if(!$id) return;
        let {content, props, options} = app.router.getView($id)||{};
        if(!content) return;

        props.in = false;
        props.onExited = ()=>{
          app.router.removeView($id);
          app.context.stateClean($id);
        }

        return app.router.addView(content, props, options);
      },
    };
  },

  onPluginUnmount(app) {
    delete app.modal;
  },
}