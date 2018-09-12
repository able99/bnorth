/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import Transition from 'react-transition-group/Transition';
import { transiton } from 'rich.css/lib/styles/animation'; 
import { genCommonProps, cx } from './utils/props';
import { createChainedFunction } from './utils/event';


let Fade = aprops=>{
  let {
    transitonProps:{ appear=true, onExited:onExitedTransition, ...transitonProps }={},
    in:isIn=true, timeout=100, onExited,
    component:Component='div', style, className, containerClassName, containerStyle, children, ...props
  } = genCommonProps(aprops);


  let styleSet = {
    ...containerStyle,
    ...transiton(`${timeout}ms`, { property: 'opacity' }),
  };

  let classSet = state=>({
    [`opacity-${(state==='entered')?'100':'0'}`]:true,
  })


  return (
    <Transition 
      {...transitonProps} in={isIn} timeout={timeout} appear={appear} 
      onExited={createChainedFunction(onExitedTransition,onExited)}
      className={containerClassName}>
      {state=>(
        <Component style={styleSet} className={cx(classSet(state),className)} {...props}>
          {children}
        </Component>
      )}
    </Transition>
  );
}


export default Fade;