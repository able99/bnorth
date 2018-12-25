

import React from 'react';
import Transition from 'react-transition-group/Transition';
import { transiton } from '@bnorth/rich.css/lib/styles/animation'; 
import classes from '@bnorth/rich.css/lib/classes'; 
import { chainedFuncs } from './utils/dom';
import parseProps from './utils/props';


let AnimationFade = aprops=>{
  let {
    in:isIn=true, timeout=100, onTransitionFinished, transitionProps={},
    ...props
  } = parseProps(aprops);

  return (
    <Transition 
      appear={true} {...transitionProps} in={isIn} timeout={timeout} 
      onExited={chainedFuncs(transitionProps.onExited,onTransitionFinished)}>
      {state=><AnimationFade._Component isIn={isIn} timeout={timeout} {...props} animationState={state} />}
    </Transition>
  );
}

AnimationFade._Component = aprops=>{
  let {
    isIn, timeout, animationState,
    component:Component='div', componentPanel, style, className, children, ...props
  } = parseProps(aprops);

  let classSet = `opacity-${(animationState==='entered')?'100':'5'}`;

  let styleSet = {
    ...style,
    ...transiton(`${timeout}ms`, { property: 'opacity' }),
  };

  return (
    <Component style={styleSet} className={classes(classSet,className)} {...props}>
      {children}
    </Component>
  )
}


export default AnimationFade;