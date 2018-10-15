/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React, { cloneElement } from 'react';
import { transiton, transform } from '@bnorth/rich.css/lib/styles/animation'; 
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';


let AnimationSlider = aprops=>{
  let {
    countToShow=1, index, timeout=300, 
    innerProps, itemProps, 
    content,
    component:Component=Panel, componentPanel, className, children, ...props
  } = parseProps(aprops, AnimationSlider.props);

  children = React.Children.toArray(children).filter(v=>v).map((v,i)=>cloneElement(v, {
    countToShow, 
    index, 
    timeout, 
    i,
    ...itemProps,
    ...v.props,
  }));

  let classStr = 'overflow-a-hidden position-relative';

  return (
    <Component component={componentPanel} className={classes(classStr, className)} {...props}>
      <AnimationSlider._Inner countToShow={countToShow} index={index} timeout={timeout} {...innerProps}>
        {children}
      </AnimationSlider._Inner>
      {content}
    </Component>
  )
}

AnimationSlider._Inner = aprops=>{
  let {
    countToShow, index, timeout,
    component:Component=Panel, className, style, children, ...props
  } = parseProps(aprops, AnimationSlider._Inner.props);

  children = React.Children.toArray(children);

  let classStr = 'flex-display-block flex-align-stretch';
  let styleSet = {
    width: `${100/countToShow*children.length}%`,
    ...transiton(timeout),
    ...transform('translateX',`${-100/children.length*(index%children.length)}%`),
    ...style,
  }

  return <Component className={classes(classStr, className)} style={styleSet} {...props}>{children}</Component>;
}

AnimationSlider.Item = aprops=>{
  let {
    i, timeout, countToShow, index,
    component:Component=Panel, componentPanel, className,...props
  } = parseProps(aprops, AnimationSlider.Item.props);

  let classStr = 'overflow-a-hidden flex-sub-flex-extend';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}


export default AnimationSlider;