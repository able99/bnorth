import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import AnimationFade from './AnimationFade';
import Panel from './Panel';


let Backdrop = aprops=>{
  let { 
    mask=true, 
    transition:Transition=AnimationFade, in:isIn, transitionProps, onTransitionFinished,
    component=Panel, componentPanel, className, children, ...props 
  } = parseProps(aprops, Backdrop.props);

  let classStr = 'position-absolute square-full offset-left-start offset-top-start overflow-a-hidden';
  let classSet = mask?`bg-color-${mask===true?'mask':mask}`:'';

  return (
    <Transition 
      in={isIn} transitionProps={transitionProps} onTransitionFinished={onTransitionFinished} 
      component={component} componentPanel={componentPanel} className={classes(classStr, classSet, className)} {...props}>
      {children}
    </Transition>
  );
}


export default Backdrop;