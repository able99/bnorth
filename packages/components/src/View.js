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
    landscape, container=window,
    component:Component=Panel, className, style, children, ...props
  } = parseProps(aprops);

  let classStr = 'position-relative offset-a-start square-full overflow-a-hidden flex-display-block flex-direction-v';
  let styleSet = {};
  if(landscape && container.innerHeight>container.innerWidth) { styleSet = {
    width: container.innerHeight,
    height: container.innerWidth,
    top: (container.innerHeight - container.innerWidth) / 2,
    left: (container.innerWidth - container.innerHeight) / 2,
    ...transform('rotate', '90deg'),
  }}
  
  return (
    <Component bc-bg-color="view" style={{...styleSet, ...style}} className={classes(classStr, className)} data-container {...props}>
      {children}
    </Component>
  );
}


export default View;

// :TODO
// container