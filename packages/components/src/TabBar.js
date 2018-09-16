/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, getSubComponentProps, cxm } from './utils/props';
import Panel from './Panel';
import Icon from './Icon';


let TabBar = aprops=>{
  let {
    onAction, onClick,
    itemProps, itemGetClassName=TabBar.itemGetClassName, itemGetStyle=TabBar.itemGetStyle, itemGetProps=TabBar.itemGetProps, 
    component:Component='nav', className, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);

  children = React.Children.toArray(children).filter(v=>v);

  let classStr = 'flex-display-block flex-justify-around flex-align-stretch width-full padding-v-sm border-set-top-border';

  let classSet = [];
  if(bSize) classSet.push('text-size-'+(bSize===true?'':bSize));
  if(bStyle==='solid') classSet.push('bg-color-'+(bTheme===true?'':(bTheme||'component')));

  return (
    <Component className={cxm(classStr, classSet, className)} {...props}>
      {children.map((v,i,a)=>(
        <TabBar.Item 
          key={i}
          b-theme={bTheme} b-style={bStyle} b-size={bSize}
          {...getSubComponentProps(i, a.length, aprops, v.props, itemProps, itemGetClassName, itemGetStyle, itemGetProps)}/>
      ))}
    </Component>
  );
}


TabBar.Item = aprops=>{
  let {
    selected, eventKey,
    title, titleProps, 
    icon, iconSelected, src, srcSelected, iconProps,
    colorUnactive='disable', colorActiveOnTheme='white', colorUnactiveOnTheme,
    component:Component='span', className, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-relative cursor-pointer text-align-center flex-display-block flex-direction-v flex-justify-around flex-align-center flex-sub-flex-extend status-';

  let classSet = [];
  if(bSize) classSet.push('text-size-'+(bSize===true?'':bSize));
  if(bStyle==='solid'&&bTheme) {
    if(selected&&colorActiveOnTheme) classSet.push('text-color-'+(colorActiveOnTheme===true?'':colorActiveOnTheme));
    if(!selected&&colorUnactiveOnTheme) classSet.push('text-color-'+(colorUnactiveOnTheme===true?'':colorUnactiveOnTheme));
  }else if(bStyle==='solid'&&!bTheme) {
    if(!selected) classSet.push('text-color-'+(colorUnactive===true?'':colorUnactive))
  }else if(bTheme) {
    if(selected)classSet.push('text-color-'+(bTheme===true?'':bTheme));
    if(!selected&&colorUnactiveOnTheme)classSet.push('text-color-'+(colorUnactiveOnTheme===true?'':colorUnactiveOnTheme));
  }else {
    if(!selected) classSet.push('text-color-'+(colorUnactive===true?'':colorUnactive))
  }

  return (
    <Component className={cxm(classStr, classSet, className)} {...props} >
      <TabBar.Item.Icon selected={selected} icon={icon} iconSelected={iconSelected} src={src} srcSelected={srcSelected} {...iconProps} />
      <TabBar.Item.Title selected={selected} title={title} {...titleProps}/>
      {children}
    </Component>
  );
}

TabBar.Item.Icon = aprops=>{
  let {
    selected, icon, iconSelected, src, srcSelected, 
    component:Component=Icon, ...props
  } = genCommonProps(aprops);

  return icon||src?(
    <Component name={selected&&iconSelected?iconSelected:icon} src={selected&&srcSelected?srcSelected:src} {...props} />
  ):null;
}

TabBar.Item.Title = aprops=>{
  let {
    selected, title,
    component:Component=Panel, className, ...props
  } = genCommonProps(aprops);

  let classStr = 'text-truncate position-relative';

  return title?(
    <Component className={cxm(classStr, className)} {...props}>{title}</Component>
  ):null;
}

    
export default TabBar;