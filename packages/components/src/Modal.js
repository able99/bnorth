import React from 'react';
import BaseComponent from './BaseComponent';
import Backdrop from './Backdrop';
import Panel, { PanelContainer } from './Panel';
import Button from './Button';
import { PanelIcon } from './Icon';


export let Modal = aprops=>{
  let {
    role, handleAction, in:isIn=true, onFinished,
    containerProps, 
    headerProps, title, titleProps, close, closeProps, 
    bodyProps, 
    footerProps, buttons=Modal.buttons[aprops.role]||[],
    children, ...props
  } = BaseComponent(aprops, Modal);
  children = typeof(children)==='function'?children(this):children;

  let classNamePre = {
    'position-relative backface-hidden overflow-a-hidden bg-color-white': true,
    'square-full': role==='popup',
    'border-radius-': role!=='popup'&&role!=='document',
  };
  let stylePre = {
    width: role!=='popup'?'80%':undefined,
  };
  let classNamePreContainer = { 'flex-display-block': role!=='document', 'flex-justify-center': role!=='document', 'flex-align-center': role!=='document', }
  let classNamePreHeader = 'width-full padding-a- border-set-bottom- flex-display-block flex-justify-between flex-align-center';
  let classNamePreTitle = {
    'flex-sub-flex-grow text-weight-bold text-size-lg': true,
    'text-align-center': !close,  
  }
  let classNamePreFooter = {
    'border-set-top-': children,
  }

  children = (
    <Panel onClick={e=>e.stopPropagation()} stylePre={role!=='document'&&stylePre} classNamePre={role!=='document'&&classNamePre} {...props}>
      {role==='document'?children:null}
      {role!=='document'&&(title||close)?(
        <Panel classNamePre={classNamePreHeader} {...headerProps}>
          {title?<Panel classNamePre={classNamePreTitle} {...titleProps}>{title}</Panel>:null}
          {close?<PanelIcon inline bc-cursor-pointer onClick={handleAction} name="close" defaultName="x" {...closeProps}>{close===true?undefined:close}</PanelIcon>:null}
        </Panel>
      ):null}
      {role!=='document'&&children?(<Panel bc-padding-a- {...bodyProps}>{children}</Panel>):null}
      {role!=='document'&&buttons.length?(
        <PanelContainer type="justify" noOverlap classNamePre={classNamePreFooter} {...footerProps}>
          {buttons.map((v,i)=><Panel component={Button} key={i} b-style="hollow" bc-bg-none- onClick={()=>handleAction&&handleAction(i)} {...v} />)}
        </PanelContainer>
      ):null}
    </Panel>
  )
  
  return <Panel componentTransform={Backdrop} handleAction={handleAction} in={isIn} onFinished={onFinished} classNamePre={classNamePreContainer} {...containerProps}>{children}</Panel>
}

Modal.buttons = {
  alert: [{children: '确定'}], 
  prompt: [{children: '取消'},{children: '确定'}],
}


export default {
  pluginName: 'modal',
  pluginDependence: [],

  onPluginMount(app) {
    app.modal = {
      _createContent: (_id, Content, state)=>(typeof Content==='function'?app.context.consumerHoc(()=>{
        return (
          <Content 
            modalId={_id}
            modalClose={()=>app.modal.close(_id)}
            modalStateData={state&&state.data()} 
            modalStateDataExt={state&&state.extData()} 
            modalState={state} />
        )
      }):Content),

      show: (Content, { onAction, options={}, state, ...props}={})=>{
        if(!Content) return;

        let _id = app.router.genPopLayerId(options);
        state = state&&app.State.createState(app, state===true?undefined:state, 'state', _id);

        options._id = _id;
        options.isModal = true; 
        options.onAdd = _id=>app.keyboard.on(_id, 'keydown', e=>e.keyCode===27&&app.modal.close(_id));
        options.onRemove = _id=>app.keyboard.off(_id, 'keydown', e=>e.keyCode===27&&app.modal.close(_id));
        props.in = true;
        props.handleAction = index=>(!onAction || onAction( index, state, ()=>app.modal.close(_id), _id)!==false) && app.modal.close(_id);
        props.children = app.modal._createContent(_id, Content, state);

        return app.router.addPopLayer(<Modal /> , props, options);
      },

      update: (_id, Content, { options={}, state, ...props}={})=>{
        if(!_id) return;
        let {content, prevProps={}, options:prevOptions={}} = app.router.getPopLayerInfo(_id)||{};
        if(!content) return;

        props = {
          ...prevProps,
          ...props,
          children: app.modal._createContent(_id, Content, state),
        }
        options = {
          ...prevOptions,
          ...options,
        }

        return app.router.addPopLayer(content, props, options);
      },
      
      close: _id=>{
        if(!_id) return;
        let {content, props, options} = app.router.getPopLayerInfo(_id)||{};
        if(!content) return;

        props.in = false;
        props.onTransitionFinished = ()=>{
          app.router.removePopLayer(_id);
          app.context.clear(_id);
        }

        return app.router.addPopLayer(content, props, options);
      },
    };
  },

  onPluginUnmount(app) {
    delete app.modal;
  },
}