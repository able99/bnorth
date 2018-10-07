/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { transiton, transform } from '@bnorth/rich.css/lib/styles/animation'; 
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';


class AnimationSlider extends React.Component {
  render() {
    let {
      countToShow=1, index, timeout=300, innerProps,
      component:Component=Panel, className, children, ...props
    } = parseProps(this.props);

    children = React.Children.toArray(children);
    let items = React.Children.toArray(children)
      .filter(v=>typeof(v)==='object'&&v.type===AnimationSlider.Item)
      .map((v,i)=><AnimationSlider.Item key={v.key||i} countToShow={countToShow} index={index} timeout={timeout} i={i} {...v.props}/>);
    children = children.filter(v=>typeof(v)!=='object'||v.type!==AnimationSlider.Item);

    let classStr = 'overflow-a-hidden position-relative';

    return (
      <Component className={classes(classStr, className)} {...props}>
        <AnimationSlider._Inner countToShow={countToShow} index={index} timeout={timeout} {...innerProps}>{items}</AnimationSlider._Inner>
        {children}
      </Component>
    )
  }
}

AnimationSlider._Inner = aprops=>{
  let {
    countToShow, index, timeout,
    component:Component=Panel, className, style, children, ...props
  } = parseProps(aprops);

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
    component:Component=Panel, className,...props
  } = parseProps(aprops);

  let classStr = 'overflow-a-hidden flex-sub-flex-extend';

  return <Component className={classes(classStr, className)} {...props} />;
}


export default AnimationSlider;