

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';


Panel.AspectRatio = aprops=>{
  let {
    ratio, aspectRatioProps,
    component:Component=Panel, style, children, ...props
  } = parseProps(aprops);
  
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
  } = parseProps(aprops);

  let classStr = 'position-absolute offset-left-start offset-top-start square-full';

  return <Component className={classes(classStr, className)} {...props} />
}


export default Panel;
