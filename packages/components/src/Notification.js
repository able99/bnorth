/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import AnimationCollapse from './AnimationCollapse';
import Panel from './Panel';
import Button from './Button';
import Icon from './Icon';


let Notification = (aprops)=>{
  let {
    titleProps,
    hasClose, closeProps, iconProps,
    transition:Transition=AnimationCollapse, transitionProps, onTransitionFinished,
    component=Panel, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'flex-display-block flex-align-center padding-a- position-absolute offset-top-start offset-left-top width-full';
  
  return (
    <Transition 
      component={component} transitionProps={transitionProps} onTransitionFinished={onTransitionFinished} 
      b-style="solid" b-theme="mask" className={cxm(classStr, className)} {...props}>
      <Notification._Title title={children} {...titleProps} />
      {hasClose?<Notification._Close hasClose={hasClose} {...closeProps} />:null}
    </Transition>
  );
}

Notification._Title = aprops=>{
  let {
    title, 
    component:Component=Panel, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'text-weight- text-size-lg flex-sub-flex-extend';

  return (
    <Component className={cxm(classStr, className)} {...props}>
      {title}{children}
    </Component>
  );
}

Notification._Close = aprops=>{
  let {
    hasClose, iconProps,
    component:Component=Button, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'padding-a-xs flex-sub-flex-none';

  return hasClose!==true?hasClose:(
    <Component className={cxm(classStr, className)} {...props}>
      <Icon name="close" nameDefault="x" {...iconProps} />
      {children}
    </Component>
  );
}


export default Notification;
