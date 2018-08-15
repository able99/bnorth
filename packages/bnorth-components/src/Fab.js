/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { genCommonProps, cx } from './utils/props';
import Button from './Button';

let Fab = (aprops)=>{
  let {
    x=8, y=8, h='end', v='end', 
    component:Component=Button, className, style, children, ...props
  } = genCommonProps(aprops);
  

  let classSet = {
    'position-fixed': true,
    'translate-center-x': h==='center',
    'translate-center-y': v==='center',
    'offset-center-x': h==='center',
    'offset-center-y': v==='center',
  }

  let styleSet = {};
  if(h==='start') styleSet['left'] = x;
  if(h==='center') styleSet['left'] = '50%';
  if(h==='end') styleSet['right'] = x;
  if(v==='start') styleSet['top'] = y;
  if(v==='center') styleSet['top'] = '50%';
  if(v==='end') styleSet['bottom'] = y;


  return (
    <Component className={cx(classSet, className)} style={{...styleSet, ...style}} {...props}>
      {children}
    </Component>
  );
}


export default Fab;