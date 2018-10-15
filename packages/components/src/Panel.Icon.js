/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';
import Icon from './Icon';


Panel.Icon = aprops=>{
  let {
    position='left', selected, 
    icon, iconSelected, src, srcSelected, 
    iconProps, titleProps, 
    component:Component=Panel, componentPanel, className, children, ...props
  } = parseProps(aprops, Panel.Icon.props);
  
  let classStr = 'flex-display-block flex-justify-center flex-align-center';
  let classSet = (position==='top'||position==='bottom')?'flex-direction-v':'';

  let ctitle = children?<Panel.Icon._Title position={position} {...titleProps}>{children}</Panel.Icon._Title>:null;
  let cicon = position?<Panel.Icon._Icon name={selected&&iconSelected?iconSelected:icon} src={selected&&srcSelected?srcSelected:src} {...iconProps} />:null;

  return (
    <Component 
      component={componentPanel} 
      selected={selected}
      className={classes(classStr, classSet, className)} {...props}>
      {position==='right'||position==='bottom'?ctitle:null}
      {cicon}
      {position==='left'||position==='top'?ctitle:null}
    </Component>
  );
}

Panel.Icon._Icon = Icon;

Panel.Icon._Title = aprops=>{
  let {
    position,
    component:Component=Panel, componentPanel, className, ...props
  } = parseProps(aprops, Panel.Icon._Title.porps);

  let classStr = 'text-truncate position-relative';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />
}


export default Panel;
