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
    transitonProps:{ appear=true, onExited:onExitedTransition, ...transitonProps }={},
    in:isIn=true, timeout=100, onExited,
    onEnter, onEntering, onEntered, onExit, onExiting, 
    component:Component='div', style, className, containerClassName, containerStyle ,children, ...props
  } = genCommonProps(aprops);


  const styleSet = {
    ...containerStyle,
    ...transiton(`${timeout}ms`, { property: 'height' }),
  }
  
  let classSet = (state)=>{return {
    'overflow-hidden': true,
    'display-none': !isIn&state==='exited',
  }}
  

  return (
    <Transition 
      onEnter={createChainedFunction(handleEnter.bind(null, aprops), onEnter)}
      onEntering={createChainedFunction(handleEntering.bind(null, aprops), onEntering)}
      onEntered={createChainedFunction(handleEntered.bind(null, aprops), onEntered)}
      onExit={createChainedFunction(handleExit.bind(null, aprops), onExit)}
      onExiting={createChainedFunction(handleExiting.bind(null, aprops), onExiting)} 
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


export default Collapse;