/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Panel from './Panel';


Panel.AspectRatio = aprops=>{
  let {
    ratio, aspectRatioProps,
    component:Component=Panel, style, children, ...props
  } = genCommonProps(aprops);
  
  let styleSet = ratio?{paddingBottom: `${ratio*100}%`}:{};

  return (
    <Component style={{...styleSet, ...style}} {...props} >
      <Panel.AspectRatio._Inner ratio={ratio} {...aspectRatioProps}>{children}</Panel.AspectRatio._Inner>
    </Component>
  );
}

Panel.AspectRatio._Inner = aprops=>{
  let {
    ratio, aspectRatioProps,
    component:Component='div', className, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-absolute offset-left-start offset-top-start square-full';

  return <Component className={cxm(classStr, className)} {...props} />
}


export default Panel;
