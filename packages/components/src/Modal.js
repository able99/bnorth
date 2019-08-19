import React from 'react';
import BaseComponent from './BaseComponent';
import Panel, { PanelContainer } from './Panel';
import Backdrop from './Backdrop';
import { PanelIcon } from './Icon';
import Button from './Button';


let Modal = aprops=>{
  let {
    type, rewind, onClose, onFinished,
    containerProps, headerProps, title, close, bodyProps, footerProps, buttons,
    classNamePre, stylePre, children, poplayer, ...props
  } = BaseComponent(aprops, Modal);
  buttons = buttons[type]||[];
  children = typeof(children)==='function'?children(poplayer):children;

  classNamePre = {
    'position-relative backface-hidden overflow-a-hidden': true,
    'square-full': type==='popup',
    'border-radius-': type!=='popup'&&type!=='document',
    ...classNamePre,
  };
  stylePre = { width: type!=='popup'?'80%':undefined, ...stylePre };
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
          {buttons.map((v,i)=><Panel key={i} component={Button} className="bg-none- border-none-top- border-none-bottom- border-none-right-" bc-border-set-left-={Boolean(i)} bc-border-none-left-={!Boolean(i)} onClick={e=>{e.stopPropagation();onClose&&onClose(i)}} {...v} />)}
        </PanelContainer>
      ):null}
    </Panel>
  )
  
  return <Panel component={Backdrop} duration={100} rewind={rewind} btn={false} onClick={onClose} onFinished={onFinished} classNamePre={classNamePreContainer} {...containerProps}>{children}</Panel>
}

Modal.defaultProps = {}
Modal.defaultProps.buttons = {
  alert: [{children: '确定'}], 
  prompt: [{children: '取消'},{children: '确定'}],
}

Object.defineProperty(Modal,"Modal",{ get:function(){ return Modal }, set:function(val){ Modal = val }})
Modal.isBnorth = true;
Modal.defaultProps['b-precast'] = {
  'bp-header-bp-title-bc-text-weight': 'bold',
};
export default Modal;



export let modal = {
  pluginName: 'modal',
  pluginDependence: [],

  onPluginMount(app) {
    app.modal = {
      show: (content, props, options={})=>{
        return options._id = app.router.addPopLayer( Modal, 
          {children: content, onClose: index=>app.modal.close(options._id, index), ...props}, 
          {_idPage: app.router.getPage()._id, isModal: true, ...options}
        );
        //   options.onAdd = _id=>app.keyboard.on(options._id, 'keydown', e=>e.keyCode===27&&app.modal.close(options._id));
        //   options.onRemove = _id=>app.keyboard.off(options._id, 'keydown', e=>e.keyCode===27&&app.modal.close(options._id));
      },
      
      close: (_id, index)=>{
        let {props:{onAction}={}} = app.router.getPopLayerInfo(_id)||{};
        if(onAction&&onAction(index, _id)===false) return;
        return app.modal.remove(_id);
      },

      remove: _id=>{
        let {content, props, options} = app.router.getPopLayerInfo(_id)||{};
        if(!content) return;
        props.rewind = true;
        props.onFinished = ()=>{ app.router.removePopLayer(_id) }
        return app.router.addPopLayer(content, props, options);
      },
    };

    app.modal._modalShow = app.render.modalShow;
    app.modal._modalClose = app.render.modalClose;
    app.render.modalShow = (...args)=>app.modal.show(...args);
    app.render.modalClose = (...args)=>app.modal.close(...args);
  },

  onPluginUnmount(app) {
    app.render.modalShow = app.modal._modalShow;
    app.render.modalClose = app.modal._modalClose;
    delete app.modal;
  },
}