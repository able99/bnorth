/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { transform } from '@bnorth/rich.css/lib/styles/animation'
import { genCommonProps, cxm } from './utils/props';


let View = aprops=>{
  let {
    landscape, container=window,
    component:Component='div', className, style, 'b-theme':bTheme='view', 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-relative offset-left-start offset-right-start offset-top-start offset-bottom-start square-full overflow-a-hidden';
  classStr += ' flex-display-block flex-direction-v';

  let classSet = ['bg-color-'+bTheme];
  
  let styleSet = {};
  if(landscape && container.innerHeight>container.innerWidth) { styleSet = {
    width: container.innerHeight,
    height: container.innerWidth,
    top: (container.innerHeight - container.innerWidth) / 2,
    left: (container.innerWidth - container.innerHeight) / 2,
    ...transform('rotate', '90deg'),
  }}
  
  return (
    <Component style={{...styleSet, ...style}} className={cxm(classStr, classSet, className)} {...props}>
      {children}
    </Component>
  );
}


export default View;