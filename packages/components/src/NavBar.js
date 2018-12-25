

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel.Icon';


let NavBar = aprops=>{
  let {
    statusbarOverlay, hidden, 
    component:Component=Panel, componentPanel='nav', className, style, ...props
  } = parseProps(aprops, NavBar.props);
  
  if(hidden) return null;

  let classStr = 'flex-display-block flex-justify-around flex-align-center width-full padding-v-sm border-set-bottom-';
  let styleSet = {};
  if(statusbarOverlay) styleSet.paddingTop = statusbarOverlay===true?20:statusbarOverlay;

  return <Component component={componentPanel} className={classes(classStr, className)} style={{...styleSet, ...style}} {...props} />;
}

NavBar.Title = aprops=>{
  let {
    isFullOrCenter,
    component:Component=Panel, componentPanel, className, children, ...props
  } = parseProps(aprops, NavBar.Title.props);

  let classStr = 'text-align-center flex-sub-flex-extend text-weight-bold text-size-xl';

  return isFullOrCenter?(
    <Component component={componentPanel} inline className={classes(classStr, className)} {...props}>{children}</Component>
  ):(
    <React.Fragment>
      <Component component={componentPanel} inline className={classes(classStr, className, 'position-absolute')} {...props}>{children}</Component>
      <Component component={componentPanel} inline className={classes(classStr, className, 'visibility-hide')} {...props}>0</Component>
    </React.Fragment>
  )
}

NavBar.Item = aprops=>{
  let {
    component:Component=Panel.Icon, componentPanel, className, ...props
  } = parseProps(aprops, NavBar.Item.props);

  let classStr = 'padding-h-sm flex-sub-flex-none cursor-pointer status-';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}


export default NavBar;