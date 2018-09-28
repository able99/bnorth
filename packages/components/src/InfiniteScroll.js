/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Panel from './Panel';
import Loader from './Loader';
import ScrollSpy from './ScrollSpy';


let InfiniteScroll = (aprops)=>{
  let { 
    disabled, isLoading, onLoading, 
    componentLoader:ComponentLoader=Loader, loaderProps,
    componentTitle:ComponentTitle=Panel, titleProps,
    component:Component=Panel, children, className, ...props 
  } = genCommonProps(aprops);
  if(disabled) return null;

  let classStr = 'flex-display-block flex-direction-v flex-justify-center flex-align-center padding-a-';
  
  return (
    <React.Fragment>
      <ScrollSpy onScrollPositionChange={(target, event)=>InfiniteScroll._handleScrollPosChange(target, event, aprops)} />
      <Component className={cxm(classStr, className)} {...props}>
        {children?children:<ComponentLoader {...loaderProps} />}
        {children?children:<ComponentTitle {...titleProps} />}
      </Component>
    </React.Fragment>
  );
}

InfiniteScroll._handleScrollPosChange = (target, event, {isLoading, onLoading})=>{
  if(isLoading||!onLoading) return;
  let distance = Math.abs(target.scrollTop+target.clientHeight-target.scrollHeight);
  if(distance<35) onLoading();
}


export default InfiniteScroll;


