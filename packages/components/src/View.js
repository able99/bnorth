/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { transform } from '@bnorth/rich.css/lib/styles/animation'
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';


let View = aprops=>{
  let {
    landscape, container=document.body,
    component:Component=Panel, componentPanel, className, style, children, ...props
  } = parseProps(aprops);

  let classStr = 'position-relative offset-a-start square-full overflow-a-hidden flex-display-block flex-direction-v bg-color-view';
  let styleSet = {};
  if(landscape && container.clientHeight>container.clientWidth) { styleSet = {
    width: container.clientHeight,
    height: container.clientWidth,
    top: (container.clientHeight - container.clientWidth) / 2,
    left: (container.clientWidth - container.clientHeight) / 2,
    ...transform('rotate', '90deg'),
  }}
  
  return (
    <Component 
      component={componentPanel} 
      data-container style={{...styleSet, ...style}} className={classes(classStr, className)} {...props}>
      {children}
    </Component>
  );
}


export default View;