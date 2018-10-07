import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import AnimationFade from './AnimationFade';
import Panel from './Panel';
import Loader from './Loader';


export default (aprops) => {
  let { 
    mask=true, 
    hasLoader=true, componentLoad:ComponnetLoader=Loader, loaderProps,
    title, componnetTitle:ComponentTitle=Panel, titleProps,
    transition:Transition=AnimationFade, transitionProps, onTransitionFinished,
    component=Panel, className, ...props 
  } = parseProps(aprops);

  let classStr = 'position-absolute square-full offset-left-start offset-top-start overflow-a-hidden flex-display-block flex-direction-v flex-justify-center flex-align-center'

  return (
    <Transition 
      b-style="solid" b-theme={mask===true?'mask':mask} 
      component={component} transitionProps={transitionProps} onTransitionFinished={onTransitionFinished} 
      className={classes(classStr, className)} {...props}>
      {hasLoader?<ComponnetLoader {...loaderProps} />:null}
      {title?<ComponentTitle {...titleProps} children={title} />:null}
    </Transition>
  );
}