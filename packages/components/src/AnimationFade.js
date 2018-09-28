/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import Transition from 'react-transition-group/Transition';
import { transiton } from '@bnorth/rich.css/lib/styles/animation'; 
import { genCommonProps, cxm } from './utils/props';
import { chainedFuncs } from './utils/dom';


let Fade = aprops=>{
  let {
    in:isIn=true, timeout=100, onTransitionFinished, transitionProps={},
    ...props
  } = genCommonProps(aprops);

  return (
    <Transition 
      appear={true} {...transitionProps} in={isIn} timeout={timeout} 
      onExited={chainedFuncs(transitionProps.onExited,onTransitionFinished)}>
      {state=><Fade._Component isIn={isIn} timeout={timeout} {...props} animationState={state} />}
    </Transition>
  );
}

Fade._Component = aprops=>{
  let {
    isIn, timeout, animationState,
    component:Component='div', style, className, children, ...props
  } = genCommonProps(aprops);

  let classSet = `opacity-${(animationState==='entered')?'100':'0'}`;

  let styleSet = {
    ...style,
    ...transiton(`${timeout}ms`, { property: 'opacity' }),
  };

  return (
    <Component style={styleSet} className={cxm(classSet,className)} {...props}>
      {children}
    </Component>
  )
}


export default Fade;