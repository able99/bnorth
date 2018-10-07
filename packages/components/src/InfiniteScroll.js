/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';
import Loader from './Loader';
import ScrollSpy from './ScrollSpy';


class InfiniteScroll extends React.Component{
  handleScrollPosChange(target, event) {
    let { isLoading, onLoading } = this.props;
    if(isLoading||!onLoading) return;

    let distance = Math.abs(target.scrollTop+target.clientHeight-target.scrollHeight);
    
    if(distance<35){
      !this.trigger&&Promise.resolve().then(onLoading());
      this.trigger = true;
    }else {
      this.trigger = false;
    }
  }

  render() {
    let { 
      disabled, isLoading, onLoading, 
      componentLoader:ComponentLoader=Loader, loaderProps,
      componentTitle:ComponentTitle=Panel, titleProps,
      component:Component=Panel, children, className, ...props 
    } = parseProps(this.props);
    if(disabled) return null;
  
    let classStr = 'flex-display-block flex-direction-v flex-justify-center flex-align-center padding-a-';
    
    return (
      <React.Fragment>
        <ScrollSpy onScrollPositionChange={this.handleScrollPosChange.bind(this)} />
        <Component className={classes(classStr, className)} {...props}>
          {children?children:<ComponentLoader {...loaderProps} />}
          {children?children:<ComponentTitle {...titleProps} />}
        </Component>
      </React.Fragment>
    );
  }
}


export default InfiniteScroll;


