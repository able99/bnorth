/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Panel from './Panel';
import Icon from './Icon';


Panel.Icon = aprops=>{
  let {
    titleProps, 
    iconPosition='left', selected, icon, iconSelected, src, srcSelected, iconProps, 
    component:Component=Panel, className, children, ...props
  } = genCommonProps(aprops);
  
  let classStr = 'flex-display-block flex-justify-center flex-align-center';
  let classSet = [];
  if(iconPosition==='top'||iconPosition==='bottom') classSet.push('flex-direction-v');

  return (
    <Component className={cxm(classStr, classSet, className)} {...props}>
      {iconPosition==='right'||iconPosition==='bottom'?<Panel.Icon._Title iconPosition={iconPosition} {...titleProps}>{children}</Panel.Icon._Title>:null}
      <Panel.Icon._Icon selected={selected} icon={icon} iconSelected={iconSelected} src={src} srcSelected={srcSelected} {...iconProps} />
      {iconPosition==='left'||iconPosition==='top'?<Panel.Icon._Title iconPosition={iconPosition} {...titleProps}>{children}</Panel.Icon._Title>:null}
    </Component>
  );
}

Panel.Icon._Icon = aprops=>{
  let {
    selected, icon, iconSelected, src, srcSelected,
    component:Component=Icon, ...props
  } = genCommonProps(aprops);

  return icon||src?(
    <Component name={selected&&iconSelected?iconSelected:icon} src={selected&&srcSelected?srcSelected:src} {...props} />
  ):null;
}

Panel.Icon._Title = aprops=>{
  let {
    iconPosition,
    component:Component=Panel, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'text-truncate position-relative';
  let classSet = [];
  if(iconPosition==='top'||iconPosition==='bottom') classSet.push('text-align-center');

  return children?(
    <Component className={cxm(classStr, className)} {...props}>{children}</Component>
  ):null;
}


export default Panel;
