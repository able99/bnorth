import React from 'react';
import { genCommonProps, cx } from './utils/props';
import Loader from './Loader';
import AnimationFade from './AnimationFade';


export default (aprops) => {
  let { 
    transitonProps, in:isIn=true, timeout, onExited, Transition=AnimationFade, 
    component:Component=Loader, containerClassName, containerStyle, cTheme, ...props 
  } = genCommonProps(aprops);


  let classSetContainer = {
    'position-absolute': true,
    'square-full': true,
    'offset-start-left': true,
    'offset-start-top': true,
    'bg-color-mask': true,
    'overflow-hidden': true,
    'flex-display-flex': true,
    'flex-direction-v': true,
    'flex-justify-center': true,
    'flex-align-center': true,
  };


  return (
    <Transition
      transitonProps={transitonProps} in={isIn} timeout={timeout} onExited={onExited}
      className={cx(classSetContainer, containerClassName)} >
      <Component cTheme={cTheme||'white'} {...props} />
    </Transition>
  );
}