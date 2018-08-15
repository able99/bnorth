/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { genCommonProps, cx, hascx } from './utils/props';
import Backdrop from './Backdrop';
import AnimationFade from './AnimationFade';
import Button from './Button';
import Icon from './Icon';


let Modal = aprops=>{
  let {
    handleAction, onExited,
    role, title, titleClose, 
    headerProps, headerTitleProps, headerCloseProps, bodyProps, footerProps, footerButtonsProps, containerProps, 
    style, className, children, ...props
  } = genCommonProps(aprops);
  
  
  let classSet = {
    'position-relative': true,
    'backface-hidden': true,
    'overflow-hidden': true,
    'square-full': role==='popup',
    'bg-color-white': !hascx(className, 'bg-color'),
    'border-radius': !hascx(className, 'border-radius'),
  };

  let styleSet = {
    width: role!=='popup'?'80%':undefined,
    ...style||{},
  };
  

  return (
    <Modal.Container {...aprops}>
      {role==='document'?children:(
        <div style={styleSet} className={cx(classSet, className)} onClick={e=>e.stopPropagation()} {...props}>
          <Modal.Header {...aprops} />
          <Modal.Body {...aprops} />
          <Modal.Footer {...aprops} />
        </div>
      )}
    </Modal.Container>
  )
}

Modal.Container = aprops=>{
  let { 
    role,
    handleAction, in:isIn=true, onExited,
    containerProps, children,
  } = aprops;
  let { component=Backdrop, className, mask=true, timeout, Transition=AnimationFade, ...props } = genCommonProps(containerProps);


  let classSet = {
    'border-none': !className.startsWith('border'),
    'flex-display-flex': role!=='document',
    'flex-justify-center': role!=='document',
    'flex-align-center': role!=='document',
    'padding': !className.startsWith('padding')&&role!=='document'&&role==='popup',
  }


  return (
    <Transition
      onClick={()=>handleAction && handleAction()}
      in={isIn} timeout={timeout} onExited={onExited} component={component} mask={mask} 
      className={cx(classSet, className)} {...props}>
      {children}
    </Transition>
  );
}

Modal.Header = aprops=>{
  let { title, titleClose, headerProps={} } = aprops;
  let { className, ...props } = genCommonProps(headerProps);


  let classSet = {
    'width-full': true,
    'padding': true,
    'border-set-bottom': !hascx(className, 'border'),
    'flex-display-flex': true,
    'flex-justify-between': true,
    'flex-align-center': true,
  };

  
  return (title||titleClose?(
    <div className={cx(classSet, className)} {...props}>
      <Modal.HeaderTitle {...aprops} />
      <Modal.HeaderClose {...aprops} />
    </div>
  ):null);
}

Modal.HeaderTitle = aprops=>{
  let { title, hasClose, headerTitleProps } = aprops;
  let { className, ...props } = genCommonProps(headerTitleProps);

  
  let classSet = {
    'text-align-center': !hasClose&&!className.startsWith('text-align'),
    'flex-sub-flex-grow': true,
  };

  
  return (
    <big className={cx(classSet, className)} {...props}>
      <strong>{title}</strong>
    </big>
  );
}

Modal.HeaderClose = aprops=>{
  let { titleClose=null, headerCloseProps, handleAction } = aprops;
  let { className, cStyle='plain', name='close', children, ...props } = genCommonProps(headerCloseProps);


  let classSet = {
    'padding-xs': !className.startsWith('padding'),
  };

  
  return (titleClose===true?(
    <Button 
      onClick={()=>handleAction&&handleAction()}
      cStyle={cStyle} className={cx(classSet, className)} {...props}>
      {name?<Icon name={Icon.getName(name,'x')} />:null}
      {children}
    </Button>
  ):titleClose)
}

Modal.Body = aprops=>{
  let { bodyProps={}, children, } = aprops;
  let { className, ...props } = genCommonProps(bodyProps);
  children = typeof(children)==='function'?children(this):children;


  let classSet = {
    'padding': !hascx(className, 'padding'),
  };
  

  return (
    <div className={cx(classSet, className)} {...props}>
      {children}
    </div>
  );
}

Modal.Footer =  aprops=>{
  let { footerProps } = aprops;
  let { className, ...props } = genCommonProps(footerProps);
  

  let classSet = {
    'flex-display-flex': true,
    'border-set-top': true,
  };
    
  
  return (
    <div className={cx(classSet, className)} {...props}>
      <Modal.FooterButtons {...aprops} />
    </div>
  );
}

Modal.FooterButtons =  aprops=>{
  let { role, footerButtonProps, handleAction } = aprops;
  let { 
    className, style, cStyle='plain', cTheme, cSize,
    buttons={ alert: ['确定'], prompt: ['取消','确定'] }[role],
    itemClassSet=(i,length,v,props,data)=>{ 
      let ret = {'flex-sub-flex-grow': true};
      i<=length-1&&(ret['border-right-border']=true);
      return ret;
    },
    itemStyleSet=(i,length,v,props,data)=>{ 
      let ret = {};
      return ret;
    },
    itemProps=(i,length,v,props,data)=>{
      let ret = {};
      i>=length-1&&(ret[cTheme]='primary');
      return ret;
    },
    ...props
  } = genCommonProps(footerButtonProps);
  if(!buttons||!buttons.length) return null;
  
  
  return (
    <React.Fragment>
      {buttons.map((v,i, arr)=>(
        <Button
          key={'footer-button'+i}
          cStyle="plain"
          onClick={()=>handleAction && handleAction(i)}
          className={cx(
            className,
            itemClassSet(i, arr.length, v, props)
          )} 
          style={{
            ...style,
            ...itemStyleSet(i, arr.length, v, props),
          }}
          {...{
            cStyle, cSize, cTheme,
            ...props,
            ...itemProps(i, arr.length, v, props),
          }}>
          {typeof(v)==='object'?v.title:v}
        </Button>
      ))}
    </React.Fragment>
  );
}


export default Modal;
