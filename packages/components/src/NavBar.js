/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Panel from './Panel.Icon';


let NavBar = aprops=>{
  if(NavBar.hidden) return null;
  let {
    statusbarOverlay=NavBar.statusbarOverlay, 
    component:Component=Panel, componentPanel='nav', className, style, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'flex-display-block flex-justify-around flex-align-center width-full padding-v-sm border-set-bottom-';

  let styleSet = {};
  if(statusbarOverlay) styleSet.paddingTop = statusbarOverlay===true?20:statusbarOverlay;

  return <Component component={componentPanel} className={cxm(classStr, className)} style={{...styleSet, ...style}} {...props}>{children}</Component>
}

let NavBarTitle = aprops=>{
  let {
    component:Component=Panel, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'text-align-center flex-sub-flex-extend text-weight-bold text-size-xl';

  return (
    <React.Fragment>
      <Component inline className={cxm(classStr, className, 'position-absolute')} {...props}>{children}</Component>
      <Component inline className={cxm(classStr, className, 'visibility-hide')} {...props}>0</Component>
    </React.Fragment>
  );
}

let NavBarItem = (aprops)=>{
  let {
    component:Component=Panel.Icon, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'padding-h-sm cursor-pointer line-height-0 status';

  return <Component className={cxm(classStr, className)} {...props}>{children}</Component>;
}


NavBar.Title = NavBarTitle;
NavBar.Item = NavBarItem;
export default NavBar;