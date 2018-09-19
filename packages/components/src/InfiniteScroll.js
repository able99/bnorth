/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import Waypoint from 'react-waypoint';
import { genCommonProps, cxm } from './utils/props';
import Panel from './Panel';
import Loader from './Loader';


let InfiniteScroll = (aprops)=>{
  let { 
    spy=true, isLoading, onLoading, 
    componentLoader:ComponentLoader=Loader, loaderProps,
    componentTitle:ComponentTitle=Panel, titleProps,
    component:Component=Panel, children, className, ...props 
  } = genCommonProps(aprops);

  if(!spy) return null;
  if(!isLoading) return <Waypoint onEnter={onLoading&&onLoading.bind(this)} />;

  let classStr = 'flex-display-block flex-direction-v flex-justify-center flex-align-center padding-a-';
  
  return (
    <Component className={cxm(classStr, className)} {...props}>
      {children?children:<ComponentLoader {...loaderProps} />}
      {children?children:<ComponentTitle {...titleProps} />}
    </Component>
  );
}


export default InfiniteScroll;


