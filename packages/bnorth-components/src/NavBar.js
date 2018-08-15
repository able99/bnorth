/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { genCommonProps, cx, hascx } from './utils/props';
import Icon from './Icon';


let NavBar = (aprops)=>{
  if(NavBar.hidden) return null;

  let {
    component: Component = 'nav', className, containerClassName, containerStyle, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);

  let classSet = {
    'flex-display-flex': true,
    'flex-justify-around': true,
    'flex-align-center': true,
    'width-full': true,
    'padding-v-sm': !hascx(className, 'padding'),
    'border-set-bottom-border': !cStyle&&!hascx(className, 'border'),
    ['text-size-'+cSize]: cSize,
    [`bg-color-${cTheme||'component'}`]: cStyle!=='hollow',
    'bg-color-white': cStyle==='hollow',
    ['border-set-'+cTheme||'border']: cStyle==='hollow',
    'text-color-white': cStyle==='solid',
    ['text-color-'+(cTheme||'normal')]: cStyle!=='solid',
  };


  return (
    <Component className={cx(classSet, className)} {...props} >
      {children}
    </Component>
  );
}

let NavBarTitle = (aprops)=>{
  let {
    component: Component = 'span', className, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'text-align-center': !hascx(className, 'text-align'),
    'flex-sub-flex-extend': !hascx(className, 'flex-sub-flex'),
  };


  return (
    <Component className={cx(classSet, className)} {...props}>
      {typeof(children)==='string'?<big><strong>{children}</strong></big>:children}
    </Component>
  );
}

let NavBarItem = (aprops)=>{
  let {
    title, icon, src, badge, 
    iconProps={}, titleProps={}, 
    component: Component = 'span', className, containerClassName, containerStyle, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'text-align-center': !hascx(className, 'text-align'),
    'padding-h-sm': !hascx(className, 'padding'),
    'cursor-pointer': true,
  };


  return (
    <Component className={cx(classSet, className)} {...props} >
      {icon||src?(
        <Icon {...iconProps} name={icon} src={src} />
      ):null}

      {title?(
        <span {...titleProps}>{title}</span>
      ):null}

      {children}
    </Component>
  );
}


NavBar.Title = NavBarTitle;
NavBar.Item = NavBarItem;
export default NavBar;