/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React, { cloneElement } from 'react';
import { genCommonProps, genItemProps, cx, hascx } from './utils/props';


let Views = aprops=>{
  let {
    itemProps={}, getItemClassName, getItemProps, getItemStyle,
    component:Component='div', className, children, ...props
  } = genCommonProps(aprops);
  children = React.Children.toArray(children).filter(v=>v);


  let classSet = {
    'position-relative': true,
    'overflow-hidden': true,
    'bg-color-view': !hascx(className, 'bg-color'),
  };


  return (
    <Component className={cx(classSet, className)} {...props}>
      {React.Children.toArray(children)
      .filter(v=>v)
      .map((v,i, arr)=>cloneElement(v, genItemProps(i, arr.length, v.props, itemProps, getItemClassName, getItemProps, getItemStyle)))
      .find(v=>v.props.selected)}
    </Component>
  );
}

Views.Item = aprops=>{
  let {
    component:Component='div', className, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'position-relative': !hascx(className, 'position'),
    'offset-start-left': true,
    'offset-start-top': true,
    'offset-start-right': true,
    'offset-start-bottom': true,
    'square-full': true,
    'overflow-hidden': true,
  }


  return (
    <Component className={cx(classSet, className)} {...props}>
      {children}
    </Component>
  );
}


export default Views;