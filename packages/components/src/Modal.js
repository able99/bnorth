/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, getSubComponentProps, cxm } from './utils/props';
import AnimationFade from './AnimationFade';
import Backdrop from './Backdrop';
import Button from './Button';
import Icon from './Icon';


let Modal = aprops=>{
  let {
    role, handleAction, in:isIn=true, onTransitionFinished,
    containerProps, 
    headerProps, title, titleProps, hasTitleClose, titleCloseProps, titleCloseIconProps,
    bodyProps, 
    footerProps, footerButtonProps, footButtonGetStyle, footButtonGetClassName, footButtonGetProps,
    component:Component="div", style, className, children, ...props
  } = genCommonProps(aprops);
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
  
  return (
    <Modal._Container 
      handleAction={handleAction} in={isIn} onTransitionFinished={onTransitionFinished}
      role={role} {...containerProps}>
      {role==='document'?children:(
        <Component 
          onClick={e=>e.stopPropagation()} 
          style={styleSet} className={cxm(classStr, classSet, className)} 
          {...props}>
          <Modal._Header 
            title={title} titleProps={titleProps} 
            hasTitleClose={hasTitleClose} titleCloseProps={titleCloseProps} titleCloseIconProps={titleCloseIconProps}
            role={role} handleAction={handleAction} {...headerProps} />
          <Modal._Body 
            role={role} {...bodyProps}>
            {children}
          </Modal._Body>
          <Modal._Footer 
            footerButtonProps={footerButtonProps} 
            footButtonGetStyle={footButtonGetStyle} footButtonGetClassName={footButtonGetClassName} footButtonGetProps={footButtonGetProps}
            role={role} handleAction={handleAction} {...footerProps} />
        </Component>
      )}
    </Modal._Container>
  )
}

Modal._Container = aprops=>{
  let { 
    role, handleAction, 
    mask=true, transition:Transition=AnimationFade, in:isIn, onTransitionFinished, 
    component=Backdrop, className, children, ...props
  } = genCommonProps(aprops);

  let classSet = {
    'flex-display-block': role!=='document',
    'flex-justify-center': role!=='document',
    'flex-align-center': role!=='document',
  }

  return (
    <Transition
      onClick={()=>handleAction&&handleAction()}
      in={isIn} onTransitionFinished={onTransitionFinished} component={component} mask={mask} 
      className={cxm(classSet, className)} {...props}>
      {children}
    </Transition>
  );
}

Modal._Header = aprops=>{
  let { 
    handleAction,
    title, titleProps, hasTitleClose, titleCloseProps, titleCloseIconProps,
    component:Component='div', className, ...props 
  } = genCommonProps(aprops);

  let classStr = 'width-full padding-a- border-set-bottom- flex-display-block flex-justify-between flex-align-center';
  
  return (title||hasTitleClose?(
    <Component className={cxm(classStr, className)} {...props}>
      <Modal._HeaderTitle hasTitleClose={hasTitleClose} {...titleProps}>{title}</Modal._HeaderTitle>
      {!hasTitleClose?null:(
        <Modal._HeaderTitleClose 
          handleAction={handleAction} 
          titleCloseIconProps={titleCloseIconProps} {...titleCloseProps}>
          {hasTitleClose} 
        </Modal._HeaderTitleClose >
      )}
    </Component>
  ):null);
}

Modal._HeaderTitle = aprops=>{
  let { 
    hasTitleClose,
    component:Component='div', className, children, ...props 
  } = genCommonProps(aprops);
  
  let classStr = 'flex-sub-flex-grow text-weight-bold text-size-lg';
  let classSet = {
    'text-align-center': !hasTitleClose,
  };  

  return (
    <Component className={cxm(classStr, classSet, className)} {...props}>{children}</Component>
  );
}

Modal._HeaderTitleClose = aprops=>{
  let { 
    handleAction, 
    titleCloseIconProps,
    component:Component=Button, className, children, ...props 
  } = genCommonProps(aprops);

  let classStr = 'padding-a-xs';
  
  return (
    <Component
      b-style="plain"
      onClick={()=>handleAction&&handleAction()} 
      className={cxm(classStr, className)}
      {...props}>
      {children===true?<Modal._HeaderTitleCloseIcon {...titleCloseIconProps} />:children}
    </Component>
  );
}

Modal._HeaderTitleCloseIcon = aprops=>{
  let { 
    title,
    component:Component=Icon, ...props 
  } = genCommonProps(aprops);

  return <Component name="close" nameDefault="x" {...props} />
}

Modal._Body = aprops=>{
  let { 
    component:Component='div', className, children, ...props 
  } = genCommonProps(aprops);
  children = typeof(children)==='function'?children(this):children;
  if(!children) return null;

  let classStr = 'padding-a-';
  
  return <Component className={cxm(classStr, className)} {...props}>{children}</Component>;
}

Modal._Footer =  aprops=>{
  let { 
    role, handleAction,
    footerButtons=Modal._footerButtons[aprops.role]||[],
    footerButtonProps, footButtonGetClassName=Modal._Footer._footButtonGetClassName, footButtonGetStyle=Modal._Footer._footButtonGetStyle, footButtonGetProps=Modal._Footer._footButtonGetProps,
    component:Component='div', className, children, ...props 
  } = genCommonProps(aprops);
  if(!footerButtons.length) return null;

  let classStr = 'border-set-top- overflow-a-hidden flex-display-block flex-align-center';

  let buttonProps = {
    className: 'flex-sub-flex-extend',
  }
  
  return (
    <Component className={cxm(classStr, className)} {...props}>
      {footerButtons.map((v,i,a)=>(
        <Button 
          key={i}
          b-style='plain'
          onClick={()=>handleAction&&handleAction(i)}
          {...getSubComponentProps(i, a.length, aprops, buttonProps, footerButtonProps, footButtonGetClassName, footButtonGetStyle, footButtonGetProps)}>
          {v}
        </Button>
      ))}
    </Component>
  );
}

Modal._Footer.footButtonGetClassName=(i, length, {stacked, justify, separator}={}, subPropsEach, subProps)=>{
  return {
    'border-set-left-': i   
  };
}

Modal._footerButtons = {
  alert: ['确定'], 
  prompt: ['取消','确定'],
}


export default Modal;
