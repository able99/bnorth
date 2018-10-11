import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Backdrop from './Backdrop';
import Panel from './Panel';
import Button from './Button';
import Icon from './Icon';


let Modal = aprops=>{
  let {
    role, handleAction, 
    in:isIn=true, onTransitionFinished,
    containerProps, 
    title, titleProps, hasTitleClose, titleCloseProps, titleCloseIconProps, headerProps, 
    bodyProps, 
    footerProps, 
    component:Component=Panel, style, className, children, ...props
  } = parseProps(aprops, Modal.props);

  children = typeof(children)==='function'?children(this):children;
  let classStr = 'position-relative backface-hidden overflow-a-hidden bg-color-white';
  let classSet = {
    'square-full': role==='popup',
    'border-radius-': role!=='popup'&&role!=='document',
  };
  let styleSet = {
    width: role!=='popup'?'80%':undefined,
    ...style||{},
  };

  let component = role==='document'?children:(
    <Component 
      onClick={e=>e.stopPropagation()} 
      style={styleSet} className={classes(classStr, classSet, className)} {...props}>
      <Modal._Header 
        role={role} handleAction={handleAction} 
        title={title} titleProps={titleProps} 
        hasTitleClose={hasTitleClose} titleCloseProps={titleCloseProps} titleCloseIconProps={titleCloseIconProps}
        {...headerProps} />
      <Modal._Body 
        role={role} handleAction={handleAction} 
        {...bodyProps}>
        {children}
      </Modal._Body>
      <Modal._Footer 
        role={role} handleAction={handleAction}
        {...footerProps} />
    </Component>
  )
  
  return (
    <Modal._Container 
      role={role} handleAction={handleAction} 
      in={isIn} onTransitionFinished={onTransitionFinished} 
      {...containerProps}>
      {component}
    </Modal._Container>
  )
}

Modal._Container = aprops=>{
  let { 
    role, handleAction, 
    transition, 
    component:Component=Backdrop, className, ...props
  } = parseProps(aprops);

  let classSet = {
    'flex-display-block': role!=='document',
    'flex-justify-center': role!=='document',
    'flex-align-center': role!=='document',
  }

  return (
    <Component
      onClick={()=>handleAction&&handleAction()}
      className={classes(classSet, className)} {...props} />
  );
}

Modal._Header = aprops=>{
  let { 
    role, handleAction,
    title, titleProps, hasTitleClose, titleCloseProps, titleCloseIconProps,
    component:Component=Panel, className, ...props 
  } = parseProps(aprops, Modal._Header.props);
  if(!title&&!hasTitleClose) return null;

  let classStr = 'width-full padding-a- border-set-bottom- flex-display-block flex-justify-between flex-align-center';
  
  return (
    <Component className={classes(classStr, className)} {...props}>
      <Modal._Header._Title hasTitleClose={hasTitleClose} {...titleProps}>{title}</Modal._Header._Title>
      {!hasTitleClose?null:(
        <Modal._Header._TitleClose 
          handleAction={handleAction} 
          titleCloseIconProps={titleCloseIconProps} {...titleCloseProps}>
          {hasTitleClose} 
        </Modal._Header._TitleClose>
      )}
    </Component>
  );
}

Modal._Header._Title = aprops=>{
  let { 
    hasTitleClose,
    component:Component=Panel, className, ...props 
  } = parseProps(aprops, Modal._Header._Title.props);
  
  let classStr = 'flex-sub-flex-grow text-weight-bold text-size-lg';
  let classSet = { 'text-align-center': !hasTitleClose };  

  return <Component className={classes(classStr, classSet, className)} {...props} />; 
}

Modal._Header._TitleClose = aprops=>{
  let { 
    handleAction, 
    titleCloseIconProps,
    component:Component=Button, className, children, ...props 
  } = parseProps(aprops, Modal._Header._TitleClose.props);

  let classStr = 'padding-h-sm padding-v-0';
  
  return (
    <Component
      b-style="plain"
      onClick={()=>handleAction&&handleAction()} 
      className={classes(classStr, className)}
      {...props}>
      {children===true?<Modal._Header._TitleClose._Icon {...titleCloseIconProps} />:children}
    </Component>
  );
}

Modal._Header._TitleClose._Icon = aprops=>{
  let { 
    component:Component=Icon, ...props 
  } = parseProps(aprops, Modal._Header._TitleClose._Icon.props);

  return <Component name="close" defaultName="x" {...props} />
}

Modal._Body = aprops=>{
  let { 
    role, handleAction,
    component:Component=Panel, className, children, ...props 
  } = parseProps(aprops, Modal._Body.props);

  children = typeof(children)==='function'?children(this):children;
  if(!children) return null;
  let classStr = 'padding-a-';
  
  return <Component className={classes(classStr, className)} {...props}>{children}</Component>;
}

Modal._Footer =  aprops=>{
  let { 
    role, handleAction,
    buttons=Modal._Footer._buttons[aprops.role]||[],
    itemProps, itemGetClassName=Modal._Footer._itemGetClassName, itemGetStyle=Modal._Footer._itemGetStyle, itemGetProps=Modal._Footer._itemGetProps,
    component:Component=Button.Group, componentItem=Button, className, children, ...props 
  } = parseProps(aprops, Modal._Footer.props);
  if(!buttons.length) return null;

  let classStr = 'border-set-top-';
  
  return (
    <Component 
      type="justify" 
      containerProps={aprops} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props}>
      {buttons.map((v,i)=><componentItem key={i}>{v}</componentItem>)}
    </Component>
  );
}

Modal._Footer._itemGetProps=(i, length, {handleAction}={}, subPropsEach, subProps)=>{
  return {
    'bc-bg-none-': true,
    'bc-border-none-top-': true,
    onClick: ()=>handleAction&&handleAction(i),
  };
}

Modal._Footer._buttons = {
  alert: ['确定'], 
  prompt: ['取消','确定'],
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

        let _id = app.router.getViewId(options);
        state = state&&app.State.createState(app, state===true?undefined:state, 'state', _id);

        options._id = _id;
        options.isModal = true; 
        options.onAdd = _id=>app.keyboard.on(_id, 'keydown', e=>e.keyCode===27&&app.modal.close(_id));
        options.onRemove = _id=>app.keyboard.off(_id, 'keydown', e=>e.keyCode===27&&app.modal.close(_id));
        props.in = true;
        props.handleAction = index=>(!onAction || onAction( index, state, ()=>app.modal.close(_id), _id)!==false) && app.modal.close(_id);
        props.children = app.modal._createContent(_id, Content, state);

        return app.router.addView(<Modal /> , props, options);
      },

      update: (_id, Content, { options={}, state, ...props}={})=>{
        if(!_id) return;
        let {content, prevProps={}, options:prevOptions={}} = app.router.getView(_id)||{};
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

        return app.router.addView(content, props, options);
      },
      
      close: _id=>{
        if(!_id) return;
        let {content, props, options} = app.router.getView(_id)||{};
        if(!content) return;

        props.in = false;
        props.onTransitionFinished = ()=>{
          app.router.removeView(_id);
          app.context.clear(_id);
        }

        return app.router.addView(content, props, options);
      },
    };
  },

  onPluginUnmount(app) {
    delete app.modal;
  },
}