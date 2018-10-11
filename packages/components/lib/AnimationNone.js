// /**
//  * @overview bnorth solution
//  * @copyright (c) 2016 able99
//  * @author able99 (8846755@qq.com)
//  * @license MIT
//  */
// import React from 'react';
// import classes from '@bnorth/rich.css/lib/classes'; 
// import parseProps from './utils/props';
// let AnimationNone = aprops=>{
//   let {
//     in:isIn, timeout, onTransitionFinished, transitionProps,
//     ...props
//   } = parseProps(aprops, AnimationNone.props);
//   return (
//     <Transition 
//       appear={true} {...transitionProps} in={isIn} timeout={timeout} 
//       onExited={chainedFuncs(transitionProps.onExited,onTransitionFinished)}>
//       {state=><Fade._Component isIn={isIn} timeout={timeout} {...props} animationState={state} />}
//     </Transition>
//   );
// }
// export default Fade;
"use strict";