/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import AnimationCollapse from './AnimationCollapse';
import Panel from './Panel';
import Button from './Button';
import Icon from './Icon';


let Notification = (aprops)=>{
  let {
    titleProps, hasClose, closeProps, iconProps, onDoClose, 
    transition:Transition=AnimationCollapse, transitionProps, onTransitionFinished,
    component=Panel, className, children, ...props
  } = parseProps(aprops);

  let classStr = 'flex-display-block flex-align-center padding-a- position-absolute offset-top-start offset-left-top width-full';
  
  return (
    <Transition 
      component={component} transitionProps={transitionProps} onTransitionFinished={onTransitionFinished} 
      b-style="solid" b-theme="mask" className={classes(classStr, className)} {...props}>
      <Notification._Title title={children} {...titleProps} />
      {hasClose?<Notification._Close hasClose={hasClose} onDoClose={onDoClose} {...closeProps} />:null}
    </Transition>
  );
}

Notification._Title = aprops=>{
  let {
    title, 
    component:Component=Panel, className, children, ...props
  } = parseProps(aprops);

  let classStr = 'text-weight- text-size-lg flex-sub-flex-extend';

  return (
    <Component className={classes(classStr, className)} {...props}>
      {title}{children}
    </Component>
  );
}

Notification._Close = aprops=>{
  let {
    hasClose, onDoClose, iconProps,
    component:Component=Button, className, children, ...props
  } = parseProps(aprops);

  let classStr = 'padding-h-sm padding-v-0 flex-sub-flex-none';

  return hasClose!==true?hasClose:(
    <Component b-style="plain" b-theme="white" onClick={onDoClose} className={classes(classStr, className)} {...props}>
      <Icon name="close" defaultName="x" {...iconProps} />
      {children}
    </Component>
  );
}


export default Notification;
