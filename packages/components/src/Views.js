/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React, { cloneElement } from 'react';
import { genCommonProps, getSubComponentProps, cxm } from './utils/props';


let Views = aprops=>{
  let {
    viewProps={}, viewGetClassName, viewGetStyle, viewGetProps,
    component:Component='div', className, style, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);
  children = React.Children.toArray(children).filter(v=>v);

  let classStr = 'position-relative overflow-hidden';

  let classSet = [];
  if(bSize) classSet.push('text-size-'+(bSize===true?'':bSize));
  if(bStyle==='hollow') {
    classSet.push('border-set-'+(bTheme===true?'':bTheme));
  }else if(bStyle==='plain'){
    if(bTheme) classSet.push('text-color-'+(bTheme===true?'':bTheme));
  }else {
    classSet.push('bg-color-'+(bTheme===true?'':(bTheme||'view')));
  }

  return (
    <Component style={style} className={cxm(classStr, classSet, className)} {...props}>
      {children
        .map((v,i,a)=>cloneElement(v, getSubComponentProps(i, a.length, aprops, v.props, viewProps, viewGetClassName, viewGetStyle, viewGetProps)))
        .find(v=>v.props.selected)}
    </Component>
  );
}


Views.Item = aprops=>{
  let {
    component:Component='div', className, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-relative offset-left-start offset-right-start offset-top-start offset-bottom-start square-full overflow-hidden';

  let classSet = [];
  if(bSize) classSet.push('text-size-'+(bSize===true?'':bSize));
  if(bTheme) classSet.push('text-color-'+(bTheme===true?'':bTheme));

  return (
    <Component className={cxm(classStr, classSet, className)} {...props}>
      {children}
    </Component>
  );
}


export default Views;