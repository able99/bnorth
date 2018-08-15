/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import Waypoint from 'react-waypoint';
import { genCommonProps, cx } from './utils/props';
import Loader from './Loader';


let InfiniteScroll = (aprops)=>{
  let { 
    isLoading, onLoading, 
    component:Component=Loader, children, className, ...props 
  } = genCommonProps(aprops);

  if(!isLoading){
    return (
      <Waypoint onEnter={onLoading&&onLoading.bind(this)} />
    )
  }else{
    let classSet = {
      "text-align-center": className.indexOf('text-align')<0,
      "margin": className.indexOf('margin')<0,
    }
  
    return (
      <Component className={cx(classSet, className)} {...props}>
        {children}
      </Component>
    );
  }
}


export default InfiniteScroll;


