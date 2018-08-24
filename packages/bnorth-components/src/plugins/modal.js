import React from 'react';
import Modal from '../Modal';


export default {
  // plugin 
  // --------------------------------
  pluginName: 'modal',
  pluginDependence: [],

  onPluginMount(app) {
    app.modal = {
      _createContent: (_id, Content)=>(typeof Content==='function'?app.context.consumerHoc(()=>(
        <Content 
          modalRef={_id}
          modalClose={()=>app.modal.close(_id)}
          modalStateData={app.context.stateData(_id)||{}} 
          modalStateUpdate={state=>app.context.stateUpdate(_id, state)} />
      )):Content),

      show: (Content, { onAction, options={}, ...props}={})=>{
        if(!Content) return;

        let _id = app.router.getViewId(options);
        options._id = _id;
        options.isModal = true, 
        options.onAdd = _id=>app.keyboard.on(_id, 'keydown', e=>e.keyCode===27&&app.modal.close(_id)),
        options.onRemove = _id=>app.keyboard.off(_id, 'keydown', e=>e.keyCode===27&&app.modal.close(_id)),
        props.in = true;
        props.handleAction = index=>(!onAction || onAction( index, app.context.stateData(_id)||{}, ()=>app.modal.close(_id), _id)!==false) && app.modal.close(_id);
        props.children = app.modal._createContent(_id, Content);

        return app.router.addView(<Modal /> , props, options);
      },

      update: (_id, Content, { options={}, ...props}={})=>{
        if(!_id) return;
        let {content, prevProps={}, options:prevOptions={}} = app.router.getView(_id)||{};
        if(!content) return;

        props = {
          ...prevProps,
          ...props,
          children: app.modal._createContent(_id, Content),
        }
        options = {
          ...prevOptions,
          ...options,
        }

        return app.router.addView(content, props, options);
      },
      
      close: _id=>{
        if(!_id) return;
        let {content, props, options} = app.router.getView(_id)||{};
        if(!content) return;

        props.in = false;
        props.onExited = ()=>{
          app.router.removeView(_id);
          app.context.stateClean(_id);
        }

        return app.router.addView(content, props, options);
      },
    };
  },

  onPluginUnmount(app) {
    delete app.modal;
  },
}