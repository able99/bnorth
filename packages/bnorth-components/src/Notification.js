/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { genCommonProps, cx } from './utils/props';
import AnimationCollapse from './AnimationCollapse';
import Button from './Button';
import Icon from './Icon';


let Notification = (aprops)=>{
  let {
    title, 
    hasClose, closeProps:{closeClassName, closeTheme="white", closeStyle="plain", ...closeProps}={}, onClose,
    transitonProps, in:isIn=true, timeout, onExited, Transition=AnimationCollapse, 
    component:Component='div', className, ontainerClassName, containerStyle, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSetContaienr = {
    'flex-display-flex': true,
    'flex-align-center': true,
    'padding': true,
    'position-relative': true,
    'width-full': true,
    ['text-size'+cSize]: cSize,
    'bg-color-white': cStyle==='hollow',
    ['border-color-'+(cTheme||'component')]: cStyle==='hollow',
    ['text-color-'+(cTheme||'normal')]: cStyle==='hollow',
    ['bg-color-'+(cTheme||'mask')]: cStyle!=='hollow',
    'text-color-white': cStyle!=='hollow',
  };
  
  let classSet = {
    'flex-sub-flex-extend': true,
  };

  let classSetClose= {
    'padding-xs': true,
    'flex-sub-flex-none': true,
  };

  
  return (
    <Transition 
      className={cx(classSetContaienr, ontainerClassName)}
      transitonProps={transitonProps} in={isIn} timeout={timeout} onExited={onExited} {...props}>
        <Component className={cx(classSet, className)} {...props}>
          {title&&typeof(title)==='string'?(<big><strong>{title}</strong></big>):title}
          {children}
        </Component>
        {hasClose?(
          <Button cTheme={closeTheme} cStyle={closeStyle} className={cx(classSetClose, closeClassName)} onClick={onClose} {...closeProps}>
            <Icon name={Icon.getName('close','x')} />
          </Button>
        ):null}
    </Transition>
  );
}


export default Notification;
