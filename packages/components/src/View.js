/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { transform } from 'rich.css/lib/styles/animation'
import { genCommonProps, cx, hascx } from './utils/props';


let View = (aprops)=>{
  let {
    landscape, 
    component: Component = 'div', style, className, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'position-relative': true,
    'offset-start-left': true,
    'offset-start-top': true,
    'offset-start-right': true,
    'offset-start-bottom': true,
    'square-full': true,
    'overflow-hidden': true,
    'bg-color-view': !hascx(className, 'bg-color'),
    'flex-display-flex': !hascx(className, 'flex-display'),
    'flex-direction-v': !hascx(className, 'flex-direction'),
  };

  let styleLandscape = {};
  if(landscape && window.innerHeight>window.innerWidth) { styleLandscape = {
    width: window.innerHeight,
    height: window.innerWidth,
    top: (window.innerHeight - window.innerWidth) / 2,
    left: (window.innerWidth - window.innerHeight) / 2,
    ...transform('rotate', '90deg'),
  }}
  

  return (
    <Component style={{...styleLandscape, ...style}} className={cx(classSet, className)} {...props}>
      {children}
    </Component>
  );
}


export default View;