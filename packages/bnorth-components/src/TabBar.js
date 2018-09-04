/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { genCommonProps, cx, hascx } from './utils/props';
import Icon from './Icon';
import Badge from './Badge';


let TabBar = (aprops)=>{
  let {
    onAction, onClick,
    component: Component = 'nav', className, containerClassName, containerStyle, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'flex-display-flex': true,
    'flex-justify-around': true,
    'flex-align-stretch': true,
    'width-full': true,
    'padding-v-sm': !hascx(className, 'padding'),
    'border-set-top-border': !hascx(className, 'border'),
    [`bg-color-${cTheme||'component'}`]: cStyle==='solid',
    'bg-color-component': cStyle!=='solid',
  };

  let propsSetItem = (i, aprops)=>{
    let { eventKey, onClick, ...props } = aprops;
    let key = eventKey || i;
    let clickHandler = onClick || onAction;
    eventKey = eventKey || key;

    return {
      key, eventKey,
      cTheme, cStyle, cSize,
      onClick: clickHandler&&clickHandler.bind(null, eventKey),
      ...props
    };
  };

  return (
    <Component className={cx(classSet, className)} {...props}>
      {React.Children.toArray(children)
      .filter(v=>v)
      .map((v,i)=><TabBar.Item {...propsSetItem(i, v&&v.props)} />)}
    </Component>
  );
}

let TabBarItem = (aprops)=>{
  let {
    title, badge, icon, iconSelected, src, srcSelected, selected, eventKey,
    iconProps={}, titleProps={}, badageProps={}, 
    component: Component = 'span', className, containerClassName, containerStyle, cTheme, disableWithoutTheme='disable', disableWithTheme='normal', cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSetBadge = {
    'position-absolute': true,
    'offset-start-top': true,
    'offset-start-right': true,
  };

  let classSetTitle = {
    'text-truncate': true,
    'position-relative': true,
    'display-block': true,
  };

  iconProps.cTheme = iconProps.cTheme;
  iconProps.cSize = cSize||'xl';

  let classSet = {
    'position-relative': true,
    'cursor-pointer': true,
    'text-align-center': !hascx(className, 'text-align'),
    'flex-display-flex': !hascx(className, 'flex-display'),
    'flex-direction-v': !hascx(className, 'flex-direction'),
    'flex-justify-around': !hascx(className, 'flex-justify'),
    'flex-align-center': !hascx(className, 'flex-align'),
    'flex-sub-flex-extend': true,
    ['text-size-'+cSize]: cSize,
  };

  if(cStyle==='solid') {
    if(cTheme) {
      classSet['text-color-'+(selected?'white':disableWithoutTheme)] = true;
    }else {
      classSet['text-color-'+(selected?'normal':disableWithoutTheme)] = true;
    }
  }else {
    if(cTheme) {
      classSet['text-color-'+(selected?cTheme:disableWithTheme)] = true;
    }else {
      classSet['text-color-'+(selected?'normal':disableWithoutTheme)] = true;
    }
  }
  

  return (
    <Component className={cx(classSet, className)} {...props} >
      {icon||src?(
        <Icon {...iconProps} name={selected&&iconSelected?iconSelected:icon} src={selected&&srcSelected?srcSelected:src} />
      ):null}

      {title? (
        <span {...titleProps} className={cx(classSetTitle, titleProps.className)} >
          {title}
        </span>
      ):null}

      {badge?(
        <Badge rounded {...badageProps} className={cx(classSetBadge, badageProps.className)} >
          {badge}
        </Badge>
      ):null}

      {children}
    </Component>
  );
}

    
TabBar.Item = TabBarItem;
export default TabBar;