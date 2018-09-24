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
import { createChainedFunction } from './utils/event';
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
  } = genCommonProps(aprops);

  return (
    <Transition 
      appear={true} {...transitionProps} in={isIn} timeout={timeout} 
      onEnter={createChainedFunction(handleEnter.bind(null, aprops), transitionProps.onEnter)}
      onEntering={createChainedFunction(handleEntering.bind(null, aprops), transitionProps.onEntering)}
      onEntered={createChainedFunction(handleEntered.bind(null, aprops), transitionProps.onEntered)}
      onExit={createChainedFunction(handleExit.bind(null, aprops), transitionProps.onExit)}
      onExiting={createChainedFunction(handleExiting.bind(null, aprops), transitionProps.onExiting)} 
      onExited={createChainedFunction(transitionProps.onExited,onTransitionFinished)}>
      {state=><Collapse._Component isIn={isIn} timeout={timeout} {...props} animationState={state} />}
    </Transition>
  );
}

Collapse._Component = aprops=>{
  let {
    isIn, timeout, animationState,
    component:Component='div', style, className, children, ...props
  } = genCommonProps(aprops);

  let classSet = {
    'overflow-a-hidden': true,
    'display-none': !isIn&animationState==='exited',
  }

  let styleSet = {
    ...style,
    ...transiton(`${timeout}ms`, { property: 'height' }),
  };

  return (
    <Component style={styleSet} className={cxm(classSet,className)} {...props}>
      {children}
    </Component>
  )
}


export default Collapse;