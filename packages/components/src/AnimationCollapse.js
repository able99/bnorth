/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import Transition from 'react-transition-group/Transition';
import { transiton } from '@bnorth/rich.css/lib/styles/animation'; 
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import { chainedFuncs } from './utils/dom';
import { domGetDimensionValue, domTriggerBrowserReflow, domGetScrollDimensionValue } from './utils/dom';


function handleEnter(aprops, elem) {
  let {dimension='height'} = aprops||{};
  elem.style[dimension] = '0';
}

function handleEntering(aprops, elem) {
  let {dimension='height'} = aprops||{};
  elem.style[dimension] = domGetScrollDimensionValue(elem, dimension);
}

function handleEntered(aprops, elem) {
  let {dimension='height'} = aprops||{};
  elem.style[dimension] = null;
}

function handleExit(aprops, elem) {
  let {dimension='height'} = aprops||{};
  elem.style[dimension] = domGetDimensionValue(elem, dimension)+'px';
  domTriggerBrowserReflow(elem);
}

function handleExiting(aprops, elem) {
  let {dimension='height'} = aprops||{};
  elem.style[dimension] = '0';
}


let Collapse = (aprops)=>{
  let {
    in:isIn=true, timeout=100, onTransitionFinished, transitionProps={},
    onEnter, onEntering, onEntered, onExit, onExiting, onExited,
    ...props
  } = parseProps(aprops);

  return (
    <Transition 
      appear={true} {...transitionProps} in={isIn} timeout={timeout} 
      onEnter={chainedFuncs(handleEnter.bind(null, aprops), transitionProps.onEnter)}
      onEntering={chainedFuncs(handleEntering.bind(null, aprops), transitionProps.onEntering)}
      onEntered={chainedFuncs(handleEntered.bind(null, aprops), transitionProps.onEntered)}
      onExit={chainedFuncs(handleExit.bind(null, aprops), transitionProps.onExit)}
      onExiting={chainedFuncs(handleExiting.bind(null, aprops), transitionProps.onExiting)} 
      onExited={chainedFuncs(transitionProps.onExited,onTransitionFinished)}>
      {state=><Collapse._Component isIn={isIn} timeout={timeout} {...props} animationState={state} />}
    </Transition>
  );
}

Collapse._Component = aprops=>{
  let {
    isIn, timeout, animationState,
    component:Component='div', style, className, children, ...props
  } = parseProps(aprops);

  let classSet = {
    'overflow-a-hidden': true,
    'display-none': !isIn&animationState==='exited',
  }

  let styleSet = {
    ...style,
    ...transiton(`${timeout}ms`, { property: 'height' }),
  };

  return (
    <Component style={styleSet} className={classes(classSet,className)} {...props}>
      {children}
    </Component>
  )
}


export default Collapse;