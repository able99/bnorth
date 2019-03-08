import React from 'react';
import BaseComponent from './BaseComponent';
import Panel, { PanelContainer } from './Panel';
import Backdrop from './Backdrop';
import { PanelIcon } from './Icon';
import Button from './Button';


let Modal = aprops=>{
  let {
    in:isIn, type, onClose, onFinished,
    containerProps, headerProps, title, close, bodyProps, footerProps, buttons,
    children, ...props
  } = BaseComponent(aprops, Modal);
  buttons = buttons[type]||[];
  children = typeof(children)==='function'?children(this):children;

  let classNamePre = {
    'position-relative backface-hidden overflow-a-hidden': true,
    'square-full': type==='popup',
    'border-radius-': type!=='popup'&&type!=='document',
  };
  let stylePre = { width: type!=='popup'?'80%':undefined };
  let classNamePreContainer = { 'flex-display-block': type!=='document', 'flex-justify-center': type!=='document', 'flex-align-center': type!=='document' }

  children = (
    <Panel onClick={e=>{e.stopPropagation();e.preventDefault()}} btn={false} b-style="white" stylePre={type!=='document'&&stylePre} classNamePre={type!=='document'&&classNamePre} {...props}>
      {type==='document'?children:null}
      {type!=='document'&&(title||close)?(
        <PanelIcon 
          bp-title-bc-flex-sub-flex-extend bp-title-bc-text-align-center={!close}
          name={close===true?"close:x":close} bp-icon-onClick={onClose} b-icon-bc-padding-a="xs"
          bc-border-set-bottom-={Boolean(children||buttons.length)} bc-width-full bc-padding-a- position="right" {...headerProps}>
          {title}
        </PanelIcon>
      ):null}
      {type!=='document'&&children?(<Panel bc-padding-a- bc-border-set-bottom-={Boolean(buttons.length)} {...bodyProps}>{children}</Panel>):null}
      {type!=='document'&&buttons.length?(
        <PanelContainer ctype="justify" {...footerProps}>
          {buttons.map((v,i)=><Panel key={i} componentTransform={Button} className="bg-none- border-none-top- border-none-bottom- border-none-right-" bc-border-set-left-={Boolean(i)} bc-border-none-left-={!Boolean(i)} onClick={e=>{e.stopPropagation();onClose&&onClose(i)}} {...v} />)}
        </PanelContainer>
      ):null}
    </Panel>
  )
  
  return <Panel componentTransform={Backdrop} in={isIn} btn={false} onClick={onClose} onFinished={onFinished} classNamePre={classNamePreContainer} {...containerProps}>{children}</Panel>
}

Modal.defaultProps = {}
Modal.defaultProps['b-precast'] = {
  'bp-header-bp-title-bc-text-weight': 'bold',
}
Modal.defaultProps.buttons = {
  alert: [{children: '确定'}], 
  prompt: [{children: '取消'},{children: '确定'}],
}

Object.defineProperty(Modal,"Modal",{ get:function(){ return Modal }, set:function(val){ Modal = val }})
export default Modal;






export let modal = {
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
        props.onClose = index=>(!onAction || onAction( index, state, ()=>app.modal.close(_id), _id)!==false) && app.modal.close(_id);
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
        props.onFinished = ()=>{
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