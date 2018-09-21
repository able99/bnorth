import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Loader from './Loader';


export default (aprops) => {
  let { 
    progress, height=3,
    component:Component=Loader, className, ...props 
  } = genCommonProps(aprops);

  let classStr = 'position-absolute offset-left-start offset-top-start offset-right-start width-full';

  return (
    <Component type="line" isProgress progress={progress} className={cxm(classStr,className)} bs-height={height} {...props} />
  )
}